document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const certificates = document.querySelectorAll('.certificate-container');
  const container = document.getElementById('certificates-container');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
        // a    niùation du tri
      certificates.forEach(cert => cert.classList.add('sorting'));
      
        // maj des boutons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      setTimeout(() => {

        let sortedCerts = Array.from(certificates);

        if (filter === 'date-desc') {
          // Trier par date
          sortedCerts.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            return dateB - dateA;
          });
        } else if (filter === 'date-asc') {
          // Trier par date
          sortedCerts.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            return dateA - dateB;
          });
        } else if (filter === 'duration') {
          // Trier par durée
          sortedCerts.sort((a, b) => {
            const durationA = parseInt(a.getAttribute('data-duration'));
            const durationB = parseInt(b.getAttribute('data-duration'));
            return durationB - durationA;
          });
        }

        // Réorganiser  DOM
        sortedCerts.forEach(cert => {
          container.appendChild(cert);
        });

        // Retirer l'animation tri
        setTimeout(() => {
          certificates.forEach(cert => cert.classList.remove('sorting'));
        }, 100);
      }, 200);
    });
  });

  // Activer le tri par date par défaut au chargement
  const defaultButton = document.querySelector('.filter-button[data-filter="date-desc"]');
  if (defaultButton && !defaultButton.classList.contains('active')) {
    defaultButton.click();
  }
});
