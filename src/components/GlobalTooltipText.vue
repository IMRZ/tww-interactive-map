<template>
  <div class="tooltip-text">
    <div>{{data}}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: String
  }
};
</script>

<style lang="scss" scoped>
.tooltip-text {
  padding: 10px 12px;
  font-size: 1.1em;
  color: #f3eccc;
}
</style>
