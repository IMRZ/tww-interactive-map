<template>
  <div class="TwPanelField">
    <div class="icon-wrapper">
      <img class="icon" :src="icon">
    </div>
    <label class="label">{{label}}</label>
    <div class="slot-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TwPanelField",
  props: {
    icon: String,
    label: String
  }
};
</script>

<style lang="scss" scoped>
.TwPanelField {
  display: flex;
  flex-direction: row;
  padding: 0 20px 0 0;
  font-size: 0.8em;
  height: 30px;

  .icon-wrapper {
    padding-left: 8px;
    background: url("./skins/default/spacebar_bookmark.png");
    width: 52px;
    height: 29px;

    .icon {
      margin-top: -2px;
      max-width: 30px;
      max-height: 30px;
    }
  }

  .label {
    padding-top: 6px;
    flex: 1;
  }

  .slot-wrapper {
    padding-top: 4px;
  }
}
</style>
