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
import StoreMixin from '@/mixins/StoreMixin';

export default {
  name: 'MapNode',
  props: {
    settlement: Object,
    svgElement: SVGSVGElement,
    mapMatrix: SVGMatrix
  },
  mixins: [MapTooltipMixin, StoreMixin],
  mounted() {
    this.elementTransform = this.svgElement.createSVGTransform();
    this.$el.transform.baseVal.appendItem(this.elementTransform);
    this.setMatrix(this.mapMatrix);
  },
  data() {
    return {
      elementTransform: undefined
    };
  },
  watch: {
    mapMatrix(newValue) {
      this.setMatrix(newValue);
    }
  },
  methods: {
    setMatrix(m) {
      const matrix = m.inverse();
      matrix.e = this.settlement.x;
      matrix.f = this.settlement.y;
      this.elementTransform.setMatrix(matrix);
    },
    onMouseMove(e) {
      this.showTooltip(e, 'pre', { text: 'MapNode' });
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
