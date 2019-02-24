<template>
  <div id="MapTooltip" :style="style">
    <div class="content" v-if="tooltipData && tooltipData.type === 'region'">
      <div>Region: {{getRegionName(tooltipData.regionKey)}}</div>
      <div>Province: {{getProvinceName(tooltipData.regionKey)}}</div>
      <div>Climate: {{getClimate(tooltipData.regionKey)}}</div>
      <div v-if="tooltipData.ownedBy">Owned by: {{getFactionName(tooltipData.ownedBy)}}</div>
    </div>
    <div class="content" v-else-if="tooltipData && tooltipData.type === 'settlement'">
      <div>Settlement: {{getRegionName(tooltipData.regionKey)}}</div>
    </div>
    <div class="content" v-else-if="tooltipData && tooltipData.type === 'startpos'">
      <div>Faction: {{getFactionName(tooltipData.factionKey)}}</div>
      <div v-if="tooltipData.lord">Lord: {{tooltipData.lord}}</div>
    </div>
    <div class="content" v-else-if="tooltipData && tooltipData.type === 'chokepoint'">
      <div>Chokepoint: {{getBattleMapLabel(tooltipData.key)}}</div>
    </div>
    <pre v-else>{{tooltipData}}</pre>
  </div>
</template>

<script>
export default {
  props: {
    event: MouseEvent,
    common: Object,
    map: Object
  },
  data() {
    return {
      offset: 20,
      baseUrl: process.env.BASE_URL
    };
  },
  methods: {
    getBattleMapLabel(key) {
      return this.common.battleMaps[key].label;
    },
    getBattleMapPreview(key) {
      const preview = this.common.battleMaps[key].preview;
      return `${this.baseUrl}ui/chokepoints/${preview}.png`;
    },
    getFactionName(key) {
      const faction = this.common.factions[key];
      return faction ? faction.name : "Abandoned";
    },
    getProvinceName(key) {
      const provinceKey = this.map.regions[key].provinceKey;
      return this.map.provinces[provinceKey].name;
    },
    getRegionName(key) {
      return this.map.regions[key].name;
    },
    getClimate(key) {
      const climateKey = this.map.regions[key].climate
      return this.common.climates[climateKey].name;
    },
    getHorizontalPosition(x) {
      if (x > window.innerWidth * 0.8) {
        return { right: `${window.innerWidth - x + this.offset}px` };
      } else {
        return { left: `${x + this.offset}px` };
      }
    },
    getVerticalPosition(y) {
      if (y > window.innerHeight * 0.8) {
        return { bottom: `${window.innerHeight - y + this.offset}px` };
      } else {
        return { top: `${y + this.offset}px` };
      }
    }
  },
  computed: {
    tooltipData() {
      const dataMapTooltip = this.event && this.event.target.getAttribute("data-map-tooltip");
      if (dataMapTooltip) {
        const [type, ...data] = dataMapTooltip.split(":");
        switch (type) {
          case "region": {
            const [regionKey, ownedBy] = data;
            return {
              type,
              regionKey,
              ownedBy
            };
          }
          case "settlement": {
            const [regionKey] = data;
            return {
              type,
              regionKey
            };
          }
          case "chokepoint": {
            const [key, fill] = data;
            return {
              type,
              key,
              fill
            };
          }
          case "startpos": {
            const [factionKey, lord] = data;
            return {
              type,
              factionKey,
              lord
            };
          }
          default: {
            return { type };
          }
        }
      }
      return undefined;
    },
    style() {
      if (this.tooltipData) {
        const { x, y } = this.event;
        return {
          opacity: 1,
          ...this.getHorizontalPosition(x),
          ...this.getVerticalPosition(y)
        };
      }
      return { opacity: 0 };
    }
  }
};
</script>

<style lang="scss" scoped>
#MapTooltip {
  position: fixed;
  pointer-events: none;
  color: #FFF8D7;
  border: solid;
  border-width: 14px 14px 14px 14px;
  border-image: url("../assets/ui/tooltip_frame.png") 14 14 14 14 fill repeat;
  filter: drop-shadow(0 0 15px #222222);
  transition: opacity 0.3s;

  .content {
    padding: 2px;
  }

  pre {
    margin: 0;
    padding: 0;
  }
}
</style>
