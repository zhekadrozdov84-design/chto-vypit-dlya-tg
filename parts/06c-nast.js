/* ===================== Карта «Настойки»: интерфейс ===================== */
function nTags(d,c){return`<div style="margin-top:12px"><span class="tg" style="background:${c[0]};color:${c[3]}">${bName(d.b)}</span>${d.ts.map(k=>`<span class="tg">${tName(k)}</span>`).join('')}<span class="tg">${lName(d.l)}</span><span class="tg" style="color:#F2B096">${d.src==='user'?(lang==='en'?'my infusion':'моя настойка'):d.src==='my'?t('mine')+' · '+t('nastTag'):t('nastTag')}</span>${d.src==='user'?`<button class="rc" id="edc"><i class="ti ti-pencil" aria-hidden="true"></i> ${lang==='en'?'Edit':'Изменить'}</button>`:''}</div>
<div style="font-size:13px;color:#B9B7D6;margin-top:2px"><i class="ti ti-droplet" aria-hidden="true"></i> ≈ ${d.abv} % · ${t('yieldL')} ≈ ${fmtMl(d.y)} · <i class="ti ti-clock" aria-hidden="true"></i> ${t('ready')(d.days)}</div>`}
/* Покупки для настоек — свои правила: ягоды и фрукты в граммах, сахар и мёд пересчитаны в граммы, плюс банки и срок, когда ставить. */
const SPOON_G=[[/мёд/i,30,10],[/сахар/i,25,8]];
function shopCalcN(l){const acc=new Map();let jars=0,maxD=0,nb=0;
[...l.items.entries()].filter(([i])=>D[i].nk&&!D[i].hidden).forEach(([i,k])=>{const d=D[i];nb+=k;jars+=k*Math.max(1,Math.ceil(d.y/1000));maxD=Math.max(maxD,d.days+3);
d.ings.forEach(x=>{if(x.a==='Вода')return;const am=x.am.replace(/\s*\(по желанию\)/,'').trim();let q,u,m=am.match(/^(\d+)$/);
if(m){q=+m[1];u='мл'}else{m=am.match(/^(½|\d+)\s*(.*)$/);if(!m)return;q=m[1]==='½'?.5:+m[1];u=m[2]}
const sg=SPOON_G.find(r=>r[0].test(x.a));if(sg&&/л\.$/.test(u)){q*=/ст\./.test(u)?sg[1]:sg[2];u='г'}
const key=canon(x.a)+'|'+u;const o=acc.get(key)||{name:canon(x.a),u,n:0};o.n+=q*k;acc.set(key,o)})});
const rows=[...acc.values()].map(o=>{let txt;if(o.u==='мл')txt=fmtMl(o.n);else if(o.u==='г')txt=o.n>=1000?fmtNum(Math.round(o.n/100)/10)+' '+t('kg'):Math.round(o.n)+' '+t('g');else if(o.u==='шт')txt=fmtNum(Math.ceil(o.n*2)/2)+' '+t('pcs');
else if(/палоч/.test(o.u))txt=Math.ceil(o.n)+' '+t('sticks');else if(/бутон/.test(o.u))txt=Math.ceil(o.n)+' '+t('cloves');else if(/звёзд/.test(o.u))txt=Math.ceil(o.n)+' '+t('stars');else txt=fmtNum(Math.round(o.n*10)/10)+' '+amtL(o.u);return{name:o.name,txt,c:catOf(o.name)}});
rows.sort((a,b)=>(a.c?1:0)-(b.c?1:0)||ingN(a.name).localeCompare(ingN(b.name),lang));return{rows,jars,maxD,nb}}
/* Переключение карт — только на общем уровне; в открытой группе верхний переключатель листает группы. */
function switchWorld(w){if(w===world||WT)return;if(inGroup)exitGroup();if(cardOpen)closeSheet('all');track('world',{to:w==='n'?'настойки':'коктейли'});WT={t0:performance.now(),dir:w==='n'?1:-1,w,bx0:bgx,sw:0};haptic('sel');document.querySelectorAll('.wsb').forEach(b=>b.classList.toggle('on',b.dataset.w===w))}
function applyWorld(){SF.b.clear();SF.t.clear();SF.l.clear();applyStatic();lastHdr='';updCount();document.getElementById('cv').setAttribute('aria-label',world==='n'?(lang==='en'?'Infusion map':'Карта настоек: звёздное небо групп настоек'):(lang==='en'?'Cocktail map':'Коктейльная карта: звёздное небо групп коктейлей'))}
document.querySelectorAll('.wsb').forEach(b=>b.onclick=()=>switchWorld(b.dataset.w));

