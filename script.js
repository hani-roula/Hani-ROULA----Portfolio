const header = document.getElementById('siteHeader');
const progressBar = document.getElementById('progressBar');
function onScroll(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = scrolled + '%';
}
document.addEventListener('scroll', onScroll);
onScroll();

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

const DOCS = {
  rapport: "ROULA-SENE-SIDIBE_RapportSAE.pdf",
  powerbi: "PowerBI.pdf",
  presec: "Pre%20Security-certi.pdf",
  hacker: "Hacker%20Holidays%20Completion%20Certificate.pdf"
};

const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalTitle = document.getElementById('modalTitle');
const modalOpenNew = document.getElementById('modalOpenNew');
const modalClose = document.getElementById('modalClose');

function openModal(src, title, type){
  modalTitle.textContent = title || '';
  modalOpenNew.href = src;
  modalBody.innerHTML = '';
  if (type === 'image') {
    const img = document.createElement('img');
    img.src = src; img.alt = title || '';
    modalBody.appendChild(img);
  } else {
    const iframe = document.createElement('iframe');
    iframe.src = src; iframe.title = title || 'document';
    modalBody.appendChild(iframe);
  }
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  modalOverlay.classList.remove('open');
  modalBody.innerHTML = '';
  document.body.style.overflow = '';
}
document.querySelectorAll('[data-src]').forEach(el => {
  el.addEventListener('click', (e) => { e.preventDefault(); openModal(el.dataset.src, el.dataset.title, el.dataset.type); });
});
document.querySelectorAll('[data-doc]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const key = el.dataset.doc;
    const src = key === 'thm' ? document.getElementById('thmImage').src : DOCS[key];
    openModal(src, el.dataset.title, el.dataset.type);
  });
});
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
