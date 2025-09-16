// filtrage des certificats - init qd dom ready
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const certificates = document.querySelectorAll('.certificate-container');
  const container = document.getElementById('certificates-container');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // anim tri en cours
      certificates.forEach(cert => cert.classList.add('sorting'));
      
      // update boutons actifs
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      setTimeout(() => {
        let sortedCerts = Array.from(certificates);

        if (filter === 'date-desc') {
          // tri par date (récent -> ancien)
          sortedCerts.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            return dateB - dateA;
          });
        } else if (filter === 'date-asc') {
          // tri par date (ancien -> récent) 
          sortedCerts.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            return dateA - dateB;
          });
        } else if (filter === 'duration') {
          // tri par durée (long -> court)
          sortedCerts.sort((a, b) => {
            const durationA = parseInt(a.getAttribute('data-duration'));
            const durationB = parseInt(b.getAttribute('data-duration'));
            return durationB - durationA;
          });
        }

        // réorganiser ds le dom
        sortedCerts.forEach(cert => {
          container.appendChild(cert);
        });

        // enlever anim tri
        setTimeout(() => {
          certificates.forEach(cert => cert.classList.remove('sorting'));
        }, 100);
      }, 200);
    });
  });

  // activer tri date par défaut
  const defaultButton = document.querySelector('.filter-button[data-filter="date-desc"]');
  if (defaultButton && !defaultButton.classList.contains('active')) {
    defaultButton.click();
  }
});
