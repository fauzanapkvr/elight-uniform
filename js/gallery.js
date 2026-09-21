/**
 * Elite Uniforms - Gallery & Lightbox Logic
 * Handles category filtering and interactive full-screen lightbox modal
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Category Filtering ---
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Update active class on buttons
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.getAttribute('data-filter');

        galleryItems.forEach((item) => {
          const category = item.getAttribute('data-category');
          if (filterVal === 'all' || category === filterVal) {
            item.classList.remove('hide');
            item.style.animation = 'fadeInScale 0.4s ease forwards';
          } else {
            item.classList.add('hide');
          }
        });
      });
    });

    // --- 2. Lightbox Popup Viewer ---
    const lightboxModal = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxSub = document.getElementById('lightbox-sub');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let visibleItems = [];
    let currentLightboxIdx = 0;

    const updateVisibleItems = () => {
      visibleItems = Array.from(galleryItems).filter(
        (item) => !item.classList.contains('hide')
      );
    };

    const openLightbox = (index) => {
      updateVisibleItems();
      if (!visibleItems[index]) return;

      currentLightboxIdx = index;
      const currentItem = visibleItems[index];
      const imgElem = currentItem.querySelector('img');
      const titleElem = currentItem.querySelector('.gallery-item-title');
      const catElem = currentItem.querySelector('.gallery-item-category');

      if (lightboxImg) lightboxImg.src = imgElem ? imgElem.src : '';
      if (lightboxTitle) lightboxTitle.textContent = titleElem ? titleElem.textContent : 'Elite Uniforms';
      if (lightboxSub) lightboxSub.textContent = catElem ? catElem.textContent : '';

      if (lightboxModal) {
        lightboxModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    };

    const closeLightbox = () => {
      if (lightboxModal) {
        lightboxModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    };

    const nextLightbox = () => {
      updateVisibleItems();
      if (visibleItems.length === 0) return;
      currentLightboxIdx = (currentLightboxIdx + 1) % visibleItems.length;
      openLightbox(currentLightboxIdx);
    };

    const prevLightbox = () => {
      updateVisibleItems();
      if (visibleItems.length === 0) return;
      currentLightboxIdx = (currentLightboxIdx - 1 + visibleItems.length) % visibleItems.length;
      openLightbox(currentLightboxIdx);
    };

    // Attach click listeners to gallery items
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        updateVisibleItems();
        const index = visibleItems.indexOf(item);
        if (index !== -1) openLightbox(index);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', nextLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevLightbox);

    // Close when clicking modal backdrop
    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
          closeLightbox();
        }
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightboxModal || !lightboxModal.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    });
  });
})();
