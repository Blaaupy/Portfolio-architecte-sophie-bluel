import { fetchWork } from '../GetData.js';

export async function afficherGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    const works = await fetchWork();

    works.forEach(work => {
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
