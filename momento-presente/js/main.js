document.addEventListener('DOMContentLoaded', function() {

    // 1. Animación de "Revelado al hacer Scroll"
    const elementsToAnimate = document.querySelectorAll(
      '.nosotros-content, .servicios-grid, .metodo-grid, .contacto-wrapper, .faq-list'
    );
    if (elementsToAnimate.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elementsToAnimate.forEach(element => revealObserver.observe(element));
    }

    // 2. Lógica del Menú Móvil (Hamburguesa)
    const burgerButton = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav-container');
    if (burgerButton && mobileNav) {
        burgerButton.addEventListener('click', () => {
            mobileNav.classList.toggle('is-open');
            const isExpanded = mobileNav.classList.contains('is-open');
            burgerButton.setAttribute('aria-expanded', isExpanded);
        });

        mobileNav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                mobileNav.classList.remove('is-open');
                burgerButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 3. Resaltado de Navegación Activa
    const sections = document.querySelectorAll('main > section[id]');
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav-container a');
    if (sections.length > 0 && navLinks.length > 0) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });

        sections.forEach(section => navObserver.observe(section));
    }
    
    // 4. Lógica de Scroll Suave para todos los anclajes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 5. ACTIVAR ICONOS LUCIDE (convierte <i data-lucide="..."> en SVG)
    if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
    }

});