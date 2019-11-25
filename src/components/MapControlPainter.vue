<template>
  <WhTooltip class="panel-planner">
    <div class="title">Painter</div>
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
            <WhIcon :icon="getFactionIcon(option)" />
            <span>{{option.name}}</span>
          </template>
        </VueSingleSelect>
      </div>
      <div>
        <p>Load your progress from a save file:</p>
        <div v-if="!loading">
          <input type="file" accept=".save" @change="loadSaveGame">
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
  </WhTooltip>
</template>

<script>
import VueSingleSelect from "vue-single-select";

import ReadSfForPainterWorker from "worker-loader!@/workers/read-sf-for-painter.worker.js";

export default {
  components: {
    VueSingleSelect
  },
  props: {
    factions: Object
  },
  data() {
    const factionsList =  Object.values(this.factions).reduce((accumulator, faction) => {
      if (accumulator[faction.flagKey] === undefined) {
        accumulator[faction.flagKey] = faction;
      }

      return accumulator;
    }, {});

    return {
      loading: false,
      parseResult: null,
      factionList: Object.values(factionsList)
        .filter(f => f.primaryColour !== '000000' && !f.name.startsWith("{{"))
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
    }
  },
  methods: {
    getFactionIcon(faction) {
      return `small flag ${faction.flagKey}`;
    },
    setPainterFaction(faction) {
      this.$store.commit("SET_PAINTER_FACTION", faction)
    },
    loadSaveGame(e) {
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
.panel-planner {
  padding: 15px 5px;
  z-index: 1000;

  .title {
    margin: 5px;
    text-align: center;
    font-size: 1.3em;
  }

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
