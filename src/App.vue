<template>
  <div id="app" :class="[$route.meta.isPC ? 'pcStyle_bg' : 'pcStyle_bg_none']">
    <!-- pc端管理后台 -->
    <template v-if="$route.meta.isPC">
      <div v-if="$route.name != 'login'" style="width: 100%; height: 100vh; display: flex; flex-direction: column">
        <div :class="[$route.meta.isPC ? 'pcStyle' : '']">
          <leftNav style="flex-shrink: 0"></leftNav>
          <div class="flex_d_c" style="flex: 1;">
            <topNav></topNav>
            <keep-alive>
              <router-view style="flex: 1; overflow: hidden" />
            </keep-alive>
          </div>
        </div>
      </div>
      <div class="loginPage" v-if="$route.name == 'login'">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </template>
    <!-- 移动端 -->
    <template v-else>
      <div style="width: 375px; margin: 0 auto; background-color: #f5f5f5;min-height: 100vh;">
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
  background: #f5f5f5;
  min-height: 100vh;
}
.pcStyle {
  // width: 1200px;
  // margin: 0 auto;
  flex: 1;
  display: flex;
  background: #eff3f6;
}
.flex_d_c{
  display: flex;
  flex-direction: column;
}
</style>
