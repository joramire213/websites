// form.js – envío accesible y robusto del formulario de contacto
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  const submitButton = contactForm.querySelector('.submit-button');
  const statusMessage = document.getElementById('form-status'); // ideal: role="status" aria-live="polite" en HTML

  function setStatus(text, color) {
    if (!statusMessage) return;
    statusMessage.textContent = text || '';
    if (color) statusMessage.style.color = color;
  }

  async function sendForm(payload) {
    const webhookUrl = 'https://n8n-n8n.2gzq2x.easypanel.host/webhook/Momento_Formulario';
    const ctrl = new AbortController();
    const timeoutId = setTimeout(() => ctrl.abort(), 10000); // 10s timeout

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // No expongas secretos en el cliente (mover a servidor si se requiere)
        },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
        keepalive: true,
        referrerPolicy: 'strict-origin-when-cross-origin',
        credentials: 'omit',
        cache: 'no-store',
      });
      return res;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitButton.disabled) return; // evita dobles envíos rápidos

    // Estado de envío accesible
    submitButton.disabled = true;
    submitButton.setAttribute('aria-disabled', 'true');
    contactForm.setAttribute('aria-busy', 'true');
    submitButton.textContent = 'Enviando…';
    setStatus('', 'var(--color-texto)');

    // Datos
    const formData = new FormData(contactForm);
    const leadData = Object.fromEntries(formData.entries());
    const payload = {
      created_at: new Date().toISOString(),
      nombre: leadData.nombre || null,
      apellido: leadData.apellido || null,
      celular: leadData.celular || null,
      email: leadData.email || null,
      origen: 'Momento Presente',
      mi_caso_es: leadData.caso || null,
    };

    try {
      const response = await sendForm(payload);

      if (response && response.ok) {
        setStatus('¡Gracias! Tus datos fueron enviados. Pronto nos pondremos en contacto contigo.', '#2ecc71');
        contactForm.reset();
        if (window.dataLayer) {
          window.dataLayer.push({ event: 'lead_submitted' });
        }
      } else {
        const code = response ? response.status : 'desconocido';
        setStatus(`Hubo un problema con el envío (Error: ${code}). Intenta de nuevo.`, '#e74c3c');
      }
    } catch (err) {
      console.error('Error de red al enviar el formulario:', err);
      setStatus('No se pudo conectar con el servidor. Revisa tu conexión e intenta de nuevo.', '#e74c3c');
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-disabled');
      contactForm.removeAttribute('aria-busy');
      submitButton.textContent = 'Solicitar contacto';
    }
  });
});