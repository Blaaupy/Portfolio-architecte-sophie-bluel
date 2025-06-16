import {afficherGallery} from './Services/portfolio.js';
import { creeFiltre } from './Services/filtres.js'; 
import { loginVerification } from './Services/login.js';
import { loginPage } from './Services/login.js';

// Affiche au chargement de la page tous les travaux et les filtres.
window.addEventListener("DOMContentLoaded", async () => {
    
    loginPage();

    if (document.querySelector("#portfolio")){
        await creeFiltre();
        afficherGallery();
    }
    
    const form = document.querySelector("#loginForm");
    form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        await loginVerification();
    });

    

});

