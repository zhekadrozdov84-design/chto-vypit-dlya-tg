/* «Что пьём?» — сервер бота @whattodrinkuh_bot (Cloudflare Worker).
   Секрет: BOT_TOKEN. Хранилище: KV (привязка KV). Расписание: раз в час — напоминания.
   Маршруты:
     /setup                 — вебхук, команды бота, ссылки на оплату звёздами
     /hook                  — обновления Telegram (сообщения, кнопки, inline-поиск, оплата)
     /api/remind[/cancel]   — напоминания по настойкам (из приложения)
     /api/list/...          — общие списки
     /api/poll              — черновик голосования для группового чата
   Приложение подписывает запросы initData Telegram — проверяем подпись токеном бота. */

const APP = 'https://t.me/whattodrinkuh_bot/app';
const BOT = 'whattodrinkuh_bot';
const RECIPES_URL = 'https://zhekadrozdov84-design.github.io/chto-vypit-dlya-tg/recipes.json';
const ORIGIN = 'https://zhekadrozdov84-design.github.io';
const AMOUNTS = [50, 100, 250];
const DAY = 864e5;
const NL = String.fromCharCode(10);

const KB = {
  keyboard: [
    [{ text: '🎲 Случайный коктейль' }, { text: '🔍 Найти рецепт' }],
    [{ text: '📋 Общий список' }, { text: '🗳 Голосование в чате' }],
    [{ text: '⏰ Мои напоминания' }, { text: '❓ Помощь' }]
  ],
  resize_keyboard: true, is_persistent: true
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const appLink = p => APP + (p ? '?startapp=' + p : '');
const rnd = n => [...crypto.getRandomValues(new Uint8Array(n))].map(b => 'abcdefghijkmnpqrstuvwxyz23456789'[b % 32]).join('');

async function hex(buf) { return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join(''); }
async function hmac(key, data) {
  const k = await crypto.subtle.importKey('raw', typeof key === 'string' ? new TextEncoder().encode(key) : key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return crypto.subtle.sign('HMAC', k, new TextEncoder().encode(data));
}
async function hookSecret(token) {
  return (await hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode('wtd-hook:' + token)))).slice(0, 48);
}
/* Проверка initData из приложения: https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app */
async function checkInit(initData, token) {
  if (!initData) return null;
  const p = new URLSearchParams(initData); const hash = p.get('hash'); if (!hash) return null; p.delete('hash');
  const dcs = [...p.entries()].sort(([a], [b]) => a < b ? -1 : 1).map(([k, v]) => k + '=' + v).join('\n');
  const secret = await hmac('WebAppData', token);
  if (await hex(await hmac(secret, dcs)) !== hash) return null;
  if (Date.now() / 1000 - (+p.get('auth_date') || 0) > 30 * 86400) return null;
  try { return JSON.parse(p.get('user') || 'null'); } catch { return null; }
}

/* ---------- рецепты (берём из приложения, кэш на час) ---------- */
let R = null, Rt = 0;
async function recipes() {
  if (R && Date.now() - Rt < 36e5) return R;
  const r = await fetch(RECIPES_URL, { cf: { cacheTtl: 3600 } });
  if (r.ok) { R = (await r.json()).items; Rt = Date.now(); }
  return R || [];
}
const norm = s => String(s).toLowerCase().replace(/ё/g, 'е');
async function search(q, lim = 20) {
  const all = await recipes(); q = norm(q).trim();
  if (!q) return all.filter(x => x.cl).slice(0, lim);
  const words = q.split(/\s+/);
  const score = x => {
    const n = norm(x.n), e = norm(x.en), ing = norm(x.ing.join(' '));
    let s = 0;
    for (const w of words) {
      if (n.startsWith(w) || e.startsWith(w)) s += 5; else if (n.includes(w) || e.includes(w)) s += 3;
      else if (ing.includes(w)) s += 1; else return 0;
    }
    return s + (x.cl ? .5 : 0);
  };
  return all.map(x => [score(x), x]).filter(([s]) => s > 0).sort((a, b) => b[0] - a[0]).slice(0, lim).map(([, x]) => x);
}
function card(x) {
  const head = '<b>' + esc(x.n) + '</b>\n<i>' + esc(x.k ? 'Настойка · ' + x.b + (x.days ? ' · ' + x.days + ' дн.' : '') : x.b + (x.g ? ' · ' + x.g : '')) + '</i>';
  const ing = x.ing.map(s => '• ' + esc(s)).join('\n');
  let st = x.st.map((s, j) => (j + 1) + '. ' + esc(s)).join('\n');
  let t = head + '\n\n' + ing + '\n\n' + st;
  if (t.length > 3900) t = t.slice(0, 3890) + '…';
  return t;
}
const cardKb = (x, more) => ({
  inline_keyboard: [
    [{ text: x.k ? '🫙 Открыть в «Что пьём?»' : '🍸 Открыть в «Что пьём?»', url: appLink('c_' + x.i.toString(36)) }],
    ...(more ? [[{ text: '🎲 Ещё случайный', callback_data: 'rnd' }, { text: '↗️ Отправить в чат', switch_inline_query: x.n }]] : [[{ text: '↗️ Отправить в чат', switch_inline_query: x.n }]])
  ]
});

