<template>
  <div class="pccNav">
    <div class="pccNavTab">
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['routeArr'],
};
</script>

<style scoped lang="scss">
.pccNav{
  background: #929292;
  .pccNavTab{
    height: 100%;
    width: 10rem;
  }
}
</style>
