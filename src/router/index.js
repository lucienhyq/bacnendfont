import Vue from "vue";
import VueRouter from "vue-router";
const home = (r) => require(["../views/home"], r);
const login = (r) => require(["../views/login/index"], r);
// layout 布局主组件
const Layout = (r) => require(["../components/layout"], r);
Vue.use(VueRouter);

const routes = [
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
    path: "/mobile",
    component: home,
    name: "mobileHome",
    meta: {
      title: "移动首页",
      is_mobile: true,
    },
    hidden: true,
  },
  {
    path: "*",
    redirect: "/mobile",
    meta: {
      title: "移动首页",
      is_mobile: true,
    },
  },
];
const asyncRouterMap = [
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
        meta: { title: "首页", is_role: true, icon: "el-icon-s-home" },
      },
    ],
  },
  {
    path: "/memberPage",
    component: Layout,
    redirect: "/member/index",
    name: "memberPage",
    meta: {
      title: "会员",
    },
    children: [
      {
        path: "/member/index",
        component: () => import("@/views/pc/member/index.vue"),
        name: "memberIndex",
        hidden: true,
        meta: { title: "会员", is_role: true, icon: "el-icon-user-solid" },
      },
    ],
  },
];
const router = new VueRouter({
  routes,
});
// 动态添加路由
function addAsyncRoutes(routes) {
  routes.forEach((route) => {
    router.addRoute(route);
  });
}

addAsyncRoutes(asyncRouterMap);
router.afterEach((to, from) => {
  // 在路由切换完成后执行的逻辑
  // console.log("路由切换完成");
});
export default router;
