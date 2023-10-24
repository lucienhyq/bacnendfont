import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import pcHome from "../views/pc/pcHome.vue";
import login from "../views/pc/login.vue";
import goodsPage from "../views/pc/goods.vue";
import goodsEdit from "../views/pc/goodsEdit.vue";
import indexHome from "../views/phone/indexHome.vue";
import goodDetail from "../views/phone/goodDetail.vue";
import frintend from "./frontend";
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
      nav: true
    },
  },
  {
    path: "/goods",
    name: "goods",
    component: goodsPage,
    meta: {
      title: "商品",
      isPC: true,
      nav: true
    },
  },
  {
    path: "/goodsEdit/:id",
    name: "goodsEdit",
    component: goodsEdit,
    meta: {
      title: "商品",
      isPC: true,
      nav: false
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
    path: "/indexHome",
    name: "indexHome",
    component: indexHome,
    meta: {
      title: "首页",
      isPC: false,
    },
  },
  {
    path: "/goodDetail/:id",
    name: "goodDetail",
    component: goodDetail,
    meta: {
      title: "详情",
      isPC: false,
    },
  },
].concat(frintend);

const router = new VueRouter({
  routes,
});

router.afterEach((to, from) => {
  // 在路由切换完成后执行的逻辑
  console.log("路由切换完成");
});
export default router;
