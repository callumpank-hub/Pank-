// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Sector tabs
const sectorBtns = document.querySelectorAll('.sector-btn');
const sectorPanels = document.querySelectorAll('.sector-panel');
sectorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    sectorBtns.forEach(b => b.classList.remove('active'));
    sectorPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector(`.sector-panel[data-panel="${btn.dataset.sector}"]`).classList.add('active');
  });
});

// Enquire buttons: prefill commission form and scroll to it
const pieceField = document.getElementById('piece-field');
document.querySelectorAll('.enquire-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (pieceField) pieceField.value = btn.dataset.piece || '';
    document.getElementById('commission').scrollIntoView({ behavior: 'smooth' });
  });
});

// Scroll reveal
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealEls = document.querySelectorAll('.reveal, .art-card');
  revealEls.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  document.querySelectorAll('.reveal, .art-card').forEach(el => el.classList.add('in-view'));
}

// Subtle hero parallax
const heroBg = document.querySelector('.hero-bg');
if (heroBg && !reduceMotion) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.25}px)`;
  }, { passive: true });
}
