function toggleModal(modalId, show = null) {
  const modal = document.getElementById(modalId);
  const overlay = document.getElementById('overlayModal');

  const shouldShow = show !== null ? show : modal.classList.contains('hidden');

  overlay.classList.toggle('hidden', !shouldShow);
  modal.classList.toggle('hidden', !shouldShow);

  // Close other modals
  document.querySelectorAll('.modal').forEach((m) => {
    if (m.id !== modalId) m.classList.add('hidden');
  });

  // Body scroll control
  document.body.style.overflow = shouldShow ? 'hidden' : 'auto';

  if (shouldShow) {
    lucide.createIcons();
  }
}

const formContainer = document.getElementById("form-container");

const focusableElements = formContainer.querySelectorAll(
'input:not([type="hidden"]), select, textarea, button'
);

focusableElements.forEach((el, index) => {
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const next = focusableElements[index + 1];
        if (next) {
          next.focus();
        }
      }
    });
});