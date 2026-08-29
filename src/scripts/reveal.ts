/**
 * Reveal halus saat elemen masuk viewport, plus penanda section aktif di nav.
 * Semuanya progresif: tanpa JS halaman tetap lengkap (lihat `.no-js .reveal`).
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealables = document.querySelectorAll<HTMLElement>('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  );
  revealables.forEach((el) => observer.observe(el));
}

/* Penanda section aktif -------------------------------------------------- */

const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
const sections = navLinks
  .map((link) => document.getElementById(link.dataset.navLink!))
  .filter((el): el is HTMLElement => el !== null);

if (sections.length && 'IntersectionObserver' in window) {
  const setActive = (id: string) => {
    for (const link of navLinks) {
      const on = link.dataset.navLink === id;
      link.setAttribute('aria-current', on ? 'true' : 'false');
    }
  };

  const spy = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => spy.observe(s));
}

/* Tema ------------------------------------------------------------------- */

const root = document.documentElement;

document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
  const sync = () => {
    const dark = root.getAttribute('data-theme') === 'dark';
    button.setAttribute('aria-pressed', String(dark));
  };
  sync();
  button.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* penyimpanan diblokir — tema tetap berlaku untuk sesi ini */
    }
    sync();
  });
});

/* Penyaring kategori proyek ---------------------------------------------- */

const filterRoot = document.querySelector<HTMLElement>('[data-filter-root]');

if (filterRoot) {
  const buttons = Array.from(filterRoot.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const items = Array.from(filterRoot.querySelectorAll<HTMLElement>('[data-project]'));
  const counter = filterRoot.querySelector<HTMLElement>('[data-filter-count]');
  const empty = filterRoot.querySelector<HTMLElement>('[data-filter-empty]');
  const template = counter?.textContent?.trim().split(/\s+/) ?? [];
  // "Showing 12 of 12" → simpan kata pembuka dan kata penghubungnya.
  const showingWord = template[0] ?? 'Showing';
  const ofWord = template[2] ?? 'of';

  const apply = (key: string) => {
    let shown = 0;
    for (const item of items) {
      const cats = (item.dataset.categories ?? '').split(' ');
      const on = key === 'all' || cats.includes(key);
      item.toggleAttribute('hidden', !on);
      if (on) shown++;
    }
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.filter === key));
    }
    if (counter) counter.textContent = `${showingWord} ${shown} ${ofWord} ${items.length}`;
    empty?.toggleAttribute('hidden', shown > 0);
  };

  for (const button of buttons) {
    button.addEventListener('click', () => apply(button.dataset.filter!));
  }
}

/* Menu mobile ------------------------------------------------------------ */

const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menuPanel = document.querySelector<HTMLElement>('[data-menu-panel]');

if (menuButton && menuPanel) {
  const setOpen = (open: boolean) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuPanel.toggleAttribute('hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  menuButton.addEventListener('click', () => {
    setOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  menuPanel.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
