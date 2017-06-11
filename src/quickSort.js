const insertSort = require('./insertSort.js');
const util = require('./util.js');
const THRESHOLD = 31;

function quickSort(compareFunc, data, left = 0, right = data.length - 1) {
  if (!data.length || typeof compareFunc !== 'function') {
    throw new Error('array expected: '
      + 'quickSort(compareFunc, array, left = 0, right = data.length - 1)');
  }
  if (right <= left) {
    return data;
  }

  _quickSort(compareFunc, data, left, right);
  return data;
}

function _quickSort(compareFunc, data, left, right) {
  if (left >= right) return;
  if (right - left <= THRESHOLD) {
    insertSort(compareFunc, data, left, right);
    return;
  }
  const i = _partition(compareFunc, data, left, right);
  _quickSort(compareFunc, data, left, i);
  _quickSort(compareFunc, data, i + 1, right);
}

function _partition(compareFunc, data, left, right) {
  const vi = util.getRandomValue(left, right);
  const value = data[vi];
  // [left....p]  [p+1.....i]
  let p = left - 1;
  for (let i = left; i <= right; i++) {
    if (compareFunc(data[i], value) <= 0) {
      util.swap(i, ++p, data);
    }
  }
  return p;
}

module.exports = quickSort;
