(function(){
  function qs(sel,root){return (root||document).querySelector(sel)}
  function qsa(sel,root){return Array.from((root||document).querySelectorAll(sel))}

  function openModal(modal){
    if(!modal) return;
    modal.classList.add('ui-modal--open');
    document.body.style.overflow='hidden';
  }
  function closeModal(modal){
    if(!modal) return;
    modal.classList.remove('ui-modal--open');
    document.body.style.overflow='';
  }

  document.addEventListener('click',function(e){
    var open = e.target.closest('[data-ui-open]');
    if(open){
      e.preventDefault();
      openModal(qs(open.getAttribute('data-ui-open')));
      return;
    }
    var close = e.target.closest('[data-ui-close]');
    if(close){
      e.preventDefault();
      closeModal(close.closest('.ui-modal'));
      return;
    }
    var overlay = e.target.classList && e.target.classList.contains('ui-modal');
    if(overlay){
      closeModal(e.target);
      return;
    }
  });

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      qsa('.ui-modal.ui-modal--open').forEach(function(m){m.classList.remove('ui-modal--open')});
      document.body.style.overflow='';
    }
  });

  // Lucky modal controller
  function initLuckyModal(){
    var modal = qs('#uiModalLucky');
    if(!modal) return;

    var state = {
      tab: 'integrador',
      page: 1,
      perPage: 48,
      search: '',
      showFilters: false,
      // mock dataset
      items: Array.from({length:72}).map(function(_,i){
        var n = String(10000 + ((i*137) % 89999));
        return {
          numero: n,
          categoria: 'R$ 20.000,00',
          pedidoId: String(100000+i),
          dataPedido: '12/02/2026',
          clienteNome: 'Cliente '+(i+1),
          clienteCPF: '000.000.000-00'
        };
      })
    };

    var elCount = qs('[data-ui-lucky-count]', modal);
    var elGrid = qs('[data-ui-lucky-grid]', modal);
    var elSearch = qs('[data-ui-lucky-search]', modal);
    var elPager = qs('[data-ui-lucky-pager]', modal);
    var btnFilters = qs('[data-ui-lucky-toggle-filters]', modal);
    var form = qs('[data-ui-lucky-filters]', modal);
    var btnExport = qs('[data-ui-lucky-export]', modal);

    function apply(){
      var items = state.items.slice();
      if(state.search){
        var s = state.search.toLowerCase();
        items = items.filter(function(it){
          return it.numero.includes(state.search) || it.pedidoId.includes(state.search) || it.clienteNome.toLowerCase().includes(s);
        });
      }
      // basic filter fields
      if(form){
        var pid = qs('[name="pedidoId"]',form)?.value?.trim();
        var num = qs('[name="numero"]',form)?.value?.trim();
        var cat = qs('[name="categoria"]',form)?.value?.trim();
        if(pid) items = items.filter(function(it){return it.pedidoId.includes(pid)});
        if(num) items = items.filter(function(it){return it.numero.includes(num)});
        if(cat && cat !== 'all') items = items.filter(function(it){return it.categoria===cat});
        if(state.tab==='cliente'){
          var nome = qs('[name="clienteNome"]',form)?.value?.trim().toLowerCase();
          var cpf = qs('[name="clienteCPF"]',form)?.value?.trim();
          if(nome) items = items.filter(function(it){return it.clienteNome.toLowerCase().includes(nome)});
          if(cpf) items = items.filter(function(it){return it.clienteCPF.includes(cpf)});
        }
      }

      var total = items.length;
      if(elCount) elCount.textContent = total + ' Números';

      var pages = Math.max(1, Math.ceil(total/state.perPage));
      if(state.page>pages) state.page=pages;
      var start = (state.page-1)*state.perPage;
      var pageItems = items.slice(start,start+state.perPage);

      if(elGrid){
        elGrid.innerHTML='';
        pageItems.forEach(function(it){
          var d=document.createElement('div');
          d.className='ui-pillnum';
          d.textContent=it.numero;
          elGrid.appendChild(d);
        });
      }

      if(elPager){
        elPager.innerHTML='';
        var left=document.createElement('button');
        left.className='ui-pager__btn';
        left.textContent='‹';
        left.disabled = state.page<=1;
        left.addEventListener('click',function(){state.page--; apply();});
        var right=document.createElement('button');
        right.className='ui-pager__btn';
        right.textContent='›';
        right.disabled = state.page>=pages;
        right.addEventListener('click',function(){state.page++; apply();});

        var p1=document.createElement('button');
        p1.className='ui-pager__page'+(state.page===1?' is-active':'');
        p1.textContent='1';
        p1.addEventListener('click',function(){state.page=1; apply();});
        var p2=document.createElement('button');
        p2.className='ui-pager__page'+(state.page===2?' is-active':'');
        p2.textContent='2';
        p2.addEventListener('click',function(){state.page=2; apply();});

        var info=document.createElement('div');
        info.className='ui-pager__info';
        info.textContent='Página '+state.page+' de '+pages;

        elPager.appendChild(left);
        if(pages>=1) elPager.appendChild(p1);
        if(pages>=2) elPager.appendChild(p2);
        elPager.appendChild(right);
        elPager.appendChild(info);
      }
    }

    // tabs
    qsa('[data-ui-lucky-tab]', modal).forEach(function(btn){
      btn.addEventListener('click',function(){
        state.tab = btn.getAttribute('data-ui-lucky-tab');
        qsa('[data-ui-lucky-tab]',modal).forEach(function(b){b.classList.remove('is-active')});
        btn.classList.add('is-active');
        // toggle cliente-only fields
        qsa('[data-ui-lucky-only="cliente"]', modal).forEach(function(row){
          row.style.display = (state.tab==='cliente') ? '' : 'none';
        });
        apply();
      });
    });

    if(elSearch){
      elSearch.addEventListener('input',function(){
        state.search = elSearch.value.trim();
        state.page = 1;
        apply();
      });
    }

    if(btnFilters && form){
      btnFilters.addEventListener('click',function(){
        form.classList.toggle('is-open');
      });
    }

    if(form){
      form.addEventListener('submit',function(e){
        e.preventDefault();
        state.page=1;
        apply();
      });
      var clear = qs('[data-ui-lucky-clear]', form);
      if(clear){
        clear.addEventListener('click',function(){
          qsa('input,select',form).forEach(function(i){i.value='' });
          qs('[name="categoria"]',form).value='all';
          state.search='';
          if(elSearch) elSearch.value='';
          state.page=1;
          apply();
        });
      }
    }

    if(btnExport){
      btnExport.addEventListener('click',function(){
        // demo: export CSV com extensão .xlsx
        var rows = [['numero','categoria','pedidoId','dataPedido','clienteNome','clienteCPF']]
          .concat(state.items.map(function(it){return [it.numero,it.categoria,it.pedidoId,it.dataPedido,it.clienteNome,it.clienteCPF]}));
        var csv = rows.map(function(r){
          return r.map(function(c){
            var s=String(c??'');
            if(/[",\n]/.test(s)) s='"'+s.replace(/"/g,'""')+'"';
            return s;
          }).join(',');
        }).join('\n');
        var blob = new Blob([csv],{type:'text/csv;charset=utf-8'});
        var a=document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'numeros-da-sorte.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
    }

    // init view
    qsa('[data-ui-lucky-only="cliente"]', modal).forEach(function(row){row.style.display='none'});
    apply();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', initLuckyModal);
  } else {
    initLuckyModal();
  }
})();
