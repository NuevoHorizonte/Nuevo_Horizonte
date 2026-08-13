/* ==========================================================================
   CANCHAS SINTÉTICAS SPORT VICTORIA - INTERACTIVE JS
   Author: Google Antigravity IDE
   Version: 2.0 (Extraordinary Edition)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  console.log("⚽ Sport Victoria Canchas Sintéticas JS listo.");

  initHeaderNav();
  initFieldSwitcher();
  initGalleryFilterAndLightbox();
  initFAQAccordion();
  initFooterYear();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER & MENÚ MÓVIL
   -------------------------------------------------------------------------- */
function initHeaderNav() {
  const header = document.getElementById("main-header");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!header || !hamburgerBtn || !navMenu) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburgerBtn.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!header.contains(e.target) && navMenu.classList.contains("active")) {
      hamburgerBtn.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

/* --------------------------------------------------------------------------
   2. SELECTOR INTERACTIVO DE CANCHAS (PINOS VS BRISAS)
   -------------------------------------------------------------------------- */
function initFieldSwitcher() {
  const botones = document.querySelectorAll(".selector-btn-wrapper");
  const img = document.getElementById("cancha-image");
  const miniBtn = document.getElementById("mini-btn");
  const miniBtnLink = document.getElementById("mini-btn-link");
  const title = document.getElementById("cancha-title");
  const desc = document.getElementById("cancha-desc");
  const badgeOverlay = document.getElementById("cancha-badge-overlay");
  const btnWaCancha = document.getElementById("btn-wa-cancha");
  const featuresList = document.getElementById("cancha-features-list");

  const sedesData = {
    pinos: {
      img: "../../../img/canchas-carabayllo/pinos-img.png",
      miniBtn: "../../../img/canchas-carabayllo/mapa-pinos.svg",
      mapUrl: "https://maps.app.goo.gl/zKjqeW65dJeSee81A",
      title: "Sede Cancha Los Pinos",
      badge: "📍 Sede Los Pinos",
      desc: "Campo sintético premium de fútbol 7 y 8, totalmente enmallado con césped acolchado de última generación e iluminación LED para partidos nocturnos.",
      waUrl: "https://wa.me/51963666205?text=Hola,%20deseo%20reservar%20en%20la%20Sede%20Los%20Pinos",
      features: [
        "⚽ Fútbol 7 y Fútbol 8",
        "💡 Iluminación LED Nocturna",
        "🚿 Vestuarios y SSHH",
        "🎽 Chalecos y Balón Incluidos"
      ]
    },
    brisas: {
      img: "../../../img/canchas-carabayllo/brisas-img.png",
      miniBtn: "../../../img/canchas-carabayllo/mapa-brisas.svg",
      mapUrl: "https://maps.app.goo.gl/qUA4BQsMQPLgYjtY7",
      title: "Sede Cancha Las Brisas",
      badge: "📍 Sede Las Brisas",
      desc: "Gran complejo multideportivo para fútbol y vóley con amplias tribunas para la hinchada, estacionamiento vigilado y cafetería/snacks.",
      waUrl: "https://wa.me/51963666205?text=Hola,%20deseo%20reservar%20en%20la%20Sede%20Las%20Brisas",
      features: [
        "⚽ Canchas de Fútbol y Vóley",
        "🏟️ Tribunas para Hinchada",
        "🚗 Estacionamiento Privado",
        "🥤 Bebidas y Snacks Helados"
      ]
    }
  };

  if (botones.length === 0 || !img) return;

  botones.forEach(btnWrapper => {
    btnWrapper.addEventListener("click", () => {
      const target = btnWrapper.getAttribute("data-target");
      const data = sedesData[target];
      if (!data) return;

      // Resaltar botón activo
      botones.forEach(b => b.classList.remove("activo"));
      btnWrapper.classList.add("activo");

      // Transición suave
      img.classList.add("fade");
      if (miniBtn) miniBtn.classList.add("fade");

      setTimeout(() => {
        img.src = data.img;
        if (miniBtn) miniBtn.src = data.miniBtn;
        if (miniBtnLink) miniBtnLink.href = data.mapUrl;
        if (title) title.textContent = data.title;
        if (desc) desc.textContent = data.desc;
        if (badgeOverlay) badgeOverlay.textContent = data.badge;
        if (btnWaCancha) btnWaCancha.href = data.waUrl;

        if (featuresList) {
          featuresList.innerHTML = data.features
            .map(feat => `<div class="cancha-feat-item">${feat}</div>`)
            .join("");
        }

        img.classList.remove("fade");
        if (miniBtn) miniBtn.classList.remove("fade");
      }, 250);
    });
  });
}

/* --------------------------------------------------------------------------
   3. FILTROS DE GALERÍA Y VISOR LIGHTBOX
   -------------------------------------------------------------------------- */
function initGalleryFilterAndLightbox() {
  const filtros = document.querySelectorAll(".galeria-filtros button");
  const items = Array.from(document.querySelectorAll(".galeria-item"));
  const grid = document.querySelector(".galeria-grid");
  const wrapper = document.querySelector(".galeria-grid-wrapper");
  const ANIM_DUR = 500;

  if (filtros.length > 0 && items.length > 0) {
    const getVisibles = (filter) => (filter === "todo" ? items.slice() : items.filter(i => i.classList.contains(filter)));

    const applyFilter = (filter) => {
      const startHeight = wrapper.offsetHeight;
      const visibles = getVisibles(filter);
      const ocultos = items.filter(i => !visibles.includes(i));

      items.forEach(it => it.classList.add("oculto"));
      visibles.forEach(v => grid.appendChild(v));
      ocultos.forEach(h => grid.appendChild(h));
      void grid.offsetWidth;

      ocultos.forEach(h => {
        h.__oldDisplay = h.style.display;
        h.style.display = "none";
      });

      requestAnimationFrame(() => {
        const endHeight = grid.scrollHeight;
        ocultos.forEach(h => {
          h.style.display = h.__oldDisplay || "";
        });

        wrapper.style.height = startHeight + "px";
        void wrapper.offsetWidth;
        wrapper.classList.add("animando");

        requestAnimationFrame(() => {
          wrapper.style.height = endHeight + "px";
        });

        setTimeout(() => {
          wrapper.classList.remove("animando");
          wrapper.style.height = filter === "todo" ? "auto" : endHeight + "px";
        }, ANIM_DUR);

        setTimeout(() => {
          visibles.forEach(v => v.classList.remove("oculto"));
        }, 40);
      });
    };

    filtros.forEach(btn => {
      btn.addEventListener("click", () => {
        filtros.forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");
        applyFilter(btn.getAttribute("data-filter"));
      });
    });
  }

  // Lightbox Modal
  const modal = document.getElementById("modal-img");
  const modalImg = document.getElementById("modal-img-content");
  const modalCaption = document.getElementById("modal-caption");
  const closeModal = document.querySelector(".modal-close");

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
        document.body.style.overflow = "hidden";
      }
    });
  });

  const hideModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (closeModal) closeModal.addEventListener("click", hideModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) hideModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      hideModal();
    }
  });
}

/* --------------------------------------------------------------------------
   4. FAQ ACCORDION
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
   5. AÑO EN EL FOOTER
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
