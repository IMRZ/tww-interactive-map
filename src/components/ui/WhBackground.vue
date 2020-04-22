<template>
  <div class="wh-background">
    <!-- preload, prevent flicker -->
    <img class="preload" src="@/assets/backgrounds/vortex.jpg" />
    <img class="preload" src="@/assets/backgrounds/mortal.jpg" />
  </div>
</template>

<style lang="scss" scoped>
.wh-background {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-repeat: no-repeat;
  background-color: transparent;
  background-size: cover;
  animation: bg 20s infinite;
  background-position: center;
}

.preload {
  display: none;
}

@keyframes bg {
  0% {
    background-image: url("~@/assets/backgrounds/vortex.jpg");
  }
  25% {
    background-image: url("~@/assets/backgrounds/vortex.jpg");
  }
  50% {
    background-image: url("~@/assets/backgrounds/mortal.jpg");
  }
  75% {
    background-image: url("~@/assets/backgrounds/mortal.jpg");
  }
  100% {
    background-image: url("~@/assets/backgrounds/vortex.jpg");
  }
}
</style>
