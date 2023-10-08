<template>
  <div id="app" :class="[$route.meta.isPC ? 'pcStyle_bg' : 'pcStyle_bg_none']">
    <template v-if="$route.meta.isPC">
      <div v-if="$route.name != 'login'" style="width: 100%; height: 100vh; display: flex; flex-direction: column">
        <topNav></topNav>
        <div :class="[$route.meta.isPC ? 'pcStyle' : '']">
          <leftNav style="flex-shrink: 0"></leftNav>
          <keep-alive>
            <router-view style="flex: 1; overflow: hidden" />
          </keep-alive>
        </div>
      </div>
      <div class="loginPage" v-if="$route.name == 'login'">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </template>
    <template v-else>
      <div style="width: 375px; margin: 0 auto">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </template>
  </div>
</template>
<script>
import topNav from "@/components/pcNav.vue";
import leftNav from "@/components/pcCnav.vue";
export default {
  data() {
    return {
      routeNow: "",
    };
  },
  components: { topNav, leftNav },
  mounted() {
    // this.getData();
  },
  watch: {
    $route(to, from) {
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      this.routeNow = to.name;
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
#app {
}
#app #contenBox_h img {
  max-width: 100% !important;
  height: auto !important;
  display: block;
  border: 0 !important;
}
.pcStyle_bg {
  background: #fff;
}
.pcStyle_bg_none {
  background: #f6f6f6;
}
.pcStyle {
  // width: 1200px;
  // margin: 0 auto;
  flex: 1;
  display: flex;
  background: #eff3f6;
}
</style>
