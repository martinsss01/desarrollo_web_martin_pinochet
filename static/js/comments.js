
let url = 'url_ejemplo';
async function showComments(id) {
    url = `/actividad/${id}/comentarios`
    const response = await fetch(url);
    response.json()
    .then((response) => {
        if (!response.ok) {
        throw new Error("Network response was not ok");
        }
    return response.json(); // Parse the response to JSON
    })
    .then((ajaxResponse) => {
    populateMatchList(ajaxResponse["data"]); // Pass the data to populateMatchList()
        console.log(ajaxResponse);
    })
    .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
    })

}