/* ---------- напоминания ---------- */
const pad = t => String(t).padStart(13, '0');
async function addReminder(env, uid, b) {
  const days = Math.max(1, Math.min(120, +b.days || 1));
  const at = Date.now() + days * DAY;
  const key = `rem:${pad(at)}:${uid}:${rnd(4)}`;
  await env.KV.put(key, JSON.stringify({ uid, n: String(b.n).slice(0, 80), i: +b.i || 0, set: Date.now(), days }), { expirationTtl: days * 86400 + 7 * 86400 });
  const ur = JSON.parse(await env.KV.get('ur:' + uid) || '[]').filter(k => +k.split(':')[1] > Date.now());
  ur.push(key); await env.KV.put('ur:' + uid, JSON.stringify(ur.slice(-50)), { expirationTtl: 130 * 86400 });
  return { key, at };
}
async function cancelReminder(env, uid, key) {
  if (!key || key.split(':')[2] !== String(uid)) return false;
  await env.KV.delete(key);
  const ur = JSON.parse(await env.KV.get('ur:' + uid) || '[]').filter(k => k !== key);
  await env.KV.put('ur:' + uid, JSON.stringify(ur), { expirationTtl: 130 * 86400 });
  return true;
}
const fmtDate = t => new Date(t).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', timeZone: 'Europe/Moscow' });
async function runReminders(env, api) {
  const now = Date.now(); let cursor;
  do {
    const l = await env.KV.list({ prefix: 'rem:', cursor, limit: 500 });
    for (const k of l.keys) {
      if (+k.name.split(':')[1] > now) return;
      const v = JSON.parse(await env.KV.get(k.name) || 'null');
      if (v) {
        await api('sendMessage', {
          chat_id: v.uid, parse_mode: 'HTML',
          text: '🫙 Пора процедить настойку <b>«' + esc(v.n) + '»</b>!' + NL + `Вы поставили её ${fmtDate(v.set)} — прошло ${v.days} ${v.days % 10 === 1 && v.days % 100 !== 11 ? 'день' : v.days % 10 >= 2 && v.days % 10 <= 4 && (v.days % 100 < 10 || v.days % 100 >= 20) ? 'дня' : 'дней'}.`,
          reply_markup: { inline_keyboard: [[{ text: 'Открыть рецепт', url: appLink('c_' + v.i.toString(36)) }]] }
        });
        const ur = JSON.parse(await env.KV.get('ur:' + v.uid) || '[]').filter(x => x !== k.name);
        await env.KV.put('ur:' + v.uid, JSON.stringify(ur), { expirationTtl: 130 * 86400 });
      }
      await env.KV.delete(k.name);
    }
    cursor = l.list_complete ? null : l.cursor;
  } while (cursor);
}
async function remindersMsg(env, uid) {
  const ur = JSON.parse(await env.KV.get('ur:' + uid) || '[]').filter(k => +k.split(':')[1] > Date.now());
  const items = [];
  for (const k of ur) { const v = JSON.parse(await env.KV.get(k) || 'null'); if (v) items.push([k, v]); }
  if (!items.length) return { text: '⏰ Напоминаний нет.\n\nЧтобы бот напомнил процедить настойку, откройте её в приложении → «Готовить» → на шаге настаивания включите «Напомнить».', reply_markup: { inline_keyboard: [[{ text: '🫙 Открыть настойки', url: appLink('n') }]] } };
  return {
    text: '⏰ <b>Ваши напоминания</b>\n\n' + items.map(([k, v]) => `• «${esc(v.n)}» — ${fmtDate(+k.split(':')[1])}`).join('\n'),
    parse_mode: 'HTML',
    reply_markup: { inline_keyboard: items.map(([k, v]) => [{ text: '✖ Отменить «' + v.n.slice(0, 30) + '»', callback_data: 'rc:' + k.split(':').slice(1).join(':') }]) }
  };
}

