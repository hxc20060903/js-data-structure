const util = require('./util.js');

function insertSort(compareFunc, data, left = 0, right = data.length - 1) {
  if (!data.length || typeof compareFunc !== 'function') {
    throw new Error('array expected: '
      + 'insertSort(compareFunc, array, left = 0, right = data.length - 1)');
  }
  if (right <= left) {
    return data;
  }
  for (let shift = left + 1; shift <= right; shift++) {
    const shiftValue = data[shift];
    let compare;
    for (compare = shift - 1;
         compare >= left && compareFunc(shiftValue, data[compare]) < 0;
         compare--) {
      data[compare + 1] = data[compare];
    }
    data[compare + 1] = shiftValue;
  }
  return data;
}

module.exports = insertSort;
