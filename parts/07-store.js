/* ===== Сохранение: у каждого пользователя свои данные =====
   В Telegram — CloudStorage (привязано к аккаунту и боту, синхронизируется между устройствами).
   В обычном браузере — localStorage. Коктейли сохраняются по названию, чтобы порядок базы можно было менять. */
const KEYS=['wtd_custom','wtd_prefs','wtd_fav','wtd_bar','wtd_lists','wtd_notes'];const CHUNK=3900;
const BYNAME=new Map(D.map(d=>[d.n,d]));
/* Переименования 16.11.2026: старые названия в сохранённых избранном, списках, заметках и баре ведут на новые. */
const RENAMED={'Перцовка':'Перечная','Мартинез':'Вишенка','Малина-вишня-джин':'Мавиджи','Анна-Мария':'Клубника Bianko','Малиновый закат':'Малинка','Супь':'Супчик','Лимон-лайм':'Лайм-лимон','Мандарин':'Мандаринка',
'Нежный Русский':'Клубничный русский','Кловер Клаб Тропа':'Мавиджи клаб','Облепиховый сауэр':'Облепсауэр','Блади Мэри Тропа':'Хреновая Мэри','Ягодный Негрони':'Ягодрони','Пенициллин на супе':'Лечебный супчик','Кир Рояль малина-смородина':'Смородиновый кир','Мартини Рояль на Анне-Марии':'Клубничный рояль','Мартинез на Мартинезе':'Вишнёвый мартинез','Брусничный космополитен':'Брусмополитен','Маргарита Тропа':'Лаймарита','Мандариновый кулер':'Мандаринка-тоник'};
Object.entries(RENAMED).forEach(([o,n])=>{const d=D.find(x=>x.n===n);if(d&&!BYNAME.has(o))BYNAME.set(o,d)});
const barRN=n=>{const m=/^Настойка «(.+)»$/.exec(n);return m&&RENAMED[m[1]]?'Настойка «'+RENAMED[m[1]]+'»':n};
const useCloud=!!(tg&&tg.CloudStorage&&tg.isVersionAtLeast&&tg.isVersionAtLeast('6.9'));
const cs={
get(keys){return new Promise(res=>{if(!useCloud){const o={};keys.forEach(k=>{try{o[k]=localStorage.getItem(k)||''}catch(e){o[k]=''}});return res(o)}
try{tg.CloudStorage.getItems(keys,(err,v)=>res(err||!v?{}:v))}catch(e){res({})}})},
set(k,v){return new Promise(res=>{if(!useCloud){try{v===''?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(e){}return res()}
try{v===''?tg.CloudStorage.removeItem(k,()=>res()):tg.CloudStorage.setItem(k,v,()=>res())}catch(e){res()}})}};
async function readKey(k){const a=(await cs.get([k]))[k]||'';if(!a.startsWith('#'))return a;const n=+a.slice(1)||0;if(!n)return'';const ks=[...Array(n)].map((_,j)=>k+'_p'+j);const v=await cs.get(ks);return ks.map(x=>v[x]||'').join('')}
const prevLen={};
async function writeKey(k,s){if(s.length<=CHUNK){await cs.set(k,s);}else{const parts=[];for(let j=0;j<s.length;j+=CHUNK)parts.push(s.slice(j,j+CHUNK));for(let j=0;j<parts.length;j++)await cs.set(k+'_p'+j,parts[j]);await cs.set(k,'#'+parts.length);
for(let j=parts.length;j<(prevLen[k]||0);j++)await cs.set(k+'_p'+j,'');prevLen[k]=parts.length;return}
for(let j=0;j<(prevLen[k]||0);j++)await cs.set(k+'_p'+j,'');prevLen[k]=0}
function snap(){return{
wtd_custom:JSON.stringify(USER),
wtd_prefs:JSON.stringify({lang,age:ageOk?1:0,F,world,sup:SUP}),
wtd_fav:JSON.stringify([...fav].map(i=>D[i].n)),
wtd_bar:JSON.stringify([...bar]),
wtd_lists:JSON.stringify(lists.map(l=>({id:l.id,name:l.name,def:l.def,items:[...l.items.entries()].map(([i,k])=>[D[i].n,k])}))),
wtd_notes:JSON.stringify(Object.fromEntries(Object.entries(notes).filter(([,v])=>v).map(([i,v])=>[D[i].n,v])))}}
let saved={},loaded=false,saving=false;
async function saveNow(){if(!loaded||saving)return;saving=true;try{const s=snap();for(const k of KEYS){if(s[k]!==saved[k]){await writeKey(k,s[k]);saved[k]=s[k]}}}finally{saving=false}}
setInterval(saveNow,1200);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')saveNow()});
window.addEventListener('pagehide',saveNow);
const pj=(s,d)=>{try{return s?JSON.parse(s):d}catch(e){return d}};
async function loadAll(){const v={};for(const k of KEYS)v[k]=await readKey(k);
pj(v.wtd_custom,[]).forEach(u=>{try{if(u&&u.n&&!BYNAME.has(u.n)&&Array.isArray(u.ings)){USER.push(u);u.k==='n'?userToDN(u):userToD(u)}}catch(e){}});
const p=pj(v.wtd_prefs,{});if(p.lang==='ru'||p.lang==='en')lang=p.lang;if(p.F)Object.keys(F).forEach(k=>{F[k]=!!p.F[k]});if(p.world==='n'){world='n';skyK=1}if(p.sup&&typeof p.sup==='object')Object.assign(SUP,p.sup);
pj(v.wtd_fav,[]).forEach(n=>{const d=BYNAME.get(n);if(d)fav.add(d.i)});
pj(v.wtd_bar,[]).forEach(n=>bar.add(barRN(n)));
lists=pj(v.wtd_lists,[]).map(l=>({id:+l.id||0,name:String(l.name||'').slice(0,40)||'—',def:clamp(+l.def||4,1,99),shop:false,items:new Map((l.items||[]).map(([n,k])=>[BYNAME.get(n),clamp(+k||1,1,99)]).filter(([d])=>d).map(([d,k])=>[d.i,k]))}));
lid=Math.max(0,...lists.map(l=>l.id))+1;
Object.entries(pj(v.wtd_notes,{})).forEach(([n,txt])=>{const d=BYNAME.get(n);if(d&&txt)notes[d.i]=String(txt)});
saved=snap();KEYS.forEach(k=>{if((v[k]||'')==='')saved[k]=''});loaded=true;return !!p.age}
/* ===== Открытие по ссылке «Поделиться»: t.me/whattodrinkuh_bot/app?startapp=m_… ===== */
function startParam(){let s='';try{s=(tg&&tg.initDataUnsafe&&tg.initDataUnsafe.start_param)||''}catch(e){}if(!s){const q=new URLSearchParams(location.search);s=q.get('tgWebAppStartParam')||q.get('startapp')||''}return s}
function lsAge(){try{return localStorage.getItem('wtd_age')==='1'}catch(e){return false}}
let pendingMenu=null;(()=>{const s=startParam();if(!/^m_[0-9a-z]+x\d+(-[0-9a-z]+x\d+)*$/.test(s))return;const items=new Map();s.slice(2).split('-').forEach(p=>{const[a,b]=p.split('x');const i=parseInt(a,36);if(D[i])items.set(i,clamp(+b||1,1,99))});if(items.size)pendingMenu=items})();
function sameItems(a,b){if(a.size!==b.size)return false;for(const[k,v]of a)if(b.get(k)!==v)return false;return true}
function afterAge(){if(!pendingMenu||!loaded)return;const items=pendingMenu;pendingMenu=null;track('menu_import',{items:items.size});
if(!lists.some(l=>sameItems(l.items,items))){const vals=[...items.values()];lists.push({id:lid++,name:t('sharedList'),items,shop:false,def:vals.every(v=>v===vals[0])?vals[0]:4})}
updCount();showLists()}
loadAll().then(age=>{applyStatic();supDay();supFooter();if(USER.length||world==='n'){build();applyWorld()}hubs.forEach(h=>{h.n=glabel(h.k);h._k=null});lastHdr='';fontsOk++;PL.forEach(q=>q._lk=null);updCount();if(age||ageOk||lsAge())hideAge();else document.getElementById('age').style.display='flex'}).catch(()=>{loaded=true;if(!lsAge())document.getElementById('age').style.display='flex'});
</script>
</body></html>
