const { readFileSync, writeFileSync, readdirSync } = require("fs");
const { resolve } = require("path");
const dir = resolve(__dirname, "../");
const blogPath = resolve(dir, "src/blogs");
const { render } = require("./md-init");
let mdstr = readdirSync(blogPath, {
  encoding: "utf-8",
});
const  blogs = [];
mdstr.forEach((file) => {
  if (/^.*\.md$/.test(file)) {
    let markdown = readFileSync(resolve(blogPath, file), {
      encoding: "utf-8",
    });
    let result = render(markdown);
    blogs.push(result)
  }
});
writeFileSync(resolve(blogPath,'blogs.json'),JSON.stringify(blogs))
