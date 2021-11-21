const canvas = document.getElementById("jsCanvas");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const copy = document.getElementById("jsCopy");
const colors = document.getElementsByClassName("controls_color");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseUp(event){
    stopPainting();
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeRange(event){
    const range = event.target.value;
    ctx.lineWidth = range;
}

function changeMode(){
    if(filling == true){
        filling = false;
        mode.innerText = "채우기";
    }else{
        filling = true;
        mode.innerText = "그리기";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "painting";
    link.click();
}

function handleCopyClick(){
    canvas.toBlob(function(blob){ 
        const item = new ClipboardItem({ "image/png": blob }); 
        navigator.clipboard.write([item]); 
    });
}



if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

// console.log(Array.from(colors));
Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

if(range){
    range.addEventListener("input", changeRange);
}

if(mode){
    mode.addEventListener("click", changeMode);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}

if(copy){
    copy.addEventListener("click", handleCopyClick);
}