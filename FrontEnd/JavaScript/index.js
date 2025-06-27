import {afficherGallery} from "./Services/portfolio.js";
import { creeFiltre } from "./Services/filtres.js"; 
import { loginVerification } from "./Services/login.js";
import { indexEditionMode } from "./Services/login.js";
import { openModal } from "./Services/modal-propre.js";
import { addAWork } from "./Services/addWorks.js";

// Affiche au chargement de la page tous les travaux et les filtres.
window.addEventListener("DOMContentLoaded", async () => {
    
    indexEditionMode();
    openModal();
    addAWork();
    
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

