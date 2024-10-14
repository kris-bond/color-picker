document.addEventListener('DOMContentLoaded', () => {
  const dropper = new EyeDropper();
  const savedColors = document.querySelector('.saved-colors');

  if (!savedColors) {
    console.error('Element with class .saved-colors not found!');
    return; // Stop execution if the element is not found
  }

  // Load saved colors from storage
  chrome.storage.local.get({ colors: [] }, function (result) {
    savedColors.innerHTML = ''; // Clear previous colors

    if (result.colors.length) {
      result.colors.forEach(addRow);
    }
  });

  // Add event listeners
  const selectColBtn = document.getElementById('select-col-btn');
  const clearBtn = document.getElementById('clear-btn');

  if (selectColBtn && clearBtn) {
    selectColBtn.addEventListener('click', drop);
    clearBtn.addEventListener('click', clear);
  }

  async function drop() {
    const color = await dropper.open().catch();
    if (color) {
      addRow(color.sRGBHex);
    }
  }

  function addRow(clr) {
    // Check if the color is already displayed
    const existingColors = Array.from(savedColors.children);
    const alreadyExists = existingColors.some((element) => {
      const colorText = element.querySelector('p').textContent;
      return colorText === clr; // Check if the color is already present
    });

    if (!alreadyExists) {
      // Only add the color if it doesn't exist
      const savedColElement = document.createElement('div');
      savedColElement.className = 'saved-col-div';

      const savedColor = document.createElement('div');
      const savedColText = document.createElement('p');
      const copyBtn = document.createElement('button');

      savedColor.style.width = '5px';
      savedColor.style.height = '5px';
      savedColor.style.padding = '5px';
      savedColor.style.background = clr;
      savedColor.style.border = 'thin solid black';

      savedColText.textContent = String(clr);

      copyBtn.className = 'copy-btn';
      copyBtn.textContent = '📋';
      copyBtn.onclick = () => copyToClip(savedColText.textContent);

      savedColElement.appendChild(savedColor);
      savedColElement.appendChild(savedColText);
      savedColElement.appendChild(copyBtn);

      savedColors.appendChild(savedColElement);

      // Save color to storage
      chrome.storage.local.get({ colors: [] }, function (result) {
        const updatedColors = [...result.colors, clr];
        chrome.storage.local.set({ colors: updatedColors });
      });
    }
  }

  function copyToClip(clr) {
    navigator.clipboard.writeText(clr);
  }

  function clear() {
    savedColors.innerHTML = '';
    chrome.storage.local.set({ colors: [] });
  }
});
