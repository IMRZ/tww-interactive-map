<template>
  <div id="global-alert" v-if="visible">
    <div class="message">
      <template v-if="type === 'UPDATE'">
        The app has been updated, please refresh!
      </template>
      <template v-if="type === 'OLDER_VERSION'">
        <span>This is an older version of the map, click <a href="https://imrz.github.io/tww-interactive-map/latest" target="_blank" rel="noopener noreferrer">here</a> to view the latest version.</span>
      </template>
      <template v-if="type === 'REDIRECT_OLDER_VERSION'">
        <span>This link might not be compatible with the current version of the map, click <a :href="data.href" target="_blank" rel="noopener noreferrer">here</a> view the requested version.</span>
      </template>
    </div>
    <div class="dismiss" @click="dismiss">&#128473;</div>
  </div>
</template>

<script>
import { useAlert } from '@/use/alert';

export default {
  setup() {
    const { visible, type, data } = useAlert();
    const dismiss = () => {
      visible.value = false;
      data?.value?.onDismiss?.();
    };

    return {
      visible,
      type,
      data,
      dismiss
    };
  }
};
</script>

<style lang="scss" scoped>
#global-alert {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  height: 4em;
  background-color: rgba(240, 255, 0, 0.9);
  display: flex;
  animation: 1s fadein;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}

.message {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-weight: bold;
}

.dismiss {
  width: 2em;
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    color: rgba(0, 0, 0, 1);
  }
}
</style>>
