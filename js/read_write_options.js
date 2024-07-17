(() => {
  'use strict';

  const exports = {
    NOT_USE: 0,
    USE: 1,
    USE_DEFAULT: 2
  };

  const adjustOptions = (options) => {
    const keys = ['plain', 'html', 'linkHtml', 'linkTextile', 'linkMarkdown'];
    const useKeys = keys.filter(key => options[key] === exports.USE);
    const useDefaultKeys = keys.filter(key => options[key] === exports.USE_DEFAULT);

    if (useKeys.length + useDefaultKeys.length < 1) {
      options.plain = exports.USE_DEFAULT;
    } else if (useDefaultKeys.length === 0) {
      options[useKeys[0]] = exports.USE_DEFAULT;
    } else if (useDefaultKeys.length > 1) {
      useDefaultKeys.slice(1).forEach(key => {
        options[key] = exports.USE;
      });
    }
    return options;
  };

  exports.loadOptions = () => {
    const defaultOptions = {
      plain: exports.USE,
      html: exports.USE,
      linkHtml: exports.USE,
      linkTextile: exports.USE,
      linkMarkdown: exports.USE_DEFAULT
    };

    return new Promise((resolve) => {
      chrome.storage.sync.get(defaultOptions, (options) => {
        resolve(options);
      });
    });
  };

  exports.saveOptions = (newOptions) => {
    const options = adjustOptions(newOptions);
    return new Promise((resolve) => {
      chrome.storage.sync.set(options, () => {
        resolve(options);
      });
    });
  };

  globalThis.rwOptions = exports;
})();