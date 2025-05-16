const validateName = (name) => {
  if(!name) return false;
  let lengthValid = name.trim().length >= 4;
  
  return lengthValid;
}

const validateFiles = (files) => {
  if (!files) return false;

  // validación del número de archivos
  let lengthValid = 0 <= files.length && files.length <= 5;

  // validación del tipo de archivo
  let typeValid = true;

  for (const file of files) {
    // el tipo de archivo debe ser "image/<foo>" o "application/pdf"
    let fileFamily = file.type.split("/")[0];
    typeValid &&= fileFamily == "image" || file.type == "application/pdf";
  }

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && typeValid;
};

const validateSelect = (select) => {
  if(!select) return false;
  return true
}

const validateForm = () => {
  // obtener elementos del DOM usando el nombre del formulario.
  let myForm = document.forms["myForm"];
  let organizer = myForm["organizador"].value;
  let helper = myForm["ayudante"].value;
  let name = myForm["nombreActividad"].value;
  let files = myForm["files"].files;
  let area = myForm["select-area"].value;
  let classroom = myForm["select-classroom"].value;

  // variables auxiliares de validación y función.
  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };

  // lógica de validación
  if (!validateName(name)) {
    setInvalidInput("Nombre de Actividad");
  }
  if (!validateName(organizer)) {
    setInvalidInput("Organizador");
  }
  if (!validateName(helper)) {
    setInvalidInput("Ayundate");
  }
  if (!validateFiles(files)) {
    setInvalidInput("Archivos");
  }
  if (!validateSelect(area)) {
    setInvalidInput("Area del Campus");
  }
  if (!validateSelect(classroom)) {
    setInvalidInput("Sala");
  }

  // finalmente mostrar la validación
  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");
  let formContainer = document.querySelector(".main-container");

  if (!isValid) {
    validationListElem.textContent = "";
    // agregar elementos inválidos al elemento val-list.
    for (input of invalidInputs) {
      let listElement = document.createElement("li");
      listElement.innerText = input;
      validationListElem.append(listElement);
    }
    // establecer val-msg
    validationMessageElem.innerText = "Los siguientes campos son inválidos:";

    // aplicar estilos de error
    validationBox.style.backgroundColor = "#ffdddd";
    validationBox.style.borderLeftColor = "#f44336";

    // hacer visible el mensaje de validación
    validationBox.hidden = false;
  } else {
    // Ocultar el formulario
    myForm.style.display = "none";

    // establecer mensaje de éxito
    validationMessageElem.innerText = "¡Formulario válido! ¿Deseas enviarlo o volver?";
    validationListElem.textContent = "";

    // aplicar estilos de éxito
    validationBox.style.backgroundColor = "#ddffdd";
    validationBox.style.borderLeftColor = "#4CAF50";

    // Agregar botones para enviar el formulario o volver
    let submitButton = document.createElement("button");
    submitButton.innerText = "Enviar";
    submitButton.style.marginRight = "10px";
    submitButton.addEventListener("click", () => {
      // myForm.submit();
      // no tenemos un backend al cual enviarle los datos
    });

    let backButton = document.createElement("button");
    backButton.innerText = "Volver";
    backButton.addEventListener("click", () => {
      // Mostrar el formulario nuevamente
      myForm.style.display = "block";
      validationBox.hidden = true;
    });

    validationListElem.appendChild(submitButton);
    validationListElem.appendChild(backButton);

    // hacer visible el mensaje de validación
    validationBox.hidden = false;
  }
};


let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validateForm);


// Checkea que la fecha final sea mayor a la fecha final
document.getElementById('submit-btn').addEventListener('click', function (e) {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('final-date').value;

    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end <= start) {
            alert('La fecha final debe ser posterior a la fecha de inicio.');
            return;
        }
    }
    // document.forms['myForm'].submit();
});

document.getElementById('start-date').addEventListener('change', function () {
    document.getElementById('final-date').min = this.value;
});


// Resetea los inputs al recargar la página
window.addEventListener('DOMContentLoaded', function() {
    const myForm = document.forms["myForm"];
    if (myForm) {
        myForm.reset();
    }
});