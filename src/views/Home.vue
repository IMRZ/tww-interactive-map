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
    <div class="footer">
      <a class="github" href="https://github.com/IMRZ/tww-interactive-map" target="_blank" rel="noopener noreferrer"></a>
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
  background: #004890 url('data:image/svg+xml;,<svg xmlns="http://www.w3.org/2000/svg" fill="%23fff"><pattern id="a" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(0)"><path d="M10 0v9h9v1h-9v9h-1v-9h-9v-1h9v-9" opacity=".08"/><path d="M0 19h19v-19h1v20h-20" opacity=".15"/></pattern><rect width="100%" height="100%" fill="%23004890"/><rect width="100%" height="100%" fill="url(%23a)"/></svg>');
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
  height: 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .github {
    background-image: url('~@/assets/GitHub-Mark-Light-32px.png');
    width: 32px;
    height: 32px;
  }
}
</style>
