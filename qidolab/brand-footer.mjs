const protocol='quidolab-brand-footer-preview-v1';
const goldenBridgeKey='qidolab-golden-bridge-v1';
const originalActivityIds=['water','lights','coins','numbers','clock','tiles','sums','bridge','takeaway','path','search','logic','probability','sorting','schedule','coloring','fractions','reflection'];
const goldenLabels={en:'18 explorations completed',es:'18 juegos completados',zh:'18 道探索已完成'};
function hasFinishedOriginals(){
  const completed=new Set();
  try{
    try{const saved=JSON.parse(localStorage.getItem('quidence-completed-v1'));if(Array.isArray(saved))for(const id of saved)if(originalActivityIds.includes(id))completed.add(id);}catch{}
    for(const id of originalActivityIds)if(localStorage.getItem('quidence-completed-'+id+'-v1')==='1')completed.add(id);
  }catch{}
  // Current completion marks also work when browser storage is unavailable.
  const orbit=document.getElementById('activity-orbit');
  if(orbit)for(const link of orbit.querySelectorAll('[data-activity][data-completed="true"]'))if(originalActivityIds.includes(link.dataset.activity))completed.add(link.dataset.activity);
  return originalActivityIds.every(id=>completed.has(id));
}
const copies={
  qidolab:{
    en:{title:'Curious how far your thinking can go?',body:'Try a game in Qidolab. Explore a different approach, then choose whether to go further.',action:'Explore Qidolab'},
    es:{title:'¿Hasta dónde puede llegar tu forma de pensar?',body:'Prueba un juego en Qidolab. Explora otra manera de resolverlo y decide si quieres ir más allá.',action:'Explora Qidolab'},
    zh:{title:'想试试，你的思路还能走多远？',body:'到 Qidolab 挑一个小游戏，换个角度找解法。还不过瘾？再走一步，或者挑战极限。',action:'进入 Qidolab'}
  },
  quidence:{
    en:{title:'Ready to explore a subject more deeply?',body:'Choose a subject in Quidence Education. Use interactive questions and projects to explore what you understand and what you might practice next.',language:'Available in English and Spanish.',action:'Open Quidence Education'},
    es:{title:'¿Quieres ver qué tanto dominas una materia?',body:'Elige una materia en Quidence Education. Pon a prueba lo que entiendes con preguntas y proyectos interactivos, y descubre qué podrías practicar después.',language:'Disponible en inglés y español.',action:'Visita Quidence Education'},
    zh:{title:'想看看自己对一门学科掌握得怎样？',body:'到 Quidence Education 选一门学科，用互动题和项目检验理解，看看哪些地方值得再练一练。',language:'目前支持 English · Español。',action:'进入 Quidence Education'}
  }
};
function language(value){return String(value).startsWith('es')?'es':String(value).startsWith('zh')?'zh':'en';}
export function mountFooter(getLanguage=()=>document.documentElement.lang){
  const section=document.getElementById('brand-bridge');if(!section)return;
  const target=section.dataset.brandTarget,anchor=section.querySelector('.bridge-inner');
  const page=target==='qidolab'?'quidence':'qidolab',destination=anchor.href;
  let theme='mint',simulate=false,unlocked=false,lastReported;
  try{unlocked=localStorage.getItem(goldenBridgeKey)==='1';}catch{}
  // This cosmetic handoff lets the two independent domains remember a visit.
  // It never writes a solved-game record or grants access to game content.
  try{if(new URL(location.href).searchParams.get('qidolab-gold')==='1')unlocked=true;}catch{}
  function paint(){
    section.dataset.bridgeTheme=unlocked||simulate?'gold':theme;
    section.dataset.earnedGold=String(unlocked||simulate);
    const badge=section.querySelector('.bridge-achievement');badge.hidden=!(unlocked||simulate);badge.textContent=goldenLabels[language(getLanguage())];
    const url=new URL(destination);if(unlocked)url.searchParams.set('qidolab-gold','1');anchor.href=url.href;
  }
  function refreshAchievement(){
    try{unlocked=unlocked||localStorage.getItem(goldenBridgeKey)==='1';}catch{}
    unlocked=unlocked||hasFinishedOriginals();
    if(unlocked)try{if(localStorage.getItem(goldenBridgeKey)!=='1')localStorage.setItem(goldenBridgeKey,'1');}catch{}
    paint();
    if(lastReported!==unlocked){lastReported=unlocked;parent.postMessage({protocol,type:'achievement',page,unlocked},'*');}
  }
  function render(){
    const lang=language(getLanguage()),copy=copies[target][lang];section.lang=lang;
    section.querySelector('.bridge-title').textContent=copy.title;
    section.querySelector('.bridge-description').textContent=copy.body;
    section.querySelector('.bridge-action-label').textContent=copy.action;
    const note=section.querySelector('.bridge-language');note.hidden=!copy.language;note.textContent=copy.language||'';
    paint();
  }
  function scroll(where){
    if(where==='top')window.scrollTo({top:0,behavior:'instant'});
    else section.scrollIntoView({block:'center',behavior:'instant'});
  }
  anchor.addEventListener('click',event=>{
    if(parent===window)return;
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();parent.postMessage({protocol,type:'navigate',page:target,language:getLanguage(),gold:unlocked},'*');
  });
  window.addEventListener('message',event=>{
    if(event.source!==parent||event.data?.protocol!==protocol)return;
    if(event.data.type==='scroll')requestAnimationFrame(()=>scroll(event.data.where));
    if(event.data.type==='theme'){theme=event.data.theme==='gold'?'gold':'mint';simulate=event.data.simulate===true;paint();}
  });
  document.addEventListener('quidence:language',render);window.addEventListener('languagechange',render);render();refreshAchievement();
  window.addEventListener('storage',refreshAchievement);window.addEventListener('focus',refreshAchievement);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshAchievement();});
  const orbit=document.getElementById('activity-orbit');
  if(orbit)new MutationObserver(refreshAchievement).observe(orbit,{subtree:true,attributes:true,attributeFilter:['data-completed']});
  const ready=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>parent.postMessage({protocol,type:'ready',page},'*')));
  if(document.fonts?.ready)document.fonts.ready.then(ready);else ready();
  window.__brandFooterPreview={render,target,refreshAchievement};
}
