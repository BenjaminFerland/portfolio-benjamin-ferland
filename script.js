// ------------------- GSAP + ScrollTrigger (une seule fois) -------------------
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
} else {
  console.warn("GSAP ou ScrollTrigger non trouvés. Assure-toi d'avoir chargé les scripts GSAP avant script.js");
}

// ------------------- Vue App -------------------
const app = Vue.createApp({
  data() {
    return {
      projets: [], // Contient les données des projets chargées depuis projects.json
      selectedCategory: "Tous", // Catégorie choisie
    };
  },

  methods: {
    // change la catégorie selon le bouton cliqué
    filtrerCategorie(categorie) {
      this.selectedCategory = categorie;
      // si ScrollTrigger est dispo, refresh après changement (utile si le layout change)
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    }
  },

  mounted() {
    // Récupère le paramètre d'URL "projet"
    const urlParams = new URLSearchParams(window.location.search);
    const paramProjet = urlParams.get("projet");
    if (paramProjet !== null) {
      this.idprojetcourant = parseInt(paramProjet);
    }
    console.log("ID projet courant :", this.idprojetcourant);

    // Charge les projets depuis projects.json
    fetch('./projects.json')
      .then(resp => resp.json())
      .then(data => {
        this.projets = data;
        console.log("Projets chargés :", this.projets);

        // Attendre que Vue ait rendu le DOM avec les éléments créés dynamiquement
        this.$nextTick(() => {
          // Initialise les animations GSAP (si GSAP est présent)
          if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
            initProjectAnimations();
            // Refresh pour s'assurer que ScrollTrigger calcule correctement
            ScrollTrigger.refresh();
          } else {
            console.warn("GSAP/ScrollTrigger non disponibles : animations désactivées.");
          }
        });
      })
      .catch(err => {
        console.error("Erreur lors du fetch projects.json :", err);
      });
  }
});

app.mount('#projets'); // Attache l'App Vue à l'élément HTML avec l'id #projets

// ------------------- Swiper compétences (inchangé) -------------------
const competencesSwiper = new Swiper('.competences-swiper', {
  direction: 'horizontal',
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: { el: '.swiper-pagination', clickable: true, type: 'bullets' },
  scrollbar: { el: '.swiper-scrollbar', draggable: true },
  observer: true,
  observeParents: true,
  breakpoints: {
    320: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 30 },
    1024: { slidesPerView: 5, spaceBetween: 40 }
  }
});

// flèche 'Retour en haut'

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


function initProjectAnimations() {
  const cards = document.querySelectorAll("#projets .col-12.col-md-6");

  if (!cards.length) {
    console.warn("Aucune carte trouvée pour l'effet Old Paper.");
    return;
  }

  cards.forEach((card, i) => {

    // On applique un effet "papier qui apparaît"
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 40,                 // glisse du bas
      scale: 0.97,           // léger zoom out comme une feuille posée
      filter: "", // vieux papier un peu flou et sombre
      duration: 1.3,
      ease: "power2.out",
      delay: i * 0.08
    });

    // Légère vibration de vieux papier (subtil)
    gsap.fromTo(card,
      { x: -1, rotate: -0.2 },
      {
        x: 1,
        rotate: 0.2,
        duration: 1.5,
        repeat: 0,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        }
      }
    );

    // Image : reveal vertical style “parchemin”
    const img = card.querySelector("img");

    if (img) {
      gsap.from(img, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%"
        },
        clipPath: "inset(0 0 100% 0)",  // reveal en bande verticale
        duration: 1.4,
        ease: "power2.out",
        delay: i * 0.08
      });
    }
  });

  // titres (optionnel)
  gsap.from("#projets h3", {
    scrollTrigger: {
      trigger: "#projets",
      start: "top 90%"
    },
    opacity: 0,
    y: 15,
    duration: 1,
    ease: "power2.out",
    stagger: 0.1
  });
}