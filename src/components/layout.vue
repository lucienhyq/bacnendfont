<template>
  <div class="layout">
    <el-container>
      <el-header class="headerBox">
        <hamburger
          :toggle-click="toggleSideBar"
          :is-active="sidebar"
          class="hamburger-container"
        />
        <Breadcrumb></Breadcrumb>
        <div class="right-head-menu"></div>
      </el-header>
      <el-container>
        <submenu></submenu>
        <el-container>
          <el-main style="padding: 0 0.5rem">
            <router-view />
          </el-main>
          <el-footer>Footer页脚</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import hamburger from "@/components/Hamburger.vue";
import submenu from "@/components/submenu.vue";
export default {
  name: "Layout",
  components: { Breadcrumb, hamburger, submenu },
  data() {
    return {
      sidebar: false,
    };
  },
  methods: {
    toggleSideBar() {
      this.sidebar = !this.sidebar;
    },
  },
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.headerBox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 3rem !important;
  padding: 0 !important;
}
footer {
  height: 3rem !important;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

aside {
  width: 200px;
  background-color: #e9ecef;
}

main {
  flex: 1;
}
@media (max-width: 767px) {
  .aside {
    position: fixed;
    top: 3rem;
    bottom: 0;
    left: -1000px;
    z-index: 1000;
    height: 100%;
  }
}
.asideSHOW {
  left: 0;
}
.asideHide {
  position: fixed;
  top: 3rem;
  bottom: 0;
  left: -1000px;
  z-index: 1000;
  height: 100%;
}
</style>
