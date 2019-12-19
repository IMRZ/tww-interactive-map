<template>
  <span class="spinner"></span>
</template>

<style lang="scss" scoped>
.spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-size: contain;
  background-image: url("~@/assets/skins/default/spinner.png");
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
