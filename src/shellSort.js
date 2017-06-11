const util = require('./util.js');

function shellSort(compareFunc, data, left = 0, right = data.length - 1) {
  if (!data.length || typeof compareFunc !== 'function') {
    throw new Error('array expected: '
      + 'shellSort(compareFunc, array, left = 0, right = data.length - 1)');
  }
  if (right <= left) {
    return data;
  }
  let gap = right - left + 1,
    end, compare, tmp;
  for (gap >>= 1; gap > 0; gap >>= 1) {
    for (end = gap; end <= right; end++) {
      tmp = data[end];
      for (compare = end - gap;
          compare >= left && compareFunc(data[compare], tmp) > 0;
          compare -= gap) {
        data[compare + gap] = data[compare];
      }
      data[compare + gap] = tmp;
    }
  }
  return data;
}

module.exports = shellSort;
