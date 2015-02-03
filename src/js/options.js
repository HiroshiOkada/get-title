(function (global) {
  "use strict";
  function updateOptions() {
    var options = {};
    $.each(global.formats, function (k,v) {
      if (!$('#cb-' + k).is(':checked')) {
        options[k] = global.rwOptions.NOT_USE;
      } else if ($('#rb-' + k).is(':checked')) {
        options[k] = global.rwOptions.USE_DEFAULT;
      } else {
        options[k] = global.rwOptions.USE;
      }
    });
    global.rwOptions.saveOptions(options, function (options) {
      updateFields(options);
    });
  }
  function updateFields(options) {
    $.each(global.formats, function (k,v) {
      if (options[k] === global.rwOptions.USE) {
        $('#cb-' + k).prop('checked', true);
        $('#rb-' + k).prop('checked', false);
      } else if (options[k] === global.rwOptions.USE_DEFAULT) {
        $('#cb-' + k).prop('checked', true);
        $('#rb-' + k).prop('checked', true);
      } else {
        $('#cb-' + k).prop('checked', false);
        $('#rb-' + k).prop('checked', false);
      }
    });
  }
  function setupFields(options) {
    $.each(global.formats, function (k,v) {
      $('#titles-tbody').append(
         '<tr>' +
           '<td>' +
             v.caption +
           '</td>' +
           '<td>' +
             '<label>' +
               '<input type="checkbox" id="cb-' +
               k +
               '" name="use" value="' +
               k +
               '">' +
             '</label>' +
           '</td>' +
           '<td>' +
             '<label>' +
               '<input type="radio" id="rb-' +
               k +
               '" name="autoCopy" value="' +
               k +
               '">' +
             '</label>' +
           '</td>' +
         '</tr>');
      $('#cb-' + k).change(function () {
        updateOptions();
      });
      $('#rb-' + k).change(function () {
        updateOptions();
      });
    });
  }
  global.rwOptions.loadOptions(function (options) {
    setupFields(options);
    updateFields(options);
  });
})(this);


