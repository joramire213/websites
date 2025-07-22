document.addEventListener('DOMContentLoaded', function() {

    // --- DATOS DEL TEST (sin cambios) ---
    const testData = {
        questions: [
            // Parte 1
            { id: 1, title: "Preocupación anticipada", text: "Su hijo/a habla o piensa repetidamente en cuándo volverá a usar dispositivos, incluso mientras realiza otras actividades." },
            { id: 2, title: "Búsqueda de mayor estímulo", text: "Necesita aumentar el tiempo de pantalla o usar contenidos más intensos para sentir la misma diversión que antes." },
            { id: 3, title: "Reacciones de abstinencia", text: "Al interrumpir el uso de dispositivos, aparece irritabilidad, ansiedad o cambios bruscos de humor." },
            { id: 4, title: "Dificultad para parar", text: "El tiempo acordado se prolonga o sigue conectado a pesar de que se le pide detenerse." },
            { id: 5, title: "Desplazamiento de actividades", text: "Juegos físicos, lectura u otras aficiones quedan relegados por preferir la pantalla." },
            // Parte 2
            { id: 6, title: "Impacto escolar y atencional", text: "Se observan distracción o descenso del rendimiento relacionados con los dispositivos." },
            { id: 7, title: "Consecuencias físicas y del sueño", text: "Hay cansancio diurno, alteraciones del sueño o molestias físicas (dolor de cabeza, vista cansada)." },
            { id: 8, title: "Regulador emocional", text: "Recurre a la pantalla para calmarse, combatir el aburrimiento o escapar de emociones." },
            { id: 9, title: "Engaño u ocultamiento", text: "Oculta el dispositivo, cierra apps rápidamente o minimiza el tiempo real que ha estado conectado." },
            { id: 10, title: "Conflictos familiares", text: "Las normas sobre pantallas son motivo recurrente de discusiones o tensión en casa." }
        ],
        options: [ { text: "Nunca", value: 0 }, { text: "Rara vez", value: 1 }, { text: "A veces", value: 2 }, { text: "Frecuentemente", value: 3 }, { text: "Siempre", value: 4 } ],
        results: [
            { level: "Uso saludable", scoreRange: [0, 8], interpretation: "El uso de pantallas se mantiene dentro de límites equilibrados.", action: "Mantenga rutinas variadas, horarios claros y sea ejemplo de uso responsable.", color: "#2ecc71" },
            { level: "Riesgo leve", scoreRange: [9, 18], interpretation: "Aparecen primeras señales de desequilibrio.", action: "Refuerce límites, añada “pausas digitales” y fomente actividades sin pantalla.", color: "#f1c40f" },
            { level: "Riesgo moderado", scoreRange: [19, 28], interpretation: "El impacto en sueño, relaciones o rendimiento es evidente.", action: "Establezca un plan familiar de reducción y considere orientación profesional si persisten las dificultades.", color: "#e67e22" },
            { level: "Riesgo alto", scoreRange: [29, 40], interpretation: "Indicadores de dependencia significativa y conflictos frecuentes.", action: "Busque apoyo de un profesional en bienestar infantil para una evaluación completa.", color: "#e74c3c" }
        ]
    };

    // ==== INICIO DE CÓDIGO AÑADIDO: Función auxiliar para convertir HEX a RGBA ====
    /**
     * Convierte un color hexadecimal a formato RGBA.
     * @param {string} hex - El color en formato #RRGGBB.
     * @param {number} alpha - El nivel de opacidad (de 0 a 1).
     * @returns {string} - El color en formato rgba(r, g, b, alpha).
     */
    function hexToRgba(hex, alpha = 1) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return null;
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    // ==== FIN DE CÓDIGO AÑADIDO ====

    // --- LÓGICA DE LA APLICACIÓN (sin cambios en la navegación) ---
    let currentStep = 1;
    const totalSteps = 4;
    const steps = document.querySelectorAll('.test-step');
    const progressBar = document.getElementById('progressBar');
    const progressSteps = document.querySelectorAll('.progress-step');
    const testForm = document.getElementById('screenTimeTest');

    function updateProgress() {
        const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressSteps.forEach(step => {
            step.classList.toggle('active', parseInt(step.dataset.step) <= currentStep);
        });
    }

    function showStep(stepNumber) {
        steps.forEach(step => step.classList.remove('active'));
        document.getElementById(`step-${stepNumber}`).classList.add('active');
        currentStep = stepNumber;
        updateProgress();
        window.scrollTo(0, 0); // Desplaza la ventana a la parte superior
    }
    
    function validateStep(stepNumber) {
        const currentStepEl = document.getElementById(`step-${stepNumber}`);
        const inputs = currentStepEl.querySelectorAll('input[type="radio"]');
        const questionsInStep = new Set([...inputs].map(i => i.name));
        let allAnswered = true;
        questionsInStep.forEach(name => {
            const questionCard = document.querySelector(`input[name="${name}"]`).closest('.question-card');
            questionCard.classList.remove('missing-answer');
            if (!testForm.elements[name].value) {
                allAnswered = false;
                questionCard.classList.add('missing-answer');
            }
        });
        return allAnswered;
    }

    document.querySelectorAll('.next-button').forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < totalSteps - 1 && !validateStep(currentStep)) return;
            if (currentStep < totalSteps) showStep(currentStep + 1);
        });
    });

    document.querySelectorAll('.prev-button').forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 1) showStep(currentStep - 1);
        });
    });

    testForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateStep(currentStep)) return;
        let totalScore = 0;
        const formData = new FormData(testForm);
        for (let value of formData.values()) {
            totalScore += parseInt(value, 10);
        }
        displayResults(totalScore);
        showStep(totalSteps);
    });

    // --- GENERACIÓN DE CONTENIDO DINÁMICO (MODIFICADA) ---
    function generateQuestionHTML(q) {
        return `
            <div class="question-card">
                <h4 class="question-card__title">${q.id}. ${q.title}</h4>
                <p class="question-card__description">${q.text}</p>
                <fieldset class="options-group">
                    ${testData.options.map(opt => `
                        <input type="radio" id="q${q.id}_opt${opt.value}" name="question_${q.id}" value="${opt.value}">
                        <label for="q${q.id}_opt${opt.value}">${opt.text}</label>
                    `).join('')}
                </fieldset>
            </div>`;
    }

    function generateContent() {
        // Generar preguntas (sin cambios)
        document.getElementById('questions-part-1').innerHTML = testData.questions.slice(0, 5).map(generateQuestionHTML).join('');
        document.getElementById('questions-part-2').innerHTML = testData.questions.slice(5, 10).map(generateQuestionHTML).join('');
        
        // Generar tabla de resultados (sin cambios)
        document.querySelector('#action-plan-table tbody').innerHTML = testData.results.map(r => `
            <tr data-score-range="${r.scoreRange.join('-')}">
                <td><strong>${r.level}</strong></td>
                <td>${r.scoreRange[0]} – ${r.scoreRange[1]}</td>
                <td>${r.action}</td>
            </tr>
        `).join('');

        // ==== NUEVO: Generar la escala de riesgo categórica ====
        const riskScaleContainer = document.getElementById('risk-scale-container');
        riskScaleContainer.innerHTML = testData.results.map(r => `
            <div class="risk-scale__item" data-level="${r.level}">
                <span class="item__level">${r.level}</span>
                <span class="item__score-range">${r.scoreRange[0]} - ${r.scoreRange[1]} pts</span>
            </div>
        `).join('');
    }

    // --- LÓGICA DE RESULTADOS (MODIFICADA) ---
    function displayResults(score) {
        const result = testData.results.find(r => score >= r.scoreRange[0] && score <= r.scoreRange[1]);
        
        document.getElementById('result-level').textContent = result.level;
        document.getElementById('result-interpretation').textContent = result.interpretation;
        document.getElementById('final-score').textContent = score;

        const levelLabel = document.getElementById('result-level');
        levelLabel.style.color = result.color;

        const riskItems = document.querySelectorAll('.risk-scale__item');
        riskItems.forEach(item => {
            item.classList.remove('is-active');
            item.style.backgroundColor = '';
            item.style.borderColor = '';
        });
        
        const activeItem = document.querySelector(`.risk-scale__item[data-level="${result.level}"]`);
        if (activeItem) {
            activeItem.classList.add('is-active');
            activeItem.style.backgroundColor = result.color;
            activeItem.style.borderColor = result.color;
        }
        
        // ==== INICIO DE CÓDIGO MODIFICADO: Resaltar fila en la tabla con color dinámico ====
        document.querySelectorAll('#action-plan-table tbody tr').forEach(row => {
            row.classList.remove('highlight');
            row.style.backgroundColor = ''; // Limpia el color de fondo anterior
        });

        const highlightedRow = document.querySelector(`tr[data-score-range="${result.scoreRange.join('-')}"]`);
        if (highlightedRow) {
            highlightedRow.classList.add('highlight');
            // Aplicamos el color del resultado con una opacidad del 15%
            highlightedRow.style.backgroundColor = hexToRgba(result.color, 0.15); 
        }
        // ==== FIN DE CÓDIGO MODIFICADO ====
    }

    // Inicialización
    generateContent();
    showStep(1);
});