/* ---------- общие списки ---------- */
const LTTL = 90 * 86400;
const cleanItems = o => { const r = {}; for (const [k, v] of Object.entries(o || {})) { const i = parseInt(k, 10); if (i >= 0 && i < 5000) r[i] = Math.max(1, Math.min(99, +v || 1)); } return r; };
async function getList(env, id) { return JSON.parse(await env.KV.get('list:' + id) || 'null'); }
async function putList(env, id, L) { await env.KV.put('list:' + id, JSON.stringify(L), { expirationTtl: LTTL }); }

/* ---------- HTTP ---------- */
const cors = { 'Access-Control-Allow-Origin': ORIGIN, 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'content-type', 'Vary': 'Origin' };
const J = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...cors, 'content-type': 'application/json; charset=utf-8' } });

export default {
  async scheduled(ev, env, ctx) {
    if (!env.BOT_TOKEN || !env.KV) return;
    const api = mkApi(env);
    ctx.waitUntil(runReminders(env, api));
  },

  async fetch(req, env) {
    const url = new URL(req.url);
    if (!env.BOT_TOKEN) return new Response('BOT_TOKEN не задан', { status: 500 });
    const api = mkApi(env);
    const secret = await hookSecret(env.BOT_TOKEN);
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });

    if (url.pathname === '/setup') return setup(url, env, api, secret);
    if (url.pathname === '/hook' && req.method === 'POST') {
      if (req.headers.get('X-Telegram-Bot-Api-Secret-Token') !== secret) return new Response('forbidden', { status: 403 });
      const u = await req.json();
      try { await onUpdate(u, env, api); } catch (e) { console.error(e); }
      return new Response('ok');
    }

    if (url.pathname.startsWith('/api/')) {
      if (!env.KV) return J({ error: 'no storage' }, 500);
      let b = {}; try { b = JSON.parse(await req.text() || '{}'); } catch { }
      const user = await checkInit(b.initData, env.BOT_TOKEN);
      if (!user) return J({ error: 'auth' }, 401);
      const uid = user.id; const p = url.pathname;

      if (p === '/api/remind') return J(await addReminder(env, uid, b));
      if (p === '/api/remind/cancel') return J({ ok: await cancelReminder(env, uid, b.key) });

      if (p === '/api/list/create') {
        const id = rnd(8);
        const L = { name: String(b.name || 'Список').slice(0, 40), def: Math.max(1, Math.min(99, +b.def || 4)), items: cleanItems(b.items), rev: 1, owner: uid, upd: Date.now() };
        await putList(env, id, L); return J({ id, list: L });
      }
      const m = p.match(/^\/api\/list\/([a-z0-9]{8})(\/sync)?$/);
      if (m) {
        const id = m[1]; const L = await getList(env, id);
        if (!L) return J({ error: 'gone' }, 404);
        if (m[2]) {
          let ch = false;
          for (const [k, v] of Object.entries(cleanItems(b.set))) { if (L.items[k] !== v) { L.items[k] = v; ch = true; } }
          for (const k of (b.del || [])) { if (k in L.items) { delete L.items[k]; ch = true; } }
          if (b.def && +b.def !== L.def) { L.def = Math.max(1, Math.min(99, +b.def)); ch = true; }
          if (b.name && String(b.name).slice(0, 40) !== L.name) { L.name = String(b.name).slice(0, 40); ch = true; }
          if (ch) { L.rev++; L.upd = Date.now(); await putList(env, id, L); }
        }
        return J({ id, list: L });
      }

      if (p === '/api/poll') {
        const opts = (b.options || []).map(s => String(s).slice(0, 100)).filter(Boolean).slice(0, 12);
        if (opts.length < 2) return J({ error: 'few' }, 400);
        const id = rnd(8);
        await env.KV.put('poll:' + id, JSON.stringify({ q: String(b.title || 'Что пьём?').slice(0, 250), opts, by: user.first_name || '' }), { expirationTtl: 7 * 86400 });
        return J({ id, link: `https://t.me/${BOT}?startgroup=p_${id}` });
      }
      return J({ error: 'not found' }, 404);
    }
    return new Response('«Что пьём?» — сервер бота работает.', { headers: { 'content-type': 'text/plain; charset=utf-8' } });
  }
};

