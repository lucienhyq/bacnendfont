<template>
  <div class="Breadcrumb">
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
          <span
            v-if="
              item.redirect === 'noredirect' || index == levelList.length - 1
            "
            class="no-redirect"
            >{{ item.meta.title }}</span
          >
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  mounted(){
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name);
      const first = matched[0];
      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
      console.log(this.levelList);
    },
    handleLink(item) {
      const { redirect, path, name } = item;
      console.log(redirect, path, item);
      this.$router.push({ name: name });
    },
  },
};
</script>
<style lang="scss" scoped></style>
