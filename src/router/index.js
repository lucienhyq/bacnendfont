import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  // },
  {
    path: "/pcHome",
    name: "pcHome",
    component: () =>
      import("../views/pc/pcHome.vue"),
    meta: {
      title: '首页',
      isPC: true
    }
  },
];

const router = new VueRouter({
  routes,
});

export default router;
