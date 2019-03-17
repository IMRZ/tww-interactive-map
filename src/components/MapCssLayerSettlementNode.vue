<template>
  <div class="settlement">
    <span class="icon-settlement" v-tooltip="tooltipSettlement()">
      <WhIcon icon="common wh_settlement_schematic" />
    </span>
    <div class="icons">
      <span class="icon"
        v-for="entry in strategicLocations"
        :key="entry.icon"
        v-tooltip="tooltipResource(entry)"
      >
        <WhIcon :icon="`resource ${entry.icon}`" />
      </span>
      <span class="icon"
        v-if="port"
        v-tooltip="tooltipPort()"
      >
        <WhIcon class="port" icon="resource icon_port" />
      </span>
      <span class="icon"
        v-for="entry in strategicResources"
        :key="entry.icon"
        v-tooltip="tooltipResource(entry)"
      >
        <WhIcon :icon="`resource ${entry.icon}`" />
      </span>
      <span class="icon"
        v-if="fortressGate"
        v-tooltip="tooltipFortressGate()"
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
  methods: {
    tooltipResource(resource) {
      return {
        type: "resource",
        key: resource.key
      };
    },
    tooltipFortressGate() {
      return {
        type: "resource",
        key: "res_fortress"
      };
    },
    tooltipPort() {
      return {
        type: "resource",
        key: "port"
      };
    },
    tooltipSettlement() {
      return {
        type: "settlement",
        key: this.settlement.key
      };
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

  .icon-settlement {
    position: absolute;
    filter: brightness(90%);

    &:hover {
      filter: brightness(100%);
    }
  }

  // TODO: fix this ugly shit
  .icons {
    position: absolute;
    left: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .icon {
      filter: brightness(90%);

      &:hover {
        filter: brightness(100%);
      }
    }

    .port {
      width: 26px !important;
      height: 26px !important;
    }
  }
}
</style>
