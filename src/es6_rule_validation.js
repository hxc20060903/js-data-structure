const debug = require('../node_modules/debug')('debug');
const _ = require('../node_modules/lodash');

const prevCompanies = [];
function* createCompany() {
  let a = 0;
  while (true) {
    yield {
      a,
      b: a + 2,
      c: a * 5,
    };
    a++;
  }
}

const creator = createCompany();
_.fill(Array(8), '').forEach(() => prevCompanies.push(creator.next().value));

function createRule() {
  return {
    ['a-rule']: ({ a }) => a % 2 === 1,
    ['b-rule']: ({ b }) => b > 2,
    ['c-rule']: ({ c }) => c < 10,
  };
}

const validate = (objs, rules) => _.map(objs, item =>
  _.map(rules, (rule, ruleName) => (rule(item) ? null : ruleName))
   .filter(ruleName => ruleName !== null)
  );

const r1 = validate(prevCompanies, createRule());
_.forEach(prevCompanies, (item) => _.assign(item, creator.next().value));
debug(prevCompanies);
const r2 = validate(prevCompanies, createRule());
debug(r2);
const diff = _.map(r1, (item1, key1) => _.difference(item1, r2[key1]));
debug(diff);
