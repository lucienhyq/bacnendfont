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
import nestedRouter from "./modules/nested";
import Layout from "@/Layout";

Vue.use(VueRouter);

const routes = [
  nestedRouter,
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
    component: Layout,
    redirect: "/pcHome",
    meta: {
      title: "首页",
      icon: "el-icon-house",
    },
    children: [
      {
        path: "pcHome",
        component: () => import("@/views/pc/pcHome"),
        name: "pcHome",
        meta: { title: "首页", noCache: true },
      },
    ],
  },
  {
    path: "/OrderPage",
    name: "OrderPage",
    component: Layout,
    redirect: "/OrderPage",
    meta: {
      title: "订单",
      icon: "el-icon-s-order",
    },
    children: [
      {
        path: "OrderPage",
        component: () => import("@/views/pc/OrderPage"),
        name: "OrderPage",
        meta: { title: "订单", noCache: true },
      },
    ],
  },
  {
    path: "/goodsPage",
    name: "goodsPage",
    component: Layout,
    redirect: "/goodsPage",
    meta: {
      title: "商品",
      icon: "el-icon-tickets",
    },
    children: [
      {
        path: "goodsPage",
        component: () => import("@/views/pc/goods"),
        name: "goodsPage",
        meta: { title: "商品列表", noCache: true },
      },
      {
        path: "goodsEdit/:id?",
        component: () => import("@/views/pc/goodsEdit"),
        name: "goodsEdit",
        meta: { title: "商品编辑", noCache: true },
      },
    ],
  },
  {
    path: "/homework",
    name: "homework",
    component: Layout,
    meta: {
      title: "家政业务",
      icon: "el-icon-suitcase",
    },
    children: [
      {
        path: "homework",
        component: () => import("@/views/pc/homework"),
        name: "homework",
        meta: { title: "家政列表", noCache: true },
      },
      {
        path: "/homeworkEdit/:id?",
        name: "homeworkEdit",
        component: () => import("@/views/pc/homeworkEdit"),
        meta: {
          title: "家政人员",
        },
      },
    ],
  },
  // {
  //   path: "/goodsEdit/:id?",
  //   name: "goodsEdit",
  //   component: Layout,
  //   meta: {
  //     title: "商品编辑",
  //     icon: "el-icon-document",
  //   },
  //   children: [
  //     {
  //       path: "goodsEdit/:id?",
  //       component: () => import("@/views/pc/goodsEdit"),
  //       name: "goodsEdit",
  //       meta: { title: "商品编辑", noCache: true },
  //     },
  //   ],
  // },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      title: "登录",
      isPC: true,
      hidden: true,
    },
  },
  {
    path: "/login_m",
    name: "login_m",
    component: login_m,
    meta: {
      title: "登录",
      isPC: false,
      hidden: true,
    },
  },
  {
    path: "/indexHome",
    name: "indexHome",
    component: indexHome,
    meta: {
      title: "首页",
      isPC: false,
      hidden: true,
    },
  },
  {
    path: "/goodDetail/:id/:name?",
    name: "goodDetail",
    component: goodDetail,
    meta: {
      title: "详情",
      isPC: false,
      hidden: true,
    },
  },
  {
    path: "/music_score_index",
    name: "music_score_index",
    component: Layout,
    meta: {
      title: "音乐成绩表单",
    },
    children: [
      {
        path: "/music_score_index",
        name: "music_score_index",
        component: () => import("../views/pc/music_score/formSetting.vue"),
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
console.log(router);

router.afterEach((to, from) => {
  // 在路由切换完成后执行的逻辑
  // console.log("路由切换完成");
});
export default router;
