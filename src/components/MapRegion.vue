<template>
  <path
    class="MapRegion"
    :style="{ fill, 'stroke-width': '20', stroke: highlight === region.key ? 'red' : 'transparent' }"
    :d="region.d"
    @mousemove="climate ? onMouseMove($event) : undefined"
    @mouseleave="climate ? onMouseLeave($event) : undefined"
  />
</template>

<script>
import MapTooltipMixin from '@/mixins/MapTooltipMixin';
import StoreMixin from '@/mixins/StoreMixin';

export default {
  name: 'MapRegion',
  props: {
    region: Object,
    mapId: String,
    overlay: String
  },
  mixins: [MapTooltipMixin, StoreMixin],
  computed: {
    map() {
      return this.maps[this.mapId];
    },
    province() {
      return this.map.provinces[this.region.provinceKey];
    },
    climate() {
      return this.climates[this.region.climate];
    },
    fill() {
      switch (this.overlay) {
        case 'regions':
          return this.region.provinceKey ? `#${this.region.fill}` : 'transparent';
        case 'provinces':
          return this.province ? `#${this.province.fill}` : 'transparent';
        case 'climates':
          return this.climate ? `${this.climate.fill}` : 'transparent';
        default:
          return 'transparent';
      }
    },
    highlight() {
      return this.$store.getters.highlight;
    }
  },
  methods: {
    onMouseMove(e) {
      this.showTooltip(e, 'region', {
        provinceName: this.province.name,
        regionName: this.region.name,
        regionIsCapital: this.region.isCapital,
        climate: this.region.climate
      });
    },
    onMouseLeave() {
      this.hideTooltip();
    }
  }
};
</script>

<style lang="scss">
path.MapRegion {
  fill: transparent;
  fill-opacity: 0.4;

  &:hover {
    fill-opacity: 0.6;
  }
}
</style>

