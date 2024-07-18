/**
 * options.js
 * This script handles the functionality of the options page for the Get Title extension.
 * It allows users to configure which formats to use and set default copy behavior.
 */

(() => {
  'use strict';

  /**
   * Updates the options based on the current state of checkboxes and radio buttons.
   */
  const updateOptions = async () => {
    const options = {};
    for (const [key, format] of Object.entries(globalThis.formats)) {
      const cbElement = document.getElementById(`cb-${key}`);
      const rbElement = document.getElementById(`rb-${key}`);
      if (!cbElement.checked) {
        options[key] = globalThis.rwOptions.NOT_USE;
      } else if (rbElement.checked) {
        options[key] = globalThis.rwOptions.USE_DEFAULT;
      } else {
        options[key] = globalThis.rwOptions.USE;
      }
    }
    await globalThis.rwOptions.saveOptions(options);
    updateFields(options);
  };

  /**
   * Updates the UI fields based on the current options.
   * @param {Object} options - The current options.
   */
  const updateFields = (options) => {
    for (const [key] of Object.entries(globalThis.formats)) {
      const cbElement = document.getElementById(`cb-${key}`);
      const rbElement = document.getElementById(`rb-${key}`);
      cbElement.checked = options[key] !== globalThis.rwOptions.NOT_USE;
      rbElement.checked = options[key] === globalThis.rwOptions.USE_DEFAULT;
    }
  };

  /**
   * Sets up the options fields in the UI.
   * @param {Object} options - The current options.
   */
  const setupFields = (options) => {
    const tbody = document.getElementById('titles-tbody');
    for (const [key, format] of Object.entries(globalThis.formats)) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${format.caption}</td>
        <td><input type="checkbox" id="cb-${key}" name="use" value="${key}"></td>
        <td><input type="radio" id="rb-${key}" name="autoCopy" value="${key}"></td>
      `;
      tbody.appendChild(row);

      // Add event listeners for changes
      document.getElementById(`cb-${key}`).addEventListener('change', updateOptions);
      document.getElementById(`rb-${key}`).addEventListener('change', updateOptions);
    }
  };

  // Initialize the options page
  (async () => {
    const options = await globalThis.rwOptions.loadOptions();
    setupFields(options);
    updateFields(options);
  })();
})();