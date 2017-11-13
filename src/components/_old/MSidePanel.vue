<template>
  <div id="m-side-panel">
  </div>
</template>

<script>
export default {
  name: "m-side-panel"
};
</script>

<style lang="scss">
#m-side-panel {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 200px;
  height: 400px;
  color: #fff8d7;
  border: solid;
  border-width: 14px 14px 14px 14px;
  border-image: url("/static/images/tooltip_frame.png") 14 14 14 14 fill repeat;
}
</style>
