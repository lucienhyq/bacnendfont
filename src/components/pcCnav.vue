<template>
  <div class="pccNav">
    <div class="pccNavTab">
      <el-col>
        <el-menu
          :default-active="inds"
          background-color="#545c64"
          class="el-menu-vertical-demo"
        >
          <el-menu-item
            :index="String(index)"
            v-for="(item, index) in routearr"
            :key="index"
            @click="tapMenu($event, item.name)"
          >
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
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
    console.log(this.$router.options);
    // console.log(this.$route.name,'dasdasd')
    this.routearr = this.$router.options.routes;
    let arr = this.routearr.filter((item) => {
      return item.path != "/";
    });
    let inds = "";

    // console.log(inds,'dddddd')
    this.routearr = arr;
    // console.log(arr, "dddddd");
    this.routearr.forEach((item, index) => {
      if (item.name == this.$route.name) {
        inds = index;
      }
    });
    this.inds = String(inds);
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
    // width: 10rem;
    .el-menu{
      border-right: none;
    }
  }
}
</style>
