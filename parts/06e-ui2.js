/* ===================== Поиск + фильтры в одном экране, возврат к списку, свайп, поддержка ===================== */
/* --- Навигация: карточка, открытая из списка, при закрытии возвращает к нему --- */
function navMark(fn){curView=fn;inCard=false;navBack=null}

/* --- Поиск и фильтры: раскрывающиеся группы --- */
const ACC={b:false,t:false,l:false,x:false,bar:false};
function showFilters(){navMark(showFilters);const E_=lang==='en';const FL=FLw();
const kB=Object.keys(B).filter(k=>isN(k)===(world==='n')),kT=Object.keys(T).filter(k=>isN(k)===(world==='n')),kL=world==='n'?KORDER_N.l:[1,2,3,4,'few','many','batch','classic','shots'];
const chips=(set,keys,lab,kind)=>keys.map(k=>`<button class="tgl${set.has(k)?' on':''}" data-sf="${kind}:${k}">${esc(lab(k))}</button>`).join('');
const nX=FL.filter(k=>F[k]).length;const canN=bar.size?D.filter(d=>!d.hidden&&!d.nk===(world==='c')&&!missOf(d).length).length:0;
const acc=(id,title,n,body)=>`<div style="margin-top:10px;border-radius:14px;background:rgba(220,225,255,.04);border:0.5px solid rgba(220,225,255,.1)"><button data-acc="${id}" aria-expanded="${!!ACC[id]}" style="width:100%;display:flex;align-items:center;gap:8px;padding:13px 14px;background:none;border:none;color:#F3F1FF;font-size:16px;cursor:pointer;font-family:inherit"><span style="flex:1;text-align:left">${title}</span>${n?`<span style="min-width:22px;height:22px;border-radius:11px;background:#EAD3A6;color:#1A1330;font-size:12px;font-weight:600;display:inline-flex;align-items:center;justify-content:center;padding:0 6px;box-sizing:border-box">${n}</span>`:''}<i class="ti ti-chevron-down" style="transition:transform .2s;transform:rotate(${ACC[id]?180:0}deg);color:#8E8CAE;font-size:18px" aria-hidden="true"></i></button>${ACC[id]?`<div style="padding:0 12px 12px;display:flex;flex-wrap:wrap">${body}</div>`:''}</div>`;
const barBody=`<div style="width:100%;font-size:14px;line-height:1.55;color:#DCDAF0;padding:0 2px">${bar.size?t('barStat')(bar.size,canN,pluralW(canN)):t(world==='n'?'barIntroN':'barIntro')}</div><div style="width:100%;margin-top:10px;display:flex;gap:8px"><button class="big" id="barb"><i class="ti ti-bottle" aria-hidden="true"></i>${bar.size?t('barEdit'):t('barSet')}</button>${bar.size?`<button class="sec" id="barc">${t('clear')}</button>`:''}</div>`;
openSheet(head(E_?'Search & filters':'Поиск и фильтры')+`<div style="display:flex;gap:8px;margin-top:12px"><input class="din" id="q" type="search" placeholder="${t('searchPh')}" style="flex:1;min-width:0" value="${esc(SF.q||'')}"><button class="sec" id="rndb" style="flex:none;height:46px;padding:0 14px"><i class="ti ti-dice-5" aria-hidden="true"></i>${t(world==='n'?'nRnd':'cRnd')}</button></div><div id="res"></div>`+
acc('b',t('segB'),SF.b.size,chips(SF.b,kB,bName,'b'))+acc('t',t('segT'),SF.t.size,chips(SF.t,kT,tName,'t'))+acc('l',t(world==='n'?'segLn':'segL'),SF.l.size,chips(SF.l,kL,lName,'l'))+
acc('x',E_?'Dim on the map':'Подсветка на карте',nX,`<div style="width:100%;font-size:13px;color:#9997B8;margin:0 2px 6px">${t(world==='n'?'filtHintN':'filtHint')}</div>`+FL.map(k=>`<button class="tgl${F[k]?' on':''}" data-f="${k}">${t('f_'+k)}</button>`).join('')+(F.can&&!bar.size?`<div style="width:100%;font-size:13px;color:#FFC2A3">${t('barFirst')}</div>`:''))+
acc('bar',t('myBar'),bar.size,barBody)+
((SF.b.size+SF.t.size+SF.l.size+nX)?`<button class="sec" id="fr" style="width:100%;margin-top:14px">${t('reset')}</button>`:''));
const q=sheet.querySelector('#q'),res=sheet.querySelector('#res');
const run=()=>{const s=q.value.trim().toLowerCase();SF.q=q.value;const nf=SF.b.size+SF.t.size+SF.l.size;if(!s&&!nf){res.innerHTML='';return}
const f=searchHits(s);trackSearch(f.length);res.innerHTML=`<div style="font-size:12px;color:#8E8CAE;margin:10px 0 2px">${E_?'Found':'Найдено'}: ${f.length}</div>`+(f.length?f.slice(0,80).map(rowHtml).join(''):`<div style="font-size:14px;color:#8E8CAE;padding:10px 0">${t('nothing')}</div>`);bindChips()};
q.oninput=run;run();
const re=()=>{const y=sheet.scrollTop;showFilters();sheet.scrollTop=y};
sheet.querySelector('#rndb').onclick=()=>{haptic();showRandom()};
sheet.querySelectorAll('[data-acc]').forEach(b=>b.onclick=()=>{ACC[b.dataset.acc]=!ACC[b.dataset.acc];haptic('sel');re()});
sheet.querySelectorAll('[data-sf]').forEach(b=>b.onclick=()=>{const[kind,k0]=b.dataset.sf.split(':');const k=kind==='l'&&/^\d$/.test(k0)?+k0:k0;const set=SF[kind];set.has(k)?set.delete(k):set.add(k);haptic('sel');re()});
sheet.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{F[b.dataset.f]=!F[b.dataset.f];if(F[b.dataset.f])track('filter_on',{filter:b.dataset.f});haptic();updCount();re()});
const bb=sheet.querySelector('#barb');if(bb)bb.onclick=showBar;const bc=sheet.querySelector('#barc');if(bc)bc.onclick=()=>{bar.clear();updCount();re()};
const fr=sheet.querySelector('#fr');if(fr)fr.onclick=()=>{FL.forEach(k=>F[k]=false);SF.b.clear();SF.t.clear();SF.l.clear();updCount();re()}}
function showSearch(){showFilters()}

