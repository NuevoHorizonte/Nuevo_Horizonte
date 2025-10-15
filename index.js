// ======= GESTIÓN DEL HEADER, MENÚ Y SCROLL=======
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

// ======= HAMBURGUESA=======
  hamburger.addEventListener("click", function() {
    this.classList.toggle("active");
    nav.classList.toggle("active");
    const expanded = this.classList.contains("active");
    this.setAttribute("aria-expanded", expanded);
  });

// ======= Menú desplegable en móvil con scroll automático =======
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".dropdown-toggle");

    toggle.addEventListener("click", function(e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();

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

// ======= EFECTOS EN LA IMAGEN DE LOS BUNGALOWS =======
document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector(".bungalows-img img");
  const originalSrc = img.getAttribute("src");
  const hoverSrc = img.getAttribute("data-hover");

  const extraImages = [
    "img/bungalows-de-tomayquichua/foto-2.webp",
    "img/bungalows-de-tomayquichua/foto-3-index.png",
    "img/bungalows-de-tomayquichua/foto-4-index.png",
    "img/bungalows-de-tomayquichua/foto-5-index.png",
    "img/bungalows-de-tomayquichua/foto-6-index.png",
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


// ======= BOTÓN DE CONTACTO CON WHATSAPP ALEATORIO(ELIMINAR) =======
document.addEventListener("DOMContentLoaded", () => {
  const contactoBtn = document.querySelector(".contacto-link");

  const numeros = [
    "51960586301",
    "51960586301", 
    "51960586301", 
    "51960586301",
    "51960586301"  
  ];

  let usados = JSON.parse(localStorage.getItem("usadosWA")) || [];

  function obtenerNumero() {

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

// ======= EFECTO HOVER EN IMÁGENES DE SERVICIOS =======
document.querySelectorAll('.servicio-item img').forEach(img => {
  const original = img.src;
  const hover = img.dataset.hover;

  img.addEventListener('mouseenter', () => img.src = hover);
  img.addEventListener('mouseleave', () => img.src = original);
});

// ======= EVENTOS: OVERLAY ANIMADO Y REDIRECCIÓN =======
document.addEventListener("DOMContentLoaded", () => {
  const eventoCards = document.querySelectorAll(".evento-card");

  eventoCards.forEach(card => {
    const overlay = card.querySelector(".overlay");
    const color = card.dataset.color;
    const link = card.dataset.link;

    // Color dinámico del overlay
    overlay.style.background = `${color}cc`; // cc = 80% opacidad

    // Click redirige
    card.addEventListener("click", () => {
      window.location.href = link;
    });
  });
});