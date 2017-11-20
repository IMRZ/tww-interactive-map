<template>
  <div id="MapOverlayPanel">
    <div class="maps">
      <div class="title">Maps</div>
      <div class="item" @click="setMap('vor')">The Eye of the Vortex</div>
      <div class="item" @click="setMap('mem')">Mortal Empires</div>
    </div>
    <div class="overlays">
      <div class="title">Overlays</div>
      <div class="item" v-for="overlay in overlays" :key="overlay.key" @click="setOverlay(overlay.key)">
        {{overlay.label}}
      </div>
    </div>
    <div class="regions">
      <div class="title">Regions &amp; Provinces</div>
      <div class="region-container">
        <div class="item"
          v-for="region in regions"
          :key="region.key"
          v-if="region.provinceKey"
          @mouseover="onMouseOver(region)"
          @mouseleave="onMouseLeave">
          {{region.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapGettersMixin from '@/mixins/MapGettersMixin';

export default {
  name: 'MapOverlayPanel',
  mixins: [MapGettersMixin],
  data() {
    return {
      overlays: [
        { label: 'None', key: '' },
        { label: 'Regions', key: 'regions' },
        { label: 'Provinces', key: 'provinces' },
        { label: 'Climates', key: 'climates' }
      ]
    };
  },
  computed: {
    regions() {
      return this.$store.getters.maps[this.mapId].regions;
    }
  },
  methods: {
    setMap(map) {
      this.$router.replace({ path: `/map/${map}`, query: this.$route.query });
    },
    setOverlay(overlay) {
      const query = overlay ? { overlay } : {};
      this.$router.replace({ query });
    },
    onMouseOver(region) {
      this.$store.commit('setHighlight', region.key);
    },
    onMouseLeave() {
      this.$store.commit('setHighlight', undefined);
    }
  }
};
</script>

<style lang="scss">
#MapOverlayPanel {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 20px;
  width: 300px;
  background-color: #232324;
  border: solid 1px #b29871;
  display: flex;
  flex-direction: column;

  .title {
    padding: 10px;
    text-align: center;
    border-bottom: solid 1px #b29871;
  }

  .maps {
    border-bottom: solid 1px #b29871;

    .item {
      padding: 5px 10px 5px 10px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .overlays {
    border-bottom: solid 1px #b29871;

    .item {
      display: flex;
      flex-direction: row;
      padding: 5px 10px 5px 10px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .regions {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;

    .region-container {
      flex: 1;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 0.6em;
      }
      &::-webkit-scrollbar-track {
        background-color: #19191b;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #b29871;
      }

      .item {
        padding: 5px 10px 5px 10px;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

}
</style>
