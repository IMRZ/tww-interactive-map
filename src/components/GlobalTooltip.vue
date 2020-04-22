<script>
import GlobalTooltipDefault from '@/components/GlobalTooltipDefault.vue';
import GlobalTooltipText from '@/components/GlobalTooltipText.vue';
import GlobalTooltipSettlementOwner from '@/components/GlobalTooltipSettlementOwner.vue';
import GlobalTooltipRegion from '@/components/GlobalTooltipRegion.vue';
import GlobalTooltipResource from '@/components/GlobalTooltipResource.vue';
import GlobalTooltipSettlement from '@/components/GlobalTooltipSettlement.vue';
import GlobalTooltipRegionOwner from '@/components/GlobalTooltipRegionOwner.vue';
import GlobalTooltipStartposFaction from '@/components/GlobalTooltipStartposFaction.vue';
import GlobalTooltipStartposLord from '@/components/GlobalTooltipStartposLord.vue';

const OFFSET = 20;

export default {
  props: {
    mouseEvent: MouseEvent,
    tooltip: Array
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
      } else {
        return { opacity: 0 };
      }
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

      const [type, data] = this.tooltip;

      switch (type) {
        case 'text':
          return <GlobalTooltipText data={data} />;
        case 'region':
          return <GlobalTooltipRegion data={data} />;
        case 'settlement':
          return <GlobalTooltipSettlement data={data} />;
        case 'settlement-owner':
          return <GlobalTooltipSettlementOwner data={data} />;
        case 'resource':
          return <GlobalTooltipResource data={data} />;
        case 'region-owner':
          return <GlobalTooltipRegionOwner data={data} />;
        case 'startpos-faction':
          return <GlobalTooltipStartposFaction data={data} />;
        case 'startpos-lord':
          return <GlobalTooltipStartposLord data={data} />;
        default:
          return <GlobalTooltipDefault data={data} />;
      }
    }
  },
  render() {
    return (
      <div id="tooltip" style={this.style}>
        {this.renderTooltip()}
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
#tooltip {
  position: fixed;
  pointer-events: none;
  max-width: 500px;
  z-index: 2000;
  color: white;
  transition: opacity 0.3s;
  filter: drop-shadow(0 0 15px #222222);
  $slice: 18;
  border-image-slice: $slice $slice $slice $slice fill;
  border-image-width: #{$slice}px #{$slice}px #{$slice}px #{$slice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/skins/default/tooltip_frame.png");
}
</style>
