const TOPRE=/тоник|содовая|газированная вода|кола|спрайт|имбирное пиво|имбирный эль|игрист|шампан|просекко|газировка/i;
function parseSp(s){const o={tech:'',f:{}};(s||'shake').split(' ').forEach((tk,i)=>{if(i===0){o.tech=tk;return}const p=tk.indexOf('=');if(p>0)o.f[tk.slice(0,p)]=tk.slice(p+1).replace(/_/g,' ');else o.f[tk]=true});return o}
const LVL={build:1,buildN:1,muddle:1,swizzle:1,layer:1,shake:2,muddleS:2,dry:2,blend:2,stir:3};
const ST={ru:{chill:g=>`Охладите ${g}: наполните льдом или поставьте в морозилку на 5–10 минут.`,rimsalt:'Сделайте соляной ободок: проведите долькой лайма по краю бокала и обмакните край в мелкую соль.',rimsugar:'Сделайте сахарный ободок: смочите край бокала долькой лимона и обмакните его в сахар.',
pourS:l=>`Налейте в шейкер: ${l}.`,shakeIce:'Наполните шейкер льдом почти доверху, плотно закройте и энергично встряхивайте 12–15 секунд — пока шейкер не покроется инеем.',strainUp:'Вылейте лёд из бокала и процедите коктейль через стрейнер и мелкое ситечко (двойная фильтрация).',strainR:(g,cr)=>`Наполните ${g} ${cr?'колотым':'свежим'} льдом и процедите в него коктейль через стрейнер.`,
dry1:'Сначала встряхивайте шейкер без льда 10 секунд (сухой шейк) — так белок взобьётся в плотную пену.',dry2:'Добавьте лёд и встряхивайте ещё 12–15 секунд.',stir1:'Наполните смесительный стакан льдом.',stir2:l=>`Налейте в него: ${l}.`,stir3:'Перемешивайте барной ложкой 20–30 секунд, пока стенки стакана не станут ледяными.',stirUp:'Вылейте лёд из бокала и процедите коктейль через стрейнер.',stirR:g=>`Положите в ${g} крупный кубик льда и процедите коктейль на него.`,
rinse:(i,g)=>`Ополосните бокал: налейте в него несколько миллилитров ингредиента «${i}», покрутите, чтобы смочить стенки, и вылейте излишки.`,fill:g=>`Наполните ${g} льдом доверху.`,pourList:l=>`Налейте по очереди: ${l}.`,pourInto:(g,l)=>`Налейте в охлаждённый ${g}: ${l}.`,top:l=>`Медленно долейте по стенке: ${l} — так сохранится газ.`,stirGentle:'Аккуратно перемешайте барной ложкой 2–3 раза снизу вверх.',stirLight:'Слегка перемешайте барной ложкой.',
mud:(g,l)=>`Положите в ${g}: ${l} — и разомните мадлером, чтобы выделились сок и аромат.`,mudS:l=>`Положите в шейкер: ${l} — и разомните мадлером.`,crushed:'Наполните бокал колотым льдом.',addRest:l=>`Налейте: ${l}.`,mudEnd:'Перемешайте барной ложкой снизу вверх и досыпьте колотого льда горкой.',
layer1:(g,x)=>`Возьмите ${g} и барную ложку. Налейте первый слой — ${x}.`,layerN:x=>`Приложите барную ложку выпуклой стороной вверх к стенке бокала над напитком и очень медленно налейте по ней ${x} — он ляжет следующим слоем.`,
blend1:l=>`Положите в блендер: ${l} — и добавьте около стакана колотого льда.`,blend2:'Взбивайте 10–15 секунд до однородной ледяной текстуры.',blend3:g=>`Перелейте коктейль в ${g}.`,
swz1:g=>`Наполните ${g} колотым льдом.`,swz2:'Опустите в бокал барную ложку и быстро вращайте её между ладонями 10–15 секунд, пока бокал не покроется инеем.',swz3:'Досыпьте колотого льда горкой.',
garn:x=>`Украсьте ${x} и сразу подавайте.`,ang:'Капните на пену несколько капель ангостуры и сразу подавайте.',serve:'Сразу подавайте.',glass:'бокал'},
en:{chill:g=>`Chill the ${g}: fill it with ice or put it in the freezer for 5–10 minutes.`,rimsalt:'Make a salt rim: run a lime wedge around the rim and dip it into fine salt.',rimsugar:'Make a sugar rim: moisten the rim with a lemon wedge and dip it into sugar.',
pourS:l=>`Pour into the shaker: ${l}.`,shakeIce:'Fill the shaker almost to the top with ice, close it tightly and shake hard for 12–15 seconds — until the shaker is frosty.',strainUp:'Discard the ice from the glass and strain the cocktail through a strainer and a fine sieve (double strain).',strainR:(g,cr)=>`Fill the ${g} with ${cr?'crushed':'fresh'} ice and strain the cocktail into it.`,
dry1:'First shake without ice for 10 seconds (dry shake) to whip the egg white into a dense foam.',dry2:'Add ice and shake for another 12–15 seconds.',stir1:'Fill a mixing glass with ice.',stir2:l=>`Pour in: ${l}.`,stir3:'Stir with a bar spoon for 20–30 seconds, until the outside of the glass is ice-cold.',stirUp:'Discard the ice from the glass and strain the cocktail into it.',stirR:g=>`Put a large ice cube into the ${g} and strain the cocktail over it.`,
rinse:(i,g)=>`Pour a little ${i} into the ${g}, swirl to coat the inside and discard the excess.`,fill:g=>`Fill the ${g} to the top with ice.`,pourList:l=>`Pour in, in this order: ${l}.`,pourInto:(g,l)=>`Pour into the chilled ${g}: ${l}.`,top:l=>`Slowly top up down the side of the glass: ${l} — to keep the bubbles.`,stirGentle:'Stir gently 2–3 times from bottom to top with a bar spoon.',stirLight:'Stir lightly with a bar spoon.',
mud:(g,l)=>`Put into the ${g}: ${l} — and muddle to release the juice and aroma.`,mudS:l=>`Put into the shaker: ${l} — and muddle.`,crushed:'Fill the glass with crushed ice.',addRest:l=>`Pour in: ${l}.`,mudEnd:'Stir from bottom to top with a bar spoon and top with a mound of crushed ice.',
layer1:(g,x)=>`Take a ${g} and a bar spoon. Pour the first layer — ${x}.`,layerN:x=>`Hold the bar spoon, back side up, against the inside of the glass just above the drink and very slowly pour ${x} over it so it settles as the next layer.`,
blend1:l=>`Put into a blender: ${l} — plus about a cup of crushed ice.`,blend2:'Blend for 10–15 seconds until smooth and icy.',blend3:g=>`Pour the cocktail into the ${g}.`,
swz1:g=>`Fill the ${g} with crushed ice.`,swz2:'Put a bar spoon into the glass and spin it quickly between your palms for 10–15 seconds, until the glass frosts over.',swz3:'Top with a mound of crushed ice.',
garn:x=>`Garnish with ${x} and serve straight away.`,ang:'Add a few drops of Angostura onto the foam and serve straight away.',serve:'Serve straight away.',glass:'glass'}};
function gWord(d){if(lang==='en')return d.g?(GL_EN[d.g]||d.g):'glass';return d.g?(GACC[d.g]||d.g):'бокал'}
const UP_GL=/мартинка|рюмка|купе|маргаритка|флюте/;
function steps(d){if(d.nk)return d.stp.map(x=>lang==='en'?x[1]:x[0]);const c=CUSTOM[d.n];if(c)return c[lang];const sp=d.sp,S=ST[lang],f=sp.f,g=gWord(d);const out=[];
const lc=n=>{if(lang==='ru')return /^[А-ЯЁ][а-яё]/.test(n)?n[0].toLowerCase()+n.slice(1):n;return /^(Aperol|Cointreau|Baileys|Green Chartreuse|Yellow Chartreuse|Chartreuse|Angostura|Peychaud|Tabasco|Worcestershire|Sprite|Prosecco|Champagne|Cognac|Scotch|Drambuie|Bénédictine|Fernet|Cynar|Lillet|Frangelico|Grand Marnier|Cherry Heering|Amaro|Irish|London|Old Tom|Calvados|Pisco|Grappa|Crème|Butterscotch|Blended Scotch|Smoky Scotch|Maraschino|Falernum|Amaretto)/.test(n)?n:n[0].toLowerCase()+n.slice(1)};const it=x=>x.am==='долить'?lc(ingN(x.a)):`${lc(ingN(x.a))} ${amtL(x.am)}`;const mudN=f.m?f.m.split('+'):[];
const isTop=x=>TOPRE.test(x.a)&&(x.am==='долить'||['build','buildN','muddle','muddleS','shake'].includes(sp.tech));
const garnI=d.ings.filter(x=>/для подачи/.test(x.am)),rinseI=d.ings.filter(x=>/ополаск/.test(x.am));
const mudI=d.ings.filter(x=>mudN.includes(x.a)),topI=d.ings.filter(x=>!mudN.includes(x.a)&&isTop(x));
const main=d.ings.filter(x=>!garnI.includes(x)&&!rinseI.includes(x)&&!mudI.includes(x)&&!topI.includes(x));
const L=a=>a.map(it).join(', ');const up=f.up||(!f.rocks&&UP_GL.test(d.g||'')&&['shake','dry','stir','muddleS'].includes(sp.tech))||(!d.g&&['shake','dry','muddleS'].includes(sp.tech)&&!f.rocks);
if(up&&['shake','dry','stir','muddleS'].includes(sp.tech))out.push(S.chill(g));
if(f.rim==='salt')out.push(S.rimsalt);if(f.rim==='sugar')out.push(S.rimsugar);
if(rinseI.length&&sp.tech==='stir')out.push(S.rinse(lc(ingN(rinseI[0].a)),g));
if(sp.tech==='shake'||sp.tech==='dry'||sp.tech==='muddleS'){if(sp.tech==='muddleS')out.push(S.mudS(L(mudI)));out.push(S.pourS(L(main)));if(sp.tech==='dry'){out.push(S.dry1);out.push(S.dry2)}else out.push(S.shakeIce);out.push(up?S.strainUp:S.strainR(g,f.crushed))}
else if(sp.tech==='stir'){out.push(S.stir1);out.push(S.stir2(L(main)));out.push(S.stir3);out.push(f.rocks?S.stirR(g):S.stirUp)}
else if(sp.tech==='build'){out.push(S.fill(g));out.push(S.pourList(L(main)))}
else if(sp.tech==='buildN'){out.push(S.pourInto(g,L(main)))}
else if(sp.tech==='muddle'){out.push(S.mud(g,L(mudI)));out.push(S.crushed);if(main.length)out.push(S.addRest(L(main)))}
else if(sp.tech==='layer'){main.forEach((x,i)=>out.push(i?S.layerN(it(x)):S.layer1(g,it(x))))}
else if(sp.tech==='blend'){out.push(S.blend1(L(main)));out.push(S.blend2);out.push(S.blend3(g))}
else if(sp.tech==='swizzle'){out.push(S.swz1(g));out.push(S.addRest(L(main)));out.push(S.swz2);out.push(S.swz3)}
if(topI.length)out.push(S.top(L(topI)));
if(sp.tech==='build'||sp.tech==='buildN')out.push(sp.tech==='build'?S.stirGentle:S.stirLight);
if(sp.tech==='muddle')out.push(S.mudEnd);
if(f.g==='ang')out.push(S.ang);else if(f.g)out.push(S.garn(GARN_T[lang][f.g]));else out.push(S.serve);
return out.map(s=>s.replace(/\.\.(?=\s|$)/g,'.'))}
const NC={blue:['#A8D4FF','#4DA3FF','#0B3D73','#062240'],teal:['#9FF0D2','#2ED3A0','#075540','#033326'],amber:['#FFD58A','#FFAA2B','#6B3D00','#3D2300'],green:['#D6F59A','#9BDB2E','#3A5A06','#203303'],coral:['#FFC2A3','#FF7A3D','#7A2B0A','#451704'],pink:['#FFB8DD','#FF5CB0','#7A1048','#450827'],gray:['#E8EBF2','#B8C0D0','#3B4250','#22262E'],purple:['#D7C9FF','#9C7BFF','#3B2490','#211250'],red:['#FFB0B8','#FF4D62','#7A0F1F','#45070F'],yellow:['#FFF3B0','#FFD84D','#6B5A00','#3D3300'],lime:['#EBFFB8','#C6F25A','#4A6008','#2A3604'],olive:['#ECE9BE','#C9C060','#5A5414','#33300B'],brown:['#F3D2B5','#D0925C','#653A16','#3A210C'],rose:['#FFD0C9','#FF7E6B','#7A2418','#45130C']};
const B={vodka:['Водка','blue'],gin:['Джин','teal'],rum:['Ром','amber'],cachaca:['Кашаса','lime'],teq:['Текила','green'],mezcal:['Мескаль','olive'],whisky:['Виски','coral'],cognac:['Коньяк','red'],brandy:['Бренди, писко, граппа','brown'],sparkling:['Игристое','yellow'],wine:['Вино','purple'],liq:['Ликёры','pink'],aper:['Аперитивы и биттеры','rose'],zero:['Без алкоголя','gray']};
const T={sweet:'Сладкие',dry:'Сухие',sour:'Кислые',fruit:'Фруктовые',citrus:'Цитрусовые',creamy:'Сливочные и десертные',coffee:'Кофейные',bitter:'Горькие',fresh:'Освежающие',spicy:'Пряные',herbal:'Травяные',strong:'Крепкие',hot:'Согревающие'};
const TC={sweet:'yellow',dry:'olive',spicy:'brown',sour:'green',fruit:'pink',creamy:'gray',coffee:'amber',bitter:'coral',fresh:'teal',herbal:'purple',strong:'blue',hot:'red'};
const L={1:'Налить и смешать',2:'Шейкер',3:'Смесительный стакан',4:'Для профи',few:'Малосоставные',many:'Многосоставные',batch:'На компанию',classic:'Классика',shots:'Шоты'};
const LC={1:'teal',2:'amber',3:'purple',4:'coral',few:'green',many:'pink',batch:'blue',classic:'red'};
/* «Для профи» — только то, что действительно сложно: ингредиенты, которых нет в обычном магазине (настойки, редкие ликёры, домашние кордиалы) или особая техника. */
Object.assign(B,{n_vodka:['На водке','rose'],n_samogon:['На самогоне','amber'],n_spirt:['На спирту','yellow'],n_cognac:['На коньяке','red'],n_rum:['На роме','brown'],n_gin:['На джине','green']});
Object.assign(T,{n_berry:'Ягодные',n_fruit:'Фруктовые',n_citrus:'Цитрусовые',n_sour:'Кислые',n_sweet:'Сладкие',n_spicy:'Пряные',n_hot:'Острые',n_herbal:'Травяные',n_bitter:'Горькие',n_nut:'Ореховые'});
Object.assign(TC,{n_berry:'pink',n_fruit:'coral',n_citrus:'yellow',n_sour:'lime',n_sweet:'rose',n_spicy:'brown',n_hot:'red',n_herbal:'green',n_bitter:'olive',n_nut:'amber'});
Object.assign(L,{n_fast:'До 3 дней',n_week:'Неделя',n_month:'2–3 недели',n_long:'Месяц'});Object.assign(LC,{n_fast:'teal',n_week:'amber',n_month:'coral',n_long:'purple'});
/* Палитра групп: 13 хорошо различимых цветов + серый. Цвета подобраны по разнице в цветовом пространстве (CIELAB)
   и распределены так, чтобы похожие оттенки не стояли рядом на шаре (текила — бирюзовая, как голубая агава; кашаса — салатовая; джин — зелёный; мескаль — фиолетовый). */
