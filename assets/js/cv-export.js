// export cv en pdf - init quand dom loaded
document.addEventListener('DOMContentLoaded', function() {
  const exportButton = document.getElementById('export-pdf');
  
  if (exportButton) {
    exportButton.addEventListener('click', function() {
      // check si html2pdf lib dispo
      if (typeof html2pdf !== 'undefined') {
        exportToPDFAdvanced();
      } else {
        exportToPDF(); // fallback vers impression
      }
    });
  }
});

// méthode simple avec print
function exportToPDF() {
  const originalTitle = document.title;
  document.title = 'CV_Tristan_Valcke'; // titre pr le pdf
  window.print();
  
  // remettre titre original
  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
}

// export avancé avec html2pdf lib
function exportToPDFAdvanced() {
  const element = document.getElementById('cv-content');
  const body = document.body;
  
  body.classList.add('pdf-export'); // classe pr masquer éléments
  
  // attendre que les styles s'appliquent
  setTimeout(() => {
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: 'CV_Tristan_Valcke.pdf',
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        backgroundColor: '#ffffff', // fond blanc forcé
        logging: false,
        allowTaint: true,
        removeContainer: true,
        ignoreElements: function(element) {
          // ignorer complètement ces éléments
          return element.classList.contains('cv-actions') || 
                 element.classList.contains('btn') ||
                 element.tagName === 'BUTTON' ||
                 element.classList.contains('site-header') ||
                 element.classList.contains('site-footer') ||
                 element.tagName === 'NAV' ||
                 element.tagName === 'FOOTER';
        }
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait',
        putOnlyUsedFonts: true
      }
    };

    const button = document.getElementById('export-pdf');
    const originalText = button.textContent;
    button.textContent = '📄 Génération du PDF...'; // feedback user
    button.disabled = true;

    // générer le pdf
    html2pdf().set(opt).from(element).save().then(() => {
      body.classList.remove('pdf-export'); // cleanup
      button.textContent = originalText;
      button.disabled = false;
    }).catch((error) => {
      console.error('Erreur génération PDF:', error);
      body.classList.remove('pdf-export');
      exportToPDF(); // fallback si erreur
      button.textContent = originalText;
      button.disabled = false;
    });
  }, 100);
}