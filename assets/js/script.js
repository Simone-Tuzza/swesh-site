document.addEventListener("DOMContentLoaded", () => {
  
  const overlay   = document.querySelector(".overlay");
  const menu      = document.getElementById("menu");
  const hamburger = document.getElementById("hamburger");
  const linkHome  = document.getElementById("link-home");

  // Funzione principale Animazione
  function playOverlay(animationName, targetUrl) {
    overlay.style.animation = "none";
    void overlay.offsetWidth; // Reset magico

    overlay.style.animation = `${animationName} 0.8s ease-in-out forwards`;

    function handleAnimationEnd() {
      overlay.removeEventListener("animationend", handleAnimationEnd);
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    }
    overlay.addEventListener("animationend", handleAnimationEnd);
  }

  // 1. Animazione INIZIALE (Appena carichi la pagina)
  playOverlay("slideOutToRight", null); 

  
  // 2. GESTIONE CLICK VISIONE (La parte che ti dava problemi)
  const visionLinks = document.querySelectorAll(".js-vision-trigger");

  visionLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); 

      // --- FIX PER MOBILE ---
      // Se siamo su mobile (il menu è attivo), lo uccidiamo subito.
      // Così l'animazione rosa (che sta sotto) diventa visibile.
      if (menu && menu.classList.contains("active")) {
         menu.classList.remove("active");
         if(hamburger) hamburger.classList.remove("active");
         // Lasciamo overflow hidden un attimo per evitare flash strani, 
         // tanto cambiamo pagina tra 0.8s
      }

      // Ora che il menu nero è sparito, l'utente vede partire l'animazione rosa
      playOverlay("slideInFromLeft", "chi-siamo.html");
    });
  });


  // 3. HOME
  if (linkHome) {
    linkHome.addEventListener("click", (e) => {
      e.preventDefault();
      playOverlay("slideInFromBottom", "index.html");
    });
  }

  // 4. HAMBURGER APRI/CHIUDI
  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
      hamburger.classList.toggle("active");
      document.body.style.overflow = menu.classList.contains("active") ? "hidden" : "auto";
    });
  }

});

// Funzione globale
window.closeMenuManually = function() {
  const menu = document.getElementById("menu");
  const hamburger = document.getElementById("hamburger");
  if(menu) {
    menu.classList.remove("active");
    if(hamburger) hamburger.classList.remove("active");
    document.body.style.overflow = "auto";
  }
};