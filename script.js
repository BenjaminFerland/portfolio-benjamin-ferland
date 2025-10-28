// Crée le swiper compétences
/*const competencesSwiper = new Swiper('.competences-swiper', {
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
});*/


const app = Vue.createApp({
  data() {
    return { //mettre mes variables en français
      projets: [], // Contient les données des projets chargées depuis projets.json
      idprojetcourant: 2,
      /*selectedCategory : Tous,*/
    };
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
    

    fetch('./projects.json')
      .then(data => data.json())
      .then(data => {
        this.projets = data; // Stocke les projets dans le tableau Vue
        console.log("Projets chargés :", this.projets);
      });
  }
});

app.mount('#projets'); // Attache l'App Vue à l'élément HTML avec l'id #projet


// 


/*Exemples Prof https://tim-montmorency.com/timdoc/582-424MO/swiper/swiper/ */

/*Exemple 1*/
/*const swiper = new Swiper('.swiper', {
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  }
})*/


/*Exemple 2*/
/*const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});*/