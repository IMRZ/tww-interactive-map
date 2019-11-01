<template>
  <div class="node-settlement-resources">
    <span class="settlement highlight"
      v-tooltip="tooltip('settlement', region.key)"
      v-if="settlementsFilter"
    >
      <WhIcon icon="xs default wh_settlement_schematic" />
    </span>
    <div class="icons" v-if="resourcesFilter">
      <span class="highlight"
        v-for="entry in strategicLocations"
        :key="entry.icon"
        v-tooltip="tooltip('resource', entry.key)"
      >
        <WhIcon :icon="`resource ${entry.icon}`" />
      </span>
      <span class="highlight"
        v-if="region.settlement.port"
        v-tooltip="tooltip('resource', 'port')"
      >
        <WhIcon icon="md default icon_port" />
      </span>
      <span class="highlight"
        v-for="entry in strategicResources"
        :key="entry.icon"
        v-tooltip="tooltip('resource', entry.key)"
      >
        <WhIcon :icon="`resource ${entry.icon}`" />
      </span>
      <span class="highlight"
        v-if="region.settlement.fortress"
        v-tooltip="tooltip('resource', 'res_fortress')"
      >
        <WhIcon icon="resource siege_defence" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    region: Object,
    resources: Object
  },
  computed: {
    settlementsFilter() {
      return this.$store.state.filters["settlements"];
    },
    resourcesFilter() {
      return this.$store.state.filters["resources"];
    },
    strategicResources() {
      return this.region.settlement.strategicResources.map(r => this.resources[r]);
    },
    strategicLocations() {
      return this.region.settlement.strategicLocations.map(r => this.resources[r]);
    }
  },
  methods: {
    tooltip(type, key) {
      return { type, key };
    }
  }
}
</script>

<style lang="scss" scoped>
.node-settlement-resources {
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 11;

  .highlight {
    filter: brightness(90%);

    &:hover {
      filter: brightness(100%);
    }
  }

  .icons {
    margin-left: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .port {
      width: 26px !important;
      height: 26px !important;
    }
  }

  .settlement + .icons {
    margin-left: 0;
  }
}
</style>
