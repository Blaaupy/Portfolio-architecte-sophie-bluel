
export async function postUserLogin() {
    const userLoginData = {
        "email": document.querySelector("#emailForm").value,
        "password": document.querySelector("#passwordForm").value,
    };

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLoginData)
    });
    
    return response;
}

export async function loginVerification() {
    const response = await postUserLogin();
    const status = response.status;

    console.log("Status:", status);

    if (![200, 401, 404].includes(status)) {
        console.error("Erreur : statut inattendu.");
    } else {
        if (status === 401 || status === 404) { // Non autorisée ou manque un élément
            const messageErreur = document.querySelector(".messageErreur");
            const message = document.createElement('p');
            message.textContent = "Identifiants ou mot de passe incorrect.";
            messageErreur.appendChild(message);
            
        } else if (status === 200) { // Si la connexion est reussite 
            const data = await response.json();
            const token = data.token; 
            localStorage.setItem("Token", token);  // Stocke le token
            window.location.href = "index.html"; // Redirection
        }
    }
}

export async function indexEditionMode() {
    const isTokenHere = localStorage.getItem("Token"); // Recupère le token dans le local storage, s'il n'y en a pas la valeur sera Null
    if (isTokenHere !== null){ // Verification de si le token est présent ou non avec la valeur null comme expliqué juste au dessus
        const logout = document.querySelector(".navLogin");
        logout.innerHTML = ''; // Retirer le texte Login dans le Nav pour y mettre logout
        const navLogout = document.createElement('p')
        navLogout.textContent = "logout";
        navLogout.style.cursor = "pointer"; // Ajoute un pointeur 

        navLogout.addEventListener('click', () => {
            const confirmation = window.confirm("Voulez-vous vraiment vous déconnecter ?"); // Alert pour comfirmer la déconnection 
            if (confirmation) {
                localStorage.removeItem("Token"); // Retire le token du local storage afin de vraiment tout déconnecter
                location.reload(); // Recharge la page après logout
            }
        });
        logout.appendChild(navLogout);

        const btnModifier = document.querySelector(".projetsModifier");

        const container = document.createElement("div");
        container.classList.add('js-modal')
        container.style.cursor = "pointer";
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-pen-to-square"); //Ajout de l'icon avec font awesome

        const modifier = document.createElement("p");
        modifier.textContent = "Modifier"; // Ajout du texte 

        container.appendChild(icon);
        container.appendChild(modifier);

        btnModifier.appendChild(container);

    }
}