Object.assign(NC,{"red": ["#FFABAB", "#FF4545", "#611A1A", "#330E0E"], "orange": ["#FFD2A1", "#FF9A2E", "#613B11", "#331F09"], "gold": ["#FFF0A3", "#FFDD33", "#615413", "#332C0A"], "lime": ["#D8F8A6", "#A8F03A", "#405B16", "#22300C"], "green": ["#9AE2B5", "#1FBF5A", "#0C4922", "#062612"], "mint": ["#CBFAEB", "#8CF5D2", "#355D50", "#1C312A"], "cyan": ["#99E6F8", "#1CC8F0", "#0B4C5B", "#062830"], "blue": ["#B0C4FF", "#4F7DFF", "#1E3061", "#101933"], "violet": ["#DDBCFF", "#B36BFF", "#442961", "#241533"], "magenta": ["#F8ADEB", "#F048D2", "#5B1B50", "#300E2A"], "pink": ["#FFD2E6", "#FF9CC8", "#613B4C", "#331F28"], "brown": ["#DBC3B0", "#B07A50", "#432E1E", "#231810"], "cream": ["#FAF4E3", "#F3E6C0", "#5C5749", "#312E26"], "gray": ["#DFE3EA", "#B8C0D0", "#46494F", "#25262A"]});
Object.entries({"liq": "magenta", "rum": "gold", "vodka": "blue", "whisky": "orange", "teq": "cyan", "aper": "mint", "cognac": "red", "gin": "green", "zero": "gray", "cachaca": "lime", "sparkling": "cream", "wine": "pink", "brandy": "brown", "mezcal": "violet", "n_vodka": "blue", "n_samogon": "gold", "n_spirt": "mint", "n_cognac": "red", "n_rum": "orange", "n_gin": "green"}).forEach(([k,c])=>{B[k][1]=c});Object.assign(TC,{"sweet": "gold", "dry": "cream", "sour": "cyan", "fruit": "magenta", "citrus": "lime", "creamy": "pink", "coffee": "brown", "bitter": "violet", "fresh": "mint", "spicy": "red", "herbal": "green", "strong": "blue", "hot": "orange", "n_berry": "magenta", "n_fruit": "orange", "n_citrus": "gold", "n_sour": "lime", "n_sweet": "pink", "n_spicy": "brown", "n_hot": "red", "n_herbal": "green", "n_bitter": "blue", "n_nut": "cream"});Object.assign(LC,{"1": "mint", "2": "gold", "3": "violet", "4": "red", "few": "lime", "many": "pink", "batch": "blue", "classic": "orange", "shots": "cyan", "n_fast": "mint", "n_week": "gold", "n_month": "orange", "n_long": "violet"});
const isN=k=>String(k).startsWith('n_');
const RARE_RE=/Цитрусовый ром|Butterscotch шнапс|Фалернум|Пименто дрэм|Ромашковый кордиал|Сироп корицы|Фиалковый ликёр|Черри Херинг|Крепкий ром 151|Крепкий белый ром|Выдержанный агриколь ром|Олд Том джин|Лилле Блан|Амаро Нонино|Херес амонтильядо|Медово-имбирный сироп|Дымный ром|Биттер Пешо|Вода апельсинового цвета/;
const L4MAP={'Blowjob':1,'Огуречный лимонад':1,'Ирландский кофе':1,'Глинтвейн':1};
/* Разделение основ: ром/кашаса, коньяк/бренди, игристое/вино, текила/мескаль, ликёры/аперитивы. */
const APER_N=new Set(['Апероль шприц','Американо','Гарибальди','Фернандито','Хьюго','Тринидад сауэр']);
function splitBase(d){const first=re=>{const x=d.ings.find(x=>re.test(x.a));return x?d.ings.indexOf(x):99};
if(d.b==='rum')return /Кашаса/.test(d.ing)?'cachaca':'rum';
if(d.b==='brandy')return first(/^Коньяк/)<first(/Бренди|Писко|Граппа/)?'cognac':'brandy';
if(d.b==='wine')return /Игристое|Шампанское|Просекко/.test(d.ing)?'sparkling':'wine';
if(d.b==='teq')return first(/Мескаль/)<first(/Текила/)?'mezcal':'teq';
if(d.b==='liq')return APER_N.has(d.n)?'aper':'liq';
return d.b}
const D=RAW.concat(RAW2,RAW3).map(([n,b,t,l,g,ing,m,note,bt,src,v],i)=>({i,n,b,t,l,g,ing,m,note,bt,src,v,ings:ing.split(';').map(s=>{const[a,am]=s.split('|');return{a,am}})}));
Object.entries(EN2).forEach(([k,v])=>{EN[k]=[v[0],'',v[1]]});EN['Last word'][0]='Last Word (rum)';
D.forEach(d=>{d.sp=parseSp(SP[d.n]);d.l=d.sp.tech==='custom'?(L4MAP[d.n]||Math.min(+(d.sp.f.L||2),3)):(LVL[d.sp.tech]||2);if(RARE_RE.test(d.ing))d.l=4;d.b=splitBase(d);if(d.n==='Last word')d.v='Последнее слово';if(d.n==='Кир рояль')d.v='Кир'});
/* Настойки — в общей базе после коктейлей (номера коктейлей в старых ссылках не меняются). */
NAST.forEach(o=>{const d={i:D.length,nk:1,n:o.n,b:o.b,t:o.ts[0],ts:o.ts,l:o.days<=3?'n_fast':o.days<=10?'n_week':o.days<30?'n_month':'n_long',lx2:[],g:'',ing:o.ing,m:'',note:o.note?o.note[0]:'',bt:0,src:o.my?'my':'n',v:'',days:o.days,abv:o.abv,y:o.y,stp:o.st,sp:parseSp('custom'),
ings:o.ing.split(';').map(s=>{const[a,am]=s.split('|');return{a,am}})};d.sw=d.ings.some(x=>/сахар|мёд/i.test(x.a)&&!/по желанию/.test(x.am));d.cnt=d.ings.length;EN[d.n]=[o.en,'',o.note?o.note[1]:''];D.push(d)});
/* Авторские коктейли пользователя — после настоек (номера в старых ссылках не меняются). На домашних настойках — «Для профи». */
RAW4.concat(RAW5).forEach(([n,b,t,l,g,ing,m,note,bt,src,v])=>{const d={i:D.length,n,b,t,l,g,ing,m,note,bt,src,v,ings:ing.split(';').map(s=>{const[a,am]=s.split('|');return{a,am}})};d.sp=parseSp(SP[n]);d.l=Math.min(+(d.sp.f.L||2),3);if(RARE_RE.test(ing)||/Настойка «/.test(ing))d.l=4;d.b=splitBase(d);EN[n]=[RAW4_EN[n]||n,'',''];D.push(d)});
let curView=null,inCard=false,navBack=null;
let world='c',WT=null,SHX=0,FADE=1,skyK=0;
const tg=window.Telegram&&window.Telegram.WebApp&&window.Telegram.WebApp.initData?window.Telegram.WebApp:null;
const BOT_URL='https://t.me/whattodrinkuh_bot/app';
const cv=document.getElementById('cv'),ctx=cv.getContext('2d'),ov=document.getElementById('ov'),sheet=document.getElementById('sheet');
const lc=document.createElement('canvas'),lctx=lc.getContext('2d');
let PL=[],W,H,DPR=1,SAFE_T=0,SAFE_B=0,mode='b',hubs=[],M=[[1,0,0],[0,1,0],[0,0,1]],wx=0,wy=0,drag=false,focus=null,sel=null,lastHdr='',zoom=1,zA=1,zB=1,zT0=0,inGroup=false,tilt=[0,0],cardOpen=false,lists=[],lid=1,bgx=0,bgy=0,fontsOk=0,E=0;
const fav=new Set(),bar=new Set(),notes={};
const F={can:false,noEgg:false,noDairy:false,batch:false,mine:false,zero:false,nFast:false,nNoSugar:false,nSoft:false};
const ZF=2,STAR=11,DOT=3.5,HUB0=29,HUB1=40,LIM=.45,SCOV=.2/260;
let lang=(tg&&tg.initDataUnsafe&&tg.initDataUnsafe.user&&tg.initDataUnsafe.user.language_code&&!/^ru|^uk|^be|^kk/.test(tg.initDataUnsafe.user.language_code))?'en':'ru';
const t=k=>STR[lang][k];
const nm=d=>lang==='en'?EN[d.n][0]:d.n,meth=d=>lang==='en'?EN[d.n][1]:d.m,noteOf=d=>lang==='en'?EN[d.n][2]:d.note;
const ingN=a=>lang==='en'?(ING_EN[a]||a):a,glN=g=>lang==='en'?(GL_EN[g]||g):g;
const bName=k=>lang==='en'?BE[k]:B[k][0],tName=k=>lang==='en'?TE[k]:T[k],lName=k=>lang==='en'?LE[k]:L[k];
function amtL(am){let m=am.match(/^(\d+)\s*\((.+)\)$/);const ml=lang==='en'?' ml':' мл';if(/^[~\d][\d–~]*$/.test(am))return am+ml;let s=m?m[1]+ml+' ('+m[2]+')':am;if(lang!=='en')return s;AM_EN.forEach(([a,b])=>{s=typeof a==='string'?s.split(a).join(b):s.replace(a,b)});return s}
const ALIAS={'Сухой джин':'Джин','Лондонский сухой джин':'Джин','Белый ром':'Светлый ром','Ром':'Светлый ром','Шампанское':'Игристое вино','Газированная вода':'Содовая','Белок':'Яичный белок','Куантро':'Трипл сек','Апельсиновый ликёр':'Трипл сек','Бейлис':'Сливочный ликёр','Жирные сливки':'Сливки','Выдержанный бурбон':'Бурбон','Американский виски':'Бурбон'};
Object.assign(ALIAS,{'Зелёный шартрез':'Шартрез','Скотч':'Купажированный скотч','Яичный желток':'Яичный белок'});const canon=a=>ALIAS[a]||a;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=v=>{const m=Math.hypot(...v)||1;return v.map(x=>x/m)};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const mv=(A,p)=>[A[0][0]*p[0]+A[0][1]*p[1]+A[0][2]*p[2],A[1][0]*p[0]+A[1][1]*p[1]+A[1][2]*p[2],A[2][0]*p[0]+A[2][1]*p[1]+A[2][2]*p[2]];
const mm=(A,Bm)=>A.map(r=>[0,1,2].map(j=>r[0]*Bm[0][j]+r[1]*Bm[1][j]+r[2]*Bm[2][j]));
function axr(a,t){const[x,y,z]=a,c=Math.cos(t),s=Math.sin(t),C=1-c;return[[c+x*x*C,x*y*C-z*s,x*z*C+y*s],[y*x*C+z*s,c+y*y*C,y*z*C-x*s],[z*x*C-y*s,z*y*C+x*s,c+z*z*C]]}
function ortho(){const a=norm(M[0]);const d=dot(a,M[1]);const b=norm(M[1].map((x,i)=>x-d*a[i]));M=[a,b,cross(a,b)]}
function rng(s){let h=1779033703;for(const c of s)h=Math.imul(h^c.charCodeAt(0),3432918353),h=h<<13|h>>>19;return()=>{h=Math.imul(h^h>>>16,2246822507);h=Math.imul(h^h>>>13,3266489909);return((h^=h>>>16)>>>0)/4294967296}}
const easeIO=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
function haptic(k){try{if(tg&&tg.HapticFeedback){k==='sel'?tg.HapticFeedback.selectionChanged():tg.HapticFeedback.impactOccurred('light')}}catch(e){}}
const SKY=(()=>{const R=rng('sky');const neb=[['#534AB7',.07],['#185FA5',.06],['#1D9E75',.04],['#993556',.05]];return{stars:Array.from({length:150},()=>({x:R(),y:R(),r:.3+R()*1.1,a:.15+R()*.6,d:.2+R()*.8})),neb:Array.from({length:6},(_,i)=>({x:R(),y:R(),r:90+R()*140,c:neb[i%4][0],a:neb[i%4][1],d:.2+R()*.4}))}})();
const ALWAYS=new Set(['Вода','Кипяток','Соль','Сахар','Соль и перец','Лёд']);
const isOpt=am=>/по желанию|для пенки|для подачи|по вкусу|для посыпки|для ополаскивания/.test(am);
const reqOf=d=>d.ings.filter(x=>!ALWAYS.has(x.a)&&!isOpt(x.am)).map(x=>canon(x.a));
const missOf=d=>reqOf(d).filter(a=>!bar.has(a));
const ALLING=[...new Set(D.flatMap(reqOf))].sort((a,b)=>a.localeCompare(b,'ru'));
function catOf(n){if(/самогон|спирт 96|водка|джин|ром\b|ром$|^ром|текила|мескаль|виски|бурбон|скотч|коньяк|бренди|кашаса|абсент|писко|граппа|кальвадос|олд том/i.test(n)&&!/ликёр/i.test(n))return 0;if(/настойк|хантинг|martini|мартини|campari|ликёр|шнапс|трипл|куантро|апероль|биттер|вермут|шартрез|мараскино|бейлис|игрист|шампан|просекко|вино|портвейн|херес|лилле|бенедиктин|драмбуи|фернет|чинар|амаретто|франжелико|фалернум|амаро|кюрасао|херинг|дрэм|гран марнье/i.test(n))return 1;if(/сок|сироп|пюре|гренадин|оршад|мёд|кордиал/i.test(n))return 2;if(/тоник|содовая|кола|спрайт|пиво|эль|газиров|чай|кофе|эспрессо/i.test(n))return 3;if(/сливки|белок|молоко/i.test(n))return 4;return 5}
const isDairy=d=>d.ings.some(x=>/сливки|бейлис|сливочн|молок/i.test(x.a)&&!/кокос/i.test(x.a));
const isEgg=d=>d.ings.some(x=>/белок|желток/i.test(x.a)&&!/по желанию|для пенки/.test(x.am));
function passes(d){if(F.can&&bar.size&&missOf(d).length)return false;if(d.nk){if(F.zero)return false;if(F.nFast&&d.days>10)return false;if(F.nNoSugar&&d.sw)return false;if(F.nSoft&&d.abv>30)return false;return true}if(F.noEgg&&isEgg(d))return false;if(F.noDairy&&isDairy(d))return false;if(F.batch&&!d.bt)return false;if(F.mine&&d.src!=='my')return false;if(F.zero&&d.b!=='zero')return false;return true}
const ABV=[[/горькая настойка/i,39],[/хантинг берри/i,38],[/martini rosso|martini bianco/i,15],[/extra dry/i,18],[/campari/i,25],[/кордиал|блади микс/i,0],[/151|крепкий белый ром/i,70],[/ангостура/i,44],[/портвейн/i,19],[/херес/i,17],[/лилле/i,17],[/чинар/i,16],[/фалернум/i,11],[/амаро/i,35],[/фернет/i,39],[/бенедиктин|драмбуи|гран марнье/i,40],[/амаретто/i,28],[/кюрасао/i,30],[/апероль/i,11],[/красный биттер/i,25],[/вермут/i,16],[/шартрез/i,55],[/мараскино/i,32],[/трипл|куантро|апельсиновый ликёр/i,35],[/бейлис|сливочный ликёр/i,17],[/кофейный ликёр/i,20],[/какао/i,25],[/ликёр|шнапс/i,20],[/игрист|шампан|просекко/i,11],[/вино/i,12],[/водка|джин|ром|текила|мескаль|виски|бурбон|скотч|коньяк|бренди|кашаса|писко|граппа|кальвадос/i,40]];
function strength(d){if(d.nk)return{abv:d.abv,vol:d.y};let vol=0,alc=0;d.ings.forEach(x=>{const m=x.am.match(/^~?(\d+)(?:–(\d+))?$/);let ml=m?+(m[2]||m[1]):(x.am==='долить'?80:0);if(/дэш|капл/.test(x.am))ml=0;vol+=ml;const nn=x.a.match(/^Настойка «(.+)»$/),nd=nn&&D.find(o=>o.nk&&o.n===nn[1]);const r=nd?[0,nd.abv]:ABV.find(p=>p[0].test(x.a));if(r&&ml)alc+=ml*r[1]/100});const tq=d.sp.tech;const dil=d.sp.f.hot||/кипят|горяч/i.test(d.ing)?0:['shake','dry','muddleS'].includes(tq)?.25:tq==='stir'?.2:tq==='blend'?.3:.1;const tv=vol*(1+dil);return{abv:tv?Math.round(alc/tv*100):0,vol:Math.round(tv/10)*10}}
/* ===== Несколько вкусов у коктейля =====
   Основной вкус (поле t) остаётся первым; к нему по составу добавляются ещё до двух вкусов.
   Крепкий бывает сладким или горьким, кислый — фруктовым и т.д. Ручные правки — в TASTE_FIX. */
