const dragbleElem = document.querySelector(".container");
const dropZoneRed = document.querySelector("#drop-red");
const dropZoneWeight = document.querySelector("#drop-weight");
const dropZoneTrash = document.querySelector("#drop-trash");
const clickBtn = document.querySelector(".btn");
const container = document.querySelector(".container");
const allDropZones = document.querySelectorAll(".drop-zone");
const advace = document.querySelector(".result");
let colorElem;
let countRed = 0;
let countWeight = 0;
let countTrash = 0;



const getRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;   
}


const checkRed = (color) => {
    let red = parseInt(color.substring(1,3), 16);
    let green = parseInt(color.substring(3,5), 16);
    let blue = parseInt(color.substring(5,7), 16);
    if (red > green && red > blue) {
        return true;
    } else {
        return false;
    }
}

const weight = () => {
    const weigthBoc = Math.floor(Math.random() * 11);
    return weigthBoc;
}


clickBtn.addEventListener("click", (e) => {
    const box = document.createElement("div");
    box.classList.add("dragble-elem");
    box.id = "dragble-elem";
    box.draggable = "true";
    colorElem = getRandomColor();
    box.style.backgroundColor = colorElem;
    box.setAttribute("data-weight", weight()); 
    let text = box.getAttribute("data-weight");
    box.innerHTML = `Мой вес: ${text}кг`;
    container.appendChild(box);
})

const setTransf = e => {
    e.dataTransfer.setData("text/plain", e.target.id);
}


dragbleElem.addEventListener("dragstart", setTransf)

allDropZones.forEach((item) => {
    item.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
})


dropZoneRed.addEventListener("drop", (e) => {
    e.preventDefault();
    const dropedElemId = e.dataTransfer.getData("text/plain");
    const element = document.getElementById(dropedElemId);
    if(checkRed(colorElem)) {
        dropZoneRed.append(element);
        countRed++;
    } else {
        advace.innerHTML = "Оттенок красного цвета отсутствует. Кидай в мусор"; 
    }
    if(countRed == 12) {
        advace.innerHTML = "Вы победили";
        dropZoneRed.innerHTML = '';
        dropZoneWeight.innerHTML = '';
        dropZoneTrash.innerHTML = '';
    }
})

dropZoneWeight.addEventListener("drop", (e) => {
    const dropedElemId = e.dataTransfer.getData("text/plain");
    e.preventDefault();
    const element = document.getElementById(dropedElemId);
    const weight = element.getAttribute("data-weight")
    if(weight <= 2) {
        dropZoneWeight.append(element);
        countWeight++;
    } else {
        advace.innerHTML = "Слишком тяжелый"; 
    }
    if(countWeight == 12) {
        advace.innerHTML = "Вы победили";
        dropZoneRed.innerHTML = '';
        dropZoneWeight.innerHTML = '';
        dropZoneTrash.innerHTML = '';
    }
})

dropZoneTrash.addEventListener("drop", (e) => {
        e.preventDefault();
        const dropedElemId = e.dataTransfer.getData("text/plain");
        const element = document.getElementById(dropedElemId);
        const weight = element.getAttribute("data-weight")
        if(!checkRed(colorElem) && weight > 2) {
            dropZoneTrash.append(element);
            countTrash++
        }
        if(countTrash == 12) {
            advace.innerHTML = "Вы проиграли";
            dropZoneRed.innerHTML = '';
            dropZoneWeight.innerHTML = '';
            dropZoneTrash.innerHTML = '';
        }
})

