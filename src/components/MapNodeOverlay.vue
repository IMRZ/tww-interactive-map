<template>
  <div class="MapNodeOverlay">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MapNodeOverlay"
};
</script>

<style lang="scss" scoped>
.MapNodeOverlay {
  pointer-events: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 4096px;
  height: 3352px;
}
</style>

