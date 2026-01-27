(function () {
  "use strict";

  var CFG = window.GS2D_CONFIG || { faq: [], data: {}, ui: {} };

  // --- Utils ------------------------------------------------------------
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

  // --- FAQ (Landing + Dashboard) ----------------------------------------
  function faqItemHtml(item, idx, shouldOpen) {
    var openAttr = shouldOpen ? " open" : "";
    return (
      '<details class="lp2-faq__item"' + openAttr + '>' +
        '<summary class="lp2-faq__summary">' +
          '<div class="lp2-faq__q">' +
            '<span class="lp2-faq__n">' + escapeHtml(String(idx + 1)) + '.</span>' +
            '<span class="lp2-faq__t">' + escapeHtml(item.q) + '</span>' +
          '</div>' +
          '<span class="lp2-faq__icon" aria-hidden="true"></span>' +
        '</summary>' +
        '<div class="lp2-faq__content">' + escapeHtml(item.a) + '</div>' +
      '</details>'
    );
  }

  function renderFAQ() {
    var containers = $all('[data-faq]');
    if (!containers.length) return;

    var pageSize = Number((CFG.ui && CFG.ui.faqPageSize) || 6);
    var openFirst = !!(CFG.ui && CFG.ui.faqOpenFirst);
    var allFaq = Array.isArray(CFG.faq) ? CFG.faq : [];

    containers.forEach(function (wrap) {
      // The "Carregar Mais" button is not always a direct sibling of [data-faq].
      // - index.html: [data-faq] lives inside `.lp2-faq__list`, while the button sits in `.lp2-faq__more`.
      // - dashboard.html: the button can be placed nearer the list.
      var root = (wrap.closest && (wrap.closest(".lp2-faq") || wrap.closest(".db2-faq"))) || wrap.parentElement || document;
      var moreBtn = $('[data-faq-more]', root);
      var shown = Number(wrap.getAttribute('data-faq-shown') || 0);
      if (!shown) shown = Math.min(pageSize, allFaq.length);

      function draw() {
        wrap.innerHTML = allFaq.slice(0, shown).map(function (item, idx) {
          return faqItemHtml(item, idx, openFirst && idx === 0);
        }).join('');

        if (!moreBtn) return;
        if (shown >= allFaq.length) {
          moreBtn.style.display = 'none';
        } else {
          moreBtn.style.display = '';
        }
      }

      draw();

      if (moreBtn && !moreBtn.__gs2dBound) {
        moreBtn.__gs2dBound = true;
        moreBtn.addEventListener('click', function () {
          shown = Math.min(allFaq.length, shown + pageSize);
          wrap.setAttribute('data-faq-shown', String(shown));
          draw();
        });
      }
    });
  }

  // --- Dashboard bindings (data mock) -----------------------------------
  function setText(sel, value) {
    var el = $(sel);
    if (el) el.textContent = value;
  }

  function renderDashboard(profileKey) {
    // Heurística: só roda se existirem elementos data-ui-* (evita mexer na index)
    if (!$('[data-ui-fat]') && !$('[data-ui-luckynum-total]')) return;

    var DATA = (CFG && CFG.data) || {};
    var profiles = (DATA && DATA.profiles) || {};
    var p = (profiles && profiles[profileKey]) || profiles.integrador || {};

    setText('[data-ui-fat]', String(Math.round((p.revenue || 0) / 1000)) + 'K');
    setText('[data-ui-fat-money]', moneyBRL(p.revenue));
    setText('[data-ui-meta]', moneyBRL(100000));
    setText('[data-ui-next]', moneyBRL(150000));
    setText('[data-ui-luckynum-total]', String(p.luckyTotal || 0));

    // Trilhas (fill)
    var fill = $('[data-track-fill]');
    if (fill && p.track && typeof p.track.percent !== 'undefined') {
      fill.style.width = String(p.track.percent || 0) + '%';
    }

    // Winners
    var w = $('[data-winners]');
    if (w && Array.isArray(DATA.winners)) {
      w.innerHTML = DATA.winners.map(function (row) {
        return (
          '<div class="db-table__row" role="row">' +
            '<div class="db-table__cell" role="cell">' + escapeHtml(formatDateISO(row.date)) + '</div>' +
            '<div class="db-table__cell" role="cell">' + escapeHtml(row.prize) + '</div>' +
            '<div class="db-table__cell" role="cell">' + escapeHtml(row.winner) + '</div>' +
            '<div class="db-table__cell" role="cell"><span class="db-pill">' + escapeHtml(row.number) + '</span></div>' +
          '</div>'
        );
      }).join('');
    }
  }

  // --- Countdown (used in hero) -----------------------------------------
  function startCountdown() {
    var el = $('[data-countdown]');
    if (!el) return;

    var endAt = (CFG && CFG.data && CFG.data.campaign && CFG.data.campaign.endAt) || null;
    if (!endAt) return;

    var end = new Date(endAt).getTime();
    function tick() {
      var now = Date.now();
      var diff = Math.max(0, end - now);
      var totalSeconds = Math.floor(diff / 1000);
      var h = Math.floor(totalSeconds / 3600);
      var m = Math.floor((totalSeconds % 3600) / 60);
      var s = totalSeconds % 60;
      el.textContent = pad2(h) + ':' + pad2(m) + ':' + pad2(s);
    }
    tick();
    setInterval(tick, 1000);
  }

  // --- Trilha scroll (mobile/desktop) -----------------------------------
  function bindTrailScroll() {
    var strip = document.querySelector('[data-trail-strip]');
    var prev = document.querySelector('[data-trail-prev]');
    var next = document.querySelector('[data-trail-next]');
    if (!strip || !prev || !next) return;

    function stepPx() {
      // 90% da largura visível costuma dar 2-3 cards no mobile e um bloco no desktop
      return Math.max(240, Math.floor(strip.clientWidth * 0.9));
    }

    prev.addEventListener('click', function () {
      strip.scrollBy({ left: -stepPx(), behavior: 'smooth' });
    });
    next.addEventListener('click', function () {
      strip.scrollBy({ left: stepPx(), behavior: 'smooth' });
    });
  }

  // --- Boot -------------------------------------------------------------
  renderFAQ();
  renderDashboard(localStorage.getItem('gs2d_profile') || 'integrador');
  startCountdown();
  bindTrailScroll();
})();
