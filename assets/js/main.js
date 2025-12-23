(function () {
  // Ano
  var year = String(new Date().getFullYear());
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = year;
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = year; });

  // Drawer
  var drawer = document.querySelector("[data-drawer]");
  var openBtn = document.querySelector("[data-drawer-open]");
  var closeBtn = document.querySelector("[data-drawer-close]");
  var backdrop = drawer ? drawer.querySelector(".lp-drawer__backdrop") : null;

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("lp-drawer--open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("lp-drawer--open");
    document.body.style.overflow = "";
  }

  if (openBtn) openBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  // Fecha com ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });

  // Fecha ao clicar em links dentro do drawer
  if (drawer) {
    drawer.addEventListener("click", function (e) {
      var target = e.target;
      if (target && target.matches && target.matches(".lp-drawer__link")) {
        closeDrawer();
      }
    });
  }
})();
