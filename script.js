
const OWNER_EMAIL = "cococrownkennels@gmail.com";

const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

document.querySelectorAll('[data-gallery]').forEach(gallery => {
  const main = gallery.querySelector('.main-photo');
  gallery.querySelectorAll('.thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      main.src = btn.dataset.src;
      gallery.querySelectorAll('.thumb').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});

document.querySelectorAll('[data-puppy]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('puppy-select').value = btn.dataset.puppy;
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const progress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');

document.querySelectorAll('.photo-button').forEach(button => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
});

document.getElementById('application-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const msg = document.getElementById('form-message');

  if (OWNER_EMAIL === "YOUR_EMAIL_HERE") {
    msg.textContent = "Add your business email at the top of script.js where it says OWNER_EMAIL, then upload the updated file.";
    return;
  }

  const subject = encodeURIComponent(`Puppy Application — ${form.get('puppy')}`);
  const body = encodeURIComponent(
`COCO CROWN KENNELS PUPPY APPLICATION

Name: ${form.get('name')}
Email: ${form.get('email')}
Phone: ${form.get('phone') || 'Not provided'}
Puppy of interest: ${form.get('puppy')}

Home and experience:
${form.get('message')}

Applicant understands the $500 deposit is applied toward the $3,500 purchase price.`
  );

  window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
  msg.textContent = "Your email app should open with the completed application.";
});
