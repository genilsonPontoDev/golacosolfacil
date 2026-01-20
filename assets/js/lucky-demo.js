(function(){
  // Demo: gera 50 números e simula paginação 50 por página (como você pediu)
  function gen(n){
    var out=[];
    for(var i=0;i<n;i++){
      out.push(String(Math.floor(10000+Math.random()*90000)));
    }
    return out;
  }
  var numbers=gen(50);
  window.__GOLACO_DEMO__ = window.__GOLACO_DEMO__ || {};
  window.__GOLACO_DEMO__.lucky = { numbers: numbers, total: numbers.length, pageSize: 50 };

  // Tornar pontos da UI clicáveis para abrir modais, sem mexer no BEM
  document.addEventListener('DOMContentLoaded', function(){
    // Tornar o total de números da sorte clicável na métrica do dashboard
    var luckyTotal = document.querySelector('[data-lucky-total]');
    if(luckyTotal){
      luckyTotal.style.cursor='pointer';
      luckyTotal.setAttribute('data-ui-open', '#modal-lucky');
      luckyTotal.setAttribute('role','button');
      luckyTotal.setAttribute('tabindex','0');
    }

    // Cards de "Números do Integrador/Cliente" abrem modal
    ['[data-client-integrator]','[data-client-final]'].forEach(function(sel){
      var el=document.querySelector(sel);
      if(el){
        el.setAttribute('data-ui-open','#modal-lucky');
      }
    });
  });
})();
