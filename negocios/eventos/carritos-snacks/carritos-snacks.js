

// ==========================
//  CARRUSEL AUTOMÁTICO + CLIC MANUAL
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const contenedorCarrusel = document.querySelector(".contenedor-carrusel");
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

  // Cambio con los dots (manual)
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      indice = i;
      mostrarSlide(indice);
    });
  });

  // Cambio automático cada 10 segundos
  let intervalo = setInterval(siguienteSlide, 8000);

  // ✅ Cambio con clic en cualquier parte del carrusel
  contenedorCarrusel.addEventListener("click", () => {
    siguienteSlide();
    clearInterval(intervalo); // pausa el auto si clickea
    intervalo = setInterval(siguienteSlide, 8000); // reinicia luego
  });
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
//  CAMBIO DE IMÁGENES EN LA CABEZA + CAMBIO DE TEXTO SOLO EN CONTACTO
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item => {
    const img = item.querySelector("img");
    const span = item.querySelector("span");
    const originalSrc = img.getAttribute("src");
    const altSrc = img.getAttribute("data-alt");
    const originalText = span.textContent;

    item.addEventListener("mouseenter", () => {
      img.setAttribute("src", altSrc);
      item.classList.add("hovered");

      // 💬 Solo cambia el texto si es el menú de "Contacto"
      if (originalText.trim().toLowerCase() === "contacto") {
        span.textContent = "919 283 481";
      }
    });

    item.addEventListener("mouseleave", () => {
      img.setAttribute("src", originalSrc);
      item.classList.remove("hovered");

      // 💬 Regresa el texto original
      if (originalText.trim().toLowerCase() === "contacto") {
        span.textContent = originalText;
      }
    });
  });
});