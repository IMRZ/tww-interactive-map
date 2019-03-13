<script>
import MapTooltipChokepoint from "@/components/MapTooltipChokepoint";
import MapTooltipDefault from "@/components/MapTooltipDefault";
import MapTooltipInfo from "@/components/MapTooltipInfo";
import MapTooltipRegion from "@/components/MapTooltipRegion";
import MapTooltipResource from "@/components/MapTooltipResource";
import MapTooltipSettlement from "@/components/MapTooltipSettlement";
import MapTooltipStartposition from "@/components/MapTooltipStartposition";

const OFFSET = 20;

export default {
  components: {
    MapTooltipChokepoint,
    MapTooltipDefault,
    MapTooltipInfo,
    MapTooltipRegion,
    MapTooltipResource,
    MapTooltipSettlement,
    MapTooltipStartposition
  },
  props: {
    common: Object,
    map: Object,
    mouseEvent: MouseEvent
  },
  computed: {
    style() {
      if (this.mouseEvent && this.tooltip) {
        const { x, y } = this.mouseEvent;
        return {
          opacity: 1,
          ...this.getHorizontalPosition(x),
          ...this.getVerticalPosition(y)
        };
        // TODO: https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
      } else {
        return { opacity: 0 };
      }
    },
    tooltip() {
      return this.$store.state.tooltip;
    }
  },
  methods: {
    getHorizontalPosition(x) {
      if (x > window.innerWidth * 0.8) {
        return { right: `${window.innerWidth - x + OFFSET}px` };
      } else {
        return { left: `${x + OFFSET}px` };
      }
    },
    getVerticalPosition(y) {
      if (y > window.innerHeight * 0.8) {
        return { bottom: `${window.innerHeight - y + OFFSET}px` };
      } else {
        return { top: `${y + OFFSET}px` };
      }
    },
    renderTooltip() {
      if (!this.tooltip) return null;

      const type = this.tooltip.type;

      switch (type) {
        case "chokepoint":
          return <MapTooltipChokepoint tooltip={this.tooltip} common={this.common} />;
        case "info":
          return <MapTooltipInfo tooltip={this.tooltip} />;
        case "region":
          return <MapTooltipRegion tooltip={this.tooltip} common={this.common} map={this.map} />;
        case "resource":
          return <MapTooltipResource tooltip={this.tooltip} common={this.common} />;
        case "settlement":
          return <MapTooltipSettlement tooltip={this.tooltip} map={this.map} />;
        case "startpos":
          return <MapTooltipStartposition tooltip={this.tooltip} common={this.common} />;
        default:
          return <MapTooltipDefault tooltip={this.tooltip} />;
      }
    }
  },
  render() {
    return (
      <div id="map-tooltip" style={this.style}>
        {this.renderTooltip()}
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
#map-tooltip {
  position: fixed;
  pointer-events: none;
  filter: drop-shadow(0 0 15px #222222);
  transition: opacity 0.3s;
  color: #FFF8D7;
  max-width: 500px;
  z-index: 2000;
}
</style>
