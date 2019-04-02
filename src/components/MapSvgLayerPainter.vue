<template>
  <MapSvgLayer id="regions">
    <path
      class="region"
      v-for="region in regions"
      :key="region.key"
      :d="region.d"
      :style="style(region)"
      @click="onClick(region)"
      v-tooltip="tooltipRegionOwner(region)"
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
    tooltipRegionOwner(region) {
      const owner = this.factionList[region.key];
      const faction = this.factions[owner];

      return {
        type: "region-owner",
        key: region.key,
        owner: faction ? faction.key : null
      };
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
