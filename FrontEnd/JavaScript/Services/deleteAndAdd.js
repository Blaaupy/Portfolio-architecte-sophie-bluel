import { afficherGalleryModal } from "./modal.js";

const listeAddedToDelete = new Set()

function afficherHoverDeleteAndDeleteBtn(figureElement, active) {

    const btnDeletePhotos = document.querySelector("#btn-delete-photos");

    if (active) {
        figureElement.classList.add("selection-for-delete");
    } else {
        figureElement.classList.remove("selection-for-delete");
    }

    if (listeAddedToDelete.size > 0) {
        btnDeletePhotos.style.display = null;

    } else {
        btnDeletePhotos.style.display = "none";
    }
}

export async function ajoutListenersOnDeleteButtons() {
    const btnsDeleteGalleryModal = await afficherGalleryModal(".delete-btn");
    
    btnsDeleteGalleryModal.forEach(button => {
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