const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitButton = form?.querySelector('button[type="submit"]');
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const action = form.getAttribute("action");

    if (!action || !action.includes("script.google.com")) {
      formStatus.textContent =
        "Le formulaire n’est pas encore relié au système.";
      formStatus.className = "form-status error";
      return;
    }

    const originalButtonText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Envoi en cours…";

    formStatus.textContent = "";
    formStatus.className = "form-status";

    try {
      await fetch(action, {
        method: "POST",
        mode: "no-cors",
        body: new FormData(form)
      });

      form.reset();

      formStatus.textContent =
        "Merci. Votre demande a bien été envoyée.";
      formStatus.className = "form-status success";

    } catch (error) {
      console.error(error);

      formStatus.textContent =
        "L’envoi a échoué. Appelez-nous au 819 697-8242.";
      formStatus.className = "form-status error";

    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}
