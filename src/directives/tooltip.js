
import store from "@/store";

function setTooltip(data) {
  store.commit("SET_TOOLTIP", data);
}

function showTooltip(data) {
  setTooltip(data);
}

function clearTooltip() {
  setTooltip(null);
}

export default {
  bind(el, binding) {
    // tooltip value can be dynamic, see update hook
    el.$showTooltip = () => {
      showTooltip(binding.value);
    };

    el.$mouseenter = (event) => {
      event.preventDefault();
      el.$showTooltip();
    };

    el.$mouseleave = (event) => {
      event.preventDefault();
      clearTooltip();
    };

    el.addEventListener("mouseenter", el.$mouseenter);
    el.addEventListener("mouseleave", el.$mouseleave);
  },
  update(el, binding) {
    if (binding.oldValue !== binding.value) {
      // show new tooltip value if value is updated
      el.$showTooltip = () => {
        showTooltip(binding.value);
      };
    }
  },
  unbind(el) {
    el.removeEventListener("mouseenter", el.$mouseenter);
    el.removeEventListener("mouseleave", el.$mouseleave);
    setTooltip(null); // fix tooltip rendering after navigation.
  }
};
