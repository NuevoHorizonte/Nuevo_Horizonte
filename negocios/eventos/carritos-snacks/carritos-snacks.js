document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item => {
    const img = item.querySelector("img");
    const originalSrc = img.getAttribute("src");
    const altSrc = img.getAttribute("data-alt");

    item.addEventListener("mouseenter", () => {
      img.setAttribute("src", altSrc);
      item.classList.add("hovered"); // activa clase para animar texto
    });

    item.addEventListener("mouseleave", () => {
      img.setAttribute("src", originalSrc);
      item.classList.remove("hovered");
    });
  });
});

// ==========================
// 🎠 CARRUSEL AUTOMÁTICO
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

  // 🕒 cambia automáticamente cada 5 segundos
  setInterval(siguienteSlide, 3000);

  // 🚫 Sin clics ni interacción del usuario
});
