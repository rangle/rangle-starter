module.exports = function log() {
  /* eslint-disable no-console */
  console.log.apply(null, [].slice.call(arguments));
  /* eslint-enable no-console */
};
