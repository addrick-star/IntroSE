
const app=document.getElementById('app');
const toast=document.getElementById('toast');
const helpPanel=document.getElementById('helpPanel');
const helpBtn=document.getElementById('helpBtn');
const langBtn=document.getElementById('langBtn');

const S={lang:'en',province:null,cat:null,note:'',pending:null};

const provinces=['Chiang Rai','Chiang Mai','Phuket','Bangkok'];

const cats=[
  {id:'medical',n:'Medical emergency',u:'High',i:'✚',desc:'Serious injury, illness, or urgent medical help.'},
  {id:'police',n:'Police / active crime',u:'High',i:'!',desc:'Immediate danger, crime in progress, or urgent police help.'},
  {id:'tourist',n:'Tourist Police',u:'High',i:'i',desc:'Tourist-focused assistance and multilingual support.'},
  {id:'fire',n:'Fire / rescue',u:'High',i:'▲',desc:'Fire, smoke, rescue, or immediate fire-service help.'},
  {id:'road',n:'Road accident',u:'High',i:'↗',desc:'Traffic accident, injury, or immediate road-safety risk.'},
  {id:'disaster',n:'Disaster / severe weather',u:'High',i:'!',desc:'Flood, storm, earthquake, or disaster assistance.'},
  {id:'passport',n:'Lost passport',u:'Low',i:'P',desc:'Reporting, replacement-document, and facility guidance.'},
  {id:'theft',n:'Non-violent theft',u:'Low',i:'T',desc:'Record details and follow the correct reporting steps.'},
  {id:'lost',n:'Lost property',u:'Low',i:'?',desc:'Organize details and find the right place to report a lost item.'}
];

const data={
  medical:{h:'1669',s:'Medical Emergency Call Center',a:[
    'Move to a safe place if possible.',
    'Call 1669 for emergency medical assistance.',
    'Keep your location and a short description of the injury ready.'
  ]},
  police:{h:'191',s:'Police Emergency',a:[
    'Move away from immediate danger if it is safe.',
    'Call 191 for urgent police assistance.',
    'Share your location only when you choose to.'
  ]},
  tourist:{h:'1155',s:'Tourist Police',a:[
    'Call 1155 for tourist-focused assistance.',
    'State your province and situation clearly.',
    'Use location sharing only if it helps responders identify where you are.'
  ]},
  fire:{h:'199',s:'Fire and Rescue',a:[
    'Leave the dangerous area if it is safe.',
    'Call 199 for fire and rescue assistance.',
    'Do not re-enter a dangerous building.'
  ]},
  road:{h:'1669',s:'Emergency Medical Assistance',a:[
    'Move out of active traffic if it is safe.',
    'Call 1669 if anyone is injured.',
    'Use police assistance if the scene is unsafe.'
  ]},
  disaster:{h:'1784',s:'Disaster Assistance',a:[
    'Follow local-authority instructions.',
    'Move to a safer location if advised.',
    'Keep identification and essential items ready if evacuation is needed.'
  ]},
  passport:{h:'1155',s:'Tourist Police Assistance',steps:[
    'Write down when and where you last had the passport.',
    'Report the loss to police or Tourist Police.',
    'Prepare another ID or a passport copy/photo if available.',
    'Contact your embassy or consular office for replacement guidance.'
  ],f:'Police / Tourist Police office and your embassy or consular office'},
  theft:{h:'1155',s:'Tourist Police Assistance',steps:[
    'Record what was taken, when, and where.',
    'Preserve receipts, photos, serial numbers, or other useful evidence.',
    'Report the incident to police or Tourist Police.',
    'Contact your bank or service provider if cards or a phone were stolen.'
  ],f:'Nearest police station or Tourist Police office'},
  lost:{h:'1155',s:'Tourist Police Assistance',steps:[
    'Write down the item description and the last place you remember having it.',
    'Check the venue, transport operator, hotel, or lost-property office.',
    'Make an official report if the item includes identification or valuables.',
    'Keep any reference number for follow-up.'
  ],f:'Relevant lost-property office, police station, or Tourist Police office'}
};

