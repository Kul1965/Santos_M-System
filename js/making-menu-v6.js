/* SANTOS Making Menu v6 — per-member dish allocation, costing and stock deduction */
(function(){
"use strict";
const KEY="crpfMessData", $=id=>document.getElementById(id);
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){return {}}};
const write=d=>{try{localStorage.setItem(KEY,JSON.stringify(d));return true}catch(e){alert("Save nahi hua. Browser storage full hai. Pehle Backup lein.");return false}};
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=v=>"A$"+Number(v||0).toLocaleString("en-AU",{minimumFractionDigits:2,maximumFractionDigits:2});
const today=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")};
const dayName=date=>new Date(date+"T12:00:00").toLocaleDateString("en-AU",{weekday:"long"});
const factor=u=>{u=String(u||"").toLowerCase();if(["g","gram","grams"].includes(u))return ["w",1];if(["kg","kgs"].includes(u))return ["w",1000];if(u==="ml")return ["v",1];if(["l","ltr","litre","liter"].includes(u))return ["v",1000];if(["pcs","pc","piece","pieces"].includes(u))return ["c",1];return null};
const convert=(q,a,b)=>{const x=factor(a),y=factor(b);return !x||!y||x[0]!==y[0]?null:Number(q)*x[1]/y[1]};
const baseUnit=item=>{const u=String(item?.unit||"").toLowerCase();return ["kg","kgs","g","gram","grams"].includes(u)?"g":["ltr","l","litre","liter","ml"].includes(u)?"ml":"pcs"};
const activeMembers=()=>((read().members)||[]).filter(m=>String(m.status||"Active").toLowerCase()==="active");
const recipes=()=>Array.isArray(read().recipes)?read().recipes:[];
const ration=()=>Array.isArray(read().ration)?read().ration:[];
const staff=()=>Array.isArray(read().staff)?read().staff:[];
let chosenRecipes=[],chosenMembers=[],pendingMembers=[],allocation={},memberSearch="";
function notify(msg){const n=$("mmNotice");n.textContent=msg;n.hidden=false;setTimeout(()=>{n.hidden=true},4500)}
function currentState(){return read()}
function recipeCost(r){
 let total=0,missing=[];
 if(!Array.isArray(r.ingredients)||!r.ingredients.length)missing.push("Recipe ingredients not entered");
 (r.ingredients||[]).forEach(i=>{
  const item=ration().find(x=>String(x.id)===String(i.itemId));
  if(!item){missing.push(i.itemName||"Unknown ration");return}
  const q=convert(Number(i.quantity||0),i.unit||baseUnit(item),item.unit);
  if(q===null){missing.push(item.name+" unit mismatch");return}
  total+=q*Number(item.price||0);
 });
 return {cost:total,missing};
}
function renderRecipes(){
 const list=recipes();
 $("recipePicker").innerHTML=list.length?list.map(r=>{
  const id=String(r.id),on=chosenRecipes.includes(id),c=recipeCost(r);
  return '<label class="mm-pick '+(on?"is-on":"")+'"><input type="checkbox" class="recipe-check" value="'+esc(id)+'" '+(on?"checked":"")+(added?" disabled":"")+'><span class="mm-pick-name">'+esc(r.name||"Recipe")+'</span><span class="mm-tag">'+esc(r.foodType||"Both")+'</span><b>'+money(c.cost)+'</b></label>';
 }).join(""):'<p class="mm-help">Pehle Recipes page par recipe aur uske ration ingredients banayein.</p>';
}
function renderMemberPicker(){
 const list=activeMembers().filter(m=>(String(m.name||"")+" "+String(m.forceNo||m.forceNumber||"")).toLowerCase().includes(memberSearch));
 $("memberPicker").innerHTML=list.length?list.map(m=>{
  const id=String(m.id),added=chosenMembers.includes(id),on=pendingMembers.includes(id)||added;
  return '<label class="mm-pick '+(on?"is-on":"")+'"><input type="checkbox" class="member-check" value="'+esc(id)+'" '+(on?"checked":"")+'> <span class="mm-pick-name">'+esc(m.name||"Member")+'</span><small>'+esc(m.rank||"")+' '+esc(m.forceNo||m.forceNumber||"")+'</small></label>';
 }).join(""):'<p class="mm-help">Is search mein active member nahi mila.</p>';
 $("memberCount").textContent=chosenMembers.length+" selected";
}
function ensureAllocations(){
 chosenMembers.forEach(id=>{
  if(!allocation[id])allocation[id]={};
  chosenRecipes.forEach(rid=>{if(!allocation[id][rid])allocation[id][rid]={on:true,servings:1}});
  Object.keys(allocation[id]).forEach(rid=>{if(!chosenRecipes.includes(rid))delete allocation[id][rid]});
 });
}
function renderMemberDishes(){
 ensureAllocations();
 const rs=recipes(),ms=activeMembers();
 $("memberDishCards").innerHTML=chosenMembers.map(id=>{
  const m=ms.find(x=>String(x.id)===id);if(!m)return "";
  const rows=chosenRecipes.map(rid=>{
   const r=rs.find(x=>String(x.id)===rid);if(!r)return "";
   const a=allocation[id][rid],c=recipeCost(r).cost;
   return '<div class="mm-dish-row"><label class="mm-dish-check"><input type="checkbox" class="dish-check" data-member="'+esc(id)+'" data-recipe="'+esc(rid)+'" '+(a.on?"checked":"")+'> <span>'+esc(r.name||"Recipe")+'</span></label><label class="mm-servings">Servings<input type="number" class="serving-input" min="0.25" step="0.25" value="'+esc(a.servings)+'" data-member="'+esc(id)+'" data-recipe="'+esc(rid)+'" '+(!a.on?"disabled":"")+'></label><b class="mm-dish-cost">'+money(a.on?c*Number(a.servings||0):0)+'</b></div>';
  }).join("");
  const total=chosenRecipes.reduce((sum,rid)=>{const a=allocation[id][rid],r=rs.find(x=>String(x.id)===rid);return sum+(a?.on&&r?recipeCost(r).cost*Number(a.servings||0):0)},0);
  return '<article class="mm-member-card"><div class="mm-member-head"><div><b>'+esc(m.name||"Member")+'</b><small>'+esc(m.rank||"")+' · '+esc(m.forceNo||m.forceNumber||"")+'</small></div><div class="mm-member-actions"><b class="mm-member-total">'+money(total)+'</b><button type="button" class="remove-member" data-member="'+esc(id)+'">Remove</button></div></div>'+rows+'</article>';
 }).join("")||'<p class="mm-help">Upar se members select karke Add karein. Har member ko kaunsi dish deni hai, yahan alag tick karein.</p>';
}
function calculate(){
 ensureAllocations();
 const rs=recipes(),ms=activeMembers(),usage=new Map(),memberTotals=[];
 let total=0,portions=0,errors=[];
 chosenMembers.forEach(id=>{
  const m=ms.find(x=>String(x.id)===id);let charge=0,dishes=[];
  chosenRecipes.forEach(rid=>{
   const a=allocation[id]?.[rid],r=rs.find(x=>String(x.id)===rid);
   if(!a?.on||!r)return;
   const servings=Number(a.servings||0);
   if(!Number.isFinite(servings)||servings<=0){errors.push((m?.name||"Member")+": "+r.name+" serving quantity check karein");return}
   const c=recipeCost(r);charge+=c.cost*servings;portions+=servings;
   c.missing.forEach(x=>errors.push(r.name+": "+x));
   (r.ingredients||[]).forEach(i=>{
    const item=ration().find(x=>String(x.id)===String(i.itemId));if(!item)return;
    const q=convert(Number(i.quantity||0)*servings,i.unit||baseUnit(item),item.unit);
    if(q===null){errors.push(item.name+": unit conversion nahi hua");return}
    const key=String(item.id),old=usage.get(key)||{itemId:item.id,name:item.name,quantity:0,unit:item.unit,cost:0};
    old.quantity+=q;old.cost+=q*Number(item.price||0);usage.set(key,old);
   });
   dishes.push({recipeId:rid,name:r.name,servings,cost:c.cost*servings});
  });
  total+=charge;memberTotals.push({id,name:m?.name||"Member",charge,dishes});
 });
 const usageRows=[...usage.values()];
 usageRows.forEach(u=>{const item=ration().find(x=>String(x.id)===String(u.itemId));if(item&&Number(item.quantity||0)+1e-9<u.quantity)errors.push(u.name+": stock kam hai. Required "+u.quantity.toFixed(3)+" "+u.unit+", available "+Number(item.quantity||0)+" "+u.unit)});
 $("summaryMembers").textContent=chosenMembers.length;
 $("summaryDishes").textContent=portions.toLocaleString("en-AU",{maximumFractionDigits:2});
 $("summaryCost").textContent=money(total);
 $("summaryRation").textContent=usageRows.length+" items";
 $("rationPreview").innerHTML=usageRows.length?usageRows.map(u=>'<div class="mm-ration-row"><span>'+esc(u.name)+'</span><b>'+u.quantity.toLocaleString("en-AU",{maximumFractionDigits:3})+' '+esc(u.unit)+'</b><small>'+money(u.cost)+'</small></div>').join(""):'<p class="mm-help">Member aur dishes select karne par ration yahan calculate hoga.</p>';
 $("costPreview").innerHTML=memberTotals.map(m=>'<div class="mm-cost-row"><span>'+esc(m.name)+'</span><b>'+money(m.charge)+'</b></div>').join("")||'<p class="mm-help">Member-wise meal cost yahan dikhega.</p>';
 $("validation").innerHTML=errors.length?'<div class="mm-error">'+[...new Set(errors)].map(esc).join("<br>")+'</div>':'<div class="mm-ok">✓ Recipe ingredients, ration quantity aur available stock check ho gaya.</div>';
 $("saveMeal").disabled=!chosenMembers.length||!chosenRecipes.length||errors.length>0||!memberTotals.some(x=>x.dishes.length);
 return {usage:usageRows,total,memberTotals,errors};
}
function update(){
 renderRecipes();renderMemberPicker();renderMemberDishes();calculate();
}
function addMembers(){
 pendingMembers.forEach(id=>{if(!chosenMembers.includes(id)){chosenMembers.push(id);allocation[id]={};}});
 pendingMembers=[];update();
}
function saveMeal(){
 const date=$("mealDate").value,meal=$("mealType").value,d=currentState();
 if(!date){notify("Date select karein.");return}
 if(!chosenRecipes.length||!chosenMembers.length){notify("Kam se kam ek recipe aur ek member select karein.");return}
 if((d.mealRecords||[]).some(x=>String(x.date)===date&&String(x.mealType)===meal)){notify("Is date aur meal ka record pehle se saved hai. Duplicate stock deduction roka gaya.");return}
 const calc=calculate();if(calc.errors.length||$("saveMeal").disabled){notify("Pehle ration / servings ki galti theek karein.");return}
 const rs=recipes(),snapshots=[];
 calc.memberTotals.forEach(m=>{
  const dishSnapshots=m.dishes.map(x=>{
   const r=rs.find(y=>String(y.id)===String(x.recipeId));
   return {...x,foodType:r?.foodType||"Both",ingredients:(r?.ingredients||[]).map(i=>({itemId:i.itemId,itemName:i.itemName||ration().find(y=>String(y.id)===String(i.itemId))?.name||"",quantity:Number(i.quantity||0)*x.servings,unit:i.unit||"pcs"}))};
  });
  snapshots.push({id:m.id,name:m.name,dishes:dishSnapshots,charge:m.charge});
 });
 const usage=calc.usage.map(u=>({...u,quantity:Number(u.quantity),recipeQuantity:Number(u.quantity),recipeUnit:u.unit}));
 const recipeNames=[...new Set(snapshots.flatMap(m=>m.dishes.map(x=>x.name)))];
 const record={id:"MEAL"+Date.now(),date,day:dayName(date),mealType:meal,recipeIds:chosenRecipes.slice(),recipeNames,memberIds:snapshots.map(m=>m.id),memberSnapshots:snapshots,totalCost:calc.total,chargePerMember:snapshots.length?calc.total/snapshots.length:0,ingredientUsage:usage,cookWhatsAppSent:false,createdAt:new Date().toISOString(),allocationVersion:2};
 if(!confirm("SANTOS "+date+" · "+meal+"\nMembers: "+snapshots.length+"\nDishes / portions: "+$("summaryDishes").textContent+"\nTotal cost: "+money(calc.total)+"\n\nConfirm karne par ration stock deduct hoga. Save karein?"))return;
 usage.forEach(u=>{const item=d.ration.find(x=>String(x.id)===String(u.itemId));item.quantity=Number(item.quantity||0)-u.quantity});
 d.mealRecords=Array.isArray(d.mealRecords)?d.mealRecords:[];d.mealRecords.push(record);
 d.stockMovements=Array.isArray(d.stockMovements)?d.stockMovements:[];
 usage.forEach(u=>d.stockMovements.push({id:"OUT"+Date.now()+Math.random().toString(16).slice(2),date,type:"meal-consumption",itemId:u.itemId,itemName:u.name,quantity:u.quantity,unit:u.unit,reference:meal+" — "+recipeNames.join(" + "),memberCount:snapshots.length}));
 if(!write(d))return;
 notify("Meal saved. Member-wise cost aur ration deduction record ho gaya.");
 chosenRecipes=[];chosenMembers=[];pendingMembers=[];allocation={};update();renderRecords();renderRecordOptions();
}
function renderRecords(){
 const rows=(read().mealRecords||[]).slice().sort((a,b)=>String(b.date||"").localeCompare(String(a.date||"")));
 $("savedRecords").innerHTML=rows.map(r=>{
  const members=r.memberSnapshots||[];
  const details=members.map(m=>'<div class="mm-record-member"><b>'+esc(m.name)+'</b><strong>'+money(m.charge)+'</strong><small>'+((m.dishes||[]).map(x=>typeof x==="string"?esc(x):esc(x.name)+" × "+esc(x.servings)).join(" · ")||"Old record")+'</small></div>').join("");
  const rationRows=(r.ingredientUsage||[]).map(x=>'<div class="mm-ration-row"><span>'+esc(x.name||x.itemName)+'</span><b>'+Number(x.quantity||0).toLocaleString("en-AU",{maximumFractionDigits:3})+' '+esc(x.unit)+'</b></div>').join("");
  return '<article class="mm-record"><div class="mm-record-head"><div><b>'+esc(r.mealType||"Meal")+'</b><small>'+esc(r.date||"")+' · '+esc(r.day||"")+'</small></div><strong>'+money(r.totalCost)+'</strong></div><p class="mm-help">Dishes: '+esc((r.recipeNames||[]).join(" + "))+'</p><h4>Member-wise account</h4>'+details+'<details><summary>Ration deducted</summary>'+rationRows+'</details></article>';
 }).join("")||'<p class="mm-help">Abhi koi meal record save nahi hua.</p>';
}
function renderCook(){
 const list=staff().filter(x=>String(x.status||"Active").toLowerCase()==="active"&&["cook","head cook","mess so"].includes(String(x.duty||"").trim().toLowerCase()));
 $("cookSelect").innerHTML='<option value="">Select Head Cook / Cook</option>'+list.map(x=>'<option value="'+esc(x.id)+'">'+esc(x.name||"Cook")+'</option>').join("");
}
function sendWhatsApp(){
 const id=$("recordForWA").value,d=read(),r=(d.mealRecords||[]).find(x=>String(x.id)===String(id));
 if(!r){notify("Pehle saved meal select karein.");return}
 const s=staff().find(x=>String(x.id)===$("cookSelect").value),phone=String(s?.phone||s?.mobile||s?.contact||"").replace(/\D/g,"");
 if(!phone){notify("Mess Staff mein Cook ka country-code mobile number add karein.");return}
 const lines=(r.ingredientUsage||[]).map(x=>x.name+": "+Number(x.quantity||0)+" "+x.unit);
 const members=(r.memberSnapshots||[]).map(m=>m.name+": "+(m.dishes||[]).map(x=>typeof x==="string"?x:x.name+" × "+x.servings).join(", "));
 const msg=["SANTOS COOKING HOUSE — RATION LIST",r.date+" · "+r.mealType,"DISHES: "+(r.recipeNames||[]).join(", "),"MEMBER-WISE DISHES:",...members,"TOTAL RATION:",...lines,"TOTAL COST: "+money(r.totalCost)];
 const url="https://wa.me/"+phone+"?text="+encodeURIComponent(msg.join("\n"));window.open(url,"_blank");
}
$("mealDate").value=today();$("mealDay").textContent=dayName(today());
$("mealDate").addEventListener("change",()=>{$("mealDay").textContent=dayName($("mealDate").value)});
$("recipePicker").addEventListener("change",e=>{if(!e.target.matches(".recipe-check"))return;const id=String(e.target.value);if(e.target.checked){if(!chosenRecipes.includes(id))chosenRecipes.push(id)}else chosenRecipes=chosenRecipes.filter(x=>x!==id);update()});
$("memberPicker").addEventListener("change",e=>{if(!e.target.matches(".member-check"))return;const id=String(e.target.value);if(e.target.checked){if(!pendingMembers.includes(id))pendingMembers.push(id)}else pendingMembers=pendingMembers.filter(x=>x!==id);$("memberCount").textContent=(chosenMembers.length+pendingMembers.length)+" selected (including pending)"});
$("memberSearch").addEventListener("input",e=>{memberSearch=e.target.value.toLowerCase();renderMemberPicker()});
$("addMembers").addEventListener("click",addMembers);
$("memberDishCards").addEventListener("click",e=>{const b=e.target.closest(".remove-member");if(!b)return;const id=String(b.dataset.member);chosenMembers=chosenMembers.filter(x=>x!==id);delete allocation[id];update()});
$("memberDishCards").addEventListener("change",e=>{
 const id=e.target.dataset.member,rid=e.target.dataset.recipe;if(!id||!rid)return;
 if(e.target.matches(".dish-check")){allocation[id][rid].on=e.target.checked;renderMemberDishes();calculate()}
 if(e.target.matches(".serving-input")){allocation[id][rid].servings=Number(e.target.value||0);renderMemberDishes();calculate()}
});
$("saveMeal").addEventListener("click",saveMeal);
$("sendWA").addEventListener("click",sendWhatsApp);
$("savedRecords").addEventListener("click",e=>{if(e.target.closest("summary"))return});
function renderRecordOptions(){const list=(read().mealRecords||[]).slice().reverse();$("recordForWA").innerHTML='<option value="">Select saved meal</option>'+list.map(r=>'<option value="'+esc(r.id)+'">'+esc(r.date)+" · "+esc(r.mealType)+'</option>').join("")}
renderCook();update();renderRecords();renderRecordOptions();
})();