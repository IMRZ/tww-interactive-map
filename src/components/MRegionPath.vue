<template>
  <path class="m-region-path" :d="region.d" :style="{ fill }" v-on:mousemove="onMouseMove" v-on:mouseleave="onMouseLeave" />
</template>

<script>
export default {
  name: 'm-region-path',
  props: ['region'],
  mounted() {
    this.determineColor(this.$route.path);
  },
  watch: {
    '$route'(to, from) {
      this.determineColor(to.path);
    }
  },
  data() {
    return {
      fill: 'transparent'
    }
  },
  computed: {
    provinceFill() {
      const provinceKey = this.region.province.key;
      return `#${this.$store.getters.provinces[provinceKey].fill}`;
    },
    climateFill() {
      const climate = this.region.climate;
      if (!climate) console.log(this.region.key);
      return `${this.$store.getters.climates[climate].fill}`;
    }
  },
  methods: {
    determineColor(overlay) {
      switch (overlay) {
        case '/regions':
          this.fill = this.region.rgb;
          break;
        case '/provinces':
          this.fill = this.provinceFill;
          break;
        case '/climates':
          this.fill = this.climateFill;
          break;
        default:
          this.fill = 'transparent';
          break;
      }
    },
    onMouseMove(e) {
      this.$store.commit('setTooltip', {
        top: e.y,
        left: e.x,
        visibility: 'visible',
        text: `Region: ${this.region.name}${this.region.isCapital ? '*' : ''}\nProvince: ${this.region.province.name}`
      });
    },
    onMouseLeave() {
      this.$store.commit('setTooltip', {
        visibility: 'hidden'
      });
    }
  }
}
</script>

<style lang="scss">
path.m-region-path {
  fill: transparent;
  fill-opacity: 0.4;

  &:hover {
    fill-opacity: 0.6;
  }
}
</style>

