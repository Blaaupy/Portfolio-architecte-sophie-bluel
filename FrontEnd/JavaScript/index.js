import { afficherGallery } from "./Services/portfolio.js";
import { creeFiltre } from "./Services/filtres.js";
import { loginVerification, indexEditionMode } from "./Services/login.js";
import { openModal } from "./Services/modal-propre.js";
import { addAWork } from "./Services/addWorks.js";

// Fonction principale exécutée au chargement
window.addEventListener("DOMContentLoaded", async () => {

    // Si la page est en mode édition (login/admin)
    indexEditionMode();

    // Modal et ajout de travaux
    openModal();
    addAWork();

    // Portfolio et filtres
    const portfolioSection = document.querySelector("#portfolio");
    if (portfolioSection) {
        await creeFiltre();      // Crée les boutons filtres
        afficherGallery();       // Affiche tous les travaux
    }

    // Login
    const formLogin = document.querySelector("#loginForm");
    if (formLogin) {
        formLogin.addEventListener("submit", async (event) => {
            event.preventDefault();
            await loginVerification();
        });
    }

});
