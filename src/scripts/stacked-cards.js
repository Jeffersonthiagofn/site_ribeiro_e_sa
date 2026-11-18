/**
 * BIA & BERG ARQUITETURA — STACKED CARDS MODULE
 * Suporte aos cards empilhados e abertura do modal de detalhes no mobile
 */

export function initStackedCards() {
  const stackSection = document.querySelector('.stack-section');
  const cards = Array.from(document.querySelectorAll('.stack-section .card-item'));

  if (!stackSection || !cards.length) return;

  cards.forEach((card, index) => {
    card.setAttribute('data-card-index', index + 1);
  });

  const modal = document.getElementById('case-study-modal');
  if (!modal) return;

  const modalScroll = document.getElementById('case-modal-scroll');
  const modalIndex = document.getElementById('case-modal-index');
  const modalImg = document.getElementById('case-modal-img');
  const modalTitle = document.getElementById('case-modal-title');
  const modalLocation = document.getElementById('case-modal-location');
  const modalSpecs = document.getElementById('case-modal-specs');
  const modalNarrative = document.getElementById('case-modal-narrative');
  const modalCounter = document.getElementById('case-modal-counter');
  const closeBtn = document.getElementById('case-modal-close');
  const prevBtn = document.getElementById('case-modal-prev');
  const nextBtn = document.getElementById('case-modal-next');
  const contactBtn = document.getElementById('case-modal-contact-btn');

  const mobileQuery = window.matchMedia('(max-width: 1024px)');
  let currentIndex = 0;
  let lastTriggerEl = null;

  const padIndex = (num) => String(num).padStart(2, '0');

  const renderProjectInModal = (index) => {
    const card = cards[index];
    if (!card) return;

    currentIndex = index;

    const indexText = card.querySelector('.card-index')?.textContent?.trim() || padIndex(index + 1);
    const titleText = card.querySelector('.card-title')?.textContent?.trim() || '';
    const locationText = card.querySelector('.card-location')?.textContent?.trim() || '';
    const imgEl = card.querySelector('.card-img');
    const narrativeEl = card.querySelector('.card-narrative');
    const specItems = Array.from(card.querySelectorAll('.card-spec-item'));

    if (modalIndex) modalIndex.textContent = indexText;
    if (modalTitle) modalTitle.textContent = titleText;
    if (modalLocation) modalLocation.textContent = locationText;

    if (modalImg && imgEl) {
      modalImg.src = imgEl.getAttribute('src') || '';
      modalImg.alt = imgEl.getAttribute('alt') || titleText;
      modalImg.classList.toggle('card-img-terra', imgEl.classList.contains('card-img-terra'));
    }

    if (modalSpecs) {
      modalSpecs.innerHTML = specItems.map((el) => el.outerHTML).join('');
    }

    if (modalNarrative) {
      modalNarrative.innerHTML = narrativeEl ? narrativeEl.innerHTML : '';
    }

    if (modalCounter) {
      modalCounter.textContent = `${padIndex(index + 1)} / ${padIndex(cards.length)}`;
    }

    if (modalScroll) {
      modalScroll.scrollTop = 0;
    }
  };

  const openModal = (index, triggerEl) => {
    lastTriggerEl = triggerEl || cards[index]?.querySelector('.card-mobile-cta') || null;
    renderProjectInModal(index);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus({ preventScroll: true });
  };

  const closeModal = ({ restoreFocus = true } = {}) => {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (restoreFocus && lastTriggerEl && typeof lastTriggerEl.focus === 'function') {
      lastTriggerEl.focus({ preventScroll: true });
    }
  };

  cards.forEach((card, index) => {
    const ctaBtn = card.querySelector('.card-mobile-cta');
    const cardInner = card.querySelector('.card-inner');

    ctaBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(index, ctaBtn);
    });

    cardInner?.addEventListener('click', (e) => {
      if (!mobileQuery.matches) return;
      if (e.target.closest('a, button')) return;
      openModal(index, ctaBtn);
    });
  });

  modal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', () => closeModal());
  });

  prevBtn?.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    renderProjectInModal(prevIndex);
  });

  nextBtn?.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % cards.length;
    renderProjectInModal(nextIndex);
  });

  contactBtn?.addEventListener('click', () => {
    closeModal({ restoreFocus: false });
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
      renderProjectInModal(prevIndex);
    } else if (e.key === 'ArrowRight') {
      const nextIndex = (currentIndex + 1) % cards.length;
      renderProjectInModal(nextIndex);
    }
  });
}
