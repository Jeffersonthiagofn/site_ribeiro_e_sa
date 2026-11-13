/**
 * BIA & BERG ARQUITETURA — STACKED CARDS MODULE
 * Suporte e inicialização dos cards empilhados da seção monográfica
 */

export function initStackedCards() {
  const stackSection = document.querySelector('.stack-section');
  const cards = document.querySelectorAll('.card-item');

  if (!stackSection || !cards.length) return;

  // Os cards utilizam empilhamento sticky CSS nativo com transições suaves.
  // Este módulo garante que o estado inicial e acessibilidade estejam consistentes.
  cards.forEach((card, index) => {
    card.setAttribute('data-card-index', index + 1);
  });
}
