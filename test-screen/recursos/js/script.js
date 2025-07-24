document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.page-header');

    if (navToggle && navLinks && header) {
        const setMenuPosition = () => {
            const headerHeight = header.offsetHeight;
            navLinks.style.top = `${headerHeight}px`;
            navLinks.style.height = `calc(100vh - ${headerHeight}px)`;
        };

        // Ajusta la posición al cargar y al cambiar el tamaño de la ventana
        setMenuPosition();
        window.addEventListener('resize', setMenuPosition);

        // Maneja el clic del botón
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });
    }
});