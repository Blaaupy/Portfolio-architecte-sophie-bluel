// récupere les travaux de Sophie depuis l'api.
export async function fetchWork() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    return works;
}

// récupere les catégories des travaux de Sophie
export async function fetchCategories(){
    const reponse = await fetch("http://localhost:5678/api/categories");
    const categories = reponse.json();
    return categories;
}