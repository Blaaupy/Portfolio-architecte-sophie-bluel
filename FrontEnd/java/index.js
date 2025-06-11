import {afficherGallery} from './Services/portfolio.js';
import { fetchCategories } from './GetData.js';

// Filtres

// Bouton Tous qui affiche tous les travaux de Sophie. on remarque que rien n'est précisé dans la fonction
// afficher gallery, c'est parce que de base tout est afficher si aucun paramètre n'est precisé.
const btnTous = document.querySelector('.btn-tous');

btnTous.addEventListener("click", async function() { 
    afficherGallery();
})

// Ici j'ajoute cet élément pour que lorsque la page est chargée cela clique automatiquement sur le bouton tous afin de tout afficher.

window.addEventListener("DOMContentLoaded", () => {
  btnTous.click();
});

// Bouton objet ici on a 1 en paramètre car les objets sont de catégorie 1.
const btnObjets = document.querySelector('.btn-objets');
btnObjets.addEventListener("click", async function () {
    afficherGallery(1);
})

// Bouton appartements ici on a 2 pour la même raison qu'avec les objets.
const btnApp  = document.querySelector('.btn-appts');
btnApp.addEventListener('click', async function () {
    afficherGallery(2); 
})
// Bouton hotels etc...
const btnHotels = document.querySelector('.btn-hotels');
btnHotels.addEventListener('click', async function (){
    afficherGallery(3);
})

//Ajout d'activité pour l'expérience utilisateur, cela va nous indiquer quel filtre est sélectionné.
const boutonsFiltre = document.querySelectorAll('.listeFiltre button');

boutonsFiltre.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer active de tous les boutons
        boutonsFiltre.forEach(btn => btn.classList.remove('active'));
        
        // Ajouter active au bouton cliqué
        button.classList.add('active');
    });
});