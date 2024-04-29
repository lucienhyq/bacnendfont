<template>
  <div class="sideNav">
    <!-- <div
      class="navlis"
      :class="[$route.name == routerArr.name ? 'act' : '']"
      v-if="routerArr && routerArr.meta"
      @click="tapRoute(routerArr.path)"
    >
      {{ routerArr.meta.title }}
    </div> -->
    <template v-if="routerArr && routerArr.children">
      <div
        class="navlis"
        v-for="(item, index) in routerArr.children"
        :key="index"
        @click="tapRoute_child(item.name)"
        :class="[$route.name == item.name ? 'act' : '']"
      >
        {{ item.meta.title }}
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      routerArr: [],
    };
  },
  mounted() {
    let routesArr = this.$router.options.routes;
    let arr = routesArr.filter((item) => {
      return item.name == "music_score_index";
    });
    this.routerArr = arr[0];
  },
  methods: {
    tapRoute(path) {
      if (this.$route.path == path) return;
      this.$router.push({ path: path });
    },
    tapRoute_child(name) {
      if (this.$route.name == name) return;
      this.$router.push({ name: name });
    },
  },
};
</script>
<style lang="scss" scoped>
.sideNav {
  width: 10vw;
  height: 100vh;
  background: #fff;
  .navlis {
    text-align: center;
    height: 3rem;
    line-height: 3rem;
    color: #fff;
    color: #545c64;
    cursor: pointer;
  }
  .act {
    background: #ecf5ff;
  }
}
</style>
