const gridContainer = document.getElementById("gridContainer");
const rangeSlider = document.getElementById("rangeSlider");
const gridSize = document.getElementById("gridSize");
const rainbowColors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple"];
var rainbowCounter = 0;
var rangeValue = rangeSlider.value;
var buttonSelected = "paint";
var drawing = false;
var mode = "paint";
var paintColor = "red";

createGrid();
createColorButtons();

document.getElementById("paint").classList.toggle("invertColor");
function createGrid() {
    let size = rangeValue;
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`
    
    for (let i = 0; i < (size*size); i++) {
        let gridDiv = document.createElement("div");
        gridDiv.className = "grid-div";
        gridDiv.innerHTML = "&nbsp;";
        gridDiv.addEventListener("mouseover", draw);
        gridDiv.addEventListener("mousedown", startDrawing);
        gridDiv.addEventListener("mouseup", stopDrawing);
        gridDiv.style.minHeight = "3px";
        gridDiv.style.minWidth = "3px";
        gridContainer.appendChild(gridDiv);
    }

    gridSize.textContent = `Grid Size: ${rangeValue} x ${rangeValue}`;
}

function startDrawing() {
    drawing = true;
    switch (mode) {
        case "paint":
            if (paintColor != "rainbow") {
                this.style.backgroundColor = paintColor;
            } else {
                rainbowDraw.call(this); 
            }
            break;
        case "eraser":
            this.style.backgroundColor = "white";
            break;
    }
}

function stopDrawing() {
    drawing = false;
}

function draw() {
    if (drawing == true) {
        switch (mode) {
            case "paint":
                if (paintColor != "rainbow") {
                    this.style.backgroundColor = paintColor;
                } else {
                    rainbowDraw.call(this); 
                }
                break;
            case "eraser":
                this.style.backgroundColor = "white";
                break;
           
        }
    }
}

function rainbowDraw() {
    if (rainbowCounter == 7) {
        rainbowCounter = 0;
    }
    this.style.backgroundColor = rainbowColors[rainbowCounter];
    rainbowCounter++;
}

function switchMode(currentMode) {
    switch (currentMode) {
        case "eraser":
            if (mode == "paint") {
                mode = "eraser";
                document.getElementById("selected-button").classList.toggle("switchSelected");
                document.getElementById("eraser").classList.toggle("invertColor");
                document.getElementById("paint").classList.toggle("invertColor");
            }
            break;
        case "paint":
            if (mode == "eraser") {
                mode = "paint";
                document.getElementById("selected-button").classList.toggle("switchSelected");
                document.getElementById("paint").classList.toggle("invertColor");
                document.getElementById("eraser").classList.toggle("invertColor");
            }
            break;
    }
    console.log(mode);
}

function clearDrawing() {
    let drawingPage = gridContainer.querySelectorAll("div");
    drawingPage.forEach((drawing) => drawing.style.backgroundColor = "white");
}

function changeValue() {
    rangeValue = rangeSlider.value;

    resetGrid();
}

function resetGrid() {
    clearGrid();
    createGrid();
}

function clearGrid() {
    let drawingPage = gridContainer.querySelectorAll("div");
    drawingPage.forEach((drawing) => drawing.remove());
}

function createColorButtons() {
    const colors = ["red", "orange", "yellow", "green", "blue", "purple", "black", "rainbow"];
    for (let i = 0; i < 8; i++) {
        let colorButton = document.createElement("div");
        let colorButtonStyle = colorButton.style;
        if (colors[i] == "rainbow") {
            colorButtonStyle.backgroundImage = "url('img/rainbow.jpg')";
            colorButtonStyle.backgroundSize = "1.5em 1.5em";
        } else {
            colorButtonStyle.backgroundColor = colors[i];
        }
        colorButton.classList.add('color');
        colorButton.addEventListener("click", () => changeColor(colors[i]));
        document.getElementById("colors-container").appendChild(colorButton);
    }
}

function changeColor(color) {
    switch (color) {
        case "red":
            paintColor = "red";
            break;
        case "orange":
            paintColor = "orange";
            break;
        case "yellow":
            paintColor = "yellow"
            break;
        case "green":
            paintColor = "green";
            break;
        case "blue":
            paintColor = "blue";
            break;
        case "purple":
            paintColor = "purple";
            break;
        case "black":
            paintColor = "black"
            break;
        default:
            paintColor = "rainbow";
            break;
    }
    console.log(paintColor);
}