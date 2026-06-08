// ------------------- GSAP + ScrollTrigger (une seule fois) -------------------
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
} else {
  console.warn("GSAP ou ScrollTrigger non trouvés. Assure-toi d'avoir chargé les scripts GSAP avant script.js");
}

// ------------------- Données des projets (intégrées directement) -------------------
// Plus besoin de charger projects.json — chaque projet pointe vers sa propre page HTML
const projetsData = [
  {
    id: 1,
    titre: "La pilule de trop",
    categorie: "Court-Métrage",
    miniature: "medias/miniature_projet_1+texture.webp",
    description_courte: "Un court-métrage en mosaïque explorant l'isolement social et mental.",
    pageLien: "page_projet_1.html"
  },
  {
    id: 2,
    titre: "Sous le poids du papier",
    categorie: "Court-Métrage",
    miniature: "medias/miniature_projet_3+texture.webp",
    description_courte: "Un court-métrage en stop motion illustrant le burnout.",
    pageLien: "page_projet_2.html"
  },
  {
    id: 3,
    titre: "La rupture",
    categorie: "Court-Métrage",
    miniature: "medias/miniature_projet_4+texture.webp",
    description_courte: "Un court-métrage en macro observant la tristesse et la colère.",
    pageLien: "page_projet_3.html"
  },
  {
    id: 4,
    titre: "Préparation matinale",
    categorie: "Vidéo personnel",
    miniature: "medias/miniature_projet_5+texture.webp",
    description_courte: "Une courte vidéo qui présente ma routine du matin.",
    pageLien: "page_projet_4.html"
  },
  {
    id: 5,
    titre: "Première publicité de Peephole",
    categorie: "Stage Location Peephole",
    miniature: "medias/miniature_projet_6+texture.webp",
    description_courte: "Une courte publicité qui présente une drill laissée dans un garage abandonné.",
    pageLien: "page_projet_5.html"
  },
  {
    id: 6,
    titre: "Deuxième publicité de Peephole",
    categorie: "Stage Location Peephole",
    miniature: "medias/miniature_projet_7+texture.webp",
    description_courte: "Une courte publicité qui présente un aspirateur laissé à l'abandon.",
    pageLien: "page_projet_6.html"
  },
  {
    id: 7,
    titre: "Troisième publicité de Peephole",
    categorie: "Stage Location Peephole",
    miniature: "medias/miniature_projet_8+texture.webp",
    description_courte: "Une courte publicité qui présente une vieille Xbox laissé à l'abandon.",
    pageLien: "page_projet_7.html"
  },
  {
    id: 8,
    titre: "Publicité de Solus Hydroponics",
    categorie: "Stage Solus hydroponics",
    miniature: "medias/miniature_projet_9+texture.webp",
    description_courte: "9 vidéos qui présente les différents usages de Solus en conditions réelles.",
    pageLien: "page_projet_8.html"
  }
];

// ------------------- Vue App (index.html seulement) -------------------
const projetsMountPoint = document.getElementById('projets');
if (projetsMountPoint) {
  const app = Vue.createApp({
    data() {
      return {
        projets: projetsData,
        selectedCategory: "Tous"
      };
    },

    methods: {
      filtrerCategorie(categorie) {
        this.selectedCategory = categorie;
        if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
      }
    },

    mounted() {
      this.$nextTick(() => {
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
          initProjectAnimations();
          ScrollTrigger.refresh();
        } else {
          console.warn("GSAP/ScrollTrigger non disponibles : animations désactivées.");
        }
      });
    }
  });

  app.mount('#projets');
}

// ------------------- Swiper compétences -------------------
const swiperEl = document.querySelector('.competences-swiper');
if (swiperEl) {
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
}

// ------------------- Flèche Retour en haut -------------------
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    backToTopBtn.classList.toggle("show", window.scrollY > 400);
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ------------------- Animations GSAP projets -------------------
function initProjectAnimations() {
  const cards = document.querySelectorAll("#projets .col-12.col-md-6");

  if (!cards.length) {
    console.warn("Aucune carte trouvée pour l'effet Old Paper.");
    return;
  }

  cards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 1.3,
      ease: "power2.out",
      delay: i * 0.08
    });

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

    const img = card.querySelector("img");
    if (img) {
      gsap.from(img, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%"
        },
        clipPath: "inset(0 0 100% 0)",
        duration: 1.4,
        ease: "power2.out",
        delay: i * 0.08
      });
    }
  });

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