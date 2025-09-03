document.addEventListener('DOMContentLoaded', function() {
  calculateTotalHours();
});


function calculateTotalHours() {

  const hourCells = document.querySelectorAll('#hours-table-body td[data-hours]');
  let totalHours = 0;

  hourCells.forEach(cell => {
    const hours = parseInt(cell.getAttribute('data-hours'), 10);
    if (!isNaN(hours)) {
      totalHours += hours;
    }
  });

  // Mettre à jour le total 
  const totalElement = document.getElementById('hours-total');
  if (totalElement) {
    totalElement.innerHTML = `<strong>${totalHours}h</strong>`;
  }

  return totalHours;
}

/**
 * Pluqs tard plus tard
 * @param {string} activityName - Nom de l'activité
 * @param {number} hours - Nombre d'heures
 */
function updateActivityHours(activityName, hours) {
  const rows = document.querySelectorAll('#hours-table-body tr');
  let updated = false;

  rows.forEach(row => {
    const nameCell = row.querySelector('td:first-child');
    const hoursCell = row.querySelector('td[data-hours]');
    
    if (nameCell && hoursCell && nameCell.textContent.trim() === activityName) {
      hoursCell.setAttribute('data-hours', hours);
      hoursCell.textContent = hours + 'h';
      updated = true;
    }
  });

  
  if (updated) {
    calculateTotalHours();
  }

  return updated;
}
