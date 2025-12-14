const overlay   = document.querySelector(".overlay");
const menu      = document.getElementById("menu");
const hamburger = document.getElementById("hamburger");
const linkHome  = document.getElementById("link-home");
const linkChi   = document.getElementById("link-chi-siamo");

const OVERLAY_DURATION = 800; // identico all’originale

function playOverlay(animationName, callback) {
  overlay.style.animation = "none";
  void overlay.offsetWidth;

  overlay.style.animation = `${animationName} ${OVERLAY_DURATION}ms ease-in-out forwards`;

  setTimeout(() => {
    if (callback) callback();
  }, OVERLAY_DURATION);
}

// Al caricamento pagina → esce a destra (come prima)
window.addEventListener("DOMContentLoaded", () => {
  playOverlay("slideOutToRight");
});

// Visione → animazione da SINISTRA
if (linkChi) {
  linkChi.addEventListener("click", (e) => {
    e.preventDefault();
    playOverlay("slideInFromLeft", () => {
      window.location.href = "chi-siamo.html";
    });
  });
}

// Home → animazione dal BASSO
if (linkHome) {
  linkHome.addEventListener("click", (e) => {
    e.preventDefault();
    playOverlay("slideInFromBottom", () => {
      window.location.href = "index.html";
    });
  });
}

// Menu mobile (rimane uguale)
if (hamburger && menu) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}
