import throttle from 'lodash/throttle';
import { mapMutations } from 'vuex';
import { SET_TOOLTIP } from '@/store/mutations';

export default {
  methods: {
    ...mapMutations({
      'setTooltip': SET_TOOLTIP
    }),
    showTooltip: throttle(function ({ x, y }, type, data) {
      this.setTooltip({ visibility: 'visible', x, y, type, data });
    }, 15),
    hideTooltip() {
      this.setTooltip({ visibility: 'hidden' });
    }
  }
};
