<template>
  <div id="painter-panel">
    <TwPanel type="info">
      <TwPanelTitle>Painter</TwPanelTitle>
      <div class="content">
        <div>
          <p>Select a faction and click on the regions to paint:</p>
          <VueSingleSelect
            @input="setPainterFaction"
            :value="$store.state.painter.faction"
            option-label="name"
            :options="factionList"
            placeholder="Select a faction"
            :max-results="999"
          >
            <template slot="option" slot-scope="{option}">
              <img :src="getFlagPath(option)">
              <span>{{option.name}}</span>
            </template>
          </VueSingleSelect>
        </div>
        <div>
          <p>Load your progress from a save file:</p>
          <div v-if="!loading">
            <input type="file" accept=".save" @change="onDrop">
            <div v-if="parseResult !== null">
              <div v-if="parseResult">Reading save file success!</div>
              <div v-if="!parseResult">Reading save file failed!</div>
            </div>
          </div>
          <div v-if="loading">
            <span id="loading"></span>
            <span>Reading your save game, this might take a while!</span>
          </div>
        </div>
      </div>
    </TwPanel>
  </div>
</template>

<script>
import TwPanel from "@/components/ui/TwPanel";
import TwPanelTitle from "@/components/ui/TwPanelTitle";
import VueSingleSelect from "vue-single-select";

import ReadSfForPainterWorker from "worker-loader!@/workers/read-sf-for-painter.worker.js";

export default {
  components: {
    TwPanel,
    TwPanelTitle,
    VueSingleSelect
  },
  props: {
    factions: Object
  },
  data() {
    return {
      loading: false,
      parseResult: null,
      baseUrl: process.env.BASE_URL,
      factionList: Object.values(this.factions)
        .filter(f => f.primaryColour !== '000000' && !f.name.startsWith("{{"))
    }
  },
  methods: {
    getFlagPath(faction) {
      return `${this.baseUrl}${faction.flagsPath}/mon_24.png`;
    },
    setPainterFaction(faction) {
      this.$store.commit("SET_PAINTER_FACTION", faction)
    },
    onDrop(e) {
      e.preventDefault();
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const buffer = event.target.result;

        const worker = new ReadSfForPainterWorker();

        worker.addEventListener("message", (event) => {
          if (event.data.success) {
            this.$store.commit("SET_PAINTER_FACTIONS", event.data.result);
          }
          this.parseResult = event.data.success;
          this.loading = false;
        });

        worker.postMessage(buffer);
        this.loading = true;
      };

      reader.readAsArrayBuffer(file);
    }
  }
};
</script>

<style lang="scss" scoped>
#painter-panel {
  z-index: 1000;

  .v-select {
    background-color: white;
  }

  .content {
    padding: 0 16px;
  }

  // https://codepen.io/mandelid/pen/vwKoe
  #loading {
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 3px solid rgba(255,255,255,.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
}
</style>
