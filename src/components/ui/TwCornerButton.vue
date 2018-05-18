<template>
  <div class="TwCornerButton">
    <div class="button" @click="onClick">
      <img class="icon" :src="icon">
    </div>
  </div>
</template>

<script>
export default {
  name: "TwCornerButton",
  props: {
    icon: String,
    onClick: Function
  }
};
</script>

<style lang="scss">
.TwCornerButton {
  pointer-events: auto;
  position: absolute;
  top: 0; right: 0;
  width: 57px;
  height: 53px;
  background: url("./skins/default/bar_top_right_corner_2.png");
  cursor: pointer;

  .button {
    position: absolute;
    top: 3px; right: 2px;
    width: 56px;
    height: 56px;
    background: url("./skins/default/button_round_medium_underlay.png");

    &:hover {
      background: url("./skins/default/button_round_medium_hover.png");
    }

    &:active {
      background: url("./skins/default/button_round_medium_pressed.png");
    }

    .icon {
      pointer-events: none;
      max-height: 56px;
      max-width: 56px;
      filter: brightness(90%);
    }

    &:hover .icon {
      filter: brightness(100%);
    }

    &:active .icon {
      filter: brightness(80%);
    }
  }
}

</style>
