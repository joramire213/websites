// /js/layout.js (Versión actualizada)

document.addEventListener('DOMContentLoaded', function () {

    // --- 1. PLANTILLA DEL HEADER (Sin cambios) ---
    const headerHTML = `
        <header class="page-header">
            <div class="header-content">
                <a href="/" class="logo-link">
                    <img src="/img/logo_tiempodejugar.png" alt="Logo Tiempo de Jugar" class="logo">
                </a>
                <nav class="main-nav">
                    <ul class="nav-links">
                        <li><a href="/evalua/">Evalúa</a></li>
                        <li><a href="/aprende/">Aprende</a></li>
                        <li><a href="/actua/">Actúa</a></li>
                    </ul>
                    <button class="nav-toggle" aria-label="Abrir menú">☰</button>
                </nav>
            </div>
        </header>
    `;

    // --- 2. PLANTILLA DEL FOOTER (AQUÍ ESTÁ EL CAMBIO) ---
    const footerHTML = `
        <footer class="page-footer">
            <div class="footer-copyright">
                <p>© 2025 Tiempo de Jugar. Todos los derechos reservados.</p>
                <!-- Texto actualizado para reflejar el cambio del prompt -->
                <p>Una iniciativa para las familias colombianas.</p> 
            </div>

            <!-- Nueva sección para los logos de los socios -->
            <div class="footer-partners">
                <div class="partner-item">
                    <p class="partner-label">Un desarrollo de:</p>
                    <a href="https://travisafe.com/" target="_blank">
                        <!-- Reutilizamos la clase genérica .partner-logo -->
                        <img src="https://vivelacity.com/wp-content/uploads/2025/03/Logo_Travi_Connect_Trans.png" alt="Logo Travisafe" class="partner-logo">
                    </a>
                </div>
                <div class="partner-item">
                    <p class="partner-label">Coordinado por:</p>
                    <!-- El cambio está en la siguiente línea -->
                    <a href="https://lideresavanzandoenpaz.org/" target="_blank"> 
                        <img src="/img/corpolideres.png" alt="Logo Corpolíderes" class="partner-logo">
                    </a>
                </div>
            </div>
        </footer>
    `;

    // --- 3. INSERCIÓN EN EL DOM (Sin cambios) ---
    const headerPlaceholder = document.querySelector('body > header') || document.body;
    const footerPlaceholder = document.querySelector('body > footer') || document.body;

    if (headerPlaceholder) {
        headerPlaceholder.insertAdjacentHTML('afterbegin', headerHTML);
    }

    if (footerPlaceholder) {
        footerPlaceholder.insertAdjacentHTML('beforeend', footerHTML);
    }

    // --- 4. RE-INICIALIZACIÓN DE SCRIPTS (Sin cambios) ---
    initializeMobileMenu();
    setActiveNavLink();
});