<template>
  <div class="layer-css">
    <slot></slot>
  </div>
</template>

<script>
export default {
  // TODO:
  // props: {
  //   map: Object
  // },
  // computed: {
  //   style() {
  //     return {
  //       width: this.map.width,
  //       height: this.map.height,
  //     };
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.layer-css {
  pointer-events: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 4096px;
  height: 3352px;
}
</style>

