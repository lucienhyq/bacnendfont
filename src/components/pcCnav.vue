<template>
  <div class="pccNav">
    <div class="pccNavTab">
      <el-col>
        <el-menu :default-active="inds" background-color="#545c64" class="el-menu-vertical-demo">
          <template v-for="(item, index) in routearr">
            <el-menu-item :index="String(index)" v-if="item.meta.nav" :key="index" @click="tapMenu($event, item.name)">
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  // props: ["routeArr"],
  data() {
    return {
      routearr: [],
      inds: "",
    };
  },
  mounted() {
    this.routearr = this.$router.options.routes;
    console.log(this.routearr, "ddddddd");
    let arr = this.routearr.filter((item) => {
      return item.path != "/" && item.path != "/login";
    });
    let inds = "";
    this.routearr = arr;
    this.routearr.forEach((item, index) => {
      if (item.name == this.$route.name && item.nav != false) {
        inds = index;
      }
    });
    this.inds = String(inds);
  },
  watch: {
    $route(to, from) {
      console.log(to.name);
      let inds;
      this.routearr.forEach((item, index) => {
        console.log(item);
        if (item.name == to.name) {
          inds = index;
        }
      });
      this.inds = String(inds);
    },
  },
  methods: {
    tapMenu(e, name) {
      this.$router.push(name);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped lang="scss">
.pccNav {
  background: #545c64;
  overflow: hidden;
  .pccNavTab {
    height: 100%;
    width: 7rem;
    .el-menu {
      border-right: none;
      text-align: center;
    }
  }
}
</style>
