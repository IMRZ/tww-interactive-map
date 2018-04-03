
const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')

export default {
  methods: {
    createSVGTransform() {
      return svg.createSVGTransform();
    },
    createSVGMatrix() {
      return svg.createSVGMatrix();
    },
    createSVGPoint() {
      return svg.createSVGPoint();
    }
  }
}
