import { ref } from '@vue/composition-api';

const visible = ref(false);
const updateCallback = ref(null);

export function displayUpdateDialog(cb) {
  updateCallback.value = cb;
  visible.value = true;
}

export function useState() {
  return {
    visible,
    updateCallback
  };
}