function mkApi(env) {
  return (m, body) => fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${m}`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body)
  }).then(r => r.json());
}

async function setup(url, env, api, secret) {
  const hook = await api('setWebhook', {
    url: url.origin + '/hook', secret_token: secret,
    allowed_updates: ['message', 'callback_query', 'inline_query', 'pre_checkout_query', 'my_chat_member']
  });
  const cmds = await api('setMyCommands', {
    commands: [
      { command: 'start', description: 'Меню и кнопки' },
      { command: 'random', description: 'Случайный коктейль' },
      { command: 'find', description: 'Найти рецепт по названию или ингредиенту' },
      { command: 'reminders', description: 'Мои напоминания по настойкам' },
      { command: 'help', description: 'Что умеет бот' },
      { command: 'paysupport', description: 'Вопросы по оплате звёздами' }
    ]
  });
  const links = {};
  if (url.searchParams.get('links')) for (const n of AMOUNTS) {
    const r = await api('createInvoiceLink', {
      title: 'Автору на лёд и лаймы', description: 'Добровольный подарок автору «Что пьём?» — ничего взамен. Спасибо!',
      payload: 'gift:' + n, currency: 'XTR', prices: [{ label: 'Подарок автору', amount: n }]
    });
    links[n] = r.ok ? r.result : ('ошибка: ' + r.description);
  }
  return new Response(JSON.stringify({ webhook: hook.ok ? 'ok' : hook.description, commands: cmds.ok ? 'ok' : cmds.description, kv: !!env.KV, links }, null, 2),
    { headers: { 'content-type': 'application/json; charset=utf-8' } });
}

const HELP = [
  `<b>«Что пьём?»</b> — звёздная карта коктейлей и настоек для домашней вечеринки.`,
  ``,
  `🍸 <b>Приложение</b> — кнопка «Открыть» слева от поля ввода.`,
  `🎲 <b>Случайный коктейль</b> — если не знаете, что выбрать.`,
  `🔍 <b>Найти рецепт</b> — напишите сюда название или ингредиент: «апероль», «лайм».`,
  `↗️ <b>Рецепт в любом чате</b> — в любой переписке наберите <code>@${BOT} мохито</code> и выберите коктейль.`,
  `📋 <b>Общий список</b> — в приложении: «Списки» → «Сделать общим»; друзья по ссылке добавляют коктейли, у всех одинаковое «что купить».`,
  `🗳 <b>Голосование в чате</b> — в приложении: «Списки» → «Голосование», выберите чат компании — бот создаст опрос.`,
  `⏰ <b>Напоминания</b> — когда ставите настойку («Готовить» → шаг настаивания), включите «Напомнить», и бот напишет, когда пора процеживать.`,
  `⭐ <b>Автору на лёд и лаймы</b> — в приложении, «О приложении».`
].join('\n');

async function onUpdate(u, env, api) {
  if (u.pre_checkout_query) return api('answerPreCheckoutQuery', { pre_checkout_query_id: u.pre_checkout_query.id, ok: true });

  if (u.inline_query) {
    const q = u.inline_query.query || '';
    const res = await search(q, 20);
    return api('answerInlineQuery', {
      inline_query_id: u.inline_query.id, cache_time: 300, is_personal: false,
      button: { text: '🍸 Открыть «Что пьём?»', web_app: { url: 'https://zhekadrozdov84-design.github.io/chto-vypit-dlya-tg/' } },
      results: res.map(x => ({
        type: 'article', id: 'r' + x.i, title: x.n + (x.k ? ' · настойка' : ''),
        description: x.ing.slice(0, 4).map(s => s.split(' — ')[0]).join(', '),
        input_message_content: { message_text: card(x), parse_mode: 'HTML', link_preview_options: { is_disabled: true } },
        reply_markup: { inline_keyboard: [[{ text: x.k ? '🫙 Открыть в «Что пьём?»' : '🍸 Открыть в «Что пьём?»', url: appLink('c_' + x.i.toString(36)) }]] }
      }))
    });
  }

  if (u.callback_query) {
    const c = u.callback_query, d = c.data || '', chat = c.message && c.message.chat.id;
    if (d === 'rnd') {
      const all = await recipes(); const x = all.filter(y => !y.k)[Math.floor(Math.random() * all.filter(y => !y.k).length)];
      await api('answerCallbackQuery', { callback_query_id: c.id });
      return api('sendMessage', { chat_id: chat, text: card(x), parse_mode: 'HTML', reply_markup: cardKb(x, true) });
    }
    if (d.startsWith('r:')) {
      const x = (await recipes()).find(y => y.i === parseInt(d.slice(2), 36));
      await api('answerCallbackQuery', { callback_query_id: c.id });
      if (x) return api('sendMessage', { chat_id: chat, text: card(x), parse_mode: 'HTML', reply_markup: cardKb(x, false) });
      return;
    }
    if (d.startsWith('rc:')) {
      const key = 'rem:' + d.slice(3);
      const ok = await cancelReminder(env, c.from.id, key);
      await api('answerCallbackQuery', { callback_query_id: c.id, text: ok ? 'Напоминание отменено' : 'Уже не активно' });
      const m = await remindersMsg(env, c.from.id);
      return api('editMessageText', { chat_id: chat, message_id: c.message.message_id, ...m });
    }
    return api('answerCallbackQuery', { callback_query_id: c.id });
  }

  const m = u.message; if (!m) return;
  const chat = m.chat.id, text = (m.text || '').trim(), priv = m.chat.type === 'private';
  const send = (t, extra = {}) => api('sendMessage', { chat_id: chat, text: t, parse_mode: 'HTML', link_preview_options: { is_disabled: true }, ...extra });

  if (m.successful_payment) return send('Спасибо за лёд и лаймы! 🍋 Это очень приятно и помогает развивать «Что пьём?».');

  /* бот добавлен в группу по ссылке голосования: /start@bot p_xxxx */
  const st = text.match(/^\/start(?:@\w+)?\s+(\S+)/);
  if (st && st[1].startsWith('p_')) {
    const P = JSON.parse(await env.KV.get('poll:' + st[1].slice(2)) || 'null');
    if (!P) return send('Это голосование уже устарело — создайте новое в приложении: «Списки» → «Голосование».');
    const r = await api('sendPoll', { chat_id: chat, question: P.q, options: P.opts.map(t => ({ text: t })), is_anonymous: false, allows_multiple_answers: true });
    if (!r.ok) return send('Не получилось создать опрос: ' + esc(r.description || ''));
    return;
  }
  if (!priv) return; /* в группах бот отвечает только на голосования */

  if (/^\/start\b/.test(text)) return send(HELP + '\n\nКнопки — внизу 👇', { reply_markup: KB });
  if (/^\/help\b|^❓/.test(text)) return send(HELP, { reply_markup: KB });
  if (/^\/paysupport\b/.test(text)) return send('Вопросы по оплате звёздами: напишите автору в Instagram — instagram.com/ne.drozd. Звёзды — добровольный подарок, взамен ничего не открывается.');
  if (/^\/random\b|^🎲/.test(text)) {
    const all = (await recipes()).filter(y => !y.k); const x = all[Math.floor(Math.random() * all.length)];
    return send(card(x), { reply_markup: cardKb(x, true) });
  }
  if (/^\/reminders\b|^⏰/.test(text)) return api('sendMessage', { chat_id: chat, ...(await remindersMsg(env, m.from.id)) });
  if (/^📋/.test(text)) return send('📋 <b>Общий список на вечеринку</b>\n\nОткройте «Списки» в приложении, соберите коктейли и нажмите «Сделать общим». Пришлите ссылку друзьям — все смогут добавлять и убирать коктейли, а «Что купить» посчитается на всех.', { reply_markup: { inline_keyboard: [[{ text: '📋 Открыть списки', url: appLink('lists') }]] } });
  if (/^🗳/.test(text)) return send('🗳 <b>Голосование в чате</b>\n\nСоберите в приложении список коктейлей (до 12) → «Голосование» → выберите чат компании. Бот создаст опрос, где каждый отметит, что хочет.', { reply_markup: { inline_keyboard: [[{ text: '📋 Открыть списки', url: appLink('lists') }]] } });
  if (/^🔍|^\/find\s*$/.test(text)) return send('🔍 Напишите название или ингредиент — например, <i>апероль</i>, <i>лайм</i>, <i>мохито</i>.\n\nА в любом чате наберите <code>@' + BOT + ' </code> и название — и отправьте рецепт друзьям.', { reply_markup: { inline_keyboard: [[{ text: '↗️ Выбрать чат и отправить рецепт', switch_inline_query: '' }]] } });

  const q = text.replace(/^\/find\s+/, '');
  if (q && !q.startsWith('/')) {
    const res = await search(q, 8);
    if (!res.length) return send('Ничего не нашёл по «' + esc(q) + '». Попробуйте другое слово или ингредиент.', { reply_markup: KB });
    if (res.length === 1) return send(card(res[0]), { reply_markup: cardKb(res[0], false) });
    return send('Нашёл:', { reply_markup: { inline_keyboard: res.map(x => [{ text: (x.k ? '🫙 ' : '🍸 ') + x.n, callback_data: 'r:' + x.i.toString(36) }]) } });
  }
  return send('«Что пьём?» — звёздная карта коктейлей и настоек. Кнопки — внизу 👇', { reply_markup: KB });
}
