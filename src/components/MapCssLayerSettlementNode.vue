<template>
  <div class="settlement">
    <span class="settlement-icon"
      @mouseenter.prevent="showTooltip('settlement', settlement)"
      @mouseleave.prevent="clearTooltip"
    >
      <WhIcon icon="common wh_settlement_schematic" />
    </span>
    <div class="icons">
      <span class="icon"
        v-for="item in settlementResources"
        :key="item.icon"
        @mouseenter.prevent="showTooltip('resource', item)"
        @mouseleave.prevent="clearTooltip"
      >
        <WhIcon :icon="`resource ${item.icon}`" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    settlement: Object,
    resources: Object,
    regions_resources: Object,
  },
  computed: {
    settlementResources() {
      const region = this.settlement.key;
      const resources = this.regions_resources[region];

      const icons = resources.reduce((accumulator, item) => {
        if (item.key.endsWith("port")) {
          const portResource = this.resources["port"];
          accumulator.port = [portResource];
        } else if (item.resource) {
          const resource = this.resources[item.resource];
          if (resource.key.startsWith("strategic")) {
            accumulator.strategic_locations.push(resource);
          } else if (resource.key === "res_fortress") {
            accumulator.fortress_gate = [resource];
          } else {
            accumulator.strategic_recources.push(resource);
          }
        }

        return accumulator;
      }, {
        strategic_locations: [],
        strategic_recources: [],
        fortress_gate: [],
        port: []
      });

      const organizedResources = icons.strategic_locations
        .concat(icons.strategic_recources)
        .concat(icons.fortress_gate)
        .concat(icons.port);

      return new Set(organizedResources);
    }
  },
  methods: {
    showTooltip(type, data) {
      this.setTooltip({
        type: type,
        key: data.key
      });
    },
    clearTooltip() {
      this.setTooltip(null);
    },
    setTooltip(tooltip) {
      this.$store.commit("SET_TOOLTIP", tooltip);
    }
  }
}
</script>

<style lang="scss" scoped>
.settlement {
  height: 24px;
  display: flex;
  flex-direction: row;

  z-index: 11;

  .settlement-icon {
    position: absolute;
    filter: brightness(90%);

    &:hover {
      filter: brightness(100%);
    }
  }

  .icons {
    position: absolute;
    left: 24px;
    display: flex;
    flex-direction: row;
    height: 24px;

    .icon {
      width: 24px;
      height: 24px;
      filter: brightness(90%);

      &:hover {
        filter: brightness(100%);
      }
    }
  }
}
</style>
