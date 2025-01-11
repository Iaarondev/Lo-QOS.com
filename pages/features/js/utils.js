// utils.js
const utils = {
  requestAnimationFrame: (() => {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      ((callback) => window.setTimeout(callback, 1000 / 60))
    );
  })(),

  cancelAnimationFrame: (() => {
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.clearTimeout
    );
  })(),
};
