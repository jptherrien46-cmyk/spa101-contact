document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const statusElement = document.getElementById('formStatus');

form.addEventListener('submit', async function (event) {
  const endpoint = form.getAttribute('action');

  if (endpoint.includes('VOTRE_FORM_ID')) {
    event.preventDefault();
    statusElement.className = 'form-status error';
    statusElement.textContent = 'Configuration requise : ajoutez votre identifiant Formspree dans le fichier index.html.';
    return;
  }

  event.preventDefault();
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  statusElement.className = 'form-status';
  statusElement.textContent = 'Envoi en cours…';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Submission failed');

    form.reset();
    statusElement.className = 'form-status success';
    statusElement.textContent = 'Merci! Votre demande a bien été envoyée.';
  } catch (error) {
    statusElement.className = 'form-status error';
    statusElement.textContent = 'L’envoi a échoué. Appelez-nous au 819 697-8242 ou réessayez.';
  } finally {
    submitButton.disabled = false;
  }
});
