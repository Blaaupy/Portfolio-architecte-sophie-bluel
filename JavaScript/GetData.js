// Récupère les travaux
export async function fetchWork() {
    const response = await fetch("./data/works.json");
    if (!response.ok) throw new Error("Impossible de charger les travaux");
    return response.json();
}

// Récupère les catégories
export async function fetchCategories() {
    const response = await fetch("./data/categories.json");
    if (!response.ok) throw new Error("Impossible de charger les catégories");
    return response.json();
}
