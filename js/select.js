const data = {
    "850": ["F10", "F11", "F21", "QP", "QO", "Q10", "G301", "G303", "G101"],
    "851": ["B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B010"]
}

const classRoomFilter = () => {
    let areaSelect = document.getElementById("area");
    for (const area in data) {

        let option = document.createElement("option");
        option.value = area;
        option.text = area;
        areaSelect.append(option);
    }
}

const update = () =>{ 
    let areaSelect = document.getElementById("area");
    let classroomSelect = document.getElementById("classroom");
    let selectedArea = areaSelect.value;

    if (data[selectedArea]){
        data[selectedArea].forEach(classroom => {
            let option = document.createElement("option");
            option.value = classroom;
            option.text = classroom;
            classroomSelect.appendChild(option);
        })
    }
}

document.getElementById("area").addEventListener("change", update);

window.onload = () => {
    classRoomFilter();
}