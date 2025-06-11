import { fetchWork } from '../GetData.js';

// Fonction qui sert à afficher nos images, leurs alt et leurs description.

export async function afficherGallery(categoryId = null) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    const works = await fetchWork();

    const filteredWorks = categoryId
        ? works.filter(work => work.categoryId === categoryId)
        : works;

    filteredWorks.forEach(work => {
        const figure = document.createElement('figure');
        const image = document.createElement('img'); 
        image.src = work.imageUrl;
        image.alt = work.title;

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}
