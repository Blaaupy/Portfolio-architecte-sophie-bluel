import { fetchCategories } from "../GetData.js";
import { afficherGallery } from "./portfolio.js";

export async function creeFiltre() {
    const categories = await fetchCategories();
    const listeFiltre = document.querySelector(".listeFiltre");
    listeFiltre.innerHTML = "";

    // Bouton "Tous"
    const boutonTous = document.createElement("button");
    boutonTous.textContent = "Tous";
    boutonTous.classList.add("btn-tous", "active");
    boutonTous.addEventListener("click", () => afficherGallery());
    listeFiltre.appendChild(boutonTous);

    // Boutons catégories
    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.name;
        button.classList.add("btn-category");
        button.addEventListener("click", () => afficherGallery(category.id));
        listeFiltre.appendChild(button);
    });

    // Gestion de la classe active + hover
    const boutons = listeFiltre.querySelectorAll("button");
    boutons.forEach(btn => {
        btn.addEventListener("click", () => {
            boutons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });
}
