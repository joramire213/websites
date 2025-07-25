document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            // Simplemente añade o quita la clase 'nav-active' a la lista de links.
            navLinks.classList.toggle('nav-active');
        });
    }
});