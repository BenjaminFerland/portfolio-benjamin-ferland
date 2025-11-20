const app = Vue.createApp({
  data() {
    return {
      projets: [],
      selectedCategory: "Tous",
      idprojetcourant: null,
      selectedCoequipier: null // <-- nouveau : coéquipier sélectionné
    };
  },
  computed: {
    projetCourant() {
      return this.projets.find(p => p.id === this.idprojetcourant) || null;
    }
  },
  methods: {
    filtrerCategorie(categorie) {
      this.selectedCategory = categorie;
    },
    selectCoequipier(coequipier) {
      this.selectedCoequipier = coequipier;
      const photoContainer = document.querySelector('.photo-container');
      if (photoContainer) {
        photoContainer.style.backgroundImage = `url(${coequipier.dataset.photo})`;
      }
    }
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const paramProjet = urlParams.get("projet");
    if (paramProjet !== null) this.idprojetcourant = parseInt(paramProjet);

    fetch('./projects.json')
      .then(data => data.json())
      .then(data => { 
        this.projets = data; 

        this.$nextTick(() => {
          const coequipiers = document.querySelectorAll('.coequipier');
          const photoContainer = document.querySelector('.photo-container');

          coequipiers.forEach(co => {
            // Affiche au hover
            co.addEventListener('mouseenter', () => {
              photoContainer.style.backgroundImage = `url(${co.dataset.photo})`;
            });

            // Revenir à l'image du coéquipier sélectionné quand on quitte
            co.addEventListener('mouseleave', () => {
              if (this.selectedCoequipier) {
                photoContainer.style.backgroundImage = `url(${this.selectedCoequipier.dataset.photo})`;
              } else {
                photoContainer.style.backgroundImage = '';
              }
            });

            // Affiche et sélectionne au clic
            co.addEventListener('click', () => {
              this.selectCoequipier(co);
            });
          });
        });
      });
  }
});

app.mount('#projets');

// Crée le swiper compétences
const competencesSwiper = new Swiper('.competences-swiper', {
  direction: 'horizontal',
  slidesPerView: 3,
  spaceBetween: 30,

  // === Pagination (points ronds) ===
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets'
  },

  // Optionnel : scrollbar si tu veux (laisse ou enlève)
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },

  // Permet à Swiper de se réinitialiser si parent/éléments changent (utile avec Vue)
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