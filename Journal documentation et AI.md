# Utilisation de google gemini : <br>
Recherche google : hover vs click css

Information donnée : 

:active Pseudo-class:
The :active pseudo-class applies styles to an element when it is being activated by the user, typically during the "click" action (i.e., when the mouse button is pressed down on the element). This provides immediate visual feedback that the element is being engaged.
Code

button:active {
  background-color: darkblue;
  transform: translateY(2px); /* Creates a slight "pressed" effect */
}

<br>
<br>
Utilisation de ce site pour l’effet holographique au survol du bouton 'en savoir plus' : <br>
lien web : https://prismic.io/blog/css-hover-effects#1-holographic-card
<br>
code pen de l’effet holographique au survol : https://codepen.io/nefejames/pen/ogvNgJq
<br>
<br>
Utilisation des notes de web pour créer l'animation gsap : 

Exemples Prof https://tim-montmorency.com/timdoc/582-424MO/swiper/swiper/

Exemple 1
const swiper = new Swiper('.swiper', {
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
})

Exemple 2
const swiper = new Swiper('.swiper', {
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
});
<br>
<br>
Recherche google : how do you retrieves URL parameters

Information donnée : 
// Get the query string
let queryString = window.location.search; // "?user=John&user=Doe&id=123"

// Create a URLSearchParams object
let params = new URLSearchParams(queryString);

// Get a specific parameter
let firstUserName = params.get('user'); // "John"

// Get all values for a repeated parameter
let allUserNames = params.getAll('user'); // ["John", "Doe"]

// Check if a parameter exists
let hasId = params.has('id'); // true




# Utilisation de chatgpt : <br>
prompt qui demande comment mettre une virgule entre les 2 noms des coéquipiers d'une projet en utilisant le projects.json : 

comment on fait pour séparer les 2 noms des coéquipiers par une virgule. Voici mon code : <p><strong>Coéquipiers :</strong><br> Ryan Dufault et Yannick Chamberland </p>

<br>
<br>
Réponse de chatgpt : <br>

.join(', ') → transforme le tableau en texte séparé par des virgules
<br>
<br>
Résultat : <br>
<p><strong>Coéquipiers :</strong><br> {{ projet.coequipiers.join(', ') }} </p>
