/* ==========================================================================
   CARRITOS SNACKS JJR - SCRIPT INTERACTIVO
   Author: Google Antigravity IDE
   Version: 2.0 (Party Edition)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  console.log("🍿 Carritos Snacks JJR script cargado con éxito.");

  initHeaderNav();
  initHeroCarrusel();
  initSnacksFilter();
  initEventosOverlay();
  initFAQAccordion();
  initFooterYear();
});

/* --------------------------------------------------------------------------
   1. HEADER NAVEGACIÓN & MENÚ MÓVIL
   -------------------------------------------------------------------------- */
function initHeaderNav() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const menuItems = document.querySelectorAll(".menu-item");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
      }
    });
  }

  // Efecto hover para cambio de icono y texto en menú
  menuItems.forEach(item => {
    const img = item.querySelector("img");
    const span = item.querySelector("span");
    if (!img || !span) return;

    const originalSrc = img.getAttribute("src");
    const altSrc = img.getAttribute("data-alt");
    const originalText = span.textContent;

    item.addEventListener("mouseenter", () => {
      if (altSrc) img.setAttribute("src", altSrc);
      item.classList.add("hovered");

      if (item.classList.contains("menu-contacto")) {
        span.textContent = "919-283-481";
      }
    });

    item.addEventListener("mouseleave", () => {
      if (originalSrc) img.setAttribute("src", originalSrc);
      item.classList.remove("hovered");

      if (item.classList.contains("menu-contacto")) {
        span.textContent = originalText;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. CARRUSEL HERO CON CONTROLES (FLECHAS, DOTS Y AUTOPLAY)
   -------------------------------------------------------------------------- */
function initHeroCarrusel() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const carruselContainer = document.querySelector(".carrusel-container");

  if (slides.length === 0) return;

  let currentIdx = 0;
  let autoPlayTimer = null;

  function showSlide(n) {
    currentIdx = (n + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("activo", i === currentIdx);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("activo", i === currentIdx);
    });
  }

  function nextSlide() {
    showSlide(currentIdx + 1);
  }

  function prevSlide() {
    showSlide(currentIdx - 1);
  }

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, 7000);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  startAutoPlay();

  if (carruselContainer) {
    carruselContainer.addEventListener("mouseenter", stopAutoPlay);
    carruselContainer.addEventListener("mouseleave", startAutoPlay);
  }
}

/* --------------------------------------------------------------------------
   3. FILTRADO DE SNACKS (TODOS, DULCES, SALADOS, BEBIDAS)
   -------------------------------------------------------------------------- */
function initSnacksFilter() {
  const filterBtns = document.querySelectorAll(".btn-filtro");
  const snackItems = document.querySelectorAll(".item-snack");

  if (filterBtns.length === 0 || snackItems.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterBtns.forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");

      snackItems.forEach(item => {
        if (filter === "todos" || item.classList.contains(filter)) {
          item.classList.remove("oculto");
        } else {
          item.classList.add("oculto");
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. EVENTOS OVERLAY COLORS
   -------------------------------------------------------------------------- */
function initEventosOverlay() {
  document.querySelectorAll(".evento-card").forEach(card => {
    const color = card.dataset.color;
    if (color) {
      card.style.setProperty("--overlay-color", `${color}dd`);
    }
  });
}

/* --------------------------------------------------------------------------
   5. PREGUNTAS FRECUENTES (FAQ)
   -------------------------------------------------------------------------- */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach(otherItem => otherItem.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. AÑO ACTUAL EN EL FOOTER
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
