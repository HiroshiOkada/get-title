(() => {
  'use strict';

  const encodeHTML = (rawText) => {
    const div = document.createElement('div');
    div.textContent = rawText;
    return div.innerHTML;
  };

  const encodeSquareBrackets = (rawText) => {
    return rawText.replace(/\[/g, '&#91;').replace(/\]/g, '&#93;');
  };

  const formats = {
    plain: {
      caption: "Title (plain text)",
      convert: (url, title) => title
    },
    html: {
      caption: "Title (html)",
      convert: (url, title) => encodeHTML(title)
    },
    linkHtml: {
      caption: "HTML (title + url)",
      convert: (url, title) => `<a href="${url}">${encodeHTML(title)}</a>`
    },
    linkTextile: {
      caption: "Textile (title + url)",
      convert: (url, title) => `"${title.replace(/"/g, '&quot;')}":${url}`
    },
    linkMarkdown: {
      caption: "Markdown (title + url)",
      convert: (url, title) => `[${encodeSquareBrackets(title)}](${url})`
    }
  };

  globalThis.formats = formats;
})();