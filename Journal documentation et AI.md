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
