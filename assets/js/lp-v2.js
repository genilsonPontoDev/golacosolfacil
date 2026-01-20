(function () {
  // FAQ "Carregar Mais" (mostra 6 e expande)
  function initFaqMore() {
    var wrap = document.querySelector(".lp2-faq");
    if (!wrap) return;

    var items = Array.prototype.slice.call(wrap.querySelectorAll(".lp2-faq__item"));
    var btn = document.querySelector("[data-faq-more]");
    if (!btn || items.length <= 6) {
      if (btn) btn.style.display = "none";
      return;
    }

    var collapsed = true;

    function apply() {
      items.forEach(function (el, idx) {
        if (collapsed && idx >= 6) el.classList.add("lp2-faq__hidden");
        else el.classList.remove("lp2-faq__hidden");
      });
      btn.textContent = collapsed ? "Carregar Mais" : "Mostrar menos";
    }

    btn.addEventListener("click", function () {
      collapsed = !collapsed;
      apply();
    });

    apply();
  }

  document.addEventListener("DOMContentLoaded", initFaqMore);
})();
