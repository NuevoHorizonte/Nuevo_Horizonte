
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
  const slideWidth = track.querySelector('img').offsetWidth + 25; // considera el gap
  track.style.transform = `translateX(-${index * slideWidth}px)`;

  // 🔹 Calcula qué grupo de 3 está visible actualmente
  const group = Math.floor(index / visibleImages);

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === group);
  });
}

setInterval(() => {
  index++;
  if (index > totalImages - visibleImages) index = 0;
  updateCarousel();
}, 3000);