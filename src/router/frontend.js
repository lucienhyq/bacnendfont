// const homeM = r => require(["../views/mobile/home.vue"])
import homeM from "../views/mobile/home.vue";

export default [
  {
    path: "/homeM",
    component: homeM,
    name: "homeM",
    meta: { title: "首页", foot: false, isPC: false }
  }
]