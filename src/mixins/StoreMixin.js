import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'maps',
      'climates'
    ])
  }
};
