<template>
  <div class="m-button">
    <img class="icon" v-if="icon" :src="icon" />
  </div>
</template>

<script>
export default {
  name: "m-button",
  props: ["icon", "tooltip-text"],
  data() {
    return {
      showTooltip: false
    };
  }
};
</script>

<style lang="scss">
.m-button {
  width: 38px;
  height: 38px;
  background-image: url("static/images/button_round_small_underlay.png");
  flex: 0 1 auto;
  position: relative;

  &:hover {
    background-image: url("static/images/button_round_small_hover.png");
  }

  &:active {
    background-image: url("static/images/button_round_small_pressed.png");
  }

  .icon {
    width: 38px;
    height: 38px;
  }

  &.small {
    width: 26px;
    height: 26px;
    background-size: cover;

    .icon {
      width: 26px;
      height: 26px;
    }
  }
}
</style>
