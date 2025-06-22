import { fetchWork } from "../GetData.js";

export async function afficherGalleryModal() { /* fonction copier de celle  de portfolio */
    const galleryModal = document.querySelector(".galleryModal");
    galleryModal.innerHTML = "";
    const works = await fetchWork();
    console.log(works)
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

        galleryModal.appendChild(figure);
    });
}

export async function openCloseModal() {
    
    let modal = null

    const openModal = function() {
        const target = document.querySelector("#modal1");
        target.style.display = null;
        target.removeAttribute("aria-hidden");
        target.setAttribute("aria-modal", "true");
        modal = target;
        modal.addEventListener("click", closeModal);
        modal.querySelector(".js-close-modal").addEventListener("click", closeModal);
        modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
        afficherGalleryModal();
    }

    const closeModal = function() {
        if (modal === null) return;
        
        modal.style.display = 'none';
        modal.setAttribute("aria-hidden", "true");
        modal.sremoveAttribute("aria-modal");
        modal.removeEventListener("click", closeModal);
        modal.querySelector(".js-close-modal").removeEventListener("click", closeModal);
        modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
        modal = null
    }

    const stopPropagation = function (e) {
        e.stopPropagation()
    }

    const btnOuvrir = document.querySelector(".js-modal");
    btnOuvrir.addEventListener("click", () => {
        openModal();
    });
}


