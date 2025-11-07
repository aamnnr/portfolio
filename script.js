// Toggle hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu?.classList.toggle("open");
  icon?.classList.toggle("open");
}

// Lazy section animation
function initLazyAnimation() {
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
}

// Highlight active nav link
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href').includes(currentPage)) {
      link.classList.add('active');
    }
  });
}

// Smooth scroll for anchor links
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Image modal gallery (delegation-based)
function initModalGallery() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  if (!modal) return;

  document.body.addEventListener("click", e => {
    if (e.target.matches(".thumbnail-grid img")) {
      modal.style.display = "block";
      modalImg.src = e.target.src;
      captionText.textContent = e.target.alt || "";
    } else if (e.target === modal || e.target === closeBtn) {
      modal.style.display = "none";
    }
  });
}

// Initialize all features
document.addEventListener("DOMContentLoaded", () => {
  toggleMenu();
  highlightActiveNav();
  smoothScroll();
  initLazyAnimation();
  initModalGallery();
});
