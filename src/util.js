const _ = require('../node_modules/lodash');

function* randomValueGenerator(min, max) {
  while (true) {
    yield Math.floor(Math.random() * (max - min + 1) + min);
  }
}

function* naturalNumberGenerator(min = 0) {
  let i = min;
  while (true) {
    yield i++;
  }
}

function getRandomValue(min, max) {
  return Math.floor(min + (max - min + 1) * Math.random());
}

function testSorted(smallToLarge, arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] === arr[i]) continue;
    if (arr[i - 1] > arr[i] === smallToLarge) {
      return false;
    }
  }
  return true;
}

function swap(pos1, pos2, arr) {
  if (pos1 === pos2) return;
  const tmp = arr[pos1];
  arr[pos1] = arr[pos2];
  arr[pos2] = tmp;
}

function generateNearlyOrderedArr(length, swapNUm, min = 0) {
  const generator = naturalNumberGenerator(min);
  const arr = Array.apply(null, Array(length))
    .map(() => generator.next().value);
  for (let i = swapNUm; i > 0; i--) {
    swap(Math.floor(Math.random() * length),
         Math.floor(Math.random() * length),
         arr
    );
  }
  return arr;
}

function generateRandomArr(length, max, min = 0){
  const generator = randomValueGenerator(min, max);
  return Array.apply(null, Array(length))
    .map(() => generator.next().value);
}

exports.swap = swap;
exports.testSorted = testSorted;
exports.randomValueGenerator = randomValueGenerator;
exports.generateRandomArr = generateRandomArr;
exports.generateNearlyOrderedArr = generateNearlyOrderedArr;
exports.naturalNumberGenerator = naturalNumberGenerator;
exports.getRandomValue = getRandomValue;
