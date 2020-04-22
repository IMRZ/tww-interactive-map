<template functional>
  <div class="title">
    <div class="wh-logo">
      <div class="mask">
        <div class="wipe"></div>
      </div>
    </div>
    <h2 class="sub-title">Interactive Map</h2>
  </div>
</template>

<style lang="scss" scoped>
.title {
  width: 512px;
  height: 150px;
  background-position: bottom;
  background-image: url("~@/assets/skins/default/fe_plaque.png");
  margin-top: 150px;
  bottom: -80px;
  z-index: -1;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5));
}

.sub-title {
  color: white;
  text-align: center;
  text-shadow: 2px 2px black;
  font-weight: bold;
  font-size: 2.5em;
  margin-top: 0px;
}

.wh-logo {
  width: 512px;
  height: 212px;
  background-image: url("~@/assets/skins/default/fe_logo.png");
  filter: drop-shadow(0 10px 15px black);
  margin-top: -150px;

  .mask {
    position: relative;
    width: 512px;
    height: 212px;
    mask-image: url("~@/assets/skins/default/fe_logo_mask3.png");
  }

  .wipe {
    position: absolute;
    width: 146px;
    height: 62px;
    margin-top: 75px;
    opacity: 0.4;
    background-image: url("~@/assets/skins/default/fe_logo_wipe.png");
    background-repeat: no-repeat;
    animation: wipe-animation 5s infinite;
  }

  @keyframes wipe-animation {
    0% {
      left: -62px;
    }
    20% {
      left: 500px;
    }
    100% {
      left: 500px;
      opacity: 0;
    }
  }
}
</style>
