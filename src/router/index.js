import Vue from "vue";
import VueRouter from "vue-router";
const home = (r) => require(["../views/home"], r);
const login = (r) => require(["../views/login/index"], r);
// layout 布局主组件
const Layout = (r) => require(["../components/layout"], r);
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: home,
    hidden: true,
  },
  {
    path: "/login",
    component: login,
    name: "login",
    meta: {
      title: "登录",
    },
    hidden: true,
  },
  {
    path: "/pcHome",
    component: Layout,
    redirect: "/pcHome/index",
    name: "pcHome",
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "/pcHome/index",
        component: () => import("@/views/pc/home.vue"),
        name: "pcHomeIndex",
        hidden: true,
        meta: { title: "首页", is_role: true },
      },
    ],
  },
  {
    path: "/mobile",
    component: home,
    name: "mobileHome",
    meta: {
      title: "移动首页",
    },
    hidden: true,
  },
  {
    path: "*",
    redirect: "/mobile",
  },
];
const router = new VueRouter({
  routes,
});

router.afterEach((to, from) => {
  // 在路由切换完成后执行的逻辑
  // console.log("路由切换完成");
});
export default router;
