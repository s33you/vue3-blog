const { readFileSync, writeFileSync } = require("fs");
const MarkdownIt = require("markdown-it");
const hljs = require("highlight.js");
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function(str, lang) {
    let preCode = "";
    // 此处判断是否有添加代码语言
    if (lang && hljs.getLanguage(lang)) {
      preCode = hljs.highlight(lang, str, true).value;
    } else {
      preCode = md.utils.escapeHtml(str);
    }
    try {
      // 得到经过highlight.js之后的html代码
      console.log(preCode);
      // 以换行进行分割
      const lines = preCode.split(/\n/).slice(0, -1);
      // 添加自定义行号
      let html = lines
        .map((item, index) => {
          return (
            `<li><span class="line-num" data-line="${index+1}"></span>${item}</li>`
          );
        })
        .join("");
      // 添加代码语言
      return `<pre class="hljs"><code><span class="name"> ${lang?"lang:"+ lang:"lang:normal" }</span><ol>${html}</ol></code></pre>`;
    } catch (e) {}
  },
});

let mdstr = readFileSync("./test.md", {
  encoding: "utf-8",
});
let result = md.render(mdstr);

let html = `const blog = \`${result}\`
export default blog
`;
writeFileSync("../src/blogs/blog.ts", html, {
  encoding: "utf-8",
});
writeFileSync("./test.html", result, {
  encoding: "utf-8",
});