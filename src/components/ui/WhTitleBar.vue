<template functional>
  <div class="wh-title-bar">{{props.title}}</div>
</template>

<style lang="scss">
.wh-title-bar {
  width: 769px;
  height: 69px;

  color: white;
  text-shadow: 2px 2px black;
  font-size: 1.6em;
  text-align: center;
  padding: 15px;

  $slice: 150;
  border-image-slice: 0 $slice 0 $slice fill;
  border-image-width: 0 #{$slice}px 0 #{$slice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/skins/default/panel_title_large.png");
}
</style>
