
let submitComment = (form) => {
    url = `/actividad/${id}/comentarios`;
    const response = fetch(url, {"method": "POST", "body": form})
    .then(response => response.json())
    .then(data => {
        if (data["status"] === "success") {
            showComments(id);
        } else {
            console.error("Error submitting comment:", data["message"]);
        }
    })
    .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
    });
}


let populateComments = (comments) => {
    let commentsList = document.getElementById("comments-list");

    while (commentsList.firstChild) {
        commentsList.removeChild(commentsList.firstChild);
    }
    if (comments.length === 0) {
        commentsList.hidden = true;
        return;
    }
    comments.forEach((comment) => {
        let commentItem = document.createElement("li");
        commentItem.textContent = `${comment["nombre"]} (${comment["fecha"]}): ${comment["comentario"]}`;
        commentsList.appendChild(commentItem);
    });
    commentsList.hidden = false;
};


let showComments = (id) => {
    url = `/actividad/${id}/comentarios`;
    fetch(url)
    .then(response => response.json())
    .then((ajaxResponse) => {
    populateComments(ajaxResponse["data"]); 
        console.log(ajaxResponse);
    })
    .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
    })
}

window.onload = () => {
    let commentsList = document.getElementById("comments-list");
    if (commentsList) {
        commentsList.hidden = true; 
    }
    showComments(activityNum);
}

