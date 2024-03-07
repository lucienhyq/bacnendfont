// externals

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // host: "192.168.0.144",
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
});
