// calcul auto des heures qd page chargée
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

  // maj du total affiché
  const totalElement = document.getElementById('hours-total');
  if (totalElement) {
    totalElement.innerHTML = `<strong>${totalHours}h</strong>`;
  }

  return totalHours;
}

/**
 * pr plus tard si besoin update activité
 * @param {string} activityName - nom activité
 * @param {number} hours - nb heures
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

  // recalc total si qqch changé
  if (updated) {
    calculateTotalHours();
  }

  return updated;
}
