/* js/layout.js
   Inserta un header y footer consistentes en TODO el sitio.
   Detecta si la página está en una subcarpeta (p. ej. /articulos/, /podcasts/)
   para ajustar automáticamente las rutas relativas (../). 
   Debe cargarse con 'defer' para ejecutar ANTES del DOMContentLoaded de main.js.
*/

(function () {
  // 1) Detectar base relativa automáticamente
  //    Si la URL contiene /articulos/ o /podcasts/ asumimos una profundidad de 1 carpeta.
  //    Puedes ampliar este array si agregas nuevas secciones a nivel 1.
  var path = window.location.pathname;
  var isLevel1 = /\/(articulos|podcasts)\//.test(path);
  var base = isLevel1 ? "../" : "";

  // 2) Plantilla del HEADER (coherente con index.html)
  var headerHTML = ''
    + '<header class="main-header">'
    + '  <div class="container header-container">'
    + '    <a href="' + base + 'index.html#hero" class="logo-link">'
    + '      <img src="' + base + 'img/logo.png" alt="Logo Momento Presente" class="logo">'
    + '    </a>'
    + '    <nav class="main-nav">'
    + '      <ul>'
    + '        <li><a href="' + base + 'index.html#nosotros">Nosotros</a></li>'
    + '        <li><a href="' + base + 'index.html#metodo">Método</a></li>'
    + '        <li><a href="' + base + 'index.html#servicios">Servicios</a></li>'
    + '        <li><a href="' + base + 'index.html#testimonios">Testimonios</a></li>'
    + '        <li><a href="' + base + 'index.html#faq">FAQ</a></li>'
    + '        <li><a href="' + base + 'index.html#contacto">Contacto</a></li>'
    + '      </ul>'
    + '    </nav>'
    + '    <button class="burger-menu" aria-label="Abrir menú" aria-expanded="false">'
    + '      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'
    + '    </button>'
    + '  </div>'
    + '  <div class="mobile-nav-container">'
    + '    <a href="' + base + 'index.html#nosotros">Nosotros</a>'
    + '    <a href="' + base + 'index.html#metodo">Método</a>'
    + '    <a href="' + base + 'index.html#servicios">Servicios</a>'
    + '    <a href="' + base + 'index.html#testimonios">Testimonios</a>'
    + '    <a href="' + base + 'index.html#faq">FAQ</a>'
    + '    <a href="' + base + 'index.html#contacto" class="btn btn-primary">Agendar Cita</a>'
    + '  </div>'
    + '</header>';

  // 3) Plantilla del FOOTER (coherente con index.html)
  var footerHTML = ''
    + '<footer class="main-footer">'
    + '  <div class="container footer-container">'
    + '    <div class="copyright-info">'
    + '      <p>&copy; 2025 Momento Presente</p>'
    + '      <p>Acompañamiento Terapéutico | Medellín, Colombia</p>'
    + '    </div>'
    + '    <div class="credits-info">'
    + '      <p class="credits-text">Diseñado y desarrollado con ❤️ por:</p>'
    + '      <a href="https://travisafe.com/" target="_blank" class="travisafe-logo-link">'
    + '        <img src="https://vivelacity.com/wp-content/uploads/2024/11/Logo_Travi_Connect_Trans_A.webp" alt="Logo Travisafe" class="footer-logo">'
    + '      </a>'
    + '    </div>'
    + '  </div>'
    + '</footer>';

  // 4) Insertar en los “mount points”
  //    Si existen #site-header / #site-footer los usamos; de lo contrario, los creamos al inicio y al final del <body>.
  function ensureMount(selector, where) {
    var el = document.querySelector(selector);
    if (!el) {
      el = document.createElement(where === "header" ? "div" : "div");
      el.id = selector.replace("#", "");
      if (where === "header") {
        document.body.insertAdjacentElement("afterbegin", el);
      } else {
        document.body.insertAdjacentElement("beforeend", el);
      }
    }
    return el;
  }

  var headerMount = ensureMount("#site-header", "header");
  var footerMount = ensureMount("#site-footer", "footer");

  headerMount.innerHTML = headerHTML;
  footerMount.innerHTML = footerHTML;

  // 5) Marcar enlaces activos cuando estamos en secciones “Artículos” o “Podcasts”
  //    (opcional: mantiene consistencia visual de navegación)
  try {
    var current = path.toLowerCase();
    var links = document.querySelectorAll(".main-nav a, .mobile-nav-container a");
    links.forEach(function (a) {
      var href = a.getAttribute("href");
      // Solo marcamos como active los anchors del home cuando estamos en el home.
      // En subpáginas, dejamos la lógica de main.js para resaltar por secciones.
      if (!isLevel1 && href && href.indexOf("#") === 0) return;
      a.classList.toggle("active", false);
    });
  } catch (e) { /* noop */ }

  // 6) Exponer la base detectada por si alguna página la necesita (p. ej. para rutas de imágenes locales)
  window.__SITE_BASE__ = base;

  // 7) Si Lucide ya está cargado, renderiza íconos del header/footer
  if (window.lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }
})();