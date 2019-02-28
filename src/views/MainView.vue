<template>
  <div class="container">
    <div class="wrapper">
      <div class="map"></div>
    </div>
    <div class="shadow"></div>
    <div class="main">
      <div class="header">
        <img src="../assets/wh.png" width="400px">
        <h2 class="sub-title">Unofficial Interactive Map</h2>
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
        <a href="https://github.com/IMRZ/tww-interactive-map">
          <img src="../assets/GitHub-Mark-Light-32px.png" width="32px">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainView"
};
</script>

<style lang="scss" scoped>
@keyframes pan {
  from {
    transform: perspective(600px) rotateX(10deg) translate(-1100px, -2300px);
  }
  50% {
    transform: perspective(300px) rotateX(1deg) translate(-800px, -100px);
  }
  to {
    transform: perspective(600px) rotateX(10deg) translate(-1100px, -2300px);
  }
}

.container {
  height: 100%;
  overflow: hidden;
}

.shadow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-image:
    linear-gradient(to bottom right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)),
    linear-gradient(to bottom left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.wrapper {
  height: 100%;
  position: relative;
  background-color: #a98962;
  filter: contrast(200%);
}

.map {
  background-image: url("../assets/maps/wh_main_map.png");
  box-shadow: inset 0px 0px 100px 60px #a98962;
  transform-origin: 40% 40%;
  width: 4096px;
  height: 3352px;
  animation-name: pan;
  animation-duration: 150s;
  animation-iteration-count: infinite;
}

.main {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;

  .header {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2em;

    img {
      margin: 0 auto;
    }

    .sub-title {
      text-align: center;
      text-shadow: 2px 2px black;
      font-size: 2em;
      margin-top: 0;
    }
  }

  .footer {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
  }

  .container {
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
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

    border: solid 1px #b29871;

    &:hover {
      filter: drop-shadow(0 0 15px #b29871);
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
  }

  .vortex {
    background: url("../assets/ui/campaign_select_great_vortex.png");
    background-size: cover;
  }
}
</style>
