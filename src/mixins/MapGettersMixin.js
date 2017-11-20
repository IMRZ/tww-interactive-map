import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'route',
      'maps',
      'climates'
    ]),
    mapId() {
      return this.route.params.id;
    },
    overlay() {
      return this.route.query.overlay;
    },
    map() {
      return this.maps[this.mapId];
    }
  }
};
