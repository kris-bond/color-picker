const dropper = new EyeDropper();

document.addEventListener("DOMContentLoaded", () => {});

document.getElementById("select-col-btn").addEventListener("click", drop);

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

    savedColor.style.background = clr;
    savedColText.textContent = String(clr);
    
    savedColElement.appendChild(savedColor);
    savedColElement.appendChild(savedColText);

    savedColors.appendChild(savedColElement);

}