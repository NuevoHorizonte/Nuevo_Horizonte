/* ==========================================================================
   ACADEMIA SPORT VICTORIA - INTERACTIVE JAVASCRIPT
   Author: Google Antigravity IDE
   Version: 2.0 (Extraordinary Edition)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Sport Victoria Academy script initialized cleanly.");

  initHeaderNav();
  initHeroStats();
  initMainCarousel();
  initGalleryFilterAndLightbox();
  initFAQAccordion();
  initFooterYear();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER & MOBILE HAMBURGER MENU
   -------------------------------------------------------------------------- */
function initHeaderNav() {
  const header = document.getElementById("main-header");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!header || !hamburgerBtn || !navMenu) return;

  // Header scroll shadow toggle
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Toggle mobile navigation
  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburgerBtn.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!header.contains(e.target) && navMenu.classList.contains("active")) {
      hamburgerBtn.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

/* --------------------------------------------------------------------------
   2. HERO STATS COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initHeroStats() {
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  if (statNumbers.length === 0) return;

  let animated = false;

  const animateStats = () => {
    const heroSection = document.querySelector(".hero-stats");
    if (!heroSection) return;

    const rect = heroSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && !animated) {
      animated = true;

      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute("data-target"), 10);
        let count = 0;
        const duration = 1800; // ms
        const increment = Math.ceil(target / (duration / 20));

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            stat.textContent = target.toLocaleString() + "+";
            clearInterval(timer);
          } else {
            stat.textContent = count.toLocaleString() + "+";
          }
        }, 20);
      });
    }
  };

  window.addEventListener("scroll", animateStats);
  animateStats(); // check on initial load
}

/* --------------------------------------------------------------------------
   3. MAIN ADAPTIVE IMAGE CARROUSEL & SWIPE
   -------------------------------------------------------------------------- */
function initMainCarousel() {
  const carousel = document.querySelector(".carousel");
  const container = document.querySelector(".carousel-container");
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".carousel-arrow.prev");
  const nextBtn = document.querySelector(".carousel-arrow.next");

  if (!carousel || !container || slides.length === 0) return;

  // Responsive image sets
  const imageSets = {
    400: [
      "../../img/academia/movil400-inicio.webp",
      "../../img/academia/movil400-natacion.webp",
      "../../img/academia/movil400-futbol.webp",
      "../../img/academia/movil400-voley.webp",
      "../../img/academia/movil400-danza.webp"
    ],
    600: [
      "../../img/academia/movil600-inicio.webp",
      "../../img/academia/movil600-natacion.webp",
      "../../img/academia/movil600-futbol.webp",
      "../../img/academia/movil600-voley.webp",
      "../../img/academia/movil600-danza.webp"
    ],
    900: [
      "../../img/academia/movil900-inicio.webp",
      "../../img/academia/movil900-natacion.webp",
      "../../img/academia/movil900-futbol.webp",
      "../../img/academia/movil900-voley.webp",
      "../../img/academia/movil900-danza.webp"
    ],
    desktop: [
      "../../img/academia/academia-carrusel-inicio.webp",
      "../../img/academia/carrusel-natacion.webp",
      "../../img/academia/carrusel-futbol.webp",
      "../../img/academia/carrusel-voley.webp",
      "../../img/academia/carrusel-danza.webp"
    ]
  };

  const getImageSet = () => {
    const width = window.innerWidth;
    if (width <= 400) return imageSets[400];
    if (width <= 600) return imageSets[600];
    if (width <= 900) return imageSets[900];
    return imageSets.desktop;
  };

  const updateCarouselImages = () => {
    const images = getImageSet();
    slides.forEach((slide, i) => {
      const img = slide.querySelector("img");
      if (img && images[i]) {
        img.src = images[i];
      }
    });
  };

  updateCarouselImages();
  window.addEventListener("resize", updateCarouselImages);

  let current = 0;
  let autoSlideInterval;

  const arrowImages = [
    { prev: "../../img/academia/flecha-azul-izquierda.svg", next: "../../img/academia/flecha-azul-derecha.svg" },
    { prev: "../../img/academia/flecha-celeste-izquierda.svg", next: "../../img/academia/flecha-celeste-derecha.svg" },
    { prev: "../../img/academia/flecha-verde-izquierda.svg", next: "../../img/academia/flecha-verde-derecha.svg" },
    { prev: "../../img/academia/flecha-roja-izquierda.svg", next: "../../img/academia/flecha-roja-derecha.svg" },
    { prev: "../../img/academia/flecha-morada-izquierda.svg", next: "../../img/academia/flecha-morada-derecha.svg" }
  ];

  const dotColors = ["#005bbb", "#0099cc", "#0b8a00", "#e80606", "#8000ff"];

  const showSlide = (index) => {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    current = index;

    container.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot, i) => {
      const isActive = i === current;
      dot.classList.toggle("active", isActive);
      dot.style.backgroundColor = isActive ? dotColors[current] : "rgba(255, 255, 255, 0.6)";
    });

    if (prevBtn && nextBtn && arrowImages[current]) {
      prevBtn.src = arrowImages[current].prev;
      nextBtn.src = arrowImages[current].next;
    }
  };

  const nextSlide = () => showSlide(current + 1);
  const prevSlide = () => showSlide(current - 1);

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-index"), 10);
      if (!isNaN(idx)) showSlide(idx);
    });
  });

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 3500);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
  };

  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

  // Touch Swipe Gesture
  let touchStartX = 0;
  let touchEndX = 0;
  const MIN_SWIPE = 40;

  container.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener("touchend", () => {
    const swipeDist = touchEndX - touchStartX;
    if (Math.abs(swipeDist) > MIN_SWIPE && touchEndX !== 0) {
      if (swipeDist < 0) nextSlide();
      else prevSlide();
    }
    touchStartX = 0;
    touchEndX = 0;
  });

  showSlide(0);
  startAutoSlide();
}

/* --------------------------------------------------------------------------
   4. GALLERY FILTERING & LIGHTBOX PREVIEW
   -------------------------------------------------------------------------- */
function initGalleryFilterAndLightbox() {
  const filterBtns = document.querySelectorAll(".galeria-filtros button");
  const items = Array.from(document.querySelectorAll(".galeria-item"));
  const gridWrapper = document.querySelector(".galeria-grid-wrapper");

  // Filtering
  if (filterBtns.length > 0 && items.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");

        const filter = btn.getAttribute("data-filter");

        items.forEach(item => {
          if (filter === "todo" || item.classList.contains(filter)) {
            item.classList.remove("oculto");
          } else {
            item.classList.add("oculto");
          }
        });
      });
    });
  }

  // Lightbox Modal
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");
  const modalCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".lightbox-close");

  if (!modal || !modalImg) return;

  items.forEach(item => {
    item.addEventListener("click", () => {
      const imgSrc = item.getAttribute("data-lightbox") || item.querySelector("img")?.src;
      const caption = item.getAttribute("data-caption") || item.querySelector("img")?.alt || "";

      if (imgSrc) {
        modalImg.src = imgSrc;
        if (modalCaption) modalCaption.textContent = caption;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // block background scroll
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   5. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach(otherItem => otherItem.classList.remove("active"));

      // Toggle clicked item
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. FOOTER COPYRIGHT YEAR
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
