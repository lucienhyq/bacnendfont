import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import pcHome from "../views/pc/pcHome.vue";
import login from "../views/pc/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "pcHome",
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
    },
  },
  {
    path: "/login",
    name: "login",
    component:login,
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
