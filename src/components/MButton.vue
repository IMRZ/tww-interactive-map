<template>
  <div class="m-button" v-on:mousemove="onMouseMove" v-on:mouseleave="onMouseLeave">
    <img class="icon" v-if="icon" :src="icon" />
  </div>
</template>

<script>
export default {
  name: 'm-button',
  props: ['icon', 'tooltip-text'],
  data() {
    return {
      showTooltip: false
    }
  },
  methods: {
    onMouseMove(e) {
      this.$store.commit('setTooltip', {
        top: e.y,
        left: e.x,
        visibility: 'visible',
        text: this.tooltipText
      });
    },
    onMouseLeave() {
      this.$store.commit('setTooltip', {
        visibility: 'hidden'
      });
    }
  }
}
</script>

<style lang="scss">
.m-button {
  width: 38px;
  height: 38px;
  background-image: url('/static/images//button_round_small_underlay.png');
  flex: 0 1 auto;
  position: relative;

  &:hover {
    background-image: url('/static/images//button_round_small_hover.png');
  }

  &:active {
    background-image: url('/static/images//button_round_small_pressed.png');
  }

  .icon {
    width: 38px;
    height: 38px;
  }

  &.small {
    width: 26px;
    height: 26px;
    background-size: cover;

    .icon {
      width: 26px;
      height: 26px;
    }
  }
}
</style>
