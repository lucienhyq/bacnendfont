<template>
  <div class="submenu">
    <el-menu
      :show-timeout="200"
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">导航</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import {router} from "../router/index";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  mounted(){
    console.log(router)
  },
  methods: {
    handleOpen() {},
    handleClose() {},
  },
};
</script>
<style lang="scss" scoped></style>
