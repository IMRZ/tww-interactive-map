<template>
  <div class="node"
    @mouseenter.prevent="showTooltip(startpos)"
    @mouseleave.prevent="clearTooltip"
  >
    <WhIcon :icon="icon" />
  </div>
</template>

<script>
export default {
  props: {
    factions: Object,
    startpos: Object
  },
  computed: {
    icon() {
      const flagKey = this.factions[this.startpos.factionKey].flagKey;
      return `flag ${flagKey}`;
    }
  },
  methods: {
    setTooltip(tooltip) {
      this.$store.commit("SET_TOOLTIP", tooltip);
    },
    showTooltip(startpos) {
      const { factionKey, lord } = startpos;
      this.setTooltip({
        type: "startpos",
        key: factionKey,
        lord: lord
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
.node {
  height: 64px;
  width: 64px;
  cursor: pointer;
  filter: brightness(90%) drop-shadow(0 0 15px #222222);
}

.node:hover {
  filter: brightness(100%) drop-shadow(0 0 15px #222222);
}
</style>
