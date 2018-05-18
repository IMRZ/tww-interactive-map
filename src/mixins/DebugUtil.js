
export default {
  methods: {
    debug_onCLickCopyMapCoords(event, matrix) {
      const { x, y } = event;
      const { e, f } = matrix;
      const a = matrix.inverse().a;
      const coords = {
        x: (x * a) - (e * a) | 0,
        y: (y * a) - (f * a) | 0
      };
      this.debug_copyToClipboard(`"x": ${coords.x}, "y": ${coords.y}`);
    },
    debug_copyToClipboard(text) {
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  }
};
