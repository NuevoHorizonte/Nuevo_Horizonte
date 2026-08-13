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

  // === CONCEPTO REVOLUCIONARIO 1: ÓRBITA FUTURO 360° ===
  const orbitNodes = document.querySelectorAll(".orbit-node");
  const bgMain = document.getElementById("orbit-bg-main");
  const bgDynamic = document.getElementById("orbit-bg-dynamic");
  const hudBadge = document.getElementById("hud-badge");
  const hudTitle = document.getElementById("hud-title");
  const hudDesc = document.getElementById("hud-desc");
  const hudBtn = document.getElementById("hud-btn");
  const hudAutoToggle = document.getElementById("hud-auto-toggle");

  let activeIndex = 0;
  let autoOrbitActive = true;
  let autoOrbitInterval = null;

  // Posicionar geométricamente los 9 nodos alrededor de la órbita (elipse 3D)
  function positionOrbitNodes() {
    if (orbitNodes.length === 0) return;
    const totalNodes = orbitNodes.length;
    const radiusX = 260; // radio horizontal
    const radiusY = 170; // radio vertical

    orbitNodes.forEach((node, i) => {
      // Ajustar desfase de ángulo para centrar el primer nodo arriba
      const angle = (i / totalNodes) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radiusX;
      const y = Math.sin(angle) * radiusY;

      node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    });
  }

  // Activar nodo seleccionado
  function activateOrbitNode(index) {
    if (orbitNodes.length === 0) return;
    activeIndex = (index + orbitNodes.length) % orbitNodes.length;

    orbitNodes.forEach((n, idx) => {
      n.classList.toggle("active", idx === activeIndex);
    });

    const activeNode = orbitNodes[activeIndex];
    const bgUrl = activeNode.getAttribute("data-bg");
    const title = activeNode.getAttribute("data-title");
    const cat = activeNode.getAttribute("data-cat");
    const desc = activeNode.getAttribute("data-desc");
    const link = activeNode.getAttribute("data-link");
    const badgeColor = activeNode.getAttribute("data-badge");

    // Cambiar fondo dinámico con suavidad
    if (bgDynamic && bgUrl) {
      bgDynamic.src = bgUrl;
      bgDynamic.classList.add("active");
      if (bgMain) bgMain.style.opacity = "0";
    }

    // Actualizar HUD
    if (hudTitle) hudTitle.textContent = title;
    if (hudDesc) hudDesc.textContent = desc;
    if (hudBadge) {
      hudBadge.textContent = cat;
      hudBadge.className = `hud-badge ${badgeColor}`;
    }
    if (hudBtn) hudBtn.href = link;
  }

  // Hover & Click events en los nodos
  if (orbitNodes.length > 0) {
    orbitNodes.forEach((node, index) => {
      node.addEventListener("mouseenter", () => {
        activateOrbitNode(index);
      });

      node.addEventListener("click", () => {
        const link = node.getAttribute("data-link");
        if (link) window.location.href = link;
      });
    });

    // Auto-rotación de la órbita
    autoOrbitInterval = setInterval(() => {
      if (autoOrbitActive) {
        activateOrbitNode(activeIndex + 1);
      }
    }, 4000);

    if (hudAutoToggle) {
      hudAutoToggle.addEventListener("click", () => {
        autoOrbitActive = !autoOrbitActive;
        hudAutoToggle.textContent = autoOrbitActive ? "⏸️ Auto-Orbit" : "▶️ Auto-Orbit";
      });
    }

    // Inicialización
    positionOrbitNodes();
    activateOrbitNode(0);
  }


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




