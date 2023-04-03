import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Http from "./tool/http";
window.$http = Http;
Vue.config.productionTip = false;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// vant的弹窗组件 $dialog
// 按需引入vant组件
import {
  DatetimePicker,
  Popup,
  Icon,
  Lazyload,
  Button,
  Rate,
  Overlay,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  Row,
  Col,
  Cell,
  CellGroup,
  NavBar,
  Step,
  Steps,
  Field,
  Uploader,
  Picker,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  Dialog,
  Notify,
  Collapse,
  CollapseItem,
  DropdownMenu,
  DropdownItem,
  ImagePreview,
  NoticeBar,
  Search,
  Stepper,
  Progress,
  SwipeCell,
  Switch,
  PullRefresh,
  List,
  Toast,
  Empty,
  Sticky,
  CountDown,
  ActionSheet,
  Circle,
  Card,
  SubmitBar,
  ShareSheet,
  Sku,
  Area,
  Tag,
  Grid,
  GridItem,
  NumberKeyboard,
  PasswordInput,
  Loading,
  Calendar,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Sidebar,
  SidebarItem,
  Divider,
  Slider,
  IndexBar,
  IndexAnchor,
  Popover as Popover1,
  Form as VantForm
} from "vant";

// 使用vant组件
Vue.use(DatetimePicker)
  .use(Cell)
  .use(Slider)
  .use(CellGroup)
  .use(Popup)
  .use(Icon)
  .use(Button)
  .use(Field)
  .use(Rate)
  .use(Overlay)
  .use(Swipe)
  .use(SwipeItem)
  .use(Uploader)
  .use(NavBar)
  .use(Step)
  .use(Steps)
  .use(Tab)
  .use(Tabs)
  .use(Picker)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(RadioGroup)
  .use(Radio)
  .use(Dialog)
  .use(Notify)
  .use(Collapse)
  .use(CollapseItem)
  .use(Row)
  .use(Col)
  .use(DropdownMenu)
  .use(Toast)
  .use(Loading)
  .use(DropdownItem)
  .use(ImagePreview)
  .use(NoticeBar)
  .use(Search)
  .use(Stepper)
  .use(Progress)
  .use(Grid)
  .use(GridItem)
  .use(NumberKeyboard)
  .use(PasswordInput)
  .use(SwipeCell)
  .use(Switch)
  .use(PullRefresh)
  .use(List)
  .use(Empty)
  .use(Sticky)
  .use(CountDown)
  .use(ActionSheet)
  .use(Circle)
  .use(Card)
  .use(SubmitBar)
  .use(ShareSheet)
  .use(Sku)
  .use(Area)
  .use(Tag)
  .use(Calendar)
  .use(GoodsAction)
  .use(GoodsActionButton)
  .use(GoodsActionIcon)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Divider)
  .use(IndexBar)
  .use(IndexAnchor)
  .use(VantForm)
  .use(Popover1);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
