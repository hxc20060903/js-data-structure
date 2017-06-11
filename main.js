const debug = require('../node_modules/debug')('debug');
const _ = require('./node_modules/lodash');

const sort = require('./src/quickSort3Way');
const util = require('./src/util');

const time = 20;
let getSmallToLarge;
{
  function* yieldSmallToLarge() {
    let smallToLarge = true;
    while (true) {
      yield smallToLarge;
      smallToLarge = !smallToLarge;
    }
  }
  const next = yieldSmallToLarge();
  getSmallToLarge = () => next.next().value;
}

const tests = Array.apply(null, Array(time)).map(() =>
  () => new Promise((resolve, reject) => {
    try {
      const array = util.generateRandomArr(50000, 100000);
      // const array = [ 242, 542, 979, 113, 356, 941, 543, 335, 444, 216 ];
      debug('start --------');
      // debug(array);
      const order = getSmallToLarge();
      if (order) {
        sort((a, b) => a - b, array);
      } else {
        sort((a, b) => b - a, array);
      }
      debug('end');
      if (!util.testSorted(order, array)) {
        debug(`-----${array}-------`);
        reject('Array is not sorted');
      }
      resolve(true);
    } catch (err) {
      reject(err);
    }
  })
);

(async () => {
  try {
    for (let i = 0; i < tests.length; i++) {
      debug(await tests[i]());
    }
  } catch (err) {
    debug(err);
  }
})();
