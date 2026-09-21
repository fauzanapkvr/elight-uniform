/**
 * Elite Uniforms - Main Application Controller
 * Handles Navigation, Modals, Counters, Form Validation & Scroll Effects
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Sticky Navigation & Header ---
    const header = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Mobile Toggle
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
      });

      // Close menu on link click
      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          mobileToggle.classList.remove('active');
          navMenu.classList.remove('open');
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (
          navMenu.classList.contains('open') &&
          !navMenu.contains(e.target) &&
          !mobileToggle.contains(e.target)
        ) {
          mobileToggle.classList.remove('active');
          navMenu.classList.remove('open');
        }
      });
    }

    // --- 2. Scroll Spy for Active Navigation ---
    const sections = document.querySelectorAll('section[id]');
    const scrollSpy = () => {
      const scrollY = window.pageYOffset;

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document
            .querySelector('.nav-menu a[href*=' + sectionId + ']')
            ?.classList.add('active');
        } else {
          document
            .querySelector('.nav-menu a[href*=' + sectionId + ']')
            ?.classList.remove('active');
        }
      });
    };
    window.addEventListener('scroll', scrollSpy);

    // --- 3. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      revealElements.forEach((el) => revealObserver.observe(el));
    } else {
      // Fallback
      revealElements.forEach((el) => el.classList.add('active'));
    }

    // --- 4. Animated Number Counters ---
    const counterElements = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    const runCounters = () => {
      counterElements.forEach((counter) => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeOut * target);

          counter.textContent = currentVal.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target.toLocaleString() + suffix;
          }
        };

        requestAnimationFrame(updateCount);
      });
    };

    const statsSection = document.querySelector('.about-section');
    if (statsSection && 'IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !countersStarted) {
            countersStarted = true;
            runCounters();
          }
        },
        { threshold: 0.25 }
      );
      statsObserver.observe(statsSection);
    }

    // --- 5. Manufacturing Process Interactive Highlight ---
    const processSteps = document.querySelectorAll('.process-step-item');
    const processTrack = document.querySelector('.process-timeline-track');

    processSteps.forEach((step, idx) => {
      step.addEventListener('click', () => {
        processSteps.forEach((s) => s.classList.remove('active'));
        step.classList.add('active');

        if (processTrack) {
          const percentage = ((idx + 0.5) / processSteps.length) * 100;
          processTrack.style.width = percentage + '%';
        }
      });
    });

    // --- 6. Product Quick-View Modal ---
    const productModal = document.getElementById('product-modal');
    const productQuickBtns = document.querySelectorAll('.btn-quick-view');
    const productModalClose = document.getElementById('product-modal-close');
    const modalProductTitle = document.getElementById('modal-product-title');
    const modalProductCategory = document.getElementById('modal-product-category');
    const modalProductDesc = document.getElementById('modal-product-desc');
    const modalProductImg = document.getElementById('modal-product-img');
    const modalProductBadge = document.getElementById('modal-product-badge');
    const modalProductSpecs = document.getElementById('modal-product-specs');

    const productDetailsMap = {
      'oxford-shirt': {
        title: 'Executive Corporate Oxford Shirt',
        category: 'Corporate Workwear',
        badge: '100% EGYPTIAN COTTON',
        img: 'images/products/product-oxford-shirt.jpg',
        desc: 'Precision-tailored button-down oxford shirts created with long-staple Egyptian cotton. Features wrinkle-free easy-iron technology, reinforced collar stays, mother-of-pearl buttons, and customized company monogram embroidery.',
        specs: ['160 GSM Premium Yarn', 'Wrinkle-Resistant Finish', 'Breathable & Moisture Wicking', 'Machine Washable 40°C']
      },
      'coveralls': {
        title: 'Heavy-Duty Flame Retardant Coverall',
        category: 'Industrial & Oil & Gas',
        badge: 'NFPA 2112 & EN ISO CERTIFIED',
        img: 'images/products/product-safety-coverall.jpg',
        desc: 'Engineered for extreme offshore oil & gas and industrial refinery environments. Built with inherently flame-resistant fabric (Aramid/FR Viscose), antistatic carbon grids, and 3M Scotchlite reflective stripes.',
        specs: ['320 GSM Inherently FR Fabric', 'NFPA 2112 & EN ISO 11612 Compliant', 'Two-Way Brass Heavy Duty Zipper', 'Double-Layer Knee Protection Pockets']
      },
      'polo': {
        title: 'Performance Tech Dry-Fit Polo',
        category: 'Corporate Casual & Hospitality',
        badge: 'DRY-FIT BREATHABLE',
        img: 'images/products/product-tech-polo.jpg',
        desc: 'Modern athletic-cut corporate polo shirts engineered with moisture-wicking micro-pique knit. Features UV protection factor UPF 30+, anti-pilling collar, and durable corporate color lock dyes.',
        specs: ['210 GSM Performance Pique', 'Anti-Microbial & Odor Resistant', 'UV Sun Protection UPF 30+', 'Pre-Shrunk Dimensional Stability']
      },
      'hotel-suit': {
        title: 'Bespoke Hotel Staff & Concierge Suit',
        category: 'Hospitality & Luxury Hotels',
        badge: 'PREMIUM WOOL BLEND',
        img: 'images/products/product-hotel-suit.jpg',
        desc: 'Sophisticated hospitality uniforms designed for luxury 5-star hotels and fine dining establishments. Includes peak lapel blazers, satin accents, tailored waistcoats, and wrinkle-defying stretch lining.',
        specs: ['280 GSM Wool-Polyester Blend', 'Teflon Stain Repellent Coating', 'Bespoke Ergonomic Cut', 'Reinforced Pocket Corners']
      },
      'security': {
        title: 'Tactical Security Officer Uniform',
        category: 'Security & Aviation',
        badge: 'RIP-STOP DURABLE',
        img: 'images/products/product-security-uniform.jpg',
        desc: 'Authoritative and durable uniform shirts and cargo trousers with military-grade rip-stop weave. Equipped with reinforced shoulder epaulets, hidden badge holders, and dual pleated chest pockets.',
        specs: ['240 GSM Rip-Stop Poly-Cotton', 'Water and Oil Repellent', 'Internal Document Pockets', 'Reinforced Double-Stitched Seams']
      },
      'scrubs': {
        title: 'Antimicrobial Medical Scrubs & Lab Coat',
        category: 'Healthcare & Clinical',
        badge: 'SILVER-ION ANTIMICROBIAL',
        img: 'images/products/product-medical-scrubs.jpg',
        desc: 'High-grade hospital medical scrubs manufactured with SILVADUR antimicrobial silver-ion technology. Offers 4-way stretch flexibility for long healthcare shifts and barrier fluid resistance.',
        specs: ['180 GSM 4-Way Stretch Twill', 'Silver-Ion Antimicrobial Shield', 'Autoclave & Bleach Resistant', 'Ergonomic 6-Pocket Utility Layout']
      }
    };

    productQuickBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = btn.getAttribute('data-product');
        const data = productDetailsMap[productId];

        if (data && productModal) {
          modalProductTitle.textContent = data.title;
          modalProductCategory.textContent = data.category;
          modalProductBadge.textContent = data.badge;
          modalProductDesc.textContent = data.desc;
          modalProductImg.src = data.img;

          modalProductSpecs.innerHTML = '';
          data.specs.forEach((spec) => {
            const li = document.createElement('li');
            li.className = 'spec-pill';
            li.textContent = spec;
            modalProductSpecs.appendChild(li);
          });

          productModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    if (productModalClose) {
      productModalClose.addEventListener('click', () => {
        productModal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    // --- 7. Request a Quote Modal ---
    const quoteModal = document.getElementById('quote-modal');
    const quoteModalBtns = document.querySelectorAll('.open-quote-modal');
    const quoteModalClose = document.getElementById('quote-modal-close');

    quoteModalBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (quoteModal) {
          // If product modal was open, close it
          if (productModal) productModal.classList.remove('open');
          quoteModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    if (quoteModalClose) {
      quoteModalClose.addEventListener('click', () => {
        quoteModal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    // Close on backdrop click for all modals
    [productModal, quoteModal].forEach((modal) => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
          }
        });
      }
    });

    // --- 8. Toast Notification Utility ---
    const showToast = (message) => {
      let toast = document.getElementById('site-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'site-toast';
        toast.className = 'toast-box';
        document.body.appendChild(toast);
      }
      toast.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2B8CFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${message}</span>
      `;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4500);
    };

    // --- 9. Form Submission Handling (Main Form & Modal Form) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = 'Submitting Request...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
          showToast('Thank you! Your quote request has been received. Our tailoring specialist will contact you within 2 hours.');
        }, 1200);
      });
    }

    const modalQuoteForm = document.getElementById('modal-quote-form');
    if (modalQuoteForm) {
      modalQuoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = modalQuoteForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = 'Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          modalQuoteForm.reset();
          if (quoteModal) {
            quoteModal.classList.remove('open');
            document.body.style.overflow = '';
          }
          showToast('Quote requested successfully! Our team is preparing your custom proposal.');
        }, 1000);
      });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.footer-newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        newsletterForm.reset();
        showToast('Subscribed! You will now receive textile insights & catalogue updates.');
      });
    }

    // --- 10. Update Copyright Year ---
    const yearElem = document.getElementById('current-year');
    if (yearElem) {
      yearElem.textContent = new Date().getFullYear();
    }
  });
})();