/* ===================== Свои настойки и экран «Мои рецепты» ===================== */
function userToDN(u,existing){u.k='n';u.n=clean(u.n,40);u.ings=u.ings.map(([a,am])=>[clean(a,40),clean(am,30)]);u.steps=u.steps.map(x=>clean(x,300));if(!B[u.b]||!isN(u.b))u.b='n_vodka';
u.ts=(u.ts||[]).filter(k=>T[k]&&isN(k)).slice(0,3);if(!u.ts.length)u.ts=['n_berry'];u.days=clamp(Math.round(+u.days||14),1,365);u.abv=clamp(Math.round(+u.abv||35),1,96);u.y=clamp(Math.round(+u.y||500),50,10000);
const d=existing||{i:D.length};Object.assign(d,{nk:1,n:u.n,b:u.b,t:u.ts[0],ts:u.ts.slice(),l:u.days<=3?'n_fast':u.days<=10?'n_week':u.days<30?'n_month':'n_long',lx2:[],g:'',ing:u.ings.map(([a,am])=>a+'|'+am).join(';'),m:'',note:'',bt:0,src:'user',v:'',hidden:false,
days:u.days,abv:u.abv,y:u.y,stp:u.steps.map(x=>[x,x]),sp:parseSp('custom'),ings:u.ings.map(([a,am])=>({a,am})),u});d.sw=d.ings.some(x=>/сахар|мёд|sugar|honey/i.test(x.a)&&!/по желанию/.test(x.am));d.cnt=d.ings.length;
EN[d.n]=[d.n,'',''];if(!existing)D.push(d);BYNAME.set(d.n,d);reqOf(d).forEach(a=>{if(!ALLING.includes(a))ALLING.push(a)});ALLING.sort((a,b)=>a.localeCompare(b,'ru'));return d}
function showMine(){navMark(showMine);const E_=lang==='en';const mine=D.filter(d=>d.src==='user'&&!d.hidden);const mc=mine.filter(d=>!d.nk),mn=mine.filter(d=>d.nk);
const bc=`<button class="big" id="newc"><i class="ti ti-plus" aria-hidden="true"></i>${E_?'Cocktail':'Коктейль'}</button>`,bn=`<button class="big" id="newn" style="background:#F2B096;color:#3A1424"><i class="ti ti-plus" aria-hidden="true"></i>${E_?'Infusion':'Настойка'}</button>`;
const empty=txt=>`<div style="font-size:14px;color:#8E8CAE;padding:10px 0;line-height:1.55">${txt}</div>`;
const sec=(title,arr,emp)=>`<div class="lab">${title}${arr.length?' · '+arr.length:''}</div><div style="margin-top:2px">${arr.length?arr.map(rowHtml).join(''):empty(emp)}</div>`;
const parts=[sec(E_?'MY COCKTAILS':'МОИ КОКТЕЙЛИ',mc,E_?'None yet. Your cocktails appear on the map in their base, taste and skill groups.':'Пока нет. Свои коктейли появляются на карте в группах по основе, вкусу и сложности.'),
sec(E_?'MY INFUSIONS':'МОИ НАСТОЙКИ',mn,E_?'None yet. Your infusions appear on the infusion map.':'Пока нет. Свои настойки появляются на карте настоек.')];
openSheet(head(E_?'My recipes':'Мои рецепты')+`<div style="font-size:14px;color:#9997B8;margin-top:6px;line-height:1.5">${E_?'Add your own recipes — they are saved to your account.':'Добавляйте свои рецепты — они сохраняются в вашем аккаунте.'}</div>
<div style="display:flex;gap:8px;margin-top:14px">${world==='n'?bn+bc:bc+bn}</div>${(world==='n'?parts.reverse():parts).join('')}`);
sheet.querySelector('#newc').onclick=()=>showEditor(null,'c');sheet.querySelector('#newn').onclick=()=>showEditor(null,'n');bindChips()}
Object.assign(STR.ru,{cRnd:'Случайный'});Object.assign(STR.en,{cRnd:'Random'});

/* Пояснения к заготовкам из авторских коктейлей. */
Object.assign(PREPS,{
'Блади микс':{ru:'Готовая смесь для «Кровавой Мэри»: томатный сок с лимонным соком, вустерским соусом, табаско, солью и перцем. Можно купить или смешать заранее по своему вкусу.',en:'A ready Bloody Mary mix: tomato juice with lemon juice, Worcestershire sauce, Tabasco, salt and pepper. Buy it or mix your own in advance.'},
'Имбирный кордиал':{ru:'Сладко-кислый имбирный концентрат: свежий имбирь, сахар, вода и лимонная кислота или сок. Бывает готовый.',en:'A sweet-and-sour ginger concentrate made from fresh ginger, sugar, water and citric acid or juice. Also sold ready-made.'},
'Лаймовый кордиал':{ru:'Сладко-кислый лаймовый концентрат (как Rose’s): цедра и сок лайма, сахар, вода. Можно купить готовый.',en:'A sweet-and-sour lime concentrate (like Rose’s): lime zest and juice, sugar and water. Also sold ready-made.'},
'Клубничный сироп':{ru:'Готовый клубничный сироп или домашний: клубника и сахар 1:1 с небольшим количеством воды, проварить 5 минут и процедить.',en:'Ready-made strawberry syrup, or homemade: strawberries and sugar 1:1 with a splash of water, simmer 5 minutes and strain.'}});
