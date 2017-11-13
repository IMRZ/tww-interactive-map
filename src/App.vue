<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  height: 100%;
  font-family: Georgia, Times, 'Times New Roman', serif;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  height: 100%;
  background: url('/static/images/com.totalwar.warhammer.background.texture.jpg');

  #app {
    height: 100%;
  }
}
</style>

