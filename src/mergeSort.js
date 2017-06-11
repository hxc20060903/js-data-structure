const insertSort = require('./insertSort.js');
const THRESHOLD = 20;

function mergeSort(compareFunc, data, left = 0, right = data.length - 1) {
  if (!data.length || typeof compareFunc !== 'function') {
    throw new Error('array expected: '
      + 'mergeSort(compareFunc, array, left = 0, right = data.length - 1)');
  }
  if (right <= left) {
    return data;
  }
  const mid = Math.floor(left + (right - left) / 2);
  _mergeSort(compareFunc, data, left, mid);
  _mergeSort(compareFunc, data, mid + 1, right);
  _merge(compareFunc, data, left, mid, right);
  return data;
}

function _mergeSort(compareFunc, data, left, right) {
  if (right - left < THRESHOLD) {
    insertSort(compareFunc, data, left, right);
    return;
  }
  const mid = Math.floor(left + (right - left) / 2);
  _mergeSort(compareFunc, data, left, mid);
  _mergeSort(compareFunc, data, mid + 1, right);
  _merge(compareFunc, data, left, mid, right);
}

function _merge(compareFunc, data, left, mid, right) {
  if (compareFunc(data[mid], data[mid + 1]) <= 0) {
    return;
  }
  if (right === left) {
    return;
  }
  const tempRightBoundary = right - left,
    tempMid = mid - left;
  let tempLeft = 0, tempRight = mid + 1 - left;
  const temp = [];
  for (let i = left; i <= right; i++) {
    temp[i - left] = data[i];
  }
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

module.exports = mergeSort;
