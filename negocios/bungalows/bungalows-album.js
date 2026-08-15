/* ==========================================================================
   JAVASCRIPT - ÁLBUM BUNGALOWS TOMAYQUICHUA (PAGINADO)
   ========================================================================== */

// --- CONFIGURACIÓN DE IMÁGENES ---
const IMAGE_INDEXES = Array.from({ length: 62 }, (_, i) => i + 1);
const TOTAL_IMAGES = IMAGE_INDEXES.length;
const IMAGES_PER_PAGE = 15;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
  // --- NAVEGACIÓN ACTIVA ---
  const navItems = document.querySelectorAll('.nav-menu .nav-item-wrapper');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-item');
    if (link && link.getAttribute('href') === 'bungalows-album.html') {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    }
  });

  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  // --- LÓGICA DEL LIGHTBOX ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let visibleItems = [];
  let currentIndex = 0;

  function updateVisibleItems() {
    const allGalleryItems = galleryGrid.querySelectorAll('.gallery-item');
    visibleItems = Array.from(allGalleryItems);
  }

  function showLightbox(index) {
    if (index < 0 || index >= visibleItems.length) return;

    currentIndex = index;
    const currentItem = visibleItems[currentIndex];
    const src = currentItem.getAttribute('data-src');

    lightboxImg.src = src;
    lightboxImg.alt = "Imagen de la galería";
    lightboxCounter.textContent = `${currentIndex + 1} de ${visibleItems.length}`;

    // Configurar enlace de descarga
    const downloadBtn = document.getElementById('lightbox-download');
    if (downloadBtn) {
      downloadBtn.href = src;
      const filename = src.substring(src.lastIndexOf('/') + 1);
      downloadBtn.setAttribute('download', filename);
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextImage() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= visibleItems.length) {
      nextIndex = 0;
    }
    showLightbox(nextIndex);
  }

  function prevImage() {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = visibleItems.length - 1;
    }
    showLightbox(prevIndex);
  }

  // --- GENERACIÓN DE LA GALERÍA CON PAGINACIÓN ---
  function renderGallery() {
    galleryGrid.innerHTML = '';
    const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
    const endIndex = Math.min(startIndex + IMAGES_PER_PAGE, TOTAL_IMAGES);

    const fragment = document.createDocumentFragment();

    for (let idx = startIndex; idx < endIndex; idx++) {
      const i = IMAGE_INDEXES[idx];
      const numStr = String(i).padStart(2, '0');
      const filename = `img_${numStr}`;
      const src = `../../img/bungalows-de-tomayquichua/${filename}.png`;

      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';

      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'gallery-img-wrapper';

      const img = document.createElement('img');
      img.alt = `Imagen de la galería ${numStr}`;
      img.loading = 'lazy';
      img.src = src;

      // Evento para aplicar animación suave al cargar la imagen
      img.onload = () => {
        galleryItem.classList.add('show');
      };

      // Si falla la imagen (por si acaso), removerla
      img.onerror = () => {
        galleryItem.remove();
        updateVisibleItems();
      };

      galleryItem.setAttribute('data-src', src);

      const overlay = document.createElement('div');
      overlay.className = 'gallery-overlay';
      overlay.innerHTML = `<span class="zoom-icon">🔍</span>`;

      imgWrapper.appendChild(img);
      imgWrapper.appendChild(overlay);
      galleryItem.appendChild(imgWrapper);
      fragment.appendChild(galleryItem);
    }

    galleryGrid.appendChild(fragment);
    updateVisibleItems();
    renderPagination();
  }

  function renderPagination() {
    const containers = [
      document.getElementById('pagination-container-top'),
      document.getElementById('pagination-container')
    ];

    containers.forEach(container => {
      if (!container) return;
      container.innerHTML = '';
    });

    const totalPages = Math.ceil(TOTAL_IMAGES / IMAGES_PER_PAGE);
    if (totalPages <= 1) return;

    containers.forEach(container => {
      if (!container) return;

      // Botón Anterior
      const prevPageBtn = document.createElement('button');
      prevPageBtn.className = 'pagination-btn prev-btn';
      prevPageBtn.innerHTML = '&#10094; Anterior';
      if (currentPage === 1) {
        prevPageBtn.disabled = true;
      } else {
        prevPageBtn.addEventListener('click', () => {
          changePage(currentPage - 1);
        });
      }
      container.appendChild(prevPageBtn);

      // Números de Página
      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `pagination-btn page-num-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
          changePage(i);
        });
        container.appendChild(pageBtn);
      }

      // Botón Siguiente
      const nextPageBtn = document.createElement('button');
      nextPageBtn.className = 'pagination-btn next-btn';
      nextPageBtn.innerHTML = 'Siguiente &#10095;';
      if (currentPage === totalPages) {
        nextPageBtn.disabled = true;
      } else {
        nextPageBtn.addEventListener('click', () => {
          changePage(currentPage + 1);
        });
      }
      container.appendChild(nextPageBtn);
    });
  }

  function changePage(page) {
    currentPage = page;
    renderGallery();

    // Scroll suave hacia la cabecera de la sección
    const albumSection = document.querySelector('.album-section');
    if (albumSection) {
      albumSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // --- EVENTOS ---
  galleryGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (item) {
      updateVisibleItems();
      const index = visibleItems.indexOf(item);
      showLightbox(index);
    }
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', nextImage);
  prevBtn.addEventListener('click', prevImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  });

  // Inicializar galería
  renderGallery();
});
