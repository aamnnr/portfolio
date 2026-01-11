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
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => observer.observe(section));
}

// Highlight active nav link
function highlightActiveNav() {
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href").includes(currentPage)) {
      link.classList.add("active");
    }
  });
}

// Smooth scroll for anchor links
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth" });
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

  document.body.addEventListener("click", (e) => {
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
  highlightActiveNav();
  smoothScroll();
  initLazyAnimation();
  initModalGallery();
});

// Mobile menu functionality
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Horizontal Scroll Functionality - FIXED VERSION
function initializeHorizontalScroll() {
  console.log("Initializing horizontal scroll...");

  // Initialize Experience Section
  const experienceScroll = document.getElementById("experience-scroll");
  const experienceIndicators = document.getElementById("experience-indicators");

  if (experienceScroll && experienceIndicators) {
    console.log("Found experience scroll elements");
    setupScrollSection(experienceScroll, experienceIndicators);
  } else {
    console.log("Experience scroll elements not found");
  }

  // Initialize Projects Section
  const projectsScroll = document.getElementById("projects-scroll");
  const projectsIndicators = document.getElementById("projects-indicators");

  if (projectsScroll && projectsIndicators) {
    console.log("Found projects scroll elements");
    setupScrollSection(projectsScroll, projectsIndicators);
  } else {
    console.log("Projects scroll elements not found");
  }
}

function setupScrollSection(scrollContainer, indicatorsContainer) {
  const items = scrollContainer.children;
  const indicators = indicatorsContainer.children;

  console.log(
    `Setting up scroll section with ${items.length} items and ${indicators.length} indicators`
  );

  // Function to update active indicator
  const updateActiveIndicator = () => {
    const scrollLeft = scrollContainer.scrollLeft;
    const containerWidth = scrollContainer.offsetWidth;
    const itemWidth = items[0].offsetWidth + 24; // width + gap

    const activeIndex = Math.min(
      Math.round(scrollLeft / itemWidth),
      items.length - 1
    );

    // Update all indicators
    Array.from(indicators).forEach((indicator, index) => {
      indicator.classList.toggle("active", index === activeIndex);
    });

    console.log(`Scroll position: ${scrollLeft}, Active index: ${activeIndex}`);
  };

  // Update indicators on scroll
  scrollContainer.addEventListener("scroll", updateActiveIndicator);

  // Click indicator to scroll to specific item
  Array.from(indicators).forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      const itemWidth = items[0].offsetWidth + 24;
      scrollContainer.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      });
    });
  });

  // Update on window resize
  window.addEventListener("resize", updateActiveIndicator);

  // Initial update
  updateActiveIndicator();
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing scripts...");
  initializeHorizontalScroll();
});

// Re-initialize on window resize
window.addEventListener("resize", initializeHorizontalScroll);
