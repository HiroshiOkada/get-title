(() => {
  'use strict';

  const setupTextField = async (url, title) => {
    const options = await global.rwOptions.loadOptions();
    const titlesForm = document.getElementById('titles');

    for (const [key, format] of Object.entries(global.formats)) {
      if (options[key] !== global.rwOptions.NOT_USE) {
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

        document.getElementById(`${key}_button`).addEventListener('click', () => {
          textField.select();
          navigator.clipboard.writeText(textField.value);
        });

        if (options[key] === global.rwOptions.USE_DEFAULT) {
          textField.select();
          navigator.clipboard.writeText(textField.value);
        }
      }
    }
  };

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tab) {
      setupTextField(tab.url, tab.title);
    }
  });
})();