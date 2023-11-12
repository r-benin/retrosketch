const gridContainer = document.getElementById("gridContainer");
const rangeSlider = document.getElementById("rangeSlider");
const gridSize = document.getElementById("gridSize")
var rangeValue = rangeSlider.value;
var drawing = false;
var mode = "paint";
var paintColor = "black";

createGrid();

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
            this.style.backgroundColor = paintColor;
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
                this.style.backgroundColor = paintColor;
                break;
            case "eraser":
                this.style.backgroundColor = "white";
                break;
           
        }
    }
}

function switchMode(currentMode) {
    switch (currentMode) {
        case "eraser":
            mode = "eraser";
            break;
        case "paint":
            mode = "paint";
            break;
    }
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