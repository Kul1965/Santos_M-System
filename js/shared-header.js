/* SANTOS Cooking House — stable shared header and navigation */
(function(){
"use strict";
function init(){
 const bar=document.querySelector(".topbar");
 if(!bar||document.body.dataset.santosHeaderReady==="yes")return;
 document.body.dataset.santosHeaderReady="yes";
 const style=document.createElement("style");
 style.id="santos-header-theme";
 style.textContent=`
 .topbar{min-height:88px!important;height:auto!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:14px!important;padding:10px 18px!important;background:linear-gradient(135deg,#e4f5e9 0%,#ccebd8 52%,#b9dfc9 100%)!important;border-bottom:1px solid #9fcbb0!important;box-shadow:inset 0 1px 0 #fff,0 3px 10px rgba(25,82,52,.10)!important;color:#185b40!important;box-sizing:border-box!important}
 .dh-brand{display:flex;align-items:center;gap:11px;min-width:0;flex:1 1 auto}
 .dh-logo{width:66px;height:68px;object-fit:contain;flex:0 0 auto}
 .dh-divider{height:58px;width:1px;background:#8dbda0;flex:0 0 1px}
 .dh-title h1{font-size:30px!important;line-height:1.05!important;color:#176747!important;margin:0 0 3px!important;text-shadow:0 1px 0 #fff!important}
 .dh-title h2{font-size:18px!important;line-height:1.15!important;color:#245c43!important;margin:0!important}
 .dh-date{font-size:11px;color:#356d52;margin-top:4px}
 .dh-tri{height:4px;max-width:310px;margin-top:6px;border-radius:4px;background:linear-gradient(90deg,#176747,#d8b54b,#176747)}
 .dh-flags{display:flex;align-items:center;gap:5px;margin-left:auto;flex:0 0 auto}.dh-flags span{font-size:30px;line-height:1}
 .dh-info{display:flex;align-items:center;justify-content:flex-end;gap:7px;flex:0 1 auto;min-width:0;overflow-x:auto;scrollbar-width:none}
 .dh-pill{display:flex;align-items:center;gap:6px;padding:7px 9px;border:1px solid #a7cdb4;border-radius:22px;background:linear-gradient(180deg,#f7fff9 0%,#e3f3e8 52%,#d2eadb 100%);color:#185b40;font-size:11px;line-height:1.2;white-space:nowrap;box-shadow:inset 0 1px 0 #fff,0 2px 0 #b9d7c2,0 4px 8px rgba(24,73,47,.09)}
 .dh-pill strong{color:#124d35;font-weight:800}
 .dh-manager-photo{width:28px;height:28px;flex:0 0 28px;object-fit:cover;border-radius:50%;border:2px solid #8ab99a}.dh-manager-photo[hidden]{display:none!important}
 .legacy-date-hidden{display:none!important}
 .top-nav{display:flex!important;align-items:center!important;gap:5px!important;width:100%!important;min-width:0!important;overflow-x:auto!important;overflow-y:hidden!important;white-space:nowrap!important;padding:7px 10px!important;background:linear-gradient(180deg,#dff3e6,#b9e0c8)!important;border-bottom:1px solid #9fcbb0!important;box-sizing:border-box!important;scrollbar-width:thin!important;-webkit-overflow-scrolling:touch!important}
 .top-nav a{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;flex:0 0 auto!important;padding:9px 12px!important;border:1px solid #a7cdb4!important;border-radius:9px!important;background:linear-gradient(180deg,#f8fffa 0%,#dcefe3 100%)!important;color:#185b40!important;text-decoration:none!important;font:700 12px Arial,sans-serif!important;white-space:nowrap!important;box-shadow:inset 0 1px 0 #fff,0 2px 0 #b9d7c2,0 4px 7px rgba(24,73,47,.09)!important;transform:none!important;transition:none!important}
 .top-nav a:hover,.top-nav a.selected{color:#104b34!important;background:linear-gradient(180deg,#c9ead4,#addcbd)!important;border-color:#79b58f!important;box-shadow:inset 0 1px 0 #fff,0 3px 0 #94c5a4,0 5px 9px rgba(24,73,47,.12)!important}
 .top-nav .tab-menu{display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:0 0 40px!important;width:40px!important;height:38px!important;border:1px solid #a7cdb4!important;border-radius:9px!important;background:linear-gradient(180deg,#f4df91,#d6b54d)!important;color:#185b40!important;font-size:21px!important;box-shadow:0 2px 0 #b9d7c2!important}
 .top-nav-icon{font-size:15px!important;line-height:1!important}
 .sidebar .brand{display:flex!important;flex-direction:column!important;align-items:center!important;gap:4px!important;padding:12px 8px!important;background:linear-gradient(180deg,#d9f0e1,#c2e5cf)!important;border-bottom:1px solid #a8d0b5!important}
 .sidebar .brand .side-emblem-row{display:flex;align-items:center;justify-content:center;gap:7px;margin:0 auto 3px}
 .sidebar .brand .side-crpf-logo{display:block;width:48px;height:50px;object-fit:contain}
 .sidebar .brand h2,.sidebar .brand b{font-size:16px!important;line-height:1.1!important;margin:2px 0!important;color:#176747!important}
 .sidebar .brand p,.sidebar .brand small{font-size:10px!important;line-height:1.2!important;margin:0!important;color:#356d52!important}
 .sidebar{background:linear-gradient(180deg,#e4f5e9 0%,#cdebd8 52%,#b9dfc9 100%)!important;border-right:1px solid #9fcbb0!important;box-shadow:4px 0 14px rgba(25,82,52,.12)!important}
 .sidebar .nav{background:transparent!important;padding:10px 8px!important;gap:6px!important}
 .sidebar .nav a{display:flex!important;align-items:center!important;gap:9px!important;margin:4px 0!important;padding:11px 12px!important;border-radius:10px!important;color:#185b40!important;background:linear-gradient(180deg,#f8fffa 0%,#dcefe3 100%)!important;border:1px solid #a7cdb4!important;text-decoration:none!important;font-weight:700!important;box-shadow:inset 0 1px 0 #fff,0 2px 0 #b9d7c2,0 4px 7px rgba(24,73,47,.09)!important}
 .sidebar .nav a:hover,.sidebar .nav a.active{color:#104b34!important;background:linear-gradient(180deg,#c9ead4,#addcbd)!important;border-color:#79b58f!important}
 @media(max-width:850px){.topbar{display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:8px!important;padding:10px 12px!important}.dh-brand{width:100%;gap:8px}.dh-logo{width:48px;height:52px}.dh-divider{height:46px}.dh-title h1{font-size:24px!important}.dh-title h2{font-size:15px!important}.dh-flags{gap:3px}.dh-flags span{font-size:25px}.dh-info{width:100%;justify-content:flex-start;flex-wrap:nowrap;padding-bottom:2px}.dh-pill{font-size:10px;padding:5px 7px;flex:0 0 auto}.dh-manager-photo{width:24px;height:24px;flex-basis:24px}.top-nav{gap:4px!important;padding:6px 7px!important}.top-nav a{padding:8px 10px!important;font-size:11px!important}.sidebar .brand .side-crpf-logo{width:39px;height:41px}}
 @media(prefers-reduced-motion:reduce){.top-nav *{animation:none!important;transition:none!important}}
 `;
 document.head.appendChild(style);
 const logo="./icons/santos-home-kitchen.svg";
 bar.innerHTML='<div class="dh-brand"><img class="dh-logo" src="'+logo+'" alt="SANTOS Home Kitchen monogram"><span class="dh-divider"></span><div class="dh-title"><h1>SANTOS</h1><h2>Cooking 🔪 House 🏠 System</h2><div class="dh-date" id="dhClock"></div><div class="dh-tri"></div></div><span class="dh-flags" aria-label="Nepal and Australia flags"><span role="img" aria-label="Nepal">🇳🇵</span><span role="img" aria-label="Australia">🇦🇺</span></span></div><div class="dh-info"><div class="dh-pill">🏠 House: <strong id="dhMess">Santos Cooking House</strong></div><div class="dh-pill"><img id="dhManagerPhoto" class="dh-manager-photo" alt="Mess Manager photo" hidden><span>👤 Mess Manager: <strong id="dhNco">Not Set</strong></span></div><div class="dh-pill">👨‍🍳 Head Cook: <strong id="dhSo">Not Set</strong></div></div>';
 const oldDate=document.getElementById("date"),oldDateNow=document.getElementById("dateNow");if(oldDate)oldDate.classList.add("legacy-date-hidden");if(oldDateNow)oldDateNow.classList.add("legacy-date-hidden");
 const items=[["index.html","⌂","Home"],["members.html","👥","Members"],["ration-store.html","📦","Ration Store"],["purchases.html","🛒","Purchases"],["recipes.html","🍲","Recipes"],["mess-staff.html","👨‍🍳","Mess Staff"],["accounts.html","💰","Accounts"],["reports.html","📊","Reports"],["mess-handover.html","🔄","Handover"],["settings.html","⚙️","Settings"],["backup.html","💾","Backup"],["software-guide.html","📖","हिन्दी गाइड"]];
 const current=location.pathname.split("/").pop()||"index.html";const nav=document.createElement("nav");nav.className="top-nav";nav.setAttribute("aria-label","Main navigation");
 nav.innerHTML='<button type="button" class="tab-menu" aria-label="Open navigation menu" aria-expanded="false">☰</button>'+items.map(x=>'<a href="'+x[0]+'" '+(current===x[0]?'class="selected" aria-current="page"':'')+'><span class="top-nav-icon">'+x[1]+'</span><span>'+x[2]+'</span></a>').join("");bar.insertAdjacentElement("afterend",nav);
 function clock(){const d=new Date(),el=document.getElementById("dhClock");if(el)el.textContent="🕒 "+d.toLocaleTimeString("en-GB",{hour12:false})+" | "+d.toLocaleDateString("en-GB");}clock();setInterval(clock,1000);
 try{const d=JSON.parse(localStorage.getItem("crpfMessData")||"{}"),settings=d.settings||{},staff=Array.isArray(d.staff)?d.staff:[],members=Array.isArray(d.members)?d.members:[],active=staff.filter(x=>String(x.status||"Active").toLowerCase()==="active"&&x.isOnDuty!==false&&!x.dutyTo),find=(...roles)=>active.find(x=>roles.includes(String(x.duty||"").trim().toLowerCase())),manager=find("mess manager","mess commander","mess nco"),cook=find("head cook","mess so"),member=manager?members.find(x=>String(x.id)===String(manager.memberId)):null,photo=member?.photo||member?.photoData||member?.image||manager?.photo||manager?.photoData||manager?.image||"";document.getElementById("dhMess").textContent=settings.messName||"Santos Cooking House";document.getElementById("dhNco").textContent=manager?.name||member?.name||"Not Set";document.getElementById("dhSo").textContent=cook?.name||"Not Set";const avatar=document.getElementById("dhManagerPhoto");if(photo){avatar.src=photo;avatar.hidden=false;}}catch(e){console.warn("SANTOS header data",e);}
 const sideNav=document.querySelector(".sidebar .nav");if(sideNav){sideNav.querySelectorAll("a").forEach(a=>{if(a.getAttribute("href")===current)a.classList.add("active");});}
 const sideBrand=document.querySelector(".sidebar .brand");if(sideBrand){sideBrand.innerHTML='<div class="side-emblem-row"><img class="side-crpf-logo" src="'+logo+'" alt="SANTOS Home Kitchen monogram"><span class="side-flags">🇳🇵 🇦🇺</span></div><h2>SANTOS</h2><p>Cooking House System</p>';}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
/* Shared PWA updater: checks for published app changes without clearing app data. */
(function () {
  "use strict";
  if (!("serviceWorker" in navigator) || window.__appUpdaterStarted) return;
  window.__appUpdaterStarted = true;

  const STYLE_ID = "app-update-control-style";
  const BUTTON_ID = "app-update-control";
  let registration = null;
  let reloading = false;
  let updateFound = false;

  function addControl() {
    if (document.getElementById(BUTTON_ID)) return;
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent =
        "#" + BUTTON_ID + "{position:fixed;right:12px;bottom:18px;z-index:2147483000;border:1px solid #d6b54d;border-radius:28px;padding:11px 16px;background:linear-gradient(180deg,#176747,#06452f);color:#fff;font:700 13px Arial,sans-serif;box-shadow:0 3px 0 #9c7d2e,0 7px 18px rgba(0,0,0,.25);cursor:pointer}" +
        "#" + BUTTON_ID + ":disabled{opacity:.75;cursor:wait}" +
        "#" + BUTTON_ID + ".available{background:linear-gradient(180deg,#e7c85b,#c99d25);color:#183d2a;border-color:#f4df91}" +
        "@media(max-width:850px){#" + BUTTON_ID + "{bottom:calc(76px + env(safe-area-inset-bottom));right:10px;padding:10px 13px;font-size:12px}}";
      document.head.appendChild(style);
    }
    const button = document.createElement("button");
    button.type = "button";
    button.id = BUTTON_ID;
    button.textContent = "↻ Update App";
    button.setAttribute("aria-label", "Check for app updates and refresh");
    button.addEventListener("click", runManualUpdate);
    document.body.appendChild(button);
  }

  function setButton(text, available, disabled) {
    const button = document.getElementById(BUTTON_ID);
    if (!button) return;
    button.textContent = text;
    button.classList.toggle("available", !!available);
    button.disabled = !!disabled;
  }

  function reloadOnce() {
    if (reloading) return;
    reloading = true;
    setButton("✓ Updated — opening…", false, true);
    window.setTimeout(function () { window.location.reload(); }, 350);
  }

  function watchRegistration(reg) {
    registration = reg;
    if (reg.waiting && navigator.serviceWorker.controller) {
      updateFound = true;
      setButton("⬆ New update — tap", true, false);
    }
    reg.addEventListener("updatefound", function () {
      const worker = reg.installing;
      if (!worker) return;
      worker.addEventListener("statechange", function () {
        if (worker.state === "installed" && navigator.serviceWorker.controller) {
          updateFound = true;
          setButton("⬆ New update — tap", true, false);
          // The app shell activates the new worker automatically; reload after activation.
          if (reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
        }
      });
    });
  }

  navigator.serviceWorker.addEventListener("controllerchange", reloadOnce);

  async function getRegistration() {
    try {
      const existing = await navigator.serviceWorker.getRegistration("./");
      if (existing) {
        watchRegistration(existing);
        return existing;
      }
      const created = await navigator.serviceWorker.register("./service-worker.js", { updateViaCache: "none" });
      watchRegistration(created);
      return created;
    } catch (error) {
      console.warn("App update check unavailable:", error);
      return null;
    }
  }

  async function checkForUpdate() {
    const reg = registration || await getRegistration();
    if (!reg) return false;
    try {
      await reg.update();
      if (reg.waiting && navigator.serviceWorker.controller) {
        updateFound = true;
        setButton("⬆ New update — tap", true, false);
        return true;
      }
    } catch (error) {
      console.warn("App update check failed:", error);
    }
    return false;
  }

  async function runManualUpdate() {
    setButton("Checking update…", false, true);
    const hadUpdate = await checkForUpdate();
    const reg = registration;
    if (reg && reg.waiting && navigator.serviceWorker.controller) {
      setButton("Installing update…", true, true);
      reg.waiting.postMessage({ type: "SKIP_WAITING" });
      window.setTimeout(function () {
        if (!reloading) reloadOnce();
      }, 1800);
      return;
    }
    if (reg && reg.installing) {
      setButton("Installing update…", true, true);
      reg.installing.addEventListener("statechange", function () {
        if (reg.installing && reg.installing.state === "activated") reloadOnce();
      });
      window.setTimeout(function () {
        if (!reloading) reloadOnce();
      }, 3500);
      return;
    }
    setButton(hadUpdate || updateFound ? "↻ Refresh App" : "↻ Update App", false, false);
    // Manual refresh also fetches the latest page and static assets.
    window.location.reload();
  }

  function start() {
    addControl();
    getRegistration().then(function (reg) {
      if (reg) checkForUpdate();
    });
    window.addEventListener("focus", checkForUpdate);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) checkForUpdate();
    });
    window.setInterval(checkForUpdate, 5 * 60 * 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
