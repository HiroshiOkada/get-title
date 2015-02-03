(function (global) {
  "use strict";
  function setupTextField(url, title) {
    global.chromeStorage.loadOptions(function (options) {
      $.each(global.formats, function (k,v) {
        if (options[k] !== global.chromeStorage.NOT_USE) {
          $('#titles').append(
            '<div class="form-group">' +
              '<label for="' + k  + '">' + v.caption + '</label>' +
              '<div class="input-group">' +
                '<input type="text" class="form-control input-sm" id="' + k +
                  '_text">' +
                '<span class="input-group-btn">' +
                  '<button class="btn btn-default btn-sm" id="' + k +
                    '_button" type="button">Copy</button>' +
                '</span>' +
              '</div>' +
            '</div>');
          $('#' + k + '_text').val( v.convert( url, title));
          $('#' + k + '_button').click( function () {
            $('#' + k + '_text').select();
            document.execCommand('copy');
          });
        }
        if (options[k] === global.chromeStorage.USE_DEFAULT) {
          $('#' + k + '_text').select();
          document.execCommand('copy');
        }
      });
    });
  }
  chrome.tabs.query({active: true, currentWindow: true}, function (tabArray) {
    if (tabArray.length > 0) {
      setupTextField( tabArray[0].url, tabArray[0].title);
    }
  });
})(this);


