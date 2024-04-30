const canvas = document.querySelector("canvas");
const toolBtns = document.querySelectorAll(".tool");

ctx = canvas.getContext("2d");

let isDrawing = false;
brushWidth = 5;

window.addEventListener("load", () => {
    // Setting canvas width/height.. offsetwidth/height returns viewable width/height of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const startDraw = () => {
    isDrawing = true;
    ctx.beginPath(); // Creating new path to draw
    ctx.lineWidth = brushWidth; // Passing brushSize as line width
}

const drawing = (e) => {
    if (!isDrawing) return; // if isDrawing is false return from here
    ctx.lineTo(e.offsetX, e.offsetY); // Creating line according to the mouse pointer
    ctx.stroke(); // drawing/filling line with color
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { // Adding clicke evnet to all tool option
        console.log(btn.id);
    })
})

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);