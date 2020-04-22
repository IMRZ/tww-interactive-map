<template>
  <svg class="leaflet-interactive" xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" version="1.1">
    <g :transform="scaleTransform">
      <path
        class="chokepoint"
        v-for="chokepoint in chokepoints"
        :key="chokepoint.key"
        :d="chokepoint.d"
      />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    viewBox: String,
    scaleTransform: String,
    chokepoints: Array
  }
};
</script>

<style lang="scss" scoped>
.chokepoint {
  fill: blue;
  fill-opacity: 0.5;
  stroke: blue;
  stroke-width: 1;
}
</style>
