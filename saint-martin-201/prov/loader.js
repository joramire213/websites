// loader.js

// Esta función se ejecuta cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    loadTemplateAndInjectData();
});

async function loadTemplateAndInjectData() {
    try {
        // 1. Obtener la ID del agente desde un atributo en el body
        const agentId = document.body.getAttribute('data-agent-id');
        if (!agentId || !agents[agentId]) {
            console.error(`Error: No se encontró la data para el asesor con ID: ${agentId}`);
            document.body.innerHTML = '<h1 style="font-family: sans-serif; text-align: center; padding: 40px;">Error: Agente no configurado.</h1>';
            return;
        }
        
        // 2. Cargar el contenido de la plantilla
        const response = await fetch('template.html');
        if (!response.ok) throw new Error('No se pudo cargar la plantilla template.html');
        let templateHTML = await response.text();

        // 3. Obtener los datos del agente actual
        const agentData = agents[agentId];

        // 4. Reemplazar los placeholders con los datos reales
        templateHTML = templateHTML
            .replace(/\{\{WHATSAPP_LINK\}\}/g, agentData.whatsapp)
            .replace(/\{\{WHATSAPP_NUMBER\}\}/g, agentData.whatsapp)
            .replace(/\{\{EMAIL_LINK\}\}/g, agentData.email)
            .replace(/\{\{EMAIL_ADDRESS\}\}/g, agentData.email);

        // 5. Inyectar el HTML final en el body
        document.body.innerHTML = templateHTML;

        // 6. ¡MUY IMPORTANTE! Re-ejecutar scripts que dependen del contenido
        // Esto es necesario para que las animaciones y la lógica de la galería funcionen.
        AOS.init({ duration: 800, once: true });
        
        // Re-adjuntar lógica de la página (idiomas, galería, etc.)
        // La forma más fácil es incluir el script original de la página.
        const pageLogicScript = document.createElement('script');
        pageLogicScript.src = 'page-logic.js'; // Moveremos la lógica a este archivo
        document.body.appendChild(pageLogicScript);

    } catch (error) {
        console.error('Ocurrió un error al construir la página:', error);
        document.body.innerHTML = '<h1 style="font-family: sans-serif; text-align: center; padding: 40px;">No se pudo cargar la página.</h1>';
    }
}