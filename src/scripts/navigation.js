/**
 * BIA & BERG ARQUITETURA — NAVIGATION & MOBILE MENU MODULE
 * Gerenciamento do menu móvel drawer, acessibilidade e teclas de atalho
 */

export function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const closeLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !drawer) return;

  const toggleMenu = (open) => {
    drawer.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    toggleMenu(!isOpen);
  });

  closeLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      toggleMenu(false);
    }
  });
}
