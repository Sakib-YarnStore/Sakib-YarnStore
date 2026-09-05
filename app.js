const ERP_PASSWORD="Sakib";
const ERP_AUTH="YARN_ERP_AUTH";
const K="YARN_ERP_V4";

function requirePassword(){
  if(sessionStorage.getItem(ERP_AUTH)==="1") return true;
  document.body.innerHTML='<div class="loginScreen"><div class="loginBox"><div class="loginLogo">SAG FASHON LTD</div><h2>Password Protected</h2><p>Enter password to open SAG FASHON LTD</p><form id="loginForm"><input id="erpPassword" type="password" autocomplete="off" placeholder="Password" autofocus><button type="submit">Open ERP</button><div id="loginError"></div></form></div></div>';
  document.getElementById("loginForm").onsubmit=e=>{e.preventDefault();if(document.getElementById("erpPassword").value===ERP_PASSWORD){sessionStorage.setItem(ERP_AUTH,"1");location.reload()}else{document.getElementById("loginError").textContent="Incorrect Password";document.getElementById("erpPassword").select()}};
  return false;
}
if(!requirePassword()) throw new Error("ERP locked");

let D=JSON.parse(localStorage.getItem(K)||'{"raw":[],"dyed":[],"grey":[],"reqDyeing":[],"reqKnitting":[],"additional":[]}');
/* ADDITIONAL_INIT_MOVED */
let edit={};

const F={
 raw:[
  ["date","Date","date"],["category","Category","select",["Grey Yarn","Polyester Yarn","Lycra Yarn"]],
  ["transaction","Transaction","select",["Grey Yarn Received From Spinning","Grey Yarn Return From Dyeing","Grey Yarn Return From Knitting","Grey Yarn Return From Re-Conning","Grey Yarn Delivery To Spinning","Grey Yarn Delivery To Dyeing","Grey Yarn Delivery To Knitting","Grey Yarn Delivery To Re-Conning"]],
  ["invoice","Invoice","text"],["proformaInvoice","Proforma Invoice","text"],["sourceBuyer","Source Buyer","text"],["sourceOrder","Source Order","text"],["buyer","Buyer","text"],["order","Order","text"],["customer","Customer","text"],["yarnBrand","Yarn Brand","text"],["lot","Lot","text"],["count","Count","text"],["fiver","Fiver","text"],["blandRatio","Bland Ratios","text"],["quality","Quality","text"],["color","Colour","text"],["quantity","Quantity","number"],["remarks","Remarks","text"]
 ],
 dyed:[
  ["date","Date","date"],["category","Category","select",["Dyed Yarn"]],
  ["transaction","Transaction","select",["Dyed Yarn Received From Dyeing","Dyed Yarn Return From Knitting","Dyed Yarn Return From Re-Conning","Dyed Yarn Delivery To Dyeing","Dyed Yarn Delivery To Kintting","Dyed Yarn Delivery To Re-Conning"]],
  ["invoice","Invoice","text"],["workOrder","Work Order","text"],["sourceBuyer","Source Buyer","text"],["sourceOrder","Source Order","text"],["buyer","Buyer","text"],["order","Order","text"],["customer","Customer","text"],["dyeingFactory","Dyeing Factory","text"],["batch","Batch","text"],["count","Count","text"],["fiver","Fiver","text"],["blandRatio","Bland Ratios","text"],["quality","Quality","text"],["color","Colour","text"],["quantity","Quantity","number"],["remarks","Remarks","text"]
 ],
 grey:[
  ["date","Date","date"],["category","Category","select",["Grey Fabrics"]],
  ["transaction","Transaction","select",["Grey Fabrics Received From Knitting","Grey Fabrics Return From Dyeing","Grey Fabrics Delivery To Knitting","Grey Fabrics Delivery To Dyeing"]],
  ["invoice","Invoice","text"],["yknc","YKNC","text"],["sourceBuyer","Source Buyer","text"],["sourceOrder","Source Order","text"],["buyer","Buyer","text"],["order","Order","text"],["customer","Customer","text"],["knittingFactory","Knitting Factory","text"],["fabrication","Fabrication","text"],["gsm","GSM","text"],["mcD","MC / D","text"],["fd","F / D","text"],["color","Colour","text"],["quantity","Quantity","number"],["remarks","Remarks","text"]
 ],
 reqDyeing:[["date","Date","date"],["buyer","Buyer","text"],["order","Order","text"],["quantity","Quantity","number"],["remarks","Remarks","text"]],
 reqKnitting:[["date","Date","date"],["buyer","Buyer","text"],["order","Order","text"],["quantity","Quantity","number"],["remarks","Remarks","text"]],
 additional:[
  ["category","Category","text"],["proformaInvoice","Proforma Invoice","text"],["sourceBuyer","Source Buyer","text"],["sourceOrder","Source Order","text"],["buyer","Buyer","text"],["order","Order","text"],["customer","Customer","text"],["yarnBrand","Yarn Brand","text"],["lot","Lot","text"],["count","Count","text"],["fiver","Fiver","text"],["blandRatio","Bland Ratios","text"],["quality","Quality","text"],["color","Colour","text"],["workOrder","Work Order","text"],["dyeingFactory","Dyeing Factory","text"],["batch","Batch","text"],["yknc","YKNC","text"],["knittingFactory","Knitting Factory","text"],["fabrication","Fabrication","text"],["gsm","GSM","text"],["mcD","MC / D","text"],["fd","F / D","text"]
 ]
};

