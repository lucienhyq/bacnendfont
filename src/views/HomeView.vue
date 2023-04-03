<template>
  <div class="home">
    <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow />
    HomeView
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  mounted() {},
};
</script>
