<template>
  <div class="TwCheckbox">
    <input type="checkbox" :checked="value">
    <span @click="toggle"></span>
  </div>
</template>

<script>
export default {
  name: "TwCheckbox",
  props: {
    value: Boolean
  },
  methods: {
    toggle() {
      this.$emit("input", !this.value);
    }
  }
};
</script>

<style lang="scss">
.TwCheckbox > input {
  display: none;
}

.TwCheckbox {
  input[type="checkbox"] + span {
    display: inline-block;
    width: 34px;
    height: 32px;
    cursor: pointer;
    background: url("./skins/default/checkbox_active.png") left top no-repeat;

    &:hover {
      background: url("./skins/default/checkbox_hover.png") left top no-repeat;
    }
  }

  input[type="checkbox"]:checked + span {
    background: url("./skins/default/checkbox_selected.png") left top no-repeat;

    &:hover {
      background: url("./skins/default/checkbox_selected_hover.png") left top no-repeat;
    }
  }
}
</style>
