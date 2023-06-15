const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
module.exports = {
  publicPath:'/vue3-blog/',
  css: {
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/common.scss";`,
      }
    },
  },
  configureWebpack:{
    plugins: [new NodePolyfillPlugin()]
  }
};