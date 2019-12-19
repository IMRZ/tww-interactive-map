<template>
  <WhTooltip class="panel-planner">
    <div class="title">Painter</div>
    <div class="content">
      <div>
        <p>Select a faction and click on the regions to paint:</p>
        <VueSingleSelect
          @input="setPainterFaction"
          :value="selectedFaction"
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
          <TwSpinner />
          <span>Reading your save game, this might take a while!</span>
        </div>
      </div>
      <div>
        <p>Share or bookmark your progress:</p>
        <button @click="bookmark" v-tooltip="{ type: 'info', text: 'Copy shareable link to clipboard' }">Share link</button>
        <button @click="reset" style="margin-left: 10px;">Reset</button>
      </div>
    </div>
  </WhTooltip>
</template>

<script>
import VueSingleSelect from "vue-single-select";
import TwSpinner from "@/components/ui/TwSpinner";
import ReadSfForPainterWorker from "worker-loader!@/workers/read-sf-for-painter.worker.js";

import { ref } from '@vue/composition-api';
import { usePlanner } from "@/use/planner";

export default {
  components: {
    VueSingleSelect,
    TwSpinner
  },
  setup() {
    const {
      factions,
      selectedFaction,
      ownedRegions,

      createBookmark,
      reset
    } = usePlanner();

    const factionsList =  Object.values(factions).reduce((accumulator, faction) => {
      if (accumulator[faction.name] === undefined) {
        accumulator[faction.name] = faction;
      }

      return accumulator;
    }, {});

    const loading = ref(false);
    const parseResult = ref(null);

    return {
      selectedFaction,

      factionList: Object.values(factionsList)
        .filter(f => f.primaryColour !== '000000' && !f.name.startsWith("{{"))
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }),

      setPainterFaction: (faction) => selectedFaction.value = faction,
      getFactionIcon: (faction) => `small flag ${faction.flagKey}`,

      loading,
      parseResult,

      loadSaveGame: (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
          const buffer = event.target.result;

          const worker = new ReadSfForPainterWorker();

          worker.addEventListener("message", (event) => {
            if (event.data.success) {
              ownedRegions.value = event.data.result;
            }
            parseResult.value = event.data.success;
            loading.value = false;
          });

          worker.postMessage(buffer);
          loading.value = true;
        };

        reader.readAsArrayBuffer(file);
      },

      bookmark: () => createBookmark(ownedRegions.value, factions),
      reset
    };
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
}
</style>
