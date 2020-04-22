<template>
  <pre class="tooltip-default">{{data}}</pre>
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>

<style lang="scss" scoped>
.tooltip-default {
  margin: 10px;
}
</style>
