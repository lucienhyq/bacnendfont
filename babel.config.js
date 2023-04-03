// 获取 VUE_APP_ENV 非 NODE_ENV，测试环境依然 console
const plugins = [
  [
    "import",
    {
      libraryName: "vant",
      libraryDirectory: "es",
      style: true
    },
    "vant"
  ]
];

module.exports = {
  presets: [["@vue/cli-plugin-babel/preset"]],
  plugins
};
