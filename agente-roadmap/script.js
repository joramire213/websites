/* --- AGENT OS // INTERACTIVITY_ENGINE_v1.0 --- */
/* --- ARCHITECT: n8n Agent Architect --- */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- STATE & CONFIG ---
    const STATE_STORAGE_KEY = 'agentMissionProgress';
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const globalProgress = document.getElementById('global-progress');
    const globalProgressValue = document.getElementById('global-progress-value');

    // --- SOUND ENGINE ---
    const sfx = {
        click: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjQwLjEwMQAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAA//uQZAUAAAAAAAAAABJA//uQZAUAAAAAAAAAABJA//uQZAUAAAAAAAAAABJA'),
        type: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjQwLjEwMQAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAA//uQZAUAAAAAAAAAABJA//uQZAUAAAAAAAAAABJA//uQZAUAAAAAAAAAABJA') // Placeholder, just reusing
    };
    
    // --- TYPEWRITER EFFECT ---
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = "";
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // --- CORE LOGIC: PROGRESS & STATE ---
    function updateProgress() {
        let totalChecked = 0;
        
        document.querySelectorAll('.phase-card').forEach(card => {
            const phaseCheckboxes = card.querySelectorAll('input[type="checkbox"]');
            if (phaseCheckboxes.length === 0) return;

            const checkedInPhase = card.querySelectorAll('input[type="checkbox"]:checked');
            const percentage = (checkedInPhase.length / phaseCheckboxes.length) * 100;

            const progressBar = card.querySelector('progress');
            const progressSpan = card.querySelector('.phase-progress span');

            progressBar.value = percentage;
            progressSpan.textContent = `${Math.round(percentage)}%`;
            
            totalChecked += checkedInPhase.length;
        });
        
        const globalPercentage = (totalChecked / allCheckboxes.length) * 100;
        globalProgress.value = globalPercentage;
        globalProgressValue.textContent = `${Math.round(globalPercentage)}%`;
    }

    function saveState() {
        const state = {};
        allCheckboxes.forEach(checkbox => {
            state[checkbox.id] = checkbox.checked;
        });
        localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
    }

    function loadState() {
        const savedState = JSON.parse(localStorage.getItem(STATE_STORAGE_KEY));
        if (savedState) {
            allCheckboxes.forEach(checkbox => {
                if (savedState[checkbox.id] !== undefined) {
                    checkbox.checked = savedState[checkbox.id];
                }
            });
        }
    }

    // --- EVENT LISTENERS ---
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            sfx.click.currentTime = 0;
            sfx.click.play();
            saveState();
            updateProgress();
        });
    });
    
    // --- INITIALIZATION ---
    function initialize() {
        const titleElement = document.getElementById('main-title');
        const titleText = "PLAN MAESTRO: AGENTE COGNITIVO AUTÓNOMO";
        typeWriter(titleElement, titleText);
        
        loadState();
        updateProgress();
        console.log("AGENT OS v1.0 INITIALIZED. MISSION BLUEPRINT LOADED.");
    }

    initialize();
});