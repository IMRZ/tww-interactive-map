<template>
  <div id="LandingPage">
    <router-link class="map-select" tag="div" to="/map/vor">
      <div class="image-container">
        <img src="static/images/campaign_select_great_vortex.png" />
      </div>
      <span>The Eye of the Vortex</span>
    </router-link>
    <router-link class="map-select" tag="div" to="/map/mem">
      <div class="image-container">
        <img src="static/images/campaign_select_grand_campaign.png" />
      </div>
      <span>Mortal Empires</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
};
</script>

<style lang="scss">
#LandingPage {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  .map-select {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #232324;
    border: solid 1px #b29871;
    margin: 10px;
    cursor: pointer;

    &:hover {
      @keyframes pulse {
        from { box-shadow: inset 0 0 5px rgba(0,0,0,.075), 0 0 30px 5px rgba(102, 175, 233, 0.8); }
        50% { box-shadow: inset 0 0 5px rgba(0,0,0,.075), 0 0 60px 5px rgba(102, 175, 233, 0.8); }
        to { box-shadow: inset 0 0 5px rgba(0,0,0,.075), 0 0 30px 5px rgba(102, 175, 233, 0.8); }
      }

      animation-name: pulse;
      animation-duration: 3s;
      animation-iteration-count: infinite;
    }

    .image-container {
      height: 185px;
      overflow: hidden;
      border-bottom: solid 1px #b29871;

      img {
        margin: -10px;
      }
    }

    span {
      padding: 5px;
    }
  }
}
</style>