const TASTE_ORDER=['strong','sweet','dry','sour','citrus','bitter','coffee','creamy','fruit','spicy','herbal','fresh','hot'];
const TASTE_FIX={'Олд фэшн':['strong','sweet'],'Виски сауэр':['sour','sweet'],'Секс на пляже':['fruit','sweet'],'Текила санрайз':['fruit','sweet'],'Мэри Пикфорд':['fruit','sweet'],
'Горячий тодди':['hot','sweet','spicy'],'Глинтвейн':['hot','fruit','spicy'],'Сангрия':['fruit','fresh'],'Шампанский коктейль':['strong','fresh','sweet'],'Джин-тоник':['fresh','bitter'],
'Пина колада':['creamy','fruit','sweet'],'Вирджин колада':['creamy','fruit','sweet'],'Порнстар мартини':['fruit','sweet','sour'],'Рамос джин физз':['creamy','sour','fresh']};
function mlOf(x){const m=x.am.match(/^~?(\d+)(?:–(\d+))?/);if(/дэш|капл/.test(x.am))return 2;if(m&&!/шт|ч\. л|ст\. л|г$|л$|вет|лист|ломт|палоч|бутон|звёзд|кусоч|кубик/.test(x.am))return +(m[2]||m[1]);if(/ч\. л/.test(x.am))return (m?+m[1]:1)*5;if(/ст\. л/.test(x.am))return (m?+m[1]:1)*15;if(x.am==='долить')return 80;if(/слой/.test(x.am))return 15;if(/шапка/.test(x.am))return 20;if(/шт/.test(x.am))return 20;return 0}
function tasteScores(d){const sc={};let tot=0;const add=(k,v)=>{sc[k]=(sc[k]||0)+v};
d.ings.forEach(x=>{if(/для подачи/.test(x.am))return;const a=x.a,v=mlOf(x);tot+=v;
if(/лимонный сок|сок лайма|^лайм$|^лимон$/i.test(a)&&!/ломтик|долька/.test(x.am))add('sour',/шт/.test(x.am)?20:v);
if(/сироп|^сахар|тростниковый сахар|коричневый сахар|^мёд|гренадин|оршад|кордиал|амаретто|бенедиктин|драмбуи|шнапс|какао|мятный ликёр|трипл|куантро|кюрасао|гран марнье|сливочный ликёр|бейлис|кофейный ликёр|апельсиновый ликёр|яблочный ликёр|черносмородинов|ежевичн|малиновый ликёр|персиковый ликёр|вишнёвый ликёр|ликёр маракуйи|франжелико|бузинный|фиалков|мараскино|черри херинг|спрайт|кола|имбирный эль|портвейн/i.test(a))add('sweet',v);
if(/красный вермут|апероль|красный биттер|имбирное пиво/i.test(a))add('semi',v);
if(/красный биттер|апероль|фернет|чинар|амаро|кампари/i.test(a)||(/ангостура/i.test(a)&&v>=15))add('bitter',v);
if(/кофе|эспрессо/i.test(a))add('coffee',v||20);
if(/сливк|сливочн|бейлис|кокос|какао|молок|желток/i.test(a))add('creamy',v||20);
if(/апельсиновый сок|ананас|клюкв|маракуй|персик|клубник|малин|черносмородин|ежевичн|гренадин|вишн|яблоч|яблоко|абрикос|грейпфрут|ягод|кальвадос|пюре|сангри/i.test(a))add('fruit',v||20);
if(/имбирное пиво|имбирь|медово-имбирн|перец|табаско|вустер|корица|гвоздик|бадьян|фалернум|пименто|чили/i.test(a))add('spicy',Math.max(v,10));
if(/шартрез|мят|базилик|бенедиктин|абсент|драмбуи|фиалк|бузин|ромашк|вермут|амаро|сельдер/i.test(a))add('herbal',Math.max(v,10));
if(/содов|тоник|газиров|игрист|шампан|просекко|кола|спрайт|имбирное пиво|имбирный эль|огур|холодный.*чай/i.test(a))add('fresh',v);
});
if(/мята/i.test(d.ing)&&/содов|газиров|просекко|игрист|тоник/i.test(d.ing))add('fresh',30);
const st=strength(d);if(d.b!=='zero'&&st.abv>=24)add('strong',100);
if(d.sp.f.hot||d.t==='hot'||/кипят|горячий кофе/i.test(d.ing))add('hot',100);
return{sc,tot:Math.max(tot,1),st}}
function assignTastes(){D.forEach(d=>{if(d.nk)return;const{sc,tot,st}=tasteScores(d);const pick=[];
const r=k=>(sc[k]||0)/tot;
if(sc.strong)pick.push('strong');
if(sc.hot)pick.push('hot');
if(r('sour')>=.12&&st.abv<30)pick.push('sour');
if(r('sweet')>=.22||(r('sweet')>=.15&&!pick.includes('sour')))pick.push('sweet');
if(r('bitter')>=.15)pick.push('bitter');
if(sc.coffee)pick.push('coffee');
if(r('creamy')>=.12)pick.push('creamy');
if(r('fruit')>=.18)pick.push('fruit');
if(sc.spicy&&r('spicy')>=.06)pick.push('spicy');if(sc.herbal&&r('herbal')>=.08)pick.push('herbal');if((sc.sweet||0)/tot+(sc.semi||0)/tot*.5<.1&&!pick.includes('sour')&&!sc.creamy&&r('fruit')<.1&&d.b!=='zero')pick.push('dry');
if(r('fresh')>=.3&&st.abv<20)pick.push('fresh');
let t0=d.t;if(t0==='herbal'&&(sc.spicy||0)>(sc.herbal||0))t0='spicy';d.t=t0;let ts=[t0,...TASTE_ORDER.filter(k=>k!==t0&&pick.includes(k))].slice(0,3);
if(TASTE_FIX[d.n])ts=TASTE_FIX[d.n].slice();if(MY_TS[d.n])ts=MY_TS[d.n].slice();
if(CITRUS.has(d.n)){ts=ts.filter(k=>k!=='citrus');CITRUS_MAIN.has(d.n)?ts.unshift('citrus'):ts.splice(1,0,'citrus');ts=ts.slice(0,3);d.t=ts[0]}d.ts=ts;
/* сложность: техника + число ингредиентов + на компанию */
const cnt=d.ings.filter(x=>!/для подачи|по вкусу|по желанию|для ополаскивания|для посыпки/.test(x.am)&&!/^(Лёд|Вода|Кипяток|Соль|Соль и перец)$/.test(x.a)).length;
d.cnt=cnt;d.lx2=[];if(cnt<=3)d.lx2.push('few');if(cnt>=6)d.lx2.push('many');if(d.bt||d.g==='кувшин')d.lx2.push('batch');if(CLASSIC_TOP.has(d.n))d.lx2.push('classic');if(d.g==='шот')d.lx2.push('shots')})}
/* «Цитрусовые» — не всё, где есть сок лимона или лайма, а коктейли, у которых цитрус — главный вкус:
   цитрусовые спирты и апельсиновые ликёры с соком, коктейли «на лайме», грейпфрутовые и апельсиновые, лимонады; горький апельсин Апероля.
   Классические сауэры (виски, писко, клевер клаб…) остаются «Кислыми»: там цитрус — кислотность для баланса, а не вкус. */
