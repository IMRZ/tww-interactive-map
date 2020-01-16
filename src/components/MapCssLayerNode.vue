<template>
  <div class="node-css" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    mapMatrix: SVGMatrix,
    coords: Object,
    offset: Number
  },
  computed: {
    style() {
      if (this.mapMatrix) {
        const { x, y } = this.coords;
        const e = Math.round(x * this.mapMatrix.a - this.offset);
        const f = Math.round(y * this.mapMatrix.d - this.offset);

        return { transform: `translate3d(${e}px, ${f}px, 0px)` };
      } else {
        return { transform: "translate3d(0px, 0px, 0px)" };
      }

    }
  }
};
</script>

<style lang="scss" scoped>
.node-css {
  pointer-events: auto;
  position: absolute;
  z-index: 5;
}

.node-css:hover {
  z-index: 6;
}
</style>
