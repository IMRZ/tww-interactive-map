import { computed, ref } from "@vue/composition-api";
import router from "@/router";

const visible = ref(false);
const updateCallback = ref(null);

export function displayUpdateDialog(cb) {
  updateCallback.value = cb;
  visible.value = true;
}

const selectedMapId = computed(() => {
  const route = router.app._route;
  if (route.params && route.params.id) {
    return route.params.id;
  } else {
    return null;
  }
});

export function useState() {
  return {
    visible,
    updateCallback,
    selectedMapId
  };
}
