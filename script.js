
document.querySelector('.menu-btn').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open'));
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
    const select = document.getElementById('puppy-select');
    select.value = btn.dataset.puppy;
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

function submitApplication(event){
  event.preventDefault();
  document.getElementById('form-message').textContent =
    'Your application form is designed and ready. Connect it to your email or website form service before publishing.';
  return false;
}
