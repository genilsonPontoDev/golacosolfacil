(function(){
  function el(html){var d=document.createElement('div');d.innerHTML=html.trim();return d.firstChild}
  function append(){
    // Infobar
    var bar=el('<div class="ui-infobar"><div class="ui-infobar__inner"><span>Campanha válida: <strong>01/02/2026 a 30/04/2026</strong></span><button class="ui-link" type="button" data-ui-open="#modal-rules">Conferir regulamento</button></div></div>');
    document.body.insertBefore(bar, document.body.firstChild);

    // Modal Regras
    var rules=el(
      '<section class="ui-modal" id="modal-rules" aria-hidden="true"><div class="ui-modal__overlay" data-ui-close></div><div class="ui-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="rules-title"><button class="ui-modal__close" type="button" aria-label="Fechar" data-ui-close>×</button><div class="ui-modal__media" aria-hidden="true"></div><div class="ui-modal__body"><h2 class="ui-modal__title" id="rules-title">Regras da Campanha</h2><div class="ui-modal__card"><p>Este é um texto de demonstração. Na integração, o conteúdo pode vir do endpoint de regulamento/FAQ (OpenAPI).</p><p>— Modal preparado para receber HTML/texto do backend.</p></div><label class="ui-field"><span class="ui-field__label">CNPJ</span><input class="ui-input" placeholder="Insira seu CNPJ para aderir a campanha" /></label><label class="ui-check"><input type="checkbox" checked /><span>Aceito os Termos e Condições da Campanha</span></label><button class="ui-btn ui-btn--primary" type="button">Enviar</button></div></div></section>'
    );
    document.body.appendChild(rules);

    // Modal Números
    var lucky=el(
      '<section class="ui-modal" id="modal-lucky" aria-hidden="true"><div class="ui-modal__overlay" data-ui-close></div><div class="ui-modal__dialog ui-modal__dialog--wide" role="dialog" aria-modal="true" aria-labelledby="lucky-title"><button class="ui-modal__close" type="button" aria-label="Fechar" data-ui-close>×</button><div class="ui-lucky__head"><div><div class="ui-lucky__prize">R$ 20.000,00</div><div class="ui-lucky__sub">30 vales no valor de R$ 300,00 cada.</div></div><div class="ui-lucky__count"><span class="ui-dot"></span><span data-lucky-count>50 Números</span></div></div><div class="ui-lucky__controls"><div class="ui-search"><span class="ui-search__icon" aria-hidden="true">⌕</span><input class="ui-search__input" placeholder="Pesquisar..." data-lucky-search /></div><button class="ui-btn ui-btn--ghost" type="button" data-ui-toggle="#lucky-filters">Filtros</button></div><div class="ui-lucky__tabs" role="tablist"><button class="ui-tab is-active" type="button" data-lucky-tab="integrador">Integrador</button><button class="ui-tab" type="button" data-lucky-tab="cliente">Cliente</button></div><div class="ui-lucky__filters" id="lucky-filters" hidden><div class="ui-grid"><label class="ui-field"><span class="ui-field__label">ID do Pedido</span><input class="ui-input" placeholder="Informe aqui o ID do Pedido" /></label><label class="ui-field"><span class="ui-field__label">Número da Sorte</span><input class="ui-input" placeholder="Digite o número da sorte" /></label><label class="ui-field"><span class="ui-field__label">Data do Pedido</span><input class="ui-input" placeholder="12/02/2026" /></label><label class="ui-field"><span class="ui-field__label">Categoria</span><input class="ui-input" placeholder="R$ 20.000,00" /></label></div><div class="ui-lucky__filterActions"><button class="ui-btn ui-btn--ghost" type="button" data-lucky-clear>Limpar</button><button class="ui-btn ui-btn--primary" type="button" data-lucky-apply>Aplicar Filtros</button></div></div><div class="ui-lucky__label">NÚMEROS DA SORTE</div><div class="ui-lucky__grid" data-lucky-grid></div><div class="ui-lucky__footer"><div class="ui-lucky__page" data-lucky-page>1 de 1</div><div class="ui-pager"><button class="ui-pager__btn" type="button" data-lucky-prev>‹</button><button class="ui-pager__num is-active" type="button" data-lucky-pagebtn="1">1</button><button class="ui-pager__btn" type="button" data-lucky-next>›</button></div><button class="ui-btn ui-btn--ghost" type="button" data-lucky-export>Exportar</button></div></div></section>'
    );
    document.body.appendChild(lucky);

    // Triggers no dashboard
    document.addEventListener('click', function(e){
      var t=e.target;
      if(t && (t.closest('[data-client-integrator]')||t.closest('[data-client-final]')||t.closest('[data-lucky-total]'))){
        var btn=t.closest('[data-client-integrator],[data-client-final],[data-lucky-total]');
        if(btn){
          var openBtn=document.querySelector('[data-ui-open="#modal-lucky"]');
          // se não existe, apenas abre via ui.js
          var modal=document.querySelector('#modal-lucky');
          if(modal) modal.classList.add('ui-modal--open');
          document.body.style.overflow='hidden';
          e.preventDefault();
        }
      }
    }, true);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', append);
  else append();
})();
