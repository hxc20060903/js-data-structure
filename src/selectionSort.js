const util = require('./util.js');

function selectionSort(compareFunc, data) {
  if (!data.length || typeof compareFunc !== 'function') {
    throw new Error('array expected: selectionSort(compareFunc, array)');
  }
  if (data.length < 2) {
    return data;
  }
  let largest;
  for (let shift = 0; shift < data.length - 1; shift++) {
    largest = 0;
    for (let i = 1; i < data.length - shift; i++) {
      if (compareFunc(data[i], data[largest]) > 0) {
        largest = i;
      }
    }
    util.swap(largest, data.length - 1 - shift, data);
  }
  return data;
}

module.exports = selectionSort;
