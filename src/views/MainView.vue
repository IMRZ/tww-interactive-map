<template>
  <div id="MainView">
    <div class="header">
      <h1 class="title">Total War: Warhammer - Interactive Map</h1>
    </div>
    <div class="container">
      <router-link class="map-select" tag="div" to="/map/vortex">
        <div class="image vortex">
          <h2>The Great Vortex</h2>
        </div>
      </router-link>
      <router-link class="map-select" tag="div" to="/map/mortal_empires">
        <div class="image mortal">
          <h2>Mortal Empires</h2>
        </div>
      </router-link>
    </div>
    <div class="footer">
      <div class="version">Version: 0.1.0</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainView"
};
</script>

<style lang="scss">
#MainView {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;

  .header {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .title {
      text-align: center;
      font-size: 3em;
    }
  }

  .footer {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .version {
      text-align: center;
      padding: 10px;
    }
  }

  .container {
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background-color: rgba(255, 255, 255, 0.05);
    border-top: solid 2px rgba(255, 255, 255, 0.2);
    border-bottom: solid 2px rgba(255, 255, 255, 0.2);
  }

  .map-select {
    width: 315px;
    height: 195px;
    overflow: hidden;
    cursor: pointer;
    margin: 10px;
    filter: drop-shadow(0 0 15px black);

    h2 {
      text-shadow: 2px 2px black;
      font-size: 2em;
    }
  }

  .image {
    margin: -5px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: flex-end;
    text-align: center;
  }

  .mortal {
    background: url("../assets/ui/campaign_select_grand_campaign.png");
    background-size: cover;
    box-shadow: inset 0 -150px 150px -150px red;

    &:hover {
      box-shadow: inset 0 -250px 250px -250px red;
    }
  }

  .vortex {
    background: url("../assets/ui/campaign_select_great_vortex.png");
    background-size: cover;
    box-shadow: inset 0 -150px 150px -150px skyblue;

    &:hover {
      box-shadow: inset 0 -250px 250px -250px skyblue;
    }
  }
}
</style>
