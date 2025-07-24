document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            // Activa/desactiva el menú
            navLinks.classList.toggle('nav-active');
            
            // Opcional pero recomendado: Evita que se haga scroll en la página de fondo cuando el menú está abierto
            body.classList.toggle('no-scroll');
        });
    }
});