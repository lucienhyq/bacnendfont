<template>
  <div class="app-wrapper">
    1111111111111
    <sidebar class="sidebar-container"></sidebar>
    <AppMain></AppMain>
  </div>
</template>
<script>
import sidebar from "@/Layout/components/sidebar.vue";
import AppMain from "@/Layout/components/AppMain.vue";
export default {
  data() {
    return {};
  },
  components: {
    sidebar,
    AppMain,
  },
};
</script>
<style lang="scss" scoped>
.sidebar-container {
  transition: width 0.28s;
  width: 210px !important;
  background-color: #304156;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
</style>
