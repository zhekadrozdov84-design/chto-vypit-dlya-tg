/* ===================== Пояснения к заготовкам ===================== */
const PREPS={
'Сахарный сироп':{ru:'Сахар и вода 1:1: нагрейте, помешивая, пока сахар не растворится, не кипятите. Остудите. В холодильнике хранится до 2 недель.',en:'Sugar and water 1:1: heat and stir until the sugar dissolves, do not boil. Let it cool. Keeps up to 2 weeks in the fridge.'},
'Медовый сироп':{ru:'Мёд и тёплая вода 2:1 (или 1:1 — мягче). Размешайте до однородности, остудите. В холодильнике — до 2 недель.',en:'Honey and warm water 2:1 (or 1:1 for a lighter syrup). Stir until smooth and let it cool. Keeps up to 2 weeks in the fridge.'},
'Медово-имбирный сироп':{ru:'200 г мёда, 100 мл воды и 50 г тёртого свежего имбиря прогрейте 5 минут, настаивайте 30 минут и процедите. В холодильнике — до 2 недель.',en:'Warm 200 g honey, 100 ml water and 50 g grated fresh ginger for 5 minutes, steep for 30 minutes and strain. Keeps up to 2 weeks in the fridge.'},
'Малиновый сироп':{ru:'200 г малины, 200 г сахара и 100 мл воды варите 5–7 минут, протрите через сито и остудите. В холодильнике — до недели.',en:'Simmer 200 g raspberries, 200 g sugar and 100 ml water for 5–7 minutes, press through a sieve and cool. Keeps about a week in the fridge.'},
'Сироп корицы':{ru:'2–3 палочки корицы на 250 мл сахарного сиропа 1:1: прогрейте 10 минут и оставьте настаиваться на ночь, затем процедите.',en:'2–3 cinnamon sticks per 250 ml of 1:1 simple syrup: warm for 10 minutes, steep overnight and strain.'},
'Ванильный сироп':{ru:'Сахарный сироп 1:1 + стручок ванили, разрезанный вдоль (или 1 ч. л. экстракта на 250 мл). Прогрейте и дайте остыть вместе с ванилью.',en:'1:1 simple syrup plus a split vanilla pod (or 1 tsp extract per 250 ml). Warm it and let it cool with the vanilla in.'},
'Ананасовый сироп':{ru:'Кусочки ананаса засыпьте сахаром 1:1 по весу, оставьте в холодильнике на сутки, затем процедите получившийся сок-сироп.',en:'Cover pineapple chunks with sugar 1:1 by weight, leave in the fridge for a day, then strain off the syrup.'},
'Сироп демерара':{ru:'Тростниковый сахар демерара и горячая вода 2:1, размешать до растворения. Даёт карамельно-тофийный вкус.',en:'Demerara sugar and hot water 2:1, stir until dissolved. Adds a toffee-like note.'},
'Ромашковый кордиал':{ru:'2 ст. л. сушёной ромашки заварите в 250 мл горячей воды 5 минут, процедите, растворите 250 г сахара и ½ ч. л. лимонной кислоты.',en:'Steep 2 tbsp dried chamomile in 250 ml hot water for 5 minutes, strain, dissolve 250 g sugar and ½ tsp citric acid.'},
'Цитрусовый ром':{ru:'Снимите цедру с 1 лимона и 1 апельсина без белой части, залейте 500 мл светлого рома, настаивайте 2–3 дня в тёмном месте и процедите.',en:'Peel 1 lemon and 1 orange without the white pith, add to 500 ml light rum, infuse 2–3 days in a dark place and strain.'},
'Цитрусовая водка':{ru:'Как цитрусовый ром: цедра 1 лимона на 500 мл водки, 2–3 дня, процедить. Или готовая лимонная водка из магазина.',en:'Like citrus rum: zest of 1 lemon per 500 ml vodka, 2–3 days, strain. Or a ready-made lemon vodka.'},
'Ванильная водка':{ru:'Стручок ванили разрежьте вдоль и залейте 500 мл водки, 3–5 дней, затем достаньте стручок. Бывает и готовая в магазине.',en:'Split a vanilla pod lengthwise, add to 500 ml vodka for 3–5 days, then remove the pod. Also sold ready-made.'},
'Сироп маракуйи':{ru:'Мякоть 4–5 маракуй смешайте со 150 мл сахарного сиропа 1:1, дайте постоять час и процедите. Или готовый сироп.',en:'Mix the pulp of 4–5 passion fruits with 150 ml of 1:1 simple syrup, leave for an hour and strain. Or use a ready-made syrup.'},
'Холодный зелёный чай':{ru:'Заварите зелёный чай (1 ч. л. на 200 мл, 80 °C, 2–3 минуты), процедите и охладите в холодильнике.',en:'Brew green tea (1 tsp per 200 ml at 80 °C for 2–3 minutes), strain and chill in the fridge.'},
'Холодный чёрный чай':{ru:'Заварите чёрный чай (1 ч. л. на 200 мл, 3–4 минуты), процедите и охладите в холодильнике.',en:'Brew black tea (1 tsp per 200 ml, 3–4 minutes), strain and chill in the fridge.'},
'Кокосовые сливки':{ru:'Густая часть консервированного кокосового молока или готовые кокосовые сливки. Перед использованием взболтайте.',en:'The thick part of canned coconut milk, or ready-made coconut cream. Shake before use.'},
'Персиковое пюре':{ru:'Спелый персик без кожицы пробейте блендером, при желании добавьте немного сахарного сиропа и каплю лимонного сока.',en:'Blend a ripe peeled peach; add a little simple syrup and a drop of lemon juice if you like.'}};
function ingRow(x,d){const chk=bar.size&&!ALWAYS.has(x.a)&&!isOpt(x.am)&&bar.has(canon(x.a))?' <i class="ti ti-check" style="color:#97C459;font-size:14px" aria-label="'+t('home')+'"></i>':'';
const row=`<span>${esc(ingN(x.a))}${chk}</span><span class="ld"></span><span class="am">${esc(amtL(x.am))}</span>`;
const nn=!d.nk&&x.a.match(/^Настойка «(.+)»$/),nd=nn&&D.find(o=>o.nk&&o.n===nn[1]&&!o.hidden);
if(nd)return`<div class="ir" data-i="${nd.i}" style="cursor:pointer"><span>${esc(ingN(x.a))}${chk} <i class="ti ti-flask" style="color:#F2B096;font-size:14px" aria-hidden="true"></i></span><span class="ld"></span><span class="am">${esc(amtL(x.am))}</span></div>`;
const p=PREPS[x.a];if(!p)return`<div class="ir">${row}</div>`;
return`<details class="prep"><summary class="ir">${row}<i class="ti ti-chevron-down" style="margin-left:6px;color:#EAD3A6;font-size:14px" aria-hidden="true"></i></summary><div class="prt">${p[lang]}</div></details>`}

