<template functional>
  <div class="wh-map-select" :class="[props.campaign]">
    <div class="button">{{props.title}}</div>
  </div>
</template>

<style lang="scss" scoped>
.wh-map-select {
  width: 300px;
  height: 225px;
  margin: 2em 3em;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  $slice: 48;
  border-image-slice: $slice $slice $slice $slice fill;
  border-image-width: #{$slice}px #{$slice}px #{$slice}px #{$slice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/skins/default/panel_back_inner_frame.png");

  cursor: pointer;
  filter: drop-shadow(0 0 15px black) brightness(80%);

  &:hover {
    filter: drop-shadow(0 0 15px #9fe0e9) brightness(100%);
  }

  .button {
    position: absolute;
    bottom: -55px;
    width: 386px;
    height: 122px;
    background-image: url("~@/assets/skins/default/challenge_campaign_header_frame.png");

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;

    color: white;
    text-shadow: 2px 2px black;
    font-size: 1.8em;
    padding: 24px 0;
  }

  &.mortal {
    background-image: url("~@/assets/skins/default/campaign_select_grand_campaign.png");
  }

  &.vortex {
    background-image: url("~@/assets/skins/default/campaign_select_great_vortex.png");
  }
}
</style>
