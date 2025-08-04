    // --- INITIALIZATIONS ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- DOM ELEMENT SELECTORS ---
    const htmlTag = document.documentElement;
    const allLangButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-lang]');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuPanel = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    // --- MULTILANGUAGE LOGIC ---
    const seoMetas = {
        es: { title: "Exclusivo Apartamento en Venta | 152m², Laureles, Medellín", description: "Apartamento de lujo de 152.17m² totalmente remodelado en Laureles. 3 habitaciones, biblioteca, 2 balcones y acabados premium." },
        en: { title: "Exclusive Apartment for Sale | 152m², Laureles, Medellín", description: "Luxury 152.17m² fully remodeled apartment in Laureles. 3 bedrooms, library, 2 balconies, and premium finishes." },
        fr: { title: "Appartement Exclusif à Vendre | 152m², Laureles, Medellín", description: "Appartement de luxe de 152.17m² entièrement rénové à Laureles. 3 chambres, bibliothèque, 2 balcons et finitions premium." },
        de: { title: "Exklusive Wohnung zum Verkauf | 152m², Laureles, Medellín", description: "Komplett renovierte 152,17m² Luxuswohnung in Laureles. 3 Schlafzimmer, Bibliothek, 2 Balkone und hochwertige Ausstattung." }
    };

    function switchLanguage(targetLang) {
        htmlTag.lang = targetLang;
        document.title = seoMetas[targetLang].title;
        document.querySelector('meta[name="description"]').setAttribute('content', seoMetas[targetLang].description);

        translatableElements.forEach(el => {
            el.classList.toggle('hidden', el.dataset.lang !== targetLang);
        });

        allLangButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.targetLang === targetLang);
        });
    }

    allLangButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchLanguage(button.dataset.targetLang);
            mobileMenuPanel.classList.add('hidden'); // Cierra el menú si se cambia el idioma desde ahí
        });
    });

    // --- MOBILE MENU LOGIC ---
    mobileMenuButton.addEventListener('click', () => {
        mobileMenuPanel.classList.toggle('hidden');
    });

    // Cierra el menú al hacer clic en un enlace
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuPanel.classList.add('hidden');
        });
    });
    
    // --- GALLERY & LIGHTBOX LOGIC ---
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryPanels = document.querySelectorAll('.gallery-panel');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    let currentImageIndex;
    let visibleImages = [];

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            galleryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            galleryPanels.forEach(panel => {
                panel.classList.toggle('active', panel.id === `panel-${target}`);
            });
        });
    });

    function updateVisibleImages() {
        const activePanel = document.querySelector('.gallery-panel.active');
        visibleImages = activePanel ? Array.from(activePanel.querySelectorAll('.gallery-img')) : [];
    }

    function openLightbox(index) {
        updateVisibleImages();
        if (index < 0 || index >= visibleImages.length) return;
        currentImageIndex = index;
        lightboxImg.src = visibleImages[currentImageIndex].src;
        lightbox.classList.add('active');
    }

    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', () => {
            const panelImages = Array.from(img.closest('.gallery-panel').querySelectorAll('.gallery-img'));
            openLightbox(panelImages.indexOf(img));
        });
    });

    document.getElementById('lightbox-close').addEventListener('click', () => lightbox.classList.remove('active'));
    document.getElementById('lightbox-prev').addEventListener('click', () => openLightbox(currentImageIndex - 1));
    document.getElementById('lightbox-next').addEventListener('click', () => openLightbox(currentImageIndex + 1));
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') lightbox.classList.remove('active');
        if (e.key === 'ArrowLeft') openLightbox(currentImageIndex - 1);
        if (e.key === 'ArrowRight') openLightbox(currentImageIndex + 1);
    });

// --- REAL-TIME CURRENCY CONVERSION ---
async function updateUsdPrice() {
    // 1. **REEMPLAZA ESTO** con tu clave de API real.
    const apiKey = 'fd1fd1c2501b2dba70d771da';
    
    // 2. Define el precio en COP y el elemento HTML a actualizar.
    const copPrice = 1200000000;
    const usdPriceElement = document.getElementById('price-usd');
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    // 3. Usa un bloque try...catch para manejar errores elegantemente.
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta.');
        }
        const data = await response.json();
        
        // 4. Verifica que la API respondió correctamente y tiene la tasa de COP.
        if (data.result === 'success' && data.conversion_rates.COP) {
            const copRate = data.conversion_rates.COP;
            const usdValue = copPrice / copRate;
            
            // 5. Formatea el número con estilo de moneda (USD) y sin decimales.
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            
            // 6. Actualiza el HTML con el valor formateado.
            usdPriceElement.innerHTML = `(aprox. ${formatter.format(usdValue)} USD)`;
        } else {
            // Si la API no devuelve la tasa, lanza un error.
            throw new Error('Datos inválidos desde la API de cambio.');
        }
    } catch (error) {
        console.error('Error al obtener los datos de cambio:', error);
        // En caso de error, simplemente ocultamos el texto para no mostrar información incorrecta.
        usdPriceElement.style.display = 'none';
    }
}

// Llama a la función cuando el contenido de la página se haya cargado.
updateUsdPrice();