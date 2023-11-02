// const homeM = r => require(["../views/mobile/home.vue"])
import homeM from "../views/mobile/home.vue";
import homeworkEdit from "../views/pc/homeworkEdit.vue";

export default [
  {
    path: "/homeM",
    component: homeM,
    name: "homeM",
    meta: { title: "首页", foot: false, isPC: false }
  },
  {
    path: "/homeworkEdit/:id",
    name: "homeworkEdit",
    component: homeworkEdit,
    meta: {
      title: "家政人员资料",
      isPC: true,
      nav: false
    },
  },
]