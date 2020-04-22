<template>
  <div class="map-view" :class="[mapId]">
    <div class="map" v-if="selectedMap.src">
      <router-view :key="mapId" />
    </div>
    <ImageLoader :map="selectedMap" v-else />

    <WhHomeButton />
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import { useState } from '@/use/state';

export default {
  components: {
    ImageLoader: require('@/components/ImageLoader.vue').default,
    WhHomeButton: require('@/components/ui/WhHomeButton.vue').default
  },
  props: {
    mapId: String
  },
  setup(props) {
    const { maps } = useState();

    const selectedMap = computed(() => maps.value[props.mapId]);

    return {
      selectedMap
    };
  }
};
</script>

<style lang="scss" scoped>
.map-view {
  width: 100%;
  height: 100%;
  overflow: hidden;

  &.vortex {
    background-image: url("~@/assets/backgrounds/vortex.png");
  }

  &.mortal {
    background-image: url("~@/assets/backgrounds/mortal.png");
  }

  background-size: cover;
  background-repeat: no-repeat;
}

.map {
  width: 100%;
  height: 100%;
}
</style>
