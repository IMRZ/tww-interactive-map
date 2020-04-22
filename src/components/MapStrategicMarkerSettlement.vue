<template>
  <div class="marker leaflet-zoom-animated leaflet-interactive">
    <img
      class="settlement interactive"
      :src="icons.wh_settlement_schematic"
      v-on="createTooltip('settlement', region)"
    />
    <div class="resources">
      <img
        v-if="strategicLocation"
        class="icon interactive"
        :src="resources[strategicLocation.icon]"
        v-on="createTooltip('resource', strategicLocation)"
      />
      <img
        v-if="port"
        class="port interactive"
        :src="icons.icon_port"
        v-on="createTooltip('text', 'Port')"
      />
      <img
        v-if="strategicResource"
        class="icon interactive"
        :src="resources[strategicResource.icon]"
        v-on="createTooltip('resource', strategicResource)"
      />
      <img
        v-if="fortress"
        class="icon interactive"
        :src="resources.siege_defence"
        v-on="createTooltip('resource', fortress)"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import { useTooltip } from '@/use/tooltip';

import assets from '@/assets';
import { data } from '@/data';

export default {
  props: {
    region: Object,
    zoomLevel: String
  },
  setup(props) {
    const { createTooltip } = useTooltip();

    const fortress = ref(data.common.resources[props.region.settlement.fortress]);
    const strategicLocation = ref(data.common.resources[props.region.settlement.strategicLocations[0]]);
    const strategicResource = ref(data.common.resources[props.region.settlement.strategicResources[0]]);

    return {
      createTooltip,

      port: props.region.settlement.port,
      fortress,
      strategicLocation,
      strategicResource,

      icons: assets.skins.default,
      resources: assets.campaign_ui.effect_bundles
    };
  }
};
</script>

<style lang="scss" scoped>
.marker {
  position: fixed;
  height: 24px;
  margin-top: -12px;
  margin-left: -12px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.interactive {
  filter: brightness(90%);

  &:hover {
    filter: brightness(100%);
  }
}

.settlement {
  height: 24px;
  width: 24px;
}

.resources {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    height: 24px;
    width: 24px;
  }

  .port {
    flex-shrink: 0;
    height: 30px;
    width: 30px;
  }
}
</style>
