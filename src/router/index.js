import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import pcHome from "../views/pc/pcHome.vue";
import login from "../views/pc/login.vue";
import goodsPage from "../views/pc/goods.vue";
import goodsEdit from "../views/pc/goodsEdit.vue";

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
      nav:true
    },
  },
  {
    path: "/goods",
    name: "goods",
    component: goodsPage,
    meta: {
      title: "商品",
      isPC: true,
      nav:true
    },
  },
  {
    path: "/goodsEdit",
    name: "goodsEdit",
    component: goodsEdit,
    meta: {
      title: "商品",
      isPC: true,
      nav:false
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
];

const router = new VueRouter({
  routes,
});

export default router;
