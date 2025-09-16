document.addEventListener('DOMContentLoaded', function() {
  const exportButton = document.getElementById('export-pdf');
  
  if (exportButton) {
    exportButton.addEventListener('click', function() {
      if (typeof html2pdf !== 'undefined') {
        exportToPDFAdvanced();
      } else {
        exportToPDF();
      }
    });
  }
});

function exportToPDF() {
  const originalTitle = document.title;
  document.title = 'CV_Tristan_Valcke';
  window.print();
  
  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
}

function exportToPDFAdvanced() {
  const element = document.getElementById('cv-content');
  const body = document.body;
  
  body.classList.add('pdf-export');
  
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
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: true,
        removeContainer: true,
        ignoreElements: function(element) {
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
    button.textContent = '📄 Génération du PDF...';
    button.disabled = true;

    html2pdf().set(opt).from(element).save().then(() => {
      body.classList.remove('pdf-export');
      button.textContent = originalText;
      button.disabled = false;
    }).catch((error) => {
      console.error('Erreur lors de la génération du PDF:', error);
      body.classList.remove('pdf-export');
      exportToPDF();
      button.textContent = originalText;
      button.disabled = false;
    });
  }, 100);
}