document.addEventListener('DOMContentLoaded', () => {

  const header = document.querySelector('.top-header');
  const icons = document.querySelectorAll('.icon');


  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (!header) return;
      header.classList.toggle('sticky', window.scrollY > 50);
    }, 50);
  });

  icons.forEach(icon => {
    const originalSrc = icon.src;
    const hoverSrc = icon.dataset.hover;
    if (!hoverSrc) return;
    const parent = icon.parentElement;
    parent.addEventListener('mouseenter', () => (icon.src = hoverSrc));
    parent.addEventListener('mouseleave', () => (icon.src = originalSrc));
  });



const carousel = document.querySelector('.carousel');
if (!carousel) return;

const items = Array.from(carousel.querySelectorAll('.carousel-item'));
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
let isAnimating = false;

let config = {
  smallW: 240, smallH: 320,
  mediumW: 300, mediumH: 400,
  largeW: 360, largeH: 480,
  gap: 65,
  transition: 720
};

const layout = {
  spacingBase: 0.4,
  globalShift: 50,
  customOffsets: {
    left2: -325,
    left1: -200,
    right1: 150,
    right2: 220
  }
};

function calcConfig() {
  if (window.innerWidth <= 768) {
    config = {
      smallW: 120, smallH: 90,
      mediumW: 180, mediumH: 120,
      largeW: 280, largeH: 180,
      gap: 40,
      transition: 700
    };
  } else {
    config = {
      smallW: 240, smallH: 320,
      mediumW: 300, mediumH: 400,
      largeW: 360, largeH: 480,
      gap: 65,
      transition: 720
    };
  }

  // carousel.style.height = (config.largeH + 140) + 'px';
  items.forEach(it => {
    it.style.width = config.smallW + 'px';
    it.style.height = config.smallH + 'px';
  });
}

function renderCarousel() {
  if (isAnimating) return;
  isAnimating = true;

  const total = items.length;
  const s = config;
  const cW = carousel.clientWidth;
  const center = cW / 2;
  const baseSpacing = s.largeW * layout.spacingBase + s.gap;

  items.forEach((item, i) => {
    let diff = ((i - currentIndex) % total + total) % total;
    if (diff > Math.floor(total / 2)) diff -= total;

    let scale = 1, z = 10, op = 1;
    item.classList.remove('off');

    if (diff === 0) {
      scale = s.largeW / s.smallW;
      z = 30;
      op = 1;
    } else if (Math.abs(diff) === 1) {
      scale = s.mediumW / s.smallW;
      z = 20;
      op = 0.95;
    } else if (Math.abs(diff) === 2) {
      scale = 1;
      z = 10;
      op = 0.78;
    } else {
      scale = 0.9;
      op = 0;
      item.classList.add('off');
    }

    let extraOffset = 0;
    if (diff === -2) extraOffset = layout.customOffsets.left2 || 0;
    if (diff === -1) extraOffset = layout.customOffsets.left1 || 0;
    if (diff === 1) extraOffset = layout.customOffsets.right1 || 0;
    if (diff === 2) extraOffset = layout.customOffsets.right2 || 0;

    const scaledW = s.smallW * scale;
    const targetLeft = center - scaledW / 2 + diff * baseSpacing + extraOffset + (layout.globalShift || 0);

    const scaledH = s.smallH * scale;
    const refHeight = s.largeH;
    let top = (carousel.clientHeight - refHeight) / 2 + (refHeight - scaledH) / 2;

    if (Math.abs(diff) === 1) top -= 30;
    if (Math.abs(diff) === 2) top -= 60;

    item.style.left = `${Math.round(targetLeft)}px`;
    item.style.top = `${Math.round(top)}px`;
    item.style.zIndex = z;
    item.style.opacity = op;
    item.style.transform = `scale(${scale})`;

    let titleEl = item.querySelector('.carousel-title');
    if (!titleEl) {
      titleEl = document.createElement('div');
      titleEl.className = 'carousel-title';
      titleEl.textContent = item.dataset.title || '';
      item.appendChild(titleEl);
    }

    let overlayEl = item.querySelector('.carousel-overlay');
    if (!overlayEl) {
      overlayEl = document.createElement('div');
      overlayEl.className = 'carousel-overlay';
      overlayEl.textContent = item.dataset.desc || '';
      item.appendChild(overlayEl);
    }

    if (diff === 0) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  setTimeout(() => { isAnimating = false; }, s.transition + 30);
}


function goNext() {
  if (isAnimating) return;
  currentIndex = (currentIndex + 1) % items.length;
  renderCarousel();
}

function goPrev() {
  if (isAnimating) return;
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  renderCarousel();
}


calcConfig();
renderCarousel();

window.addEventListener('resize', () => {
  calcConfig();
  renderCarousel();
});

if (nextBtn) nextBtn.addEventListener('click', goNext);
if (prevBtn) prevBtn.addEventListener('click', goPrev);

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') goNext();
  if (e.key === 'ArrowLeft') goPrev();
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  });
});



const scrollBtn = document.getElementById('scrollToBungalows');
const bungalowsSection = document.getElementById('bungalows');

if (scrollBtn && bungalowsSection) {
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: bungalowsSection.offsetTop - 1, 
      behavior: 'smooth'
    });
  });
}

});
