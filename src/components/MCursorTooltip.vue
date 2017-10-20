<template>
  <div class="m-cursor-tooltip" :style="[tooltip.style]">
    <pre v-if="tooltip.type === 'pre'">{{ tooltip.data.text }}</pre>
    <div v-if="tooltip.type === 'region'" class="region">
      <div class="header">
        <div class="content">
          <img :src="climateIcon" />{{ tooltip.data.regionName }}
        </div>
      </div>
      <div>Province: {{ tooltip.data.provinceName }}</div>
      <div>Climate: {{ climateName }}</div>
    </div>
  </div>
</template>

<script>
const TOOLTIP_OFFSET = 10;

export default {
  name: "m-cursor-tooltip",
  mounted() {
    this.$store.watch(state => state.tooltip, this.onTooltipChanged);
  },
  data() {
    return {
      tooltip: {
        style: {
          visibility: "hidden"
        },
        type: "pre",
        data: {
          text: ""
        }
      }
    };
  },
  methods: {
    onTooltipChanged(tooltip) {
      let leftRight, topBottom, xPx, yPx;

      if (tooltip.y < window.innerHeight * 0.8) {
        topBottom = "top";
        yPx = `${tooltip.y + TOOLTIP_OFFSET}px`;
      } else {
        topBottom = "bottom";
        yPx = `${window.innerHeight - tooltip.y + TOOLTIP_OFFSET}px`;
      }

      if (tooltip.x < window.innerWidth * 0.8) {
        leftRight = "left";
        xPx = `${tooltip.x + TOOLTIP_OFFSET}px`;
      } else {
        leftRight = "right";
        xPx = `${window.innerWidth - tooltip.x + TOOLTIP_OFFSET}px`;
      }

      this.tooltip.type = tooltip.type;
      this.tooltip.data = tooltip.data;
      this.tooltip.style = {
        [leftRight]: xPx,
        [topBottom]: yPx,
        visibility: tooltip.visibility
      };
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
.m-cursor-tooltip {
  position: fixed;
  color: #fff8d7;
  border: solid;
  border-width: 14px 14px 14px 14px;
  border-image: url("/static/images/tooltip_frame.png") 14 14 14 14 fill repeat;

  .region {
    width: 228px;

    .header {
      position: absolute;
      top: -14px;
      left: -14px;
      height: 39px;
      width: 256px;
      background-image: url("/static/images/tooltip_header.png");
      padding: 10px 10px 0 10px;

      .content {
        margin-top: -3px;
        display: flex;
        align-items: center;

        img {
          margin-right: 5px;
        }
      }
    }
  }

  pre {
    margin: 0;
    padding: 0;
    font-family: Georgia, Times, "Times New Roman", serif;
  }

  .region {
    margin-top: 25px;
  }
}
</style>


