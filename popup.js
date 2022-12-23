const dropper = new EyeDropper();

document.addEventListener("DOMContentLoaded", () => {});

document.getElementById("select-col-btn").addEventListener("click", drop);

document.getElementById("clear-btn").addEventListener("click", clear);

const savedColors = document.querySelector(".saved-colors");

async function drop({ target: {style}}) {
    const color = await dropper.open().catch();

    // style.background = color.sRGBHex;

    addRow(color.sRGBHex);

}

function addRow(clr){

    const savedColElement = document.createElement("div");

    const savedColor = document.createElement("div");
    const savedColText = document.createElement("p");
    const copyBtn = document.createElement("button");

    savedColor.style.background = clr;
    savedColText.textContent = String(clr);

    //copy button
    copyBtn.textContent = "copy to clipboard";
    copyBtn.onclick = copyToClip();
    
    savedColElement.appendChild(savedColor);
    savedColElement.appendChild(savedColText);
    savedColElement.appendChild(copyBtn);

    savedColors.appendChild(savedColElement);

}

function copyToClip(){

}

function clear(){
    savedColors.innerHTML = '';
}

//TODO
//Add box with sample of colour
//button to remove all saved colours
//Button to copy value of colour
//Save colour list when closed/ reopened
