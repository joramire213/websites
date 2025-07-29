document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Selección de los elementos del DOM
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) {
        return;
    }

    const submitButton = contactForm.querySelector('.submit-button');
    const statusMessage = document.getElementById('form-status');

    // 2. Añadir el listener al evento 'submit' del formulario
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        statusMessage.textContent = '';
        statusMessage.style.color = 'var(--color-texto)';

        // 3. Recopilación de datos del formulario (sin cambios)
        const formData = new FormData(contactForm);
        const leadData = Object.fromEntries(formData.entries());

        // ===================================================================
        // 4. CONSTRUCCIÓN DEL PAYLOAD ALINEADO CON POSTGRES (AQUÍ ESTÁ LA MAGIA)
        // ===================================================================
        const payload = {
            created_at: new Date().toISOString(), // Formato estándar para timestamps
            nombre: leadData.nombre || null,
            apellido: leadData.apellido || null,
            celular: leadData.celular || null,
            email: leadData.email || null,
            origen: 'Momento Presente', // Origen claro y descriptivo
            mi_caso_es: leadData.caso || null, // Mapeo de `caso` a `mi_caso_es`
            
            // Campos no aplicables en este formulario, enviados como null
            score: null,
            nivel: null,
            sintomas: null,
            action_plan: null,
            color: null,
            cta_alt: null
        };
        // ===================================================================
        // FIN DE LA CONSTRUCCIÓN DEL PAYLOAD
        // ===================================================================

        // 5. Envío de datos al webhook (sin cambios en la lógica de envío)
        try {
            const webhookUrl = 'https://n8n-n8n.2gzq2x.easypanel.host/webhook/test_screen';
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'rtl-key': '1234321'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                statusMessage.textContent = '¡Gracias! Tus datos fueron enviados. Pronto se pondrán en contacto contigo.';
                statusMessage.style.color = '#2ecc71';
                contactForm.reset();
            } else {
                statusMessage.textContent = `Hubo un problema con el envío (Error: ${response.status}). Por favor, intenta de nuevo.`;
                statusMessage.style.color = '#e74c3c';
            }

        } catch (error) {
            console.error('Error de red al enviar el formulario:', error);
            statusMessage.textContent = 'No se pudo conectar con el servidor. Revisa tu conexión a internet e intenta de nuevo.';
            statusMessage.style.color = '#e74c3c';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Solicitar contacto';
        }
    });
});