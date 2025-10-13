// ======= HEADER Y MENÚ =======
document.addEventListener("DOMContentLoaded", function() {
  const header = document.querySelector("header");
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav-container");
  const dropdowns = document.querySelectorAll(".mega-dropdown");
  const THRESHOLD = 50;

  function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > THRESHOLD);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader);

  // === BOTÓN HAMBURGUESA ===
  hamburger.addEventListener("click", function() {
    this.classList.toggle("active");
    nav.classList.toggle("active");
    const expanded = this.classList.contains("active");
    this.setAttribute("aria-expanded", expanded);
  });

  // === SCROLL EN MÓVIL ===
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".dropdown-toggle");

    toggle.addEventListener("click", function(e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();

        // Detectamos a dónde debe hacer scroll
        let targetId = "";
        if (toggle.textContent.includes("Academia")) targetId = "academia";
        if (toggle.textContent.includes("Bungalows")) targetId = "bungalows";
        if (toggle.textContent.includes("Importaciones")) targetId = "importaciones";
        if (toggle.textContent.includes("Eventos")) targetId = "eventos";
        if (toggle.textContent.includes("Canchas")) targetId = "canchas";

        if (targetId) {
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
          }
        }

        nav.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });
});


/* ==== BUNGALOWS==== */
document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector(".bungalows-img img");
  const originalSrc = img.getAttribute("src");
  const hoverSrc = img.getAttribute("data-hover");

  const extraImages = [
    "img/bungalows-de-tomayquichua/foto-3.png",
    "img/bungalows-de-tomayquichua/foto-4.png",
    "img/bungalows-de-tomayquichua/foto-5.png",
    "img/bungalows-de-tomayquichua/foto-6.png",
    "img/bungalows-de-tomayquichua/foto-1.webp"
  ];

  let currentIndex = 0;
  img.addEventListener("mouseenter", () => {
    img.setAttribute("src", hoverSrc);
    img.style.transform = "translate(-100px, -40px) scale(1.05)"; // 👈 zoom suave
    currentIndex = 0;
  });

  img.addEventListener("mouseleave", () => {
    img.setAttribute("src", originalSrc);
    img.style.transform = "translate(-100px, -40px) scale(1)";
    currentIndex = 0;
  });

  img.addEventListener("click", () => {
    if (currentIndex < extraImages.length) {
      img.setAttribute("src", extraImages[currentIndex]);
      currentIndex++;
    } else {
      currentIndex = 0;
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".eventos-track");
  if (!track) return;

  // CLONAR ITEMS (más fiable que innerHTML += innerHTML)
  const originalItems = Array.from(track.children);
  originalItems.forEach(item => track.appendChild(item.cloneNode(true)));

  // Lista de tarjetas (ahora incluye duplicados)
  let cards = Array.from(track.querySelectorAll(".evento-card"));

  // Leer gap desde CSS
  const style = getComputedStyle(track);
  const gap = parseFloat(style.gap) || 20;

  // función para recalcular ancho de tarjeta (útil en resize)
  function getCardWidth() {
    cards = Array.from(track.querySelectorAll(".evento-card"));
    return cards[0].offsetWidth + gap;
  }

  const originalCount = cards.length / 2; // cantidad original (no duplicada)
  const cardWidthInit = getCardWidth();
  const singleSetWidth = cardWidthInit * originalCount;

  // Empezar en la "mitad" para permitir desplazamiento bidireccional
  track.scrollLeft = singleSetWidth;

  // evitar arrastre de imágenes
  track.querySelectorAll("img").forEach(img => img.draggable = false);

  // estado
  let isDragging = false;
  let startX = 0;
  let startScroll = 0;
  let velocity = 0;
  let lastScroll = track.scrollLeft;
  let rafId = null;

  function checkLoop() {
    const half = track.scrollWidth / 2;
    if (track.scrollLeft >= half) track.scrollLeft -= half;
    if (track.scrollLeft < 0) track.scrollLeft += half;
  }

  function snapToNearest() {
    const cw = getCardWidth();
    const remainder = track.scrollLeft % cw;
    let target;
    if (remainder > cw / 2) {
      target = track.scrollLeft + (cw - remainder);
    } else {
      target = track.scrollLeft - remainder;
    }
    track.scrollTo({ left: target, behavior: "smooth" });
  }

  function applyMomentum() {
    // si la velocidad aún es apreciable, seguimos con inercia
    if (Math.abs(velocity) > 0.5) {
      track.scrollLeft += velocity;
      // fricción (ajusta 0.95-0.98 para más/menos suavidad)
      velocity *= 0.95;
      checkLoop();
      rafId = requestAnimationFrame(applyMomentum);
    } else {
      cancelAnimationFrame(rafId);
      // pequeño delay para no cortar la inercia de golpe
      setTimeout(snapToNearest, 60);
    }
  }

  // MOUSE
  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    startScroll = track.scrollLeft;
    velocity = 0;
    lastScroll = track.scrollLeft;
    cancelAnimationFrame(rafId);
    track.classList.add("dragging");
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    track.scrollLeft = startScroll - dx;
    // velocidad medida por cambio de scroll entre frames
    velocity = track.scrollLeft - lastScroll;
    lastScroll = track.scrollLeft;
    checkLoop();
  });

  ["mouseup", "mouseleave"].forEach(ev => {
    track.addEventListener(ev, () => {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove("dragging");
      applyMomentum();
    });
  });


  track.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    startScroll = track.scrollLeft;
    velocity = 0;
    lastScroll = track.scrollLeft;
    cancelAnimationFrame(rafId);
  }, { passive: true });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].pageX - startX;
    track.scrollLeft = startScroll - dx;
    velocity = track.scrollLeft - lastScroll;
    lastScroll = track.scrollLeft;
    checkLoop();
  }, { passive: true });

  track.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    applyMomentum();
  });
  window.addEventListener("resize", () => {
    getCardWidth();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contactoBtn = document.querySelector(".contacto-link");

  const numeros = [
    "51905448644",
    "51983406127", 
    "51919283481", 
    "51952077901",
    "51981542652"  
  ];

  let usados = JSON.parse(localStorage.getItem("usadosWA")) || [];

  function obtenerNumero() {
    // Filtrar disponibles
    let disponibles = numeros.filter(n => !usados.includes(n));

    if (disponibles.length === 0) {
      usados = [];
      disponibles = numeros;
    }

    const idx = Math.floor(Math.random() * disponibles.length);
    const numero = disponibles[idx];

    usados.push(numero);
    localStorage.setItem("usadosWA", JSON.stringify(usados));

    return numero;
  }

  contactoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const numero = obtenerNumero();
    const mensaje = encodeURIComponent("¡Hola! me puedes ayudar de   ");
    window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
  });
});

document.querySelectorAll('.servicio-item img').forEach(img => {
  const original = img.src;
  const hover = img.dataset.hover;

  img.addEventListener('mouseenter', () => img.src = hover);
  img.addEventListener('mouseleave', () => img.src = original);
});
