<template>
  <div class="MapCssLayer">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MapCssLayer"
};
</script>

<style lang="scss" scoped>
.MapCssLayer {
  pointer-events: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 4096px;
  height: 3352px;
}
</style>

