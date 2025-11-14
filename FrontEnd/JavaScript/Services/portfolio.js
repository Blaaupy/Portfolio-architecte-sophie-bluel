import { fetchWork } from "../GetData.js";

export async function afficherGallery(categoryId = null) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    // récupère les travaux
    const works = await fetchWork();

    // filtre si une catégorie est fournie
    const filteredWorks = categoryId
        ? works.filter(work => work.categoryId === categoryId)
        : works;

    // génère l'affichage
    filteredWorks.forEach(work => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = `./assets/images/${work.image}`; 
        img.alt = work.title;

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}
