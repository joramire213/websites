// /js/script.js

/**
 * Añade la funcionalidad de 'toggle' al menú hamburguesa para móviles.
 * Esta función es llamada desde layout.js después de que el header ha sido insertado.
 */
function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('nav-active');
        });
    } else {
        // Un pequeño mensaje en consola para depuración, por si algo falla.
        // console.warn('No se encontraron los elementos para el menú móvil.');
    }
}

/**
 * Marca como 'activo' el enlace de la navegación principal que corresponde a la página actual.
 * Esta función es llamada desde layout.js después de que el header ha sido insertado.
 */
function setActiveNavLink() {
    const currentPath = window.location.pathname; // Ej: "/aprende/02.html" o "/"
    const mainNavLinks = document.querySelectorAll('.main-nav .nav-links a');

    mainNavLinks.forEach(link => {
        const linkPath = link.pathname; // Ej: "/aprende/" o "/"

        // Reiniciamos por si acaso
        link.classList.remove('active');

        // CASO 1: Es el enlace a la página de inicio ("/")
        if (linkPath === '/') {
            if (currentPath === '/') {
                link.classList.add('active');
            }
        } 
        // CASO 2: Es un enlace a una sección (ej: "/aprende/")
        else {
            if (currentPath.startsWith(linkPath)) {
                link.classList.add('active');
            }
        }
    });
}

// Nota: Ya no hay un `DOMContentLoaded` aquí. Las funciones son como "motores apagados"
// esperando a que layout.js les dé la orden de arrancar.