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
  mounted() {
    this.setCTM(this.mapMatrix);
  },
  data() {
    return {
      style: {
        transform: "matrix(1,0,0,1,0,0)"
      }
    };
  },
  watch: {
    mapMatrix(m) {
      this.setCTM(m);
    }
  },
  methods: {
    setCTM(m) {
      const { x, y } = this.coords;
      const e = x * m.a - this.offset;
      const f = y * m.d - this.offset;
      this.style = {
        transform: `matrix(1,0,0,1,${e},${f})`
      };
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
