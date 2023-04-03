import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "pcHome",
    component: () =>
      import("../views/pc/pcHome.vue"),
    meta: {
      title: '首页',
      isPC: true
    }
  },
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
  {
    path:"/login",
    name:"login",
    component:()=>{
      import("../views/pc/login.vue")
    }
  }
];

const router = new VueRouter({
  routes,
});

export default router;
