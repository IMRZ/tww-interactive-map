<template>
  <g class="map-node">
    <!-- <image ref="i" xlink:href="/static/images/wh_settlement_schematic.png" width="24" height="24" /> -->
    <foreignObject style="pointer-events: none;" ref="i" width="24" height="24">
      <div class="container" xmlns="http://www.w3.org/1999/xhtml">
        <img style="pointer-events: auto;" src="/static/images/wh_settlement_schematic.png">
        <!-- <img src="/static/images/resource_colony.png">
        <img src="/static/images/strategic_location.png"> -->
      </div>
    </foreignObject>
  </g>
</template>

<script>
export default {
  name: "m-map-node",
  props: ["tsfm", "containerRefs", "x", "y"],
  mounted() {
    const el = this.$refs.i;
    const svg = this.containerRefs.map;
    this.xf = svg.createSVGTransform();
    el.transform.baseVal.appendItem(this.xf);
  },
  data() {
    return {
      xf: undefined
    };
  },
  watch: {
    tsfm(newValue, oldValue) {
      const el = this.$refs.i;
      const svg = this.containerRefs.map;
      const content = this.containerRefs.content;

      let m = newValue.inverse();
      m.e = this.x;
      m.f = this.y;
      this.xf.setMatrix(m);
    }
  }
};
</script>

<style lang="scss">
.map-node {
  .container {
    height: 24px;
    margin-left: -12px;
    margin-top: -12px;

    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
