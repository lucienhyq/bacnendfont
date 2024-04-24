// const homeM = r => require(["../views/mobile/home.vue"])
import homeM from "../views/mobile/home.vue";
import homeworkEdit from "../views/pc/homeworkEdit.vue";
import OrderPage from "../views/pc/OrderPage.vue";
import imageList from "../views/phone/imageList.vue";
import news from "../views/phone/news.vue";
import goodDetail_news from "../views/phone/goodDetail_news.vue";
import homeMaking_index from "../views/phone/homeMaking/homeMaking_index.vue";
import diyformPage from "../views/phone/diyform";
export default [
  {
    path: "/diyform/:id?",
    name: "diyform",
    component: diyformPage,
    meta: {
      title: "表单",
      nav: true,
    },
  },
  {
    path: "/homeMaking_index",
    name: "homeMaking_index",
    component: homeMaking_index,
    meta: {
      title: "家政预约首页",
      nav: true,
    },
  },
  {
    path: "/goodDetail_news_today",
    name: "goodDetail_news_today",
    component: goodDetail_news,
    meta: {
      title: "新闻页",
      nav: true,
    },
  },
  {
    path: "/goodDetail_news/:newsId",
    name: "goodDetail_news",
    component: goodDetail_news,
    meta: {
      title: "新闻页",
      nav: true,
    },
  },
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
