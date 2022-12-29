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

    savedColor.style.width = '5px';
    savedColor.style.height = '5px';
    savedColor.style.padding = '5px';
    savedColor.style.background = clr;
    savedColor.style.border = "thin solid black";

    savedColText.textContent = String(clr);

    //copy button
    copyBtn.textContent = "copy to clipboard";
    copyBtn.onclick = copyToClip(savedColText.textContent);
    
    savedColElement.appendChild(savedColor);
    savedColElement.appendChild(savedColText);
    savedColElement.appendChild(copyBtn);

    savedColors.appendChild(savedColElement);

}

function copyToClip(clr){
    navigator.clipboard.writeText(clr);
}

function clear(){
    savedColors.innerHTML = '';
}

//TODO
//Save colour list when closed/ reopened - https://stackoverflow.com/questions/59366177/good-idea-to-keep-persistent-true-in-chrome-extension-manifest-for-timer-feature
//layout
//UX improvements 
//- feedback when copied to clipboard
//- individual items can be deleted
//- ability to get other value types (RGB etc)