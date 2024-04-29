<template>
  <div class="box">
    <sideNav></sideNav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import sideNav from "./components/sideNav.vue";
export default {
  data() {
    return {};
  },
  activated() {},
  methods: {},
  components: { sideNav },
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
}
</style>
