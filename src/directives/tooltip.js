
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
    el.$mouseenter = (event) => {
      event.preventDefault();
      showTooltip(binding.value);
    };

    el.$mouseleave = (event) => {
      event.preventDefault();
      clearTooltip();
    };

    el.addEventListener("mouseenter", el.$mouseenter);
    el.addEventListener("mouseleave", el.$mouseleave);
  },
  unbind(el) {
    el.removeEventListener("mouseenter", el.$mouseenter);
    el.removeEventListener("mouseleave", el.$mouseleave);
  }
};
