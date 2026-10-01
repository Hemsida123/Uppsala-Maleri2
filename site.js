const menu=document.querySelector('#mobile-menu'),openMenu=document.querySelector('.menu-open');
openMenu?.addEventListener('click',()=>{menu.showModal();openMenu.setAttribute('aria-expanded','true');document.body.style.overflow='hidden'});
document.querySelector('[data-close-menu]')?.addEventListener('click',()=>menu.close());
menu?.addEventListener('close',()=>{openMenu.setAttribute('aria-expanded','false');document.body.style.overflow='';openMenu.focus()});
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window&&!reduce.matches){document.documentElement.classList.add('js-reveal');const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveal.unobserve(e.target)}}),{threshold:.06});document.querySelectorAll('.reveal').forEach(e=>reveal.observe(e))}
const hero=document.querySelector('[data-hero-video]'),toggle=document.querySelector('[data-video-toggle]');
if(hero){
  let intendedPlaying=!reduce.matches&&!navigator.connection?.saveData,inView=true;
  const source=()=>{if(!hero.getAttribute('src'))hero.src=matchMedia('(max-width:767px)').matches?hero.dataset.mobile:hero.dataset.desktop};
  const update=()=>{const playing=!hero.paused;toggle.textContent=playing?'Pausa film':'Spela film';toggle.setAttribute('aria-label',toggle.textContent)};
  const play=()=>{source();hero.muted=true;hero.play().catch(()=>{update()})};
  hero.addEventListener('play',update);hero.addEventListener('pause',update);
  hero.addEventListener('error',()=>{hero.removeAttribute('src');hero.load();intendedPlaying=false;toggle.textContent='Försök spela igen'});
  toggle.addEventListener('click',()=>{if(hero.paused){intendedPlaying=true;play()}else{intendedPlaying=false;hero.pause()}});
  const start=()=>{if(intendedPlaying)play()};
  if(document.readyState==='complete')start();else window.addEventListener('load',start,{once:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)hero.pause();else if(intendedPlaying&&inView)play()});
  new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(!inView)hero.pause();else if(intendedPlaying&&!document.hidden)play()},{threshold:.05}).observe(hero);
  reduce.addEventListener('change',e=>{if(e.matches){intendedPlaying=false;hero.pause()}});
}
const preview=document.querySelector('.service-preview img');
document.querySelectorAll('[data-service-image]').forEach(a=>{const show=()=>{if(preview&&matchMedia('(min-width:768px)').matches){preview.removeAttribute('srcset');preview.src=a.dataset.serviceImage;preview.alt=a.dataset.serviceAlt}};a.addEventListener('pointerenter',show);a.addEventListener('focus',show)});
const imageDialog=document.querySelector('#image-dialog');
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{const im=imageDialog.querySelector('img');im.src=button.dataset.zoom;im.alt=button.querySelector('img').alt;imageDialog.showModal()}));
document.querySelector('[data-close-image]')?.addEventListener('click',()=>imageDialog.close());
imageDialog?.addEventListener('click',e=>{if(e.target===imageDialog)imageDialog.close()});
const filmDialog=document.querySelector('#film-dialog'),film=filmDialog?.querySelector('video');
document.querySelector('[data-open-film]')?.addEventListener('click',()=>{film.src=film.dataset.filmSrc;filmDialog.showModal();film.play().catch(()=>{})});
document.querySelector('[data-close-film]')?.addEventListener('click',()=>{film.pause();filmDialog.close()});
filmDialog?.addEventListener('cancel',()=>film.pause());
filmDialog?.addEventListener('close',()=>film.pause());
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;document.querySelectorAll('[data-category]').forEach(el=>{el.hidden=button.dataset.filter!=='all'&&el.dataset.category!==button.dataset.filter;if(!el.hidden){el.classList.add('visible');count++}});document.querySelector('.gallery-status').textContent=`Visar ${count} bilder.`}));
document.querySelectorAll('[data-email-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form),files=[...form.querySelector('[type=file]').files].map(f=>f.name);const body=`Namn: ${d.get('name-1')}\nTelefon: ${d.get('phone-1')}\nE-post: ${d.get('email-1')}\nÖnskad tidsram: ${d.get('select-1')}\n\n${d.get('textarea-1')}${files.length?'\n\nBilder att bifoga manuellt: '+files.join(', '):''}`;const result=form.querySelector('.form-result');result.querySelector('a').href=`mailto:info@uppsalamaleri.se?subject=${encodeURIComponent('Offertförfrågan')}&body=${encodeURIComponent(body)}`;result.hidden=false;result.tabIndex=-1;result.focus()}));
