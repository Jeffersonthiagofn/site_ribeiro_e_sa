/**
 * BIA & BERG ARQUITETURA — SPOTLIGHT ENGINE
 * Efeito lanterna mineral interativo nos cards em desktop
 */

export function initSpotlight() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || window.innerWidth < 1024) return;

  const cards = document.querySelectorAll('[data-spotlight]');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