/* ===================== Раздел «Термины» ===================== */
/* Фото — Wikimedia Commons, свободные лицензии; автор и лицензия подписаны под каждым фото. */
const WM='https://upload.wikimedia.org/wikipedia/commons/';
const TERMS=[
{ru:['Шейкер','Металлический стакан с крышкой: в нём ингредиенты встряхивают со льдом — охлаждают, разбавляют и смешивают за 10–15 секунд.'],en:['Shaker','A metal tin with a lid used to shake ingredients with ice — chilling, diluting and mixing in 10–15 seconds.'],img:WM+'thumb/d/d3/Cocktail_shaker%2C_open.jpg/500px-Cocktail_shaker%2C_open.jpg',cr:'SKopp, CC BY 4.0'},
{ru:['Стрейнер (Хоторн)','Сито с пружиной: кладут на шейкер и процеживают коктейль, задерживая лёд и крупные кусочки.'],en:['Hawthorne strainer','A strainer with a coil spring placed on the shaker to hold back ice and large bits while pouring.'],img:WM+'thumb/c/cc/Cocktail-strainer.jpg/500px-Cocktail-strainer.jpg',cr:'Melikamp, CC BY-SA 3.0'},
{ru:['Джулеп-стрейнер','Ложка-сито с отверстиями — для смесительного стакана, когда коктейль размешивают, а не встряхивают.'],en:['Julep strainer','A perforated spoon-shaped strainer used with a mixing glass for stirred drinks.'],img:WM+'thumb/0/05/Julep_Strainer.jpg/500px-Julep_Strainer.jpg',cr:'Mangomix, CC BY-SA 3.0'},
{ru:['Двойная фильтрация','Процеживание сразу через стрейнер и мелкое ситечко: в бокал не попадают кусочки льда, мякоть и травы.'],en:['Double strain','Pouring through a strainer and a fine sieve at once so no ice shards, pulp or herbs get into the glass.'],img:WM+'thumb/6/6c/Double_straining_a_cocktail.jpg/500px-Double_straining_a_cocktail.jpg',cr:'SKopp, CC BY 4.0'},
{ru:['Джиггер','Мерный стаканчик с двумя сторонами (обычно 25 и 50 мл) — чтобы точно отмерять ингредиенты.'],en:['Jigger','A double-sided measuring cup (often 25 and 50 ml) for accurate pours.'],img:WM+'thumb/d/d4/Using_a_jigger.jpg/500px-Using_a_jigger.jpg',cr:'Stefan Giesbert, CC BY-SA 4.0'},
{ru:['Барная ложка','Длинная ложка с витой ручкой: размешивают коктейли, наливают слои и отмеряют ~5 мл.'],en:['Bar spoon','A long spoon with a twisted handle for stirring, layering and measuring about 5 ml.'],img:WM+'thumb/f/f9/Bar_spoon-01.jpg/500px-Bar_spoon-01.jpg',cr:'Benjamin Chun, CC BY-SA 2.0'},
{ru:['Стир (размешивание)','Коктейль размешивают барной ложкой со льдом в смесительном стакане 20–30 секунд — так получаются прозрачные крепкие коктейли без пузырьков.'],en:['Stir','Stirring with ice in a mixing glass for 20–30 seconds — gives clear, spirit-forward drinks with no air bubbles.'],img:WM+'thumb/c/cd/Stirring_with_a_bar_spoon.jpg/500px-Stirring_with_a_bar_spoon.jpg',cr:'SKopp, CC BY 4.0'},
{ru:['Мадлер','Пестик для разминания фруктов, ягод и трав прямо в бокале или шейкере.'],en:['Muddler','A pestle for crushing fruit, berries and herbs right in the glass or shaker.'],img:WM+'a/a8/Muddler.jpg',cr:'Dave Catania, public domain'},
{ru:['Мадлинг','Разминание мадлером: травы — легко, чтобы выделить аромат, цитрусы и ягоды — сильнее, чтобы пошёл сок.'],en:['Muddling','Pressing with a muddler: herbs gently to release aroma, citrus and berries harder to release juice.'],img:WM+'thumb/4/4a/Muddling.jpg/500px-Muddling.jpg',cr:'Dinner Series, CC BY 2.0'},
{ru:['Дэш','Одна капля-«выплеск» биттера из бутылочки с дозатором, около 1 мл.'],en:['Dash','One shake of bitters from a dasher bottle, about 1 ml.'],img:WM+'thumb/1/1c/Angostura_bitters_002.JPG/500px-Angostura_bitters_002.JPG',cr:'Gryffindor, public domain'},
{ru:['Сухой шейк','Встряхивание без льда, обычно с белком: так белок взбивается в плотную пену. Потом добавляют лёд и встряхивают ещё раз.'],en:['Dry shake','Shaking without ice, usually with egg white, to whip a dense foam; then ice is added and it is shaken again.']},
{ru:['Билд','Коктейль собирают прямо в бокале со льдом: наливают по очереди и слегка перемешивают.'],en:['Build','The drink is made right in the glass over ice: pour in order and stir lightly.']},
{ru:['Флоат (слой)','Ингредиент медленно наливают по барной ложке, чтобы он лёг слоем сверху и не смешался.'],en:['Float','Pouring slowly over the back of a bar spoon so the ingredient sits as a separate layer on top.']},
{ru:['Сбрызнуть цедрой','Полоску цедры сгибают над бокалом кожицей вниз — эфирные масла брызгают на поверхность и дают аромат.'],en:['Express a twist','Bending a strip of peel skin-side down over the glass so its oils spray onto the drink.']},
{ru:['Ободок','Край бокала смачивают долькой цитруса и обмакивают в соль или сахар.'],en:['Rim','Moistening the rim with a citrus wedge and dipping it in salt or sugar.']}];
function showTerms(){track('terms');openSheet(head(lang==='en'?'Glossary':'Термины')+`<div style="font-size:14px;color:#9997B8;margin-top:6px">${lang==='en'?'Bar tools and techniques used in the recipes.':'Барные инструменты и техники, которые встречаются в рецептах.'}</div>`+
TERMS.map(x=>{const [n,txt]=x[lang];return`<div style="margin-top:16px;padding:14px;border-radius:16px;background:rgba(220,225,255,.04);border:0.5px solid rgba(220,225,255,.1)">${x.img?`<img src="${x.img}" alt="${esc(n)}" loading="lazy" style="width:100%;height:180px;object-fit:cover;border-radius:12px;display:block;background:#1a1f3a"><div style="font-size:10px;color:#6F6D8E;margin-top:4px">${lang==='en'?'Photo':'Фото'}: ${esc(x.cr)} · Wikimedia Commons</div>`:''}<div style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:#F3F1FF;margin-top:${x.img?8:0}px">${esc(n)}</div><div style="font-size:15px;line-height:1.55;color:#DCDAF0;margin-top:4px">${txt}</div></div>`}).join(''),true)}

