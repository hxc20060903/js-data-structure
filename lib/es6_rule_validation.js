'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _marked = [createCompany].map(regeneratorRuntime.mark);

var debug = require('../node_modules/debug')('lodash');
var _ = require('../node_modules/lodash');

var prevCompanies = [];
function createCompany() {
  var a;
  return regeneratorRuntime.wrap(function createCompany$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          a = 0;

        case 1:
          if (!true) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return {
            a: a,
            b: a + 2,
            c: a * 5
          };

        case 4:
          a++;
          _context.next = 1;
          break;

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

var creator = createCompany();
_.fill(Array(8), '').forEach(function () {
  return prevCompanies.push(creator.next().value);
});

function createRule() {
  var _ref4;

  return _ref4 = {}, _defineProperty(_ref4, 'a-rule', function aRule(_ref) {
    var a = _ref.a;
    return a % 2 === 1;
  }), _defineProperty(_ref4, 'b-rule', function bRule(_ref2) {
    var b = _ref2.b;
    return b > 2;
  }), _defineProperty(_ref4, 'c-rule', function cRule(_ref3) {
    var c = _ref3.c;
    return c < 10;
  }), _ref4;
}

var validate = function validate(objs, rules) {
  return _.map(objs, function (item) {
    return _.map(rules, function (rule, ruleName) {
      return rule(item) ? null : ruleName;
    }).filter(function (ruleName) {
      return ruleName !== null;
    });
  });
};

var r1 = validate(prevCompanies, createRule());
_.forEach(prevCompanies, function (item) {
  return _.assign(item, creator.next().value);
});
debug(prevCompanies);
var r2 = validate(prevCompanies, createRule());
debug(r2);
var diff = _.map(r1, function (item1, key1) {
  return _.difference(item1, r2[key1]);
});
debug(diff);