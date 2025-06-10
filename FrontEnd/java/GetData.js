// récupere les travaux de Sophie depuis l'api.
export async function fetchWork() {
    const works = await fetch("http://localhost:5678/api/works").then(works => works.json());
    return works;
}

// récupere les catégories des travaux de Sophie
export async function fetchCategories(){
    const categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());
    return categories;
}