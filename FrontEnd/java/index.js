import {afficherGallery} from './Services/portfolio.js';
import { creeFiltre } from './Services/filtres.js';

// Affiche au chargement de la page tous les travaux et les filtres.
window.addEventListener("DOMContentLoaded", async () => {
    await creeFiltre();
    afficherGallery();
});
