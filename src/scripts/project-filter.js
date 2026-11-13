/**
 * BIA & BERG ARQUITETURA — PROJECT FILTER MODULE
 * Filtragem interativa dos projetos do portfólio por categoria
 */

export function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (!filterButtons.length || !projectItems.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter;

      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      projectItems.forEach((item) => {
        const itemCat = item.dataset.category;
        if (category === 'all' || itemCat === category) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(12px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}
