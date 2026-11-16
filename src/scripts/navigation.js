/**
 * BIA & BERG ARQUITETURA — NAVIGATION & MOBILE MENU MODULE
 * Gerenciamento do menu móvel drawer, acessibilidade e teclas de atalho
 */

export function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const closeLinks = document.querySelectorAll('.mobile-nav-link');
  const floatingCta = document.getElementById('mobile-floating-cta');
  const contactSection = document.getElementById('contato');

  if (!menuBtn || !drawer) return;

  let isContactVisible = false;

  const syncFloatingCta = () => {
    if (!floatingCta) return;
    const isMenuOpen = drawer.classList.contains('is-open');
    floatingCta.classList.toggle('is-hidden', isMenuOpen || isContactVisible);
  };

  const toggleMenu = (open) => {
    drawer.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    syncFloatingCta();
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

  if (floatingCta && contactSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isContactVisible = entry.isIntersecting;
          syncFloatingCta();
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(contactSection);
  }
}
