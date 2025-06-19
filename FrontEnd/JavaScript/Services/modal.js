import { fetchWork } from "../GetData.js";

export async function afficherGalleryModal() { /* fonction copier de celle  de portfolio */
    const galleryModal = document.querySelector(".galleryModal");
    galleryModal.innerHTML = "";
    const works = await fetchWork();
    
    works.forEach(work => {
        const figure = document.createElement('figure');
        figure.classList.add('modal-figure');

        const image = document.createElement('img'); 
        image.src = work.imageUrl;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteBtn.setAttribute('data-id', work.id);

        figure.appendChild(image);
        figure.appendChild(deleteBtn);
    });
}

export async function modalFonctionnelle () {
    const btnModifier = document.querySelector('.js-modal');
    const btnClose = document.querySelector('.js-close-modal');
    const modal1 = document.querySelector(".modal");

    btnModifier.addEventListener("click", () => { /* Ouvre la modal en passant l'affichage de none a null */
        modal1.style.display = null;
        modal1.removeAttribute('aria-hidden');
        modal1.setAttribute('ari-modal', 'true');
        galleryModal();
    })

    btnClose.addEventListener("click", () => {/* Ferme la modal en passant l'affichage de null a none */
        modal1.style.display = "none";
        modal1.removeAttribute('ari-modal', 'true');
        modal1.setAttribute('aria-hidden');
    })
    
    
    

}