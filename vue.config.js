// externals
const externals = {
  AMap: "window.AMap",
  vue: "Vue",
  "vue-router": "VueRouter",
  vuex: "Vuex",
  axios: "axios"
};
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "localhost",
    port: 8081, // 端口
    open: false, // 启动后打开浏览器
    proxy: {
      "/api": {
        target: "http://localhost:3000/", //目标接口域名
        changeOrigin: true, //是否跨域
        secure: false,
        pathRewrite: {
          '^/api': '/'   //重写接口
        }
      }
    }
  },
  lintOnSave: false,
  configureWebpack:config => {
    config.externals = externals;
  },
});
