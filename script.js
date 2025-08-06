function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Tambahkan ke script.js untuk semua halaman proyek
function initAllProjectPages() {
  // Inisialisasi galeri
  initProjectGallery();
  
  // Highlight nav link aktif
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href').includes(currentPage)) {
      link.classList.add('active');
    }
  });
  
  // Efek scroll halus untuk anchor link
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initAllProjectPages);


    // Get the modal
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");

    // Get all thumbnail images
    const thumbnails = document.querySelectorAll(".thumbnail-grid img");

    // When user clicks on thumbnail
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener("click", function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
      });
    });

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }


