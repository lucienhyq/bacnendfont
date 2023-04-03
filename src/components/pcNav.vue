<template>
  <div class="pcNav">
    <div class="pcNavTab">
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
.pcNav{
  background: #929292;
  .pcNavTab{
    width: 100%;
    height: 5rem;
  }
}
</style>
