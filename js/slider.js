/**
 * Elite Uniforms - Slider & Carousel Logic
 * Handles Hero Background Slider and Testimonials Carousel with Touch Swipe
 */

(function () {
  'use strict';

  // --- 1. Hero Slider ---
  const initHeroSlider = () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    const sliderContainer = document.querySelector('.hero-section');

    if (!slides.length) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    const intervalTime = 6000;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      currentIndex = index;
    };

    const nextSlide = () => {
      let nextIndex = (currentIndex + 1) % slides.length;
      showSlide(nextIndex);
    };

    const prevSlide = () => {
      let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
    };

    const startAutoPlay = () => {
      stopAutoPlay();
      autoPlayTimer = setInterval(nextSlide, intervalTime);
    };

    const stopAutoPlay = () => {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    };

    // Event Listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoPlay();
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        startAutoPlay();
      });
    });

    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopAutoPlay);
      sliderContainer.addEventListener('mouseleave', startAutoPlay);

      // Touch / Swipe support
      let touchStartX = 0;
      let touchEndX = 0;

      sliderContainer.addEventListener(
        'touchstart',
        (e) => {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );

      sliderContainer.addEventListener(
        'touchend',
        (e) => {
          touchEndX = e.changedTouches[0].screenX;
          const diff = touchStartX - touchEndX;
          if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
            startAutoPlay();
          }
        },
        { passive: true }
      );
    }

    // Initialize
    showSlide(0);
    startAutoPlay();
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
