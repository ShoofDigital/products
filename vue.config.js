const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://app.salsify.com/'
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/salsify-vuetify/dist/'
    : '/'
}) 