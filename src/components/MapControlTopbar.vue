<template>
  <transition name="slide">
    <div class="wrapper" v-if="isOverlayActive">
      <WhBarTop class="top-bar">
        <div class="filters">
          <span>Filters:</span>
          <div class="filter">
            <WhIcon icon="xs default icon_marker_settlement" />
            <WhCheckbox
              v-model="settlementFilter"
              v-tooltip="{ type: 'info', text: 'Settlement filter' }"
            />
          </div>
          <div class="filter">
            <WhIcon icon="xs default icon_marker_trade" />
            <WhCheckbox
              v-model="resourceFilter"
              v-tooltip="{ type: 'info', text: 'Resource filter' }"
            />
          </div>
        </div>
      </WhBarTop>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    settlementFilter: {
      get() {
        return this.$store.state.filters["settlements"];
      },
      set(value) {
        this.$store.commit("SET_FILTER", { filter: "settlements", value });
      }
    },
    resourceFilter: {
      get() {
        return this.$store.state.filters["resources"];
      },
      set(value) {
        this.$store.commit("SET_FILTER", { filter: "resources", value });
      }
    },
    isOverlayActive() {
      return this.$store.state.route.query.nodeOverlay === 'settlements';
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 68px;
  max-height: 68px;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-bar {
  pointer-events: auto;
  display: inline-block;
  color: #fff8d7;

  .filters {
    margin: 0 10px 0 20px;
    display: flex;
    align-items: center;

    .filter {
      display: flex;
      align-items: center;
      margin: 0 5px;
    }
  }
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.2s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateY(-68px);
}
</style>
