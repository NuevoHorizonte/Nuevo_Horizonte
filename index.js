document.addEventListener("DOMContentLoaded", () => {
  // === AÑO DINÁMICO EN FOOTER ===
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // === MENÚ MÓVIL (HAMBURGUESA) ===
  const hamburger = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    // Abrir/cerrar hamburguesa SOLO en móvil
    hamburger.addEventListener("click", () => {
      if (window.innerWidth > 1240) return;
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("show");
    });

    // Cerrar menú al hacer clic fuera SOLO en móvil
    document.addEventListener("click", (e) => {
      if (window.innerWidth > 1240) return;
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("show");
      }
    });

    // Cerrar hamburguesa cuando tocan un enlace FINAL
    document.querySelectorAll(".mega-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth > 1240) return;
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("show");
      });
    });
  }

  // === ACORDEÓN MÓVIL (solo uno abierto a la vez) ===
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      if (window.innerWidth > 1240) return;

      e.preventDefault();

      const currentMenu = toggle.parentElement.querySelector(".mega-menu");

      if (currentMenu && currentMenu.classList.contains("open")) {
        currentMenu.classList.remove("open");
        return;
      }

      document.querySelectorAll(".mega-dropdown .mega-menu.open").forEach((menu) => {
        if (menu !== currentMenu) menu.classList.remove("open");
      });

      if (currentMenu) currentMenu.classList.add("open");
    });
  });

  // === CONTROL DE SCROLL (HEADER Y BOTÓN VOLVER ARRIBA) ===
  const header = document.querySelector("header");
  const scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

    if (window.scrollY > 300) {
      scrollToTopBtn?.classList.add("show");
    } else {
      scrollToTopBtn?.classList.remove("show");
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // === ROMPECABEZAS (HERO DESKTOP) ===
  const piezas = document.querySelectorAll(".pieza");
  const imagenes = document.querySelectorAll(".pieza img");

  // Pre-carga inmediata de imágenes hover para cero latencia
  imagenes.forEach((img) => {
    const hoverUrl = img.getAttribute("data-hover");
    if (hoverUrl) {
      const preloadImg = new Image();
      preloadImg.src = hoverUrl;
    }
  });

  /* === ANIMACIÓN DE ENTRADA E INTERACTIVIDAD INSTANTÁNEA === */
  piezas.forEach((pieza, index) => {
    pieza.classList.add("hover-enabled");
    pieza.style.pointerEvents = "auto";
    setTimeout(() => {
      pieza.classList.add("activo");
    }, index * 150);
  });

  /* === CAMBIO SUAVE DE IMAGEN Y NAVEGACIÓN === */
  imagenes.forEach((img) => {
    const original = img.src;
    const hoverImg = img.getAttribute("data-hover");

    img.addEventListener("mouseenter", () => {
      if (hoverImg) img.src = hoverImg;
    });

    img.addEventListener("mouseleave", () => {
      img.src = original;
    });

    img.addEventListener("click", () => {
      const link = img.getAttribute("data-link");
      if (link) window.location.href = link;
    });
  });


  // === PREGUNTAS FRECUENTES (FAQ ACCORDION) ===

  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains("active");

      // Cerrar otros elementos activos
      document.querySelectorAll(".faq-item.active").forEach((item) => {
        if (item !== faqItem) item.classList.remove("active");
      });

      // Alternar elemento actual
      if (isActive) {
        faqItem.classList.remove("active");
      } else {
        faqItem.classList.add("active");
      }
    });
  });
});




