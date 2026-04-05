/**
 * AirTeam Static Website - Main JS
 * Features: Hero Slider, Sticky Header, Scroll Reveal, Count-Up, Mobile Nav, Back-to-top, Multi-language
 */

'use strict';

/* ========================================
   LANGUAGE / LOCALIZATION
   ======================================== */
const i18nSetup = () => {
  const langSelects = document.querySelectorAll('.lang-select');
  const currentLangDisplay = document.querySelector('.lang-select > span');
  
  // Set initial language from localStorage or default to 'tr'
  let currentLang = localStorage.getItem('airteam_lang') || 'tr';
  
  // Safety check: if translations is not defined, abort i18n but don't crash
  if (typeof translations === 'undefined') {
    console.warn('Translations not loaded. Localization aborted.');
    return;
  }
  
  const updateActiveOption = (lang) => {
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });
  };

  const localize = (lang) => {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.dataset.i18n;
      const translation = translations[lang][key];
      
      if (translation) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translation;
        } else if (el.hasAttribute('data-i18n-aria')) {
          el.setAttribute('aria-label', translation);
        } else {
          el.innerHTML = translation;
        }
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update display text
    if (currentLangDisplay) currentLangDisplay.textContent = lang.toUpperCase();
    
    // Custom logic for components that might need re-render (like products)
    if (typeof productTabsSetup === 'function') {
       // Refresh product tabs data if on homepage
       const activeTab = document.querySelector('.tab-btn.active');
       if (activeTab) {
         const event = new CustomEvent('langChanged', { detail: { lang } });
         window.dispatchEvent(event);
       }
    }
    
    updateActiveOption(lang);
  };

  // Bind dropdown options
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = opt.dataset.lang;
      if (lang !== currentLang) {
        currentLang = lang;
        localStorage.setItem('airteam_lang', lang);
        localize(lang);
      }
    });
  });

  // Initial localization
  localize(currentLang);
};


/* ========================================
   HERO SLIDER
   ======================================== */
const sliderSetup = () => {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  let currentSlide = 0;
  let autoplayTimer;

  const goToSlide = (index) => {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 5500);
  };

  const stopAutoplay = () => clearInterval(autoplayTimer);

  // Bind controls
  nextBtn?.addEventListener('click', () => { nextSlide(); startAutoplay(); });
  prevBtn?.addEventListener('click', () => { prevSlide(); startAutoplay(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goToSlide(i); startAutoplay(); });
  });

  // Touch/swipe support
  let touchStartX = 0;
  const heroEl = document.querySelector('.hero');
  heroEl?.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  heroEl?.addEventListener('touchend', (e) => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? nextSlide() : prevSlide();
      startAutoplay();
    }
  }, { passive: true });

  startAutoplay();
};


/* ========================================
   STICKY HEADER
   ======================================== */
const headerSetup = () => {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init
};


/* ========================================
   MOBILE NAVIGATION
   ======================================== */
const mobileNavSetup = () => {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileOverlay');
  const closeBtn = document.getElementById('mobileNavClose');

  const open = () => {
    mobileNav?.classList.add('open');
    overlay?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    mobileNav?.classList.remove('open');
    overlay?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);

  // Close on nav link click
  mobileNav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
};


/* ========================================
   SCROLL REVEAL (Intersection Observer)
   ======================================== */
const scrollRevealSetup = () => {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
  });
};


/* ========================================
   COUNT-UP ANIMATION
   ======================================== */
const countUpSetup = () => {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const formatNumber = (num) => {
    return num >= 1000 ? num.toLocaleString('tr-TR') : num.toString();
  };

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = formatNumber(Math.ceil(current));
    }, stepTime);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
};


/* ========================================
   BACK TO TOP
   ======================================== */
const backToTopSetup = () => {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};


/* ========================================
   PRODUCT TABS
   ======================================== */
const productTabsSetup = () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (!tabBtns.length) return;

  // Product data for each tab - Translated version
  const getProductData = (lang) => {
    const isTr = lang === 'tr';
    return {
      'vidali': [
        { name: isTr ? 'INVERSYS PLUS Serisi' : 'INVERSYS PLUS Series', desc: isTr ? 'Vidalı Kompresör · 5,5-315 kW' : 'Screw Compressor · 5.5-315 kW', img: 'https://www.aircomp.com.tr/wp-content/uploads/2018/04/u1-1024x832.png' },
        { name: isTr ? 'TIDY Serisi' : 'TIDY Series', desc: isTr ? 'Vidalı Kompresör · 2,2-37 kW' : 'Screw Compressor · 2.2-37 kW', img: 'https://www.aircomp.com.tr/wp-content/uploads/2018/04/u2.png' },
        { name: isTr ? 'DVK Direk Akuple Serisi' : 'DVK Direct Coupled Series', desc: isTr ? 'Vidalı Kompresör · 22-315 kW' : 'Screw Compressor · 22-315 kW', img: 'https://www.aircomp.com.tr/wp-content/uploads/2018/04/u3.png' },
        { name: isTr ? 'DVK Serisi' : 'DVK Series', desc: isTr ? 'Vidalı Kompresör · 45-160 kW' : 'Screw Compressor · 45-160 kW', img: 'https://www.aircomp.com.tr/wp-content/uploads/2018/04/u4-1024x886.png' },
      ],
      'seyyar': [
        { name: isTr ? 'PORTAIR Serisi' : 'PORTAIR Series', desc: isTr ? 'Seyyar Kompresör · Yüksek Performans' : 'Portable Compressor · High Performance', img: 'https://www.aircomp.com.tr/wp-content/uploads/2018/04/u5-1024x806.png' },
      ],
      'pistonlu': [
        { name: isTr ? 'Tek ve Çift Kademeli Serisi' : 'Single & Double Stage Series', desc: isTr ? 'Pistonlu Seri · Klasik ve Dayanıklı' : 'Piston Series · Classic & Durable', img: 'https://www.aircomp.com.tr/wp-content/uploads/2018/04/tekcift-1024x768.png' },
      ],
    };
  };

  const renderProducts = (tabKey) => {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const lang = localStorage.getItem('airteam_lang') || 'tr';
    const products = getProductData(lang)[tabKey] || [];

    grid.style.opacity = '0';
    grid.style.transform = 'translateY(16px)';

    setTimeout(() => {
      grid.innerHTML = products.map((p, i) => `
        <div class="product-card reveal revealed" role="article" style="--delay:${i * 0.07}s; opacity:1; visibility:visible; transform:none;">
          <div class="product-card-image">
            <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='src/fallback-1.jpg'">
          </div>
          <div class="product-card-body">
            <h4>${p.name}</h4>
            <p>${p.desc}</p>
          </div>
          <div class="product-card-arrow" aria-hidden="true"><i class="fa-solid fa-arrow-right"></i></div>
        </div>
      `).join('');

      grid.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      grid.style.opacity = '1';
      grid.style.transform = 'translateY(0)';
    }, 200);
  };

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderProducts(btn.dataset.tab);
    });
  });

  // Re-render when language changes (for home page product tabs)
  window.addEventListener('langChanged', () => {
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) renderProducts(activeTab.dataset.tab);
  });
};


/* ========================================
   SMOOTH ANCHOR SCROLL
   ======================================== */
const smoothScrollSetup = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
};


/* ========================================
   INIT
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  i18nSetup(); // Run localization first
  sliderSetup();
  headerSetup();
  mobileNavSetup();
  scrollRevealSetup();
  countUpSetup();
  backToTopSetup();
  productTabsSetup();
  smoothScrollSetup();
});
