// const homeM = r => require(["../views/mobile/home.vue"])
import homeM from "../views/mobile/home.vue";
import homeworkEdit from "../views/pc/homeworkEdit.vue";
import OrderPage from "../views/pc/OrderPage.vue";
import imageList from "../views/phone/imageList.vue";
import news from "../views/phone/news.vue";

export default [
  {
    path: "/news",
    component: news,
    name: "news",
    meta: { title: "新闻", foot: false, isPC: false },
  },
  {
    path: "/imageList",
    component: imageList,
    name: "imageList",
    meta: { title: "图片列表", foot: false, isPC: false },
  },
  {
    path: "/homeM",
    component: homeM,
    name: "homeM",
    meta: { title: "首页", foot: false, isPC: false },
  },
  {
    path: "/homeworkEdit/:id?",
    name: "homeworkEdit",
    component: homeworkEdit,
    meta: {
      title: "家政人员资料",
      isPC: true,
      nav: false,
    },
  },
  {
    path: "/OrderPage",
    name: "OrderPage",
    component: OrderPage,
    meta: {
      title: "订单",
      isPC: true,
      nav: true,
    },
  },
];
