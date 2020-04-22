<template>
  <div class="tooltip-settlement">
    <div class="tooltip-header">
      <span class="settlement-icon"></span>
      <span>{{data.name}}</span>
    </div>
    <div class="tooltip-body">
      <div v-if="data.isCapital">Province capital</div>
      <div v-else>Minor settlement</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>

<style lang="scss" scoped>
.tooltip-settlement {
  position: relative;
  min-width: calc(142px + 38px);
  font-size: 1.1em;
  color: #f3eccc;
}

.tooltip-header::before {
  content: "";
  position: absolute;
  left: 0; right: 0;

  $slice: 72;
  height: 39px;
  border-image-slice: 0 $slice 0 $slice fill;
  border-image-width: 0px #{$slice}px 0px #{$slice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/skins/default/tooltip_header.png");
  opacity: 0.6;
  z-index: -1;
}

.tooltip-header {
  display: flex;
  align-items: center;
}

.settlement-icon {
  width: 38px;
  height: 38px;
  display: inline-block;
  background-image: url("~@/assets/skins/warhammer2/icon_provinces.png");
}

.tooltip-body {
  padding: 0 12px 10px 12px;
}
</style>
