<template>
  <div class="TwRadio">
    <input type="radio" :value="value" :checked="modelValue === value">
    <span @click="$emit('change', value)"></span>
  </div>
</template>

<script>
export default {
  name: "TwRadio",
  model: {
    prop: "modelValue",
    event: "change"
  },
  props: {
    modelValue: String,
    value: String
  }
};
</script>

<style lang="scss">
.TwRadio > input {
  display: none;
}

.TwRadio {
  input[type="radio"] + span {
    display: inline-block;
    width: 26px;
    height: 27px;
    background: url("./skins/default/checkbox_round_active.png") left top no-repeat;
    cursor: pointer;

    &:hover {
      background: url("./skins/default/checkbox_round_hover.png") left top no-repeat;
    }
  }

  input[type="radio"]:checked + span {
    background: url("./skins/default/checkbox_round_selected.png") left top no-repeat;

    &:hover {
      background: url("./skins/default/checkbox_round_selected_hover.png") left top no-repeat;
    }
  }
}
</style>
