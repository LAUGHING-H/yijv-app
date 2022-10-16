const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://xqyl.app.edcdn.cn/',
        changeOrigin: true,
      },

      '/bmiddle': {
        target: 'http://wx1.sinaimg.cn/',
        changeOrigin: true,
      },
      // http://cdn.iciba.com/news/word/big_20181231b.jpg
      '/news': {
        target: 'http://cdn.iciba.com/',
        changeOrigin: true,
      },
      // https://xqyl.cdn.app.edcdn.cn/app/view/posts.html?id=155300
      '/app': {
        target: 'https://xqyl.cdn.app.edcdn.cn/',
        changeOrigin: true,
      },
    }
  }
})
