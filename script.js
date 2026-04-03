/**
 * Dalgakıran Static Website - Main JS
 * Features: Hero Slider, Sticky Header, Scroll Reveal, Count-Up, Mobile Nav, Back-to-top
 */

'use strict';

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

  // Product data for each tab
  const productData = {
    'vidali': [
      { name: 'INVERSYS PLUS', desc: 'Vidalı Kompresör · 5.5-315 kW', img: 'https://www.aircomp.com.tr/wp-content/uploads/2018/04/u1-1024x832.png' },
      { name: 'TIDY Serisi', desc: 'Vidalı Kompresör · 2.2-37 kW', img: 'https://www.aircomp.com.tr/wp-content/uploads/2018/04/u2.png' },
      { name: 'DVK Direk Akuple', desc: 'Vidalı Kompresör · 22-315 kW', img: 'https://www.aircomp.com.tr/wp-content/uploads/2018/04/u3.png' },
      { name: 'DVK Serisi', desc: 'Vidalı Kompresör · 45-160 kW', img: 'https://www.aircomp.com.tr/wp-content/uploads/2018/04/u4-1024x886.png' },
    ],
    'seyyar': [
      { name: 'PORTAIR Serisi', desc: 'Seyyar Kompresör · Yüksek Performans', img: 'https://www.aircomp.com.tr/wp-content/uploads/2018/04/u5-1024x806.png' },
    ],
    'pistonlu': [
      { name: 'Tek ve Çift Kademeli', desc: 'Pistonlu Seri · Klasik ve Dayanıklı', img: 'https://www.aircomp.com.tr/wp-content/uploads/2018/04/tekcift-1024x768.png' },
    ],
  };

  const renderProducts = (tabKey) => {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const products = productData[tabKey] || [];

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
  sliderSetup();
  headerSetup();
  mobileNavSetup();
  scrollRevealSetup();
  countUpSetup();
  backToTopSetup();
  productTabsSetup();
  smoothScrollSetup();
});
