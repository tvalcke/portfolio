let currentSlideIndex = 0;
let slides = [];
let indicators = [];
let autoScrollInterval = null;

// Initialisation du carousel
function initCarousel() {
  slides = document.querySelectorAll('.carousel-slide');
  indicators = document.querySelectorAll('.carousel-indicator');
  
  // Pas de carousel si pas de slides
  if (slides.length === 0) return;
  
  // Démarrer l'auto-scroll si on a des slides
  startAutoScroll();
}

// Afficher une slide spécifique
function showSlide(index) {
  // Masquer toutes les slides
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (indicators[i]) {
      indicators[i].classList.remove('active');
    }
  });
  
  // Afficher la slide courante
  if (slides[index]) {
    slides[index].classList.add('active');
  }
  if (indicators[index]) {
    indicators[index].classList.add('active');
  }
}

// Changer de slide (direction: -1 pour précédent, 1 pour suivant)
function changeSlide(direction) {
  currentSlideIndex += direction;
  
  // Boucle infinie
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  
  showSlide(currentSlideIndex);
  
  // Redémarrer l'auto-scroll
  resetAutoScroll();
}

// Aller à une slide précise (pour les indicateurs)
function currentSlide(index) {
  currentSlideIndex = index - 1; // Les indicateurs commencent à 1
  showSlide(currentSlideIndex);
  
  // Redémarrer l'auto-scroll
  resetAutoScroll();
}

// Auto-scroll du carousel
function startAutoScroll() {
  if (autoScrollInterval) return; // Déjà démarré
  
  autoScrollInterval = setInterval(() => {
    changeSlideAuto(1);
  }, 8000); // Change toutes les 8 secondes
}

// Changer de slide automatiquement (sans reset de l'auto-scroll)
function changeSlideAuto(direction) {
  currentSlideIndex += direction;
  
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  
  showSlide(currentSlideIndex);
}

// Redémarrer l'auto-scroll (quand l'user interagit)
function resetAutoScroll() {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
  startAutoScroll();
}

// Navigation au clavier
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Seulement si on a un carousel sur la page
    if (slides.length === 0) return;
    
    if (e.key === 'ArrowLeft') {
      changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
      changeSlide(1);
    }
  });
}

// Initialisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  setupKeyboardNavigation();
});

// Au cas où le script est chargé après le DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    setupKeyboardNavigation();
  });
} else {
  initCarousel();
  setupKeyboardNavigation();
}
