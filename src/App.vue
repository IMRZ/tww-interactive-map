<template>
  <div id="App">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=IM+Fell+Great+Primer');

html {
  box-sizing: border-box;
  height: 100%;
  font-family: 'IM Fell Great Primer', serif;
  background: url("./assets/background.jpg");
  background-size: cover;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
}

#App {
  height: 100%;
}
</style>
