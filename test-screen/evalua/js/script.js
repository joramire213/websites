document.addEventListener('DOMContentLoaded', function() {

    // --- DATOS DEL TEST (sin cambios) ---
        const testData = {
        questions: [ { id: 1, title: "Preocupación anticipada", text: "Su hijo/a habla o piensa repetidamente en cuándo volverá a usar dispositivos, incluso mientras realiza otras actividades." }, { id: 2, title: "Búsqueda de mayor estímulo", text: "Necesita aumentar el tiempo de pantalla o usar contenidos más intensos para sentir la misma diversión que antes." }, { id: 3, title: "Reacciones de abstinencia", text: "Al interrumpir el uso de dispositivos, aparece irritabilidad, ansiedad o cambios bruscos de humor." }, { id: 4, title: "Dificultad para parar", text: "El tiempo acordado se prolonga o sigue conectado a pesar de que se le pide detenerse." }, { id: 5, title: "Desplazamiento de actividades", text: "Juegos físicos, lectura u otras aficiones quedan relegados por preferir la pantalla." }, { id: 6, title: "Impacto escolar y atencional", text: "Se observan distracción o descenso del rendimiento relacionados con los dispositivos." }, { id: 7, title: "Consecuencias físicas y del sueño", text: "Hay cansancio diurno, alteraciones del sueño o molestias físicas (dolor de cabeza, vista cansada)." }, { id: 8, title: "Regulador emocional", text: "Recurre a la pantalla para calmarse, combatir el aburrimiento o escapar de emociones." }, { id: 9, title: "Engaño u ocultamiento", text: "Oculta el dispositivo, cierra apps rápidamente o minimiza el tiempo real que ha estado conectado." }, { id: 10, title: "Conflictos familiares", text: "Las normas sobre pantallas son motivo recurrente de discusiones o tensión en casa." } ],
        options: [ { text: "Nunca", value: 0 }, { text: "Rara vez", value: 1 }, { text: "A veces", value: 2 }, { text: "Frecuentemente", value: 3 }, { text: "Siempre", value: 4 } ],
        results: [
            {
                level: "Uso saludable",
                scoreRange: [0, 8],
                interpretation: "El uso de pantallas se mantiene dentro de límites equilibrados.",
                action: "Mantenga rutinas variadas, horarios claros y sea ejemplo de uso responsable.",
                color: "#2ecc71"
            },
            {
                level: "Riesgo leve",
                scoreRange: [9, 18],
                interpretation: "Aparecen primeras señales de desequilibrio.",
                action: '<a href="/aprende/06.html">Refuerce los límites</a>, añada “pausas digitales” y <a href="/actua/">fomente actividades sin pantalla</a>.',
                color: "#f1c40f"
            },
            {
                level: "Riesgo moderado",
                scoreRange: [19, 28],
                interpretation: "El impacto en sueño, relaciones o rendimiento es evidente.",
                action: 'Establezca un <a href="/aprende/06.html">plan familiar de reducción</a> y considere buscar <a href="/actua/bienestar-emocional/">orientación profesional</a> si persisten las dificultades.',
                color: "#e67e22"
            },
            {
                level: "Riesgo alto",
                scoreRange: [29, 40],
                interpretation: "Indicadores de dependencia significativa y conflictos frecuentes.",
                action: '<a href="/actua/bienestar-emocional/">Busque apoyo de un profesional en bienestar infantil</a> para una evaluación completa.',
                color: "#e74c3c"
            }
        ]
    }; // <-- ¡Punto y coma crucial aquí para cerrar el objeto!

    // Ahora, la función hexToRgba está fuera del objeto, como debe ser.
    function hexToRgba(hex, alpha = 1) { const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i; hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b); const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); if (!result) return null; const r = parseInt(result[1], 16); const g = parseInt(result[2], 16); const b = parseInt(result[3], 16); return `rgba(${r}, ${g}, ${b}, ${alpha})`; }

    function hexToRgba(hex, alpha = 1) { const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i; hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b); const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); if (!result) return null; const r = parseInt(result[1], 16); const g = parseInt(result[2], 16); const b = parseInt(result[3], 16); return `rgba(${r}, ${g}, ${b}, ${alpha})`; }

    // --- LÓGICA DE LA APLICACIÓN (sin cambios funcionales) ---
    let currentStep = 1;
    const totalVisualSteps = 4;
    let finalScore = 0; 

    const steps = document.querySelectorAll('.test-step');
    const progressBar = document.getElementById('progressBar');
    const progressSteps = document.querySelectorAll('.progress-step');
    const testForm = document.getElementById('screenTimeTest');
    const leadForm = document.getElementById('lead-form');
    const skipBtn = document.getElementById('skip-btn');
    const formStatus = document.getElementById('form-status');

    function updateProgress() {
        let progressPercentage = 0;
        let activeStepIndex = currentStep;

        if (currentStep <= 3) {
            progressPercentage = ((currentStep - 1) / (totalVisualSteps - 1)) * 100;
        } else if (currentStep === 4) {
            progressPercentage = 85;
            activeStepIndex = 3;
        } else if (currentStep === 5) {
            progressPercentage = 100;
            activeStepIndex = 4;
        }

        progressBar.style.width = `${progressPercentage}%`;
        progressSteps.forEach(step => {
            step.classList.toggle('active', parseInt(step.dataset.step) <= activeStepIndex);
        });
    }

    function showStep(stepNumber) {
        steps.forEach(step => step.classList.remove('active'));
        const stepEl = document.getElementById(`step-${stepNumber}`);
        if (stepEl) {
            stepEl.classList.add('active');
        }
        currentStep = stepNumber;
        updateProgress();
        window.scrollTo(0, 0);
    }
    
    function validateStep(stepNumber) { const currentStepEl = document.getElementById(`step-${stepNumber}`); const inputs = currentStepEl.querySelectorAll('input[type="radio"]'); const questionsInStep = new Set([...inputs].map(i => i.name)); let allAnswered = true; questionsInStep.forEach(name => { const questionCard = document.querySelector(`input[name="${name}"]`).closest('.question-card'); questionCard.classList.remove('missing-answer'); if (!testForm.elements[name].value) { allAnswered = false; questionCard.classList.add('missing-answer'); } }); return allAnswered; }
    document.querySelectorAll('.next-button').forEach(button => { button.addEventListener('click', () => { if (currentStep < 3 && !validateStep(currentStep)) return; if (currentStep < 5) showStep(currentStep + 1); }); });
    document.querySelectorAll('.prev-button').forEach(button => { button.addEventListener('click', () => { if (currentStep > 1) showStep(currentStep - 1); }); });

    if (testForm) {
        testForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!validateStep(3)) return; 
            
            let totalScore = 0;
            const formData = new FormData(testForm);
            for (let value of formData.values()) {
                totalScore += parseInt(value, 10);
            }
            
            finalScore = totalScore; 
            showStep(4);
        });
    }

    function generateQuestionHTML(q) { return `<div class="question-card"><h4 class="question-card__title">${q.id}. ${q.title}</h4><p class="question-card__description">${q.text}</p><fieldset class="options-group">${testData.options.map(opt => `<input type="radio" id="q${q.id}_opt${opt.value}" name="question_${q.id}" value="${opt.value}"><label for="q${q.id}_opt${opt.value}">${opt.text}</label>`).join('')}</fieldset></div>`; }
    function generateContent() { document.getElementById('questions-part-1').innerHTML = testData.questions.slice(0, 5).map(generateQuestionHTML).join(''); document.getElementById('questions-part-2').innerHTML = testData.questions.slice(5, 10).map(generateQuestionHTML).join(''); document.querySelector('#action-plan-table tbody').innerHTML = testData.results.map(r => `<tr data-score-range="${r.scoreRange.join('-')}"><td><strong>${r.level}</strong></td><td>${r.scoreRange[0]} – ${r.scoreRange[1]}</td><td>${r.action}</td></tr>`).join(''); const riskScaleContainer = document.getElementById('risk-scale-container'); riskScaleContainer.innerHTML = testData.results.map(r => `<div class="risk-scale__item" data-level="${r.level}"><span class="item__level">${r.level}</span><span class="item__score-range">${r.scoreRange[0]} - ${r.scoreRange[1]} pts</span></div>`).join(''); }

    function displayResults(score) { const result = testData.results.find(r => score >= r.scoreRange[0] && score <= r.scoreRange[1]); document.getElementById('result-level').textContent = result.level; document.getElementById('result-interpretation').textContent = result.interpretation; document.getElementById('final-score').textContent = score; const levelLabel = document.getElementById('result-level'); levelLabel.style.color = result.color; const riskItems = document.querySelectorAll('.risk-scale__item'); riskItems.forEach(item => { item.classList.remove('is-active'); item.style.backgroundColor = ''; item.style.borderColor = ''; }); const activeItem = document.querySelector(`.risk-scale__item[data-level="${result.level}"]`); if (activeItem) { activeItem.classList.add('is-active'); activeItem.style.backgroundColor = result.color; activeItem.style.borderColor = result.color; } document.querySelectorAll('#action-plan-table tbody tr').forEach(row => { row.classList.remove('highlight'); row.style.backgroundColor = ''; }); const highlightedRow = document.querySelector(`tr[data-score-range="${result.scoreRange.join('-')}"]`); if (highlightedRow) { highlightedRow.classList.add('highlight'); highlightedRow.style.backgroundColor = hexToRgba(result.color, 0.15); } }

    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            showStep(5);
            displayResults(finalScore); 
        });
    }
    
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(leadForm);
            const leadData = Object.fromEntries(formData);
        
            // El puntaje ya está calculado y guardado en la variable 'finalScore'
            const resultDetails = testData.results.find(r => finalScore >= r.scoreRange[0] && finalScore <= r.scoreRange[1]);

            // ===================================================================
            // CONSTRUCCIÓN DEL PAYLOAD ALINEADO CON POSTGRES (VERSIÓN EBOOK)
            // ===================================================================
            const payload = {
                created_at: new Date().toISOString(),
                nombre: leadData.nombre || null,
                apellido: leadData.apellido || null, // Nuevo campo
                celular: null, // No se pide en este formulario
                email: leadData.email || null,
                origen: 'Test Ebook', // Origen claro y descriptivo

                // Campos específicos del resultado del test
                score: finalScore,
                nivel: resultDetails.level || null,
                sintomas: resultDetails.interpretation || null, // Mapeo de 'interpretation' a 'sintomas'
                action_plan: resultDetails.action || null,
                color: resultDetails.color || null,
            
                // Campos no aplicables en este formulario
                cta_alt: null,
                mi_caso_es: null
            };
            // ===================================================================
            // FIN DE LA CONSTRUCCIÓN DEL PAYLOAD
            // ===================================================================

            formStatus.textContent = 'Enviando…';
            formStatus.style.color = 'var(--color-text-muted)';

            try {
                const webhookUrl = 'https://n8n-n8n.2gzq2x.easypanel.host/webhook/test_screen';
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'rtl-key': '1234321' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    formStatus.innerHTML = '¡Gracias! Tu Manual va en camino.<br><span style="font-size: 0.9em;">(si no ves el correo, revisa tu bandeja de spam)</span>';
                    formStatus.style.color = '#2ecc71'; 
                    setTimeout(() => {
                        showStep(5);
                        displayResults(finalScore);
                    }, 3000);
                } else {
                    formStatus.textContent = `Error del servidor: ${response.status}`;
                    formStatus.style.color = '#e74c3c';
                }
            } catch (error) {
                console.error('Error de red:', error);
                formStatus.textContent = 'Problema de conexión. Intenta de nuevo.';
                formStatus.style.color = '#e74c3c';
            }
        });
    }

    // Inicialización del Test
    if (document.getElementById('screenTimeTest')) {
        generateContent();
        showStep(1);
    }

    // =========================================================
    // INICIO: LÓGICA DEL MENÚ MÓVIL (de muestra.js)
    // =========================================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            // Añade o quita la clase 'nav-active' para mostrar/ocultar el menú
            navLinks.classList.toggle('nav-active');
        });
    }
    // =========================================================
    // FIN: LÓGICA DEL MENÚ MÓVIL
    // =========================================================

});