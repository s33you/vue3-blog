module.exports = {
  publicPath:"https://github.com/s33you/s33you.github.io",
  css: {
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/common.scss";`,
      }
    },
  },
};