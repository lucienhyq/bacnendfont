<template>
  <div class="pccNav">
    <el-row>
      <el-col :span="24">
        <el-menu
          :default-active="inds"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          text-color="#fff"
        >
          <!-- :collapse="true" -->
          <Side_barItem
            v-for="(route, index) in routearr"
            :key="index"
            :indexS="route.path"
            :item="route"
            :base-path="route.path"
          ></Side_barItem>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Side_barItem from "./SidebarItem.vue";
export default {
  // props: ["routeArr"],
  data() {
    return {
      routearr: [],
      inds: "",
    };
  },
  components: { Side_barItem },
  mounted() {
    this.routearr = this.$router.options.routes;
    let arr = this.routearr.filter((item) => {
      return item.path != "/";
    });
    this.routearr = arr;
  },
  methods: {
    tapMenu(e, item) {
      console.log(item);
      this.$router.push({ path: `${item.redirect}` });
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
.logo {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  margin: 10px auto;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.pccNav {
  // overflow: hidden;
  // background: #545c64;
  // .pccNavTab {
  //   height: 100%;
  //   // width: 8rem;
  //   border-radius: 1.5rem;
  //   .el-menu {
  //     border-right: none;
  //     text-align: center;
  //   }
  // }
}
</style>
