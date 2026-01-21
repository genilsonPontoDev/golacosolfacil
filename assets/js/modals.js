(function () {
  function openModal(selector) {
    const modal = document.querySelector(selector);
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-ui-open]");
    if (openBtn) {
      e.preventDefault();
      openModal(openBtn.getAttribute("data-ui-open"));
      return;
    }

    const closeBtn = e.target.closest("[data-ui-close]");
    if (closeBtn) {
      const modal = closeBtn.closest(".ui-modal");
      closeModal(modal);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const modal = document.querySelector(".ui-modal.is-open");
    if (modal) closeModal(modal);
  });
})();
