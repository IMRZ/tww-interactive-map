<template>
  <div class="map-loader">
    <div class="loader">
      <progress max="100" :value="progress"></progress>
    </div>
  </div>
</template>

<script>
import { computed, watch } from '@vue/composition-api';

export function loadImage(path, onprogress) {
  return new Promise((resolve) => {
    const request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.responseType = 'blob';
    request.onprogress = onprogress;

    request.onload = function () {
      const blob = new Blob([this.response], { type: 'image/png; charset=UTF-8' });
      const objectUrl = window.URL.createObjectURL(blob);
      resolve(objectUrl);
    };

    request.send();
  });
}

export default {
  props: {
    map: Object
  },
  setup(props) {
    watch(() => props.map, (selectedMap) => {
      if (selectedMap.progress === null) {
        selectedMap.progress = {
          path: 0,
          textPath: 0
        };

        Promise.all([
          loadImage(
            selectedMap.path,
            (e) => selectedMap.progress.path = Math.round((e.loaded / e.total) * 100),
            (objectUrl) => selectedMap.src.img = objectUrl
          ),
          loadImage(
            selectedMap.textPath,
            (e) => selectedMap.progress.textPath = Math.round((e.loaded / e.total) * 100),
            (objectUrl) => selectedMap.src.imgText = objectUrl
          )
        ]).then(([img, imgText]) => {
          selectedMap.src = {
            img,
            imgText
          };
        })
      }
    });

    const progress = computed(() => {
      if (props.map && props.map.progress) {
        return (props.map.progress.path + props.map.progress.textPath) / 2;
      } else {
        return 100;
      }
    });

    return {
      progress
    };
  }
};
</script>

<style lang="scss" scoped>
.map-loader {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  width: 260px;
  height: 20px;
  margin: 20px 60px;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
