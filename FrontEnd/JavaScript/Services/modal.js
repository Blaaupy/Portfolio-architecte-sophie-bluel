import { fetchWork } from "../GetData.js";

export async function afficherGalleryModal() { /* fonction copier de celle  de portfolio */
    const galleryModal = document.querySelector(".galleryModal");
    galleryModal.innerHTML = "";
    const works = await fetchWork(); /* On récupère les travaux enregistrés dans l'API */
    works.forEach(work => { /* Ensuite, pour chacun des travaux, on va créer une figure et dans celle-ci enregistrer les mg  et créer un bouton delete pour chaque travail et les afficher */
        const figure = document.createElement("figure");
        figure.classList.add("modal-figure");

        const image = document.createElement("img"); 
        image.src = work.imageUrl;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = "<i class="fa-solid fa-trash-can"></i>";
        deleteBtn.setAttribute("data-id", work.id);

        figure.appendChild(image);
        figure.appendChild(deleteBtn);

        galleryModal.appendChild(figure);
    });
}

export async function openCloseModal() { /* Gère l'ouverture et la fermeture de la modal et appelle AfficherGalleryModal lorsque celle-ci est ouverte */
    
    let modal = null

    const openModal = function() {/* Ouvre la modal */
        const target = document.querySelector("#modal1"); /* Selectionne la modal */
        target.style.display = null; /* Passe le display none à null ce qui fait que la modal n'est pas bloquée et ressort naturellement */
        target.removeAttribute("aria-hidden"); /* retire le cache de la modal */
        target.setAttribute("aria-modal", "true"); /* Confirme que c'est bien une modal et qu'elle doit s'afficher un peu comme un "overlay" */
        modal = target; 
        modal.addEventListener("click", closeModal); /* Ici on écoute si l'utilisateur clique en dehors de la modal pour en sortir au lieu de la croix */
        modal.querySelector(".js-close-modal").addEventListener("click", closeModal);/* Ici on écoute si l'utilisateur clique sur la croix pour fermer la modal */
        modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation); /* Ici on écoute ou clique l'utilisateur afin de ne pas fermer la modal s'il clique sur la partie qui en fait partie */
        afficherGalleryModal(); /* Affiche la gallery grâce à la fonction plus haut */
    }

    const closeModal = function() { /*  Ferme la modal*/
        if (modal === null) return; /* On verifie si la modal est ouverte, si elle ne l'est pas le programme s'arrete ici */
        
        modal.style.display = "none";/* On cache la modal */
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");
        modal.removeEventListener("click", closeModal); /* On retire l'ecoute du clic qui ferme la modal lorsque l'utilisateur clique autre part que sur la modal */
        modal.querySelector(".js-close-modal").removeEventListener("click", closeModal); /* Inverse ce qu'on a fait dans openModal */
        modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
        modal = null
    }

    const stopPropagation = function (e) { /* Empeche la fermeture de la modal si l'on clique dessus sans cela nous ne pourrions rien faire dessus elle se fermerait au moindre clic */
        e.stopPropagation()
    }

    const btnOuvrir = document.querySelector(".js-modal"); /* Ici on enregistre le bouton sur lequel on doit cliquer pour ouvrir la modal afin d'écouter ce fameux clic et d'ouvrir la modal */
    btnOuvrir.addEventListener("click", () => {
        openModal();
    });
}