const CITRUS=new Set(['Лемон дроп мартини','Lemon cloud','Космополитен','Маргарита','Гранд маргарита','Томмис маргарита','Кайпиринья','Гимлет','Дайкири','Сайдкар','Между простынями','White lady','Корпс ревайвер №2','Палома','Хемингуэй спешл','Мимоза','Гарибальди','Текила санрайз','Сан-Франциско','Bee’s knees','Манки гланд','French 75','Джон Коллинз','Джин физз','Арнольд Палмер','Апероль шприц']);
const CITRUS_MAIN=new Set(['Лемон дроп мартини','Lemon cloud','Палома','Мимоза','Сан-Франциско','Bee’s knees','Гимлет','Хемингуэй спешл']);
/* «Классика» — только самые известные коктейли, которые есть почти в любом баре. */
const CLASSIC_TOP=new Set(['Мохито','Маргарита','Негрони','Олд фэшн','Дайкири','Космополитен','Пина колада','Апероль шприц','Эспрессо мартини','Мартини','Манхэттен','Виски сауэр','Кровавая Мэри','Московский мул','Лонг-Айленд айс ти','Май тай','Кайпиринья','Белый русский','Джин-тоник','Куба либре','Текила санрайз','Секс на пляже','Мимоза','Беллини','French 75','Сайдкар','Писко сауэр','Ирландский кофе','Б-52','Палома','Джон Коллинз','Бульвардье','Порнстар мартини','Сазерак']);
function glassType(g){if(/кружка|ирланд/.test(g))return'mug';if(/шале/.test(g))return'coupe';if(/пробник/.test(g))return'shot';if(/кувшин/.test(g))return'pitch';if(/хайбол/.test(g))return'high';if(/мартинка|рюмка/.test(g))return'mart';if(/купе|маргаритка/.test(g))return'coupe';if(/флюте/.test(g))return'flute';if(/шот/.test(g))return'shot';if(/винный/.test(g))return'wine';if(/рокс|лоубол/.test(g))return'rocks';return''}
function drawGlass(t,x,y,s,col){ctx.strokeStyle=col;ctx.lineWidth=1.3;ctx.lineJoin='round';ctx.lineCap='round';ctx.beginPath();
if(t==='rocks'){ctx.moveTo(x-s*.55,y-s*.45);ctx.lineTo(x-s*.5,y+s*.5);ctx.lineTo(x+s*.5,y+s*.5);ctx.lineTo(x+s*.55,y-s*.45)}
else if(t==='high'){ctx.moveTo(x-s*.38,y-s*.75);ctx.lineTo(x-s*.34,y+s*.7);ctx.lineTo(x+s*.34,y+s*.7);ctx.lineTo(x+s*.38,y-s*.75)}
else if(t==='mart'){ctx.moveTo(x-s*.7,y-s*.6);ctx.lineTo(x,y+s*.1);ctx.lineTo(x+s*.7,y-s*.6);ctx.moveTo(x,y+s*.1);ctx.lineTo(x,y+s*.65);ctx.moveTo(x-s*.35,y+s*.65);ctx.lineTo(x+s*.35,y+s*.65)}
else if(t==='coupe'){ctx.moveTo(x-s*.7,y-s*.4);ctx.quadraticCurveTo(x,y+s*.45,x+s*.7,y-s*.4);ctx.moveTo(x,y+s*.02);ctx.lineTo(x,y+s*.65);ctx.moveTo(x-s*.35,y+s*.65);ctx.lineTo(x+s*.35,y+s*.65)}
else if(t==='flute'){ctx.moveTo(x-s*.25,y-s*.8);ctx.lineTo(x-s*.18,y+s*.15);ctx.lineTo(x+s*.18,y+s*.15);ctx.lineTo(x+s*.25,y-s*.8);ctx.moveTo(x,y+s*.15);ctx.lineTo(x,y+s*.65);ctx.moveTo(x-s*.3,y+s*.65);ctx.lineTo(x+s*.3,y+s*.65)}
else if(t==='shot'){ctx.moveTo(x-s*.4,y-s*.35);ctx.lineTo(x-s*.32,y+s*.45);ctx.lineTo(x+s*.32,y+s*.45);ctx.lineTo(x+s*.4,y-s*.35)}
else if(t==='wine'){ctx.moveTo(x-s*.5,y-s*.7);ctx.quadraticCurveTo(x-s*.55,y+s*.15,x,y+s*.15);ctx.quadraticCurveTo(x+s*.55,y+s*.15,x+s*.5,y-s*.7);ctx.moveTo(x,y+s*.15);ctx.lineTo(x,y+s*.65);ctx.moveTo(x-s*.32,y+s*.65);ctx.lineTo(x+s*.32,y+s*.65)}
else if(t==='mug'){ctx.moveTo(x-s*.5,y-s*.55);ctx.lineTo(x-s*.5,y+s*.55);ctx.lineTo(x+s*.3,y+s*.55);ctx.lineTo(x+s*.3,y-s*.55);ctx.moveTo(x+s*.3,y-s*.3);ctx.quadraticCurveTo(x+s*.75,y-s*.25,x+s*.3,y+s*.25)}
else if(t==='pitch'){ctx.moveTo(x-s*.45,y-s*.6);ctx.lineTo(x-s*.45,y+s*.6);ctx.lineTo(x+s*.4,y+s*.6);ctx.lineTo(x+s*.4,y-s*.45);ctx.lineTo(x+s*.6,y-s*.65);ctx.moveTo(x-s*.45,y-s*.6);ctx.lineTo(x+s*.3,y-s*.6)}
else{ctx.arc(x,y,s*.18,0,7)}
ctx.stroke()}
function size(){DPR=Math.min(devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);lc.width=W*DPR;lc.height=H*DPR;lctx.setTransform(DPR,0,0,DPR,0,0);
SAFE_T=Math.max(0,document.getElementById('hdr').offsetTop-12);SAFE_B=Math.max(0,(parseFloat(getComputedStyle(document.getElementById('segw')).bottom)||16)-16);lastHdr='';routeCache=new Map()}
/* Безалкогольные во всех режимах живут только в своей группе «Без алкоголя». */
const keysOf=d=>d.hidden||!d.nk!==(world==='c')?[]:d.nk?(mode=='b'?[d.b]:mode=='t'?d.ts:[d.l]):mode=='b'||d.b==='zero'?[d.b]:mode=='t'?d.ts:[d.l,...d.lx2];
const KORDER={b:['liq','rum','vodka','whisky','teq','aper','cognac','gin','zero','cachaca','sparkling','wine','brandy','mezcal'],t:[...Object.keys(T).filter(k=>!isN(k)),'zero'],l:[1,2,3,4,'few','many','batch','classic','shots','zero']};
const KORDER_N={b:Object.keys(B).filter(isN),t:Object.keys(T).filter(isN),l:['n_fast','n_week','n_month','n_long']};
const glabel=k=>mode=='b'||k==='zero'?bName(k):mode=='t'?tName(k):lName(k);
const gcol=k=>mode=='b'||k==='zero'?B[k][1]:mode=='t'?TC[k]:LC[k];
const plural=n=>t('plural')(n),pluralW=n=>t(world==='n'?'pluralN':'plural')(n);
function lattice(m,seed){const dense=m>20;const RY=dense?56:64,ev=dense?[-150,-75,0,75,150]:[-132,-44,44,132],od=dense?[-112,-37,37,112]:[-88,0,88],hole=dense?58:72;let KM=dense?4:3;const R=rng(seed);let pts=[];
for(;;){pts=[];for(let k=-KM;k<=KM;k++){const y=k*RY;(k%2===0?ev:od).forEach(x=>{const d=Math.hypot(x,y);if(d>=hole)pts.push([x,y,d])})}if(pts.length>=m*1.2||KM>12)break;KM++}
pts.sort((a,b)=>a[2]-b[2]||a[1]-b[1]||a[0]-b[0]);return{lw:dense?70:84,pts:pts.map(p=>[p[0]+(R()-.5)*5,p[1]+(R()-.5)*5,(R()-.4)*.14])}}
function blocks(o,s){const so=Math.hypot(s[0],s[1]);const pr=(o[0]*s[0]+o[1]*s[1])/so;if(pr<=8||pr>=so-8)return false;return Math.abs(o[0]*s[1]-o[1]*s[0])/so<21}
function build(){if(!D[0].ts)assignTastes();const ks=new Set(D.flatMap(keysOf));const KO=world==='n'?KORDER_N:KORDER;const keys=KO[mode]?KO[mode].filter(k=>ks.has(k)):[...ks];const n=keys.length;PL=[];routeCache=new Map();
hubs=keys.map((k,i)=>{const y=(1-2*(i+.5)/n)*.8,r=Math.sqrt(1-y*y),th=i*2.39996;const v=norm([Math.cos(th)*r,y,Math.sin(th)*r]);let u=cross(v,[0,1,0]);if(Math.hypot(...u)<.1)u=[1,0,0];u=norm(u);const w=cross(v,u);return{hub:1,k,n:glabel(k),tgt:v,u,w,pos:[0,0,0],c:gcol(k)}});
hubs.forEach(h=>{const items=D.filter(d=>keysOf(d).includes(h.k));h.items=items;const pcs=new Map(items.map(d=>[d,{d,hubRef:h,par:null,_lk:null,lx:0,ly:0,dz:0}]));const P=lattice(items.length,h.k+mode);h.lw=P.lw;let free=P.pts.slice();const occ=[],bs=[];
const set=(d,p)=>{const pc=pcs.get(d);pc.lx=p[0];pc.ly=p[1];pc.dz=p[2];free=free.filter(q=>q!==p);occ.push(p)};const PC=d=>pcs.get(d);const pOf=d=>d.v?items.find(o=>o.n===d.v&&!o.v):null;
const hasK=d=>items.some(v=>pOf(v)===d);const base=items.filter(d=>!pOf(d)).sort((x,y)=>(hasK(y)?1:0)-(hasK(x)?1:0));
const placeBase=d=>{const p=free.find(s=>!occ.some(o=>blocks(o,s))&&!bs.some(b=>blocks(s,b)))||free[0];set(d,p);bs.push(p)};
const placeVar=(v,pd)=>{const par=PC(pd);const pr=Math.hypot(par.lx,par.ly);const c=free.slice().sort((a,b)=>(Math.hypot(a[0]-par.lx,a[1]-par.ly)+(Math.hypot(a[0],a[1])<pr-1?45:0))-(Math.hypot(b[0]-par.lx,b[1]-par.ly)+(Math.hypot(b[0],b[1])<pr-1?45:0)));const p=c.find(s=>!bs.some(b=>blocks(s,b)))||c[0];set(v,p);PC(v).par=par};
base.forEach(par=>{placeBase(par);items.filter(v=>pOf(v)===par).forEach(v=>placeVar(v,par))});h.pcs=[...pcs.values()];PL.push(...h.pcs);h.maxY=Math.max(0,...h.pcs.map(q=>Math.abs(q.ly)))+64});
hubs.forEach(h=>{h.nb=hubs.filter(o=>o!==h).sort((p,q)=>dot(q.tgt,h.tgt)-dot(p.tgt,h.tgt)).slice(0,2)});
focus=null;sel=null;lastHdr='';inGroup=false;zA=zB=zoom=1;closeSheet();syncUI()}
const CY0=()=>SAFE_T+(H-SAFE_T-SAFE_B)*.47,CY1=()=>(SAFE_T+66+(H-SAFE_B-58))/2;
function cpos(d){/* d — размещение коктейля в группе */const h=d.hubRef;const isF=h===focus;const Sg=Math.min(W,H)*.3*ZF;const Ln=Math.hypot(d.lx,d.ly)||1;const ov=(.32+.1*Ln/280)/Ln;const sc=isF?ov+(1/Sg-ov)*E:ov;const dz=d.dz*(isF?1-E:1);return[0,1,2].map(q=>h.pos[q]*(1+dz)+(-h.u[q]*d.lx+h.w[q]*d.ly)*sc)}
function viewM(){const tx=LIM*Math.tanh(tilt[0]/LIM),ty=LIM*Math.tanh(tilt[1]/LIM);return mm(axr([0,1,0],tx),mm(axr([1,0,0],ty),M))}
function proj(p,pv,R){const q=mv(R,[p[0]-pv[0],p[1]-pv[1],p[2]-pv[2]]);const S=Math.min(W,H)*.3*zoom;const sp=4/(4-q[2]);const s=1+(sp-1)*(1-E);const cy=CY0()+(CY1()-CY0())*E+panY*E;return{x:W/2+SHX+q[0]*S*s,y:cy-q[1]*S*s,z:q[2]}}
function frontHub(){let best=null,bz=-9;hubs.forEach(h=>{const z=mv(M,h.tgt)[2];if(z>bz){bz=z;best=h}});return best}
const colOf=n=>n.hub?NC[n.c]:NC[B[n.b][1]];
const inAny=d=>lists.some(l=>l.items.has(d.i));
const relOf=d=>D.filter(o=>o!==d&&!o.hidden&&!o.nk===!d.nk&&(mode=='b'?o.t==d.t:o.b==d.b)&&o.n!==d.v&&o.v!==d.n).slice(0,8);
const LF='500 12px "Roboto Condensed", Manrope, sans-serif',LF2='400 11px Manrope, sans-serif';
function wrapLines(text,font,maxW){ctx.font=font;const words=text.split(' ');const lines=[];let cur='';words.forEach(w=>{const t=cur?cur+' '+w:w;if(ctx.measureText(t).width<=maxW||!cur)cur=t;else{lines.push(cur);cur=w}});if(cur)lines.push(cur);return lines}
function lbl(pc){const d=pc.d;const ms=bar.size?missOf(d):[];const extra=ms.length===1&&pc.hubRef.lw===84?t('no')+ingN(ms[0]).toLowerCase():'';const k=fontsOk+'|'+pc.hubRef.lw+'|'+extra;if(pc._lk!==k){pc._lk=k;const lines=wrapLines(nm(d),LF,pc.hubRef.lw);ctx.font=LF;let w=Math.max(...lines.map(l=>ctx.measureText(l).width));let ex=null;if(extra){ex=wrapLines(extra,LF2,pc.hubRef.lw+10)[0];ctx.font=LF2;w=Math.max(w,ctx.measureText(ex).width)}pc._lb={lines,ex,w,h:lines.length*14+(ex?13:0)}}return pc._lb}
/* Подпись группы всегда целиком внутри кружка: уменьшаем шрифт, пока все строки не влезут в круг. */
function hubLines(h,fs0,r){const k=fs0+'|'+Math.round(r)+'|'+fontsOk;if(h._k!==k){h._k=k;let fs=fs0,ls;
for(;fs>=6;fs-=.5){const F=`600 ${fs}px "Roboto Condensed", Manrope, sans-serif`;ls=wrapLines(h.n,F,r*1.5);ctx.font=F;const lh=fs*1.15,tot=ls.length*lh;
const ok=ls.every((t,i)=>{const y=Math.abs((i-(ls.length-1)/2)*lh)+lh/2;const half=Math.sqrt(Math.max(0,(r-5)*(r-5)-y*y));return ctx.measureText(t).width<=half*2})&&tot<=(r-5)*2;if(ok)break}
h._l={ls,fs}}return h._l}
/* Небо настоек — та же ночь, но с рыже-розовой дымкой; цвета плавно перетекают при смене карты. */
const mixC=(a,b,k)=>{const x=parseInt(a.slice(1),16),y=parseInt(b.slice(1),16);const c=sh=>Math.round(((x>>sh)&255)*(1-k)+((y>>sh)&255)*k);return`rgb(${c(16)},${c(8)},${c(0)})`};
const HAZE=(()=>{const R=rng('haze');return[['#E2703F',.16],['#E0507E',.14],['#F09A5B',.10],['#C0457A',.12],['#E2703F',.09]].map(([c,a])=>({x:R(),y:R(),r:150+R()*170,c,a,d:.15+R()*.3}))})();
function drawSky(){const g=ctx.createRadialGradient(W/2,H*.45,10,W/2,H*.5,Math.max(W,H)*.8);g.addColorStop(0,mixC('#161D3A','#3A1B2E',skyK));g.addColorStop(.6,mixC('#0B1020','#1A0C1C',skyK));g.addColorStop(1,mixC('#05070F','#09040B',skyK));ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
if(skyK>.01)HAZE.forEach(b=>{const x=((b.x*W+bgx*b.d)%W+W)%W,y=((b.y*H+bgy*b.d)%H+H)%H;const gg=ctx.createRadialGradient(x,y,0,x,y,b.r);gg.addColorStop(0,b.c);gg.addColorStop(1,'rgba(0,0,0,0)');ctx.globalAlpha=b.a*skyK;ctx.fillStyle=gg;ctx.beginPath();ctx.arc(x,y,b.r,0,7);ctx.fill()});
SKY.neb.forEach(b=>{const x=((b.x*W+bgx*b.d)%W+W)%W,y=((b.y*H+bgy*b.d)%H+H)%H;const gg=ctx.createRadialGradient(x,y,0,x,y,b.r);gg.addColorStop(0,b.c);gg.addColorStop(1,'rgba(11,16,32,0)');ctx.globalAlpha=b.a;ctx.fillStyle=gg;ctx.beginPath();ctx.arc(x,y,b.r,0,7);ctx.fill()});
ctx.fillStyle='#FFFFFF';SKY.stars.forEach(s=>{const x=((s.x*W+bgx*s.d*1.5)%W+W)%W,y=((s.y*H+bgy*s.d*1.5)%H+H)%H;ctx.globalAlpha=s.a;ctx.beginPath();ctx.arc(x,y,s.r,0,7);ctx.fill()});ctx.globalAlpha=1}
function snapTo(h,k,roll){const r=norm(mv(M,h.tgt));let ax=cross(r,[0,0,1]);const sn=Math.hypot(...ax);const ang=Math.atan2(sn,r[2]);if(ang>1e-4){ax=sn<1e-6?[0,1,0]:ax.map(x=>x/sn);M=mm(axr(ax,ang*k),M)}
if(roll){const mw=mv(M,h.w);const th=Math.atan2(-mw[0],-mw[1]);if(Math.abs(th)>1e-4)M=mm(axr([0,0,1],th*k),M)}ortho()}
function syncUI(){const ws=document.getElementById('wsw');if(ws){ws.style.display=inGroup?'none':'flex';document.getElementById('gname').style.display=inGroup?'block':'none';['prev','next'].forEach(id=>document.getElementById(id).style.visibility=inGroup?'visible':'hidden')}document.getElementById('segw').style.opacity=inGroup?0:1;document.getElementById('segw').style.pointerEvents=inGroup?'none':'auto';document.getElementById('brow').style.bottom=inGroup?'calc(var(--sb) + 16px)':'calc(var(--sb) + 70px)';if(tg&&tg.BackButton){(cardOpen||inGroup)?tg.BackButton.show():tg.BackButton.hide()}lastHdr=''}
function panBound(){return focus&&focus.maxY?Math.max(0,focus.maxY-(H-SAFE_T-SAFE_B-124)/2):0}
let panY=0,vpan=0;
function zoomTo(z){zA=zoom;zB=z;zT0=performance.now()}
function enter(h){if(!h)return;panY=0;vpan=0;if(focus!==h)routeCache=new Map();focus=h;inGroup=true;zoomTo(ZF);sel=null;wx=wy=0;tilt=[0,0];haptic('sel');syncUI()}
function exitGroup(){if(!inGroup)return;inGroup=false;zoomTo(1);tilt=[0,0];haptic('sel');syncUI()}
function route(p,o,obs){const dx=o.x-p.x,dy=o.y-p.y,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,mx=(p.x+o.x)/2,my=(p.y+o.y)/2;
for(const off of [0,24,-24,40,-40,58,-58,80,-80,104,-104]){const cx=mx+nx*off,cy=my+ny*off;let ok=true;for(let s=.06;s<.95&&ok;s+=.055){const u=1-s,x=u*u*p.x+2*u*s*cx+s*s*o.x,y=u*u*p.y+2*u*s*cy+s*s*o.y;
for(const q of obs){if(q===o||q===p)continue;if(Math.hypot(q.x-x,q.y-y)<q.r+7){ok=false;break}if(q.lb&&x>q.lb[0]-4&&x<q.lb[0]+q.lb[2]+4&&y>q.lb[1]-3&&y<q.lb[1]+q.lb[3]+3){ok=false;break}}}if(ok)return[cx,cy,off]}return[mx,my,0]}
/* Изгиб линии в открытой группе выбирается один раз, когда группа полностью раскрыта и неподвижна, и дальше не меняется — линии не «пляшут» при наклоне и прокрутке. */
let routeCache=new Map();
function routeFixed(pc,p,o,obs){const k=routeCache.get(pc);const dx=o.x-p.x,dy=o.y-p.y,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,mx=(p.x+o.x)/2,my=(p.y+o.y)/2;
if(k!==undefined)return[mx+nx*k,my+ny*k];const c=route(p,o,obs);if(E>=.999&&!drag&&Math.abs(panY)<1&&Math.hypot(tilt[0],tilt[1])<.01)routeCache.set(pc,c[2]);return c}
function frame(now){if(!W)size();
/* Смена карты: текущее «созвездие» уезжает в сторону, звёзды проносятся мимо, новое въезжает с другой стороны. */
if(WT){const p=clamp((now-WT.t0)/1000,0,1);if(p<.5){const e=easeIO(p*2);SHX=-WT.dir*W*1.15*e;FADE=1-e}else{if(!WT.sw){WT.sw=1;world=WT.w;build();applyWorld()}const e=easeIO((p-.5)*2);SHX=WT.dir*W*1.15*(1-e);FADE=e}bgx=WT.bx0-WT.dir*520*easeIO(p);if(p>=1){WT=null;SHX=0;FADE=1}}
skyK+=((world==='n'?1:0)-skyK)*.045;if(Math.abs(skyK-(world==='n'?1:0))<.002)skyK=world==='n'?1:0;
const tt=clamp((now-zT0)/800,0,1);zoom=zA+(zB-zA)*easeIO(tt);E=clamp((zoom-1)/(ZF-1),0,1);
hubs.forEach(h=>{h.pos=h.pos.map((x,i)=>x+(h.tgt[i]-x)*.08)});
const pv=focus?focus.pos.map(x=>x*E):[0,0,0];if(!inGroup)panY*=.85;
if(!drag){if(inGroup){snapTo(focus,.12,true);tilt=tilt.map(x=>Math.abs(x)<1e-4?0:x*.86);const pb=panBound();panY+=vpan;vpan*=.9;if(panY>pb){panY+=(pb-panY)*.25;vpan=0}if(panY<-pb){panY+=(-pb-panY)*.25;vpan=0}}
else if(Math.abs(wx)+Math.abs(wy)>4e-4){M=mm(axr([0,1,0],wx),M);M=mm(axr([1,0,0],wy),M);bgx+=wx*40;bgy+=wy*40;wx*=.95;wy*=.95;ortho()}
else{tilt=tilt.map(x=>x*.86);snapTo(focus||frontHub(),.06,false)}}
const R=viewM();
const fh=inGroup&&focus?focus:frontHub();const hdr=fh.n+'|'+inGroup+'|'+mode+'|'+world;
if(hdr!==lastHdr){lastHdr=hdr;document.getElementById('gname').textContent=fh.n;document.getElementById('gsub').textContent=inGroup?fh.items.length+' '+pluralW(fh.items.length)+' · '+(panBound()>0?t('subScroll'):t('subG')):t(world==='n'?'subOvN':'subOv')}
const oa=1-.97*E,showL=E>.85?(E-.85)/.15:0;
const nodes=[];
hubs.forEach(h=>{const p=proj(h.pos,pv,R);const foc=h===focus;const a0=clamp((p.z+1.5)/2.1,.15,1);const al=foc?a0+(1-a0)*E:a0*oa;nodes.push({n:h,hub:1,x:p.x,y:p.y,z:p.z,foc,al,r:foc?HUB0+(HUB1-HUB0)*E:HUB0})});
PL.forEach(pc=>{const d=pc.d;const p=proj(cpos(pc),pv,R);const foc=pc.hubRef===focus;const a0=clamp((p.z+1.5)/2.1,.15,1);let al=foc?a0+(1-a0)*E:a0*oa;let dim=1;if(!passes(d))dim=.14;else if(bar.size){const ms=missOf(d).length;dim=ms===0?1:ms===1?.62:.32}const o={n:d,pc,x:p.x,y:p.y,z:p.z,foc,al:al*dim,dim,r:foc?DOT+(STAR-DOT)*E:DOT};o.ef=inGroup&&foc&&panBound()>0?clamp((o.y-SAFE_T-104)/50,0,1)*clamp((H-SAFE_B-80-o.y)/50,0,1):1;o.al*=o.ef;
if(foc&&showL>0){const lb=lbl(pc);const below=pc.ly>=(pc.par?pc.par.ly:0)-12;const top=below?o.y+o.r+5:o.y-o.r-5-lb.h;o.lb=[o.x-lb.w/2,top,lb.w,lb.h];o.lbd=lb}nodes.push(o)});
if(FADE<1)nodes.forEach(o=>{o.al*=FADE});const NH=new Map();nodes.forEach(o=>{NH.set(o.hub?o.n:o.pc,o)});
drawSky();
const FN=nodes.filter(o=>o.foc);lctx.clearRect(0,0,W,H);lctx.lineCap='round';
hubs.forEach(h=>{const a=NH.get(h);h.nb.forEach(o=>{if(h.k>o.k&&o.nb.includes(h))return;const b=NH.get(o);const al=.1*Math.min(a.al,b.al)*(1-E);if(al<.005)return;lctx.globalAlpha=al;lctx.strokeStyle='#CECBF6';lctx.lineWidth=.6;lctx.beginPath();lctx.moveTo(a.x,a.y);lctx.lineTo(b.x,b.y);lctx.stroke()})});
PL.forEach(pc=>{const o=NH.get(pc);if(!o)return;const p=pc.par?NH.get(pc.par):NH.get(pc.hubRef);const al=(o.foc?(.22+.3*E)*Math.max(o.dim,.4):.22*Math.min(o.al,p.al))*Math.min(o.ef,p.ef===undefined?1:p.ef);if(al<.005)return;lctx.globalAlpha=al;lctx.strokeStyle='#CECBF6';lctx.lineWidth=o.foc?.5+.3*E:.5;lctx.beginPath();lctx.moveTo(p.x,p.y);if(o.foc&&E>.3){const c=routeFixed(pc,p,o,FN);lctx.quadraticCurveTo(c[0],c[1],o.x,o.y)}else lctx.lineTo(o.x,o.y);lctx.stroke()});
lctx.globalAlpha=1;lctx.globalCompositeOperation='destination-out';lctx.fillStyle='#000';
nodes.forEach(o=>{if(o.al<.03)return;lctx.beginPath();lctx.arc(o.x,o.y,o.r+(o.hub?6:4+2*E),0,7);lctx.fill();if(o.lb)lctx.fillRect(o.lb[0]-4,o.lb[1]-3,o.lb[2]+8,o.lb[3]+6)});
lctx.globalCompositeOperation='source-over';ctx.drawImage(lc,0,0,W,H);
const back=nodes.filter(o=>!(o.foc&&E>0)).sort((a,b)=>(a.z+(a.hub?.45:0))-(b.z+(b.hub?.45:0))),fore=nodes.filter(o=>o.foc&&E>0).sort((a,b)=>(b.hub?1:0)-(a.hub?1:0)||a.z-b.z);
[...back,...fore].forEach(o=>{if(o.al<.012)return;const c=colOf(o.n);
if(o.hub){const r=o.r;const gg=ctx.createRadialGradient(o.x,o.y,r*.5,o.x,o.y,r*2);gg.addColorStop(0,c[1]);gg.addColorStop(1,'rgba(0,0,0,0)');ctx.globalAlpha=o.al*.22;ctx.fillStyle=gg;ctx.beginPath();ctx.arc(o.x,o.y,r*2,0,7);ctx.fill();
ctx.globalAlpha=o.al*.92;ctx.fillStyle='#151B36';ctx.beginPath();ctx.arc(o.x,o.y,r,0,7);ctx.fill();ctx.globalAlpha=o.al;ctx.strokeStyle=c[1];ctx.lineWidth=1.8;ctx.stroke();ctx.globalAlpha=o.al*.25;ctx.lineWidth=4;ctx.strokeStyle=c[1];ctx.beginPath();ctx.arc(o.x,o.y,r-3,0,7);ctx.stroke();
const showT=o.foc?1:(1-clamp(E*3,0,1))*(o.z>-.25?1:.35);if(showT>.02){const hf=hubLines(o.n,o.foc?Math.round(11+3*E):11,r);const ls=hf.ls,fs=hf.fs;ctx.globalAlpha=o.al*showT;ctx.fillStyle='#F3F1FF';ctx.font=`600 ${fs}px "Roboto Condensed", Manrope, sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ls.forEach((t,i)=>ctx.fillText(t,o.x,o.y+(i-(ls.length-1)/2)*fs*1.15))}}
else{const r=o.r,d=o.n;const gg=ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,r*2.8);gg.addColorStop(0,c[1]);gg.addColorStop(1,'rgba(0,0,0,0)');ctx.globalAlpha=o.al*.4;ctx.fillStyle=gg;ctx.beginPath();ctx.arc(o.x,o.y,r*2.8,0,7);ctx.fill();
const g2=ctx.createRadialGradient(o.x-r*.3,o.y-r*.35,r*.1,o.x,o.y,r);g2.addColorStop(0,'#FFFFFF');g2.addColorStop(.5,c[0]);g2.addColorStop(1,c[1]);ctx.globalAlpha=o.al;ctx.fillStyle=g2;ctx.beginPath();ctx.arc(o.x,o.y,r,0,7);ctx.fill();
if(r>8&&o.foc){ctx.globalAlpha=o.al;drawGlass(glassType(d.g),o.x,o.y,r*.62,c[3])}
if(bar.size&&o.dim===1&&passes(d)&&!missOf(d).length){ctx.globalAlpha=Math.min(1,o.al*1.2);ctx.strokeStyle='#C0DD97';ctx.lineWidth=o.foc?1.6:1;ctx.beginPath();ctx.arc(o.x,o.y,r+(o.foc?3.5:2),0,7);ctx.stroke()}
if(d===sel&&cardOpen){ctx.globalAlpha=1;ctx.strokeStyle='#EAD3A6';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(o.x,o.y,r+4,0,7);ctx.stroke()}
if(o.foc&&r>8){if(fav.has(d.i)){ctx.globalAlpha=o.al;ctx.fillStyle='#ED93B1';ctx.beginPath();ctx.arc(o.x+r*.8,o.y-r*.8,3.2,0,7);ctx.fill()}if(inAny(d)){ctx.globalAlpha=o.al;ctx.fillStyle='#EAD3A6';ctx.beginPath();ctx.arc(o.x-r*.8,o.y-r*.8,3.2,0,7);ctx.fill()}}
if(o.lb){const lb=o.lbd;ctx.globalAlpha=Math.max(o.al,.35*o.ef)*showL;ctx.fillStyle='#E6E4F7';ctx.font=LF;ctx.textAlign='center';ctx.textBaseline='top';lb.lines.forEach((t,i)=>ctx.fillText(t,o.x,o.lb[1]+i*14));if(lb.ex){ctx.fillStyle='#9C9AB8';ctx.font=LF2;ctx.fillText(lb.ex,o.x,o.lb[1]+lb.lines.length*14+1)}}}});
ctx.globalAlpha=1;window._nodes=nodes;requestAnimationFrame(frame)}
/* Свайп от левого края экрана при открытой группе — назад к общей карте. */
let edge=0;const ptrs=new Map();let lx,ly,moved=0,pinch0=0,pinchDone=false,lastTap={t:0,x:0,y:0};
cv.addEventListener('pointerdown',e=>{ptrs.set(e.pointerId,[e.clientX,e.clientY]);cv.setPointerCapture(e.pointerId);if(ptrs.size==2){const[a,b]=[...ptrs.values()];pinch0=Math.hypot(a[0]-b[0],a[1]-b[1]);pinchDone=false;moved=99;drag=false;return}edge=inGroup&&e.clientX-cv.getBoundingClientRect().left<28?e.clientX:0;drag=true;if(!inGroup)focus=null;moved=0;lx=e.clientX;ly=e.clientY;wx=wy=0;cv.style.cursor='grabbing'});
cv.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;ptrs.set(e.pointerId,[e.clientX,e.clientY]);
if(ptrs.size==2){if(pinchDone)return;const[a,b]=[...ptrs.values()];const r=Math.hypot(a[0]-b[0],a[1]-b[1])/pinch0;if(!inGroup&&r>1.15){enter(frontHub());pinchDone=true}else if(inGroup&&r<.87){exitGroup();pinchDone=true}return}
if(edge){moved=99;if(e.clientX-edge>70){edge=0;drag=false;exitGroup()}return}
if(!drag)return;const dx=e.clientX-lx,dy=e.clientY-ly;lx=e.clientX;ly=e.clientY;moved+=Math.abs(dx)+Math.abs(dy);
if(inGroup){if(panBound()>0){panY=clamp(panY+dy,-panBound()-30,panBound()+30);vpan=dy}else tilt=[tilt[0]+dx*.006,tilt[1]+dy*.006]}else{const k=.0075;wx=dx*k;wy=dy*k;M=mm(axr([0,1,0],wx),M);M=mm(axr([1,0,0],wy),M);bgx+=dx*.3;bgy+=dy*.3;ortho()}});
function up(e){const was=ptrs.size;ptrs.delete(e.pointerId);if(ptrs.size>0)return;if(edge){edge=0;drag=false;return}const wasDrag=drag;drag=false;cv.style.cursor='grab';if(was>1||!wasDrag||moved>=8)return;const b=cv.getBoundingClientRect();onTap(e.clientX-b.left,e.clientY-b.top)}
function onTap(x,y){const N=window._nodes||[];const now=performance.now();
if(inGroup){const hit=N.find(o=>o.foc&&!o.hub&&o.ef>.3&&(Math.hypot(o.x-x,o.y-y)<=Math.max(o.r+6,18)||(o.lb&&x>=o.lb[0]-4&&x<=o.lb[0]+o.lb[2]+4&&y>=o.lb[1]-3&&y<=o.lb[1]+o.lb[3]+3)));if(hit){lastTap.t=0;haptic();showCard(hit.n);return}}
else{const hh=N.filter(o=>o.hub&&o.z>-.35).sort((a,c)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(c.x-x,c.y-y))[0];if(hh&&Math.hypot(hh.x-x,hh.y-y)<=hh.r+14){lastTap.t=0;enter(hh.n);return}
const dd=N.filter(o=>!o.hub&&o.z>-.1).sort((a,c)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(c.x-x,c.y-y))[0];if(dd&&Math.hypot(dd.x-x,dd.y-y)<=16){lastTap.t=0;enter(dd.pc.hubRef);return}}
if(now-lastTap.t<330&&Math.hypot(x-lastTap.x,y-lastTap.y)<40){lastTap.t=0;inGroup?exitGroup():enter(frontHub());return}lastTap={t:now,x,y}}
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
let wheelLock=0;cv.addEventListener('wheel',e=>{e.preventDefault();const now=performance.now();if(now<wheelLock)return;if(!inGroup&&e.deltaY<-3){enter(frontHub());wheelLock=now+900}else if(inGroup&&panBound()>0&&!e.ctrlKey){panY=clamp(panY-e.deltaY,-panBound(),panBound())}else if(inGroup&&e.deltaY>3){exitGroup();wheelLock=now+900}},{passive:false});
function openSheet(html,tall){sheet.innerHTML='<div id="grab" aria-hidden="true" style="margin:-14px -20px 4px;padding:12px 0 14px;touch-action:none;cursor:grab"><div style="width:38px;height:4px;border-radius:2px;background:rgba(220,225,255,.28);margin:0 auto"></div></div>'+html;sheet.style.minHeight=tall?'88%':'0';sheet.scrollTop=0;if(!cardOpen){cardOpen=true;ov.style.transition='opacity .22s';sheet.style.transition='transform .25s cubic-bezier(.2,.9,.3,1)';ov.style.opacity=1;ov.style.pointerEvents='auto';sheet.style.transform='translateY(0)';syncUI()}sheet.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeSheet)}
function closeSheet(full){if(navBack&&inCard&&full!=='all'){const nb=navBack;navBack=null;inCard=false;sd=null;nb.fn();sheet.scrollTop=nb.y;sheet.style.transition='transform .22s cubic-bezier(.2,.9,.3,1)';sheet.style.transform='translateY(0)';ov.style.transition='opacity .2s';ov.style.opacity=1;return}navBack=null;inCard=false;if(cookT)clearInterval(cookT);cookT=null;cardOpen=false;sd=null;ov.style.transition='opacity '+(full===true?'.22s':'.16s');sheet.style.transition='transform '+(full===true?'.22s ease-out':'.16s ease-in');ov.style.opacity=0;ov.style.pointerEvents='none';sheet.style.transform=full===true?'translateY(100%)':'translateY(40px)';syncUI()}
/* Свайп вниз закрывает панель: тянуть можно за полоску сверху, а если содержимое пролистано к началу — и за саму панель. */
let sd=null;
function sdStart(y){sd={y0:y,dy:0,t:performance.now(),v:0};sheet.style.transition='none';ov.style.transition='none'}
function sdMove(y){if(!sd)return;const now=performance.now();const dy=Math.max(0,y-sd.y0);sd.v=(dy-sd.dy)/Math.max(1,now-sd.t);sd.t=now;sd.dy=dy;sheet.style.transform=`translateY(${dy}px)`;ov.style.opacity=String(1-.7*Math.min(1,dy/Math.max(200,sheet.offsetHeight)))}
function sdEnd(){if(!sd)return;const s0=sd;sd=null;if(s0.dy>Math.min(130,sheet.offsetHeight*.3)||(s0.v>.5&&s0.dy>24)){haptic();closeSheet(true)}else{sheet.style.transition='transform .22s cubic-bezier(.2,.9,.3,1)';ov.style.transition='opacity .22s';sheet.style.transform='translateY(0)';ov.style.opacity=1}}
sheet.addEventListener('pointerdown',e=>{if(!cardOpen||!e.target.closest('#grab'))return;e.preventDefault();sdStart(e.clientY);const mv_=ev=>sdMove(ev.clientY),up_=()=>{window.removeEventListener('pointermove',mv_);window.removeEventListener('pointerup',up_);window.removeEventListener('pointercancel',up_);sdEnd()};window.addEventListener('pointermove',mv_);window.addEventListener('pointerup',up_);window.addEventListener('pointercancel',up_)});
let tch=null;
sheet.addEventListener('touchstart',e=>{if(e.touches.length!==1||e.target.closest('#grab')||e.target.closest('input,textarea,select'))return;tch={y:e.touches[0].clientY,x:e.touches[0].clientX,top:sheet.scrollTop<=0,on:false}},{passive:true});
sheet.addEventListener('touchmove',e=>{if(!tch)return;const y=e.touches[0].clientY,x=e.touches[0].clientX;if(!tch.on){if(!tch.top||sheet.scrollTop>0){tch=null;return}const dy=y-tch.y;if(Math.abs(x-tch.x)>Math.abs(dy)){tch=null;return}if(dy>8){tch.on=true;sdStart(tch.y+8)}else if(dy<-4){tch=null;return}else return}e.preventDefault();sdMove(y)},{passive:false});
sheet.addEventListener('touchend',()=>{if(tch&&tch.on)sdEnd();tch=null});sheet.addEventListener('touchcancel',()=>{if(tch&&tch.on)sdEnd();tch=null});
ov.addEventListener('click',e=>{if(e.target===ov)closeSheet()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&cardOpen)closeSheet()});
if(tg){try{tg.ready();tg.expand();tg.disableVerticalSwipes&&tg.disableVerticalSwipes();tg.setHeaderColor&&tg.setHeaderColor('#0B1020');tg.setBackgroundColor&&tg.setBackgroundColor('#0B1020');tg.setBottomBarColor&&tg.isVersionAtLeast&&tg.isVersionAtLeast('7.10')&&tg.setBottomBarColor('#0B1020');tg.BackButton.onClick(()=>{if(cardOpen)closeSheet();else exitGroup()});['viewportChanged','safeAreaChanged','contentSafeAreaChanged','fullscreenChanged'].forEach(ev=>{try{tg.onEvent(ev,()=>{size();fontsOk++;PL.forEach(q=>q._lk=null)})}catch(e){}})}catch(e){}}
const head=(title,back,extra)=>`<div style="display:flex;gap:8px;align-items:flex-start">${back?`<button class="cl" id="back" aria-label="${t('back')}"><i class="ti ti-arrow-left" aria-hidden="true"></i></button>`:''}<div style="flex:1;font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600;line-height:1.1;color:#F3F1FF">${title}</div>${extra||''}<button class="cl" data-close aria-label="${t('close')}"><i class="ti ti-x" aria-hidden="true"></i></button></div>`;
function fCount(){return FLw().filter(k=>F[k]).length}
function updCount(){const f=document.getElementById('fc'),l=document.getElementById('lc'),c=document.getElementById('fltc');f.textContent=fav.size;f.style.display=fav.size?'inline-flex':'none';l.textContent=lists.length;l.style.display=lists.length?'inline-flex':'none';const n=fCount()+(bar.size?1:0);c.textContent=n;c.style.display=n?'inline-flex':'none';PL.forEach(q=>q._lk=null)}
const chip=o=>`<button class="rc" data-i="${o.i}">${nm(o)}</button>`;
function bindChips(){sheet.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const back=inCard?navBack:(curView?{fn:curView,y:sheet.scrollTop}:null);showCard(D[+b.dataset.i]);navBack=back})}
