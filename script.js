const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const year = document.querySelector('#year');
const quoteForm = document.querySelector('#quote-form');
const formStatus = document.querySelector('#form-status');

year.textContent = new Date().getFullYear();

function closeMenu() {
  navMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation menu');
}

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    navToggle.focus();
  }
});

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!quoteForm.reportValidity()) return;

  const data = new FormData(quoteForm);
  const subject = `PHARMAVEER enquiry — ${data.get('type')} — ${data.get('organisation')}`;
  const body = [
    'PHARMAVEER business enquiry',
    '',
    `Name: ${data.get('name')}`,
    `Organisation: ${data.get('organisation')}`,
    `Email: ${data.get('email')}`,
    `Enquiry type: ${data.get('type')}`,
    '',
    'Products / requirements:',
    data.get('message'),
    '',
    'Consent confirmed: Yes'
  ].join('\n');

  formStatus.textContent = 'Opening your email application. Please review the prepared message and press send.';
  window.location.href = `mailto:pharmaveermg@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
