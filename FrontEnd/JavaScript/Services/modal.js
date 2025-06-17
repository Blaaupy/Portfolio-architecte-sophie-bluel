export async function modalFonctionnelle () {
    const btnModifier = document.querySelector('.js-modal');
    const btnClose = document.querySelector('.js-close-modal');
    const modal1 = document.querySelector(".modal");

    btnModifier.addEventListener("click", () => { /* Ouvre la modal en passant l'affichage de none a null */
        modal1.style.display = null;
        modal1.removeAttribute('aria-hidden');
        modal1.setAttribute('ari-modal', 'true');
    })

    btnClose.addEventListener("click", () => {/* Ferme la modal en passant l'affichage de null a none */
        modal1.style.display = "none";
    })

}