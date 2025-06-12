
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
            
        }
    });
}

