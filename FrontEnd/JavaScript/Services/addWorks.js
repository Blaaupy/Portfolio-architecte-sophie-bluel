import { fetchCategories } from "../GetData.js";
import { affichageGallery } from "./modal-propre.js";
import { listenersAndSelection } from "./modal-propre.js";

export async function backOnGallery() { /* lorsque la flèche de retour est cliquée, affiche la modal de base */
    const modalGallery = document.querySelector(".modal-gallery");
    modalGallery.style.display = null;
    const modalAddWork = document.querySelector(".modal-add-work");
    modalAddWork.style.display = "none";
    const backModal = document.querySelector(".js-back-modal");
    backModal.style.display = "none";
}



async function selectCategorie() { /* Récupère les catégories dans l'API et les génère en éléments options pour la balise select */
    const select = document.querySelector("#select-categories");
    select.innerHTML = "";
    const categories = await fetchCategories();

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    
    defaultOption.textContent = "--Choisissez une catégorie--";
    select.appendChild(defaultOption);

    categories.forEach(category =>{
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });
}

function afficherPhoto() { /* Recupère l'image de l'utilisateur et l'affiche */
    const fileInput = document.querySelector("#input-file-modal");
    const labelPhoto = document.querySelector(".upload-label");
    
    fileInput.addEventListener("change", () => {

        const file = fileInput.files[0];
        const preview = document.createElement("img");

        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
            labelPhoto.innerHTML = "";
            preview.src = reader.result;
            preview.alt = "Aperçu de l'image";
            preview.style.maxHeight = "169px";
            labelPhoto.appendChild(preview);      
        };

        reader.onerror = function () {
            console.error("Erreur lors de la lecture du fichier :", reader.error);
        };
    });
}

function afficherModalAdd() {
    const btnAddPhoto = document.querySelector("#btn-add-photo");
    const btnRetour = document.querySelector(".js-back-modal");

    btnAddPhoto.addEventListener("click", () => {
        /* Affiche la partie ajout de la modal et affiche le bouton de retour vers la gallery */
        const modalAddWork = document.querySelector(".modal-add-work");
        modalAddWork.style.display = null;
        const modalGallery = document.querySelector(".modal-gallery")
        modalGallery.style.display = "none";
        const backModal = document.querySelector(".js-back-modal");
        backModal.style.display = null;
        btnRetour.addEventListener("click", () => {
            backOnGallery();
        });  
    });
}

function verifierChampsRemplis() {  // Vérifie si tous les champs sont remplis si oui, le btn valider devient clickable sinon il reste gris et non clickable
    const inputTitre = document.querySelector("#input-titre-modal");
    const inputImage = document.querySelector("#input-file-modal");
    const select = document.querySelector("#select-categories");
    const btnValider = document.querySelector("#btn-confirm-add-photo");

    const titre = inputTitre.value.trim();
    const image = inputImage.files[0];
    const category = select.value;

    const tousChampsRemplis = titre !== "" && image !== undefined && category !== "";

    if (tousChampsRemplis) {
        btnValider.style.backgroundColor = "#1D6154";
        btnValider.style.cursor = "pointer";
        btnValider.disabled = false;
    } else {
        btnValider.style.backgroundColor = "gray";
        btnValider.style.cursor = "default";
        btnValider.disabled = true;
    }
}


export async function addAWork() { // Fonction qui affiche la modal puis verifie si tous les champs sont remplis grace à la fonction plus haut et en fonction des valeurs ajoute un travail
    /* Affiche la modal et les options de select */
    afficherModalAdd();
    afficherPhoto();
    await selectCategorie(); 

    const btnValider = document.querySelector("#btn-confirm-add-photo")
    const inputTitre = document.querySelector("#input-titre-modal");
    const inputImage = document.querySelector("#input-file-modal");
    const select = document.querySelector("#select-categories");
    const labelPhoto = document.querySelector(".upload-label");
    const labelPhotoHTMLInitial = labelPhoto.innerHTML;

    /* Verifications */
    inputTitre.addEventListener("input", verifierChampsRemplis);
    inputImage.addEventListener("change", verifierChampsRemplis);
    select.addEventListener("change", verifierChampsRemplis);

    /* Ajout listener du click sur le bouton valider qui sera afficher en vert si tous les champs sont remplis */
    btnValider.addEventListener("click", async (e)=> {
        e.preventDefault();

        const imageFile = inputImage.files[0];
        const titre = inputTitre.value.trim();
        const categoryId = select.value;

        if (!imageFile || !titre || !(categoryId)) {
            alert("Tous les champs doivent être remplis.");
            console.log(imageFile)
            console.log(titre)
            console.log(categoryId)
            return;
        }   
        const token = localStorage.getItem("Token");

        /* Convertis les données pour le post */
        const formData = new FormData();
        formData.append("image", imageFile);      
        formData.append("title", titre);             
        formData.append("category", categoryId);
        /* Envoie la nouvelle image, titre et catégorie dans l'api */
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        if (response.status === 201) {
            const result = await response.json();
            console.log("Travail ajouté :", result);
            alert("Le projet a été ajouté avec succès !");

            // Réinitialisation du formulaire
            inputTitre.value = "";               // ➜ Vide le titre
            inputImage.value = "";               // ➜ Vide le fichier
            select.value = "";                   // ➜ Réinitialise le select
            labelPhoto.innerHTML = labelPhotoHTMLInitial;


            // Désactiver le bouton Valider à nouveau
            btnValider.style.backgroundColor = "gray";
            btnValider.style.cursor = "default";
            btnValider.disabled = true;

            backOnGallery();
            await affichageGallery().then(() =>{ /* Affiche la gallery et ajoute ensuite les listeners sur les boutons delete */
                listenersAndSelection();
            })

        } else if (response.status === 400) {
            alert("Requête invalide. Vérifie les champs.");
        } else if (response.status === 401) {
            alert("Non autorisé. Vérifie ton token.");
        } else {
            alert("Erreur inconnue. Code " + response.status);
        }
            
    });
};


