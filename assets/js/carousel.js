let currentSlideIndex = 0;
let slides = [];
let indicators = [];
let autoScrollInterval = null;

// init carousel au chargement
function initCarousel() {
  slides = document.querySelectorAll('.carousel-slide');
  indicators = document.querySelectorAll('.carousel-indicator');
  
  // rien à faire si pas de slides
  if (slides.length === 0) return;
  
  // démarrer auto-scroll si on a du contenu
  startAutoScroll();
}

// afficher slide spécifique
function showSlide(index) {
  // cacher ttes les slides
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (indicators[i]) {
      indicators[i].classList.remove('active');
    }
  });
  
  // montrer la slide actuelle
  if (slides[index]) {
    slides[index].classList.add('active');
  }
  if (indicators[index]) {
    indicators[index].classList.add('active');
  }
}

// changer slide (direction: -1 pr précédent, 1 pr suivant)
function changeSlide(direction) {
  currentSlideIndex += direction;
  
  // boucle infinie pr navigation
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
   currentSlideIndex = slides.length - 1;
  }
  
  showSlide(currentSlideIndex);
  
  // redémarrer auto-scroll
  resetAutoScroll();
}

// aller à slide précise (pr les indicateurs)
function currentSlide(index) {
  currentSlideIndex = index - 1; // indicateurs commencent à 1
  showSlide(currentSlideIndex);
  
  // redémarrer auto-scroll
  resetAutoScroll();
}

// auto-scroll du carousel
function startAutoScroll() {
  if (autoScrollInterval) return; // déjà démarré
  
  autoScrollInterval = setInterval(() => {
    changeSlideAuto(1);
  }, 8000); // change ttes les 8 sec
}

// changer slide auto (sans reset auto-scroll)
function changeSlideAuto(direction) {
  currentSlideIndex += direction;
  
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  
  showSlide(currentSlideIndex);
}

// redémarrer auto-scroll (qd user interagit)
function resetAutoScroll() {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
  startAutoScroll();
}

// navigation clavier
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // check si on a carousel sur la page
    if (slides.length === 0) return;
    
    if (e.key === 'ArrowLeft') {
      changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
      changeSlide(1);
    }
  });
}

// init qd dom prêt
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  setupKeyboardNavigation();
});

// au cas où script chargé après DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    setupKeyboardNavigation();
  });
} else {
  initCarousel();
  setupKeyboardNavigation();
}
