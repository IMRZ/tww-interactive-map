import { reactive, toRefs } from '@vue/composition-api';

export const ALERT_TYPE = {
  UPDATE: 'UPDATE',
  OLDER_VERSION: 'OLDER_VERSION',
  REDIRECT_OLDER_VERSION: 'REDIRECT_OLDER_VERSION',
};

const state = reactive({
  visible: false,
  type: null,
  data: null
});

const isProd = process.env.NODE_ENV === 'production';
const isBaseUrlLatestVersion = process.env.VUE_APP_BASE_URL !== '/tww-interactive-map/latest';

if (isProd && isBaseUrlLatestVersion) {
  showAlert(ALERT_TYPE.OLDER_VERSION);
}

function showAlert(type, data) {
  const alertType = ALERT_TYPE[type];

  if (alertType) {
    state.type = alertType;
    state.data = data;
    state.visible = true;
  } else {
    state.visible = false;
  }
}

export function useAlert() {
  return {
    ...toRefs(state),
    showAlert
  };
}
