<template>
  <div class="submenu">
    <el-menu
      :show-timeout="200"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :default-active="$route.path"
      text-color="#fff"
      background-color="#444444"
      active-text-color="#ffffff"
    >
      <template v-for="(item, index) in dynamicRoutes">
        <app-link :to="item.path" :key="index">
          <el-menu-item :index="item.path" :key="index">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </app-link>
      </template>
    </el-menu>
  </div>
</template>
<script>
import router from "@/router";
import appLink from "@/components/Link";
export default {
  components: { appLink },
  data() {
    return {
      isCollapse: false,
      dynamicRoutes: [],
    };
  },
  mounted() {
    // 获取所有静态路由
    const staticRoutes = router.options.routes;
    // 获取所有动态添加的路由
    const allRoutes = router.getRoutes();
    this.dynamicRoutes = allRoutes.filter(
      (route) =>
        route.path &&
        !route.redirect &&
        !staticRoutes.some((staticRoute) => staticRoute.path === route.path)
    );
    console.log(this.dynamicRoutes, "动态路由");
  },
  methods: {
    handleOpen() {},
    handleClose() {},
  },
};
</script>
<style lang="scss" scoped>
.submenu {
  height: 100%;
  background: #444444;
  .el-menu {
    border-right: 0;
  }
}
.router-link-active .el-menu-item {
  background-color: #29ba9c !important;
  color: #ffffff !important;
}
</style>
