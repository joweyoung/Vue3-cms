// ElementPlus按需引入的修改
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: './', // 打包index.html的路径引入
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components' // 快捷路径
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
});
