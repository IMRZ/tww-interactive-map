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
  background: url("./assets/ui/background.jpg");
}

#App {
  height: 100%;
}
</style>
