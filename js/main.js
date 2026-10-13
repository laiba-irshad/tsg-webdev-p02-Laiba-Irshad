// ---------- Mobile menu ----------
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
}
menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// ---------- Active link highlight ----------
const sections = document.querySelectorAll('main section[id]');
const links = navLinks.querySelectorAll('a[href^="#"]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// ---------- Testimonials slider ----------
const slides = document.querySelectorAll('.slide');
const dotsBox = document.getElementById('dots');
let current = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
  dot.addEventListener('click', () => goTo(i));
  dotsBox.appendChild(dot);
});

function goTo(index) {
  current = (index + slides.length) % slides.length; // wraps around
  slides.forEach(s => s.style.transform = `translateX(-${current * 100}%)`);
  dotsBox.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === current));
}
document.getElementById('prev').addEventListener('click', () => goTo(current - 1));
document.getElementById('next').addEventListener('click', () => goTo(current + 1));
goTo(0);

// ---------- FAQ accordion (one open at a time) ----------
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const btn = item.querySelector('.faq-q');
  const panel = item.querySelector('.faq-a');
  btn.addEventListener('click', () => {
    const willOpen = btn.getAttribute('aria-expanded') === 'false';
    faqItems.forEach(other => {
      other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      other.querySelector('.faq-a').style.maxHeight = null;
    });
    if (willOpen) {
      btn.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

// ---------- Contact form validation ----------
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', e => {
  e.preventDefault();
  form.querySelectorAll('input').forEach(i => i.classList.add('touched'));
  if (!form.checkValidity()) {
    formMsg.className = 'error';
    formMsg.textContent = 'Enter your name and a valid email address.';
    return;
  }
  formMsg.className = 'ok';
  formMsg.textContent = 'Request sent. We will contact you within one day.';
  form.reset();
  form.querySelectorAll('input').forEach(i => i.classList.remove('touched'));
});
