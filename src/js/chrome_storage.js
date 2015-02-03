(function (exports) {
  "use strict";
  exports.NOT_USE     = 0;
  exports.USE         = 1;
  exports.USE_DEFAULT = 2;
  function adjustOptions (options) {
    var keys = ['plain', 'html', 'linkHtml', 'linkTextile', 'linkMarkdown'],
        useKeys,
        useDefaultKeys;
    useKeys = keys.filter(function (key) {
      return options[key] === exports.USE;
    });
    useDefaultKeys = keys.filter(function (key) {
      return options[key] === exports.USE_DEFAULT;
    });
    if (useKeys.length + useDefaultKeys.length < 1) {
      options.plain = exports.USE_DEFAULT;
    } else if (useDefaultKeys.length === 0) {
      options[useKeys[0]] = exports.USE_DEFAULT;
    } else if (useDefaultKeys.length > 1) {
      useDefaultKeys.shift();
      useDefaultKeys.forEach(function (key) {
        options[key] = exports.USE;
      });
    }
    return options;
  }
  exports.loadOptions = function (fn) {
    var def = {
          plain:        exports.USE,
          html:         exports.USE,
          linkHtml:     exports.USE,
          linkTextile:  exports.USE,
          linkMarkdown: exports.USE_DEFAULT
        };
    chrome.storage.sync.get(def, function (options) {
      fn(options);
    });
  };
  exports.saveOptions = function(newOptions, fn) {
    var options = adjustOptions(newOptions);
    chrome.storage.sync.set(options, function () {
      fn(options);
    });
  };
}(this.chromeStorage = {}));