/* --- Всплывающая подсказка с действием («Вернуть») --- */
let toastT=null;
function showToast(text,act,fn){let el=document.getElementById('toast');if(!el){el=document.createElement('div');el.id='toast';el.setAttribute('role','status');el.style.cssText='position:fixed;left:16px;right:16px;bottom:calc(var(--sb) + 18px);z-index:60;display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:14px;background:#262B47;border:0.5px solid rgba(220,225,255,.16);color:#EEEDFE;font-size:14px;font-family:Roboto Condensed,Roboto,-apple-system,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.4);transition:opacity .2s,transform .2s';document.body.appendChild(el)}
el.innerHTML=`<span style="flex:1">${text}</span>${act?`<button style="background:none;border:none;color:#EAD3A6;font-size:14px;font-weight:600;cursor:pointer;padding:4px 2px;font-family:inherit">${act}</button>`:''}`;el.style.opacity=1;el.style.transform='translateY(0)';el.style.pointerEvents='auto';
const b=el.querySelector('button');if(b)b.onclick=()=>{hide();fn&&fn()};const hide=()=>{el.style.opacity=0;el.style.transform='translateY(10px)';el.style.pointerEvents='none'};clearTimeout(toastT);toastT=setTimeout(hide,4500)}

/* --- Свайп влево по строке списка: открыть «Удалить» или сразу убрать (длинный свайп) --- */
function bindSwipe(onDel){sheet.querySelectorAll('.swr').forEach(w=>{const f=w.querySelector('.swf');let x0=0,y0=0,dx=0,drag=false,pid=null,open=false;
const move=e=>{if(e.pointerId!==pid)return;const mx=e.clientX-x0,my=e.clientY-y0;if(!drag){if(Math.abs(mx)>10&&Math.abs(mx)>Math.abs(my)*1.3){drag=true;w.dataset.drag='1'}else if(Math.abs(my)>10){stop();return}else return}e.preventDefault();dx=Math.min(0,mx+(open?-88:0));f.style.transform=`translateX(${dx}px)`};
const stop=()=>{pid=null;window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',end);window.removeEventListener('pointercancel',end)};
const end=e=>{if(e.pointerId!==pid)return;stop();f.style.transition='transform .2s ease-out';if(!drag)return;setTimeout(()=>{delete w.dataset.drag},80);
if(dx<-w.offsetWidth*.45){f.style.transform='translateX(-100%)';haptic();setTimeout(()=>onDel(w.dataset.sw),170)}else if(dx<-44){open=true;f.style.transform='translateX(-88px)'}else{open=false;f.style.transform='translateX(0)'}};
f.addEventListener('pointerdown',e=>{if(e.button>0)return;x0=e.clientX;y0=e.clientY;dx=open?-88:0;drag=false;pid=e.pointerId;f.style.transition='none';window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',end);window.addEventListener('pointercancel',end)});
f.addEventListener('click',e=>{if(w.dataset.drag){e.stopPropagation();e.preventDefault()}else if(open){e.stopPropagation();e.preventDefault();open=false;f.style.transition='transform .2s ease-out';f.style.transform='translateX(0)'}},true);
w.querySelector('.swd').onclick=()=>{haptic();f.style.transition='transform .17s';f.style.transform='translateX(-100%)';setTimeout(()=>onDel(w.dataset.sw),160)}})}
function swipeDel(key){const[li,i0]=key.split(':');const l=lists.find(x=>x.id==li);if(!l)return;const i=+i0;const before=[...l.items.entries()];l.items.delete(i);try{localStorage.setItem('wtd_swh','1')}catch(_){}
const y=sheet.scrollTop;showLists();sheet.scrollTop=y;updCount();showToast(`${esc(nm(D[i]))} — ${lang==='en'?'removed from the list':'убран из списка'}`,lang==='en'?'Undo':'Вернуть',()=>{l.items=new Map(before);const yy=sheet.scrollTop;if(cardOpen&&curView===showLists){showLists();sheet.scrollTop=yy}updCount()})}
const swHint=()=>{try{return!localStorage.getItem('wtd_swh')}catch(_){return true}};

/* --- «Автору на лёд и лаймы» ---
   Пока DONATE_URL пустой, кнопок поддержки нигде нет. Показ строки: на 3-й, 10-й, 17-й… (каждые 7) день пользования
   или «Готово» в режиме бармена; не чаще раза в 7 дней; после нажатия — 60 дней тишины. */
const DONATE_URL='';
let SUP={days:0,lastDay:'',cook:0,last:0,snooze:0,pend:null},cardsSeen=0;
const supDue=n=>n===3||(n>3&&(n-3)%7===0);
function supDay(){const d=new Date().toISOString().slice(0,10);if(SUP.lastDay===d)return;SUP.lastDay=d;SUP.days++;if(supDue(SUP.days))SUP.pend='day'}
function supCook(){SUP.cook++;if(supDue(SUP.cook))SUP.pend='cook'}
function supBox(){if(!DONATE_URL||!SUP.pend)return'';const now=Date.now();if(now-SUP.last<7*864e5||now<SUP.snooze)return'';if(SUP.pend==='day'&&cardsSeen<2)return'';SUP.last=now;SUP.pend=null;track('donate_show');
return`<div id="supb" style="margin-top:18px;padding:12px 14px;border-radius:14px;background:rgba(168,240,58,.07);border:0.5px solid rgba(168,240,58,.25);display:flex;align-items:center;gap:10px"><span style="flex:1;font-size:14px;line-height:1.45;color:#E4F5C8">${lang==='en'?'Enjoying the app?':'Нравится приложение?'} <a href="#" id="supgo" style="color:#C8F27A;font-weight:600">${lang==='en'?'Ice & limes for the author':'Автору на лёд и лаймы'} 🍋</a></span><button class="cl" id="supx" aria-label="×" style="width:30px;height:30px;font-size:15px"><i class="ti ti-x" aria-hidden="true"></i></button></div>`}
function supGo(){SUP.snooze=Date.now()+60*864e5;track('donate_click');if(tg&&tg.openLink)tg.openLink(DONATE_URL);else window.open(DONATE_URL,'_blank','noopener')}
function bindSup(){const g=sheet.querySelector('#supgo');if(g)g.onclick=e=>{e.preventDefault();supGo();const b=sheet.querySelector('#supb');if(b)b.remove()};const x=sheet.querySelector('#supx');if(x)x.onclick=()=>{const b=sheet.querySelector('#supb');if(b)b.remove()}}
/* Постоянная ссылка рядом с ником и экран «О приложении» (меню «⋯» Telegram). */
function supFooter(){if(!DONATE_URL)return;const ig=document.getElementById('ig');if(!ig||document.getElementById('igsup'))return;const a=document.createElement('a');a.id='igsup';a.href='#';a.textContent=(lang==='en'?'· Ice & limes for the author':'· Автору на лёд и лаймы');a.style.cssText='margin-left:6px;color:inherit;text-decoration:none;pointer-events:auto';a.onclick=e=>{e.preventDefault();supGo()};ig.insertAdjacentElement('afterend',a)}
Object.assign(ICONS,{'help-circle':'<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/><path d="M12 16v.01"/><path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483"/>',
'message-circle':'<path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1"/>',
share:'<path d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M15 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M8.7 10.7l6.6 -3.4"/><path d="M8.7 13.3l6.6 3.4"/>',
lock:'<path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"/><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"/><path d="M8 11v-4a4 4 0 1 1 8 0v4"/>'});
const APP_VER='1.0',APP_DATE='16.11.2026',APP_LINK='https://t.me/whattodrinkuh_bot/app';
const HOWTO=[['Крутите шар пальцем. Тап по группе открывает её, щипок или двойной тап — назад.','Spin the globe with a finger. Tap a group to open it; pinch or double-tap to go back.'],
['«Основа», «Вкус» и «Сложность» раскладывают карту по-разному. Сверху — переключатель «Коктейли / Настойки».','“Base”, “Taste” and “Difficulty” arrange the map in different ways. The switch at the top flips between cocktails and infusions.'],
['Тап по звезде открывает рецепт. «Готовить» — пошаговый режим бармена с таймером.','Tap a star to open the recipe. “Make it” starts the step-by-step bartender mode with a timer.'],
['Карточку и любую панель закрывайте свайпом вниз за полоску сверху.','Close a card or any panel by swiping down on the handle at the top.'],
['Собирайте меню вечеринки «В список»: там же «Что купить» и «Поделиться». Лишнюю позицию смахните влево.','Build a party menu with “Add to list”: it has “Shopping” and “Share”. Swipe a row left to remove it.'],
['«Поиск и фильтры» — поиск, случайный рецепт и «Мой бар»: отметьте, что есть дома, и карта подсветит, что можно сделать.','“Search & filters” has search, a random pick and “My bar”: tick what you have and the map lights up what you can make.'],
['«+» внизу — свои рецепты коктейлей и настоек.','“+” at the bottom adds your own cocktails and infusions.']];
function showAbout(){navMark(showAbout);const E_=lang==='en';const L=(r,e)=>E_?e:r;
openSheet(head(L('О приложении','About'))+`<div style="font-size:15px;line-height:1.6;color:#C9C7E2;margin-top:8px">${L('Звёздная карта коктейлей и настоек для домашней вечеринки: списки, покупки и пошаговый режим бармена.','A star map of cocktails and infusions for a home party: lists, shopping and step-by-step bartender mode.')}</div>
<div style="display:flex;flex-direction:column;gap:8px;margin-top:16px">
<button class="sec" id="abh" aria-expanded="false" style="justify-content:flex-start"><i class="ti ti-help-circle" aria-hidden="true"></i>${L('Как пользоваться','How to use')}<i class="ti ti-chevron-down" id="abhc" aria-hidden="true" style="margin-left:auto;transform:rotate(0deg);transition:transform .2s"></i></button>
<ol id="abhl" style="display:none;margin:0 0 4px;padding:4px 4px 4px 22px;font-size:14px;line-height:1.55;color:#C9C7E2">${HOWTO.map(h=>`<li style="margin-bottom:6px">${E_?h[1]:h[0]}</li>`).join('')}</ol>
<button class="sec" id="abm"><i class="ti ti-message-circle" aria-hidden="true"></i>${L('Написать автору / сообщить об ошибке','Message the author / report a bug')}</button>
<button class="sec" id="abs"><i class="ti ti-share" aria-hidden="true"></i>${L('Поделиться приложением','Share the app')}</button>
${DONATE_URL?`<button class="big" id="abd" style="background:#C8F27A;color:#1E2A0A">🍋 ${L('Автору на лёд и лаймы','Ice & limes for the author')}</button>`:''}
<button class="sec" id="abt"><i class="ti ti-book" aria-hidden="true"></i>${L('Термины','Bar terms')}</button>
<button class="sec" id="abp"><i class="ti ti-lock" aria-hidden="true"></i>${L('Политика конфиденциальности','Privacy policy')}</button></div>
<div style="font-size:12px;color:#6F6D8E;margin-top:14px">${D.filter(d=>!d.nk&&!d.hidden).length} ${L('коктейлей','cocktails')} · ${D.filter(d=>d.nk&&!d.hidden).length} ${L('настоек','infusions')}</div>
<div style="font-size:12px;color:#6F6D8E;margin-top:4px">${L('Версия','Version')} ${APP_VER} · ${APP_DATE}</div>`);
const op=u=>{if(tg&&tg.openLink)tg.openLink(u);else window.open(u,'_blank','noopener')};
const hb=sheet.querySelector('#abh'),hl=sheet.querySelector('#abhl');hb.onclick=()=>{const o=hl.style.display==='none';hl.style.display=o?'block':'none';hb.setAttribute('aria-expanded',o);sheet.querySelector('#abhc').style.transform=o?'rotate(180deg)':'rotate(0deg)'};
sheet.querySelector('#abm').onclick=()=>{track('contact');op('https://ig.me/m/ne.drozd')};
sheet.querySelector('#abs').onclick=()=>{track('app_share');const txt=L('Что пьём? — звёздная карта коктейлей и настоек для домашней вечеринки','Что пьём? — a star map of cocktails and infusions for a home party');const u='https://t.me/share/url?url='+encodeURIComponent(APP_LINK)+'&text='+encodeURIComponent(txt);try{if(tg&&tg.openTelegramLink){tg.openTelegramLink(u);return}}catch(_){}window.open(u,'_blank','noopener')};
const d_=sheet.querySelector('#abd');if(d_)d_.onclick=supGo;sheet.querySelector('#abt').onclick=showTerms;sheet.querySelector('#abp').onclick=()=>op('https://zhekadrozdov84-design.github.io/chto-vypit-dlya-tg/privacy.html')}
document.getElementById('inf').onclick=showAbout;
try{if(tg&&tg.SettingsButton){tg.SettingsButton.show();tg.SettingsButton.onClick(showAbout)}}catch(_){}
