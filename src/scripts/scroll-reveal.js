/**
 * BIA & BERG ARQUITETURA — SCROLL REVEAL ENGINE
 * Motor de revelação progressiva baseado em IntersectionObserver nativo
 */

export function initRevealEngine() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const REVEAL_SELECTORS = '.reveal-trigger, .reveal-fade, .reveal-para, .reveal-img, .reveal-seq';
  const elements = document.querySelectorAll(REVEAL_SELECTORS);

  if (!elements.length) return;

  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const showElement = (el, delay) => {
    const delaySeconds = Math.max(0, Math.round(delay * 1000) / 1000);
    el.style.setProperty('--reveal-delay', `${delaySeconds}s`);
    el.classList.add('is-revealed');
  };

  // Grupos com efeito cascata (staggered)
  const staggeredContainers = document.querySelectorAll('[data-reveal-stagger]');
  const groupedElements = new Set();

  staggeredContainers.forEach((container) => {
    const step = parseFloat(container.dataset.revealStagger) || 0.1;
    const baseDelay = parseFloat(container.dataset.revealBase) || 0;
    const children = Array.from(container.children).filter((child) =>
      child.matches(REVEAL_SELECTORS) || child.querySelector(REVEAL_SELECTORS)
    );

    children.forEach((c) => groupedElements.add(c));

    const groupObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, index) => {
              const target = child.matches(REVEAL_SELECTORS)
                ? child
                : child.querySelector(REVEAL_SELECTORS);
              if (target) {
                showElement(target, baseDelay + index * step);
              }
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
    );

    groupObserver.observe(container);
  });

  // Elementos individuais fora de contêineres staggered
  const soloObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseFloat(entry.target.dataset.revealDelay) || 0;
          showElement(entry.target, delay);
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
  );

  elements.forEach((el) => {
    if (!groupedElements.has(el) && !groupedElements.has(el.parentElement)) {
      soloObserver.observe(el);
    }
  });
}