/* ===================== Поиск по нескольким фильтрам ===================== */
/* Основа — «или» внутри группы; вкусы и группы сложности — «и» (сладкие + малосоставные + водка). */
const SF={b:new Set(),t:new Set(),l:new Set(),open:false};
const tagsL=d=>[d.l,...(d.lx2||[])];
function searchHits(q){return D.filter(d=>!d.hidden&&!d.nk===(world==='c')).filter(d=>{if(SF.b.size&&!SF.b.has(d.b))return false;for(const k of SF.t)if(!d.ts.includes(k))return false;for(const k of SF.l)if(!tagsL(d).includes(k))return false;
if(!q)return true;return(d.n+'|'+(EN[d.n]?EN[d.n][0]:'')+'|'+d.ings.map(x=>x.a+'|'+(ING_EN[x.a]||'')).join('|')).toLowerCase().includes(q)})}
function showSearchOld(){const nF=SF.b.size+SF.t.size+SF.l.size;const chips=(set,keys,lab,kind)=>keys.map(k=>`<button class="tgl${set.has(k)?' on':''}" data-sf="${kind}:${k}">${esc(lab(k))}</button>`).join('');
openSheet(head(t('search'))+`<input class="din" id="q" placeholder="${t('searchPh')}" style="width:100%;margin-top:12px" value="${esc(SF.q||'')}">
<div style="display:flex;gap:8px;margin-top:10px"><button class="sec" id="sft" style="flex:1"><i class="ti ti-adjustments-horizontal" aria-hidden="true"></i>${lang==='en'?'Filters':'Фильтры'}${nF?` · ${nF}`:''}</button><button class="sec" id="rndb" style="flex:1"><i class="ti ti-dice-5" aria-hidden="true"></i>${t(world==='n'?'nRnd':'cRnd')}</button></div>
<div id="sfp" style="display:${SF.open?'block':'none'}"><div class="lab">${t('segB')}</div><div style="margin-top:8px;display:flex;flex-wrap:wrap">${chips(SF.b,Object.keys(B).filter(k=>isN(k)===(world==='n')),bName,'b')}</div>
<div class="lab">${t('segT')}</div><div style="margin-top:8px;display:flex;flex-wrap:wrap">${chips(SF.t,Object.keys(T).filter(k=>isN(k)===(world==='n')),tName,'t')}</div>
<div class="lab">${t(world==='n'?'segLn':'segL')}</div><div style="margin-top:8px;display:flex;flex-wrap:wrap">${chips(SF.l,world==='n'?KORDER_N.l:[1,2,3,4,'few','many','batch','classic'],lName,'l')}</div>${nF?`<button class="sec" id="sfr" style="width:100%;margin-top:6px">${t('reset')}</button>`:''}</div>
<div id="res" style="margin-top:6px"></div>`);const q=sheet.querySelector('#q'),res=sheet.querySelector('#res');
const run=()=>{const s=q.value.trim().toLowerCase();SF.q=q.value;const nf=SF.b.size+SF.t.size+SF.l.size;if(!s&&!nf){res.innerHTML=`<div style="font-size:14px;color:#8E8CAE;padding:10px 0">${t('searchHint')} ${world==='n'?(lang==='en'?'Filters combine: e.g. Berry + About a week.':'Фильтры складываются: например, Ягодные + Неделя.'):(lang==='en'?'Filters combine: e.g. Sweet + Few ingredients + Vodka.':'Фильтры складываются: например, Сладкие + Малосоставные + Водка.')}</div>`;return}
const f=searchHits(s);trackSearch(f.length);res.innerHTML=`<div style="font-size:12px;color:#8E8CAE;margin:8px 0 2px">${lang==='en'?'Found':'Найдено'}: ${f.length}</div>`+(f.length?f.map(rowHtml).join(''):`<div style="font-size:14px;color:#8E8CAE;padding:10px 0">${t('nothing')}</div>`);bindChips()};
q.oninput=run;run();
sheet.querySelector('#sft').onclick=()=>{SF.open=!SF.open;showSearch()};sheet.querySelector('#rndb').onclick=()=>{haptic();showRandom()};
const r=sheet.querySelector('#sfr');if(r)r.onclick=()=>{SF.b.clear();SF.t.clear();SF.l.clear();showSearch()};
sheet.querySelectorAll('[data-sf]').forEach(b=>b.onclick=()=>{const[kind,k0]=b.dataset.sf.split(':');const k=kind==='l'&&/^\d$/.test(k0)?+k0:k0;const set=SF[kind];set.has(k)?set.delete(k):set.add(k);haptic('sel');const y=sheet.scrollTop;showSearch();sheet.scrollTop=y});
if(!SF.open)setTimeout(()=>q.focus(),260)}

