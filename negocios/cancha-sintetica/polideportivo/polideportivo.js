document.addEventListener("DOMContentLoaded", () => {

  /* ─────────────────────────────
     1. HEADER MENU & SCROLL EFFECT
  ───────────────────────────── */
  const btnMenu = document.getElementById("btn-menu") || document.querySelector(".btn-izquierda");
  const barra = document.getElementById("header-rect") || document.querySelector(".rectangulo-superior");
  const headerWrapper = document.querySelector(".header-wrapper");
  const menuLinks = document.querySelectorAll(".menu-nav-link, .acceso");

  if (btnMenu && barra) {
    // Abrir / Cerrar menú
    btnMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      barra.classList.toggle("expandido");
    });

    // Cerrar menú al hacer clic en cualquier enlace
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        barra.classList.remove("expandido");
      });
    });

    // Cerrar al hacer clic fuera del header
    document.addEventListener("click", (e) => {
      if (barra.classList.contains("expandido") && !barra.contains(e.target)) {
        barra.classList.remove("expandido");
      }
    });

    // Header scroll background effect
    window.addEventListener("scroll", () => {
      if (headerWrapper) {
        headerWrapper.classList.toggle("header-scroll", window.scrollY > 15);
      }
    }, { passive: true });
  }

  /* ─────────────────────────────
     2. CARRUSEL 3D EN ARCO
  ───────────────────────────── */
  const carouselItems = Array.from(document.querySelectorAll(".img-box"));
  const totalCarousel = carouselItems.length;
  let offset = 0;
  let runningCarousel = true;

  function getSpeed() {
    const w = window.innerWidth;
    if (w <= 400) return 0.0065;
    if (w <= 800) return 0.005;
    return 0.003;
  }

  function animateCarousel() {
    if (!runningCarousel || totalCarousel === 0) return;

    offset += getSpeed();
    const w = window.innerWidth;
    const isMobile = w <= 800;
    const isSmallMobile = w <= 400;

    const scale = isMobile ? (isSmallMobile ? 0.9 : 0.95) : 1;
    const spacing = isMobile ? (isSmallMobile ? 220 : 280) : 420;
    const curveY = isMobile ? (isSmallMobile ? 70 : 90) : 120;
    const rotation = isMobile ? 5 : 8;

    carouselItems.forEach((item, i) => {
      let index = (i - offset) % totalCarousel;
      if (index < -totalCarousel / 2) index += totalCarousel;
      if (index > totalCarousel / 2) index -= totalCarousel;

      const absIndex = Math.abs(index);

      if ((isMobile && absIndex > 1.8) || (!isMobile && absIndex > 4)) {
        item.style.opacity = "0";
        return;
      }

      let opacity = 1;
      if (isMobile && absIndex > 1) {
        opacity = 1 - (absIndex - 1) / 0.8;
      }

      const x = index * spacing;
      const baseLift = isMobile ? (isSmallMobile ? -100 : -80) : 0;
      const y = isMobile ? absIndex * curveY + baseLift : Math.pow(absIndex, 2) * curveY;
      const rotate = index * rotation;

      item.style.opacity = opacity;
      item.style.transform = `
        translate(-50%, -50%)
        translateX(${x}px)
        translateY(${y}px)
        rotate(${rotate}deg)
        scale(${scale})
      `;
      item.style.zIndex = Math.round(100 - absIndex);
    });

    requestAnimationFrame(animateCarousel);
  }

  document.addEventListener("visibilitychange", () => {
    runningCarousel = !document.hidden;
    if (runningCarousel) requestAnimationFrame(animateCarousel);
  });

  if (totalCarousel > 0) {
    animateCarousel();
  }

  /* ─────────────────────────────
     3. CROQUIS INTERACTIVO & TOOLTIP
  ───────────────────────────── */
  const flechaWrappers = document.querySelectorAll(".flecha-wrapper");
  const croquisTooltip = document.getElementById("croquis-tooltip");
  const tooltipTitle = croquisTooltip?.querySelector(".tooltip-title");
  const tooltipDesc = croquisTooltip?.querySelector(".tooltip-desc");
  let tooltipTimeout;

  if (croquisTooltip && flechaWrappers.length > 0) {
    flechaWrappers.forEach((pin) => {
      const showTooltip = () => {
        clearTimeout(tooltipTimeout);
        const title = pin.getAttribute("data-title") || "";
        const desc = pin.getAttribute("data-desc") || "";

        flechaWrappers.forEach((p) => p.classList.remove("active"));
        pin.classList.add("active");

        if (tooltipTitle) tooltipTitle.textContent = title;
        if (tooltipDesc) tooltipDesc.textContent = desc;
        croquisTooltip.classList.add("visible");
      };

      const hideTooltip = () => {
        tooltipTimeout = setTimeout(() => {
          pin.classList.remove("active");
          croquisTooltip.classList.remove("visible");
        }, 1200);
      };

      pin.addEventListener("mouseenter", showTooltip);
      pin.addEventListener("mouseleave", hideTooltip);
      pin.addEventListener("click", (e) => {
        e.stopPropagation();
        showTooltip();
      });
    });

    document.addEventListener("click", () => {
      croquisTooltip.classList.remove("visible");
      flechaWrappers.forEach((p) => p.classList.remove("active"));
    });
  }

  /* ─────────────────────────────
     4. SLIDER CIRCULAR INTERACTIVO
  ───────────────────────────── */
  const slides = document.querySelectorAll(".circulo-slider .slide");
  const ring = document.querySelector(".progress-ring");
  const infoBox = document.querySelector(".info-alquiler");
  const infoTitulo = document.querySelector(".info-titulo");
  const infoTexto = document.querySelector(".info-texto");
  const btnReservaDinamico = document.getElementById("btnReservaDinamico");
  const btnPrevSlide = document.getElementById("btnPrevSlide");
  const btnNextSlide = document.getElementById("btnNextSlide");
  const sliderPills = document.querySelectorAll(".pill-btn");

  const DATA_SERVICIOS = [
    {
      titulo: "CANCHA GRANDE DE FÚTBOL",
      texto: "Cancha sintética para partidos completos y campeonatos.\n\nCapacidad: 11 vs 11 jugadores\nÁrea: 25 × 25 m²\nIncluye: Balón profesional, reflectores LED y chalecos.",
      ctaText: "¡Reservar Cancha Grande!",
      ctaIcon: "⚽",
      waText: "Hola, quisiera reservar la Cancha Grande de Fútbol en el Polideportivo Huando"
    },
    {
      titulo: "CANCHA PEQUEÑA DE FÚTBOL",
      texto: "Cancha sintética ideal para pichangas rápidas y entrenamientos tácticos.\n\nCapacidad: 6 vs 6 jugadores\nÁrea: 15 × 15 m²\nIncluye: Grass acolchado de última generación y balones.",
      ctaText: "¡Reservar Cancha Pequeña!",
      ctaIcon: "⚽",
      waText: "Hola, quisiera reservar la Cancha Pequeña de Fútbol en el Polideportivo Huando"
    },
    {
      titulo: "CANCHA DE VÓLEY",
      texto: "Cancha acondicionada para partidos recreativos y torneos de vóley.\n\nCapacidad: 12 jugadores (6 vs 6)\nÁrea: 10 × 10 m²\nIncluye: Red profesional tensada y balón de vóley.",
      ctaText: "¡Reservar Cancha de Vóley!",
      ctaIcon: "🏐",
      waText: "Hola, quisiera reservar la Cancha de Vóley en el Polideportivo Huando"
    },
    {
      titulo: "BUMPERBALLS (FÚTBOL BURBUJA)",
      texto: "Divertidísima actividad de fútbol dentro de burbujas inflables gigantes.\n\nIdeal para: Cumpleaños, grupos de amigos y eventos de integración.\nCapacidad: Hasta 10 burbujas simultáneas.",
      ctaText: "¡Cotizar Bumperballs!",
      ctaIcon: "🎈",
      waText: "Hola, quisiera información y precios sobre los Bumperballs en el Polideportivo Huando"
    },
    {
      titulo: "PASEOS EN CUATRIMOTOS",
      texto: "Circuito y recorrido guiado por las áreas del polideportivo campestre.\n\nCapacidad: 1 a 2 personas por unidad\nIncluye: Equipo de seguridad y orientación del instructor.",
      ctaText: "¡Consultar Cuatrimotos!",
      ctaIcon: "🏎️",
      waText: "Hola, quisiera consultar sobre el circuito de Cuatrimotos en el Polideportivo Huando"
    }
  ];

  const SEGMENTS = 60;
  const DURATION = 5000;

  let currentSlide = 0;
  let currentSegment = 0;
  let sliderInterval;
  let isHovered = false;

  // Generar segmentos del anillo
  if (ring) {
    ring.innerHTML = "";
    for (let i = 0; i < SEGMENTS; i++) {
      const span = document.createElement("span");
      span.style.transform = `rotate(${(360 / SEGMENTS) * i}deg)`;
      ring.appendChild(span);
    }
  }

  const segments = ring ? ring.querySelectorAll("span") : [];

  function updateInfo(index) {
    if (!infoBox || !DATA_SERVICIOS[index]) return;

    infoBox.classList.remove("activo");
    setTimeout(() => {
      if (infoTitulo) infoTitulo.textContent = DATA_SERVICIOS[index].titulo;
      if (infoTexto) infoTexto.textContent = DATA_SERVICIOS[index].texto;

      if (btnReservaDinamico) {
        const item = DATA_SERVICIOS[index];
        const iconSpan = btnReservaDinamico.querySelector(".btn-icon");
        const textSpan = btnReservaDinamico.querySelector(".btn-text");

        if (iconSpan) iconSpan.textContent = item.ctaIcon;
        if (textSpan) textSpan.textContent = item.ctaText;

        btnReservaDinamico.href = `https://wa.me/51905448644?text=${encodeURIComponent(item.waText)}`;
      }

      // Actualizar pills
      sliderPills.forEach((p, idx) => {
        p.classList.toggle("active", idx === index);
      });

      infoBox.classList.add("activo");
    }, 180);
  }

  function startProgress() {
    currentSegment = 0;
    segments.forEach((s) => s.classList.remove("active"));
    clearInterval(sliderInterval);

    sliderInterval = setInterval(() => {
      if (isHovered) return; // Pausa al pasar el mouse

      if (currentSegment < SEGMENTS) {
        if (segments[currentSegment]) {
          segments[currentSegment].classList.add("active");
        }
        currentSegment++;
      } else {
        changeSlide((currentSlide + 1) % slides.length);
      }
    }, DURATION / SEGMENTS);
  }

  function changeSlide(nextIndex) {
    if (slides.length === 0) return;

    slides[currentSlide]?.classList.remove("active");
    currentSlide = nextIndex;
    slides[currentSlide]?.classList.add("active");

    updateInfo(currentSlide);
    startProgress();
  }

  // Controles del slider
  if (btnPrevSlide) {
    btnPrevSlide.addEventListener("click", () => {
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      changeSlide(prevIndex);
    });
  }

  if (btnNextSlide) {
    btnNextSlide.addEventListener("click", () => {
      const nextIndex = (currentSlide + 1) % slides.length;
      changeSlide(nextIndex);
    });
  }

  sliderPills.forEach((pill, idx) => {
    pill.addEventListener("click", () => {
      changeSlide(idx);
    });
  });

  const sliderWrapper = document.querySelector(".cuadro-verde-alquiler");
  if (sliderWrapper) {
    sliderWrapper.addEventListener("mouseenter", () => { isHovered = true; });
    sliderWrapper.addEventListener("mouseleave", () => { isHovered = false; });
  }

  if (slides.length > 0) {
    updateInfo(0);
    startProgress();
  }

  /* ─────────────────────────────
     5. STICKY EVENTOS SCROLL OBSERVER
  ───────────────────────────── */
  const eventoItems = document.querySelectorAll(".evento-item");
  const eventosWrapper = document.querySelector(".eventos-info");
  const tituloEventos = document.querySelector(".titulo-eventos");

  function updateEventosOnScroll() {
    if (!eventosWrapper || !tituloEventos || eventoItems.length === 0) return;

    const wrapperTop = eventosWrapper.getBoundingClientRect().top;
    const tituloBottom = tituloEventos.getBoundingClientRect().bottom;

    eventoItems.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const nextItem = eventoItems[index + 1];
      const nextRect = nextItem?.getBoundingClientRect();

      if (wrapperTop <= tituloBottom + 2) {
        item.classList.add("linea-oculta");
      } else {
        item.classList.remove("linea-oculta");
      }

      if (nextRect && nextRect.top <= itemRect.top + 40) {
        item.classList.add("no-sticky");
      } else {
        item.classList.remove("no-sticky");
      }
    });
  }

  window.addEventListener("scroll", updateEventosOnScroll, { passive: true });
  window.addEventListener("resize", updateEventosOnScroll, { passive: true });
  updateEventosOnScroll();

  /* ─────────────────────────────
     6. FILTRO DE GALERÍA
  ───────────────────────────── */
  const filtros = document.querySelectorAll(".galeria-filtros button");
  const galleryItems = Array.from(document.querySelectorAll(".galeria-item"));
  const galleryGrid = document.querySelector(".galeria-grid");
  const galleryWrapper = document.querySelector(".galeria-grid-wrapper");
  const ANIM_DUR = 500;

  function getVisibles(filter) {
    return filter === "todo"
      ? galleryItems.slice()
      : galleryItems.filter((i) => i.classList.contains(filter));
  }

  function applyFilter(filter) {
    if (!galleryWrapper || !galleryGrid || galleryItems.length === 0) return;

    const startHeight = galleryWrapper.offsetHeight;
    const visibles = getVisibles(filter);
    const ocultos = galleryItems.filter((i) => !visibles.includes(i));

    galleryItems.forEach((it) => it.classList.add("oculto"));
    visibles.forEach((v) => galleryGrid.appendChild(v));
    ocultos.forEach((h) => galleryGrid.appendChild(h));
    void galleryGrid.offsetWidth;

    ocultos.forEach((h) => {
      h.__oldDisplay = h.style.display;
      h.style.display = "none";
    });

    requestAnimationFrame(() => {
      const endHeight = galleryGrid.scrollHeight;

      ocultos.forEach((h) => {
        h.style.display = h.__oldDisplay || "";
      });

      galleryWrapper.style.height = `${startHeight}px`;
      void galleryWrapper.offsetWidth;
      galleryWrapper.classList.add("animando");

      requestAnimationFrame(() => {
        galleryWrapper.style.height = `${endHeight}px`;
      });

      setTimeout(() => {
        galleryWrapper.classList.remove("animando");
        galleryWrapper.style.height = filter === "todo" ? "auto" : `${endHeight}px`;
      }, ANIM_DUR);

      setTimeout(() => {
        visibles.forEach((v) => v.classList.remove("oculto"));
      }, 40);
    });
  }

  filtros.forEach((btn) => {
    btn.addEventListener("click", () => {
      filtros.forEach((b) => b.classList.remove("activo"));
      btn.classList.add("activo");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });

  /* ─────────────────────────────
     7. LIGHTBOX MODAL PARA GALERÍA
  ───────────────────────────── */
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  let currentGalleryIndex = 0;
  let activeGalleryItems = [];

  function openLightbox(index) {
    activeGalleryItems = galleryItems.filter((it) => !it.classList.contains("oculto") && it.style.display !== "none");
    if (activeGalleryItems.length === 0) activeGalleryItems = galleryItems;

    currentGalleryIndex = index;
    const item = activeGalleryItems[currentGalleryIndex];
    if (!item || !lightboxModal || !lightboxImg) return;

    const fullSrc = item.getAttribute("data-full") || item.querySelector("img")?.src;
    const caption = item.getAttribute("data-caption") || item.querySelector("img")?.alt || "";

    lightboxImg.src = fullSrc;
    if (lightboxCaption) lightboxCaption.textContent = caption;

    lightboxModal.classList.add("activo");
    lightboxModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove("activo");
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function showNextImage() {
    if (activeGalleryItems.length <= 1) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % activeGalleryItems.length;
    openLightbox(currentGalleryIndex);
  }

  function showPrevImage() {
    if (activeGalleryItems.length <= 1) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + activeGalleryItems.length) % activeGalleryItems.length;
    openLightbox(currentGalleryIndex);
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      activeGalleryItems = galleryItems.filter((it) => !it.classList.contains("oculto") && it.style.display !== "none");
      const idx = activeGalleryItems.indexOf(item);
      openLightbox(idx >= 0 ? idx : 0);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener("click", showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener("click", showPrevImage);

  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Teclado (ESC, Izquierda, Derecha)
  document.addEventListener("keydown", (e) => {
    if (!lightboxModal?.classList.contains("activo")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNextImage();
    if (e.key === "ArrowLeft") showPrevImage();
  });

  /* ─────────────────────────────
     8. ACORDEÓN PREGUNTAS FRECUENTES (FAQ)
  ───────────────────────────── */
  const faqCards = document.querySelectorAll(".faq-card");

  faqCards.forEach((card) => {
    const questionBtn = card.querySelector(".faq-question");

    questionBtn?.addEventListener("click", () => {
      const isOpen = card.classList.contains("open");

      // Cerrar las demás preguntas abiertas
      faqCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove("open");
          otherCard.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
        }
      });

      // Alternar la pregunta clickeada
      card.classList.toggle("open", !isOpen);
      questionBtn.setAttribute("aria-expanded", !isOpen ? "true" : "false");
    });
  });

  /* ─────────────────────────────
     9. AÑO DINÁMICO EN FOOTER
  ───────────────────────────── */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});


