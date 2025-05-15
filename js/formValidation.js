const validateForm = () => {
    // obtener valores del DOM usando el nombre
    let myForm = document.forms["activityForm"];
    let activityName = myForm["activityName"].value;
    let activityOrganizer = myForm["activtyOrganizer"].value;
    let activityHelper = myForm["activityHelper"].value;
    let area = myForm["area"].value;
    let classroom = myForm["classroom"].value;
    let startDate = myForm["startDate"].value;
    let startTime = myForm["startTime"].value;
    let endDate = myForm["endDate"].value;
    let endTime = myForm["endTime"].value;
    let participants = myForm["participants"].value;

    let activityImages = myForm["activityImage[]"];

    let invalidInputs = [];
    let isValid = true;

    const setInvalidInput = (inputName) => {
        invalidInputs.push(inputName);
        isValid &&= false;
    }

    let dateObj = newDate();

    //invalidaciones
    if (!validateActivityName(activityName)){
        setInvalidInput("activityName");
    }
    if (!validateActivityPerson(activityOrganizer)){
        setInvalidInput("activityOrganizer");
    }
    if (!validateActivityPerson(activityHelper)){
        setInvalidInput("activityHelpers");
    }
    if (!validateArea(area)){
        setInvalidInput("area");
    }
    if (!validateArea(classroom)){
        setInvalidInput("classroom");
    }
    if (!validateStartDate(startDate)){ // REVISAR !
        setInvalidInput("startDate");
    }
    if (!validateEndDate(endDate)){ // REVISAR !
        setInvalidInput("endDate");
    }
    if (!validateStartDate(startTime)){ // REVISAR !
        setInvalidInput("startTime");
    }
    if (!validateEndDate(endTime)){ // REVISAR !
        setInvalidInput("endTime");
    }
    if (!validateParticipants(participants)){
        setInvalidInput("participants");
    }
    if (!validateImages(activityImages)){
        setInvalidInput("images");
    }

    const validateActivityName = (name) => {
        if (!name) return false;
        let lengthValid = name.trim().length >= 5;
        return lengthValid
    }

    // Para los ayudantes y organizadores (igual a la validateActivityName)
    const validateActivityPerson = (name) =>{
        if (!name) return false;
        let lengthValid = name.length >= 5;
        return lengthValid
    }

    // Para classroom, area y building
    const validateArea = (area) => {
        if (!area) return false;
        let valueValid = area == "-";
        return valueValid
    }

    // ?????????????????????????
    const sDateValid = new Date(date);
    const fDateValid = new Date(date);

    const validateStartDate = (date) => { // REVISAR !
        if (!date) return false;
        return !isNaN(sDateValid.getTime())
    }

    const validateEndDate = (date) => { // REVISAR !
        if (!date) return false;
        return !isNaN(sDateValid.getTime()) && sDateValid > fDateValid
        }

    /*const validateStartTime = (time) => { // REVISAR !
        if (!time) return false;
        var sIsValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(inputField.value);
        return sIsValid;
    }*/
    
    /*const validateEndTime = (time) => { // REVISAR !
        if (!time) return false;
        if (sDateValid == fDateValid) {
            
        }
    }*/
    /////////////////////////
    const validateParticipants = (participants) => {
        if (!participants) return false;
        let lengthValid = participants >= 1 && participants <= 200;
        return lengthValid;
    }

    const validateImages = (images) => {
        if (!images) return false;
        let lengthValid = 1<=images.length && images.length <= 5;
        let typeValid = true;

        for (const image of images) {
            let fileFamily = file.type.split("/")[0];
            typeValid &&= fileFamily == "image";
        }
        return lengthValid && typeValid;
    }

    let validationBox = document.getElementById("val-box");
    let validationMessageElem = document.getElementById("val-msg");
    let validationListElem = document.getElementById("val-list)");

    if(!isValid) {
        validationListElem.textContent = "";

        for (input of invalidInputs) {
            let listElement = document.createElement("li");
            listElement.innerText = input;
            validationListElem.append(listElement);
        }
        validationMessageElem.innerText = "Los siguientes campos son inválidos:"

        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";

        validationBox.hidden = false;
    } else {
        myForm.style.display = "none";

        validationMessageElem.innerText = "Formulario válido.";
        validationListElem.textContent = "";

        validationBox.style.backgroundColor = "#ddffdd";
        validationBox.style.borderLeftColor = "#3caf50";

        let submitButton = document.createElement("button");
        submitButton.innerText = "Enviar";
        submitButton.style.marginRight = "10px";
        submitButton.addEventListener("click", () => {
            //myForm.submit al backend que tengo que trabajar ahora :D
        });

        let backButton = document.createElement("button");
        backButton.innerText = "Volver";
        backButton.addEventListener("click", () => {
            myForm.style.display = "block";
            validationBox.hidden = true;
        });
        
        validationListElem.appendChild(submitButton);
        validationListElem.appendChild(backButton);

        validationBox.hidden = false; 
    }




    let submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click",validateForm);


    document.getElementById("activityImage").addEventListener("change", function () {
    const fileInput = this;
    const maxFiles = 5;
    const errorSpan = document.getElementById("fileError");

    if (fileInput.files.length > maxFiles) {
        errorSpan.style.display = "block"; // Show error
        fileInput.value = ""; // Clear the file input
    } else {
        errorSpan.style.display = "none"; // Hide error message
        }
});

}
