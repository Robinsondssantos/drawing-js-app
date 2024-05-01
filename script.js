const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color");

ctx = canvas.getContext("2d");

// Global variables with default value
let prevMouseX, prevMouseY, snapshot, 
isDrawing = false,
selectedTool = "brush",
brushWidth = 5;

window.addEventListener("load", () => {
    // Setting canvas width/height.. offsetwidth/height returns viewable width/height of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const drawRect = (e) => {
    // if fillColor isn't checked draw a rect with border else draw rect with background
    if (!fillColor.checked) {
        // Creating rect according to the mouse pointer
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);        
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {
    ctx.beginPath(); // Creating new path to draw circle
    // Getting radius for circle according to the mouse pointer
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; // Passing current mouseX position as prevMouseX value
    prevMouseY = e.offsetY; // Passing current mouseY position as prevMouseY value
    ctx.beginPath(); // Creating new path to draw
    ctx.lineWidth = brushWidth; // Passing brushSize as line width
    // Copying canvas data & passing as snapshot value.. this avoids dragging the image
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
    if (!isDrawing) return; // if isDrawing is false return from here
    ctx.putImageData(snapshot, 0, 0); // Adding copied canvas data on to this canvas

    if (selectedTool === "brush") {
        ctx.lineTo(e.offsetX, e.offsetY); // Creating line according to the mouse pointer
        ctx.stroke(); // drawing/filling line with color
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    }
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { // Adding clicke evnet to all tool option
        // Removing active class from the previous option and adding on current clicked option
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
    })
})

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);