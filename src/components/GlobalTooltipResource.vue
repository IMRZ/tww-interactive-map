<template>
  <div class="tooltip-resource">
    <div>{{data.name}}</div>
    <p>{{data.description}}</p>
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
.tooltip-resource {
  max-width: 380px;
  padding: 10px 12px;
  font-size: 1.1em;
  color: #f3eccc;

  p {
    margin: 5px 0 0 0;
  }
}
</style>
