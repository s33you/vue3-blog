const { readFileSync, writeFileSync} = require('fs');
const MarkdownIt = require('markdown-it')

const md = new MarkdownIt({

  linkify: true,
})

let mdstr = readFileSync('./test.md',{
    encoding:'utf-8'
})
let result = md.render(mdstr);
writeFileSync('./test.html',result,{
    encoding:'utf-8'
})
console.log(result)