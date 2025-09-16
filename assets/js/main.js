// shortcut pr pas répété document.querySelector tt le tps
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// check si user préfère moins d'anim
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// scroll fluide pr les liens ancres
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
    console.error('erreur scroll:', err);
  }
});

// apparition éléments au scroll (reveal effect)
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target); // stop observer après
    }
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

// observe ts les éléments .reveal
$$('.reveal').forEach(el => io.observe(el));

// parallax léger du hero bg
const parallax = $('.parallax img');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!parallax || prefersReducedMotion()) return;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      const y = window.scrollY * 0.06; // vitesse parallax
      parallax.style.transform = `translateY(${y}px)`;
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// btn remonter en haut
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
toggleTop(); // init

// form contact avec formspree
const form = $('#contact-form');
form?.addEventListener('submit', () => {
  const status = $('#form-status');
  if (status) {
    status.textContent = 'Envoi en cours...';
  }
});

// menu burger pr mobile
const navToggle = $('.nav-toggle');
const primaryNav = $('#primary-nav');
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    primaryNav.classList.toggle('show');
  });

  // fermer menu qd on click sur link
  $$('#primary-nav a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', false);
      primaryNav.classList.remove('show');
    });
  });
}

// année actuelle ds footer
const year = $('#year');
if (year) year.textContent = new Date().getFullYear();
