(function (exports) {
  "use strict";
  function encodeHTML(rawText) {
    return $('<div/>').text(rawText).html();
  }
  function encodeSquareBrackets(rawText) {
    return rawText.replace(/\[/g, '&#91;').replace(/\]/g, '&#93;');
  }
  exports.plain = {
    caption: "Title (plain text)",
    convert: function (url, title) {
      return title;
    }
  };
  exports.html = {
    caption: "Title (html)",
    convert: function (url, title) {
      return encodeHTML(title);
    }
  };
  exports.linkHtml = {
    caption: "HTML (title + url)",
    convert: function (url, title) {
      return '<a href="' + url + '">' +  encodeHTML(title) + '</a>';
    }
  };
  exports.linkTextile = {
    caption: "Textile (title + url)",
    convert: function (url, title) {
      return '"' + title.replace(/"/g, '&quot;') + '":' + url;
    }
  };
  exports.linkMarkdown = {
    caption: "Markdown (title + url)",
    convert: function (url, title) {
      return '[' + encodeSquareBrackets(title) +
             '](' + url + ')';
    }
  };
})(this.formats = {});
