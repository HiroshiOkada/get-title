/**
 * popup.js
 * This script handles the functionality of the popup UI for the Get Title extension.
 * It sets up the text fields for various title formats and handles copying to clipboard.
 */

(() => {
  'use strict';

  /**
   * Sets up the text fields for each format based on the current tab's URL and title.
   * @param {string} url - The URL of the current tab.
   * @param {string} title - The title of the current tab.
   */
  const setupTextField = async (url, title) => {
    const options = await globalThis.rwOptions.loadOptions();
    const titlesForm = document.getElementById('titles');

    for (const [key, format] of Object.entries(globalThis.formats)) {
      if (options[key] !== globalThis.rwOptions.NOT_USE) {
        // Create and append form group for each format
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        formGroup.innerHTML = `
          <label for="${key}">${format.caption}</label>
          <div class="input-group">
            <input type="text" class="form-control input-sm" id="${key}_text">
            <button class="btn btn-default btn-sm" id="${key}_button" type="button">Copy</button>
          </div>
        `;
        titlesForm.appendChild(formGroup);

        const textField = document.getElementById(`${key}_text`);
        textField.value = format.convert(url, title);

        // Add click event listener for copy button
        document.getElementById(`${key}_button`).addEventListener('click', () => {
          textField.select();
          navigator.clipboard.writeText(textField.value);
        });

        // Auto-copy if this format is set as default
        if (options[key] === globalThis.rwOptions.USE_DEFAULT) {
          textField.select();
          navigator.clipboard.writeText(textField.value);
        }
      }
    }
  };

  // Query the current active tab and set up the text fields
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tab) {
      setupTextField(tab.url, tab.title);
    }
  });
})();