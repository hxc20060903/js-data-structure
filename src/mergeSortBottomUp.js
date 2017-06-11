const insertSort = require('./insertSort.js');
const THRESHOLD = 20;

function mergeSortBottomUp(compareFunc, data, left = 0, right = data.length - 1) {
  if (!data.length || typeof compareFunc !== 'function') {
    throw new Error('array expected: '
      + 'mergeSort(compareFunc, array, left = 0, right = data.length - 1)');
  }
  if (right <= left) {
    return data;
  }
  const size = right - left + 1;
  for (let i = left; i < right; i += THRESHOLD) {
    insertSort(compareFunc, data, i, Math.min(i + THRESHOLD - 1, right));
  }
  for (let partSize = THRESHOLD; partSize < size; partSize += partSize) {
    for (let leftFront = left; leftFront + partSize <= right; leftFront += partSize + partSize) {
      _merge(compareFunc, data,
        leftFront,
        leftFront + partSize - 1,
        Math.min(leftFront + partSize + partSize - 1, right));
    }
  }
  return data;
}

function _merge(compareFunc, data, left, mid, right) {
  if (compareFunc(data[mid], data[mid + 1]) < 0) {
    return;
  }
  if (right === left) return;
  if (right - left <= THRESHOLD) {
    insertSort(compareFunc, data, left, right);
    return;
  }
  const temp = [];
  const size = right - left + 1;
  for (let i = 0; i < size; i++) {
    temp[i] = data[i + left];
  }

  let tempLeft = 0, tempRight = mid + 1 - left;
  const tempMid = mid - left;
  const tempRightBoundary = right - left;
  for (let insert = left; insert <= right; insert++) {
    if (tempLeft > tempMid) {
      data[insert] = temp[tempRight];
      tempRight++;
      continue;
    }
    if (tempRight > tempRightBoundary) {
      data[insert] = temp[tempLeft];
      tempLeft++;
      continue;
    }
    if (compareFunc(temp[tempLeft], temp[tempRight]) <= 0) {
      data[insert] = temp[tempLeft];
      tempLeft++;
    } else {
      data[insert] = temp[tempRight];
      tempRight++;
    }
  }
}

module.exports = mergeSortBottomUp;
