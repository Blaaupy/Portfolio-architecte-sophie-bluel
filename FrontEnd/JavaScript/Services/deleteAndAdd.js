import { afficherGalleryModal } from "./modal.js";

export async function ajoutListenersBtnDelete() {
        const deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach(button => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                const id = e.getAttribute("data-id");
                console.log(id)
                const figure = button.closest("figure");

                if (selectionForDelete.has(id)) {
                    selectionForDelete.delete(id); /* Si la corbeille d'un figure et à nouveau cliquer celui-ci est retirer de la liste de suppresion */
                    afficherHoverForDelete(figure, false);
                } else {
                    selectionForDelete.add(id);
                    afficherHoverForDelete(figure, true);
                }

                afficherBtnDelete();
            })
        })
    }

export async function selecDeletedWorks() {
    const selectionForDelete = new Set();
    const btnDeletePhotos = document.querySelector("#btn-delete-photos");

    function afficherBtnDelete() {
        btnDeletePhotos.style.display = selectionForDelete > 0 ? "block": "none";
    }

    function afficherHoverForDelete(figureElement, active) {
        if (active) {
            figureElement.classList.add("selection-for-delete");
        } else {
            figureElement.classList.remove("selection-for-delete");
        }
    } 

    btnDeletePhotos.addEventListener("click", async () => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer tous les éléments sélectionnés ?")) return;

        const token = localStorage.getItem("Token");

        const deletePromises = Array.from(selectionForDelete).map(id => {
            return fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            });
        });
        try {
            await Promise.all(deletePromises);
            alert("Éléments supprimés avec succès.");
            selectionForDelete.clear();
            afficherBtnDelete();
            afficherGalleryModal();
            location.reload();
        } catch {
            alert("Une erreur est survenue lors de la suppression.");
        }


    })
}