const titles={dashboard:"Dashboard",raw:"Grey Yarn Entry",dyed:"Dyed Yarn Entry",grey:"Grey Fabric Entry",reqDyeing:"Requirement Entry (Dyeing)",reqKnitting:"Requirement Entry (Knitting)",additional:"Additional Info",stock:"Stock",statements:"Statements",backup:"Backup & Restore"};
const nav=[
 ["dashboard","Dashboard"],["raw","Grey Yarn Entry"],["dyed","Dyed Yarn Entry"],["grey","Grey Fabric Entry"],
 ["reqDyeing","Requirement Entry (Dyeing)"],["reqKnitting","Requirement Entry (Knitting)"],["additional","Additional Info"],["stock","Stock"],["statements","Statements"], ["backup","Backup & Restore"]
];

function titleCaseText(v){return String(v??"").toLowerCase().replace(/(^|[\s\-\/()]+)([a-z])/g,(m,p,c)=>p+c.toUpperCase())}
D.raw??=[];D.dyed??=[];D.grey??=[];D.reqDyeing??=[];D.reqKnitting??=[];
const ADDITIONAL_FIELDS=["category","proformaInvoice","sourceBuyer","sourceOrder","buyer","order","customer","yarnBrand","lot","count","fiver","blandRatio","quality","color","workOrder","dyeingFactory","batch","yknc","knittingFactory","fabrication","gsm","mcD","fd"];
if(!D.additional||Array.isArray(D.additional)){
  const oldAdditional=Array.isArray(D.additional)?D.additional:[];
  const migrated={};
  ADDITIONAL_FIELDS.forEach(k=>migrated[k]=[]);
  oldAdditional.forEach(r=>ADDITIONAL_FIELDS.forEach(k=>{if(r&&r[k])migrated[k].push(titleCaseText(r[k]))}));
  ADDITIONAL_FIELDS.forEach(k=>migrated[k]=[...new Set(migrated[k])]);
  D.additional=migrated;
}else{
  ADDITIONAL_FIELDS.forEach(k=>{if(!Array.isArray(D.additional[k]))D.additional[k]=[]});
}
function esc(x){return String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function N(x){return Number(x||0)}
function save(){localStorage.setItem(K,JSON.stringify(D))}

// Preserve the data from earlier versions without creating Work Order in Grey Fabrics.
D.raw.forEach(r=>{if(r.proformaInvoice===undefined){r.proformaInvoice=r.invoice||"";r.invoice=""}});
D.dyed.forEach(r=>{if(r.workOrder===undefined){r.workOrder=r.invoice||"";r.invoice=""}});
D.grey.forEach(r=>{r.workOrder="";r.yknc=r.yknc||""});
save();

function allTextValues(field){
  const vals=[];
  if(D.additional && !Array.isArray(D.additional) && Array.isArray(D.additional[field])) vals.push(...D.additional[field]);
  return [...new Set(vals.map(titleCaseText).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
}
function additionalOptionRows(field){
  return allTextValues(field).map(v=>'<div class="savedOption"><span>'+esc(v)+'</span><button class="del" data-afield="'+field+'" data-avalue="'+encodeURIComponent(v)+'">Delete</button></div>').join("")||'<div class="empty">No Saved Values.</div>';
}
function additionalInfo(){
  const labels={
    category:"Category",proformaInvoice:"Proforma Invoice",sourceBuyer:"Source Buyer",sourceOrder:"Source Order",
    buyer:"Buyer",order:"Order",customer:"Customer",yarnBrand:"Yarn Brand",lot:"Lot",count:"Count",fiver:"Fiver",
    blandRatio:"Bland Ratios",quality:"Quality",color:"Colour",workOrder:"Work Order",dyeingFactory:"Dyeing Factory",
    batch:"Batch",yknc:"YKNC",knittingFactory:"Knitting Factory",fabrication:"Fabrication",gsm:"GSM",mcD:"MC / D",fd:"F / D"
  };
  content.innerHTML='<div class="panel additionalPanel"><h2>Additional Info</h2><p class="infoNote">Save Each Option Separately. Transaction Is Fixed By ERP And Is Not Stored In Additional Info.</p><div class="additionalGrid">'+
    ADDITIONAL_FIELDS.map(k=>'<div class="additionalCard"><label>'+labels[k]+'</label><div class="additionalInputRow"><input type="text" id="add_'+k+'" autocomplete="off" placeholder="Enter '+labels[k]+'"><button class="btn addInfoBtn" data-addfield="'+k+'">Save</button></div><div class="additionalTools"><input class="additionalSearch" data-searchfield="'+k+'" placeholder="Search..." autocomplete="off"><button class="btn exportBtn additionalExport" data-exportfield="'+k+'">Download Excel</button></div><div class="savedOptions" id="saved_'+k+'">'+additionalOptionRows(k)+'</div></div>').join("")+
    '</div></div>';
  ADDITIONAL_FIELDS.forEach(k=>{
    const input=document.getElementById("add_"+k);
    input.addEventListener("input",()=>input.value=titleCaseText(input.value));
    const search=document.querySelector('.additionalSearch[data-searchfield="'+k+'"]');
    search.addEventListener("input",()=>filterAdditionalValues(k,search.value));
  });
  content.querySelectorAll(".addInfoBtn").forEach(b=>b.onclick=()=>{
    const k=b.dataset.addfield,input=document.getElementById("add_"+k),v=normalizeKeyValue(input.value);
    if(!v){alert("Please Enter A Value.");return}
    if(!D.additional[k].includes(v))D.additional[k].push(v);
    D.additional[k]=[...new Set(D.additional[k])].sort((a,b)=>a.localeCompare(b));
    save();additionalInfo();
  });
  content.querySelectorAll(".savedOptions .del").forEach(b=>b.onclick=()=>{
    const k=b.dataset.afield,v=decodeURIComponent(b.dataset.avalue);
    if(confirm('Delete "'+v+'"?')){D.additional[k]=D.additional[k].filter(x=>x!==v);save();additionalInfo();}
  });
  content.querySelectorAll(".additionalExport").forEach(b=>b.onclick=()=>exportAdditionalFieldExcel(b.dataset.exportfield,labels[b.dataset.exportfield]));
}
function filterAdditionalValues(field,query){
  const q=String(query||"").trim().toLowerCase();
  const box=document.getElementById("saved_"+field); if(!box)return;
  const vals=allTextValues(field).filter(v=>!q||String(v).toLowerCase().includes(q));
  box.innerHTML=vals.map(v=>'<div class="savedOption"><span>'+esc(v)+'</span><button class="del" data-afield="'+field+'" data-avalue="'+encodeURIComponent(v)+'">Delete</button></div>').join("")||'<div class="empty">No Matching Values.</div>';
  box.querySelectorAll(".del").forEach(b=>b.onclick=()=>{const k=b.dataset.afield,v=decodeURIComponent(b.dataset.avalue);if(confirm('Delete "'+v+'"?')){D.additional[k]=D.additional[k].filter(x=>x!==v);save();additionalInfo();}});
}
function exportAdditionalFieldExcel(field,label){
  const values=allTextValues(field); const rows=values.map(v=>({[label]:v}));
  if(typeof XLSX!=="undefined"){
    const wb=XLSX.utils.book_new(),ws=XLSX.utils.json_to_sheet(rows.length?rows:[{[label]:""}]);
    XLSX.utils.book_append_sheet(wb,ws,"Data"); XLSX.writeFile(wb,"SAG_FASHON_LTD_"+titleCaseText(label).replace(/[^A-Za-z0-9]+/g,"_")+".xlsx");
  }else exportTableExcel("saved_"+field,label);
}

function fieldHTML(f){
  const [name,label,type,opts]=f;
  if(type==="select"){
    const extra=allTextValues(name);
    const choices=[...new Set([...(opts||[]),...extra])];
    return '<select name="'+name+'"><option></option>'+choices.map(x=>'<option>'+titleCaseText(x)+'</option>').join("")+'</select>';
  }
  const dl=type==="text" ? ' list="list_'+name+'"' : '';
  return '<input name="'+name+'" type="'+type+'" step="0.01" autocomplete="off"'+dl+'>'+(type==="text"?'<datalist id="list_'+name+'">'+allTextValues(name).map(v=>'<option value="'+esc(v)+'"></option>').join("")+'</datalist>':"");
}
function isControlledField(name){
  return ADDITIONAL_FIELDS.includes(name);
}
function normalizeKeyValue(v){return titleCaseText(String(v??'').trim()).replace(/\s+/g,' ')}
function validateAgainstAdditionalInfo(t,o){
  if(t==='additional')return true;
  const errors=[];
  (F[t]||[]).forEach(f=>{
    const name=f[0],value=normalizeKeyValue(o[name]);
    if(!ADDITIONAL_FIELDS.includes(name)||!value)return;
    const allowed=allTextValues(name).map(normalizeKeyValue);
    if(!allowed.includes(value))errors.push(f[1]+': "'+value+'"');
  });
  if(errors.length){
    alert('Entry Not Saved!\\n\\nThe Following Value(s) Are Not Available In Additional Info:\\n\\n'+errors.join('\\n')+'\\n\\nPlease Save These Values In Additional Info First.');
    return false;
  }
  return true;
}

function cloneERPData(){
  try{return JSON.parse(JSON.stringify(D));}
  catch(e){return {raw:[],dyed:[],grey:[],reqDyeing:[],reqKnitting:[],additional:{}};}
}
function normalizeAdditionalData(value){
  const out={};
  ADDITIONAL_FIELDS.forEach(k=>out[k]=[]);
  if(value && !Array.isArray(value) && typeof value==='object'){
    ADDITIONAL_FIELDS.forEach(k=>{
      const v=value[k];
      if(Array.isArray(v)) out[k]=v.map(x=>String(x??'')).filter(x=>x!=='');
      else if(v!==undefined && v!==null && String(v)!=='') out[k]=[String(v)];
    });
  }else if(Array.isArray(value)){
    value.forEach(row=>{
      if(!row || typeof row!=='object') return;
      ADDITIONAL_FIELDS.forEach(k=>{
        if(row[k]!==undefined && row[k]!==null && String(row[k])!=='') out[k].push(String(row[k]));
      });
    });
  }
  ADDITIONAL_FIELDS.forEach(k=>out[k]=[...new Set(out[k])]);
  return out;
}
function normalizeRestoredERP(value){
  if(!value || typeof value!=='object' || Array.isArray(value)) throw new Error('Invalid ERP backup data.');
  const out=JSON.parse(JSON.stringify(value));
  ['raw','dyed','grey','reqDyeing','reqKnitting'].forEach(k=>{if(!Array.isArray(out[k])) out[k]=[];});
  out.additional=normalizeAdditionalData(out.additional);
  return out;
}
function backupData(){
  try{
    save();
    const snapshot=cloneERPData();
    const payload={backupType:'SAG FASHON LTD ERP FULL DATA BACKUP',backupMode:'FULL',backupVersion:'V16',createdAt:new Date().toISOString(),data:snapshot};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json;charset=utf-8'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='SAG_FASHON_LTD_ERP_FULL_BACKUP_'+sagBackupStamp()+'.json';
    document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }catch(err){alert('Backup Failed!\n\n'+err.message);}
}
function restoreData(input){
  const file=input&&input.files?input.files[0]:null;if(!file)return;
  const reader=new FileReader();
  reader.onload=function(){
    try{
      const payload=JSON.parse(reader.result);
      const restored=normalizeRestoredERP(payload&&payload.data?payload.data:payload);
      if(!confirm('Restore Full ERP Data?\n\nAll current ERP data will be replaced by the selected backup.')){input.value='';return;}
      D=restored;save();alert('Full ERP Restore Completed Successfully.');go('dashboard');
    }catch(err){alert('Restore Failed!\n\nThe selected file is not a valid SAG FASHON LTD ERP full backup.');}
    finally{input.value='';}
  };
  reader.readAsText(file);
}

function go(p){document.getElementById("title").textContent=titles[p];if(p==="dashboard")dash();else if(p==="additional")additionalInfo();else if(["raw","dyed","grey","reqDyeing","reqKnitting"].includes(p))entry(p);else if(p==="stock")stockMenu();else if(p==="backup")backupRestoreMenu();else statementMenu()}
nav.forEach(([p,t])=>{let b=document.createElement("button");b.textContent=t;b.onclick=()=>go(p);document.getElementById("nav").appendChild(b)});

function entry(t){
  let fs=F[t];
  content.innerHTML='<div class="entryPage"><div class="panel entryFormPanel"><h2>'+titles[t]+'</h2><form id="f" class="form">'+fs.map(f=>'<div class="field '+(f[0]==="remarks"?"wide":"")+'"><label>'+f[1]+'</label>'+fieldHTML(f)+'</div>').join("")+'<div class="actions"><button class="btn">Save</button></div></form></div><div class="panel entryDataPanel"><div class="exportBar"><input id="entrySearch" class="tableSearch" placeholder="Search..." autocomplete="off"><button class="btn exportBtn" id="entryExport">Download Excel</button></div><div id="tbl"></div></div></div>';
  f.onsubmit=e=>{e.preventDefault();let o=Object.fromEntries(new FormData(f));fs.forEach(z=>{if(z[2]==="text"&&o[z[0]]!==undefined)o[z[0]]=titleCaseText(o[z[0]])});const missing=fs.filter(z=>z[0]!=="remarks"&&!String(o[z[0]]??"").trim()).map(z=>z[1]);if(missing.length){alert("Entry Not Saved!\n\nPlease Fill In The Following Required Field(s):\n\n"+missing.join("\n"));return}if(!validateAgainstAdditionalInfo(t,o))return;o.id=edit[t]||Date.now();D[t]=edit[t]?D[t].map(x=>x.id==o.id?o:x):[...D[t],o];delete edit[t];save();entry(t)};
  document.getElementById("entryExport").onclick=()=>exportTableExcel("entryTable",titles[t]);
  document.getElementById("entrySearch").addEventListener("input",e=>filterTable("entryTable",e.target.value));
  renderTable(t);
}
function renderTable(t){let fs=F[t];tbl.innerHTML='<div class="tableWrap dataScroll"><table id="entryTable"><thead><tr>'+fs.map(f=>'<th>'+titleCaseText(f[1])+'</th>').join("")+'<th>Actions</th></tr></thead><tbody>'+D[t].map(r=>'<tr>'+fs.map(f=>'<td>'+esc(f[0]==="quantity"?formatQty(r[f[0]]):r[f[0]])+'</td>').join("")+'<td><button class="edit" onclick="editRow(\''+t+'\',\''+r.id+'\')">Edit</button><button class="del" onclick="delRow(\''+t+'\',\''+r.id+'\')">Delete</button></td></tr>').join("")+'</tbody></table></div>'}

function editRow(t,id){let r=D[t].find(x=>x.id==id);edit[t]=id;F[t].forEach(f=>{let e=document.querySelector('[name="'+f[0]+'"]');if(e)e.value=r[f[0]]||""})}
function delRow(t,id){if(confirm("Delete this entry?")){D[t]=D[t].filter(x=>x.id!=id);save();entry(t)}}

const STOCK_RECEIVE={
 raw:new Set(["GREY YARN RECEIVED FROM SPINNING","GREY YARN RETURN FROM DYEING","GREY YARN RETURN FROM KNITTING","GREY YARN RETURN FROM RE-CONNING"]),
 dyed:new Set(["DYED YARN RECEIVED FROM DYEING","DYED YARN RETURN FROM KNITTING","DYED YARN RETURN FROM RE-CONNING"]),
 grey:new Set(["GREY FABRICS RECEIVED FROM KNITTING","GREY FABRICS RETURN FROM DYEING"])
};
const STOCK_DELIVERY={
 raw:new Set(["GREY YARN DELIVERY TO SPINNING","GREY YARN DELIVERY TO DYEING","GREY YARN DELIVERY TO KNITTING","GREY YARN DELIVERY TO RE-CONNING"]),
 dyed:new Set(["DYED YARN DELIVERY TO DYEING","DYED YARN DELIVERY TO KINTTING","DYED YARN DELIVERY TO RE-CONNING"]),
 grey:new Set(["GREY FABRICS DELIVERY TO KNITTING","GREY FABRICS DELIVERY TO DYEING"])
};
function stockType(t,tr){let x=String(tr||"").trim().toUpperCase();if(STOCK_RECEIVE[t].has(x))return "received";if(STOCK_DELIVERY[t].has(x))return "delivered";return ""}
function stockFields(t){
  if(t==="raw")return ["category","proformaInvoice","sourceBuyer","sourceOrder","yarnBrand","lot","count","fiver","blandRatio","quality","color"];
  if(t==="dyed")return ["category","workOrder","sourceBuyer","sourceOrder","dyeingFactory","batch","count","fiver","blandRatio","quality","color"];
  return ["category","yknc","sourceBuyer","sourceOrder","knittingFactory","fabrication","gsm","mcD","fd","color"];
}
function groups(t){
  const fs=stockFields(t),m={};
  D[t].forEach(r=>{
    const typ=stockType(t,r.transaction); if(!typ)return;
    const k=fs.map(x=>String(r[x]??'').trim().toLowerCase()).join('|');
    if(!m[k])m[k]={r:{...r},received:0,delivery:0,returnQty:0};
    if(STOCK_RECEIVE[t].has(String(r.transaction||'').trim().toUpperCase())){
      // Returns are shown in the total-return column but also increase stock.
      if(String(r.transaction||'').toUpperCase().includes('RETURN FROM')) m[k].returnQty+=N(r.quantity);
      else m[k].received+=N(r.quantity);
    }else if(STOCK_DELIVERY[t].has(String(r.transaction||'').trim().toUpperCase())) m[k].delivery+=N(r.quantity);
  });
  return Object.values(m).map(x=>({...x,balance:x.received+x.returnQty-x.delivery}));
}
function dash(){
  content.innerHTML='<div class="cards">'+[['Grey Yarn Stock','raw'],['Dyed Yarn Stock','dyed'],['Grey Fabrics Stock','grey']].map(x=>'<div class="card" onclick="go(\'stock\')"><b>'+x[0]+'</b><strong>'+groups(x[1]).reduce((a,z)=>a+z.balance,0).toFixed(2)+' KG</strong></div>').join('')+'</div>';
}
function stockMenu(){
  content.innerHTML='<div class="choices"><button class="choice" onclick="stock(\'raw\')">Grey Yarn Stock</button><button class="choice" onclick="stock(\'dyed\')">Dyed Yarn Stock</button><button class="choice" onclick="stock(\'grey\')">Grey Fabrics Stock</button></div><div class="panel" id="sv">Select Stock.</div>';
}
function stock(t){
  const fs=stockFields(t),rs=groups(t),title={raw:'Grey Yarn Stock',dyed:'Dyed Yarn Stock',grey:'Grey Fabrics Stock'}[t];
  sv.innerHTML='<div class="exportBar"><input id="stockSearch" class="tableSearch" placeholder="Search..." autocomplete="off"><button class="btn exportBtn" id="stockExport">Download Excel</button></div><h2>'+title+'</h2><div class="tableWrap dataScroll"><table id="stockTable"><thead><tr>'+fs.map(x=>'<th>'+titleCaseText(x)+'</th>').join('')+'<th>Total Received</th><th>Total Delivery</th><th>Balance</th></tr></thead><tbody>'+rs.map(x=>'<tr>'+fs.map(k=>'<td>'+esc(x.r[k])+'</td>').join('')+'<td>'+x.received.toFixed(2)+'</td><td>'+x.delivery.toFixed(2)+'</td><td>'+x.balance.toFixed(2)+'</td></tr>').join('')+'</tbody></table></div>';
  document.getElementById('stockExport').onclick=()=>exportTableExcel('stockTable',title);document.getElementById('stockSearch').addEventListener('input',e=>filterTable('stockTable',e.target.value));
}

function statementMenu(){content.innerHTML='<div class="choices"><button class="choice" onclick="statement(\'dyeing\')">Dyeing Statement</button><button class="choice" onclick="statement(\'knitting\')">Knitting Statement</button><button class="choice" onclick="statement(\'reqDyeing\')">Requirement Statement (Dyeing)</button><button class="choice" onclick="statement(\'reqKnitting\')">Requirement Statement (Knitting)</button></div><div class="panel" id="st">Select Statement.</div>'}
function keyFor(x){return [x.buyer||"Not Specified",x.order||"Not Specified"].join("|")}
function statement(t){
  const m={};
  const add=(x,del,recv,cat,factory)=>{const k=keyFor(x);if(!m[k])m[k]={buyer:x.buyer||"Not Specified",order:x.order||"Not Specified",category:cat||"",factory:factory||"",del:0,recv:0};m[k].del+=del;m[k].recv+=recv};
  if(t==="dyeing"){
    D.raw.forEach(x=>{const tr=String(x.transaction||"").toUpperCase();if(tr==="GREY YARN DELIVERY TO DYEING")add(x,N(x.quantity),0,x.category,x.customer)});
    D.raw.forEach(x=>{const tr=String(x.transaction||"").toUpperCase();if(tr==="GREY YARN RETURN FROM DYEING")add(x,-N(x.quantity),0,x.category,x.customer)});
    D.dyed.forEach(x=>{const tr=String(x.transaction||"").toUpperCase();if(tr==="DYED YARN RECEIVED FROM DYEING")add(x,0,N(x.quantity),x.category,x.dyeingFactory)});
    D.dyed.forEach(x=>{const tr=String(x.transaction||"").toUpperCase();if(tr==="DYED YARN DELIVERY TO DYEING")add(x,0,-N(x.quantity),x.category,x.dyeingFactory)});
    const rows=Object.values(m).map(v=>[v.buyer,v.order,v.category,v.factory,v.del,v.recv,v.del-v.recv]);
    renderStatement("Dyeing Statement",["Buyer","Order","Category","Dyeing Factory","Yarn Delivered","Yarn Received","Short / Excess"],rows);return;
  }
  if(t==="knitting"){
    const mm={};
    const addK=(x,amount,kind)=>{const k=keyFor(x);if(!mm[k])mm[k]={buyer:x.buyer||"Not Specified",order:x.order||"Not Specified",del:0,recv:0,factory:x.customer||x.knittingFactory||x.dyeingFactory||"Not Specified"};if(kind==="del")mm[k].del+=amount;else if(kind==="return")mm[k].del-=amount;else if(kind==="recvDelivery")mm[k].recv-=amount;else mm[k].recv+=amount};
    D.raw.forEach(x=>{const tr=String(x.transaction||"").toUpperCase();if(tr==="GREY YARN DELIVERY TO KNITTING"||tr==="GREY YARN DELIVERY TO RE-CONNING")addK(x,N(x.quantity),"del");if(tr==="GREY YARN RETURN FROM KNITTING"||tr==="GREY YARN RETURN FROM RE-CONNING")addK(x,N(x.quantity),"return")});
    D.dyed.forEach(x=>{const tr=String(x.transaction||"").toUpperCase();if(tr==="DYED YARN DELIVERY TO KINTTING"||tr==="DYED YARN DELIVERY TO RE-CONNING")addK(x,N(x.quantity),"del");if(tr==="DYED YARN RETURN FROM KNITTING"||tr==="DYED YARN RETURN FROM RE-CONNING")addK(x,N(x.quantity),"return")});
    D.grey.forEach(x=>{const tr=String(x.transaction||"").toUpperCase();if(tr==="GREY FABRICS RECEIVED FROM KNITTING")addK(x,N(x.quantity),"recv");if(tr==="GREY FABRICS DELIVERY TO KNITTING")addK(x,N(x.quantity),"recvDelivery")});
    // Grey fabric received/delivered is tracked separately.
    const rows=Object.values(mm).map(v=>[v.buyer,v.order,v.factory,v.del,v.recv,v.del-v.recv]);
    renderStatement("Knitting Statement",["Buyer","Order","Knitting Factory","Yarn Delivered","Grey Fabrics Received","Short / Excess"],rows);return;
  }
  const reqKey=(x)=>keyFor(x);
  const reqData=t==="reqDyeing"?D.reqDyeing:D.reqKnitting;
  const delivered={};
  if(t==="reqDyeing"){
    D.raw.forEach(x=>{const tr=String(x.transaction||"").toUpperCase();if(tr==="GREY YARN DELIVERY TO DYEING")delivered[reqKey(x)]=(delivered[reqKey(x)]||0)+N(x.quantity);if(tr==="GREY YARN RETURN FROM DYEING")delivered[reqKey(x)]=(delivered[reqKey(x)]||0)-N(x.quantity)});
  }else{
    D.raw.forEach(x=>{const tr=String(x.transaction||"").toUpperCase();if(["GREY YARN DELIVERY TO KNITTING","GREY YARN DELIVERY TO RE-CONNING"].includes(tr))delivered[reqKey(x)]=(delivered[reqKey(x)]||0)+N(x.quantity);if(["GREY YARN RETURN FROM KNITTING","GREY YARN RETURN FROM RE-CONNING"].includes(tr))delivered[reqKey(x)]=(delivered[reqKey(x)]||0)-N(x.quantity)});
    D.dyed.forEach(x=>{const tr=String(x.transaction||"").toUpperCase();if(["DYED YARN DELIVERY TO KINTTING","DYED YARN DELIVERY TO RE-CONNING"].includes(tr))delivered[reqKey(x)]=(delivered[reqKey(x)]||0)+N(x.quantity);if(["DYED YARN RETURN FROM KNITTING","DYED YARN RETURN FROM RE-CONNING"].includes(tr))delivered[reqKey(x)]=(delivered[reqKey(x)]||0)-N(x.quantity)});
  }
  const req={};reqData.forEach(x=>{const k=reqKey(x);req[k]=(req[k]||0)+N(x.quantity)});
  const keys=[...new Set([...Object.keys(req),...Object.keys(delivered)])];
  const rows=keys.map(k=>{const [buyer,order]=k.split("|");const q=req[k]||0,d=delivered[k]||0;return[buyer,order,q,d,q-d]});
  renderStatement(t==="reqDyeing"?"Requirement Statement (Dyeing)":"Requirement Statement (Knitting)",["Buyer","Order","Requirement","Delivered","Balance"],rows);
}

function renderStatement(title,h,rows){
  st.innerHTML='<div class="exportBar"><input id="statementSearch" class="tableSearch" placeholder="Search..." autocomplete="off"><button class="btn exportBtn" id="statementExport">Download Excel</button></div><h2>'+title+'</h2><div class="tableWrap dataScroll"><table id="statementTable"><thead><tr>'+h.map(x=>'<th>'+titleCaseText(x)+'</th>').join("")+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(x=>'<td>'+esc(typeof x==="number"?x.toFixed(2):x)+'</td>').join("")+'</tr>').join("")+'</tbody></table></div>';
  document.getElementById("statementExport").onclick=()=>exportTableExcel("statementTable",title);document.getElementById("statementSearch").addEventListener('input',e=>filterTable('statementTable',e.target.value));
}

function formatQty(x){const n=Number(x);return Number.isFinite(n)?n.toFixed(2):"0.00"}
function filterTable(tableId,query){
  const table=document.getElementById(tableId);if(!table)return;
  const q=String(query||"").trim().toLowerCase();
  table.querySelectorAll("tbody tr").forEach(tr=>{tr.style.display=!q||tr.textContent.toLowerCase().includes(q)?"":"none"});
}

function exportTableExcel(tableId,fileTitle){
  const table=document.getElementById(tableId);if(!table)return;
  const clone=table.cloneNode(true);
  clone.querySelectorAll("tr").forEach(tr=>{if(tr.cells.length){const last=tr.cells[tr.cells.length-1];if(last.textContent.trim()==="Actions"||last.querySelector(".edit,.del"))tr.deleteCell(tr.cells.length-1)}});
  const htmlDoc='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>table{border-collapse:collapse}th,td{border:1px solid #999;padding:5px}th{font-weight:bold}</style></head><body>'+clone.outerHTML+'</body></html>';
  const blob=new Blob(["\ufeff",htmlDoc],{type:"application/vnd.ms-excel"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=titleCaseText(fileTitle).replace(/[^A-Za-z0-9]+/g,"_")+".xls";a.style.display="none";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(url);a.remove()},1000);
}

document.addEventListener("input",e=>{if(e.target.matches('input[type="text"]'))e.target.value=titleCaseText(e.target.value)});
go("dashboard");


/* ===== BACKUP & RESTORE SECTION ===== */
function sagBackupStamp(){const d=new Date(),p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+'_'+p(d.getHours())+'-'+p(d.getMinutes())+'-'+p(d.getSeconds())}
function sagDownload(blob,name){const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000)}
function sagFullJsonBackup(){try{save();const snapshot=cloneERPData();const payload={backupType:'SAG FASHON LTD ERP FULL DATA BACKUP',backupMode:'FULL',backupVersion:'V16',createdAt:new Date().toISOString(),data:snapshot};sagDownload(new Blob([JSON.stringify(payload,null,2)],{type:'application/json;charset=utf-8'}),'SAG_FASHON_LTD_ERP_FULL_BACKUP_'+sagBackupStamp()+'.json');alert('Full JSON Backup Completed Successfully.\n\nAll ERP data, including Additional Info, has been included.')}catch(e){alert('JSON Backup Failed!\n\n'+e.message)}}
function sagFullJsonRestore(input){const f=input.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const p=JSON.parse(r.result),x=normalizeRestoredERP(p&&p.data?p.data:p);if(!confirm('Restore Full ERP Data?\n\nCurrent ERP data will be replaced by the selected backup.')){input.value='';return}D=x;save();alert('Full JSON Restore Completed Successfully.\n\nAdditional Info and all other ERP data have been restored.');go('dashboard')}catch(e){alert('JSON Restore Failed!\n\nThe selected file is not a valid SAG FASHON LTD ERP full backup.')}finally{input.value=''}};r.readAsText(f)}
function sagFullExcelBackup(){try{save();if(typeof XLSX==='undefined'){alert('Excel library is unavailable. Please reload the ERP with internet access.');return}const snapshot=cloneERPData(),wb=XLSX.utils.book_new();Object.keys(snapshot).forEach(k=>{const v=snapshot[k];let rows=Array.isArray(v)?v:[];if(v&&typeof v==='object'&&!Array.isArray(v))rows=Object.keys(v).map(field=>({Field:field,Value:Array.isArray(v[field])?JSON.stringify(v[field]):String(v[field]??'')}));const ws=rows.length?XLSX.utils.json_to_sheet(rows):XLSX.utils.aoa_to_sheet([['No Data']]);let s=String(k).replace(/[\\/\?\*\[\]\:]/g,'_').slice(0,31)||'Data',n=1,o=s;while(wb.SheetNames.includes(s)){const q='_'+n++;s=o.slice(0,31-q.length)+q}XLSX.utils.book_append_sheet(wb,ws,s)});XLSX.writeFile(wb,'SAG_FASHON_LTD_ERP_FULL_BACKUP_'+sagBackupStamp()+'.xlsx');alert('Full Excel Backup Completed Successfully.\n\nAll ERP data, including Additional Info, has been included.')}catch(e){alert('Excel Backup Failed!\n\n'+e.message)}}
function sagFullExcelRestore(input){const f=input.files[0];if(!f)return;if(typeof XLSX==='undefined'){alert('Excel library is unavailable. Please reload the ERP with internet access.');input.value='';return}const r=new FileReader();r.onload=()=>{try{const wb=XLSX.read(r.result,{type:'array'}),x={};wb.SheetNames.forEach(s=>{const rows=XLSX.utils.sheet_to_json(wb.Sheets[s],{defval:''});if(s==='additional'){const a={};rows.forEach(row=>{if(row.Field)a[row.Field]=String(row.Value??'').trim()?(()=>{try{return JSON.parse(row.Value)}catch(_){return String(row.Value)}})():[]});x.additional=a}else{x[s]=rows}});const restored=normalizeRestoredERP(x);if(!confirm('Restore Full Excel ERP Data?\n\nCurrent ERP data will be replaced by the selected backup.')){input.value='';return}D=restored;save();alert('Full Excel Restore Completed Successfully.\n\nAdditional Info and all other ERP data have been restored.');go('dashboard')}catch(e){alert('Excel Restore Failed!\n\nThe selected file is not a valid SAG FASHON LTD ERP full backup.')}finally{input.value=''}};r.readAsArrayBuffer(f)}
function backupRestoreMenu(){content.innerHTML='<div class="panel"><h2>Backup & Restore</h2><p class="infoNote">Full Backup saves the complete ERP data at the moment you click Backup, including Additional Info.</p><div class="backupGrid"><div class="backupCard"><h3>JSON Backup / Restore</h3><button class="btn backupAction" onclick="sagFullJsonBackup()">Full JSON Backup</button><button class="btn backupAction secondary" onclick="document.getElementById(\'sagJsonRestore\').click()">Full JSON Restore</button><input id="sagJsonRestore" type="file" accept=".json,application/json" style="display:none" onchange="sagFullJsonRestore(this)"></div><div class="backupCard"><h3>Excel Backup / Restore</h3><button class="btn backupAction" onclick="sagFullExcelBackup()">Full Excel Backup</button><button class="btn backupAction secondary" onclick="document.getElementById(\'sagExcelRestore\').click()">Full Excel Restore</button><input id="sagExcelRestore" type="file" accept=".xlsx,.xls" style="display:none" onchange="sagFullExcelRestore(this)"></div></div><div class="backupWarning"><b>Important:</b> Restore replaces the current ERP data. Keep your backup file safely in Google Drive.</div></div>'}

