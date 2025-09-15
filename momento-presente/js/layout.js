/* js/layout.js
   Inserta header y footer consistentes en TODO el sitio.
   Detecta si la página está en /articulos/ o /podcasts/ para ajustar rutas (../).
   Cárgalo con 'defer' para que se ejecute antes del DOMContentLoaded de main.js.
*/
(function () {
  // 1) Base relativa simple para secciones de nivel 1
  var path = window.location.pathname;
  var isLevel1 = /\/(articulos|podcasts)\//.test(path);
  var base = isLevel1 ? "../" : "";

  // 2) HEADER
  var headerHTML = ''
    + '<header class="main-header">'
    + '  <div class="container header-container">'
    + '    <a href="' + base + 'index.html#hero" class="logo-link">'
    + '      <img src="' + base + 'img/logo.png" alt="Logo Momento Presente" class="logo">'
    + '    </a>'
    + '    <nav class="main-nav" aria-label="Navegación principal">'
    + '      <ul>'
    + '        <li><a href="' + base + 'index.html#nosotros">Nosotros</a></li>'
    + '        <li><a href="' + base + 'index.html#metodo">Método</a></li>'
    + '        <li><a href="' + base + 'index.html#servicios">Servicios</a></li>'
    + '        <li><a href="' + base + 'index.html#testimonios">Testimonios</a></li>'
    + '        <li><a href="' + base + 'index.html#faq">FAQ</a></li>'
    + '        <li><a href="' + base + 'index.html#contacto">Contacto</a></li>'
    + '      </ul>'
    + '    </nav>'
    + '    <button class="burger-menu" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-nav">'
    + '      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'
    + '    </button>'
    + '  </div>'
    + '  <div class="mobile-nav-container" id="mobile-nav" aria-hidden="true" tabindex="-1">'
    + '    <a href="' + base + 'index.html#nosotros">Nosotros</a>'
    + '    <a href="' + base + 'index.html#metodo">Método</a>'
    + '    <a href="' + base + 'index.html#servicios">Servicios</a>'
    + '    <a href="' + base + 'index.html#testimonios">Testimonios</a>'
    + '    <a href="' + base + 'index.html#faq">FAQ</a>'
    + '    <a href="' + base + 'index.html#contacto" class="btn btn-primary">Agendar Cita</a>'
    + '  </div>'
    + '</header>';

  // 3) FOOTER
  var footerHTML = ''
    + '<footer class="main-footer">'
    + '  <div class="container footer-container">'
    + '    <div class="copyright-info">'
    + '      <p>&copy; 2025 Momento Presente</p>'
    + '      <p>Acompañamiento Terapéutico | Medellín, Colombia</p>'
    + '    </div>'
    + '    <div class="credits-info">'
    + '      <p class="credits-text">Diseñado y desarrollado con ❤️ por:</p>'
    + '      <a href="https://travisafe.com/" target="_blank" rel="noopener noreferrer" class="travisafe-logo-link">'
    + '        <img src="https://vivelacity.com/wp-content/uploads/2024/11/Logo_Travi_Connect_Trans_A.webp" alt="Logo Travisafe" class="footer-logo">'
    + '      </a>'
    + '    </div>'
    + '  </div>'
    + '</footer>';

  // 4) Montaje en #site-header / #site-footer (si no existen, se crean)
  function ensureMount(selector, where) {
    var el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('div');
      el.id = selector.replace('#', '');
      if (where === 'header') {
        document.body.insertAdjacentElement('afterbegin', el);
      } else {
        document.body.insertAdjacentElement('beforeend', el);
      }
    }
    return el;
  }

  var headerMount = ensureMount('#site-header', 'header');
  var footerMount = ensureMount('#site-footer', 'footer');

  headerMount.innerHTML = headerHTML;
  footerMount.innerHTML = footerHTML;

  // 5) Limpieza de "active" por defecto (el resaltado dinámico lo hace main.js)
  try {
    var links = document.querySelectorAll('.main-nav a, .mobile-nav-container a');
    links.forEach(function (a) { a.classList.remove('active'); });
  } catch (e) { /* noop */ }

  // 6) Exponer base por si se requiere en otras partes
  window.__SITE_BASE__ = base;

  // 7) Render de iconos si Lucide ya está disponible
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
})();
 // :contentReference[oaicite:0]{index=0}