const data = {
  "Región de Tarapacá": ["Camiña", "Huara", "Pozo Almonte", "Iquique", "Pica", "Colchane"],
  "Región de Antofagasta": ["Tocopilla", "Maria Elena", "Ollague", "Calama", "San Pedro Atacama", "Sierra Gorda"],
  "Región de Atacama": ["Diego de Almagro", "Chañaral", "Caldera", "Copiapo", "Tierra Amarilla", "Huasco"]
};

const poblarSalas = () => {
    let departmentSelect = document.getElementById("region");
    for (const department in data) {
        let option = document.createElement("option");
        option.value = department;
        option.text = department;
        departmentSelect.appendChild(option);
    }
};

const updateCursos = () => {
    let departmentSelect = document.getElementById("region");
    let courseSelect = document.getElementById("comuna");
    let selectedDepartment = departmentSelect.value;

    courseSelect.innerHTML = '<option value="">Seleccione una region</option>';

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
  const courseSelect = document.getElementById("comuna");
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

document.getElementById("region").addEventListener("change", updateCursos);
document.getElementById("comuna").addEventListener("change", changeArguments);

window.onload = () => {
  poblarSalas();
  changeArguments();
};