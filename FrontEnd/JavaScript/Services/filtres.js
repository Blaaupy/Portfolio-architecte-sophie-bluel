import { fetchCategories } from "../GetData.js";
import { afficherGallery } from "./portfolio.js";

export async function creeFiltre() {
    // Récupération des informations de /categories.
    const categories = await fetchCategories();
    const listeFiltre = document.querySelector(".listeFiltre");
    listeFiltre.innerHTML = "";

    // Bouton Tous
    const boutonTous = document.createElement("button");
    boutonTous.textContent = "Tous";
    boutonTous.classList.add("btn-tous");
    boutonTous.addEventListener("click", () => afficherGallery());
    listeFiltre.appendChild(boutonTous);

    // Génération des autres filtres
    categories.forEach(category => {
        const buttonFiltre = document.createElement("button"); 
        buttonFiltre.textContent = category.name;

        const className = "btn-" + category.name.replace(/\s+/g, "-");
        buttonFiltre.classList.add(className);

        buttonFiltre.addEventListener("click", () => {
            afficherGallery(category.id);
        });

        listeFiltre.appendChild(buttonFiltre);
    });
    console.log(categories);
    // Ajout de active sur Tous
    boutonTous.classList.add("active");

    // Gestion de la classe active pour tous les boutons afin de savoir quel est le filtre actif.
    const boutons = listeFiltre.querySelectorAll("button");
    boutons.forEach(button => {
        button.addEventListener("click", () => {
            boutons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });
}
