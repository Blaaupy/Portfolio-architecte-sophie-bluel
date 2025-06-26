import { afficherGalleryModal } from "./modal.js";

const listeAddedToDelete = new Set()
const btnDeletePhotos = document.querySelector("#btn-delete-photos");

export function clearListeAddedToDelete() {
    listeAddedToDelete.clear();
    btnDeletePhotos.style.display = "none";
    const selectedFigures = document.querySelectorAll(".selection-for-delete");
    selectedFigures.forEach(figure => figure.classList.remove("selection-for-delete"));
}


function afficherHoverDeleteAndDeleteBtn(figureElement, active) {

    if (active) {
        figureElement.classList.add("selection-for-delete");
    } else {
        figureElement.classList.remove("selection-for-delete");
    }

    if (listeAddedToDelete.size > 0) {
        btnDeletePhotos.style.display = "flex";
    } else {
        btnDeletePhotos.style.display = "none";
    }
}

export async function ajoutListenersOnDeleteButtons(deleteButtons) {
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const idButton = button.getAttribute("data-id");
            const figureButton = button.closest("figure");
            
            if (listeAddedToDelete.has(idButton)){
                listeAddedToDelete.delete(idButton);
                afficherHoverDeleteAndDeleteBtn(figureButton, false);
            } else {
                listeAddedToDelete.add(idButton);
                afficherHoverDeleteAndDeleteBtn(figureButton, true);
            }
        })
    });

}

let isDeleteListenerAttached = false;

export async function deleteSelectedWorks() {
    btnDeletePhotos.addEventListener("click", async () => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer tous les éléments sélectionnés ?")) return;

        const token = localStorage.getItem("Token");
        const results = [];

        for (const id of listeAddedToDelete) {
            const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            });

            if (response.status === 200 || response.status === 204) {
                results.push({ id, status: "success" });
            } else if (response.status === 401) {
                results.push({ id, status: "unauthorized" });
            } else if (response.status === 404) {
                results.push({ id, status: "notFound" });
            } else if (response.status === 500) {
                results.push({ id, status: "serverError" });
            } else {
                results.push({ id, status: `unknownError (${response.status})` });
            }

            
        };

        const allSuccess = results.every(res => res.status === "success");

        if (allSuccess) {
            alert("Tous les éléments ont été supprimés avec succès !");
        } else {
            console.error("Certains éléments n'ont pas pu être supprimés :", results);
            alert("Une ou plusieurs erreurs sont survenues lors de la suppression. Consulte la console pour plus de détails.");
        }


        listeAddedToDelete.clear();
        afficherGalleryModal();
        isDeleteListenerAttached = true;
    });
};


export async function backOnGallery() {
    const btnRetour = document.querySelector(".js-back-modal");
    btnRetour.addEventListener("click", () => {
        const modalGallery = document.querySelector(".modal-gallery");
        modalGallery.style.display = null;
        const modalAddWork = document.querySelector(".modal-add-work");
        modalAddWork.style.display = "none";
        const backModal = document.querySelector(".js-back-modal");
        backModal.style.display = "none";
    })
}

export async function addAWork() {

    const btnAddPhoto = document.querySelector("#btn-add-photo");
    btnAddPhoto.addEventListener("click", () => {
        /* Affiche la partie ajout de la modal et affiche le bouton de retour vers la gallery */
        const modalAddWork = document.querySelector(".modal-add-work");
        modalAddWork.style.display = null;
        const modalGallery = document.querySelector(".modal-gallery")
        modalGallery.style.display = "none";
        const backModal = document.querySelector(".js-back-modal");
        backModal.style.display = null;


    });
    backOnGallery();
}

