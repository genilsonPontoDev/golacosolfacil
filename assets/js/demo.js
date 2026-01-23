(function () {
  "use strict";

  // --- Utils --------------------------------------------------------------
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function moneyBRL(value) {
    var n = Number(value || 0);
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function pad2(n) { return String(n).padStart(2, "0"); }

  function formatDateISO(iso) {
    if (!iso) return "—";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    return pad2(d.getDate()) + "/" + pad2(d.getMonth() + 1) + "/" + d.getFullYear();
  }

  // --- Mock payloads (substituir por fetch() depois) ----------------------
  var FAQ = [
    {
      q: "O que é a campanha Golaço da Solfácil?",
      a: "A Golaço da Solfácil é uma campanha promocional onde integradores e clientes finais concorrem a prêmios ao realizar compras e financiamentos através da Solfácil. Quanto mais você compra, mais números da sorte acumula — e mais chances de ganhar."
    },
    {
      q: "Qual é o período da campanha?",
      a: "A campanha é válida de 01/02/2026 a 30/04/2026. Compras e financiamentos feitos nesse período são elegíveis, desde que sejam faturados/formalizados até 10/05/2026. Ex.: comprou em 28/04, mas faturou em 12/05 → não entra."
    },
    {
      q: "Quem pode participar?",
      a: "Integradores Solfácil e clientes finais que realizarem compra através da Solfácil."
    },
    {
      q: "Onde eu acompanho meus números da sorte?",
      a: "Você acompanha tudo dentro da plataforma. Para integrador: Minha pontuação. Para cliente final: Área do cliente."
    },
    {
      q: "Como eu ganho números da sorte como integrador?",
      a: "A cada R$ 5.000 em compras faturadas (Loja Solfácil) ou financiamentos formalizados (Financiamento Solfácil), você ganha 1 número da sorte. Compras válidas: feitas até 30/04 e faturadas até 10/05."
    },
    {
      q: "Como funciona o cálculo dos números da sorte?",
      a: "O valor de cada compra é dividido por R$ 5.000 e o resultado é truncado (desconsidera casas decimais). Ex.: R$ 27.000 ÷ 5.000 = 5,4 → ganha 5 números."
    },
    {
      q: "Posso somar duas compras diferentes para dar R$ 5.000?",
      a: "Não. Os números da sorte são gerados por transação e não acumulam entre pedidos."
    },
    {
      q: "O que significa multiplicador x2 e x3?",
      a: "Você pode ganhar mais números ao usar condições específicas. x2 quando: compra via Combo Fácil (Loja + financiamento) ou pedido inclui módulos Hanersun, baterias ou equipamentos Sofar. x3 quando: Combo Fácil com módulos Hanersun, baterias ou equipamentos Sofar (equipamentos participantes)."
    },
    {
      q: "Como funciona o Combo Fácil?",
      a: "Combo Fácil é a compra na Loja Solfácil + financiamento Solfácil em uma mesma jornada. Além de facilitar a compra, o pedido ativa multiplicadores na campanha."
    },
    {
      q: "Os multiplicadores de 2x e 3x, como funcionam?",
      a: "No final da campanha, ao atingir R$ 500.000 ou R$ 1.000.000 em faturamento, seus números da sorte serão dobrados ou triplicados. Se faturar R$ 500.000–R$ 999.999 → categoria A dobra. Se faturar ≥ R$ 1.000.000 → categoria A triplica. Somente para sorteios destinados aos integradores."
    },
    {
      q: "Como funciona a trilha de faturamento?",
      a: "São sorteios que você desbloqueia ao atingir metas de faturamento acumulado durante a campanha. Ao atingir cada meta, você concorre também naquela categoria."
    },
    {
      q: "Quais são as metas para desbloquear categorias?",
      a: "Exemplos principais (trilha): R$ 20.000 (B), R$ 50.000 (C), R$ 100.000 (D), R$ 150.000 (E), R$ 200.000 (F), R$ 300.000 (G), R$ 400.000 (H), R$ 500.000 (I), R$ 1.000.000 (J). Ao desbloquear, você continua concorrendo nessa categoria até o final."
    },
    {
      q: "Quantos números existem por categoria?",
      a: "Para o integrador solar, o conjunto é de 0 a 999.999 por categoria, com numeração independente por categoria."
    },
    {
      q: "Como funciona o sorteio da campanha?",
      a: "O número vencedor é baseado no resultado oficial da Loteria Federal. A campanha usa esse resultado para formar um Número da Sorte Contemplado, que define o ganhador do sorteio."
    },
    {
      q: "Tenho dúvidas da campanha, com quem falo?",
      a: "Você pode entrar em contato por e-mail: contato@solfacil.com.br, falar com seu gerente de contas ou com o time de atendimento Solfácil."
    },
    {
      q: "Onde vejo quais prêmios eu já desbloqueei?",
      a: "Dentro de Minha pontuação, você pode ver: metas atingidas, sorteios desbloqueados, próximos prêmios e quanto falta para avançar na trilha."
    },
    {
      q: "Os prêmios são entregues fisicamente?",
      a: "Não. Todos os prêmios são entregues em formato de voucher, com valores equivalentes para resgate na loja parceira da campanha (Smash)."
    },
    {
      q: "O que é o “Kit Copa”?",
      a: "É um voucher de R$ 700, pensado como referência para bola + camisa (itens temáticos). O resgate acontece via loja parceira."
    },
    {
      q: "Quando acontecem os sorteios?",
      a: "As datas e regras completas ficam disponíveis no regulamento oficial. Os sorteios são realizados após o encerramento e consolidação dos números válidos do período."
    },
    {
      q: "Se eu cancelar um pedido, perco os números?",
      a: "Sim. Apenas compras faturadas/formalizadas dentro das regras entram na campanha. Cancelamentos e estornos não geram pontuação."
    },
    {
      q: "Como o cliente final ganha números da sorte?",
      a: "A cada compra realizada através da Solfácil, o cliente final ganha 1 número da sorte."
    },
    {
      q: "O cliente final também tem multiplicadores?",
      a: "Sim. x2 quando compra via Combo Fácil ou compra um sistema com baterias. x3 quando faz Combo Fácil + sistema com baterias."
    },
    {
      q: "O cliente final concorre aos mesmos prêmios do integrador?",
      a: "Não. O cliente final concorre aos prêmios destinados ao cliente, com regras próprias."
    },
    {
      q: "Por que meus números ainda não apareceram?",
      a: "Pode acontecer por: compra ainda não faturada, financiamento ainda não formalizado, compra fora do período da campanha, ou dados incorretos na consulta."
    },
    {
      q: "Como sei que meus números são válidos?",
      a: "Somente compras ou financiamentos que atendem aos critérios de data dentro do período, faturamento/formalização dentro do prazo e valor mínimo por transação aparecem como elegíveis no sistema."
    },
    {
      q: "Os números da sorte podem mudar?",
      a: "Sim. Eles podem ser atualizados caso haja ajustes de faturamento, cancelamentos ou correções cadastrais."
    },
    {
      q: "Onde posso ler o regulamento completo?",
      a: "Acesse o regulamento completo clicando em “Conferir regulamento”."
    }
  ];

  var DEMO = {
    campaign: {
      subtitle: "Participe da campanha e acompanhe sua jornada em tempo real.",
      periodText: "Válida de 01/02/2026 a 30/04/2026 • Faturamento/formalização até 10/05/2026",
      endAt: "2026-05-10T23:59:59-03:00"
    },
    profiles: {
      integrador: {
        revenue: 600000,
        category: "Categoria A (Integrador)",
        luckyTotal: 2000,
        progressPercent: 60,
        track: {
          percent: 60,
          steps: [
            { label: "R$ 20k", hit: true },
            { label: "R$ 50k", hit: true },
            { label: "R$ 100k", hit: true },
            { label: "R$ 150k", hit: true },
            { label: "R$ 200k", hit: true },
            { label: "R$ 300k", hit: true },
            { label: "R$ 400k", hit: true },
            { label: "R$ 500k", hit: true },
            { label: "R$ 1M", hit: false }
          ]
        },
        achieved: ["R$ 20k", "R$ 50k", "R$ 100k", "R$ 150k", "R$ 200k", "R$ 300k", "R$ 400k", "R$ 500k"],
        unlocked: ["Kit Copa", "TV 55\"", "Bônus Loja (voucher)", "Prêmio Final (categoria A)"],
        nextPrizes: ["Falta R$ 400k para chegar em R$ 1.000.000", "Ao atingir R$ 1M, números da categoria A triplicam"],
        clientArea: {
          integratorText: "Você possui 2.000 números da sorte (demo).",
          finalText: "Você possui 18 clientes finais elegíveis (demo)."
        }
      },
      cliente: {
        revenue: 0,
        category: "Cliente final",
        luckyTotal: 7,
        progressPercent: 25,
        track: {
          percent: 25,
          steps: [
            { label: "Compra", hit: true },
            { label: "Combo Fácil", hit: false },
            { label: "Baterias", hit: false },
            { label: "x3", hit: false }
          ]
        },
        achieved: ["Compra registrada"],
        unlocked: ["Números de cliente final"],
        nextPrizes: ["Ative Combo Fácil para multiplicador", "Sistema com baterias pode gerar multiplicador"],
        clientArea: {
          integratorText: "Você está visualizando a área do cliente final (demo).",
          finalText: "Você possui 7 números da sorte (demo)."
        }
      }
    },
    marketing: [
      {
        id: "mkt-01",
        title: "Banner (Feed)",
        text: "Campanha Golaço Solfácil: participe e concorra a prêmios. Confira seus números na plataforma.",
        preview: "1080×1080 (demo)"
      },
      {
        id: "mkt-02",
        title: "Story",
        text: "Você já está participando do Golaço da Solfácil? Veja sua pontuação e seus números da sorte.",
        preview: "1080×1920 (demo)"
      },
      {
        id: "mkt-03",
        title: "Mensagem pronta",
        text: "Olá! A campanha Golaço da Solfácil está no ar. Acompanhe sua jornada e confira os prêmios na plataforma.",
        preview: "Texto (demo)"
      }
    ],
    winners: [
      { date: "2026-02-15", prize: "Kit Copa", winner: "Integrador • SP", number: "A-102334" },
      { date: "2026-03-10", prize: "TV 55\"", winner: "Integrador • MG", number: "A-778120" },
      { date: "2026-04-05", prize: "Voucher Smash", winner: "Cliente final • PR", number: "C-009812" }
    ]
  };

  // --- Render: FAQ (Landing + Dashboard) ----------------------------------
  function renderFAQ() {
    var containers = $all("[data-faq]");
    if (!containers.length) return;

    containers.forEach(function (wrap) {
      wrap.innerHTML = FAQ.map(function (item, idx) {
        var open = idx === 0 ? " open" : "";
        return (
          '<details class="lp-faq__item"' + open + '>' +
            '<summary class="lp-faq__summary">' + escapeHtml(item.q) + '</summary>' +
            '<div class="lp-faq__content">' + escapeHtml(item.a) + '</div>' +
          '</details>'
        );
      }).join("");
    });
  }

  // --- Render: Dashboard --------------------------------------------------
  function setText(sel, value) {
    var el = $(sel);
    if (el) el.textContent = value;
  }

  function renderDashboard(profileKey) {
    var pageIsDashboard = document.body && document.body.classList.contains("page--dashboard");
    if (!pageIsDashboard) return;

    var p = (DEMO.profiles && DEMO.profiles[profileKey]) || DEMO.profiles.integrador;

    setText("[data-campaign-subtitle]", DEMO.campaign.subtitle);
    setText("[data-period-hint]", DEMO.campaign.periodText);
    setText("[data-revenue]", moneyBRL(p.revenue));
    setText("[data-category]", p.category);
    setText("[data-lucky-total]", String(p.luckyTotal));
    setText("[data-progress-percent]", String(p.progressPercent) + "%");

    // Progress bar + steps
    var fill = $("[data-track-fill]");
    if (fill) fill.style.width = String(p.track.percent || 0) + "%";

    var bar = $("[data-track-bar]");
    if (bar) bar.setAttribute("aria-valuenow", String(p.track.percent || 0));

    var stepsWrap = $("[data-track-steps]");
    if (stepsWrap) {
      stepsWrap.innerHTML = (p.track.steps || []).map(function (s) {
        return (
          '<div class="db-step' + (s.hit ? " db-step--hit" : "") + '">' +
            '<span class="db-step__dot" aria-hidden="true"></span>' +
            '<span class="db-step__label">' + escapeHtml(s.label) + '</span>' +
          '</div>'
        );
      }).join("");
    }

    function renderList(sel, items) {
      var el = $(sel);
      if (!el) return;
      el.innerHTML = (items || []).map(function (t) {
        return '<li class="db-list__item">' + escapeHtml(t) + '</li>';
      }).join("") || '<li class="db-list__item db-list__item--muted">Sem dados (demo)</li>';
    }

    renderList("[data-achieved]", p.achieved);
    renderList("[data-unlocked]", p.unlocked);
    renderList("[data-next-prizes]", p.nextPrizes);

    var ci = $("[data-client-integrator-text]");
    var cf = $("[data-client-final-text]");
    if (ci) ci.textContent = p.clientArea.integratorText;
    if (cf) cf.textContent = p.clientArea.finalText;

    // Marketing
    var mList = $("[data-marketing-list]");
    var mPrev = $("[data-marketing-preview]");
    if (mList) {
      mList.innerHTML = DEMO.marketing.map(function (m, idx) {
        var active = idx === 0 ? " db-mkt--active" : "";
        return (
          '<button class="db-mkt' + active + '" type="button" data-mkt-id="' + escapeHtml(m.id) + '">' +
            '<div class="db-mkt__title">' + escapeHtml(m.title) + '</div>' +
            '<div class="db-mkt__meta">' + escapeHtml(m.preview) + '</div>' +
          '</button>'
        );
      }).join("");

      if (mPrev && DEMO.marketing[0]) {
        mPrev.textContent = DEMO.marketing[0].text;
        mPrev.setAttribute("data-current-mkt", DEMO.marketing[0].id);
      }

      mList.addEventListener("click", function (e) {
        var btn = e.target && e.target.closest ? e.target.closest("[data-mkt-id]") : null;
        if (!btn) return;
        var id = btn.getAttribute("data-mkt-id");

        $all(".db-mkt", mList).forEach(function (b) { b.classList.remove("db-mkt--active"); });
        btn.classList.add("db-mkt--active");

        var found = DEMO.marketing.find(function (x) { return x.id === id; });
        if (found && mPrev) {
          mPrev.textContent = found.text;
          mPrev.setAttribute("data-current-mkt", found.id);
        }
      });
    }

    // Winners
    var w = $("[data-winners]");
    if (w) {
      w.innerHTML = DEMO.winners.map(function (row) {
        return (
          '<div class="db-table__row" role="row">' +
            '<div class="db-table__cell" role="cell">' + escapeHtml(formatDateISO(row.date)) + '</div>' +
            '<div class="db-table__cell" role="cell">' + escapeHtml(row.prize) + '</div>' +
            '<div class="db-table__cell" role="cell">' + escapeHtml(row.winner) + '</div>' +
            '<div class="db-table__cell" role="cell"><span class="db-pill">' + escapeHtml(row.number) + '</span></div>' +
          '</div>'
        );
      }).join("");
    }
  }

  // --- Countdown (Dashboard only) ----------------------------------------
  function startCountdown() {
    var el = $("[data-countdown]");
    if (!el) return;

    var end = new Date(DEMO.campaign.endAt).getTime();
    function tick() {
      var now = Date.now();
      var diff = Math.max(0, end - now);
      var totalSeconds = Math.floor(diff / 1000);
      var h = Math.floor(totalSeconds / 3600);
      var m = Math.floor((totalSeconds % 3600) / 60);
      var s = totalSeconds % 60;
      el.textContent = pad2(h) + ":" + pad2(m) + ":" + pad2(s);
    }
    tick();
    setInterval(tick, 1000);
  }

  // --- Interactions (Dashboard only) -------------------------------------
  function bindDashboardControls() {
    var select = $("[data-profile-select]");
    if (select) {
      var saved = localStorage.getItem("gs2d_demo_profile");
      if (saved && DEMO.profiles[saved]) select.value = saved;
      renderDashboard(select.value);

      select.addEventListener("change", function () {
        localStorage.setItem("gs2d_demo_profile", select.value);
        renderDashboard(select.value);
      });
    }

    var refresh = $("[data-refresh]");
    if (refresh) {
      refresh.addEventListener("click", function () {
        var current = select ? select.value : "integrador";
        renderDashboard(current);
      });
    }

    var copyBtn = $("[data-marketing-copy]");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var prev = $("[data-marketing-preview]");
        var text = prev ? prev.textContent : "";
        if (!text) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text);
        } else {
          // fallback
          var ta = document.createElement("textarea");
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
        }
        copyBtn.textContent = "Copiado!";
        setTimeout(function () { copyBtn.textContent = "Copiar texto (demo)"; }, 1000);
      });
    }

    var downloadBtn = $("[data-marketing-download]");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", function () {
        downloadBtn.textContent = "Baixado (demo)";
        setTimeout(function () { downloadBtn.textContent = "Baixar (demo)"; }, 1000);
      });
    }
  }

  // --- Boot ---------------------------------------------------------------
  renderFAQ();
  renderDashboard(localStorage.getItem("gs2d_demo_profile") || "integrador");
  startCountdown();
  bindDashboardControls();
})();

(() => {
  const strip = document.querySelector('[data-trail-strip]');
  const prev  = document.querySelector('[data-trail-prev]');
  const next  = document.querySelector('[data-trail-next]');
  if (!strip || !prev || !next) return;

  const getStep = () => Math.max(220, Math.floor(strip.clientWidth * 0.85));

  prev.addEventListener('click', (e) => {
    e.preventDefault();
    strip.scrollBy({ left: -getStep(), behavior: 'smooth' });
  });

  next.addEventListener('click', (e) => {
    e.preventDefault();
    strip.scrollBy({ left:  getStep(), behavior: 'smooth' });
  });
})();
