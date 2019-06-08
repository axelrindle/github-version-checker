// Require modules
const check = require('./check');

/**
 * The exported checking function.
 *
 * @param options {object} The options for the version check.
 * @param callback {function|undefined} An optional callback to pass the result to.
 *                                      Can be omitted to return a Promise.
 * @return null or a Promise.
 */
module.exports = (options, callback) => {
  if (callback) {
    check(options, callback);
    return null;
  } else {
    return new Promise((resolve, reject) => {
      check(options, (error, update) => {
        if      (error)   reject(error);
        else if (update)  resolve(update);
        else              resolve(null);
      });
    });
  }
};
