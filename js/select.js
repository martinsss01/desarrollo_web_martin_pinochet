const data = {
  "850": ["G303", "G304", "F10", "F11", "QP", "QO"],
  "851": ["B01", "B02", "B03", "B04", "B05", "B06"]
};

const poblarSalas = () => {
    let departmentSelect = document.getElementById("select-area");
    for (const department in data) {
        let option = document.createElement("option");
        option.value = department;
        option.text = department;
        departmentSelect.appendChild(option);
    }
};

const updateCursos = () => {
    let departmentSelect = document.getElementById("select-area");
    let courseSelect = document.getElementById("select-classroom");
    let selectedDepartment = departmentSelect.value;

    courseSelect.innerHTML = '<option value="">Seleccione una sala</option>';

    if (data[selectedDepartment]) {
        data[selectedDepartment].forEach(course => {
            let option = document.createElement("option");
            option.value = course;
            option.text = course;
            courseSelect.appendChild(option);
        });
    }
  changeArguments();
};

function changeArguments() {
  const courseSelect = document.getElementById("select-area");
  const reasonLabel = document.querySelector("label[for='reason']");
  const reasonTextarea = document.getElementById("comments");
  
  if (courseSelect.value !== "") {
      reasonLabel.style.display = "block";
      reasonTextarea.style.display = "block";
  } else {
      reasonLabel.style.display = "none";
      reasonTextarea.style.display = "none";
  }
}

document.getElementById("select-area").addEventListener("change", updateCursos);
document.getElementById("select-classroom").addEventListener("change", changeArguments);

window.onload = () => {
  poblarSalas();
  changeArguments();
};