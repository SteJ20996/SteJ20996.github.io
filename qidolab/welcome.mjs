import {registerTranslations,locales,translateDOM} from './i18n.mjs';

const metadata={
  title:['Qidolab · 脑力小游戏','Qidolab · Brain games','Qidolab · Juegos de ingenio'],
  description:['18 个脑力小游戏。试试你的招，换条路，再看看要不要挑战下一层。','18 brain games. Try a different move, then choose whether to go further.','18 juegos de ingenio. Prueba otra jugada y decide si quieres ir más allá.']
};
registerTranslations(Object.fromEntries(Object.entries(metadata).map(([name,values])=>['welcome.'+name,Object.fromEntries(locales.map((language,index)=>[language,values[index]]))])));

const captions={
  water:['水壶没刻度？我来试试。','No markings? Let’s try it.','¿Sin marcas? Vamos a intentarlo.'],
  coins:['两次机会，我想把它拿下。','Two chances. Let’s find it.','Dos oportunidades. Vamos a encontrarla.'],
  success:['拿下这一局','You got this one','¡Este reto ya quedó!']
};
for(const [name,values] of Object.entries(captions)){
  const key='welcome.'+name;
  registerTranslations({[key]:Object.fromEntries(locales.map((language,index)=>[language,(name==='success'?'':'<span></span>')+values[index]]))});
  const element=name==='success'?document.querySelector('#success .eyebrow'):document.querySelector('#activity-'+name+' .intro .eyebrow');
  if(element){
    if(name==='success')element.dataset.i18n=key;
    else element.dataset.i18nHtml=key;
  }
}
translateDOM();
