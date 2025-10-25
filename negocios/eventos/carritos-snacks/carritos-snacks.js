// ==========================
//  CAMBIO DE IMÁGENES EN LA CABEZA
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item => {
    const img = item.querySelector("img");
    const originalSrc = img.getAttribute("src");
    const altSrc = img.getAttribute("data-alt");

    item.addEventListener("mouseenter", () => {
      img.setAttribute("src", altSrc);
      item.classList.add("hovered"); // cambia color del texto
    });

    item.addEventListener("mouseleave", () => {
      img.setAttribute("src", originalSrc);
      item.classList.remove("hovered");
    });
  });
});

// ==========================
//  CARRUSEL AUTOMÁTICO
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let indice = 0;

  function mostrarSlide(n) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("activo", i === n);
      dots[i].classList.toggle("activo", i === n);
    });
  }

  function siguienteSlide() {
    indice = (indice + 1) % slides.length;
    mostrarSlide(indice);
  }

  // Control manual (opcional)
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      indice = i;
      mostrarSlide(indice);
    });
  });

  // Cambio automático cada 3 segundos
  setInterval(siguienteSlide, 3000);
});


// ======= EFECTO HOVER EN IMÁGENES DE SERVICIOS =======
document.querySelectorAll('.servicio-item img').forEach(img => {
  const original = img.src;
  const hover = img.dataset.hover;

  img.addEventListener('mouseenter', () => img.src = hover);
  img.addEventListener('mouseleave', () => img.src = original);
});

// ======= EVENTOS: COLOR DE OVERLAY DINÁMICO =======
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".evento-card").forEach(card => {
    const color = card.dataset.color;
    if (color) {
      card.style.setProperty("--overlay-color", `${color}cc`); // cc = 80% opacidad
    }
  });
});

// ==========================
//  PRELOADER
// ==========================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("oculto");

  // lo elimina del DOM después de la animación
  setTimeout(() => {
    preloader.style.display = "none";
  }, 600);
});