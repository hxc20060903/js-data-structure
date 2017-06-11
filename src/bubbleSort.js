const util = require('./util.js');

function bubbleSort(compareFunc, data) {
  if (!data.length || typeof compareFunc !== 'function') {
    throw new Error('array expected: bubbleSort(compareFunc, array)');
  }
  if (data.length < 2) {
    return data;
  }
  for (let shift = 0; shift < data.length - 1; shift++) {
    for (let index = data.length - 1; index > shift; index--) {
      let smaller;
      let found = false;
      if (!found) {
        if (compareFunc(data[index - 1], data[index]) > 0) {
          smaller = data[index];
          found = true;
          data[index] = data[index - 1];
        }
      } else {
        if (compareFunc(data[index - 1], smaller) > 0) {
          data[index] = data[index - 1];
        } else {
          data[index] = smaller;
          found = false;
        }
      }
    }
  }
  return data;
}

module.exports = bubbleSort;
