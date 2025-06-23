import {afficherGallery} from "./Services/portfolio.js";
import { creeFiltre } from "./Services/filtres.js"; 
import { loginVerification } from "./Services/login.js";
import { indexEditionMode } from "./Services/login.js";
import { openCloseModal } from "./Services/modal.js";
import { ajoutListenersOnDeleteButtons } from "./Services/deleteAndAdd.js";

// Affiche au chargement de la page tous les travaux et les filtres.
window.addEventListener("DOMContentLoaded", async () => {
    
    indexEditionMode();

    if (document.querySelector("#portfolio")){
        await creeFiltre();
        afficherGallery();
    }
    
    const form = document.querySelector("#loginForm");
    form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        await loginVerification();
    });

    const btnModifier = document.querySelector(".projetsModifier");
    btnModifier?.addEventListener("click", async() => {
        await openCloseModal();
        ajoutListenersOnDeleteButtons();
    })

});

