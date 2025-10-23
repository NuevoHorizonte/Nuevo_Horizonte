
document.querySelectorAll('.icono img').forEach(img => {
  const original = img.src;
  const hover = img.dataset.hover;

  img.addEventListener('mouseenter', () => img.src = hover);
  img.addEventListener('mouseleave', () => img.src = original);
});

// ======== CARRUSEL AUTOMÁTICO (8 imágenes, 3 visibles) ========
const track = document.querySelector('.carrusel-track');
const dots = document.querySelectorAll('.dot');
const totalImages = 8;
const visibleImages = 3;
let index = 0;

function updateCarousel() {
  const slideWidth = track.querySelector('img').offsetWidth + 25; // espacio incluido
  track.style.transform = `translateX(-${index * slideWidth}px)`;

  // 🔹 Limpia todos los dots
  dots.forEach(dot => dot.classList.remove('active'));

  // 🔹 Activa los dots que corresponden a las imágenes visibles
  for (let i = index; i < index + visibleImages; i++) {
    if (dots[i]) dots[i].classList.add('active');
  }
}

setInterval(() => {
  index++;
  if (index > totalImages - visibleImages) index = 0;
  updateCarousel();
}, 3000);