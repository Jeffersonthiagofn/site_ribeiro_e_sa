/**
 * BIA & BERG ARQUITETURA — FAQ ACCORDION MODULE
 * Comportamento acessível de perguntas e respostas expansíveis
 */

export function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question-btn');
    if (!button) return;

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active');

      // Fecha outros itens para manter layout limpo
      faqItems.forEach((i) => i.classList.remove('is-active'));

      if (!isActive) {
        item.classList.add('is-active');
      }
    });
  });
}
