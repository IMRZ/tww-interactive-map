<template>
  <div class="wh-home-button">
    <router-link class="button" tag="div" to="home">
      <div class="home-icon"></div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.wh-home-button {
  position: absolute;
  top: 0;
  right: 0;
  width: 67px;
  height: 60px;
  background-image: url("~@/assets/skins/default/bar_top_right_corner.png");
  z-index: 2000;

  // TODO: create sprite of different states
  .button {
    width: 56px;
    height: 56px;
    margin: 4px 8px;
    background-image: url("~@/assets/skins/default/button_round_medium_underlay.png");

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    filter: brightness(90%);

    &:hover {
      filter: brightness(100%);
    }
  }

  .home-icon {
    width: 56px;
    height: 56px;
    background-image: url("~@/assets/skins/default/icon_home.png");
    background-size: cover;
  }
}
</style>
