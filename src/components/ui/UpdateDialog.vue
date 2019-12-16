<template>
  <div id="dialog" v-if="visible">
    <div class="panel">
      <div class="parchment">
        <span>Update</span>
        <p>A new version is available, update now?</p>
        <p>Click <a href="https://github.com/IMRZ/tww-interactive-map/blob/master/CHANGELOG.md" target="_blank" rel="noopener noreferrer">here</a> to view the changelog.</p>
      </div>
      <div class="bottom">
        <div class="button" @click="confirm">
          <div class="icon-check" v-tooltip="{ type: 'info', text: 'Accept' }"></div>
        </div>
        <div class="button" @click="dismiss">
          <div class="icon-cross" v-tooltip="{ type: 'info', text: 'Cancel' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useState } from "@/use/state";

export default {
  setup() {
    const { visible, updateCallback } = useState();

    return {
      visible,
      confirm: () => updateCallback.value && updateCallback.value(),
      dismiss: () => visible.value = false
    };
  }
}
</script>

<style lang="scss" scoped>
#dialog {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1500;
  display: flex;
  justify-content: center;
  align-items: center;
}

.panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 30em;
  max-width: 30em;
  height: 18em;
  min-height: 18em;

  padding: 8px 8px;

  $slice: 60;
  border-image-slice: $slice $slice $slice $slice fill;
  border-image-width: #{$slice}px #{$slice}px #{$slice}px #{$slice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/skins/default/panel_back_border.png");

  background-image: url("~@/assets/skins/default/panel_back_tile.png");
  background-clip: content-box;
}

.parchment {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  $slice: 60;
  border-image-slice: $slice $slice $slice $slice fill;
  border-image-width: #{$slice}px #{$slice}px #{$slice}px #{$slice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/skins/default/parchment_texture.png");
}

.bottom {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: -7px -7px;
  max-height: 74px;
  $vslice: 40;
  $hslice: 60;
  border-image-slice: $vslice $hslice $vslice $hslice fill;
  border-image-width: #{$vslice}px #{$hslice}px #{$vslice}px #{$hslice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/skins/default/panel_back_bottom.png");
}

.button {
  $button-underlay: url("~@/assets/sprites/button_round.png") (-56px * 0);
  $button-hover: url("~@/assets/sprites/button_round.png") (-56px * 1);
  $button-pressed: url("~@/assets/sprites/button_round.png") (-56px * 2);

  cursor: pointer;
  width: 56px;
  height: 56px;
  background: $button-underlay;
  filter: brightness(90%);

  &:hover {
    background: $button-hover;
  }

  &:active {
    background: $button-pressed;
  }
}

.icon-check {
  background-size: contain;
  background-image: url("~@/assets/skins/default/icon_check.png");
  width: 56px;
  height: 56px;
  filter: brightness(90%);

  &:hover {
    filter: brightness(100%);
  }

  &:active {
    filter: brightness(70%);
    transform: translateY(3px);
  }
}

.icon-cross {
  background-size: contain;
  background-image: url("~@/assets/skins/default/icon_cross.png");
  width: 56px;
  height: 56px;
  filter: brightness(90%);

  &:hover {
    filter: brightness(100%);
  }

  &:active {
    filter: brightness(70%);
    transform: translateY(3px);
  }
}
</style>
