<template>
  <g class="MapNode">
    <foreignObject style="pointer-events: none;" width="24" height="24" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
      <div class="container">
        <img style="pointer-events: auto;" src="/static/images/wh_settlement_schematic.png">
      </div>
    </foreignObject>
  </g>
</template>

<script>
import MapTooltipMixin from '@/mixins/MapTooltipMixin';

export default {
  name: 'MapNode',
  props: {
    settlement: Object,
    svgElement: SVGSVGElement,
    mapMatrix: SVGMatrix
  },
  mixins: [
    MapTooltipMixin
  ],
  mounted() {
    this.elementTransform = this.svgElement.createSVGTransform();
    this.$el.transform.baseVal.appendItem(this.elementTransform);
    this.setCTM(this.mapMatrix);
  },
  data() {
    return {
      elementTransform: undefined
    };
  },
  watch: {
    mapMatrix(newValue) {
      this.setCTM(newValue);
    }
  },
  methods: {
    setCTM(mapMatrix) {
      const matrix = this.svgElement.createSVGMatrix();
      matrix.a = 1;
      matrix.d = 1;
      matrix.e = this.settlement.x * mapMatrix.a;
      matrix.f = this.settlement.y * mapMatrix.d;
      this.elementTransform.setMatrix(matrix);
    },
    onMouseMove(e) {
      this.showTooltip(e, 'pre', { text: this.settlement.key });
    },
    onMouseLeave() {
      this.hideTooltip();
    }
  }
};
</script>

<style lang="scss">
.MapNode {
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
