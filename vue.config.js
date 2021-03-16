module.exports = {
  css: {
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/common.scss";`,
      }
    },
  },
};