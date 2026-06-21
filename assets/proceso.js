/* AURO — Proceso: revelado de pasos al hacer scroll (sin dependencias) */
(function () {
  const steps = document.querySelectorAll('.pstep');
  if (!steps.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    steps.forEach((s) => s.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.2 });
  steps.forEach((s) => io.observe(s));
})();
