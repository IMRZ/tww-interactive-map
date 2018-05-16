<template>
  <div class="TwPanelTitle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TwPanelTitle"
};
</script>

<style lang="scss">
.TwPanelTitle {
  padding: 5px;
  text-align: center;
  font-size: 1.1em;
}
</style>
