// main.js — animaciones, navegación y menú móvil accesible
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Quita la clase .no-js si la usas para degradación elegante en CSS
  document.documentElement.classList.remove('no-js');

  // 1) Reveal-on-scroll (respeta prefers-reduced-motion)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animTargets = document.querySelectorAll(
    '.nosotros-content, .servicios-grid, .metodo-grid, .contacto-wrapper, .faq-list'
  );

  if (animTargets.length && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    animTargets.forEach((el) => revealObserver.observe(el));
  } else {
    // Si reduce motion o no hay targets, muestra todo sin animar
    animTargets.forEach((el) => el.classList.add('visible'));
  }

  // 2) Menú móvil (hamburguesa) con foco, ESC y bloqueo de scroll
  const burgerButton = document.querySelector('.burger-menu');
  const mobileNav = document.querySelector('.mobile-nav-container');

  function closeMobileNav(focusBack = true) {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    if (burgerButton) burgerButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // Quita listener de cierre externo si estaba activo
    document.removeEventListener('click', outsideClose, true);
    if (focusBack && burgerButton) burgerButton.focus();
  }

  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    if (burgerButton) burgerButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Foco accesible en el contenedor
    mobileNav.setAttribute('tabindex', '-1');
    mobileNav.focus();
    // Cierre al hacer click fuera
    setTimeout(() => document.addEventListener('click', outsideClose, true), 0);
  }

  function outsideClose(e) {
    if (!mobileNav) return;
    const isClickInside = mobileNav.contains(e.target) || e.target === burgerButton;
    if (!isClickInside) closeMobileNav(false);
  }

  if (burgerButton && mobileNav) {
    burgerButton.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('is-open');
      if (isOpen) closeMobileNav(false);
      else openMobileNav();
    });

    // Cierra al seleccionar un enlace
    mobileNav.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) closeMobileNav(false);
    });

    // Cierra con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMobileNav();
      }
    });
  }

  // 3) Resaltado de navegación activa (soporta "#id" y "index.html#id")
  const sections = document.querySelectorAll('main > section[id]');
  const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav-container a');

  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            const href = link.getAttribute('href') || '';
            if (href === `#${id}` || href.endsWith(`#${id}`)) {
              link.classList.add('active');
            }
          });
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sections.forEach((sec) => navObserver.observe(sec));
  }

  // 4) Scroll suave en anclajes internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      // Permite anchors vacíos o no válidos sin bloquear
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // 5) Iconos Lucide (convierte <i data-lucide="..."> en SVG)
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }

  // 6) Header: solidificar al hacer scroll + scroll-to-top en clic de logo si ya estás en el home
  const headerEl = document.querySelector('.main-header');
  function toggleHeaderSolid() {
    if (!headerEl) return;
    const y = window.scrollY || window.pageYOffset || 0;
    if (y > 4) headerEl.classList.add('is-scrolled');
    else headerEl.classList.remove('is-scrolled');
  }
  toggleHeaderSolid();
  window.addEventListener('scroll', toggleHeaderSolid, { passive: true });

  // Clic en logo: si ya estamos en el home, hacer scroll al tope en vez de recargar
  document.querySelectorAll('.logo-link').forEach((logo) => {
    logo.addEventListener('click', (e) => {
      // ¿Estamos ya en el home?
      const path = (window.location.pathname || '').replace(/\/+$/, '');
      const isHome = path.endsWith('/index.html') || path === '' || path === '/' ;

      if (isHome) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
});