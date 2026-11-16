/* ===================== Статистика: Яндекс Метрика =====================
   Обезличенно: вместо Telegram-ID — хэш (SHA-256 с солью), из которого нельзя восстановить, кто это.
   Имя, ник и телефон не передаются. Пока YM_ID = 0, счётчик выключен и ничего не отправляется. */
const YM_ID=114234235;
const TRACK_LOG=[];/* для проверки: последние события */
function track(goal,params){TRACK_LOG.push([goal,params||null]);if(TRACK_LOG.length>50)TRACK_LOG.shift();if(!YM_ID||!window.ym)return;try{ym(YM_ID,'reachGoal',goal,params||{});ym(YM_ID,'params',{ev:{[goal]:params||1}})}catch(e){}}
let _lastSearch=0;function trackSearch(n){const now=Date.now();if(now-_lastSearch<60000)return;_lastSearch=now;track('search',{world,found:n})}
async function ymUserId(){try{const id=tg&&tg.initDataUnsafe&&tg.initDataUnsafe.user&&tg.initDataUnsafe.user.id;if(!id||!crypto.subtle)return'';const h=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('whattodrinkuh:'+id));return[...new Uint8Array(h)].slice(0,12).map(b=>b.toString(16).padStart(2,'0')).join('')}catch(e){return''}}
(async()=>{if(!YM_ID)return;
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id='+YM_ID,'ym');
const uid=await ymUserId();const inTg=!!tg;
ym(YM_ID,'init',{ssr:true,clickmap:false,trackLinks:true,accurateTrackBounce:true,webvisor:false,referrer:document.referrer,url:location.href,params:{inTelegram:inTg?'да':'нет',platform:inTg?(tg.platform||'?'):'browser',startapp:startParam?(startParam()||'—'):'—'}});
if(uid){ym(YM_ID,'setUserID',uid);ym(YM_ID,'userParams',{UserID:uid,inTelegram:inTg?'да':'нет'})}})();
