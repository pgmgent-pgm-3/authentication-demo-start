/**
 * A module with some custom block helpers
 */

export default {
  bold: function(text) {
    return `<strong>${text}</strong>`;
  },
  ifEquals: function(arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  }
}