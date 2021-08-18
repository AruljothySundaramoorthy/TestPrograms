var _ = require('lodash');
var object = { 'a': 1, 'b': '2', 'c': 3 };
var result = _.omit(object, ['a', 'b']);

console.log(result);