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
            console.warn("Identifiants ou mot de passe incorrect.");
        } else if (status === 200) { // Si la connexion est reussite 
            const data = await response.json();
            const token = data.token; 
            localStorage.setItem("Token", token);  // Stocke le token
            window.location.href = "index.html"; // Redirection
        }
    }
}
