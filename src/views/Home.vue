<template>
  <div id="home">
    <div class="header">
      <WhLogo />
    </div>
    <div class="maps">
      <router-link tag="div" to="/map/vortex/strategic?layer=None&overlays=Settlements,Map%20labels">
        <WhMapSelectButton
          campaign="vortex"
          title="The Eye of the Vortex"
        />
      </router-link>
      <router-link tag="div" to="/map/mortal/strategic?layer=None&overlays=Settlements,Map%20labels">
        <WhMapSelectButton
          campaign="mortal"
          title="Mortal Empires"
        />
      </router-link>
    </div>
    <div class="maps"></div>
    <div class="footer">
      <a href="https://github.com/IMRZ/tww-interactive-map" target="_blank" rel="noopener noreferrer">
        <img src="~@/assets/GitHub-Mark-Light-32px.png" width="32px">
      </a>
    </div>
  </div>
</template>

<script>
import WhLogo from '@/components/ui/WhLogo.vue';
import WhMapSelectButton from '@/components/ui/WhMapSelectButton.vue';

export default {
  components: {
    WhLogo,
    WhMapSelectButton
  }
};
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: inset 0 0 200px 100px black;
}

.header {
  height: calc(300px + 4em);
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.maps {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
}

.footer {
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
}
</style>
