
document.querySelectorAll('.icono img').forEach(img => {
  const original = img.src;
  const hover = img.dataset.hover;

  img.addEventListener('mouseenter', () => img.src = hover);
  img.addEventListener('mouseleave', () => img.src = original);
});

// ======== CARRUSEL AUTOMÁTICO RESPONSIVE ========
const track = document.querySelector('.carrusel-track');
const dots = document.querySelectorAll('.dot');
const totalImages = 8;
let index = 0;

function getVisibleImages() {
  if (window.innerWidth <= 400) return 1;
  if (window.innerWidth <= 500) return 2;
  return 3;
}

function updateCarousel() {
  const visibleImages = getVisibleImages();
  const slideWidth = track.querySelector('img').offsetWidth + 25;
  track.style.transform = `translateX(-${index * slideWidth}px)`;

  dots.forEach(dot => dot.classList.remove('active'));

  for (let i = index; i < index + visibleImages; i++) {
    if (dots[i]) dots[i].classList.add('active');
  }
}

setInterval(() => {
  const visibleImages = getVisibleImages();
  index++;
  if (index > totalImages - visibleImages) index = 0;
  updateCarousel();
}, 3000);

window.addEventListener('resize', updateCarousel);

updateCarousel();
