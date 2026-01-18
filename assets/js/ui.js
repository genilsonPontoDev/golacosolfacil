
document.addEventListener('click',e=>{
 const o=e.target.closest('[data-ui-open]');
 const c=e.target.closest('[data-ui-close]');
 if(o){document.querySelector(o.dataset.uiOpen)?.classList.add('is-open');document.body.style.overflow='hidden'}
 if(c){c.closest('.ui-modal')?.classList.remove('is-open');document.body.style.overflow=''}
});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'){
  document.querySelectorAll('.ui-modal.is-open').forEach(m=>m.classList.remove('is-open'));
  document.body.style.overflow='';
 }
});