/* ===================== Свои коктейли ===================== */
const USER=[];/* сохраняемое описание: {n,b,ts,l,bt,g,ings:[[a,am]],steps:[]} */
/* Пользовательский текст очищается от символов разметки — он выводится в HTML. */
const clean=(x,n)=>String(x||'').replace(/[<>&"`]/g,'').slice(0,n||80);
function userToD(u,existing){u.n=clean(u.n,40);u.g=clean(u.g,30);u.ings=u.ings.map(([a,am])=>[clean(a,40),clean(am,30)]);u.steps=u.steps.map(x=>clean(x,300));if(!B[u.b]||isN(u.b))u.b='vodka';u.ts=(u.ts||[]).filter(k=>T[k]&&!isN(k));if(!u.ts.length)u.ts=['sweet'];u.l=[1,2,3,4].includes(+u.l)?+u.l:2;
const d=existing||{i:D.length};Object.assign(d,{n:u.n,b:u.b,t:u.ts[0],ts:u.ts.slice(0,3),l:u.l,g:u.g||'',ing:u.ings.map(([a,am])=>a+'|'+am).join(';'),m:u.steps.join(' '),note:'',bt:u.bt?1:0,src:'user',v:'',hidden:false,ings:u.ings.map(([a,am])=>({a,am})),sp:parseSp('custom L='+u.l),u});
const cnt=d.ings.filter(x=>!isOpt(x.am)&&!/^(Лёд|Вода|Кипяток|Соль|Соль и перец)$/.test(x.a)).length;d.cnt=cnt;d.lx2=[];if(cnt<=3)d.lx2.push('few');if(cnt>=6)d.lx2.push('many');if(d.bt)d.lx2.push('batch');
EN[d.n]=[d.n,d.m,''];CUSTOM[d.n]={ru:u.steps,en:u.steps};if(!existing)D.push(d);BYNAME.set(d.n,d);
reqOf(d).forEach(a=>{if(!ALLING.includes(a))ALLING.push(a)});ALLING.sort((a,b)=>a.localeCompare(b,'ru'));return d}
/* Редактор своих рецептов: коктейль или настойка (kind 'n'). */
function showEditor(d,kind){const N=d?!!d.nk:kind==='n';const E_=lang==='en';
const u=d?JSON.parse(JSON.stringify(d.u)):(N?{k:'n',n:'',b:'n_vodka',ts:[],days:14,abv:35,y:500,ings:[[E_?'Vodka':'Водка','500'],['',''],['','']],steps:['']}:{n:'',b:'vodka',ts:[],l:2,bt:0,g:'',ings:[['',''],['',''],['','']],steps:['']});
const st={b:u.b,ts:[...u.ts],l:u.l,bt:u.bt};const bK=Object.keys(B).filter(k=>isN(k)===N),tK=Object.keys(T).filter(k=>isN(k)===N);
const lab=(ru,en)=>`<div class="lab">${E_?en:ru}</div>`;const numIn=(id,v,ph,mx)=>`<input class="din" id="${id}" type="number" inputmode="numeric" min="1" max="${mx}" value="${esc(v==null?'':v)}" placeholder="${ph}" style="width:100%;margin-top:8px">`;
const rd=id=>{const x=sheet.querySelector('#'+id);return x?x.value:null};
const draw=()=>{if(!draw.skip){const ingRows=[...sheet.querySelectorAll('[data-ir]')].map(r=>[r.querySelector('.ia').value,r.querySelector('.im').value]);if(ingRows.length)u.ings=ingRows}draw.skip=0;
[['es',v=>u.steps=v.split('\n')],['en',v=>u.n=v],['eg',v=>u.g=v],['ed',v=>u.days=v],['ea',v=>u.abv=v],['ey',v=>u.y=v]].forEach(([id,f])=>{const v=rd(id);if(v!==null)f(v)});
openSheet(head(d?(N?(E_?'My infusion':'Моя настойка'):(E_?'Edit cocktail':'Мой коктейль')):(N?(E_?'New infusion':'Новая настойка'):(E_?'New cocktail':'Новый коктейль')),true)+
lab('Название','Name')+`<input class="din" id="en" maxlength="40" style="width:100%;margin-top:8px" value="${esc(u.n)}" placeholder="${N?(E_?'e.g. Grandma’s cherry':'Например: Бабушкина вишнёвка'):(E_?'e.g. Party punch':'Например: Пунш на дачу')}">`+
lab(N?'На чём настаиваем':'Основной алкоголь',N?'Base spirit':'Main spirit')+`<div style="margin-top:8px;display:flex;flex-wrap:wrap">${bK.map(k=>`<button class="tgl${st.b===k?' on':''}" data-eb="${k}">${esc(bName(k))}</button>`).join('')}</div>`+
lab('Вкусы (до 3, первый — основной)','Tastes (up to 3, first is main)')+`<div style="margin-top:8px;display:flex;flex-wrap:wrap">${tK.map(k=>`<button class="tgl${st.ts.includes(k)?' on':''}" data-et="${k}">${esc(tName(k))}${st.ts[0]===k?' ★':''}</button>`).join('')}</div>`+
(N?`<div style="display:flex;gap:8px"><div style="flex:1">${lab('Дней настаивать','Days to infuse')}${numIn('ed',u.days,'14',365)}</div><div style="flex:1">${lab('Крепость ≈ %','Strength ≈ %')}${numIn('ea',u.abv,'35',96)}</div><div style="flex:1">${lab('Выход ≈ мл','Yield ≈ ml')}${numIn('ey',u.y,'500',10000)}</div></div><div style="font-size:12px;color:#8E8CAE;margin-top:4px">${E_?'The time group (up to 3 days, a week…) is set from the number of days.':'Группа срока («До 3 дней», «Неделя»…) определится сама по числу дней.'}</div>`:
lab('Сложность','Skill')+`<div style="margin-top:8px;display:flex;flex-wrap:wrap">${[1,2,3,4].map(k=>`<button class="tgl${st.l===k?' on':''}" data-el="${k}">${esc(lName(k))}</button>`).join('')}<button class="tgl${st.bt?' on':''}" data-ebt="1">${esc(lName('batch'))}</button></div>`+
`<div style="font-size:12px;color:#8E8CAE;margin-top:2px">${E_?'“Few” / “Many ingredients” are set automatically.':'«Малосоставные» и «Многосоставные» определятся сами по числу ингредиентов.'}</div>`+
lab('Бокал','Glass')+`<input class="din" id="eg" maxlength="30" style="width:100%;margin-top:8px" value="${esc(u.g||'')}" placeholder="${E_?'e.g. highball':'Например: хайбол'}">`)+
lab('Ингредиенты','Ingredients')+`<div style="font-size:12px;color:#8E8CAE;margin-top:4px">${N?(E_?'Amount: a number = ml, or text like “200 g”, “2 tbsp”, “1 pc”.':'Количество: число — это мл, или текстом: «200 г», «2 ст. л.», «1 шт».'):(E_?'Amount: a number = ml, or text like “top up”, “2 dashes”, “1 pc”.':'Количество: число — это мл, или текстом: «долить», «2 дэша», «1 шт», «для подачи».')}</div>`+
u.ings.map(([a,am],i)=>`<div data-ir="${i}" style="display:flex;gap:6px;margin-top:8px"><input class="din ia" list="ingl" value="${esc(a)}" placeholder="${E_?'Ingredient':'Ингредиент'}" style="flex:2"><input class="din im" value="${esc(am)}" placeholder="${N?'200 г':'50'}" style="flex:1;min-width:0"><button class="cl" data-rm="${i}" aria-label="×"><i class="ti ti-x" aria-hidden="true"></i></button></div>`).join('')+
`<datalist id="ingl">${ALLING.map(a=>`<option value="${esc(a)}">`).join('')}</datalist><button class="sec" id="eadd" style="margin-top:8px"><i class="ti ti-plus" aria-hidden="true"></i>${E_?'Add ingredient':'Ингредиент'}</button>`+
lab('Как готовить (каждый шаг с новой строки)','Method (one step per line)')+`<textarea id="es" rows="4" style="width:100%;margin-top:8px;box-sizing:border-box;border-radius:12px;border:0.5px solid rgba(220,225,255,.2);background:rgba(220,225,255,.05);color:#EEEDFE;padding:10px 12px;font-size:14px">${esc(u.steps.join('\n'))}</textarea>`+
`<div id="eerr" style="font-size:13px;color:#FF8A95;margin-top:8px;min-height:18px"></div><div style="display:flex;gap:8px;margin-top:6px">${d?`<button class="sec" id="edel" style="height:46px"><i class="ti ti-trash" aria-hidden="true"></i>${E_?'Delete':'Удалить'}</button>`:''}<button class="big" id="esave"${N?' style="background:#F2B096;color:#3A1424"':''}>${E_?'Save':'Сохранить'}</button></div>`,true);
sheet.querySelector('#back').onclick=()=>d?showCard(d):showMine();
sheet.querySelectorAll('[data-eb]').forEach(b=>b.onclick=()=>{st.b=b.dataset.eb;draw()});
sheet.querySelectorAll('[data-et]').forEach(b=>b.onclick=()=>{const k=b.dataset.et;const i=st.ts.indexOf(k);if(i>=0)st.ts.splice(i,1);else if(st.ts.length<3)st.ts.push(k);draw()});
sheet.querySelectorAll('[data-el]').forEach(b=>b.onclick=()=>{st.l=+b.dataset.el;draw()});
const bt=sheet.querySelector('[data-ebt]');if(bt)bt.onclick=()=>{st.bt=st.bt?0:1;draw()};
const rows=()=>[...sheet.querySelectorAll('[data-ir]')].map(r=>[r.querySelector('.ia').value,r.querySelector('.im').value]);
sheet.querySelector('#eadd').onclick=()=>{u.ings=[...rows(),['','']];draw.skip=1;draw()};
sheet.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{const r=rows();r.splice(+b.dataset.rm,1);u.ings=r.length?r:[['','']];draw.skip=1;draw()});
const del=sheet.querySelector('#edel');if(del)del.onclick=()=>{d.hidden=true;fav.delete(d.i);lists.forEach(l=>l.items.delete(d.i));delete notes[d.i];const k=USER.indexOf(d.u);if(k>=0)USER.splice(k,1);updCount();build();showMine()};
sheet.querySelector('#esave').onclick=()=>{const err=sheet.querySelector('#eerr');const n=sheet.querySelector('#en').value.trim();const ings=rows().map(([a,am])=>[a.trim(),am.trim()]).filter(([a])=>a).map(([a,am])=>[a[0].toUpperCase()+a.slice(1),am||'по вкусу']);
const steps=sheet.querySelector('#es').value.split('\n').map(s=>s.trim()).filter(Boolean);
if(!n){err.textContent=E_?'Enter a name':'Введите название';return}if(!st.ts.length){err.textContent=E_?'Pick at least one taste':'Выберите хотя бы один вкус';return}if(!ings.length){err.textContent=E_?'Add ingredients':'Добавьте ингредиенты';return}
if((!d||d.n!==n)&&BYNAME.has(n)&&!BYNAME.get(n).hidden){err.textContent=E_?'A recipe with this name already exists':'Рецепт с таким названием уже есть';return}
let nu;if(N){const days=+rd('ed');if(!(days>=1)){err.textContent=E_?'Enter the number of days':'Укажите, сколько дней настаивать';return}nu={k:'n',n,b:st.b,ts:st.ts,days,abv:+rd('ea')||35,y:+rd('ey')||500,ings,steps:steps.length?steps:[E_?'Infuse, strain and bottle.':'Настаивайте, процедите и разлейте по бутылкам.']}}
else nu={n,b:st.b,ts:st.ts,l:st.l,bt:st.bt,g:sheet.querySelector('#eg').value.trim(),ings,steps:steps.length?steps:[E_?'Mix and serve.':'Смешайте и подавайте.']};
const conv=N?userToDN:userToD;track(d?'recipe_edit':'recipe_create',{kind:N?'настойка':'коктейль'});if(d){BYNAME.delete(d.n);const k=USER.indexOf(d.u);USER[k>=0?k:USER.length]=nu;conv(nu,d)}else{USER.push(nu);d=conv(nu)}
haptic();build();showCard(d)}};
draw()}

/* ===================== Список для группового чата ===================== */
function listText(l){const E_=lang==='en';const s=shopCalc(l),sn=shopCalcN(l);const all=[...l.items.entries()].filter(([i])=>!D[i].hidden);const cs=all.filter(([i])=>!D[i].nk),ns=all.filter(([i])=>D[i].nk);const lines=[`🍸 ${l.name}`];
if(cs.length){lines.push('',E_?'Cocktails:':'Коктейли:');cs.forEach(([i,k])=>{const d=D[i];lines.push(`• ${nm(d)} — ${k} ${d.g==='кувшин'?t('pitch'):t('serv')}`)})}
if(ns.length){lines.push('',t('nastL'));ns.forEach(([i,k])=>lines.push(`• ${nm(D[i])} — ${k} ${t('bat')} (${t('ready')(D[i].days)})`))}
lines.push('',E_?'Shopping list:':'Что купить:');[...s.bottles,...s.fruits,...s.other].forEach(r=>lines.push(`• ${ingN(r.name)} — ${r.txt.replace(/<[^>]+>/g,'')}`));
if(s.ice)lines.push(`• ${t('ice')} — ≈ ${fmtNum(s.ice)} ${t('kg')}`);
if(sn.nb){if(cs.length)lines.push('',t('secN')+':');sn.rows.forEach(r=>lines.push(`• ${ingN(r.name)} — ${r.txt}`));lines.push(`• ${t('jars')(sn.jars)}`,'',t('startBy')(sn.maxD))}return lines.join('\n')}
