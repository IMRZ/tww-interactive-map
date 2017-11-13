<template>
  <div class="MapTooltip" :style="[tooltip.style]">
    <pre v-if="tooltip.type === 'pre'">{{ tooltip.data.text }}</pre>
    <div v-if="tooltip.type === 'region'" class="region">
      <div class="heading">
        <img :src="climateIcon" />{{ tooltip.data.regionName }}
      </div>
      <div>Province: {{ tooltip.data.provinceName }}</div>
      <div>Climate: {{ climateName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapTooltip',
  mounted() {
    this.$store.watch(state => state.tooltip, this.onTooltipChanged);
  },
  data() {
    return {
      cursorOffset: 10,
      tooltip: {
        type: undefined,
        data: undefined,
        style: {
          visibility: 'hidden'
        },
      }
    };
  },
  methods: {
    onTooltipChanged({ x, y, visibility, type, data}) {
      this.tooltip = {
        type,
        data,
        style: {
          visibility,
          ...this.getHorizontalPosition(x),
          ...this.getVerticalPosition(y)
        }
      };
    },
    getHorizontalPosition(x) {
      if (x > window.innerWidth * 0.8) {
        return { 'right': `${window.innerWidth - x + this.cursorOffset}px` };
      } else {
        return { 'left': `${x + this.cursorOffset}px` };
      }
    },
    getVerticalPosition(y) {
      if (y > window.innerHeight * 0.8) {
        return { 'bottom': `${window.innerHeight - y + this.cursorOffset}px` };
      } else {
        return { 'top': `${y + this.cursorOffset}px` };
      }
    }
  },
  computed: {
    climateName() {
      const climate = this.tooltip.data.climate;
      return this.$store.getters.climates[climate].name;
    },
    climateIcon() {
      const climate = this.tooltip.data.climate;
      return `/static/images/climate_icons/${this.$store.getters.climates[climate].icon}`;
    }
  }
};
</script>

<style lang="scss">
.MapTooltip {
  position: fixed;
  pointer-events: none;
  color: #fff8d7;
  border: solid;
  border-width: 14px 14px 14px 14px;
  border-image: url('/static/images/tooltip_frame.png') 14 14 14 14 fill repeat;

  .region {
    margin-top: -7px;

    .heading {
      position: relative;
      margin-bottom: 5px;
      display: flex;
      align-items: center;

      &::after {
        content: '';
        position: absolute;
        top: -7px;
        left: -14px;
        right: -14px;
        height: 39px;
        border: solid;
        border-width: 0 14px 0 80px;
        z-index: -1;
        border-image: url('/static/images/tooltip_header.png') 0 14 0 80 fill
          repeat;
      }

      img {
        margin-right: 5px;
      }
    }
  }

  pre {
    margin: 0;
    padding: 0;
    font-family: Georgia, Times, 'Times New Roman', serif;
  }
}
</style>


