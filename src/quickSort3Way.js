const insertSort = require('./insertSort.js');
const util = require('./util.js');
const THRESHOLD = 31;

function quickSort3Way(compareFunc, data, left = 0, right = data.length - 1) {
  if (!data.length || typeof compareFunc !== 'function') {
    throw new Error('array expected: '
      + 'quickSort3Way(compareFunc, array, left = 0, right = data.length - 1)');
  }
  if (right <= left) {
    return data;
  }
  _quickSort3Way(compareFunc, data, left, right);
  return data;
}

function _quickSort3Way(compareFunc, data, left, right) {
  if (right - left <= THRESHOLD) {
    insertSort(compareFunc, data, left, right);
    return;
  }
  const p = _partition(compareFunc, data, left, right);
  _quickSort3Way(compareFunc, data, left, p.smallerMargin);
  _quickSort3Way(compareFunc, data, p.greaterMargin, right);
}

function _partition(compareFunc, data, left, right) {
  let smallerMargin = left - 1,
    greaterMargin = right + 1;
  const vi = util.getRandomValue(left, right);
  const value = data[vi];
  // [left, smallerMargin] [smallerMargin+1, i-1]...[greaterMargin, right]
  let comp;
  for (let i = left; i < greaterMargin; i++) {
    comp = compareFunc(data[i], value);
    if (comp > 0) {
      util.swap(i, --greaterMargin, data);
      i--;
    } else if (comp < 0) {
      util.swap(i, ++smallerMargin, data);
    }
  }
  return { smallerMargin, greaterMargin };
}

module.exports = quickSort3Way;
