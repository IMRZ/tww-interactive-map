<template>
  <div class="m-cursor-tooltip" :style="{ top, left, visibility }">
    <pre>{{ text }}</pre>
  </div>
</template>

<script>
export default {
  name: 'm-cursor-tooltip',
  computed: {
    left() {
      return `${this.$store.getters.tooltip.left + 40}px`;
    },
    top() {
      return `${this.$store.getters.tooltip.top + 40}px`;
    },
    visibility() {
      return this.$store.getters.tooltip.visibility;
    },
    text() {
      return this.$store.getters.tooltip.text;
    }
  }
}
</script>

<style lang="scss">
.m-cursor-tooltip {
  position: fixed;
  color: white;
  border: solid transparent;
  border-width: 14px 14px 14px 14px;
  border-image: url('/static/images//tooltip_frame.png') 14 14 14 14 fill repeat;

  pre {
    margin: 0;
    padding: 0;
  }
}
</style>


