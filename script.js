

// FADE-IN EFEKTI NA SKROLOVANJE
const sections = document.querySelectorAll("section");
const options = { threshold: 0.1 };

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, options);

sections.forEach(section => {
  section.classList.add("hidden"); // Početno skriveno
  observer.observe(section);
});

// PARALLAX HERO SLIKE
const heroLeftImg = document.querySelector('.hero-left img');
const heroRightImg = document.querySelector('.hero-right img');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Lijeva i desna slika se pomjeraju različitim brzinama za lagani parallax
  heroLeftImg.style.transform = `translateY(${scrollY * 0.15}px) scale(1.05)`;
  heroRightImg.style.transform = `translateY(${scrollY * 0.25}px) scale(1.05)`;
});

// Toggle "Pogledaj više" dugme za sve kartice
const toggleButtons = document.querySelectorAll('.toggle-btn');

toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.parentElement;
    card.classList.toggle('show-text');
    btn.textContent = card.classList.contains('show-text') ? 'Sakrij' : 'Pogledaj više';
  });
});

// FAQ accordion
const faqCards = document.querySelectorAll(".faq-card");

faqCards.forEach(card => {
  card.addEventListener("click", () => {

    // Close others
    faqCards.forEach(c => c !== card && c.classList.remove("active"));

    // Toggle selected
    card.classList.toggle("active");
  });
});





function eur(n){ 
  if (isNaN(n)) return '—';
  return n.toLocaleString('sr-RS', { style: 'currency', currency: 'EUR' });
}

function calcMontenegro(gross){
  gross = Number(gross)||0;

  // Contributions — EMPLOYEE
  const empPIO = gross * 0.10;       // 10% PIO
  const empUnemp = gross * 0.005;    // 0.5% nezaposlenost
  const empContrib = empPIO + empUnemp;

  // PIT brackets (progressive)
  let pit = 0;
  const band1 = Math.min(gross, 700);
  const band2 = Math.min(Math.max(gross - 700, 0), 300); // 701–1000 -> max 300
  const band3 = Math.max(gross - 1000, 0);

  pit += band2 * 0.09;  // 9% na 701–1000
  pit += band3 * 0.15;  // 15% preko 1000

  // Net
  const net = gross - empContrib - pit;

  // Employer side
  const erUnemp = gross * 0.005;   // 0.5%
  const erLabor = gross * 0.002;   // 0.2%
  const erChamber = gross * 0.0027;// 0.27%
  const erContrib = erUnemp + erLabor + erChamber;

  const totalCost = gross + erContrib;

  return {
    gross, empContrib, empPIO, empUnemp, pit, net,
    erContrib, erUnemp, erLabor, erChamber, totalCost
  };
}

function animateValue(el, value){
  const duration = 600;
  const start = performance.now();
  const from = 0;
  function tick(now){
    const p = Math.min((now - start)/duration, 1);
    el.textContent = eur(from + (value - from) * p);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

document.getElementById('calcBtn').addEventListener('click', ()=>{
  const g = parseFloat(document.getElementById('gross').value);
  const r = calcMontenegro(g);

  // write with animation
  animateValue(document.getElementById('rGross'), r.gross);
  animateValue(document.getElementById('rEmpContrib'), r.empContrib);
  animateValue(document.getElementById('rPIO'), r.empPIO);
  animateValue(document.getElementById('rUnempEmp'), r.empUnemp);
  animateValue(document.getElementById('rPIT'), r.pit);
  animateValue(document.getElementById('rNet'), r.net);

  animateValue(document.getElementById('rErContrib'), r.erContrib);
  animateValue(document.getElementById('rUnempEr'), r.erUnemp);
  animateValue(document.getElementById('rLabor'), r.erLabor);
  animateValue(document.getElementById('rChamber'), r.erChamber);
  animateValue(document.getElementById('rTotalCost'), r.totalCost);
});

document.getElementById('resetBtn').addEventListener('click', ()=>{
  document.getElementById('gross').value = '';
  ['rGross','rEmpContrib','rPIO','rUnempEmp','rPIT','rNet',
   'rErContrib','rUnempEr','rLabor','rChamber','rTotalCost'
  ].forEach(id => document.getElementById(id).textContent = '—');
});




const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const openIcon = document.getElementById("openIcon");
const closeIcon = document.getElementById("closeIcon");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");

  const menuOpen = navMenu.classList.contains("show");
  openIcon.style.display = menuOpen ? "none" : "inline";
  closeIcon.style.display = menuOpen ? "inline" : "none";
});

// zatvori meni kad klikneš link
document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
    openIcon.style.display = "inline";
    closeIcon.style.display = "none";
  });
});
