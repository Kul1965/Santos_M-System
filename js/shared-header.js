/* Santos Cooking House shared header — one stable stylesheet, no animated tab effects. */
(function(){
"use strict";
function init(){
 const bar=document.querySelector(".topbar");
 if(!bar||document.body.dataset.santosHeaderReady==="yes")return;
 document.body.dataset.santosHeaderReady="yes";
 const oldDate=document.getElementById("date"),oldDateNow=document.getElementById("dateNow");
 if(oldDate)oldDate.classList.add("legacy-date-hidden");
 if(oldDateNow)oldDateNow.classList.add("legacy-date-hidden");
 const style=document.createElement("style");
 style.id="santos-stable-header-css";
 style.textContent=`
 .topbar{min-height:86px!important;height:auto!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:14px!important;padding:10px 16px!important;background:#10563e!important;border-bottom:1px solid #1b704f!important;box-sizing:border-box!important}
 .dh-brand{display:flex;align-items:center;gap:11px;min-width:0;flex:1 1 auto}
 .dh-logo{width:64px;height:68px;object-fit:contain;flex:0 0 auto}
 .dh-divider{height:58px;width:1px;background:#7ab49a;flex:0 0 1px}
 .dh-title{min-width:0}
 .dh-title h1{font-size:30px!important;line-height:1.05!important;color:#f2c51a!important;margin:0 0 3px!important}
 .dh-title h2{font-size:19px!important;line-height:1.15!important;color:#fff!important;margin:0!important;white-space:normal!important}
 .dh-tri{height:4px!important;max-width:310px;margin-top:6px;border-radius:4px;background:linear-gradient(90deg,#176747,#d8b54b,#176747)}
 .dh-flags{display:flex;align-items:center;gap:6px;margin-left:8px;flex:0 0 auto}
 .dh-flags span{display:inline-flex;align-items:center;justify-content:center;font-size:32px;line-height:1}
 .dh-info{display:flex;align-items:center;justify-content:flex-end;gap:6px;flex:0 1 auto;min-width:0}
 .dh-pill{display:flex;align-items:center;gap:6px;padding:7px 9px;border:1px solid #438568;border-radius:22px;background:#176747;color:#fff;font-size:11px;line-height:1.2;white-space:nowrap}
 .dh-pill strong{color:#fff}
 .dh-manager-photo{width:28px;height:28px;flex:0 0 28px;object-fit:cover;border-radius:50%;border:2px solid #8ab99a}
 .dh-manager-photo[hidden]{display:none!important}
 .dh-date{font-size:11px;color:#ffe48a;margin-top:4px}
 .legacy-date-hidden{display:none!important}
 .sidebar .brand{display:flex!important;flex-direction:column!important;align-items:center!important;gap:4px!important;padding:12px 8px!important}
 .sidebar .brand .side-emblem-row{display:flex;align-items:center;justify-content:center;margin:0 auto 3px}
 .sidebar .brand .side-crpf-logo{display:block;width:48px;height:50px;object-fit:contain}
 .sidebar .brand h2,.sidebar .brand b{font-size:16px!important;line-height:1.1!important;margin:2px 0!important;color:#f2c51a!important}
 .sidebar .brand p,.sidebar .brand small{font-size:10px!important;line-height:1.2!important;margin:0!important;color:#d2e5db!important}
 .top-nav{display:flex!important;align-items:center!important;gap:5px!important;width:100%!important;min-width:0!important;overflow-x:auto!important;overflow-y:hidden!important;white-space:nowrap!important;padding:7px 10px!important;background:#10563e!important;border-bottom:3px solid #c49a24!important;box-sizing:border-box!important;scrollbar-width:thin!important;-webkit-overflow-scrolling:touch!important}
 .top-nav a{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;flex:0 0 auto!important;padding:9px 12px!important;border:1px solid #438568!important;border-radius:8px!important;background:#176747!important;color:#fff!important;text-decoration:none!important;font:700 12px Arial,sans-serif!important;white-space:nowrap!important;box-shadow:none!important;transform:none!important;transition:none!important}
 .top-nav a:hover,.top-nav a.selected{background:#087b49!important;border-color:#9bd7b3!important;color:#fff!important;box-shadow:none!important;transform:none!important}
 .top-nav .tab-menu{display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:0 0 40px!important;width:40px!important;height:38px!important;border:1px solid #438568!important;border-radius:8px!important;background:#176747!important;color:#fff!important;font-size:21px!important;box-shadow:none!important;transform:none!important;transition:none!important}
 .top-nav-icon{font-size:15px!important;line-height:1!important}
 @media(max-width:850px){
  .topbar{display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:8px!important;padding:10px 12px!important}
  .dh-brand{width:100%;gap:8px}
  .dh-logo{width:48px;height:52px}
  .dh-divider{height:46px}
  .dh-title h1{font-size:24px!important}
  .dh-title h2{font-size:15px!important}
  .dh-flags{gap:3px;margin-left:auto}
  .dh-flags span{font-size:27px}
  .dh-info{width:100%;justify-content:flex-start;overflow-x:auto;flex-wrap:nowrap;padding-bottom:2px;scrollbar-width:none}
  .dh-pill{font-size:10px;padding:5px 7px;flex:0 0 auto}
  .dh-manager-photo{width:25px;height:25px;flex-basis:25px}
  .top-nav{gap:4px!important;padding:6px 7px!important}
  .top-nav a{padding:8px 10px!important;font-size:11px!important}
  .top-nav .tab-menu{flex-basis:38px!important;width:38px!important;height:36px!important}
  .sidebar .brand .side-crpf-logo{width:39px;height:41px}
 }
 @media(prefers-reduced-motion:reduce){.top-nav *{animation:none!important;transition:none!important}}
 `;
 document.head.appendChild(style);
 bar.innerHTML='<div class="dh-brand"><img class="dh-logo" src="./icons/santos-home-kitchen.svg" alt="SANTOS Home Kitchen monogram"><span class="dh-divider"></span><div class="dh-title"><h1>SANTOS</h1><h2>Cooking 🔪 House 🏠 System</h2><div class="dh-date" id="dhClock"></div><div class="dh-tri"></div></div><span class="dh-flags" aria-label="Nepal and Australia flags"><span role="img" aria-label="Nepal flag">🇳🇵</span><span role="img" aria-label="Australia flag">🇦🇺</span></span></div><div class="dh-info"><div class="dh-pill">🏠 House: <strong id="dhMess">Santos Cooking House</strong></div><div class="dh-pill dh-manager-pill"><img id="dhManagerPhoto" class="dh-manager-photo" alt="Mess Manager photo" hidden><span>👤 Mess Manager: <strong id="dhNco">Not Set</strong></span></div><div class="dh-pill">👨‍🍳 Head Cook: <strong id="dhSo">Not Set</strong></div></div>';
 const items=[["index.html","⌂","Home"],["members.html","👥","Members"],["ration-store.html","📦","Ration Store"],["purchases.html","🛒","Purchases"],["recipes.html","🍲","Recipes"],["making-menu.html","📅","Making Menu"],["mess-staff.html","👨‍🍳","Mess Staff"],["accounts.html","💰","Accounts"],["reports.html","📊","Reports"],["mess-handover.html","🔄","Handover"],["settings.html","⚙️","Settings"],["backup.html","💾","Backup"],["software-guide.html","📖","हिन्दी गाइड"]];
 const current=location.pathname.split("/").pop()||"index.html";
 const nav=document.createElement("nav");nav.className="top-nav";nav.setAttribute("aria-label","Main navigation");
 nav.innerHTML='<button type="button" class="tab-menu" aria-label="Open navigation menu" aria-expanded="false">☰</button>'+items.map(x=>'<a href="'+x[0]+'" '+(current===x[0]?'class="selected" aria-current="page"':'')+'><span class="top-nav-icon">'+x[1]+'</span><span>'+x[2]+'</span></a>').join("");
 bar.insertAdjacentElement("afterend",nav);
 function updateClock(){const d=new Date(),el=document.getElementById("dhClock");if(el)el.textContent="🕒 "+d.toLocaleTimeString("en-GB",{hour12:false})+" | "+d.toLocaleDateString("en-GB");}
 updateClock();setInterval(updateClock,1000);
 try{
  const data=JSON.parse(localStorage.getItem("crpfMessData")||"{}"),settings=data.settings||{},staff=Array.isArray(data.staff)?data.staff:[],members=Array.isArray(data.members)?data.members:[];
  const active=staff.filter(x=>String(x.status||"Active").toLowerCase()==="active"&&x.isOnDuty!==false&&!x.dutyTo);
  const findRole=(...roles)=>active.find(x=>roles.includes(String(x.duty||"").trim().toLowerCase()));
  const manager=findRole("mess manager","mess commander","mess nco"),cook=findRole("head cook","mess so");
  const member=manager?members.find(x=>String(x.id)===String(manager.memberId)):null;
  const photo=member?.photo||member?.photoData||member?.image||manager?.photo||manager?.photoData||manager?.image||"";
  document.getElementById("dhMess").textContent=settings.messName||"Santos Cooking House";
  document.getElementById("dhNco").textContent=manager?.name||member?.name||"Not Set";
  document.getElementById("dhSo").textContent=cook?.name||"Not Set";
  const avatar=document.getElementById("dhManagerPhoto");if(photo){avatar.src=photo;avatar.hidden=false;}
 }catch(error){console.warn("Header details could not be loaded",error);}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();