function msg(text){
  toast.textContent=text;
  toast.classList.add('show');
  clearTimeout(msg.t);
  msg.t=setTimeout(()=>toast.classList.remove('show'),1900);
}
function render(html){
  app.innerHTML=html;
  app.focus({preventScroll:true});
  window.scrollTo({top:0,behavior:'smooth'});
}
function pageHead(title,subtitle,back='home()'){
  return `<div class="pagehead">
    <button class="back" onclick="${back}" aria-label="Back">←</button>
    <div>
      <div class="breadcrumb">ResQTh</div>
      <h2>${title}</h2>
      <p class="helper">${subtitle}</p>
    </div>
  </div>`;
}
function catCard(c){
  return `<button class="category-card ${c.u==='High'?'high':''}" onclick="choose('${c.id}')">
    <div class="icon" aria-hidden="true">${c.i}</div>
    <h3>${c.n}</h3>
    <p>${c.desc}</p>
  </button>`;
}
function generalHotlines(){
  if(!S.province) return '';
  return `<div class="card" style="margin-top:16px">
    <h3>General emergency hotlines for ${S.province}</h3>
    <p class="helper">Shown when no category is selected.</p>
    <div class="row" style="margin-top:12px">
      <button class="btn secondary" onclick="demoCall('191')">Police 191</button>
      <button class="btn secondary" onclick="demoCall('1669')">Medical 1669</button>
      <button class="btn secondary" onclick="demoCall('199')">Fire 199</button>
      <button class="btn secondary" onclick="demoCall('1155')">Tourist Police 1155</button>
    </div>
  </div>`;
}
function home(){
  render(`<section class="hero">
    <div class="eyebrow">Emergency support in Thailand</div>
    <h1>Find the right help, fast.</h1>
    <p>Set your province, choose what happened, or describe the situation in your own words. ResQTh then guides you to the relevant response.</p>

    <div class="location">
      <div class="locmeta">
        <div class="locicon" aria-hidden="true">⌖</div>
        <div>
          <b>${S.province?'Current province':'Location not set'}</b>
          <div class="helper">${S.province||'Used to localize emergency contacts and facilities'}</div>
        </div>
      </div>
      <div class="row">
        ${S.province
          ? `<button class="btn secondary" onclick="locationScreen()">Change province</button>`
          : `<button class="btn primary" onclick="detect()">Detect location</button>
             <button class="btn secondary" onclick="manual(false)">Choose province</button>`}
      </div>
    </div>
    ${generalHotlines()}
  </section>

  <section class="section" aria-labelledby="categoryHeading">
    <div class="sectionhead">
      <div>
        <h2 id="categoryHeading">What happened?</h2>
        <p>Choose the closest situation. All MVP categories stay visible so you do not have to remember where they are.</p>
      </div>
    </div>
    <div class="category-grid">${cats.map(catCard).join('')}</div>
  </section>

  <section class="ai-card" aria-labelledby="aiHeading">
    <div class="ai-head">
      <div class="ai-icon" aria-hidden="true">AI</div>
      <div>
        <h2 id="aiHeading">Not sure which category fits?</h2>
        <p>Describe the situation naturally. You will review and correct the result before ResQTh uses it.</p>
      </div>
    </div>
    <div class="airow">
      <div>
        <label class="sr-only" for="q">Describe your emergency</label>
        <input id="q" aria-describedby="qHint" placeholder="Example: I lost my passport in Phuket">
        <div id="qHint" class="helper">One natural-language interpretation is simulated in this prototype.</div>
      </div>
      <button class="btn primary" onclick="parseQ()">Understand my situation</button>
    </div>
  </section>`);
}
function locationScreen(){
  render(pageHead('Set your location','ResQTh uses your province to localize emergency information.')+
  `<div class="card">
    <h3>Choose how to set your province</h3>
    <p>Use the simulated location detector or select a province manually.</p>
    <div class="row">
      <button class="btn primary" onclick="detect()">Detect location</button>
      <button class="btn secondary" onclick="manual(true)">Select manually</button>
    </div>
  </div>`);
}
function detect(){
  msg('Detecting location…');
  setTimeout(()=>{
    S.province='Chiang Rai';
    msg('Location detected: Chiang Rai');
    if(S.pending){
      const id=S.pending; S.pending=null; S.cat=cats.find(x=>x.id===id); response();
    } else home();
  },650);
}
function manual(showWarning=true){
  render(pageHead('Choose province','Manual fallback when location permission is denied or unavailable.')+
  `${showWarning?`<div class="alert warn"><b>Location unavailable.</b> Select a province to continue.</div>`:''}
  <div class="card">
    <div class="field">
      <label for="prov">Province</label>
      <select id="prov">${provinces.map(p=>`<option ${p===S.province?'selected':''}>${p}</option>`).join('')}</select>
      <div class="field-hint">This province will be used for subsequent emergency results.</div>
    </div>
    <div class="row" style="margin-top:16px">
      <button class="btn primary" onclick="saveProv()">Continue</button>
      <button class="btn secondary" onclick="home()">Cancel</button>
    </div>
  </div>`);
}
function saveProv(){
  S.province=document.getElementById('prov').value;
  if(S.pending){
    const id=S.pending; S.pending=null; S.cat=cats.find(x=>x.id===id); response();
  } else home();
}
function choose(id){
  if(!S.province){ S.pending=id; manual(false); return; }
  S.cat=cats.find(x=>x.id===id);
  response();
}
function clearCategory(){
  S.cat=null;
  msg('Category cleared. General hotlines are shown.');
  home();
}
function parseQ(){
  const el=document.getElementById('q');
  const q=el.value.trim().toLowerCase();
  if(!q){
    msg('Please describe what happened first.');
    el.focus();
    return;
  }
  msg('Interpreting your description…');
  setTimeout(()=>{
    let id=
      q.includes('passport')?'passport':
      q.includes('fire')||q.includes('smoke')?'fire':
      q.includes('road')||q.includes('traffic')||q.includes('accident')?'road':
      q.includes('medical')||q.includes('hurt')||q.includes('injury')?'medical':
      q.includes('theft')||q.includes('stolen')?'theft':
      q.includes('lost')?'lost':
      q.includes('police')||q.includes('crime')||q.includes('attack')?'police':
      q.includes('disaster')||q.includes('flood')||q.includes('storm')||q.includes('earthquake')?'disaster':
      'tourist';
    const prov=provinces.find(p=>q.includes(p.toLowerCase()))||S.province||'Chiang Rai';
    confirm(prov,id);
  },500);
}
function confirm(prov,id){
  const c=cats.find(x=>x.id===id);
  render(pageHead('Check what we understood','Confirm or correct the result before continuing.')+
  `<div class="alert ok"><b>AI suggestion ready.</b> Nothing is applied until you confirm it.</div>
   <div class="card">
    <div class="field">
      <label for="cp">Province</label>
      <select id="cp">${provinces.map(p=>`<option ${p===prov?'selected':''}>${p}</option>`).join('')}</select>
    </div>
    <div class="field">
      <label for="cc">Category</label>
      <select id="cc" onchange="updateUrgencyPreview()">
        ${cats.map(x=>`<option value="${x.id}" ${x.id===id?'selected':''}>${x.n}</option>`).join('')}
      </select>
    </div>
    <div class="field">
      <label>Urgency</label>
      <div id="urgencyPreview" class="status ${c.u==='High'?'red':'green'}">${c.u==='High'?'● Urgent':'✓ Guidance'}</div>
    </div>
    <div class="row" style="margin-top:16px">
      <button class="btn primary" onclick="applyConfirm()">Use this result</button>
      <button class="btn secondary" onclick="home()">Cancel</button>
    </div>
  </div>`);
}
function updateUrgencyPreview(){
  const c=cats.find(x=>x.id===document.getElementById('cc').value);
  const p=document.getElementById('urgencyPreview');
  p.className=`status ${c.u==='High'?'red':'green'}`;
  p.textContent=c.u==='High'?'● Urgent':'✓ Guidance';
}
function applyConfirm(){
  S.province=document.getElementById('cp').value;
  S.cat=cats.find(x=>x.id===document.getElementById('cc').value);
  msg('Selection confirmed.');
  response();
}
function response(){
  if(!S.cat){home();return}
  S.cat.u==='High'?high():low();
}
function high(){
  const d=data[S.cat.id];
  render(pageHead(S.cat.n,`${S.province} · high-urgency response`)+
  `<section class="response red">
    <div class="status red">● Urgent</div>
    <h2>Immediate response</h2>
    <p>The hotline is the primary action. GPS sharing stays optional and requires your confirmation.</p>
    <div class="row" style="margin-top:18px">
      <button class="btn urgent" onclick="demoCall('${d.h}')">Call ${d.h}</button>
      <button class="btn secondary" onclick="confirmShare()">Share GPS coordinates</button>
    </div>
  </section>

  <div class="context-strip">
    <span class="context-chip">${S.province}</span>
    <span class="context-chip">${S.cat.n}</span>
    <span class="context-chip">High urgency</span>
  </div>

  <div class="info-grid">
    <div class="card">
      <div class="helper">Recommended hotline</div>
      <div class="number">${d.h}</div>
      <h3>${d.s}</h3>
      <p>Localized for ${S.province} and the selected situation.</p>
    </div>
    <div class="card">
      <h3>What to do now</h3>
      <ul class="list">${d.a.map(x=>`<li>${x}</li>`).join('')}</ul>
    </div>
  </div>

  <div class="row" style="margin-top:16px">
    <button class="btn secondary" onclick="changeSituation()">Change situation</button>
    <button class="btn secondary" onclick="clearCategory()">Clear category</button>
    <button class="btn secondary" onclick="fallback()">Show national fallback</button>
    <button class="btn secondary" onclick="offline()">Offline state</button>
  </div>`);
}
function confirmShare(){
  render(pageHead('Share GPS coordinates','Confirm this action before sharing your location.','response()')+
  `<div class="alert warn">
    <b>Share your current GPS coordinates?</b>
    This prototype does not transmit them. A real implementation should share them only after your confirmation.
  </div>
  <div class="row">
    <button class="btn primary" onclick="msg('Prototype: GPS sharing confirmed but not transmitted');response()">Confirm share</button>
    <button class="btn secondary" onclick="response()">Cancel</button>
  </div>`);
}
function low(){
  const d=data[S.cat.id];
  render(pageHead(S.cat.n,`${S.province} · low-urgency guidance`)+
  `<section class="response green">
    <div class="status green">✓ Guidance</div>
    <h2>Post-incident guidance</h2>
    <p>Follow the checklist first. Facility guidance and notes support the process.</p>
  </section>

  <div class="context-strip">
    <span class="context-chip">${S.province}</span>
    <span class="context-chip">${S.cat.n}</span>
    <span class="context-chip">Low urgency</span>
  </div>

  <div class="card" style="margin-top:16px">
    <h3>Recommended steps</h3>
    ${d.steps.map((x,i)=>`<label class="check">
      <input type="checkbox" aria-label="Step ${i+1}: ${x}">
      <span><b>Step ${i+1}</b><br>${x}</span>
    </label>`).join('')}
  </div>

  <div class="info-grid">
    <div class="card">
      <h3>Official facility guidance</h3>
      <p><b>${d.f}</b></p>
      <p>${S.province}</p>
      <button class="btn primary" onclick="msg('Prototype route preview only')">View route</button>
    </div>

    <div class="card">
      <h3>Incident notes</h3>
      <label for="note">Useful details or reference numbers</label>
      <textarea id="note" placeholder="Example: report number, time, location">${S.note}</textarea>
      <div class="helper">Prototype-only temporary note; no database is connected.</div>
      <button class="btn secondary" style="margin-top:10px" onclick="saveNote()">Save note</button>
    </div>
  </div>

  <div class="row" style="margin-top:16px">
    <button class="btn secondary" onclick="changeSituation()">Change situation</button>
    <button class="btn secondary" onclick="clearCategory()">Clear category</button>
    <button class="btn secondary" onclick="fallback()">Show national fallback</button>
    <button class="btn secondary" onclick="offline()">Offline state</button>
  </div>`);
}
function saveNote(){
  S.note=document.getElementById('note').value;
  msg('Saving…');
  setTimeout(()=>msg('Saved ✓'),420);
}
function changeSituation(){
  S.cat=null;
  home();
  setTimeout(()=>{
    const h=document.getElementById('categoryHeading');
    if(h) h.scrollIntoView({behavior:'smooth',block:'start'});
  },80);
}
function fallback(){
  const d=data[S.cat.id]||data.tourist;
  render(pageHead('National fallback','No matching local contact was found.','response()')+
  `<div class="alert err"><b>No local match found.</b> ResQTh is showing a national emergency contact instead.</div>
  <div class="card">
    <div class="helper">National hotline</div>
    <div class="number">${d.h}</div>
    <h3>${d.s}</h3>
    <p>This fallback keeps the user moving instead of ending at an error.</p>
    <button class="btn urgent" onclick="demoCall('${d.h}')">Call ${d.h}</button>
  </div>`);
}
function offline(){
  render(pageHead('Offline mode','Preloaded emergency information remains available when the network fails.','response()')+
  `<div class="alert warn"><b>You are offline.</b> Live local search and AI parsing are unavailable. You can still use the preloaded information below.</div>
  <div class="card">
    <h3>Preloaded national hotlines</h3>
    <ul class="list">
      <li>Police — 191</li>
      <li>Medical — 1669</li>
      <li>Fire — 199</li>
      <li>Tourist Police — 1155</li>
      <li>Disaster assistance — 1784</li>
    </ul>
    <button class="btn secondary" onclick="response()">Return to previous response</button>
  </div>`);
}
function demoCall(n){msg(`Prototype: would call ${n}`)}

document.getElementById('homeBtn').onclick=home;
langBtn.onclick=()=>msg('Thai language is represented as a required option; full translation can be added during implementation.');
helpBtn.onclick=()=>{
  const open=helpPanel.hidden;
  helpPanel.hidden=!open;
  helpBtn.setAttribute('aria-expanded',String(open));
  if(open) document.getElementById('closeHelpBtn').focus();
};
document.getElementById('closeHelpBtn').onclick=()=>{
  helpPanel.hidden=true;
  helpBtn.setAttribute('aria-expanded','false');
  helpBtn.focus();
};

home();
