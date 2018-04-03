<template>
  <g class="MapNode">
    <foreignObject width="24" height="24"
      v-if="scale < 1"
      transform="translate(-12, -12)"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave">
      <img src="/static/images/wh_settlement_schematic.png">
    </foreignObject>
    <foreignObject width="400" height="51"
      v-if="scale > 0.2"
      :opacity="scale"
      transform="translate(-48, -30)"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave">
      <div class="info">
        <span class="settlement">
          <span>{{ settlementName }}</span>
        </span>
        <img class="climate-icon" :src="climateIcon" />
      </div>
    </foreignObject>
  </g>
</template>

<script>
import SvgUtilMixin from '@/mixins/SvgUtilMixin';
import MapTooltipMixin from '@/mixins/MapTooltipMixin';
import MapGettersMixin from '@/mixins/MapGettersMixin';

export default {
  name: 'MapNode',
  mixins: [SvgUtilMixin, MapTooltipMixin, MapGettersMixin],
  props: {
    settlement: Object,
    mapMatrix: SVGMatrix
  },
  mounted() {
    this.elementTransform = this.createSVGTransform();
    this.$el.transform.baseVal.appendItem(this.elementTransform);
    this.setCTM(this.mapMatrix);
  },
  data() {
    return {
      elementTransform: undefined,
      scale: 1
    };
  },
  watch: {
    mapMatrix(newValue) {
      this.setCTM(newValue);
    }
  },
  computed: {
    settlementName() {
      return this.map.regions[this.settlement.key].name;
    },
    climateIcon() {
      const climate = this.map.regions[this.settlement.key].climate;
      return `/static/images/climate_icons/${this.$store.getters.climates[climate].icon}`;
    }
  },
  methods: {
    setCTM(m) {
      const matrix = this.createSVGMatrix();
      matrix.e = this.settlement.x * m.a;
      matrix.f = this.settlement.y * m.d;
      this.elementTransform.setMatrix(matrix);
      this.scale = Number((m.a).toPrecision(2)) - 0.5;
    },
    onMouseMove(e) {
      this.updateTooltip(e, 'pre', { text: `Settlement: ${this.settlementName}` });
    },
    onMouseLeave() {
      this.hideTooltip();
    }
  }
};
</script>

<style lang="scss">
.MapNode {
  foreignobject {
    pointer-events: none;
  }

  img {
    pointer-events: auto;
    width: 24px;
    height: 24px;
  }

  .info {
    display: flex;
    align-items: center;
    height: 51px;

    .settlement {
      display: flex;
      align-items: center;
      padding-top: 6px;
      pointer-events: auto;
      color: black;
      height: 51px;
      border: solid;
      border-width: 0 64px 0 48px;
      border-image: url('/static/images/city_info_scroll.png')  0 64 0 48 fill repeat;
    }

    .climate-icon {
      margin-left: 0;
    }
  }
}
</style>
