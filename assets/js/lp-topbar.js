(function () {
  function applyHeaderHeightVar() {
    var header = document.querySelector(".lp2-header");
    if (!header) return;

    var h = Math.ceil(header.getBoundingClientRect().height);
    if (!h) return;

    // evita micro-pulos (diferenças pequenas de 1px)
    var current = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--lp2-header-h")) || 0;
    if (Math.abs(current - h) >= 2) {
      document.documentElement.style.setProperty("--lp2-header-h", h + "px");
    }
  }

  function setHeaderState() {
    var header = document.querySelector(".lp2-header");
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 10);
  }

  function boot() {
    // já deve estar certo por causa do inline script, mas garante
    applyHeaderHeightVar();
    setHeaderState();

    window.addEventListener("scroll", setHeaderState, { passive: true });
    window.addEventListener("resize", applyHeaderHeightVar, { passive: true });
    window.addEventListener("load", applyHeaderHeightVar);
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
