export interface Blog{
    content:string,
    title:string,
    date:string,
    author:string
}
const blogs:Array<Blog> = require('./blogs.json')
export default blogs
