// Raccourcis pour pas répéter document.querySelector tout le temps
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// Check si l'user préfère pas trop d'animations
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

//scroll fluide
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;

  const id = a.getAttribute('href');
  try {
    const el = id === '#' ? document.body : document.querySelector(id);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start'
    });
  } catch (err) {
    console.error(err);
  }
});

//apparition des éléments au scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target); // plus besoin d'observer après
    }
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

// Observer tous les éléments avec la classe reveal
$$('.reveal').forEach(el => io.observe(el));

// léger parrallax du héro
const parallax = $('.parallax img');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!parallax || prefersReducedMotion()) return;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      const y = window.scrollY * 0.06;
      parallax.style.transform = `translateY(${y}px)`;
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// btn pour remonter
const backToTop = $('#back-to-top');

const toggleTop = () => {
  if (!backToTop) return;
  backToTop.classList.toggle('show', window.scrollY > 300);
};

backToTop?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
});

window.addEventListener('scroll', toggleTop, { passive: true });
toggleTop();

// form de contact (Formspree)
const form = $('#contact-form');
form?.addEventListener('submit', () => {
  const status = $('#form-status');
  if (status) {
    status.textContent = 'Envoi en cours...';
  }
});


//année courante
const year = $('#year');
if (year) year.textContent = new Date().getFullYear();
