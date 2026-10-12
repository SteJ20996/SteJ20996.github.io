import {registerTranslations,t,locales,translateDOM} from './i18n.mjs';
import {renderCompletion} from './completion.mjs';

const copy={
  summary:['外观预览','Preview the look','Vista previa'],
  title:['先看看集齐后的样子','See the gold look','Mira cómo se ve en dorado'],
  note:['只展示外观，不改变答题进度。','Appearance only. Your puzzle progress stays as it is.','Solo cambia la apariencia. Tu progreso se queda como está.'],
  live:['真实进度','My progress','Mi progreso'],
  one:['一题金色','One gold stop','Un juego dorado'],
  all:['全环金色','A gold ring','Todo el círculo dorado'],
  hollow:['空心皇冠','A hollow crown','Corona hueca'],
  close:['收起','Close','Cerrar'],
  waterEyebrow:['水壶没刻度？我来试试。','No markings? Let’s try it.','¿Sin marcas? Vamos a intentarlo.'],
  coinEyebrow:['两次机会，我想把它拿下。','Two chances. Let’s find it.','Dos oportunidades. Vamos a encontrarla.'],
  success:['拿下这一局','You got this one','¡Este reto ya quedó!']
};
registerTranslations(Object.fromEntries(Object.entries(copy).map(([key,values])=>['look.'+key,Object.fromEntries(locales.map((locale,i)=>[locale,values[i]]))])));

const water=document.querySelector('#activity-water .intro .eyebrow');
if(water)water.dataset.i18nHtml='look.waterEyebrow';
const coins=document.querySelector('#activity-coins .intro .eyebrow');
if(coins)coins.dataset.i18nHtml='look.coinEyebrow';
const success=document.querySelector('#success .eyebrow');
if(success)success.dataset.i18n='look.success';
// Preserve the small decorative dot when these two captions are translated.
for(const key of ['waterEyebrow','coinEyebrow'])registerTranslations({['look.'+key]:Object.fromEntries(locales.map((locale,i)=>[locale,'<span></span>'+copy[key][i]]))});

document.body.insertAdjacentHTML('beforeend',`<details class="preview-tools" id="look-tools"><summary id="look-summary"></summary><div class="preview-tool-panel"><h2 data-i18n="look.title"></h2><p data-i18n="look.note"></p><div class="preview-tool-modes" role="group" id="look-modes"><button type="button" data-look="live" data-i18n="look.live"></button><button type="button" data-look="one" data-i18n="look.one"></button><button type="button" data-look="all" data-i18n="look.all"></button><button type="button" data-look="hollow" data-i18n="look.hollow"></button></div><button type="button" class="preview-tool-close" id="look-close" data-i18n="look.close"></button></div></details>`);
const tools=document.getElementById('look-tools'),summary=document.getElementById('look-summary'),nav=document.getElementById('activity-orbit');
const allowed=['live','one','all','hollow'];
let mode=new URL(location.href).searchParams.get('look');if(!allowed.includes(mode))mode='live';
function paint(){
  for(const button of document.querySelectorAll('[data-look]'))button.setAttribute('aria-pressed',String(button.dataset.look===mode));
  summary.textContent=t('look.summary')+(mode==='live'?'':' · '+t('look.'+mode));
  document.getElementById('look-modes').setAttribute('aria-label',t('look.title'));
  for(const link of nav.querySelectorAll('[data-activity]')){
    const simulate=mode==='all'||((mode==='one'||mode==='hollow')&&link.dataset.activity==='water');
    link.dataset.previewGold=String(simulate);
    link.dataset.previewHollow=String(simulate&&(mode==='hollow'||link.dataset.answerViewed==='true'));
  }
  nav.parentElement.classList.toggle('preview-all-gold',mode==='all');
  window.postMessage({protocol:'quidolab-brand-footer-preview-v1',type:'theme',theme:'mint',simulate:mode==='all'},location.origin);
  window.dispatchEvent(new Event('activitiesready'));
}
for(const button of document.querySelectorAll('[data-look]'))button.addEventListener('click',()=>{
  mode=button.dataset.look;const url=new URL(location.href);if(mode==='live')url.searchParams.delete('look');else url.searchParams.set('look',mode);history.replaceState(null,'',url);paint();
});
document.getElementById('look-close').addEventListener('click',()=>{tools.open=false;summary.focus();});
window.addEventListener('languagechange',paint);
window.addEventListener('popstate',()=>{const next=new URL(location.href).searchParams.get('look');mode=allowed.includes(next)?next:'live';paint();});
translateDOM();renderCompletion();paint();
