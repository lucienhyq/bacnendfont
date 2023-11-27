<template>
  <div class="pccNav">
    <div class="logo">
      <img src="../assets/logo.jpeg" alt="" />
    </div>
    <div class="pccNavTab">
      <el-row class="tac">
        <el-col>
          <el-menu :default-active="inds" background-color="#545c64" class="el-menu-vertical-demo" text-color="#fff">
            <template v-for="(item, index) in routearr">
              <el-menu-item :index="String(index)" v-if="item.meta.nav" :key="index" @click="tapMenu($event, item.name)">
                <span slot="title" style="font-size: 1rem">{{ item.meta.title }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-col>
      </el-row>
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
    if (this.$route.path == "/") {
      inds = 0;
    }
    this.inds = String(inds);
  },
  watch: {
    $route(to, from) {
      let inds;
      this.routearr.forEach((item, index) => {
        if (item.name == to.name) {
          inds = index;
        }
      });
      this.inds = String(inds);
    },
  },
  methods: {
    tapMenu(e, name) {
      this.$router.push({ path: `/${name}` });
      // this.$router.push(name);
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
.logo{
  width: 62px;
  height: 62px;
  border-radius: 50%;
  margin: 10px auto;
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.pccNav {
  overflow: hidden;
  background: #545c64;
  .pccNavTab {
    height: 100%;
    // width: 8rem;
    border-radius: 1.5rem;
    .el-menu {
      border-right: none;
      text-align: center;
    }
  }
}
</style>
