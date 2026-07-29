document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const data = new FormData(this);
  const subject = encodeURIComponent('Demande de service - Spa 101 Mauricie');
  const body = encodeURIComponent(
`Nom : ${data.get('name')}
Téléphone : ${data.get('phone')}
Ville : ${data.get('city') || 'Non précisée'}
Type de problème : ${data.get('problem')}

Détails :
${data.get('message')}`
  );
  window.location.href = `mailto:info@spa101.ca?subject=${subject}&body=${body}`;
});
