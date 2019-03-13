<template>
  <MapSvgLayer id="regions">
    <path
      class="region"
      v-for="region in regions"
      :key="region.key"
      :d="region.d"
      :style="style(region)"
      @click="onClick(region)"
      @mouseenter.prevent="showTooltip(region)"
      @mouseleave.prevent="clearTooltip"
    />
  </MapSvgLayer>
</template>

<script>
import MapSvgLayer from "@/components/MapSvgLayer";

export default {
  components: { MapSvgLayer },
  props: {
    regions: Object,
    factions: Object,
    starting_regions: Object
  },
  created() {
    // this is a reset
    this.$store.commit("SET_PAINTER_FACTIONS", Object.assign({}, this.starting_regions));
  },
  computed: {
    selected() {
      return this.$store.state.painter.faction;
    },
    factionList() {
      return this.$store.state.painter.factions;
    }
  },
  methods: {
    onClick(region) {
      if (this.selected) {
        this.$store.commit("SET_PAINTER_FACTIONS_ITEM", {
          regionKey: region.key,
          factionKey: this.selected.key
        });
      } else {
        this.$store.commit("SET_PAINTER_FACTIONS_ITEM", {
          regionKey: region.key,
          factionKey: null
        });
      }
    },
    style(region) {
      const owner = this.factionList[region.key];
      const faction = this.factions[owner];
      return faction ? { fill: `#${faction.primaryColour}` } : null;
    },
    showTooltip(region) {
      const owner = this.factionList[region.key];
      const faction = this.factions[owner];
      const ownedBy = faction ? faction.key : null;

      this.setTooltip({
        type: "region-owner",
        key: region.key,
        ownedBy: ownedBy
      });
    },
    clearTooltip() {
      this.setTooltip(null);
    },
    setTooltip(tooltip) {
      this.$store.commit("SET_TOOLTIP", tooltip);
    }
  }
};
</script>

<style lang="scss" scoped>
.region {
  fill: transparent;
  fill-opacity: 0.5;

  &:hover {
    stroke: black;
    stroke-width: 1;
    fill-opacity: 0.3;
  }
}
</style>
