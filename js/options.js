(() => {
  'use strict';

  const updateOptions = async () => {
    const options = {};
    for (const [key, format] of Object.entries(global.formats)) {
      const cbElement = document.getElementById(`cb-${key}`);
      const rbElement = document.getElementById(`rb-${key}`);
      if (!cbElement.checked) {
        options[key] = global.rwOptions.NOT_USE;
      } else if (rbElement.checked) {
        options[key] = global.rwOptions.USE_DEFAULT;
      } else {
        options[key] = global.rwOptions.USE;
      }
    }
    await global.rwOptions.saveOptions(options);
    updateFields(options);
  };

  const updateFields = (options) => {
    for (const [key] of Object.entries(global.formats)) {
      const cbElement = document.getElementById(`cb-${key}`);
      const rbElement = document.getElementById(`rb-${key}`);
      cbElement.checked = options[key] !== global.rwOptions.NOT_USE;
      rbElement.checked = options[key] === global.rwOptions.USE_DEFAULT;
    }
  };

  const setupFields = (options) => {
    const tbody = document.getElementById('titles-tbody');
    for (const [key, format] of Object.entries(global.formats)) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${format.caption}</td>
        <td><input type="checkbox" id="cb-${key}" name="use" value="${key}"></td>
        <td><input type="radio" id="rb-${key}" name="autoCopy" value="${key}"></td>
      `;
      tbody.appendChild(row);

      document.getElementById(`cb-${key}`).addEventListener('change', updateOptions);
      document.getElementById(`rb-${key}`).addEventListener('change', updateOptions);
    }
  };

  (async () => {
    const options = await global.rwOptions.loadOptions();
    setupFields(options);
    updateFields(options);
  })();
})();