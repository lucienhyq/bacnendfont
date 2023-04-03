<template>
  <div id="app">
    <div v-if="$route.meta.isPC" style="width: 100%; height: 100vh; display: flex; flex-direction: column">
      <pcNav></pcNav>
      <div :class="[$route.meta.isPC ? 'pcStyle' : '']">
        <pcCnav></pcCnav>
        <keep-alive>
          <router-view style="flex: 1" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import pcNav from "@/components/pcNav.vue";
import pcCnav from "@/components/pcCnav.vue";
export default {
  data() {
    return {};
  },
  components: { pcNav, pcCnav },
  mounted() {
    // this.getData();
  },
  watch: {
    $route(to, from) {
      if (to.meta.title) {
        document.title = to.meta.title;
      }
    },
  },
  methods: {},
};
</script>
<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
.pcStyle {
  // width: 1200px;
  // margin: 0 auto;
  flex: 1;
  display: flex;
}
</style>
