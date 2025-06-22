export async function postDelete(e) {
    const response = await fetch("http://localhost:5678/api/works/${id}", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        
    });
    
    return response;
}