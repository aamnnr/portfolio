/**
 * Motion interaktif bertema alat ukur:
 * - progres gulir di tepi bawah header,
 * - parallax halus pada grid hero,
 * - kursor CAD di hero (crosshair yang menempel ke titik grid + koordinat),
 * - angka ringkasan yang "terbaca" naik saat pertama terlihat.
 *
 * Semuanya progresif dan diam bila pengguna memilih prefers-reduced-motion.
 * Satu loop requestAnimationFrame dipakai bersama dan hanya berjalan saat ada yang bergerak.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* Progres gulir + parallax ------------------------------------------------ */

const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
const parallaxLayers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
let parallaxOffset = 0; // dipakai crosshair untuk menyelaraskan sorotan grid

function onScroll() {
  const y = window.scrollY;
  if (progress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
  }
  if (!reduceMotion) {
    for (const layer of parallaxLayers) {
      const rect = layer.parentElement?.getBoundingClientRect();
      // Hanya selama hero masih terlihat; di luar itu tidak perlu dihitung.
      if (rect && rect.bottom < 0) continue;
      const k = Number(layer.dataset.parallax) || 0;
      parallaxOffset = Math.round(y * k);
      layer.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
    }
  }
}

let scrollQueued = false;
window.addEventListener(
  'scroll',
  () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      scrollQueued = false;
      onScroll();
    });
  },
  { passive: true },
);
window.addEventListener('resize', onScroll, { passive: true });
onScroll();

/* Kursor CAD di hero ------------------------------------------------------ */

const zone = document.querySelector<HTMLElement>('[data-crosshair-zone]');
const cross = document.querySelector<HTMLElement>('[data-crosshair]');
const readout = document.querySelector<HTMLElement>('[data-crosshair-readout]');

if (zone && cross && finePointer && !reduceMotion) {
  const GRID = 28; // sama dengan background-size .grid-paper
  const target = { x: 0, y: 0 }; // titik grid terdekat dari kursor
  const pos = { x: 0, y: 0 }; // posisi crosshair yang dihaluskan
  const glow = { x: 0, y: 0 }; // pusat sorotan grid (mengikuti kursor langsung)
  let running = false;
  let active = false;

  // Grid digambar dengan offset -1px; titik potongnya jatuh di kelipatan GRID - 1.
  const snap = (v: number) => Math.round((v + 1) / GRID) * GRID - 1;

  const render = () => {
    pos.x += (target.x - pos.x) * 0.25;
    pos.y += (target.y - pos.y) * 0.25;
    cross.style.setProperty('--cx', `${pos.x.toFixed(1)}px`);
    cross.style.setProperty('--cy', `${pos.y.toFixed(1)}px`);
    cross.style.setProperty('--mx', `${glow.x}px`);
    cross.style.setProperty('--my', `${glow.y - parallaxOffset}px`);
    // Loop berhenti begitu crosshair sampai di titiknya; gerakan kursor berikutnya memulainya lagi.
    if (Math.abs(target.x - pos.x) < 0.3 && Math.abs(target.y - pos.y) < 0.3) {
      running = false;
      return;
    }
    requestAnimationFrame(render);
  };

  const kick = () => {
    if (running) return;
    running = true;
    requestAnimationFrame(render);
  };

  zone.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    const rect = zone.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    glow.x = Math.round(x);
    glow.y = Math.round(y);
    target.x = snap(x);
    target.y = snap(y);
    if (!active) {
      // Masuk zona: langsung lompat ke titik, tanpa meluncur dari pojok.
      pos.x = target.x;
      pos.y = target.y;
      active = true;
      cross.classList.add('is-active');
    }
    if (readout) {
      const col = String(Math.round((target.x + 1) / GRID)).padStart(2, '0');
      const row = String(Math.round((target.y + 1) / GRID)).padStart(2, '0');
      readout.textContent = `X ${col} · Y ${row}`;
    }
    kick();
  });

  zone.addEventListener('pointerleave', () => {
    active = false;
    cross.classList.remove('is-active');
  });
}

/* Angka yang terbaca naik --------------------------------------------------- */

const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));

if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
  const run = (el: HTMLElement) => {
    const finalText = el.textContent?.trim() ?? '';
    const end = Number(finalText);
    const start = Number(el.dataset.count) || 0;
    if (!Number.isFinite(end)) return;
    const width = finalText.length;
    const duration = 900;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(start + (end - start) * eased)).padStart(width, '0');
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = finalText;
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        run(entry.target as HTMLElement);
      }
    },
    { threshold: 0.6 },
  );
  counters.forEach((el) => io.observe(el));
}
