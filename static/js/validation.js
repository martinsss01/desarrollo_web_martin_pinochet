const validateName = (name) => {
  if(!name) return false;
  let lengthValid = name.trim().length >= 4;
  
  return lengthValid;
}
const validateEmail = (mail) => mail && mail.includes("@");

const validateFiles = (files) => {
  if (!files) return false;

  // validación del número de archivos
  let lengthValid = 1 <= files.length && files.length <= 5;

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
  let sector = myForm["sector"].value;
  let name = myForm["nombre"].value;
  let files = myForm["files"].files;
  let region = myForm["region"].value;
  let comuna = myForm["comuna"].value;
  let email = myForm["email"].value;
  let theme = myForm["tema"].value;
  let social = myForm["social"].value;
  let account = myForm["cuenta"].value;
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
  if (!validateName(sector)) {
    setInvalidInput("Sector");
  }
  if (!validateFiles(files)) {
    setInvalidInput("Archivos");
  }
  if (!validateSelect(region)) {
    setInvalidInput("Región");
  }
  if (!validateSelect(comuna)) {
    setInvalidInput("Comuna");
  }
  if (!validateEmail(email)) {
    setInvalidInput("Email");
  }
  if (!validateSelect(theme)) {
    setInvalidInput("Tema");
  }
  if (!validateSelect(social)) {
    setInvalidInput("Redes Sociales");
  }
  if (!validateName(account)) {
    setInvalidInput("Nombre de Cuenta / Número de contacto");
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
      myForm.submit();
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
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('final-time').value;

    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (end < start) {
            alert('La fecha final debe ser posterior a la fecha de inicio.');
            return;
        }
        else if (end === start && endTime < startTime) {
            alert('La hora final debe ser posterior a la hora de inicio.');
            return;
        }
    }
    // document.forms['myForm'].submit();
});

document.getElementById('start-date').addEventListener('change', function () {
    document.getElementById('final-date').min = this.value;
});

document.getElementById('start-time').addEventListener('change', function () {
  document.getElementById('final-time').min = this.value;
});


// Resetea los inputs al recargar la página
window.addEventListener('DOMContentLoaded', function() {
    const myForm = document.forms["myForm"];
    if (myForm) {
        myForm.reset();
    }
});