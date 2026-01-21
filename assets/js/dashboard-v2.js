(function () {
  function closeAllDropdowns() {
    document.querySelectorAll(".db2-dd.is-open").forEach((el) => el.classList.remove("is-open"));
  }

  function initDropdowns() {
    document.querySelectorAll("[data-dd]").forEach((dd) => {
      const trigger = dd.querySelector("[data-dd-trigger]");
      if (!trigger) return;

      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dd.classList.contains("is-open");
        closeAllDropdowns();
        if (!isOpen) dd.classList.add("is-open");
      });
    });

    document.addEventListener("click", () => closeAllDropdowns());
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAllDropdowns();
    });
  }

  function initScrollLinks() {
    document.querySelectorAll("[data-scroll-to]").forEach((a) => {
      a.addEventListener("click", (e) => {
        const sel = a.getAttribute("data-scroll-to");
        if (!sel) return;
        const el = document.querySelector(sel);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initHowToggle() {
    const wrap = document.querySelector(".db2-toggle");
    if (!wrap) return;

    const btns = Array.from(wrap.querySelectorAll("button[data-how]"));
    const cta = wrap.parentElement.querySelector('[data-scroll-to]');
    if (!btns.length || !cta) return;

    function setActive(kind) {
      btns.forEach(b => b.classList.toggle("is-active", b.getAttribute("data-how") === kind));
      // Integrador vai para seção integrador, Cliente vai para seção cliente
      cta.setAttribute("data-scroll-to", kind === "cliente" ? "#db2-how-client" : "#db2-how-integrador");
    }

    btns.forEach((b) => {
      b.addEventListener("click", () => setActive(b.getAttribute("data-how")));
    });

    setActive("integrador");
  }

  document.addEventListener("DOMContentLoaded", function () {
    initDropdowns();
    initScrollLinks();
    initHowToggle();
  });
})();
