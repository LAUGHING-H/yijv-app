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
    }
  }
})
