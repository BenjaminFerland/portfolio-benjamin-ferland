const app = Vue.createApp({
  data() {
    return {
      projets: [], // Contient les données des projets chargées depuis projets.json
      selectedCategory: "Tous", // Catégorie choisie
    };
  },

  methods: {
    // change la catégorie selon le bouton cliqué
    filtrerCategorie(categorie) { // Fonction qui filtre les projets de la catégorie choisie
      this.selectedCategory = categorie; //Affiche seulement les projets de la catégorie sélectionnée
    }
  },


  mounted() {

    /*au chargement de la page, va récupérer le paramètre d'url nommé projet. stock le this.idprojetcourant */

    // Récupère les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);

    // Cherche le paramètre nommé "projet"
    const paramProjet = urlParams.get("projet");

    // Si "projet" existe dans l'URL, on met à jour idprojetcourant
    if (paramProjet !== null) {
      this.idprojetcourant = parseInt(paramProjet);
    }

    console.log("ID projet courant :", this.idprojetcourant);


    fetch('./projects.json') // Va chercher les infos des projets dans le fichier projects.json
      .then(data => data.json()) //on transforme les données en JSON 
      .then(data => { // Quand c’est en json, on récupère les données dans le "data"
        this.projets = data; // Stocke les projets dans le tableau Vue
        console.log("Projets chargés :", this.projets);
      });
  }
});

app.mount('#projets'); // Attache l'App Vue à l'élément HTML avec l'id #projet


// Crée le swiper compétences
const competencesSwiper = new Swiper('.competences-swiper', {
  direction: 'horizontal', // Ça défile à l’horizontale
  slidesPerView: 3,       // 3 slides visibles
  spaceBetween: 30,       // Espace entre chaque slide
  scrollbar: {
    el: '.swiper-scrollbar', // Barre de scroll
    draggable: true,         // On peut la bouger
  },
  breakpoints: {
    320: { slidesPerView: 2, spaceBetween: 20 },   // Petit écran
    768: { slidesPerView: 3, spaceBetween: 30 },   // Tablette
    1024: { slidesPerView: 5, spaceBetween: 40 }   // Grand écran
  }
});