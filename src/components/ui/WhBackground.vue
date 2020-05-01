<template>
  <div class="wh-background">
    <video id="bgvid" :class="{ canplay }" autoplay muted loop @canplay="oncanplay">
      <source src="~@/assets/backgrounds/main.webm" type="video/webm">
    </video>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';

export default {
  setup() {
    const canplay = ref(false);

    return {
      canplay,
      oncanplay: () => canplay.value = true
    }
  }
};
</script>

<style lang="scss" scoped>
.wh-background {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: black;
}

#bgvid {
  width: 100%;
  opacity: 0;
  transition: opacity 2s;

  &.canplay {
    opacity: 1;
  }
}

@media only screen and (max-width: 1080px) {
  #bgvid {
    display: none;
  }
}
</style>
