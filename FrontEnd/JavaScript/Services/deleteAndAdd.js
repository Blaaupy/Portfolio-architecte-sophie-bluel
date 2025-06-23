const listeAddedToDelete = new Set()
const btnDeletePhotos = document.querySelector("#btn-delete-photos");

function afficherHoverDeleteAndDeleteBtn(figureElement, active) {

    if (active) {
        figureElement.classList.add("selection-for-delete");
    } else {
        figureElement.classList.remove("selection-for-delete");
    }

    if (listeAddedToDelete.size > 0) {
        btnDeletePhotos.style.display = "block";
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

export async function deleteSelectedWorks() {
    
}