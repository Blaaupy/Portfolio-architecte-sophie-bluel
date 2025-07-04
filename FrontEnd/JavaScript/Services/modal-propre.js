import { fetchWork } from "../GetData.js";
import { backOnGallery } from "./addWorks.js";
import { afficherGallery } from "./portfolio.js";


let modal = null
const stopPropagation = function (e) { /* Empeche la fermeture de la modal si l'on clique dessus sans cela nous ne pourrions rien faire dessus elle se fermerait au moindre clic */
    e.stopPropagation()
}

export async function openModal() {
    const btnOuvrir = document.querySelector(".js-modal"); /* Ici on enregistre le bouton sur lequel on doit cliquer pour ouvrir la modal afin d'écouter ce fameux clic et d'ouvrir la modal */
    btnOuvrir.addEventListener("click", () => {
        const target = document.querySelector("#modal1"); /* Selectionne la modal */
        target.style.display = "flex"; /* Passe le display none à null ce qui fait que la modal n'est pas bloquée et ressort naturellement */
        const modalAddWork = document.querySelector(".modal-add-work");
        modalAddWork.style.display = "none";
        target.removeAttribute("aria-hidden"); /* retire le cache de la modal */
        target.setAttribute("aria-modal", "true"); /* Confirme que c'est bien une modal et qu'elle doit s'afficher un peu comme un "overlay" */
        modal = target; 
        modal.addEventListener("click", closeModal); /* Ici on écoute si l'utilisateur clique en dehors de la modal pour en sortir au lieu de la croix */
        modal.querySelector(".js-close-modal").addEventListener("click", closeModal);/* Ici on écoute si l'utilisateur clique sur la croix pour fermer la modal */
        modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation); /* Ici on écoute ou clique l'utilisateur afin de ne pas fermer la modal s'il clique sur la partie qui en fait partie */
    });
    affichageGallery().then(() =>{ /* Affiche la gallery et ajoute ensuite les listeners sur les boutons delete */
        listenersAndSelection();
    })
    postDelete();
}

function closeModal() { /*  Ferme la modal*/
    if (modal === null) return; /* On verifie si la modal est ouverte, si elle ne l'est pas le programme s'arrete ici */
    
    modal.style.display = "none";/* On cache la modal */
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal); /* On retire l'ecoute du clic qui ferme la modal lorsque l'utilisateur clique autre part que sur la modal */
    modal.querySelector(".js-close-modal").removeEventListener("click", closeModal); /* Inverse ce qu'on a fait dans openModal */
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null; 
    backOnGallery();
}

/* Maintenant affichage de la gallery */

export async function affichageGallery() {
    const works = await fetchWork();
    const galleryModal = document.querySelector(".galleryModal");
    galleryModal.innerHTML = "";

    works.forEach(work => { /* Ensuite, pour chacun des travaux, on va créer une figure et dans celle-ci enregistrer les mg  et créer un bouton delete pour chaque travail et les afficher */
        const figure = document.createElement("figure");
        figure.classList.add("modal-figure");

        const image = document.createElement("img"); 
        image.src = work.imageUrl;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
        deleteBtn.setAttribute("data-id", work.id);

        figure.appendChild(image);
        figure.appendChild(deleteBtn);
        galleryModal.appendChild(figure);
    });
}

/* Maintenant la fonction delete il nous faut ajouter les listeners, l'apparition du button delete lorsque qu'un travail est selectionner,
le hover de quand un travail est séléctioner, le postdelete pour tout supprimer et après le refresh de l'affichage et aorès se refresh la posibilité de recommencer*/
const btnDeletePhotos = document.querySelector("#btn-delete-photos");

export async function listenersAndSelection(){ /* Ajoute les listeners hover si selectioner + affiche le button si plus d'un travail est selectioner */
    const allDeleteButtons = document.querySelectorAll(".delete-btn"); 
    allDeleteButtons.forEach(button => {
        button.addEventListener("click", () =>{
            if (button.closest("figure").classList.contains("selection-for-delete")) {
                button.closest("figure").classList.remove("selection-for-delete");
            } else {
                button.closest("figure").classList.add("selection-for-delete");
            }
            const selectedWorks = new Set(document.querySelectorAll(".selection-for-delete"));
            if (selectedWorks.size > 0) {
                btnDeletePhotos.style.display = "flex";
            } else {
                btnDeletePhotos.style.display = "none"
            }
        })
    })
}

export async function postDelete() {
    btnDeletePhotos.addEventListener("click", async () =>{
        if (!confirm("Êtes-vous sûr de vouloir supprimer tous les éléments sélectionnés ?")) return;
        const token = localStorage.getItem("Token"); /* Recuperation du token pour l'auth nécesaire a la suppresion  */
        const results = [];
        const selectedWorks = new Set(document.querySelectorAll(".selection-for-delete"));
        for (const figure of selectedWorks) { /* Delete sur l'api */
            const id = figure.querySelector(".delete-btn").getAttribute("data-id");
            try {
                const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                    method: "DELETE",
                    headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    },
                });
                if (response.status === 200 || response.status === 204) {
                    results.push({ id, status: "success" });
                } else {
                    results.push({id, status: `error ${response.status}`})
                }
            } catch (error) {
                results.push({id, status: "networkError"});
            } 
        };

        const allSuccess = results.every(res => res.status === "success");

        if (allSuccess) {
            alert("Tous les éléments ont été supprimés avec succès !");
        } else {
            console.error("Certains éléments n'ont pas pu être supprimés :", results);
            alert("Une ou plusieurs erreurs sont survenues lors de la suppression. Consulte la console pour plus de détails.");
        }

        await affichageGallery();
        await afficherGallery();
        listenersAndSelection();
        btnDeletePhotos.style.display = "none";
    })
}