import Vue from "vue";
import VueRouter from "vue-router";
import pcHome from "../views/pc/pcHome.vue";
import login from "../views/pc/login.vue";
import goodsPage from "../views/pc/goods.vue";
import goodsEdit from "../views/pc/goodsEdit.vue";
import indexHome from "../views/phone/indexHome.vue";
import goodDetail from "../views/phone/goodDetail.vue";
import homework from "../views/pc/homework.vue";
import frintend from "./frontend";
import login_m from "../views/phone/loginPhone.vue";
import music_score_index from "../views/pc/music_score/music_score_index";
import formSetting from "../views/pc/music_score/formSetting";
import music_score_create from "../views/pc/music_score/music_score_create";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    component: pcHome,
    meta: {
      title: "首页",
      isPC: true,
    },
  },
  {
    path: "/pcHome",
    name: "pcHome",
    component: pcHome,
    meta: {
      title: "首页",
      isPC: true,
      nav: true,
    },
  },
  {
    path: "/goods",
    name: "goods",
    component: goodsPage,
    meta: {
      title: "商品",
      isPC: true,
      nav: true,
    },
  },
  {
    path: "/homework",
    name: "homework",
    component: homework,
    meta: {
      title: "家政业务",
      isPC: true,
      nav: true,
    },
  },
  {
    path: "/goodsEdit/:id",
    name: "goodsEdit",
    component: goodsEdit,
    meta: {
      title: "商品",
      isPC: true,
      nav: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      title: "登录",
      isPC: true,
    },
  },
  {
    path: "/login_m",
    name: "login_m",
    component: login_m,
    meta: {
      title: "登录",
      isPC: false,
    },
  },
  {
    path: "/indexHome",
    name: "indexHome",
    component: indexHome,
    meta: {
      title: "首页",
      isPC: false,
    },
  },
  {
    path: "/goodDetail/:id/:name?",
    name: "goodDetail",
    component: goodDetail,
    meta: {
      title: "详情",
      isPC: false,
    },
  },
  {
    path: "/music_score_index",
    name: "music_score_index",
    component: music_score_index,
    meta: {
      title: "音乐成绩表单",
      isPC: true,
      nav: true,
    },
    children: [
      {
        path: "/music_score_index",
        name: "music_score_index",
        component: () => import("../views/pc/music_score/formSetting.vue"),
        // component: formSetting,
        meta: {
          title: "音乐成绩表单",
          isPC: true,
          nav: true,
        },
      },
      {
        path: "/music_score_create/:id?",
        name: "music_score_create",
        component: music_score_create,
        meta: {
          title: "创建表单",
          isPC: true,
          nav: true,
        },
      },
    ],
  },
].concat(frintend);

const router = new VueRouter({
  routes,
});

router.afterEach((to, from) => {
  // 在路由切换完成后执行的逻辑
  // console.log("路由切换完成");
});
export default router;
