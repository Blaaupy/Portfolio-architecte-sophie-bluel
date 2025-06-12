
export async function tryLogin() {

    const seConnecter = document.querySelector('#login');
    seConnecter.addEventListener('submit', function (event){
        event.preventDefault();

        const userLogin = {
            email: event.target.querySelector('#email').value,
            password: event.target.querySelector('#mdp').value,
        };

        try {
            const reponse = await fetch("http://localhost:5678/api/users/login", {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userLogin)
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log('Connexion réussie :', data);
                alert('Connexion réussie !');
            } else if (response.status === 401) {
                alert('Mot de passe incorrect.');
            } else if (response.status === 404) {
                alert('Utilisateur non trouvé.');
            } else {
                alert('Une erreur inconnue est survenue.');
            }
        }
    });    
}

