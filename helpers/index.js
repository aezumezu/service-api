/**
 *
 * @param {Array} values
 * @returns {Number} result
 */
function mean(values) {
  const sum = values.reduce((a, b) => {
    return a + b;
  }, 0);
  return sum / values.length;
}

module.exports = {
  mean
};
