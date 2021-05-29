const MarkdownIt = require("markdown-it");
const hljs = require("highlight.js");
const mkdc = require("markdown-it-container");
/**
 * highlight 函数
 */
function highlight(str, lang) {
  let preCode = "";
  // 此处判断是否有添加代码语言
  if (lang && hljs.getLanguage(lang)) {
    preCode = hljs.highlight(lang, str, true).value;
  } else {
    preCode = md.utils.escapeHtml(str);
  }
  try {
    // 得到经过highlight.js之后的html代码
    // 以换行进行分割
    const lines = preCode.split(/\n/).slice(0, -1);
    // 添加自定义行号
    let html = lines
      .map((item, index) => {
        return `<li><span class="line-num" data-line="${index +
          1}"></span>${item}</li>`;
      })
      .join("");
    // 添加代码语言
    return `<pre class="hljs"><code><span class="name"> ${
      lang ? "lang:" + lang : ""
    }</span><ol>${html}</ol></code></pre>`;
  } catch (e) {}
}
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
 
});
md.set({
    highlight: highlight
})
function init(markdown, md) {
  md.use(mkdc, "title", {
    validate: function(params) {
      return params.trim().match(/^title\s+(.*)$/);
    },
    render: function(tokens, idx) {
      var m = tokens[idx].info.trim().match(/^title\s+(.*)$/);
      if (tokens[idx].nesting === 1) {
        markdown.title = m[1];
        // opening tag
        return `<h2 style='text-align:center'>${m[1]}</h2>\n`;
      } else {
        // closing tag
        return "";
      }
    },
  });
  md.use(mkdc, "date", {
    validate: function(params) {
      return params.trim().match(/^date\s+(.*)$/);
    },
    render: function(tokens, idx) {
      var m = tokens[idx].info.trim().match(/^date\s+(.*)$/);
      if (tokens[idx].nesting === 1) {
        markdown.date = m[1];

        // opening tag
        return `<span style='text-align:center;color:grey;'>日期：</span><span style='text-align:center;color:grey;'>${m[1]}</span>\t\n`;
      } else {
        // closing tag
        return "";
      }
    },
  });
  md.use(mkdc, "author", {
    validate: function(params) {
      return params.trim().match(/^author\s+(.*)$/);
    },
    render: function(tokens, idx) {
      var m = tokens[idx].info.trim().match(/^author\s+(.*)$/);
      if (tokens[idx].nesting === 1) {
        markdown.author = m[1];

        // opening tag
        return `<span style='text-align:center;color:grey;'>作者：</span><span style='text-align:center;color:grey;'>${m[1]}</span>\n`;
      } else {
        // closing tag
        return "";
      }
    },
  });
  md.use(mkdc, "div", {
    validate: function(params) {
      return params.trim().match(/^div\s+(.*)$/);
    },
    render: function(tokens, idx) {
      var m = tokens[idx].info.trim().match(/^div\s+(.*)$/);
      if (tokens[idx].nesting === 1) {
        markdown.author = m[1];

        // opening tag
        return `<div>${m[1]}</div>\n`;
      } else {
        // closing tag
        return "";
      }
    },
  });
  return md;
}

function render(markdown) {
  const blog = {
    title: "",
    date: "",
    content: "",
    author: "",
  };
  const nmd = init(blog, md);
  blog.content = nmd.render(markdown);
  return blog;
}
module.exports = {
  render,
};
