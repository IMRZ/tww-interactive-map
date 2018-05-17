<template>
  <div class="TwPanel">
    <div class="border" :class="type"></div>
    <div class="background" :class="type"></div>
    <div class="content" :class="type">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TwPanel",
  props: {
    type: String
  }
};
</script>

<style lang="scss">
/*
  Chrome:
  border-clip is bugged when used in combination with border-image.
  background-clip: border-box; The background stays within the padding-box.
*/
.TwPanel {
  pointer-events: auto;
  position: relative;
  padding: 7px;
  z-index: 0;

  .background {
    position: absolute;
    top: 0; right: 0; bottom: 7px; left: 0;
    background: url("./skins/default/panel_back_tile.png");
    background-size: cover;
    z-index: -2;
  }

  .background.info {
    display: none;
  }

  .border {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    border: solid 20px;
    border-width: 20px 20px 20px 20px;
    border-image: url("./skins/default/panel_back_border.png") 20 20 20 20 fill repeat;
    z-index: -1;
  }

  .border.info {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    border: solid 14px;
    border-width: 14px 14px 14px 14px;
    border-image: url("./skins/default/tooltip_frame.png") 14 14 14 14 fill repeat;
    z-index: -1;
  }

  .content {
    color: #fff8d7;
    padding: 7px 0;
  }

  .content.info {
    background-color: transparent;
    padding: 7px 0;
  }
}

</style>
