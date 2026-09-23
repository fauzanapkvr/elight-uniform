/**
 * Elite Uniforms - Slider & Carousel Logic
 * Handles Hero Background Slider and Testimonials Carousel with Touch Swipe
 */

(function () {
  'use strict';

  // --- 1. Hero Slider (Disabled - static hero background) ---
  const initHeroSlider = () => {
    // Hero is now a static background. Carousel functionality disabled.
  };

  // --- 2. Testimonial Carousel ---
  const initTestimonials = () => {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    const container = document.querySelector('.testimonial-slider-container');

    if (!cards.length) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    const intervalTime = 7000;

    const showCard = (index) => {
      cards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      currentIndex = index;
    };

    const nextCard = () => {
      let nextIndex = (currentIndex + 1) % cards.length;
      showCard(nextIndex);
    };

    const startTestimonialAuto = () => {
      stopTestimonialAuto();
      autoPlayTimer = setInterval(nextCard, intervalTime);
    };

    const stopTestimonialAuto = () => {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    };

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showCard(i);
        startTestimonialAuto();
      });
    });

    if (container) {
      container.addEventListener('mouseenter', stopTestimonialAuto);
      container.addEventListener('mouseleave', startTestimonialAuto);
    }

    showCard(0);
    startTestimonialAuto();
  };

  // Run on DOM loaded
  document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initTestimonials();
  });
})();
