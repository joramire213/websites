document.addEventListener('DOMContentLoaded', function () {
    
    // =========================================================
    // LÓGICA DEL MENÚ MÓVIL
    // =========================================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('nav-active');
        });
    }

    // =========================================================
    // LÓGICA PARA MARCAR ENLACE ACTIVO EN MENÚ PRINCIPAL
    // =========================================================
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const mainNavLinks = document.querySelectorAll('.main-nav .nav-links a');

        // Reiniciar todos los enlaces
        mainNavLinks.forEach(link => link.classList.remove('active'));

        let linkFound = false;
        mainNavLinks.forEach(link => {
            const linkPath = link.pathname;
            // Condición estricta para subpáginas: /actua/ o /aprende/
            if (currentPath.startsWith(linkPath) && linkPath !== '/') {
                link.classList.add('active');
                linkFound = true;
            }
        });

        // Si después de revisar todas las subpáginas no encontramos coincidencia,
        // y estamos en la página de inicio, marcamos el enlace de inicio.
        const homeLink = document.querySelector('.main-nav .nav-links a[href="/"]');
        if (!linkFound && currentPath === '/' && homeLink) {
            homeLink.classList.add('active');
        }
    }

    // Ejecutamos la función al cargar la página
    setActiveNavLink();

});