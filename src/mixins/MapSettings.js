import { mapGetters, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      setShowTooltip: "SET_SHOW_TOOLTIP",
      setMapOpacity: "SET_MAP_OPACITY"
    })
  },
  computed: {
    ...mapGetters([
      "data",
      "route",
      "settings"
    ]),
    mapId() {
      return this.route.params.id;
    },
    selectedMapData() {
      return this.data.map[this.mapId];
    },
    showTooltip: {
      get() {
        return this.settings.showTooltip;
      },
      set(value) {
        this.setShowTooltip(value);
      }
    },
    mapOverlay: {
      get() {
        const mapOverlay = this.route.query.mapOverlay;
        return mapOverlay ? mapOverlay : "";
      },
      set(value) {
        let query;

        if (value) {
          const { mapOverlayMode, ...otherQueryParams } = this.route.query;
          query = {
            ...otherQueryParams,
            mapOverlay: value
          };
        } else {
          const { mapOverlay, mapOverlayMode, ...otherQueryParams } = this.route.query;
          query = otherQueryParams;
        }

        this.$router.replace({ query });
      }
    },
    mapOverlayMode: {
      get() {
        const mapOverlayMode = this.route.query.mapOverlayMode;
        return mapOverlayMode ? mapOverlayMode : "";
      },
      set(value) {
        let query;

        if (value) {
          query = {
            ...this.route.query,
            mapOverlayMode: value
          };
        } else {
          const { mapOverlayMode, ...otherQueryParams } = this.route.query;
          query = otherQueryParams;
        }

        this.$router.replace({ query });
      }
    },
    nodeOverlay: {
      get() {
        const nodeOverlay = this.route.query.nodeOverlay;
        return nodeOverlay ? nodeOverlay : "";
      },
      set(value) {
        let query;

        if (value) {
          query = {
            ...this.route.query,
            nodeOverlay: value
          };
        } else {
          const { nodeOverlay, ...otherQueryParams } = this.route.query;
          query = otherQueryParams;
        }

        this.$router.replace({ query });
      }
    }
  }
};
