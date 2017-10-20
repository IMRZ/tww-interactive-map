<template>
  <div id="m-info-panel">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "m-info-panel",
  mounted() {
    this.setText(this.$route.path);
  },
  watch: {
    $route(to, from) {
      this.setText(to.path);
    }
  },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    setText(overlay) {
      switch (overlay) {
        case "/regions":
          this.text = "Regions";
          break;
        case "/provinces":
          this.text = "Provinces";
          break;
        case "/climates":
          this.text = "Climates";
          break;
        default:
          this.text = "None";
          break;
      }
    }
  }
};
</script>

<style lang="scss">
#m-info-panel {
  position: relative;
  margin-top: 5px;
  width: 256px;
  height: 150px;
  color: #fff8d7;
  border: solid;
  border-width: 14px 14px 14px 14px;
  border-image: url("/static/images/tooltip_frame.png") 14 14 14 14 fill repeat;
}
</style>
