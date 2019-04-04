<template>
  <div class="node-settlement-resources">
    <span class="settlement highlight"
      v-tooltip="tooltip('settlement', settlement.key)"
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
        v-if="port"
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
        v-if="fortressGate"
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
    settlement: Object,
    resources: Object,
    regions_resources: Object,
  },
  created() {
    const region = this.settlement.key;
    const resources = this.regions_resources[region];

    resources.forEach((entry) => {
      if (entry.key.endsWith("port")) {
        this.port = true;
      } else if (entry.resource) {
        const resource = this.resources[entry.resource];
        if (resource.key.startsWith("res_location")) {
          this.strategicLocations.push(resource);
        } else if (resource.key === "res_fortress") {
          this.fortressGate = true;
        } else {
          this.strategicResources.push(resource);
        }
      }
    });

    this.strategicLocations = Array.from(new Set(this.strategicLocations));
  },
  data() {
    return {
      strategicLocations: [],
      strategicResources: [],
      fortressGate: false,
      port: false
    };
  },
  computed: {
    settlementsFilter() {
      return this.$store.state.filters["settlements"];
    },
    resourcesFilter() {
      return this.$store.state.filters["resources"];
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
