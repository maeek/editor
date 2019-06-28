module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `@import "@/design/index.scss";`
      }
    }
  }
};
