const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
sizeSlider = document.querySelector("#size-slider"),
clearCanvas = document.querySelector(".clear-canvas"),
saveImg = document.querySelector(".save-img"),
ctx = canvas.getContext("2d");

let selectedColor = "#000",
isDrawing = false,
brushWidth = 1;


const setCanvasBackground = () => {
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = selectedColor
}

window.addEventListener("load", () => {
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
    setCanvasBackground();
})


toolBtns.forEach(btn => { //adding click event on all tool option
    if(btn.classList.contains("active")) {
        selectedTool = btn.id
        console.log(selectedTool)
    }

    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active")
        console.log(btn.id);
        if(btn.classList.contains("active")) {
            selectedTool = btn.id
            console.log(selectedTool)
        }
    })
});


const startDraw = () => {
    isDrawing = true;
    ctx.beginPath(); // allows drawing from postion of cursor instead of last position u stopped
    ctx.lineWidth = brushWidth // set line width to be equal to brush width
}

const drawing = (e) => {
    if(!isDrawing) return // if isDrawing is false return from here
    // ctx.putImageData(snapshot, 0,0);

    // console.log(selectedTool)
    if(selectedTool === "brush" || selectedTool ==="eraser") {
        // console.log(selectedTool)
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : "#000"
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke(); //drawing/filling line with color
    }
    ctx.lineTo(e.offsetX, e.offsetY); // creating a line according to the mouse pointer
    ctx.stroke(); // drawing/filling line with color
}


sizeSlider.addEventListener("change", () => {
    brushWidth = sizeSlider.value
    console.log(sizeSlider.value)
})

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width ,canvas.height);
    setCanvasBackground();
})

saveImg.addEventListener("click", () => {
    const link = document.createElement("a")
    link.download = `${Date.now()}.jpg`
    link.href = canvas.toDataURL()
    link.click()
})

canvas.addEventListener("mousedown", startDraw) // call the startDraw function to draw when u click on the mouse
canvas.addEventListener("mousemove", drawing) // call the drawing function which keeps on drawing where the mouse is inside the canvas
canvas.addEventListener("mouseup", () => isDrawing =  false) // set isDrawing to false when u lift ur hand off the mouse to stop drawing even if u r inside the canvas.