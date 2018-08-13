(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
main.js
"use strict";

var R = require('ramda');

var square = function square (x) { return x * x; }
var squares = R.chain(square, [1, 2, 3, 4, 5]);

document.getElementById('response').innerHTML = squares;

},{"ramda":86}],2:[function(require,module,exports){
var always = /*#__PURE__*/require('./always');

/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.always, R.T
 * @example
 *
 *      R.F(); //=> false
 */


var F = /*#__PURE__*/always(false);
module.exports = F;
},{"./always":10}],3:[function(require,module,exports){
var always = /*#__PURE__*/require('./always');

/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.always, R.F
 * @example
 *
 *      R.T(); //=> true
 */


var T = /*#__PURE__*/always(true);
module.exports = T;
},{"./always":10}],4:[function(require,module,exports){
/**
 * A special placeholder value used to specify "gaps" within curried functions,
 * allowing partial application of any combination of arguments, regardless of
 * their positions.
 *
 * If `g` is a curried ternary function and `_` is `R.__`, the following are
 * equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2, _)(1, 3)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @constant
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @example
 *
 *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
 *      greet('Alice'); //=> 'Hello, Alice!'
 */
module.exports = { '@@functional/placeholder': true };
},{}],5:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Adds two values.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @see R.subtract
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */


var add = /*#__PURE__*/_curry2(function add(a, b) {
  return Number(a) + Number(b);
});
module.exports = add;
},{"./internal/_curry2":107}],6:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 *
 * This would turn, for instance, [`R.map`](#map) function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Function
 * @category List
 * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
 * @param {Function} fn A list iteration function that does not pass index or list to its callback
 * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
 * @example
 *
 *      var mapIndexed = R.addIndex(R.map);
 *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */


var addIndex = /*#__PURE__*/_curry1(function addIndex(fn) {
  return curryN(fn.length, function () {
    var idx = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = function () {
      var result = origFn.apply(this, _concat(arguments, [idx, list]));
      idx += 1;
      return result;
    };
    return fn.apply(this, args);
  });
});
module.exports = addIndex;
},{"./curryN":43,"./internal/_concat":102,"./internal/_curry1":106}],7:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig (a -> a) -> Number -> [a] -> [a]
 * @param {Function} fn The function to apply.
 * @param {Number} idx The index.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.update
 * @example
 *
 *      R.adjust(R.add(10), 1, [1, 2, 3]);     //=> [1, 12, 3]
 *      R.adjust(R.add(10))(1)([1, 2, 3]);     //=> [1, 12, 3]
 * @symb R.adjust(f, -1, [a, b]) = [a, f(b)]
 * @symb R.adjust(f, 0, [a, b]) = [f(a), b]
 */


var adjust = /*#__PURE__*/_curry3(function adjust(fn, idx, list) {
  if (idx >= list.length || idx < -list.length) {
    return list;
  }
  var start = idx < 0 ? list.length : 0;
  var _idx = start + idx;
  var _list = _concat(list);
  _list[_idx] = fn(list[_idx]);
  return _list;
});
module.exports = adjust;
},{"./internal/_concat":102,"./internal/_curry3":108}],8:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xall = /*#__PURE__*/require('./internal/_xall');

/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @see R.any, R.none, R.transduce
 * @example
 *
 *      var equals3 = R.equals(3);
 *      R.all(equals3)([3, 3, 3, 3]); //=> true
 *      R.all(equals3)([3, 3, 1, 3]); //=> false
 */


var all = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['all'], _xall, function all(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }
    idx += 1;
  }
  return true;
}));
module.exports = all;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_xall":144}],9:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

var max = /*#__PURE__*/require('./max');

var pluck = /*#__PURE__*/require('./pluck');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.anyPass
 * @example
 *
 *      var isQueen = R.propEq('rank', 'Q');
 *      var isSpade = R.propEq('suit', '♠︎');
 *      var isQueenOfSpades = R.allPass([isQueen, isSpade]);
 *
 *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 */


var allPass = /*#__PURE__*/_curry1(function allPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function () {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }
      idx += 1;
    }
    return true;
  });
});
module.exports = allPass;
},{"./curryN":43,"./internal/_curry1":106,"./max":195,"./pluck":240,"./reduce":251}],10:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> (* -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      var t = R.always('Tee');
 *      t(); //=> 'Tee'
 */


var always = /*#__PURE__*/_curry1(function always(val) {
  return function () {
    return val;
  };
});
module.exports = always;
},{"./internal/_curry1":106}],11:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if both arguments are `true`; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if it is falsy, otherwise the second argument.
 * @see R.both
 * @example
 *
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 *      R.and(false, true); //=> false
 *      R.and(false, false); //=> false
 */


var and = /*#__PURE__*/_curry2(function and(a, b) {
  return a && b;
});
module.exports = and;
},{"./internal/_curry2":107}],12:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xany = /*#__PURE__*/require('./internal/_xany');

/**
 * Returns `true` if at least one of elements of the list match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @see R.all, R.none, R.transduce
 * @example
 *
 *      var lessThan0 = R.flip(R.lt)(0);
 *      var lessThan2 = R.flip(R.lt)(2);
 *      R.any(lessThan0)([1, 2]); //=> false
 *      R.any(lessThan2)([1, 2]); //=> true
 */


var any = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['any'], _xany, function any(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (fn(list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}));
module.exports = any;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_xany":145}],13:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

var max = /*#__PURE__*/require('./max');

var pluck = /*#__PURE__*/require('./pluck');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.allPass
 * @example
 *
 *      var isClub = R.propEq('suit', '♣');
 *      var isSpade = R.propEq('suit', '♠');
 *      var isBlackCard = R.anyPass([isClub, isSpade]);
 *
 *      isBlackCard({rank: '10', suit: '♣'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 */


var anyPass = /*#__PURE__*/_curry1(function anyPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function () {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (preds[idx].apply(this, arguments)) {
        return true;
      }
      idx += 1;
    }
    return false;
  });
});
module.exports = anyPass;
},{"./curryN":43,"./internal/_curry1":106,"./max":195,"./pluck":240,"./reduce":251}],14:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var map = /*#__PURE__*/require('./map');

/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (a -> b -> c) -> (a -> b) -> (a -> c)
 * @param {*} applyF
 * @param {*} applyX
 * @return {*}
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 *
 *      // R.ap can also be used as S combinator
 *      // when only two functions are passed
 *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */


var ap = /*#__PURE__*/_curry2(function ap(applyF, applyX) {
  return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {
    return applyF(x)(applyX(x));
  } :
  // else
  _reduce(function (acc, f) {
    return _concat(acc, map(f, applyX));
  }, [], applyF);
});
module.exports = ap;
},{"./internal/_concat":102,"./internal/_curry2":107,"./internal/_reduce":139,"./map":189}],15:[function(require,module,exports){
var _aperture = /*#__PURE__*/require('./internal/_aperture');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xaperture = /*#__PURE__*/require('./internal/_xaperture');

/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @param {Number} n The size of the tuples to create
 * @param {Array} list The list to split into `n`-length tuples
 * @return {Array} The resulting list of `n`-length tuples
 * @see R.transduce
 * @example
 *
 *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 */


var aperture = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xaperture, _aperture));
module.exports = aperture;
},{"./internal/_aperture":94,"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_xaperture":146}],16:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to.
 *        list.
 * @return {Array} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */


var append = /*#__PURE__*/_curry2(function append(el, list) {
  return _concat(list, [el]);
});
module.exports = append;
},{"./internal/_concat":102,"./internal/_curry2":107}],17:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> a) -> [*] -> a
 * @param {Function} fn The function which will be called with `args`
 * @param {Array} args The arguments to call `fn` with
 * @return {*} result The result, equivalent to `fn(...args)`
 * @see R.call, R.unapply
 * @example
 *
 *      var nums = [1, 2, 3, -99, 42, 6, 7];
 *      R.apply(Math.max, nums); //=> 42
 * @symb R.apply(f, [a, b, c]) = f(a, b, c)
 */


var apply = /*#__PURE__*/_curry2(function apply(fn, args) {
  return fn.apply(this, args);
});
module.exports = apply;
},{"./internal/_curry2":107}],18:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var apply = /*#__PURE__*/require('./apply');

var curryN = /*#__PURE__*/require('./curryN');

var map = /*#__PURE__*/require('./map');

var max = /*#__PURE__*/require('./max');

var pluck = /*#__PURE__*/require('./pluck');

var reduce = /*#__PURE__*/require('./reduce');

var values = /*#__PURE__*/require('./values');

/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      var getMetrics = R.applySpec({
 *        sum: R.add,
 *        nested: { mul: R.multiply }
 *      });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */


var applySpec = /*#__PURE__*/_curry1(function applySpec(spec) {
  spec = map(function (v) {
    return typeof v == 'function' ? v : applySpec(v);
  }, spec);
  return curryN(reduce(max, 0, pluck('length', values(spec))), function () {
    var args = arguments;
    return map(function (f) {
      return apply(f, args);
    }, spec);
  });
});
module.exports = applySpec;
},{"./apply":17,"./curryN":43,"./internal/_curry1":106,"./map":189,"./max":195,"./pluck":240,"./reduce":251,"./values":310}],19:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
* Takes a value and applies a function to it.
*
* This function is also known as the `thrush` combinator.
*
* @func
* @memberOf R
 * @since v0.25.0
* @category Function
* @sig a -> (a -> b) -> b
* @param {*} x The value
* @param {Function} f The function to apply
* @return {*} The result of applying `f` to `x`
* @example
*
*      var t42 = R.applyTo(42);
*      t42(R.identity); //=> 42
*      t42(R.add(1)); //=> 43
*/


var applyTo = /*#__PURE__*/_curry2(function applyTo(x, f) {
  return f(x);
});
module.exports = applyTo;
},{"./internal/_curry2":107}],20:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) < fn(b), `1` if fn(b) < fn(a), otherwise `0`
 * @see R.descend
 * @example
 *
 *      var byAge = R.ascend(R.prop('age'));
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByYoungestFirst = R.sort(byAge, people);
 */


var ascend = /*#__PURE__*/_curry3(function ascend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});
module.exports = ascend;
},{"./internal/_curry3":108}],21:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop The property name to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.dissoc
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */


var assoc = /*#__PURE__*/_curry3(function assoc(prop, val, obj) {
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop] = val;
  return result;
});
module.exports = assoc;
},{"./internal/_curry3":108}],22:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _has = /*#__PURE__*/require('./internal/_has');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

var _isInteger = /*#__PURE__*/require('./internal/_isInteger');

var assoc = /*#__PURE__*/require('./assoc');

var isNil = /*#__PURE__*/require('./isNil');

/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> {a}
 * @param {Array} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.dissocPath
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */


var assocPath = /*#__PURE__*/_curry3(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }
  var idx = path[0];
  if (path.length > 1) {
    var nextObj = !isNil(obj) && _has(idx, obj) ? obj[idx] : _isInteger(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }
  if (_isInteger(idx) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[idx] = val;
    return arr;
  } else {
    return assoc(idx, val, obj);
  }
});
module.exports = assocPath;
},{"./assoc":21,"./internal/_curry3":108,"./internal/_has":118,"./internal/_isArray":122,"./internal/_isInteger":125,"./isNil":173}],23:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var nAry = /*#__PURE__*/require('./nAry');

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> c) -> (a, b -> c)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 2.
 * @see R.nAry, R.unary
 * @example
 *
 *      var takesThreeArgs = function(a, b, c) {
 *        return [a, b, c];
 *      };
 *      takesThreeArgs.length; //=> 3
 *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
 *
 *      var takesTwoArgs = R.binary(takesThreeArgs);
 *      takesTwoArgs.length; //=> 2
 *      // Only 2 arguments are passed to the wrapped function
 *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
 * @symb R.binary(f)(a, b, c) = f(a, b)
 */


var binary = /*#__PURE__*/_curry1(function binary(fn) {
  return nAry(2, fn);
});
module.exports = binary;
},{"./internal/_curry1":106,"./nAry":213}],24:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */


var bind = /*#__PURE__*/_curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});
module.exports = bind;
},{"./internal/_arity":95,"./internal/_curry2":107}],25:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isFunction = /*#__PURE__*/require('./internal/_isFunction');

var and = /*#__PURE__*/require('./and');

var lift = /*#__PURE__*/require('./lift');

/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 *
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
 * @see R.and
 * @example
 *
 *      var gt10 = R.gt(R.__, 10)
 *      var lt20 = R.lt(R.__, 20)
 *      var f = R.both(gt10, lt20);
 *      f(15); //=> true
 *      f(30); //=> false
 */


var both = /*#__PURE__*/_curry2(function both(f, g) {
  return _isFunction(f) ? function _both() {
    return f.apply(this, arguments) && g.apply(this, arguments);
  } : lift(and)(f, g);
});
module.exports = both;
},{"./and":11,"./internal/_curry2":107,"./internal/_isFunction":124,"./lift":185}],26:[function(require,module,exports){
var curry = /*#__PURE__*/require('./curry');

/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig (*... -> a),*... -> a
 * @param {Function} fn The function to apply to the remaining arguments.
 * @param {...*} args Any number of positional arguments.
 * @return {*}
 * @see R.apply
 * @example
 *
 *      R.call(R.add, 1, 2); //=> 3
 *
 *      var indentN = R.pipe(R.repeat(' '),
 *                           R.join(''),
 *                           R.replace(/^(?!$)/gm));
 *
 *      var format = R.converge(R.call, [
 *                                  R.pipe(R.prop('indent'), indentN),
 *                                  R.prop('value')
 *                              ]);
 *
 *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 * @symb R.call(f, a, b) = f(a, b)
 */


var call = /*#__PURE__*/curry(function call(fn) {
  return fn.apply(this, Array.prototype.slice.call(arguments, 1));
});
module.exports = call;
},{"./curry":42}],27:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _makeFlat = /*#__PURE__*/require('./internal/_makeFlat');

var _xchain = /*#__PURE__*/require('./internal/_xchain');

var map = /*#__PURE__*/require('./map');

/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      var duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 */


var chain = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['fantasy-land/chain', 'chain'], _xchain, function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function (x) {
      return fn(monad(x))(x);
    };
  }
  return _makeFlat(false)(map(fn, monad));
}));
module.exports = chain;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_makeFlat":132,"./internal/_xchain":147,"./map":189}],28:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Relation
 * @sig Ord a => a -> a -> a -> a
 * @param {Number} minimum The lower limit of the clamp (inclusive)
 * @param {Number} maximum The upper limit of the clamp (inclusive)
 * @param {Number} value Value to be clamped
 * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
 * @example
 *
 *      R.clamp(1, 10, -5) // => 1
 *      R.clamp(1, 10, 15) // => 10
 *      R.clamp(1, 10, 4)  // => 4
 */


var clamp = /*#__PURE__*/_curry3(function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }
  return value < min ? min : value > max ? max : value;
});
module.exports = clamp;
},{"./internal/_curry3":108}],29:[function(require,module,exports){
var _clone = /*#__PURE__*/require('./internal/_clone');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Creates a deep copy of the value which may contain (nested) `Array`s and
 * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
 * assigned by reference rather than copied
 *
 * Dispatches to a `clone` method if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A deeply cloned copy of `val`
 * @example
 *
 *      var objects = [{}, {}, {}];
 *      var objectsClone = R.clone(objects);
 *      objects === objectsClone; //=> false
 *      objects[0] === objectsClone[0]; //=> false
 */


var clone = /*#__PURE__*/_curry1(function clone(value) {
  return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true);
});
module.exports = clone;
},{"./internal/_clone":99,"./internal/_curry1":106}],30:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b) -> Boolean) -> ((a, b) -> Number)
 * @param {Function} pred A predicate function of arity two which will return `true` if the first argument
 * is less than the second, `false` otherwise
 * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`
 * @example
 *
 *      var byAge = R.comparator((a, b) => a.age < b.age);
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByIncreasingAge = R.sort(byAge, people);
 */


var comparator = /*#__PURE__*/_curry1(function comparator(pred) {
  return function (a, b) {
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});
module.exports = comparator;
},{"./internal/_curry1":106}],31:[function(require,module,exports){
var lift = /*#__PURE__*/require('./lift');

var not = /*#__PURE__*/require('./not');

/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 *
 * `R.complement` may be applied to any functor
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> *) -> (*... -> Boolean)
 * @param {Function} f
 * @return {Function}
 * @see R.not
 * @example
 *
 *      var isNotNil = R.complement(R.isNil);
 *      isNil(null); //=> true
 *      isNotNil(null); //=> false
 *      isNil(7); //=> false
 *      isNotNil(7); //=> true
 */


var complement = /*#__PURE__*/lift(not);
module.exports = complement;
},{"./lift":185,"./not":216}],32:[function(require,module,exports){
var pipe = /*#__PURE__*/require('./pipe');

var reverse = /*#__PURE__*/require('./reverse');

/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */


function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }
  return pipe.apply(this, reverse(arguments));
}
module.exports = compose;
},{"./pipe":237,"./reverse":260}],33:[function(require,module,exports){
var chain = /*#__PURE__*/require('./chain');

var compose = /*#__PURE__*/require('./compose');

var map = /*#__PURE__*/require('./map');

/**
 * Returns the right-to-left Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (a -> m z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipeK
 * @example
 *
 *       //  get :: String -> Object -> Maybe *
 *       var get = R.curry((propName, obj) => Maybe(obj[propName]))
 *
 *       //  getStateCode :: Maybe String -> Maybe String
 *       var getStateCode = R.composeK(
 *         R.compose(Maybe.of, R.toUpper),
 *         get('state'),
 *         get('address'),
 *         get('user'),
 *       );
 *       getStateCode({"user":{"address":{"state":"ny"}}}); //=> Maybe.Just("NY")
 *       getStateCode({}); //=> Maybe.Nothing()
 * @symb R.composeK(f, g, h)(a) = R.chain(f, R.chain(g, h(a)))
 */


function composeK() {
  if (arguments.length === 0) {
    throw new Error('composeK requires at least one argument');
  }
  var init = Array.prototype.slice.call(arguments);
  var last = init.pop();
  return compose(compose.apply(this, map(chain, init)), last);
}
module.exports = composeK;
},{"./chain":27,"./compose":32,"./map":189}],34:[function(require,module,exports){
var pipeP = /*#__PURE__*/require('./pipeP');

var reverse = /*#__PURE__*/require('./reverse');

/**
 * Performs right-to-left composition of one or more Promise-returning
 * functions. The rightmost function may have any arity; the remaining
 * functions must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
 * @param {...Function} functions The functions to compose
 * @return {Function}
 * @see R.pipeP
 * @example
 *
 *      var db = {
 *        users: {
 *          JOE: {
 *            name: 'Joe',
 *            followers: ['STEVE', 'SUZY']
 *          }
 *        }
 *      }
 *
 *      // We'll pretend to do a db lookup which returns a promise
 *      var lookupUser = (userId) => Promise.resolve(db.users[userId])
 *      var lookupFollowers = (user) => Promise.resolve(user.followers)
 *      lookupUser('JOE').then(lookupFollowers)
 *
 *      //  followersForUser :: String -> Promise [UserId]
 *      var followersForUser = R.composeP(lookupFollowers, lookupUser);
 *      followersForUser('JOE').then(followers => console.log('Followers:', followers))
 *      // Followers: ["STEVE","SUZY"]
 */


function composeP() {
  if (arguments.length === 0) {
    throw new Error('composeP requires at least one argument');
  }
  return pipeP.apply(this, reverse(arguments));
}
module.exports = composeP;
},{"./pipeP":239,"./reverse":260}],35:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

var _isFunction = /*#__PURE__*/require('./internal/_isFunction');

var _isString = /*#__PURE__*/require('./internal/_isString');

var toString = /*#__PURE__*/require('./toString');

/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
 * `secondList`.
 *
 * @example
 *
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat([], []); //=> []
 */


var concat = /*#__PURE__*/_curry2(function concat(a, b) {
  if (_isArray(a)) {
    if (_isArray(b)) {
      return a.concat(b);
    }
    throw new TypeError(toString(b) + ' is not an array');
  }
  if (_isString(a)) {
    if (_isString(b)) {
      return a + b;
    }
    throw new TypeError(toString(b) + ' is not a string');
  }
  if (a != null && _isFunction(a['fantasy-land/concat'])) {
    return a['fantasy-land/concat'](b);
  }
  if (a != null && _isFunction(a.concat)) {
    return a.concat(b);
  }
  throw new TypeError(toString(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});
module.exports = concat;
},{"./internal/_curry2":107,"./internal/_isArray":122,"./internal/_isFunction":124,"./internal/_isString":130,"./toString":288}],36:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var map = /*#__PURE__*/require('./map');

var max = /*#__PURE__*/require('./max');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Logic
 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
 * @param {Array} pairs A list of [predicate, transformer]
 * @return {Function}
 * @example
 *
 *      var fn = R.cond([
 *        [R.equals(0),   R.always('water freezes at 0°C')],
 *        [R.equals(100), R.always('water boils at 100°C')],
 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 *      ]);
 *      fn(0); //=> 'water freezes at 0°C'
 *      fn(50); //=> 'nothing special happens at 50°C'
 *      fn(100); //=> 'water boils at 100°C'
 */


var cond = /*#__PURE__*/_curry1(function cond(pairs) {
  var arity = reduce(max, 0, map(function (pair) {
    return pair[0].length;
  }, pairs));
  return _arity(arity, function () {
    var idx = 0;
    while (idx < pairs.length) {
      if (pairs[idx][0].apply(this, arguments)) {
        return pairs[idx][1].apply(this, arguments);
      }
      idx += 1;
    }
  });
});
module.exports = cond;
},{"./internal/_arity":95,"./internal/_curry1":106,"./map":189,"./max":195,"./reduce":251}],37:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var constructN = /*#__PURE__*/require('./constructN');

/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> {*}) -> (* -> {*})
 * @param {Function} fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @see R.invoker
 * @example
 *
 *      // Constructor function
 *      function Animal(kind) {
 *        this.kind = kind;
 *      };
 *      Animal.prototype.sighting = function() {
 *        return "It's a " + this.kind + "!";
 *      }
 *
 *      var AnimalConstructor = R.construct(Animal)
 *
 *      // Notice we no longer need the 'new' keyword:
 *      AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};
 *
 *      var animalTypes = ["Lion", "Tiger", "Bear"];
 *      var animalSighting = R.invoker(0, 'sighting');
 *      var sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
 *      R.map(sightNewAnimal, animalTypes); //=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]
 */


var construct = /*#__PURE__*/_curry1(function construct(Fn) {
  return constructN(Fn.length, Fn);
});
module.exports = construct;
},{"./constructN":38,"./internal/_curry1":106}],38:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var curry = /*#__PURE__*/require('./curry');

var nAry = /*#__PURE__*/require('./nAry');

/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Function
 * @sig Number -> (* -> {*}) -> (* -> {*})
 * @param {Number} n The arity of the constructor function.
 * @param {Function} Fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Variadic Constructor function
 *      function Salad() {
 *        this.ingredients = arguments;
 *      }
 *
 *      Salad.prototype.recipe = function() {
 *        var instructions = R.map(ingredient => 'Add a dollop of ' + ingredient, this.ingredients);
 *        return R.join('\n', instructions);
 *      };
 *
 *      var ThreeLayerSalad = R.constructN(3, Salad);
 *
 *      // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.
 *      var salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');
 *
 *      console.log(salad.recipe());
 *      // Add a dollop of Mayonnaise
 *      // Add a dollop of Potato Chips
 *      // Add a dollop of Ketchup
 */


var constructN = /*#__PURE__*/_curry2(function constructN(n, Fn) {
  if (n > 10) {
    throw new Error('Constructor with greater than ten arguments');
  }
  if (n === 0) {
    return function () {
      return new Fn();
    };
  }
  return curry(nAry(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
    switch (arguments.length) {
      case 1:
        return new Fn($0);
      case 2:
        return new Fn($0, $1);
      case 3:
        return new Fn($0, $1, $2);
      case 4:
        return new Fn($0, $1, $2, $3);
      case 5:
        return new Fn($0, $1, $2, $3, $4);
      case 6:
        return new Fn($0, $1, $2, $3, $4, $5);
      case 7:
        return new Fn($0, $1, $2, $3, $4, $5, $6);
      case 8:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
      case 9:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
      case 10:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
    }
  }));
});
module.exports = constructN;
},{"./curry":42,"./internal/_curry2":107,"./nAry":213}],39:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./internal/_contains');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.contains(3, [1, 2, 3]); //=> true
 *      R.contains(4, [1, 2, 3]); //=> false
 *      R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.contains([42], [[42]]); //=> true
 */


var contains = /*#__PURE__*/_curry2(_contains);
module.exports = contains;
},{"./internal/_contains":103,"./internal/_curry2":107}],40:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _map = /*#__PURE__*/require('./internal/_map');

var curryN = /*#__PURE__*/require('./curryN');

var max = /*#__PURE__*/require('./max');

var pluck = /*#__PURE__*/require('./pluck');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. When invoked, this new function is applied to some
 * arguments, each branching function is applied to those same arguments. The
 * results of each branching function are passed as arguments to the converging
 * function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      var average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      var strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */


var converge = /*#__PURE__*/_curry2(function converge(after, fns) {
  return curryN(reduce(max, 0, pluck('length', fns)), function () {
    var args = arguments;
    var context = this;
    return after.apply(context, _map(function (fn) {
      return fn.apply(context, args);
    }, fns));
  });
});
module.exports = converge;
},{"./curryN":43,"./internal/_curry2":107,"./internal/_map":133,"./max":195,"./pluck":240,"./reduce":251}],41:[function(require,module,exports){
var reduceBy = /*#__PURE__*/require('./reduceBy');

/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig (a -> String) -> [a] -> {*}
 * @param {Function} fn The function used to map values to keys.
 * @param {Array} list The list to count elements from.
 * @return {Object} An object mapping keys to number of occurrences in the list.
 * @example
 *
 *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
 *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
 *
 *      var letters = ['a', 'b', 'A', 'a', 'B', 'c'];
 *      R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
 */


var countBy = /*#__PURE__*/reduceBy(function (acc, elem) {
  return acc + 1;
}, 0);
module.exports = countBy;
},{"./reduceBy":252}],42:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN
 * @example
 *
 *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */


var curry = /*#__PURE__*/_curry1(function curry(fn) {
  return curryN(fn.length, fn);
});
module.exports = curry;
},{"./curryN":43,"./internal/_curry1":106}],43:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _curryN = /*#__PURE__*/require('./internal/_curryN');

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */


var curryN = /*#__PURE__*/_curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});
module.exports = curryN;
},{"./internal/_arity":95,"./internal/_curry1":106,"./internal/_curry2":107,"./internal/_curryN":109}],44:[function(require,module,exports){
var add = /*#__PURE__*/require('./add');

/**
 * Decrements its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n - 1
 * @see R.inc
 * @example
 *
 *      R.dec(42); //=> 41
 */


var dec = /*#__PURE__*/add(-1);
module.exports = dec;
},{"./add":5}],45:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {a} default The default value.
 * @param {b} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
 * @return {*} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
 * @example
 *
 *      var defaultTo42 = R.defaultTo(42);
 *
 *      defaultTo42(null);  //=> 42
 *      defaultTo42(undefined);  //=> 42
 *      defaultTo42('Ramda');  //=> 'Ramda'
 *      // parseInt('string') results in NaN
 *      defaultTo42(parseInt('string')); //=> 42
 */


var defaultTo = /*#__PURE__*/_curry2(function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
});
module.exports = defaultTo;
},{"./internal/_curry2":107}],46:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) > fn(b), `1` if fn(b) > fn(a), otherwise `0`
 * @see R.ascend
 * @example
 *
 *      var byAge = R.descend(R.prop('age'));
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByOldestFirst = R.sort(byAge, people);
 */


var descend = /*#__PURE__*/_curry3(function descend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0;
});
module.exports = descend;
},{"./internal/_curry3":108}],47:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./internal/_contains');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith, R.without
 * @example
 *
 *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 *      R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 */


var difference = /*#__PURE__*/_curry2(function difference(first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  while (idx < firstLen) {
    if (!_contains(first[idx], second) && !_contains(first[idx], out)) {
      out[out.length] = first[idx];
    }
    idx += 1;
  }
  return out;
});
module.exports = difference;
},{"./internal/_contains":103,"./internal/_curry2":107}],48:[function(require,module,exports){
var _containsWith = /*#__PURE__*/require('./internal/_containsWith');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith
 * @example
 *
 *      var cmp = (x, y) => x.a === y.a;
 *      var l1 = [{a: 1}, {a: 2}, {a: 3}];
 *      var l2 = [{a: 3}, {a: 4}];
 *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 */


var differenceWith = /*#__PURE__*/_curry3(function differenceWith(pred, first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  while (idx < firstLen) {
    if (!_containsWith(pred, first[idx], second) && !_containsWith(pred, first[idx], out)) {
      out.push(first[idx]);
    }
    idx += 1;
  }
  return out;
});
module.exports = differenceWith;
},{"./internal/_containsWith":104,"./internal/_curry3":108}],49:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Object
 * @sig String -> {k: v} -> {k: v}
 * @param {String} prop The name of the property to dissociate
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original but without the specified property
 * @see R.assoc
 * @example
 *
 *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */


var dissoc = /*#__PURE__*/_curry2(function dissoc(prop, obj) {
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  delete result[prop];
  return result;
});
module.exports = dissoc;
},{"./internal/_curry2":107}],50:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isInteger = /*#__PURE__*/require('./internal/_isInteger');

var assoc = /*#__PURE__*/require('./assoc');

var dissoc = /*#__PURE__*/require('./dissoc');

var remove = /*#__PURE__*/require('./remove');

var update = /*#__PURE__*/require('./update');

/**
 * Makes a shallow clone of an object, omitting the property at the given path.
 * Note that this copies and flattens prototype properties onto the new object
 * as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.11.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {Array} path The path to the value to omit
 * @param {Object} obj The object to clone
 * @return {Object} A new object without the property at path
 * @see R.assocPath
 * @example
 *
 *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */


var dissocPath = /*#__PURE__*/_curry2(function dissocPath(path, obj) {
  switch (path.length) {
    case 0:
      return obj;
    case 1:
      return _isInteger(path[0]) ? remove(path[0], 1, obj) : dissoc(path[0], obj);
    default:
      var head = path[0];
      var tail = Array.prototype.slice.call(path, 1);
      if (obj[head] == null) {
        return obj;
      } else if (_isInteger(path[0])) {
        return update(head, dissocPath(tail, obj[head]), obj);
      } else {
        return assoc(head, dissocPath(tail, obj[head]), obj);
      }
  }
});
module.exports = dissocPath;
},{"./assoc":21,"./dissoc":49,"./internal/_curry2":107,"./internal/_isInteger":125,"./remove":257,"./update":308}],51:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a / b`.
 * @see R.multiply
 * @example
 *
 *      R.divide(71, 100); //=> 0.71
 *
 *      var half = R.divide(R.__, 2);
 *      half(42); //=> 21
 *
 *      var reciprocal = R.divide(1);
 *      reciprocal(4);   //=> 0.25
 */


var divide = /*#__PURE__*/_curry2(function divide(a, b) {
  return a / b;
});
module.exports = divide;
},{"./internal/_curry2":107}],52:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xdrop = /*#__PURE__*/require('./internal/_xdrop');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */


var drop = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['drop'], _xdrop, function drop(n, xs) {
  return slice(Math.max(0, n), Infinity, xs);
}));
module.exports = drop;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_xdrop":148,"./slice":264}],53:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _dropLast = /*#__PURE__*/require('./internal/_dropLast');

var _xdropLast = /*#__PURE__*/require('./internal/_xdropLast');

/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements of `list` to skip.
 * @param {Array} list The list of elements to consider.
 * @return {Array} A copy of the list with only the first `list.length - n` elements
 * @see R.takeLast, R.drop, R.dropWhile, R.dropLastWhile
 * @example
 *
 *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(3, 'ramda');               //=> 'ra'
 */


var dropLast = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropLast, _dropLast));
module.exports = dropLast;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_dropLast":111,"./internal/_xdropLast":149}],54:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _dropLastWhile = /*#__PURE__*/require('./internal/_dropLastWhile');

var _xdropLastWhile = /*#__PURE__*/require('./internal/_xdropLastWhile');

/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} predicate The function to be called on each element
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array without any trailing elements that return `falsy` values from the `predicate`.
 * @see R.takeLastWhile, R.addIndex, R.drop, R.dropWhile
 * @example
 *
 *      var lteThree = x => x <= 3;
 *
 *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 *
 *      R.dropLastWhile(x => x !== 'd' , 'Ramda'); //=> 'Ramd'
 */


var dropLastWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropLastWhile, _dropLastWhile));
module.exports = dropLastWhile;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_dropLastWhile":112,"./internal/_xdropLastWhile":150}],55:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xdropRepeatsWith = /*#__PURE__*/require('./internal/_xdropRepeatsWith');

var dropRepeatsWith = /*#__PURE__*/require('./dropRepeatsWith');

var equals = /*#__PURE__*/require('./equals');

/**
 * Returns a new list without any consecutively repeating elements.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 */


var dropRepeats = /*#__PURE__*/_curry1( /*#__PURE__*/_dispatchable([], /*#__PURE__*/_xdropRepeatsWith(equals), /*#__PURE__*/dropRepeatsWith(equals)));
module.exports = dropRepeats;
},{"./dropRepeatsWith":56,"./equals":63,"./internal/_curry1":106,"./internal/_dispatchable":110,"./internal/_xdropRepeatsWith":151}],56:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xdropRepeatsWith = /*#__PURE__*/require('./internal/_xdropRepeatsWith');

var last = /*#__PURE__*/require('./last');

/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
 *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
 */


var dropRepeatsWith = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
  var result = [];
  var idx = 1;
  var len = list.length;
  if (len !== 0) {
    result[0] = list[0];
    while (idx < len) {
      if (!pred(last(result), list[idx])) {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
  }
  return result;
}));
module.exports = dropRepeatsWith;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_xdropRepeatsWith":151,"./last":178}],57:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xdropWhile = /*#__PURE__*/require('./internal/_xdropWhile');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 *
 * Dispatches to the `dropWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.takeWhile, R.transduce, R.addIndex
 * @example
 *
 *      var lteTwo = x => x <= 2;
 *
 *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 *
 *      R.dropWhile(x => x !== 'd' , 'Ramda'); //=> 'da'
 */


var dropWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['dropWhile'], _xdropWhile, function dropWhile(pred, xs) {
  var idx = 0;
  var len = xs.length;
  while (idx < len && pred(xs[idx])) {
    idx += 1;
  }
  return slice(idx, Infinity, xs);
}));
module.exports = dropWhile;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_xdropWhile":152,"./slice":264}],58:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isFunction = /*#__PURE__*/require('./internal/_isFunction');

var lift = /*#__PURE__*/require('./lift');

var or = /*#__PURE__*/require('./or');

/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 *
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
 * @see R.or
 * @example
 *
 *      var gt10 = x => x > 10;
 *      var even = x => x % 2 === 0;
 *      var f = R.either(gt10, even);
 *      f(101); //=> true
 *      f(8); //=> true
 */


var either = /*#__PURE__*/_curry2(function either(f, g) {
  return _isFunction(f) ? function _either() {
    return f.apply(this, arguments) || g.apply(this, arguments);
  } : lift(or)(f, g);
});
module.exports = either;
},{"./internal/_curry2":107,"./internal/_isFunction":124,"./lift":185,"./or":224}],59:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _isArguments = /*#__PURE__*/require('./internal/_isArguments');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

var _isObject = /*#__PURE__*/require('./internal/_isObject');

var _isString = /*#__PURE__*/require('./internal/_isString');

/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));      //=> Nothing()
 *      R.empty([1, 2, 3]);     //=> []
 *      R.empty('unicorns');    //=> ''
 *      R.empty({x: 1, y: 2});  //=> {}
 */


var empty = /*#__PURE__*/_curry1(function empty(x) {
  return x != null && typeof x['fantasy-land/empty'] === 'function' ? x['fantasy-land/empty']() : x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function' ? x.constructor['fantasy-land/empty']() : x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? '' : _isObject(x) ? {} : _isArguments(x) ? function () {
    return arguments;
  }() :
  // else
  void 0;
});
module.exports = empty;
},{"./internal/_curry1":106,"./internal/_isArguments":121,"./internal/_isArray":122,"./internal/_isObject":127,"./internal/_isString":130}],60:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var equals = /*#__PURE__*/require('./equals');

var takeLast = /*#__PURE__*/require('./takeLast');

/**
 * Checks if a list ends with the provided values
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> Boolean
 * @sig String -> Boolean
 * @param {*} suffix
 * @param {*} list
 * @return {Boolean}
 * @example
 *
 *      R.endsWith('c', 'abc')                //=> true
 *      R.endsWith('b', 'abc')                //=> false
 *      R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 *      R.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 */


var endsWith = /*#__PURE__*/_curry2(function (suffix, list) {
  return equals(takeLast(suffix.length, list), suffix);
});
module.exports = endsWith;
},{"./equals":63,"./internal/_curry2":107,"./takeLast":279}],61:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var equals = /*#__PURE__*/require('./equals');

/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Relation
 * @sig (a -> b) -> a -> a -> Boolean
 * @param {Function} f
 * @param {*} x
 * @param {*} y
 * @return {Boolean}
 * @example
 *
 *      R.eqBy(Math.abs, 5, -5); //=> true
 */


var eqBy = /*#__PURE__*/_curry3(function eqBy(f, x, y) {
  return equals(f(x), f(y));
});
module.exports = eqBy;
},{"./equals":63,"./internal/_curry3":108}],62:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var equals = /*#__PURE__*/require('./equals');

/**
 * Reports whether two objects have the same value, in [`R.equals`](#equals)
 * terms, for the specified property. Useful as a curried predicate.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig k -> {k: v} -> {k: v} -> Boolean
 * @param {String} prop The name of the property to compare
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 *
 * @example
 *
 *      var o1 = { a: 1, b: 2, c: 3, d: 4 };
 *      var o2 = { a: 10, b: 20, c: 3, d: 40 };
 *      R.eqProps('a', o1, o2); //=> false
 *      R.eqProps('c', o1, o2); //=> true
 */


var eqProps = /*#__PURE__*/_curry3(function eqProps(prop, obj1, obj2) {
  return equals(obj1[prop], obj2[prop]);
});
module.exports = eqProps;
},{"./equals":63,"./internal/_curry3":108}],63:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _equals = /*#__PURE__*/require('./internal/_equals');

/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */


var equals = /*#__PURE__*/_curry2(function equals(a, b) {
  return _equals(a, b, [], []);
});
module.exports = equals;
},{"./internal/_curry2":107,"./internal/_equals":113}],64:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 *
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
 *      var transformations = {
 *        firstName: R.trim,
 *        lastName: R.trim, // Will not get invoked.
 *        data: {elapsed: R.add(1), remaining: R.add(-1)}
 *      };
 *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
 */


var evolve = /*#__PURE__*/_curry2(function evolve(transformations, object) {
  var result = {};
  var transformation, key, type;
  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function' ? transformation(object[key]) : transformation && type === 'object' ? evolve(transformation, object[key]) : object[key];
  }
  return result;
});
module.exports = evolve;
},{"./internal/_curry2":107}],65:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _filter = /*#__PURE__*/require('./internal/_filter');

var _isObject = /*#__PURE__*/require('./internal/_isObject');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _xfilter = /*#__PURE__*/require('./internal/_xfilter');

var keys = /*#__PURE__*/require('./keys');

/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */


var filter = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['filter'], _xfilter, function (pred, filterable) {
  return _isObject(filterable) ? _reduce(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }
    return acc;
  }, {}, keys(filterable)) :
  // else
  _filter(pred, filterable);
}));
module.exports = filter;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_filter":114,"./internal/_isObject":127,"./internal/_reduce":139,"./internal/_xfilter":154,"./keys":176}],66:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xfind = /*#__PURE__*/require('./internal/_xfind');

/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */


var find = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['find'], _xfind, function find(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx += 1;
  }
}));
module.exports = find;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_xfind":155}],67:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xfindIndex = /*#__PURE__*/require('./internal/_xfindIndex');

/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
 *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
 */


var findIndex = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindIndex, function findIndex(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}));
module.exports = findIndex;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_xfindIndex":156}],68:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xfindLast = /*#__PURE__*/require('./internal/_xfindLast');

/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
 *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
 */


var findLast = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindLast, function findLast(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx -= 1;
  }
}));
module.exports = findLast;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_xfindLast":157}],69:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xfindLastIndex = /*#__PURE__*/require('./internal/_xfindLastIndex');

/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
 *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
 */


var findLastIndex = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindLastIndex, function findLastIndex(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return idx;
    }
    idx -= 1;
  }
  return -1;
}));
module.exports = findLastIndex;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_xfindLastIndex":158}],70:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _makeFlat = /*#__PURE__*/require('./internal/_makeFlat');

/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */


var flatten = /*#__PURE__*/_curry1( /*#__PURE__*/_makeFlat(true));
module.exports = flatten;
},{"./internal/_curry1":106,"./internal/_makeFlat":132}],71:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      var mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */


var flip = /*#__PURE__*/_curry1(function flip(fn) {
  return curryN(fn.length, function (a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});
module.exports = flip;
},{"./curryN":43,"./internal/_curry1":106}],72:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> *) -> [a] -> [a]
 * @param {Function} fn The function to invoke. Receives one argument, `value`.
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @see R.addIndex
 * @example
 *
 *      var printXPlusFive = x => console.log(x + 5);
 *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 * @symb R.forEach(f, [a, b, c]) = [a, b, c]
 */


var forEach = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('forEach', function forEach(fn, list) {
  var len = list.length;
  var idx = 0;
  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }
  return list;
}));
module.exports = forEach;
},{"./internal/_checkForMethod":98,"./internal/_curry2":107}],73:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var keys = /*#__PURE__*/require('./keys');

/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 *
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Object
 * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a
 * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {Object} obj The object to iterate over.
 * @return {Object} The original object.
 * @example
 *
 *      var printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 *      // logs x:1
 *      // logs y:2
 * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}
 */


var forEachObjIndexed = /*#__PURE__*/_curry2(function forEachObjIndexed(fn, obj) {
  var keyList = keys(obj);
  var idx = 0;
  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }
  return obj;
});
module.exports = forEachObjIndexed;
},{"./internal/_curry2":107,"./keys":176}],74:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [[k,v]] -> {k: v}
 * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {Object} The object made by pairing up `keys` and `values`.
 * @see R.toPairs, R.pair
 * @example
 *
 *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */


var fromPairs = /*#__PURE__*/_curry1(function fromPairs(pairs) {
  var result = {};
  var idx = 0;
  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];
    idx += 1;
  }
  return result;
});
module.exports = fromPairs;
},{"./internal/_curry1":106}],75:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var reduceBy = /*#__PURE__*/require('./reduceBy');

/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a String-returning function on each element, and grouping the
 * results according to values returned.
 *
 * Dispatches to the `groupBy` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> String) -> [a] -> {String: [a]}
 * @param {Function} fn Function :: a -> String
 * @param {Array} list The array to group
 * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
 *         that produced that key when passed to `fn`.
 * @see R.transduce
 * @example
 *
 *      var byGrade = R.groupBy(function(student) {
 *        var score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      var students = [{name: 'Abby', score: 84},
 *                      {name: 'Eddy', score: 58},
 *                      // ...
 *                      {name: 'Jack', score: 69}];
 *      byGrade(students);
 *      // {
 *      //   'A': [{name: 'Dianne', score: 99}],
 *      //   'B': [{name: 'Abby', score: 84}]
 *      //   // ...,
 *      //   'F': [{name: 'Eddy', score: 58}]
 *      // }
 */


var groupBy = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('groupBy', /*#__PURE__*/reduceBy(function (acc, item) {
  if (acc == null) {
    acc = [];
  }
  acc.push(item);
  return acc;
}, null)));
module.exports = groupBy;
},{"./internal/_checkForMethod":98,"./internal/_curry2":107,"./reduceBy":252}],76:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all satisfied pairwise comparison according to the provided function.
 * Only adjacent elements are passed to the comparison function.
 *
 * @func
 * @memberOf R
 * @since v0.21.0
 * @category List
 * @sig ((a, a) → Boolean) → [a] → [[a]]
 * @param {Function} fn Function for determining whether two given (adjacent)
 *        elements should be in the same group
 * @param {Array} list The array to group. Also accepts a string, which will be
 *        treated as a list of characters.
 * @return {List} A list that contains sublists of elements,
 *         whose concatenations are equal to the original list.
 * @example
 *
 * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
 *
 * R.groupWith(R.eqBy(isVowel), 'aestiou')
 * //=> ['ae', 'st', 'iou']
 */


var groupWith = /*#__PURE__*/_curry2(function (fn, list) {
  var res = [];
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    var nextidx = idx + 1;
    while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) {
      nextidx += 1;
    }
    res.push(list.slice(idx, nextidx));
    idx = nextidx;
  }
  return res;
});
module.exports = groupWith;
},{"./internal/_curry2":107}],77:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lt
 * @example
 *
 *      R.gt(2, 1); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(2, 3); //=> false
 *      R.gt('a', 'z'); //=> false
 *      R.gt('z', 'a'); //=> true
 */


var gt = /*#__PURE__*/_curry2(function gt(a, b) {
  return a > b;
});
module.exports = gt;
},{"./internal/_curry2":107}],78:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.lte
 * @example
 *
 *      R.gte(2, 1); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(2, 3); //=> false
 *      R.gte('a', 'z'); //=> false
 *      R.gte('z', 'a'); //=> true
 */


var gte = /*#__PURE__*/_curry2(function gte(a, b) {
  return a >= b;
});
module.exports = gte;
},{"./internal/_curry2":107}],79:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      var hasName = R.has('name');
 *      hasName({name: 'alice'});   //=> true
 *      hasName({name: 'bob'});     //=> true
 *      hasName({});                //=> false
 *
 *      var point = {x: 0, y: 0};
 *      var pointHas = R.has(R.__, point);
 *      pointHas('x');  //=> true
 *      pointHas('y');  //=> true
 *      pointHas('z');  //=> false
 */


var has = /*#__PURE__*/_curry2(_has);
module.exports = has;
},{"./internal/_curry2":107,"./internal/_has":118}],80:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      function Rectangle(width, height) {
 *        this.width = width;
 *        this.height = height;
 *      }
 *      Rectangle.prototype.area = function() {
 *        return this.width * this.height;
 *      };
 *
 *      var square = new Rectangle(2, 2);
 *      R.hasIn('width', square);  //=> true
 *      R.hasIn('area', square);  //=> true
 */


var hasIn = /*#__PURE__*/_curry2(function hasIn(prop, obj) {
  return prop in obj;
});
module.exports = hasIn;
},{"./internal/_curry2":107}],81:[function(require,module,exports){
var nth = /*#__PURE__*/require('./nth');

/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> ''
 */


var head = /*#__PURE__*/nth(0);
module.exports = head;
},{"./nth":217}],82:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      var o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */


var identical = /*#__PURE__*/_curry2(function identical(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
});
module.exports = identical;
},{"./internal/_curry2":107}],83:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _identity = /*#__PURE__*/require('./internal/_identity');

/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      var obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */


var identity = /*#__PURE__*/_curry1(_identity);
module.exports = identity;
},{"./internal/_curry1":106,"./internal/_identity":119}],84:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @see R.unless, R.when
 * @example
 *
 *      var incCount = R.ifElse(
 *        R.has('count'),
 *        R.over(R.lensProp('count'), R.inc),
 *        R.assoc('count', 1)
 *      );
 *      incCount({});           //=> { count: 1 }
 *      incCount({ count: 1 }); //=> { count: 2 }
 */


var ifElse = /*#__PURE__*/_curry3(function ifElse(condition, onTrue, onFalse) {
  return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
  });
});
module.exports = ifElse;
},{"./curryN":43,"./internal/_curry3":108}],85:[function(require,module,exports){
var add = /*#__PURE__*/require('./add');

/**
 * Increments its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n + 1
 * @see R.dec
 * @example
 *
 *      R.inc(42); //=> 43
 */


var inc = /*#__PURE__*/add(1);
module.exports = inc;
},{"./add":5}],86:[function(require,module,exports){
module.exports = {};
module.exports.F = /*#__PURE__*/require('./F');
module.exports.T = /*#__PURE__*/require('./T');
module.exports.__ = /*#__PURE__*/require('./__');
module.exports.add = /*#__PURE__*/require('./add');
module.exports.addIndex = /*#__PURE__*/require('./addIndex');
module.exports.adjust = /*#__PURE__*/require('./adjust');
module.exports.all = /*#__PURE__*/require('./all');
module.exports.allPass = /*#__PURE__*/require('./allPass');
module.exports.always = /*#__PURE__*/require('./always');
module.exports.and = /*#__PURE__*/require('./and');
module.exports.any = /*#__PURE__*/require('./any');
module.exports.anyPass = /*#__PURE__*/require('./anyPass');
module.exports.ap = /*#__PURE__*/require('./ap');
module.exports.aperture = /*#__PURE__*/require('./aperture');
module.exports.append = /*#__PURE__*/require('./append');
module.exports.apply = /*#__PURE__*/require('./apply');
module.exports.applySpec = /*#__PURE__*/require('./applySpec');
module.exports.applyTo = /*#__PURE__*/require('./applyTo');
module.exports.ascend = /*#__PURE__*/require('./ascend');
module.exports.assoc = /*#__PURE__*/require('./assoc');
module.exports.assocPath = /*#__PURE__*/require('./assocPath');
module.exports.binary = /*#__PURE__*/require('./binary');
module.exports.bind = /*#__PURE__*/require('./bind');
module.exports.both = /*#__PURE__*/require('./both');
module.exports.call = /*#__PURE__*/require('./call');
module.exports.chain = /*#__PURE__*/require('./chain');
module.exports.clamp = /*#__PURE__*/require('./clamp');
module.exports.clone = /*#__PURE__*/require('./clone');
module.exports.comparator = /*#__PURE__*/require('./comparator');
module.exports.complement = /*#__PURE__*/require('./complement');
module.exports.compose = /*#__PURE__*/require('./compose');
module.exports.composeK = /*#__PURE__*/require('./composeK');
module.exports.composeP = /*#__PURE__*/require('./composeP');
module.exports.concat = /*#__PURE__*/require('./concat');
module.exports.cond = /*#__PURE__*/require('./cond');
module.exports.construct = /*#__PURE__*/require('./construct');
module.exports.constructN = /*#__PURE__*/require('./constructN');
module.exports.contains = /*#__PURE__*/require('./contains');
module.exports.converge = /*#__PURE__*/require('./converge');
module.exports.countBy = /*#__PURE__*/require('./countBy');
module.exports.curry = /*#__PURE__*/require('./curry');
module.exports.curryN = /*#__PURE__*/require('./curryN');
module.exports.dec = /*#__PURE__*/require('./dec');
module.exports.defaultTo = /*#__PURE__*/require('./defaultTo');
module.exports.descend = /*#__PURE__*/require('./descend');
module.exports.difference = /*#__PURE__*/require('./difference');
module.exports.differenceWith = /*#__PURE__*/require('./differenceWith');
module.exports.dissoc = /*#__PURE__*/require('./dissoc');
module.exports.dissocPath = /*#__PURE__*/require('./dissocPath');
module.exports.divide = /*#__PURE__*/require('./divide');
module.exports.drop = /*#__PURE__*/require('./drop');
module.exports.dropLast = /*#__PURE__*/require('./dropLast');
module.exports.dropLastWhile = /*#__PURE__*/require('./dropLastWhile');
module.exports.dropRepeats = /*#__PURE__*/require('./dropRepeats');
module.exports.dropRepeatsWith = /*#__PURE__*/require('./dropRepeatsWith');
module.exports.dropWhile = /*#__PURE__*/require('./dropWhile');
module.exports.either = /*#__PURE__*/require('./either');
module.exports.empty = /*#__PURE__*/require('./empty');
module.exports.endsWith = /*#__PURE__*/require('./endsWith');
module.exports.eqBy = /*#__PURE__*/require('./eqBy');
module.exports.eqProps = /*#__PURE__*/require('./eqProps');
module.exports.equals = /*#__PURE__*/require('./equals');
module.exports.evolve = /*#__PURE__*/require('./evolve');
module.exports.filter = /*#__PURE__*/require('./filter');
module.exports.find = /*#__PURE__*/require('./find');
module.exports.findIndex = /*#__PURE__*/require('./findIndex');
module.exports.findLast = /*#__PURE__*/require('./findLast');
module.exports.findLastIndex = /*#__PURE__*/require('./findLastIndex');
module.exports.flatten = /*#__PURE__*/require('./flatten');
module.exports.flip = /*#__PURE__*/require('./flip');
module.exports.forEach = /*#__PURE__*/require('./forEach');
module.exports.forEachObjIndexed = /*#__PURE__*/require('./forEachObjIndexed');
module.exports.fromPairs = /*#__PURE__*/require('./fromPairs');
module.exports.groupBy = /*#__PURE__*/require('./groupBy');
module.exports.groupWith = /*#__PURE__*/require('./groupWith');
module.exports.gt = /*#__PURE__*/require('./gt');
module.exports.gte = /*#__PURE__*/require('./gte');
module.exports.has = /*#__PURE__*/require('./has');
module.exports.hasIn = /*#__PURE__*/require('./hasIn');
module.exports.head = /*#__PURE__*/require('./head');
module.exports.identical = /*#__PURE__*/require('./identical');
module.exports.identity = /*#__PURE__*/require('./identity');
module.exports.ifElse = /*#__PURE__*/require('./ifElse');
module.exports.inc = /*#__PURE__*/require('./inc');
module.exports.indexBy = /*#__PURE__*/require('./indexBy');
module.exports.indexOf = /*#__PURE__*/require('./indexOf');
module.exports.init = /*#__PURE__*/require('./init');
module.exports.innerJoin = /*#__PURE__*/require('./innerJoin');
module.exports.insert = /*#__PURE__*/require('./insert');
module.exports.insertAll = /*#__PURE__*/require('./insertAll');
module.exports.intersection = /*#__PURE__*/require('./intersection');
module.exports.intersperse = /*#__PURE__*/require('./intersperse');
module.exports.into = /*#__PURE__*/require('./into');
module.exports.invert = /*#__PURE__*/require('./invert');
module.exports.invertObj = /*#__PURE__*/require('./invertObj');
module.exports.invoker = /*#__PURE__*/require('./invoker');
module.exports.is = /*#__PURE__*/require('./is');
module.exports.isEmpty = /*#__PURE__*/require('./isEmpty');
module.exports.isNil = /*#__PURE__*/require('./isNil');
module.exports.join = /*#__PURE__*/require('./join');
module.exports.juxt = /*#__PURE__*/require('./juxt');
module.exports.keys = /*#__PURE__*/require('./keys');
module.exports.keysIn = /*#__PURE__*/require('./keysIn');
module.exports.last = /*#__PURE__*/require('./last');
module.exports.lastIndexOf = /*#__PURE__*/require('./lastIndexOf');
module.exports.length = /*#__PURE__*/require('./length');
module.exports.lens = /*#__PURE__*/require('./lens');
module.exports.lensIndex = /*#__PURE__*/require('./lensIndex');
module.exports.lensPath = /*#__PURE__*/require('./lensPath');
module.exports.lensProp = /*#__PURE__*/require('./lensProp');
module.exports.lift = /*#__PURE__*/require('./lift');
module.exports.liftN = /*#__PURE__*/require('./liftN');
module.exports.lt = /*#__PURE__*/require('./lt');
module.exports.lte = /*#__PURE__*/require('./lte');
module.exports.map = /*#__PURE__*/require('./map');
module.exports.mapAccum = /*#__PURE__*/require('./mapAccum');
module.exports.mapAccumRight = /*#__PURE__*/require('./mapAccumRight');
module.exports.mapObjIndexed = /*#__PURE__*/require('./mapObjIndexed');
module.exports.match = /*#__PURE__*/require('./match');
module.exports.mathMod = /*#__PURE__*/require('./mathMod');
module.exports.max = /*#__PURE__*/require('./max');
module.exports.maxBy = /*#__PURE__*/require('./maxBy');
module.exports.mean = /*#__PURE__*/require('./mean');
module.exports.median = /*#__PURE__*/require('./median');
module.exports.memoize = /*#__PURE__*/require('./memoize');
module.exports.memoizeWith = /*#__PURE__*/require('./memoizeWith');
module.exports.merge = /*#__PURE__*/require('./merge');
module.exports.mergeAll = /*#__PURE__*/require('./mergeAll');
module.exports.mergeDeepLeft = /*#__PURE__*/require('./mergeDeepLeft');
module.exports.mergeDeepRight = /*#__PURE__*/require('./mergeDeepRight');
module.exports.mergeDeepWith = /*#__PURE__*/require('./mergeDeepWith');
module.exports.mergeDeepWithKey = /*#__PURE__*/require('./mergeDeepWithKey');
module.exports.mergeWith = /*#__PURE__*/require('./mergeWith');
module.exports.mergeWithKey = /*#__PURE__*/require('./mergeWithKey');
module.exports.min = /*#__PURE__*/require('./min');
module.exports.minBy = /*#__PURE__*/require('./minBy');
module.exports.modulo = /*#__PURE__*/require('./modulo');
module.exports.multiply = /*#__PURE__*/require('./multiply');
module.exports.nAry = /*#__PURE__*/require('./nAry');
module.exports.negate = /*#__PURE__*/require('./negate');
module.exports.none = /*#__PURE__*/require('./none');
module.exports.not = /*#__PURE__*/require('./not');
module.exports.nth = /*#__PURE__*/require('./nth');
module.exports.nthArg = /*#__PURE__*/require('./nthArg');
module.exports.o = /*#__PURE__*/require('./o');
module.exports.objOf = /*#__PURE__*/require('./objOf');
module.exports.of = /*#__PURE__*/require('./of');
module.exports.omit = /*#__PURE__*/require('./omit');
module.exports.once = /*#__PURE__*/require('./once');
module.exports.or = /*#__PURE__*/require('./or');
module.exports.over = /*#__PURE__*/require('./over');
module.exports.pair = /*#__PURE__*/require('./pair');
module.exports.partial = /*#__PURE__*/require('./partial');
module.exports.partialRight = /*#__PURE__*/require('./partialRight');
module.exports.partition = /*#__PURE__*/require('./partition');
module.exports.path = /*#__PURE__*/require('./path');
module.exports.pathEq = /*#__PURE__*/require('./pathEq');
module.exports.pathOr = /*#__PURE__*/require('./pathOr');
module.exports.pathSatisfies = /*#__PURE__*/require('./pathSatisfies');
module.exports.pick = /*#__PURE__*/require('./pick');
module.exports.pickAll = /*#__PURE__*/require('./pickAll');
module.exports.pickBy = /*#__PURE__*/require('./pickBy');
module.exports.pipe = /*#__PURE__*/require('./pipe');
module.exports.pipeK = /*#__PURE__*/require('./pipeK');
module.exports.pipeP = /*#__PURE__*/require('./pipeP');
module.exports.pluck = /*#__PURE__*/require('./pluck');
module.exports.prepend = /*#__PURE__*/require('./prepend');
module.exports.product = /*#__PURE__*/require('./product');
module.exports.project = /*#__PURE__*/require('./project');
module.exports.prop = /*#__PURE__*/require('./prop');
module.exports.propEq = /*#__PURE__*/require('./propEq');
module.exports.propIs = /*#__PURE__*/require('./propIs');
module.exports.propOr = /*#__PURE__*/require('./propOr');
module.exports.propSatisfies = /*#__PURE__*/require('./propSatisfies');
module.exports.props = /*#__PURE__*/require('./props');
module.exports.range = /*#__PURE__*/require('./range');
module.exports.reduce = /*#__PURE__*/require('./reduce');
module.exports.reduceBy = /*#__PURE__*/require('./reduceBy');
module.exports.reduceRight = /*#__PURE__*/require('./reduceRight');
module.exports.reduceWhile = /*#__PURE__*/require('./reduceWhile');
module.exports.reduced = /*#__PURE__*/require('./reduced');
module.exports.reject = /*#__PURE__*/require('./reject');
module.exports.remove = /*#__PURE__*/require('./remove');
module.exports.repeat = /*#__PURE__*/require('./repeat');
module.exports.replace = /*#__PURE__*/require('./replace');
module.exports.reverse = /*#__PURE__*/require('./reverse');
module.exports.scan = /*#__PURE__*/require('./scan');
module.exports.sequence = /*#__PURE__*/require('./sequence');
module.exports.set = /*#__PURE__*/require('./set');
module.exports.slice = /*#__PURE__*/require('./slice');
module.exports.sort = /*#__PURE__*/require('./sort');
module.exports.sortBy = /*#__PURE__*/require('./sortBy');
module.exports.sortWith = /*#__PURE__*/require('./sortWith');
module.exports.split = /*#__PURE__*/require('./split');
module.exports.splitAt = /*#__PURE__*/require('./splitAt');
module.exports.splitEvery = /*#__PURE__*/require('./splitEvery');
module.exports.splitWhen = /*#__PURE__*/require('./splitWhen');
module.exports.startsWith = /*#__PURE__*/require('./startsWith');
module.exports.subtract = /*#__PURE__*/require('./subtract');
module.exports.sum = /*#__PURE__*/require('./sum');
module.exports.symmetricDifference = /*#__PURE__*/require('./symmetricDifference');
module.exports.symmetricDifferenceWith = /*#__PURE__*/require('./symmetricDifferenceWith');
module.exports.tail = /*#__PURE__*/require('./tail');
module.exports.take = /*#__PURE__*/require('./take');
module.exports.takeLast = /*#__PURE__*/require('./takeLast');
module.exports.takeLastWhile = /*#__PURE__*/require('./takeLastWhile');
module.exports.takeWhile = /*#__PURE__*/require('./takeWhile');
module.exports.tap = /*#__PURE__*/require('./tap');
module.exports.test = /*#__PURE__*/require('./test');
module.exports.times = /*#__PURE__*/require('./times');
module.exports.toLower = /*#__PURE__*/require('./toLower');
module.exports.toPairs = /*#__PURE__*/require('./toPairs');
module.exports.toPairsIn = /*#__PURE__*/require('./toPairsIn');
module.exports.toString = /*#__PURE__*/require('./toString');
module.exports.toUpper = /*#__PURE__*/require('./toUpper');
module.exports.transduce = /*#__PURE__*/require('./transduce');
module.exports.transpose = /*#__PURE__*/require('./transpose');
module.exports.traverse = /*#__PURE__*/require('./traverse');
module.exports.trim = /*#__PURE__*/require('./trim');
module.exports.tryCatch = /*#__PURE__*/require('./tryCatch');
module.exports.type = /*#__PURE__*/require('./type');
module.exports.unapply = /*#__PURE__*/require('./unapply');
module.exports.unary = /*#__PURE__*/require('./unary');
module.exports.uncurryN = /*#__PURE__*/require('./uncurryN');
module.exports.unfold = /*#__PURE__*/require('./unfold');
module.exports.union = /*#__PURE__*/require('./union');
module.exports.unionWith = /*#__PURE__*/require('./unionWith');
module.exports.uniq = /*#__PURE__*/require('./uniq');
module.exports.uniqBy = /*#__PURE__*/require('./uniqBy');
module.exports.uniqWith = /*#__PURE__*/require('./uniqWith');
module.exports.unless = /*#__PURE__*/require('./unless');
module.exports.unnest = /*#__PURE__*/require('./unnest');
module.exports.until = /*#__PURE__*/require('./until');
module.exports.update = /*#__PURE__*/require('./update');
module.exports.useWith = /*#__PURE__*/require('./useWith');
module.exports.values = /*#__PURE__*/require('./values');
module.exports.valuesIn = /*#__PURE__*/require('./valuesIn');
module.exports.view = /*#__PURE__*/require('./view');
module.exports.when = /*#__PURE__*/require('./when');
module.exports.where = /*#__PURE__*/require('./where');
module.exports.whereEq = /*#__PURE__*/require('./whereEq');
module.exports.without = /*#__PURE__*/require('./without');
module.exports.xprod = /*#__PURE__*/require('./xprod');
module.exports.zip = /*#__PURE__*/require('./zip');
module.exports.zipObj = /*#__PURE__*/require('./zipObj');
module.exports.zipWith = /*#__PURE__*/require('./zipWith');
},{"./F":2,"./T":3,"./__":4,"./add":5,"./addIndex":6,"./adjust":7,"./all":8,"./allPass":9,"./always":10,"./and":11,"./any":12,"./anyPass":13,"./ap":14,"./aperture":15,"./append":16,"./apply":17,"./applySpec":18,"./applyTo":19,"./ascend":20,"./assoc":21,"./assocPath":22,"./binary":23,"./bind":24,"./both":25,"./call":26,"./chain":27,"./clamp":28,"./clone":29,"./comparator":30,"./complement":31,"./compose":32,"./composeK":33,"./composeP":34,"./concat":35,"./cond":36,"./construct":37,"./constructN":38,"./contains":39,"./converge":40,"./countBy":41,"./curry":42,"./curryN":43,"./dec":44,"./defaultTo":45,"./descend":46,"./difference":47,"./differenceWith":48,"./dissoc":49,"./dissocPath":50,"./divide":51,"./drop":52,"./dropLast":53,"./dropLastWhile":54,"./dropRepeats":55,"./dropRepeatsWith":56,"./dropWhile":57,"./either":58,"./empty":59,"./endsWith":60,"./eqBy":61,"./eqProps":62,"./equals":63,"./evolve":64,"./filter":65,"./find":66,"./findIndex":67,"./findLast":68,"./findLastIndex":69,"./flatten":70,"./flip":71,"./forEach":72,"./forEachObjIndexed":73,"./fromPairs":74,"./groupBy":75,"./groupWith":76,"./gt":77,"./gte":78,"./has":79,"./hasIn":80,"./head":81,"./identical":82,"./identity":83,"./ifElse":84,"./inc":85,"./indexBy":87,"./indexOf":88,"./init":89,"./innerJoin":90,"./insert":91,"./insertAll":92,"./intersection":165,"./intersperse":166,"./into":167,"./invert":168,"./invertObj":169,"./invoker":170,"./is":171,"./isEmpty":172,"./isNil":173,"./join":174,"./juxt":175,"./keys":176,"./keysIn":177,"./last":178,"./lastIndexOf":179,"./length":180,"./lens":181,"./lensIndex":182,"./lensPath":183,"./lensProp":184,"./lift":185,"./liftN":186,"./lt":187,"./lte":188,"./map":189,"./mapAccum":190,"./mapAccumRight":191,"./mapObjIndexed":192,"./match":193,"./mathMod":194,"./max":195,"./maxBy":196,"./mean":197,"./median":198,"./memoize":199,"./memoizeWith":200,"./merge":201,"./mergeAll":202,"./mergeDeepLeft":203,"./mergeDeepRight":204,"./mergeDeepWith":205,"./mergeDeepWithKey":206,"./mergeWith":207,"./mergeWithKey":208,"./min":209,"./minBy":210,"./modulo":211,"./multiply":212,"./nAry":213,"./negate":214,"./none":215,"./not":216,"./nth":217,"./nthArg":218,"./o":219,"./objOf":220,"./of":221,"./omit":222,"./once":223,"./or":224,"./over":225,"./pair":226,"./partial":227,"./partialRight":228,"./partition":229,"./path":230,"./pathEq":231,"./pathOr":232,"./pathSatisfies":233,"./pick":234,"./pickAll":235,"./pickBy":236,"./pipe":237,"./pipeK":238,"./pipeP":239,"./pluck":240,"./prepend":241,"./product":242,"./project":243,"./prop":244,"./propEq":245,"./propIs":246,"./propOr":247,"./propSatisfies":248,"./props":249,"./range":250,"./reduce":251,"./reduceBy":252,"./reduceRight":253,"./reduceWhile":254,"./reduced":255,"./reject":256,"./remove":257,"./repeat":258,"./replace":259,"./reverse":260,"./scan":261,"./sequence":262,"./set":263,"./slice":264,"./sort":265,"./sortBy":266,"./sortWith":267,"./split":268,"./splitAt":269,"./splitEvery":270,"./splitWhen":271,"./startsWith":272,"./subtract":273,"./sum":274,"./symmetricDifference":275,"./symmetricDifferenceWith":276,"./tail":277,"./take":278,"./takeLast":279,"./takeLastWhile":280,"./takeWhile":281,"./tap":282,"./test":283,"./times":284,"./toLower":285,"./toPairs":286,"./toPairsIn":287,"./toString":288,"./toUpper":289,"./transduce":290,"./transpose":291,"./traverse":292,"./trim":293,"./tryCatch":294,"./type":295,"./unapply":296,"./unary":297,"./uncurryN":298,"./unfold":299,"./union":300,"./unionWith":301,"./uniq":302,"./uniqBy":303,"./uniqWith":304,"./unless":305,"./unnest":306,"./until":307,"./update":308,"./useWith":309,"./values":310,"./valuesIn":311,"./view":312,"./when":313,"./where":314,"./whereEq":315,"./without":316,"./xprod":317,"./zip":318,"./zipObj":319,"./zipWith":320}],87:[function(require,module,exports){
var reduceBy = /*#__PURE__*/require('./reduceBy');

/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
 * @param {Function} fn Function :: a -> String
 * @param {Array} array The array of objects to index
 * @return {Object} An object indexing each array element by the given property.
 * @example
 *
 *      var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 *      R.indexBy(R.prop('id'), list);
 *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 */


var indexBy = /*#__PURE__*/reduceBy(function (acc, elem) {
  return elem;
}, null);
module.exports = indexBy;
},{"./reduceBy":252}],88:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _indexOf = /*#__PURE__*/require('./internal/_indexOf');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.lastIndexOf
 * @example
 *
 *      R.indexOf(3, [1,2,3,4]); //=> 2
 *      R.indexOf(10, [1,2,3,4]); //=> -1
 */


var indexOf = /*#__PURE__*/_curry2(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !_isArray(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
});
module.exports = indexOf;
},{"./internal/_curry2":107,"./internal/_indexOf":120,"./internal/_isArray":122}],89:[function(require,module,exports){
var slice = /*#__PURE__*/require('./slice');

/**
 * Returns all but the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.last, R.head, R.tail
 * @example
 *
 *      R.init([1, 2, 3]);  //=> [1, 2]
 *      R.init([1, 2]);     //=> [1]
 *      R.init([1]);        //=> []
 *      R.init([]);         //=> []
 *
 *      R.init('abc');  //=> 'ab'
 *      R.init('ab');   //=> 'a'
 *      R.init('a');    //=> ''
 *      R.init('');     //=> ''
 */


var init = /*#__PURE__*/slice(0, -1);
module.exports = init;
},{"./slice":264}],90:[function(require,module,exports){
var _containsWith = /*#__PURE__*/require('./internal/_containsWith');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _filter = /*#__PURE__*/require('./internal/_filter');

/**
 * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list
 * `xs'` comprising each of the elements of `xs` which is equal to one or more
 * elements of `ys` according to `pred`.
 *
 * `pred` must be a binary function expecting an element from each list.
 *
 * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should
 * not be significant, but since `xs'` is ordered the implementation guarantees
 * that its values are in the same order as they appear in `xs`. Duplicates are
 * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Relation
 * @sig ((a, b) -> Boolean) -> [a] -> [b] -> [a]
 * @param {Function} pred
 * @param {Array} xs
 * @param {Array} ys
 * @return {Array}
 * @see R.intersection
 * @example
 *
 *      R.innerJoin(
 *        (record, id) => record.id === id,
 *        [{id: 824, name: 'Richie Furay'},
 *         {id: 956, name: 'Dewey Martin'},
 *         {id: 313, name: 'Bruce Palmer'},
 *         {id: 456, name: 'Stephen Stills'},
 *         {id: 177, name: 'Neil Young'}],
 *        [177, 456, 999]
 *      );
 *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
 */


var innerJoin = /*#__PURE__*/_curry3(function innerJoin(pred, xs, ys) {
  return _filter(function (x) {
    return _containsWith(pred, x, ys);
  }, xs);
});
module.exports = innerJoin;
},{"./internal/_containsWith":104,"./internal/_curry3":108,"./internal/_filter":114}],91:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Inserts the supplied element into the list, at the specified `index`. _Note that

 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} index The position to insert the element
 * @param {*} elt The element to insert into the Array
 * @param {Array} list The list to insert into
 * @return {Array} A new Array with `elt` inserted at `index`.
 * @example
 *
 *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */


var insert = /*#__PURE__*/_curry3(function insert(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});
module.exports = insert;
},{"./internal/_curry3":108}],92:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Inserts the sub-list into the list, at the specified `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig Number -> [a] -> [a] -> [a]
 * @param {Number} index The position to insert the sub-list
 * @param {Array} elts The sub-list to insert into the Array
 * @param {Array} list The list to insert the sub-list into
 * @return {Array} A new Array with `elts` inserted starting at `index`.
 * @example
 *
 *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 */


var insertAll = /*#__PURE__*/_curry3(function insertAll(idx, elts, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  return [].concat(Array.prototype.slice.call(list, 0, idx), elts, Array.prototype.slice.call(list, idx));
});
module.exports = insertAll;
},{"./internal/_curry3":108}],93:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./_contains');

var _Set = /*#__PURE__*/function () {

  function _Set() {
    /* globals Set */
    this._nativeSet = typeof Set === 'function' ? new Set() : null;
    this._items = {};
  }

  // until we figure out why jsdoc chokes on this
  // @param item The item to add to the Set
  // @returns {boolean} true if the item did not exist prior, otherwise false
  //
  _Set.prototype.add = function (item) {
    return !hasOrAdd(item, true, this);
  };

  //
  // @param item The item to check for existence in the Set
  // @returns {boolean} true if the item exists in the Set, otherwise false
  //
  _Set.prototype.has = function (item) {
    return hasOrAdd(item, false, this);
  };

  //
  // Combines the logic for checking whether an item is a member of the set and
  // for adding a new item to the set.
  //
  // @param item       The item to check or add to the Set instance.
  // @param shouldAdd  If true, the item will be added to the set if it doesn't
  //                   already exist.
  // @param set        The set instance to check or add to.
  // @return {boolean} true if the item already existed, otherwise false.
  //
  return _Set;
}();

function hasOrAdd(item, shouldAdd, set) {
  var type = typeof item;
  var prevSize, newSize;
  switch (type) {
    case 'string':
    case 'number':
      // distinguish between +0 and -0
      if (item === 0 && 1 / item === -Infinity) {
        if (set._items['-0']) {
          return true;
        } else {
          if (shouldAdd) {
            set._items['-0'] = true;
          }
          return false;
        }
      }
      // these types can all utilise the native Set
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;
          set._nativeSet.add(item);
          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = {};
            set._items[type][item] = true;
          }
          return false;
        } else if (item in set._items[type]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][item] = true;
          }
          return false;
        }
      }

    case 'boolean':
      // set._items['boolean'] holds a two element array
      // representing [ falseExists, trueExists ]
      if (type in set._items) {
        var bIdx = item ? 1 : 0;
        if (set._items[type][bIdx]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][bIdx] = true;
          }
          return false;
        }
      } else {
        if (shouldAdd) {
          set._items[type] = item ? [false, true] : [true, false];
        }
        return false;
      }

    case 'function':
      // compare functions for reference equality
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;
          set._nativeSet.add(item);
          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = [item];
          }
          return false;
        }
        if (!_contains(item, set._items[type])) {
          if (shouldAdd) {
            set._items[type].push(item);
          }
          return false;
        }
        return true;
      }

    case 'undefined':
      if (set._items[type]) {
        return true;
      } else {
        if (shouldAdd) {
          set._items[type] = true;
        }
        return false;
      }

    case 'object':
      if (item === null) {
        if (!set._items['null']) {
          if (shouldAdd) {
            set._items['null'] = true;
          }
          return false;
        }
        return true;
      }
    /* falls through */
    default:
      // reduce the search size of heterogeneous sets by creating buckets
      // for each type.
      type = Object.prototype.toString.call(item);
      if (!(type in set._items)) {
        if (shouldAdd) {
          set._items[type] = [item];
        }
        return false;
      }
      // scan through all previously applied items
      if (!_contains(item, set._items[type])) {
        if (shouldAdd) {
          set._items[type].push(item);
        }
        return false;
      }
      return true;
  }
}

// A simple Set type that honours R.equals semantics
module.exports = _Set;
},{"./_contains":103}],94:[function(require,module,exports){
function _aperture(n, list) {
  var idx = 0;
  var limit = list.length - (n - 1);
  var acc = new Array(limit >= 0 ? limit : 0);
  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
    idx += 1;
  }
  return acc;
}
module.exports = _aperture;
},{}],95:[function(require,module,exports){
function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}
module.exports = _arity;
},{}],96:[function(require,module,exports){
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}
module.exports = _arrayFromIterator;
},{}],97:[function(require,module,exports){
var _objectAssign = /*#__PURE__*/require('./_objectAssign');

module.exports = typeof Object.assign === 'function' ? Object.assign : _objectAssign;
},{"./_objectAssign":134}],98:[function(require,module,exports){
var _isArray = /*#__PURE__*/require('./_isArray');

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */


function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}
module.exports = _checkForMethod;
},{"./_isArray":122}],99:[function(require,module,exports){
var _cloneRegExp = /*#__PURE__*/require('./_cloneRegExp');

var type = /*#__PURE__*/require('../type');

/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */


function _clone(value, refFrom, refTo, deep) {
  var copy = function copy(copiedValue) {
    var len = refFrom.length;
    var idx = 0;
    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }
      idx += 1;
    }
    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;
    for (var key in value) {
      copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
    }
    return copiedValue;
  };
  switch (type(value)) {
    case 'Object':
      return copy({});
    case 'Array':
      return copy([]);
    case 'Date':
      return new Date(value.valueOf());
    case 'RegExp':
      return _cloneRegExp(value);
    default:
      return value;
  }
}
module.exports = _clone;
},{"../type":295,"./_cloneRegExp":100}],100:[function(require,module,exports){
function _cloneRegExp(pattern) {
                                  return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
}
module.exports = _cloneRegExp;
},{}],101:[function(require,module,exports){
function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}
module.exports = _complement;
},{}],102:[function(require,module,exports){
/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];

  idx = 0;
  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }
  idx = 0;
  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }
  return result;
}
module.exports = _concat;
},{}],103:[function(require,module,exports){
var _indexOf = /*#__PURE__*/require('./_indexOf');

function _contains(a, list) {
  return _indexOf(list, a, 0) >= 0;
}
module.exports = _contains;
},{"./_indexOf":120}],104:[function(require,module,exports){
function _containsWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}
module.exports = _containsWith;
},{}],105:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./_arity');

var _curry2 = /*#__PURE__*/require('./_curry2');

function _createPartialApplicator(concat) {
  return _curry2(function (fn, args) {
    return _arity(Math.max(0, fn.length - args.length), function () {
      return fn.apply(this, concat(args, arguments));
    });
  });
}
module.exports = _createPartialApplicator;
},{"./_arity":95,"./_curry2":107}],106:[function(require,module,exports){
var _isPlaceholder = /*#__PURE__*/require('./_isPlaceholder');

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}
module.exports = _curry1;
},{"./_isPlaceholder":128}],107:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./_curry1');

var _isPlaceholder = /*#__PURE__*/require('./_isPlaceholder');

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}
module.exports = _curry2;
},{"./_curry1":106,"./_isPlaceholder":128}],108:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./_curry1');

var _curry2 = /*#__PURE__*/require('./_curry2');

var _isPlaceholder = /*#__PURE__*/require('./_isPlaceholder');

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function (_c) {
          return fn(a, b, _c);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}
module.exports = _curry3;
},{"./_curry1":106,"./_curry2":107,"./_isPlaceholder":128}],109:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./_arity');

var _isPlaceholder = /*#__PURE__*/require('./_isPlaceholder');

/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
  };
}
module.exports = _curryN;
},{"./_arity":95,"./_isPlaceholder":128}],110:[function(require,module,exports){
var _isArray = /*#__PURE__*/require('./_isArray');

var _isTransformer = /*#__PURE__*/require('./_isTransformer');

/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */


function _dispatchable(methodNames, xf, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }
    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();
    if (!_isArray(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }
        idx += 1;
      }
      if (_isTransformer(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
}
module.exports = _dispatchable;
},{"./_isArray":122,"./_isTransformer":131}],111:[function(require,module,exports){
var take = /*#__PURE__*/require('../take');

function dropLast(n, xs) {
  return take(n < xs.length ? xs.length - n : 0, xs);
}
module.exports = dropLast;
},{"../take":278}],112:[function(require,module,exports){
var slice = /*#__PURE__*/require('../slice');

function dropLastWhile(pred, xs) {
  var idx = xs.length - 1;
  while (idx >= 0 && pred(xs[idx])) {
    idx -= 1;
  }
  return slice(0, idx + 1, xs);
}
module.exports = dropLastWhile;
},{"../slice":264}],113:[function(require,module,exports){
var _arrayFromIterator = /*#__PURE__*/require('./_arrayFromIterator');

var _containsWith = /*#__PURE__*/require('./_containsWith');

var _functionName = /*#__PURE__*/require('./_functionName');

var _has = /*#__PURE__*/require('./_has');

var identical = /*#__PURE__*/require('../identical');

var keys = /*#__PURE__*/require('../keys');

var type = /*#__PURE__*/require('../type');

/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparision of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */

function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);
  var b = _arrayFromIterator(bIterator);

  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }

  // if *a* array contains any element that is not included in *b*
  return !_containsWith(function (b, aItem) {
    return !_containsWith(eq, aItem, b);
  }, b, a);
}

function _equals(a, b, stackA, stackB) {
  if (identical(a, b)) {
    return true;
  }

  var typeA = type(a);

  if (typeA !== type(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
        return a === b;
      }
      break;
    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case 'Date':
      if (!identical(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case 'Error':
      return a.name === b.name && a.message === b.message;
    case 'RegExp':
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }
      break;
  }

  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;
    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = keys(a);
  if (keysA.length !== keys(b).length) {
    return false;
  }

  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);

  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}
module.exports = _equals;
},{"../identical":82,"../keys":176,"../type":295,"./_arrayFromIterator":96,"./_containsWith":104,"./_functionName":117,"./_has":118}],114:[function(require,module,exports){
function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
}
module.exports = _filter;
},{}],115:[function(require,module,exports){
var _forceReduced = /*#__PURE__*/require('./_forceReduced');

var _isArrayLike = /*#__PURE__*/require('./_isArrayLike');

var _reduce = /*#__PURE__*/require('./_reduce');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var preservingReduced = function (xf) {
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function (result) {
      return xf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      var ret = xf['@@transducer/step'](result, input);
      return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
    }
  };
};

var _flatCat = function _xcat(xf) {
  var rxf = preservingReduced(xf);
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function (result) {
      return rxf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      return !_isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
    }
  };
};

module.exports = _flatCat;
},{"./_forceReduced":116,"./_isArrayLike":123,"./_reduce":139,"./_xfBase":153}],116:[function(require,module,exports){
function _forceReduced(x) {
  return {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}
module.exports = _forceReduced;
},{}],117:[function(require,module,exports){
function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}
module.exports = _functionName;
},{}],118:[function(require,module,exports){
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
module.exports = _has;
},{}],119:[function(require,module,exports){
function _identity(x) {
  return x;
}
module.exports = _identity;
},{}],120:[function(require,module,exports){
var equals = /*#__PURE__*/require('../equals');

function _indexOf(list, a, idx) {
  var inf, item;
  // Array.prototype.indexOf doesn't exist below IE9
  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === 'number' && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        // non-zero numbers can utilise Set
        return list.indexOf(a, idx);

      // all these types can utilise Set
      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }
    }
  }
  // anything else not covered above, defer to R.equals
  while (idx < list.length) {
    if (equals(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}
module.exports = _indexOf;
},{"../equals":63}],121:[function(require,module,exports){
var _has = /*#__PURE__*/require('./_has');

var toString = Object.prototype.toString;
var _isArguments = function () {
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return _has('callee', x);
  };
};

module.exports = _isArguments;
},{"./_has":118}],122:[function(require,module,exports){
/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
module.exports = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};
},{}],123:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./_curry1');

var _isArray = /*#__PURE__*/require('./_isArray');

var _isString = /*#__PURE__*/require('./_isString');

/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */


var _isArrayLike = /*#__PURE__*/_curry1(function isArrayLike(x) {
  if (_isArray(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== 'object') {
    return false;
  }
  if (_isString(x)) {
    return false;
  }
  if (x.nodeType === 1) {
    return !!x.length;
  }
  if (x.length === 0) {
    return true;
  }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});
module.exports = _isArrayLike;
},{"./_curry1":106,"./_isArray":122,"./_isString":130}],124:[function(require,module,exports){
function _isFunction(x) {
  return Object.prototype.toString.call(x) === '[object Function]';
}
module.exports = _isFunction;
},{}],125:[function(require,module,exports){
/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
module.exports = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};
},{}],126:[function(require,module,exports){
function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
}
module.exports = _isNumber;
},{}],127:[function(require,module,exports){
function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}
module.exports = _isObject;
},{}],128:[function(require,module,exports){
function _isPlaceholder(a) {
       return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}
module.exports = _isPlaceholder;
},{}],129:[function(require,module,exports){
function _isRegExp(x) {
  return Object.prototype.toString.call(x) === '[object RegExp]';
}
module.exports = _isRegExp;
},{}],130:[function(require,module,exports){
function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}
module.exports = _isString;
},{}],131:[function(require,module,exports){
function _isTransformer(obj) {
  return typeof obj['@@transducer/step'] === 'function';
}
module.exports = _isTransformer;
},{}],132:[function(require,module,exports){
var _isArrayLike = /*#__PURE__*/require('./_isArrayLike');

/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */


function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if (_isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;
        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
}
module.exports = _makeFlat;
},{"./_isArrayLike":123}],133:[function(require,module,exports){
function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
}
module.exports = _map;
},{}],134:[function(require,module,exports){
var _has = /*#__PURE__*/require('./_has');

// Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign


function _objectAssign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  var idx = 1;
  var length = arguments.length;
  while (idx < length) {
    var source = arguments[idx];
    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
    idx += 1;
  }
  return output;
}
module.exports = _objectAssign;
},{"./_has":118}],135:[function(require,module,exports){
function _of(x) {
  return [x];
}
module.exports = _of;
},{}],136:[function(require,module,exports){
function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}
module.exports = _pipe;
},{}],137:[function(require,module,exports){
function _pipeP(f, g) {
  return function () {
    var ctx = this;
    return f.apply(ctx, arguments).then(function (x) {
      return g.call(ctx, x);
    });
  };
}
module.exports = _pipeP;
},{}],138:[function(require,module,exports){
function _quote(s) {
  var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
  .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');

  return '"' + escaped.replace(/"/g, '\\"') + '"';
}
module.exports = _quote;
},{}],139:[function(require,module,exports){
var _isArrayLike = /*#__PURE__*/require('./_isArrayLike');

var _xwrap = /*#__PURE__*/require('./_xwrap');

var bind = /*#__PURE__*/require('../bind');

function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    idx += 1;
  }
  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    step = iter.next();
  }
  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = _xwrap(fn);
  }
  if (_isArrayLike(list)) {
    return _arrayReduce(fn, acc, list);
  }
  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }
  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }
  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }
  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}
module.exports = _reduce;
},{"../bind":24,"./_isArrayLike":123,"./_xwrap":164}],140:[function(require,module,exports){
function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x : {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}
module.exports = _reduced;
},{}],141:[function(require,module,exports){
var _assign = /*#__PURE__*/require('./_assign');

var _identity = /*#__PURE__*/require('./_identity');

var _isArrayLike = /*#__PURE__*/require('./_isArrayLike');

var _isTransformer = /*#__PURE__*/require('./_isTransformer');

var objOf = /*#__PURE__*/require('../objOf');

var _stepCatArray = {
  '@@transducer/init': Array,
  '@@transducer/step': function (xs, x) {
    xs.push(x);
    return xs;
  },
  '@@transducer/result': _identity
};
var _stepCatString = {
  '@@transducer/init': String,
  '@@transducer/step': function (a, b) {
    return a + b;
  },
  '@@transducer/result': _identity
};
var _stepCatObject = {
  '@@transducer/init': Object,
  '@@transducer/step': function (result, input) {
    return _assign(result, _isArrayLike(input) ? objOf(input[0], input[1]) : input);
  },
  '@@transducer/result': _identity
};

function _stepCat(obj) {
  if (_isTransformer(obj)) {
    return obj;
  }
  if (_isArrayLike(obj)) {
    return _stepCatArray;
  }
  if (typeof obj === 'string') {
    return _stepCatString;
  }
  if (typeof obj === 'object') {
    return _stepCatObject;
  }
  throw new Error('Cannot create transformer for ' + obj);
}
module.exports = _stepCat;
},{"../objOf":220,"./_assign":97,"./_identity":119,"./_isArrayLike":123,"./_isTransformer":131}],142:[function(require,module,exports){
/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
var pad = function pad(n) {
  return (n < 10 ? '0' : '') + n;
};

var _toISOString = typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
  return d.toISOString();
} : function _toISOString(d) {
  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
};

module.exports = _toISOString;
},{}],143:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./_contains');

var _map = /*#__PURE__*/require('./_map');

var _quote = /*#__PURE__*/require('./_quote');

var _toISOString = /*#__PURE__*/require('./_toISOString');

var keys = /*#__PURE__*/require('../keys');

var reject = /*#__PURE__*/require('../reject');

function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return _contains(y, xs) ? '<Circular>' : _toString(y, xs);
  };

  //  mapPairs :: (Object, [String]) -> [String]
  var mapPairs = function (obj, keys) {
    return _map(function (k) {
      return _quote(k) + ': ' + recur(obj[k]);
    }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
    case '[object Array]':
      return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
        return (/^\d+$/.test(k)
        );
      }, keys(x)))).join(', ') + ']';
    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';
    case '[object Null]':
      return 'null';
    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
    case '[object Undefined]':
      return 'undefined';
    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();
        if (repr !== '[object Object]') {
          return repr;
        }
      }
      return '{' + mapPairs(x, keys(x)).join(', ') + '}';
  }
}
module.exports = _toString;
},{"../keys":176,"../reject":256,"./_contains":103,"./_map":133,"./_quote":138,"./_toISOString":142}],144:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XAll = /*#__PURE__*/function () {

  function XAll(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }
  XAll.prototype['@@transducer/init'] = _xfBase.init;
  XAll.prototype['@@transducer/result'] = function (result) {
    if (this.all) {
      result = this.xf['@@transducer/step'](result, true);
    }
    return this.xf['@@transducer/result'](result);
  };
  XAll.prototype['@@transducer/step'] = function (result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = _reduced(this.xf['@@transducer/step'](result, false));
    }
    return result;
  };

  return XAll;
}();

var _xall = /*#__PURE__*/_curry2(function _xall(f, xf) {
  return new XAll(f, xf);
});
module.exports = _xall;
},{"./_curry2":107,"./_reduced":140,"./_xfBase":153}],145:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XAny = /*#__PURE__*/function () {

  function XAny(f, xf) {
    this.xf = xf;
    this.f = f;
    this.any = false;
  }
  XAny.prototype['@@transducer/init'] = _xfBase.init;
  XAny.prototype['@@transducer/result'] = function (result) {
    if (!this.any) {
      result = this.xf['@@transducer/step'](result, false);
    }
    return this.xf['@@transducer/result'](result);
  };
  XAny.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.any = true;
      result = _reduced(this.xf['@@transducer/step'](result, true));
    }
    return result;
  };

  return XAny;
}();

var _xany = /*#__PURE__*/_curry2(function _xany(f, xf) {
  return new XAny(f, xf);
});
module.exports = _xany;
},{"./_curry2":107,"./_reduced":140,"./_xfBase":153}],146:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./_concat');

var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XAperture = /*#__PURE__*/function () {

  function XAperture(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }
  XAperture.prototype['@@transducer/init'] = _xfBase.init;
  XAperture.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };
  XAperture.prototype['@@transducer/step'] = function (result, input) {
    this.store(input);
    return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
  };
  XAperture.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };
  XAperture.prototype.getCopy = function () {
    return _concat(Array.prototype.slice.call(this.acc, this.pos), Array.prototype.slice.call(this.acc, 0, this.pos));
  };

  return XAperture;
}();

var _xaperture = /*#__PURE__*/_curry2(function _xaperture(n, xf) {
  return new XAperture(n, xf);
});
module.exports = _xaperture;
},{"./_concat":102,"./_curry2":107,"./_xfBase":153}],147:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _flatCat = /*#__PURE__*/require('./_flatCat');

var map = /*#__PURE__*/require('../map');

var _xchain = /*#__PURE__*/_curry2(function _xchain(f, xf) {
  return map(f, _flatCat(xf));
});
module.exports = _xchain;
},{"../map":189,"./_curry2":107,"./_flatCat":115}],148:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDrop = /*#__PURE__*/function () {

  function XDrop(n, xf) {
    this.xf = xf;
    this.n = n;
  }
  XDrop.prototype['@@transducer/init'] = _xfBase.init;
  XDrop.prototype['@@transducer/result'] = _xfBase.result;
  XDrop.prototype['@@transducer/step'] = function (result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }
    return this.xf['@@transducer/step'](result, input);
  };

  return XDrop;
}();

var _xdrop = /*#__PURE__*/_curry2(function _xdrop(n, xf) {
  return new XDrop(n, xf);
});
module.exports = _xdrop;
},{"./_curry2":107,"./_xfBase":153}],149:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDropLast = /*#__PURE__*/function () {

  function XDropLast(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }
  XDropLast.prototype['@@transducer/init'] = _xfBase.init;
  XDropLast.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };
  XDropLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.full) {
      result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
    }
    this.store(input);
    return result;
  };
  XDropLast.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  return XDropLast;
}();

var _xdropLast = /*#__PURE__*/_curry2(function _xdropLast(n, xf) {
  return new XDropLast(n, xf);
});
module.exports = _xdropLast;
},{"./_curry2":107,"./_xfBase":153}],150:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduce = /*#__PURE__*/require('./_reduce');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDropLastWhile = /*#__PURE__*/function () {

  function XDropLastWhile(fn, xf) {
    this.f = fn;
    this.retained = [];
    this.xf = xf;
  }
  XDropLastWhile.prototype['@@transducer/init'] = _xfBase.init;
  XDropLastWhile.prototype['@@transducer/result'] = function (result) {
    this.retained = null;
    return this.xf['@@transducer/result'](result);
  };
  XDropLastWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.retain(result, input) : this.flush(result, input);
  };
  XDropLastWhile.prototype.flush = function (result, input) {
    result = _reduce(this.xf['@@transducer/step'], result, this.retained);
    this.retained = [];
    return this.xf['@@transducer/step'](result, input);
  };
  XDropLastWhile.prototype.retain = function (result, input) {
    this.retained.push(input);
    return result;
  };

  return XDropLastWhile;
}();

var _xdropLastWhile = /*#__PURE__*/_curry2(function _xdropLastWhile(fn, xf) {
  return new XDropLastWhile(fn, xf);
});
module.exports = _xdropLastWhile;
},{"./_curry2":107,"./_reduce":139,"./_xfBase":153}],151:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDropRepeatsWith = /*#__PURE__*/function () {

  function XDropRepeatsWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.lastValue = undefined;
    this.seenFirstValue = false;
  }

  XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase.init;
  XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase.result;
  XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
    var sameAsLast = false;
    if (!this.seenFirstValue) {
      this.seenFirstValue = true;
    } else if (this.pred(this.lastValue, input)) {
      sameAsLast = true;
    }
    this.lastValue = input;
    return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
  };

  return XDropRepeatsWith;
}();

var _xdropRepeatsWith = /*#__PURE__*/_curry2(function _xdropRepeatsWith(pred, xf) {
  return new XDropRepeatsWith(pred, xf);
});
module.exports = _xdropRepeatsWith;
},{"./_curry2":107,"./_xfBase":153}],152:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDropWhile = /*#__PURE__*/function () {

  function XDropWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
  XDropWhile.prototype['@@transducer/result'] = _xfBase.result;
  XDropWhile.prototype['@@transducer/step'] = function (result, input) {
    if (this.f) {
      if (this.f(input)) {
        return result;
      }
      this.f = null;
    }
    return this.xf['@@transducer/step'](result, input);
  };

  return XDropWhile;
}();

var _xdropWhile = /*#__PURE__*/_curry2(function _xdropWhile(f, xf) {
  return new XDropWhile(f, xf);
});
module.exports = _xdropWhile;
},{"./_curry2":107,"./_xfBase":153}],153:[function(require,module,exports){
module.exports = {
  init: function () {
    return this.xf['@@transducer/init']();
  },
  result: function (result) {
    return this.xf['@@transducer/result'](result);
  }
};
},{}],154:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFilter = /*#__PURE__*/function () {

  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter.prototype['@@transducer/init'] = _xfBase.init;
  XFilter.prototype['@@transducer/result'] = _xfBase.result;
  XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XFilter;
}();

var _xfilter = /*#__PURE__*/_curry2(function _xfilter(f, xf) {
  return new XFilter(f, xf);
});
module.exports = _xfilter;
},{"./_curry2":107,"./_xfBase":153}],155:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFind = /*#__PURE__*/function () {

  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }
  XFind.prototype['@@transducer/init'] = _xfBase.init;
  XFind.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFind.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, input));
    }
    return result;
  };

  return XFind;
}();

var _xfind = /*#__PURE__*/_curry2(function _xfind(f, xf) {
  return new XFind(f, xf);
});
module.exports = _xfind;
},{"./_curry2":107,"./_reduced":140,"./_xfBase":153}],156:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFindIndex = /*#__PURE__*/function () {

  function XFindIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.found = false;
  }
  XFindIndex.prototype['@@transducer/init'] = _xfBase.init;
  XFindIndex.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, -1);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFindIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, this.idx));
    }
    return result;
  };

  return XFindIndex;
}();

var _xfindIndex = /*#__PURE__*/_curry2(function _xfindIndex(f, xf) {
  return new XFindIndex(f, xf);
});
module.exports = _xfindIndex;
},{"./_curry2":107,"./_reduced":140,"./_xfBase":153}],157:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFindLast = /*#__PURE__*/function () {

  function XFindLast(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFindLast.prototype['@@transducer/init'] = _xfBase.init;
  XFindLast.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
  };
  XFindLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.last = input;
    }
    return result;
  };

  return XFindLast;
}();

var _xfindLast = /*#__PURE__*/_curry2(function _xfindLast(f, xf) {
  return new XFindLast(f, xf);
});
module.exports = _xfindLast;
},{"./_curry2":107,"./_xfBase":153}],158:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFindLastIndex = /*#__PURE__*/function () {

  function XFindLastIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.lastIdx = -1;
  }
  XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;
  XFindLastIndex.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
  };
  XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.lastIdx = this.idx;
    }
    return result;
  };

  return XFindLastIndex;
}();

var _xfindLastIndex = /*#__PURE__*/_curry2(function _xfindLastIndex(f, xf) {
  return new XFindLastIndex(f, xf);
});
module.exports = _xfindLastIndex;
},{"./_curry2":107,"./_xfBase":153}],159:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XMap = /*#__PURE__*/function () {

  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap.prototype['@@transducer/init'] = _xfBase.init;
  XMap.prototype['@@transducer/result'] = _xfBase.result;
  XMap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return XMap;
}();

var _xmap = /*#__PURE__*/_curry2(function _xmap(f, xf) {
  return new XMap(f, xf);
});
module.exports = _xmap;
},{"./_curry2":107,"./_xfBase":153}],160:[function(require,module,exports){
var _curryN = /*#__PURE__*/require('./_curryN');

var _has = /*#__PURE__*/require('./_has');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XReduceBy = /*#__PURE__*/function () {

  function XReduceBy(valueFn, valueAcc, keyFn, xf) {
    this.valueFn = valueFn;
    this.valueAcc = valueAcc;
    this.keyFn = keyFn;
    this.xf = xf;
    this.inputs = {};
  }
  XReduceBy.prototype['@@transducer/init'] = _xfBase.init;
  XReduceBy.prototype['@@transducer/result'] = function (result) {
    var key;
    for (key in this.inputs) {
      if (_has(key, this.inputs)) {
        result = this.xf['@@transducer/step'](result, this.inputs[key]);
        if (result['@@transducer/reduced']) {
          result = result['@@transducer/value'];
          break;
        }
      }
    }
    this.inputs = null;
    return this.xf['@@transducer/result'](result);
  };
  XReduceBy.prototype['@@transducer/step'] = function (result, input) {
    var key = this.keyFn(input);
    this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
    this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
    return result;
  };

  return XReduceBy;
}();

var _xreduceBy = /*#__PURE__*/_curryN(4, [], function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
  return new XReduceBy(valueFn, valueAcc, keyFn, xf);
});
module.exports = _xreduceBy;
},{"./_curryN":109,"./_has":118,"./_xfBase":153}],161:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XTake = /*#__PURE__*/function () {

  function XTake(n, xf) {
    this.xf = xf;
    this.n = n;
    this.i = 0;
  }
  XTake.prototype['@@transducer/init'] = _xfBase.init;
  XTake.prototype['@@transducer/result'] = _xfBase.result;
  XTake.prototype['@@transducer/step'] = function (result, input) {
    this.i += 1;
    var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
    return this.n >= 0 && this.i >= this.n ? _reduced(ret) : ret;
  };

  return XTake;
}();

var _xtake = /*#__PURE__*/_curry2(function _xtake(n, xf) {
  return new XTake(n, xf);
});
module.exports = _xtake;
},{"./_curry2":107,"./_reduced":140,"./_xfBase":153}],162:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XTakeWhile = /*#__PURE__*/function () {

  function XTakeWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
  XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;
  XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
  };

  return XTakeWhile;
}();

var _xtakeWhile = /*#__PURE__*/_curry2(function _xtakeWhile(f, xf) {
  return new XTakeWhile(f, xf);
});
module.exports = _xtakeWhile;
},{"./_curry2":107,"./_reduced":140,"./_xfBase":153}],163:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XTap = /*#__PURE__*/function () {

  function XTap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTap.prototype['@@transducer/init'] = _xfBase.init;
  XTap.prototype['@@transducer/result'] = _xfBase.result;
  XTap.prototype['@@transducer/step'] = function (result, input) {
    this.f(input);
    return this.xf['@@transducer/step'](result, input);
  };

  return XTap;
}();

var _xtap = /*#__PURE__*/_curry2(function _xtap(f, xf) {
  return new XTap(f, xf);
});
module.exports = _xtap;
},{"./_curry2":107,"./_xfBase":153}],164:[function(require,module,exports){
var XWrap = /*#__PURE__*/function () {
  function XWrap(fn) {
    this.f = fn;
  }
  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };
  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };
  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}
module.exports = _xwrap;
},{}],165:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./internal/_contains');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _filter = /*#__PURE__*/require('./internal/_filter');

var flip = /*#__PURE__*/require('./flip');

var uniq = /*#__PURE__*/require('./uniq');

/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @see R.innerJoin
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */


var intersection = /*#__PURE__*/_curry2(function intersection(list1, list2) {
  var lookupList, filteredList;
  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }
  return uniq(_filter(flip(_contains)(lookupList), filteredList));
});
module.exports = intersection;
},{"./flip":71,"./internal/_contains":103,"./internal/_curry2":107,"./internal/_filter":114,"./uniq":302}],166:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new list with the separator interposed between elements.
 *
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} separator The element to add to the list.
 * @param {Array} list The list to be interposed.
 * @return {Array} The new list.
 * @example
 *
 *      R.intersperse('n', ['ba', 'a', 'a']); //=> ['ba', 'n', 'a', 'n', 'a']
 */


var intersperse = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('intersperse', function intersperse(separator, list) {
  var out = [];
  var idx = 0;
  var length = list.length;
  while (idx < length) {
    if (idx === length - 1) {
      out.push(list[idx]);
    } else {
      out.push(list[idx], separator);
    }
    idx += 1;
  }
  return out;
}));
module.exports = intersperse;
},{"./internal/_checkForMethod":98,"./internal/_curry2":107}],167:[function(require,module,exports){
var _clone = /*#__PURE__*/require('./internal/_clone');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _isTransformer = /*#__PURE__*/require('./internal/_isTransformer');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _stepCat = /*#__PURE__*/require('./internal/_stepCat');

/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 *
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 *
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig a -> (b -> b) -> [c] -> a
 * @param {*} acc The initial accumulator value.
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.into([], transducer, numbers); //=> [2, 3]
 *
 *      var intoArray = R.into([]);
 *      intoArray(transducer, numbers); //=> [2, 3]
 */


var into = /*#__PURE__*/_curry3(function into(acc, xf, list) {
  return _isTransformer(acc) ? _reduce(xf(acc), acc['@@transducer/init'](), list) : _reduce(xf(_stepCat(acc)), _clone(acc, [], [], false), list);
});
module.exports = into;
},{"./internal/_clone":99,"./internal/_curry3":108,"./internal/_isTransformer":131,"./internal/_reduce":139,"./internal/_stepCat":141}],168:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _has = /*#__PURE__*/require('./internal/_has');

var keys = /*#__PURE__*/require('./keys');

/**
 * Same as [`R.invertObj`](#invertObj), however this accounts for objects with
 * duplicate values by putting the values into an array.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: [ s, ... ]}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object with keys in an array.
 * @see R.invertObj
 * @example
 *
 *      var raceResultsByFirstName = {
 *        first: 'alice',
 *        second: 'jake',
 *        third: 'alice',
 *      };
 *      R.invert(raceResultsByFirstName);
 *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 */


var invert = /*#__PURE__*/_curry1(function invert(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    var val = obj[key];
    var list = _has(val, out) ? out[val] : out[val] = [];
    list[list.length] = key;
    idx += 1;
  }
  return out;
});
module.exports = invert;
},{"./internal/_curry1":106,"./internal/_has":118,"./keys":176}],169:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var keys = /*#__PURE__*/require('./keys');

/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: s}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object
 * @see R.invert
 * @example
 *
 *      var raceResults = {
 *        first: 'alice',
 *        second: 'jake'
 *      };
 *      R.invertObj(raceResults);
 *      //=> { 'alice': 'first', 'jake':'second' }
 *
 *      // Alternatively:
 *      var raceResults = ['alice', 'jake'];
 *      R.invertObj(raceResults);
 *      //=> { 'alice': '0', 'jake':'1' }
 */


var invertObj = /*#__PURE__*/_curry1(function invertObj(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }
  return out;
});
module.exports = invertObj;
},{"./internal/_curry1":106,"./keys":176}],170:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isFunction = /*#__PURE__*/require('./internal/_isFunction');

var curryN = /*#__PURE__*/require('./curryN');

var toString = /*#__PURE__*/require('./toString');

/**
 * Turns a named method with a specified arity into a function that can be
 * called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `arity + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of the method to call.
 * @return {Function} A new curried function.
 * @see R.construct
 * @example
 *
 *      var sliceFrom = R.invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      var sliceFrom6 = R.invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */


var invoker = /*#__PURE__*/_curry2(function invoker(arity, method) {
  return curryN(arity + 1, function () {
    var target = arguments[arity];
    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
  });
});
module.exports = invoker;
},{"./curryN":43,"./internal/_curry2":107,"./internal/_isFunction":124,"./toString":288}],171:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * See if an object (`val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *      R.is(Object, {}); //=> true
 *      R.is(Number, 1); //=> true
 *      R.is(Object, 1); //=> false
 *      R.is(String, 's'); //=> true
 *      R.is(String, new String('')); //=> true
 *      R.is(Object, new String('')); //=> true
 *      R.is(Object, 's'); //=> false
 *      R.is(Number, {}); //=> false
 */


var is = /*#__PURE__*/_curry2(function is(Ctor, val) {
  return val != null && val.constructor === Ctor || val instanceof Ctor;
});
module.exports = is;
},{"./internal/_curry2":107}],172:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var empty = /*#__PURE__*/require('./empty');

var equals = /*#__PURE__*/require('./equals');

/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);   //=> false
 *      R.isEmpty([]);          //=> true
 *      R.isEmpty('');          //=> true
 *      R.isEmpty(null);        //=> false
 *      R.isEmpty({});          //=> true
 *      R.isEmpty({length: 0}); //=> false
 */


var isEmpty = /*#__PURE__*/_curry1(function isEmpty(x) {
  return x != null && equals(x, empty(x));
});
module.exports = isEmpty;
},{"./empty":59,"./equals":63,"./internal/_curry1":106}],173:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */


var isNil = /*#__PURE__*/_curry1(function isNil(x) {
  return x == null;
});
module.exports = isNil;
},{"./internal/_curry1":106}],174:[function(require,module,exports){
var invoker = /*#__PURE__*/require('./invoker');

/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig String -> [a] -> String
 * @param {Number|String} separator The string used to separate the elements.
 * @param {Array} xs The elements to join into a string.
 * @return {String} str The string made by concatenating `xs` with `separator`.
 * @see R.split
 * @example
 *
 *      var spacer = R.join(' ');
 *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
 */


var join = /*#__PURE__*/invoker(1, 'join');
module.exports = join;
},{"./invoker":170}],175:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var converge = /*#__PURE__*/require('./converge');

/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @see R.applySpec
 * @example
 *
 *      var getRange = R.juxt([Math.min, Math.max]);
 *      getRange(3, 4, 9, -3); //=> [-3, 9]
 * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
 */


var juxt = /*#__PURE__*/_curry1(function juxt(fns) {
  return converge(function () {
    return Array.prototype.slice.call(arguments, 0);
  }, fns);
});
module.exports = juxt;
},{"./converge":40,"./internal/_curry1":106}],176:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _has = /*#__PURE__*/require('./internal/_has');

var _isArguments = /*#__PURE__*/require('./internal/_isArguments');

// cover IE < 9 keys issues


var hasEnumBug = ! /*#__PURE__*/{ toString: null }.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
// Safari bug
var hasArgsEnumBug = /*#__PURE__*/function () {
  'use strict';

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};

/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
var _keys = typeof Object.keys === 'function' && !hasArgsEnumBug ? function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
} : function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
};
var keys = /*#__PURE__*/_curry1(_keys);
module.exports = keys;
},{"./internal/_curry1":106,"./internal/_has":118,"./internal/_isArguments":121}],177:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own and prototype properties.
 * @see R.keys, R.valuesIn
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.keysIn(f); //=> ['x', 'y']
 */


var keysIn = /*#__PURE__*/_curry1(function keysIn(obj) {
  var prop;
  var ks = [];
  for (prop in obj) {
    ks[ks.length] = prop;
  }
  return ks;
});
module.exports = keysIn;
},{"./internal/_curry1":106}],178:[function(require,module,exports){
var nth = /*#__PURE__*/require('./nth');

/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */


var last = /*#__PURE__*/nth(-1);
module.exports = last;
},{"./nth":217}],179:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

var equals = /*#__PURE__*/require('./equals');

/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.indexOf
 * @example
 *
 *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
 *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
 */


var lastIndexOf = /*#__PURE__*/_curry2(function lastIndexOf(target, xs) {
  if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
    return xs.lastIndexOf(target);
  } else {
    var idx = xs.length - 1;
    while (idx >= 0) {
      if (equals(xs[idx], target)) {
        return idx;
      }
      idx -= 1;
    }
    return -1;
  }
});
module.exports = lastIndexOf;
},{"./equals":63,"./internal/_curry2":107,"./internal/_isArray":122}],180:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _isNumber = /*#__PURE__*/require('./internal/_isNumber');

/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {Array} list The array to inspect.
 * @return {Number} The length of the array.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 */


var length = /*#__PURE__*/_curry1(function length(list) {
  return list != null && _isNumber(list.length) ? list.length : NaN;
});
module.exports = length;
},{"./internal/_curry1":106,"./internal/_isNumber":126}],181:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var map = /*#__PURE__*/require('./map');

/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
 * @param {Function} getter
 * @param {Function} setter
 * @return {Lens}
 * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lens(R.prop('x'), R.assoc('x'));
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */


var lens = /*#__PURE__*/_curry2(function lens(getter, setter) {
  return function (toFunctorFn) {
    return function (target) {
      return map(function (focus) {
        return setter(focus, target);
      }, toFunctorFn(getter(target)));
    };
  };
});
module.exports = lens;
},{"./internal/_curry2":107,"./map":189}],182:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var lens = /*#__PURE__*/require('./lens');

var nth = /*#__PURE__*/require('./nth');

var update = /*#__PURE__*/require('./update');

/**
 * Returns a lens whose focus is the specified index.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Number -> Lens s a
 * @param {Number} n
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 */


var lensIndex = /*#__PURE__*/_curry1(function lensIndex(n) {
  return lens(nth(n), update(n));
});
module.exports = lensIndex;
},{"./internal/_curry1":106,"./lens":181,"./nth":217,"./update":308}],183:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var assocPath = /*#__PURE__*/require('./assocPath');

var lens = /*#__PURE__*/require('./lens');

var path = /*#__PURE__*/require('./path');

/**
 * Returns a lens whose focus is the specified path.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @typedefn Idx = String | Int
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig [Idx] -> Lens s a
 * @param {Array} path The path to use.
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var xHeadYLens = R.lensPath(['x', 0, 'y']);
 *
 *      R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> 2
 *      R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 *      R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
 */


var lensPath = /*#__PURE__*/_curry1(function lensPath(p) {
  return lens(path(p), assocPath(p));
});
module.exports = lensPath;
},{"./assocPath":22,"./internal/_curry1":106,"./lens":181,"./path":230}],184:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var assoc = /*#__PURE__*/require('./assoc');

var lens = /*#__PURE__*/require('./lens');

var prop = /*#__PURE__*/require('./prop');

/**
 * Returns a lens whose focus is the specified property.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig String -> Lens s a
 * @param {String} k
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */


var lensProp = /*#__PURE__*/_curry1(function lensProp(k) {
  return lens(prop(k), assoc(k));
});
module.exports = lensProp;
},{"./assoc":21,"./internal/_curry1":106,"./lens":181,"./prop":244}],185:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var liftN = /*#__PURE__*/require('./liftN');

/**
 * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.liftN
 * @example
 *
 *      var madd3 = R.lift((a, b, c) => a + b + c);
 *
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 *
 *      var madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 *
 *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
 */


var lift = /*#__PURE__*/_curry1(function lift(fn) {
  return liftN(fn.length, fn);
});
module.exports = lift;
},{"./internal/_curry1":106,"./liftN":186}],186:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var ap = /*#__PURE__*/require('./ap');

var curryN = /*#__PURE__*/require('./curryN');

var map = /*#__PURE__*/require('./map');

/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig Number -> (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.lift, R.ap
 * @example
 *
 *      var madd3 = R.liftN(3, (...args) => R.sum(args));
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */


var liftN = /*#__PURE__*/_curry2(function liftN(arity, fn) {
  var lifted = curryN(arity, fn);
  return curryN(arity, function () {
    return _reduce(ap, map(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
  });
});
module.exports = liftN;
},{"./ap":14,"./curryN":43,"./internal/_curry2":107,"./internal/_reduce":139,"./map":189}],187:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt
 * @example
 *
 *      R.lt(2, 1); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(2, 3); //=> true
 *      R.lt('a', 'z'); //=> true
 *      R.lt('z', 'a'); //=> false
 */


var lt = /*#__PURE__*/_curry2(function lt(a, b) {
  return a < b;
});
module.exports = lt;
},{"./internal/_curry2":107}],188:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.gte
 * @example
 *
 *      R.lte(2, 1); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(2, 3); //=> true
 *      R.lte('a', 'z'); //=> true
 *      R.lte('z', 'a'); //=> false
 */


var lte = /*#__PURE__*/_curry2(function lte(a, b) {
  return a <= b;
});
module.exports = lte;
},{"./internal/_curry2":107}],189:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _map = /*#__PURE__*/require('./internal/_map');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _xmap = /*#__PURE__*/require('./internal/_xmap');

var curryN = /*#__PURE__*/require('./curryN');

var keys = /*#__PURE__*/require('./keys');

/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      var double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */


var map = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['fantasy-land/map', 'map'], _xmap, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });
    case '[object Object]':
      return _reduce(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys(functor));
    default:
      return _map(fn, functor);
  }
}));
module.exports = map;
},{"./curryN":43,"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_map":133,"./internal/_reduce":139,"./internal/_xmap":159,"./keys":176}],190:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * The `mapAccum` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccumRight
 * @example
 *
 *      var digits = ['1', '2', '3', '4'];
 *      var appender = (a, b) => [a + b, a + b];
 *
 *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 * @symb R.mapAccum(f, a, [b, c, d]) = [
 *   f(f(f(a, b)[0], c)[0], d)[0],
 *   [
 *     f(a, b)[1],
 *     f(f(a, b)[0], c)[1],
 *     f(f(f(a, b)[0], c)[0], d)[1]
 *   ]
 * ]
 */


var mapAccum = /*#__PURE__*/_curry3(function mapAccum(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var tuple = [acc];
  while (idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx += 1;
  }
  return [tuple[0], result];
});
module.exports = mapAccum;
},{"./internal/_curry3":108}],191:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * The `mapAccumRight` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from right to left, and returning a final value of this
 * accumulator together with the new list.
 *
 * Similar to [`mapAccum`](#mapAccum), except moves through the input list from
 * the right to the left.
 *
 * The iterator function receives two arguments, *value* and *acc*, and should
 * return a tuple *[value, acc]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((x, acc) -> (y, acc)) -> acc -> [x] -> ([y], acc)
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccum
 * @example
 *
 *      var digits = ['1', '2', '3', '4'];
 *      var append = (a, b) => [a + b, a + b];
 *
 *      R.mapAccumRight(append, 5, digits); //=> [['12345', '2345', '345', '45'], '12345']
 * @symb R.mapAccumRight(f, a, [b, c, d]) = [
 *   [
 *     f(b, f(c, f(d, a)[0])[0])[1],
 *     f(c, f(d, a)[0])[1],
 *     f(d, a)[1],
 *   ]
 *   f(b, f(c, f(d, a)[0])[0])[0],
 * ]
 */


var mapAccumRight = /*#__PURE__*/_curry3(function mapAccumRight(fn, acc, list) {
  var idx = list.length - 1;
  var result = [];
  var tuple = [acc];
  while (idx >= 0) {
    tuple = fn(list[idx], tuple[0]);
    result[idx] = tuple[1];
    idx -= 1;
  }
  return [result, tuple[0]];
});
module.exports = mapAccumRight;
},{"./internal/_curry3":108}],192:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var keys = /*#__PURE__*/require('./keys');

/**
 * An Object-specific version of [`map`](#map). The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * [`map`](#map) instead.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig ((*, String, Object) -> *) -> Object -> Object
 * @param {Function} fn
 * @param {Object} obj
 * @return {Object}
 * @see R.map
 * @example
 *
 *      var values = { x: 1, y: 2, z: 3 };
 *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 *
 *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */


var mapObjIndexed = /*#__PURE__*/_curry2(function mapObjIndexed(fn, obj) {
  return _reduce(function (acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys(obj));
});
module.exports = mapObjIndexed;
},{"./internal/_curry2":107,"./internal/_reduce":139,"./keys":176}],193:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches or empty array.
 * @see R.test
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 *      R.match(/a/, 'b'); //=> []
 *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 */


var match = /*#__PURE__*/_curry2(function match(rx, str) {
  return str.match(rx) || [];
});
module.exports = match;
},{"./internal/_curry2":107}],194:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isInteger = /*#__PURE__*/require('./internal/_isInteger');

/**
 * `mathMod` behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, [`R.modulo`](#modulo)). So while
 * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer
 * arguments, and returns NaN when the modulus is zero or negative.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} m The dividend.
 * @param {Number} p the modulus.
 * @return {Number} The result of `b mod a`.
 * @see R.modulo
 * @example
 *
 *      R.mathMod(-17, 5);  //=> 3
 *      R.mathMod(17, 5);   //=> 2
 *      R.mathMod(17, -5);  //=> NaN
 *      R.mathMod(17, 0);   //=> NaN
 *      R.mathMod(17.2, 5); //=> NaN
 *      R.mathMod(17, 5.3); //=> NaN
 *
 *      var clock = R.mathMod(R.__, 12);
 *      clock(15); //=> 3
 *      clock(24); //=> 0
 *
 *      var seventeenMod = R.mathMod(17);
 *      seventeenMod(3);  //=> 2
 *      seventeenMod(4);  //=> 1
 *      seventeenMod(10); //=> 7
 */


var mathMod = /*#__PURE__*/_curry2(function mathMod(m, p) {
  if (!_isInteger(m)) {
    return NaN;
  }
  if (!_isInteger(p) || p < 1) {
    return NaN;
  }
  return (m % p + p) % p;
});
module.exports = mathMod;
},{"./internal/_curry2":107,"./internal/_isInteger":125}],195:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */


var max = /*#__PURE__*/_curry2(function max(a, b) {
  return b > a ? b : a;
});
module.exports = max;
},{"./internal/_curry2":107}],196:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Takes a function and two values, and returns whichever value produces the
 * larger result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.max, R.minBy
 * @example
 *
 *      //  square :: Number -> Number
 *      var square = n => n * n;
 *
 *      R.maxBy(square, -3, 2); //=> -3
 *
 *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
 *      R.reduce(R.maxBy(square), 0, []); //=> 0
 */


var maxBy = /*#__PURE__*/_curry3(function maxBy(f, a, b) {
  return f(b) > f(a) ? b : a;
});
module.exports = maxBy;
},{"./internal/_curry3":108}],197:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var sum = /*#__PURE__*/require('./sum');

/**
 * Returns the mean of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.median
 * @example
 *
 *      R.mean([2, 7, 9]); //=> 6
 *      R.mean([]); //=> NaN
 */


var mean = /*#__PURE__*/_curry1(function mean(list) {
  return sum(list) / list.length;
});
module.exports = mean;
},{"./internal/_curry1":106,"./sum":274}],198:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var mean = /*#__PURE__*/require('./mean');

/**
 * Returns the median of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.mean
 * @example
 *
 *      R.median([2, 9, 7]); //=> 7
 *      R.median([7, 2, 10, 9]); //=> 8
 *      R.median([]); //=> NaN
 */


var median = /*#__PURE__*/_curry1(function median(list) {
  var len = list.length;
  if (len === 0) {
    return NaN;
  }
  var width = 2 - len % 2;
  var idx = (len - width) / 2;
  return mean(Array.prototype.slice.call(list, 0).sort(function (a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }).slice(idx, idx + width));
});
module.exports = median;
},{"./internal/_curry1":106,"./mean":197}],199:[function(require,module,exports){
var memoizeWith = /*#__PURE__*/require('./memoizeWith');

var toString = /*#__PURE__*/require('./toString');

/**
 * Creates a new function that, when invoked, caches the result of calling `fn`
 * for a given argument set and returns the result. Subsequent calls to the
 * memoized `fn` with the same argument set will not result in an additional
 * call to `fn`; instead, the cached result for that set of arguments will be
 * returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @see R.memoizeWith
 * @deprecated since v0.25.0
 * @example
 *
 *      let count = 0;
 *      const factorial = R.memoize(n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */


var memoize = /*#__PURE__*/memoizeWith(function () {
  return toString(arguments);
});
module.exports = memoize;
},{"./memoizeWith":200,"./toString":288}],200:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * A customisable version of [`R.memoize`](#memoize). `memoizeWith` takes an
 * additional function that will be applied to a given argument set and used to
 * create the cache key under which the results of the function to be memoized
 * will be stored. Care must be taken when implementing key generation to avoid
 * clashes that may overwrite previous entries erroneously.
 *
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (*... -> String) -> (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to generate the cache key.
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @see R.memoize
 * @example
 *
 *      let count = 0;
 *      const factorial = R.memoizeWith(R.identity, n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */


var memoizeWith = /*#__PURE__*/_curry2(function memoizeWith(mFn, fn) {
  var cache = {};
  return _arity(fn.length, function () {
    var key = mFn.apply(this, arguments);
    if (!_has(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }
    return cache[key];
  });
});
module.exports = memoizeWith;
},{"./internal/_arity":95,"./internal/_curry2":107,"./internal/_has":118}],201:[function(require,module,exports){
var _assign = /*#__PURE__*/require('./internal/_assign');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepRight, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      var resetToDefault = R.merge(R.__, {x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * @symb R.merge({ x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: 5, z: 3 }
 */


var merge = /*#__PURE__*/_curry2(function merge(l, r) {
  return _assign({}, l, r);
});
module.exports = merge;
},{"./internal/_assign":97,"./internal/_curry2":107}],202:[function(require,module,exports){
var _assign = /*#__PURE__*/require('./internal/_assign');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Merges a list of objects together into one object.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig [{k: v}] -> {k: v}
 * @param {Array} list An array of objects
 * @return {Object} A merged object.
 * @see R.reduce
 * @example
 *
 *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
 */


var mergeAll = /*#__PURE__*/_curry1(function mergeAll(list) {
  return _assign.apply(null, [{}].concat(list));
});
module.exports = mergeAll;
},{"./internal/_assign":97,"./internal/_curry1":106}],203:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var mergeDeepWithKey = /*#__PURE__*/require('./mergeDeepWithKey');

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepRight, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                      { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
 */


var mergeDeepLeft = /*#__PURE__*/_curry2(function mergeDeepLeft(lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return lVal;
  }, lObj, rObj);
});
module.exports = mergeDeepLeft;
},{"./internal/_curry2":107,"./mergeDeepWithKey":206}],204:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var mergeDeepWithKey = /*#__PURE__*/require('./mergeDeepWithKey');

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepLeft, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                       { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 */


var mergeDeepRight = /*#__PURE__*/_curry2(function mergeDeepRight(lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return rVal;
  }, lObj, rObj);
});
module.exports = mergeDeepRight;
},{"./internal/_curry2":107,"./mergeDeepWithKey":206}],205:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var mergeDeepWithKey = /*#__PURE__*/require('./mergeDeepWithKey');

/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to associated values using the
 *   resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWith, R.mergeDeep, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepWith(R.concat,
 *                      { a: true, c: { values: [10, 20] }},
 *                      { b: true, c: { values: [15, 35] }});
 *      //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
 */


var mergeDeepWith = /*#__PURE__*/_curry3(function mergeDeepWith(fn, lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return fn(lVal, rVal);
  }, lObj, rObj);
});
module.exports = mergeDeepWith;
},{"./internal/_curry3":108,"./mergeDeepWithKey":206}],206:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _isObject = /*#__PURE__*/require('./internal/_isObject');

var mergeWithKey = /*#__PURE__*/require('./mergeWithKey');

/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 *   using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWithKey, R.mergeDeep, R.mergeDeepWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeDeepWithKey(concatValues,
 *                         { a: true, c: { thing: 'foo', values: [10, 20] }},
 *                         { b: true, c: { thing: 'bar', values: [15, 35] }});
 *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 */


var mergeDeepWithKey = /*#__PURE__*/_curry3(function mergeDeepWithKey(fn, lObj, rObj) {
  return mergeWithKey(function (k, lVal, rVal) {
    if (_isObject(lVal) && _isObject(rVal)) {
      return mergeDeepWithKey(fn, lVal, rVal);
    } else {
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
});
module.exports = mergeDeepWithKey;
},{"./internal/_curry3":108,"./internal/_isObject":127,"./mergeWithKey":208}],207:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var mergeWithKey = /*#__PURE__*/require('./mergeWithKey');

/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the values
 * associated with the key in each object, with the result being used as the
 * value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWith, R.merge, R.mergeWithKey
 * @example
 *
 *      R.mergeWith(R.concat,
 *                  { a: true, values: [10, 20] },
 *                  { b: true, values: [15, 35] });
 *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
 */


var mergeWith = /*#__PURE__*/_curry3(function mergeWith(fn, l, r) {
  return mergeWithKey(function (_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});
module.exports = mergeWith;
},{"./internal/_curry3":108,"./mergeWithKey":208}],208:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWithKey, R.merge, R.mergeWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeWithKey(concatValues,
 *                     { a: true, thing: 'foo', values: [10, 20] },
 *                     { b: true, thing: 'bar', values: [15, 35] });
 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
 */


var mergeWithKey = /*#__PURE__*/_curry3(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;

  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if (_has(k, r) && !_has(k, result)) {
      result[k] = r[k];
    }
  }

  return result;
});
module.exports = mergeWithKey;
},{"./internal/_curry3":108,"./internal/_has":118}],209:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns the smaller of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.minBy, R.max
 * @example
 *
 *      R.min(789, 123); //=> 123
 *      R.min('a', 'b'); //=> 'a'
 */


var min = /*#__PURE__*/_curry2(function min(a, b) {
  return b < a ? b : a;
});
module.exports = min;
},{"./internal/_curry2":107}],210:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Takes a function and two values, and returns whichever value produces the
 * smaller result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.min, R.maxBy
 * @example
 *
 *      //  square :: Number -> Number
 *      var square = n => n * n;
 *
 *      R.minBy(square, -3, 2); //=> 2
 *
 *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
 *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
 */


var minBy = /*#__PURE__*/_curry3(function minBy(f, a, b) {
  return f(b) < f(a) ? b : a;
});
module.exports = minBy;
},{"./internal/_curry3":108}],211:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see [`mathMod`](#mathMod).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The value to the divide.
 * @param {Number} b The pseudo-modulus
 * @return {Number} The result of `b % a`.
 * @see R.mathMod
 * @example
 *
 *      R.modulo(17, 3); //=> 2
 *      // JS behavior:
 *      R.modulo(-17, 3); //=> -2
 *      R.modulo(17, -3); //=> 2
 *
 *      var isOdd = R.modulo(R.__, 2);
 *      isOdd(42); //=> 0
 *      isOdd(21); //=> 1
 */


var modulo = /*#__PURE__*/_curry2(function modulo(a, b) {
  return a % b;
});
module.exports = modulo;
},{"./internal/_curry2":107}],212:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a * b`.
 * @see R.divide
 * @example
 *
 *      var double = R.multiply(2);
 *      var triple = R.multiply(3);
 *      double(3);       //=>  6
 *      triple(4);       //=> 12
 *      R.multiply(2, 5);  //=> 10
 */


var multiply = /*#__PURE__*/_curry2(function multiply(a, b) {
  return a * b;
});
module.exports = multiply;
},{"./internal/_curry2":107}],213:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity `n`.
 * @see R.binary, R.unary
 * @example
 *
 *      var takesTwoArgs = (a, b) => [a, b];
 *
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.nAry(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only `n` arguments are passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.nAry(0, f)(a, b) = f()
 * @symb R.nAry(1, f)(a, b) = f(a)
 * @symb R.nAry(2, f)(a, b) = f(a, b)
 */


var nAry = /*#__PURE__*/_curry2(function nAry(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.call(this);
      };
    case 1:
      return function (a0) {
        return fn.call(this, a0);
      };
    case 2:
      return function (a0, a1) {
        return fn.call(this, a0, a1);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.call(this, a0, a1, a2);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.call(this, a0, a1, a2, a3);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.call(this, a0, a1, a2, a3, a4);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.call(this, a0, a1, a2, a3, a4, a5);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
      };
    default:
      throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
  }
});
module.exports = nAry;
},{"./internal/_curry2":107}],214:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Negates its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @example
 *
 *      R.negate(42); //=> -42
 */


var negate = /*#__PURE__*/_curry1(function negate(n) {
  return -n;
});
module.exports = negate;
},{"./internal/_curry1":106}],215:[function(require,module,exports){
var _complement = /*#__PURE__*/require('./internal/_complement');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xany = /*#__PURE__*/require('./internal/_xany');

var any = /*#__PURE__*/require('./any');

/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
 * @see R.all, R.any
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *      var isOdd = n => n % 2 === 1;
 *
 *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
 *      R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false
 */


var none = /*#__PURE__*/_curry2( /*#__PURE__*/_complement( /*#__PURE__*/_dispatchable(['any'], _xany, any)));
module.exports = none;
},{"./any":12,"./internal/_complement":101,"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_xany":145}],216:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */


var not = /*#__PURE__*/_curry1(function not(a) {
  return !a;
});
module.exports = not;
},{"./internal/_curry1":106}],217:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isString = /*#__PURE__*/require('./internal/_isString');

/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      var list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */


var nth = /*#__PURE__*/_curry2(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
});
module.exports = nth;
},{"./internal/_curry2":107,"./internal/_isString":130}],218:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

var nth = /*#__PURE__*/require('./nth');

/**
 * Returns a function which returns its nth argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig Number -> *... -> *
 * @param {Number} n
 * @return {Function}
 * @example
 *
 *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 * @symb R.nthArg(-1)(a, b, c) = c
 * @symb R.nthArg(0)(a, b, c) = a
 * @symb R.nthArg(1)(a, b, c) = b
 */


var nthArg = /*#__PURE__*/_curry1(function nthArg(n) {
  var arity = n < 0 ? 1 : n + 1;
  return curryN(arity, function () {
    return nth(n, arguments);
  });
});
module.exports = nthArg;
},{"./curryN":43,"./internal/_curry1":106,"./nth":217}],219:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (b -> c) -> (a -> b) -> a -> c
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 * @see R.compose, R.pipe
 * @example
 *
 *      var classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
 *      var yellGreeting = R.o(R.toUpper, classyGreeting);
 *      yellGreeting({first: 'James', last: 'Bond'}); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.o(R.multiply(10), R.add(10))(-4) //=> 60
 *
 * @symb R.o(f, g, x) = f(g(x))
 */


var o = /*#__PURE__*/_curry3(function o(f, g, x) {
  return f(g(x));
});
module.exports = o;
},{"./internal/_curry3":108}],220:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @see R.pair
 * @example
 *
 *      var matchPhrases = R.compose(
 *        R.objOf('must'),
 *        R.map(R.objOf('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */


var objOf = /*#__PURE__*/_curry2(function objOf(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});
module.exports = objOf;
},{"./internal/_curry2":107}],221:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _of = /*#__PURE__*/require('./internal/_of');

/**
 * Returns a singleton array containing the value provided.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> [a]
 * @param {*} x any value
 * @return {Array} An array wrapping `x`.
 * @example
 *
 *      R.of(null); //=> [null]
 *      R.of([42]); //=> [[42]]
 */


var of = /*#__PURE__*/_curry1(_of);
module.exports = of;
},{"./internal/_curry1":106,"./internal/_of":135}],222:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [String] -> {String: *} -> {String: *}
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with properties from `names` not on it.
 * @see R.pick
 * @example
 *
 *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */


var omit = /*#__PURE__*/_curry2(function omit(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }

  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});
module.exports = omit;
},{"./internal/_curry2":107}],223:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      var addOneOnce = R.once(x => x + 1);
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */


var once = /*#__PURE__*/_curry1(function once(fn) {
  var called = false;
  var result;
  return _arity(fn.length, function () {
    if (called) {
      return result;
    }
    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});
module.exports = once;
},{"./internal/_arity":95,"./internal/_curry1":106}],224:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if one or both of its arguments are `true`. Returns `false`
 * if both arguments are `false`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if truthy, otherwise the second argument.
 * @see R.either
 * @example
 *
 *      R.or(true, true); //=> true
 *      R.or(true, false); //=> true
 *      R.or(false, true); //=> true
 *      R.or(false, false); //=> false
 */


var or = /*#__PURE__*/_curry2(function or(a, b) {
  return a || b;
});
module.exports = or;
},{"./internal/_curry2":107}],225:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

// `Identity` is a functor that holds a single value, where `map` simply
// transforms the held value with the provided function.


var Identity = function (x) {
  return { value: x, map: function (f) {
      return Identity(f(x));
    } };
};

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> (a -> a) -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 */
var over = /*#__PURE__*/_curry3(function over(lens, f, x) {
  // The value returned by the getter function is first transformed with `f`,
  // then set as the value of an `Identity`. This is then mapped over with the
  // setter function of the lens.
  return lens(function (y) {
    return Identity(f(y));
  })(x).value;
});
module.exports = over;
},{"./internal/_curry3":108}],226:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category List
 * @sig a -> b -> (a,b)
 * @param {*} fst
 * @param {*} snd
 * @return {Array}
 * @see R.objOf, R.of
 * @example
 *
 *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
 */


var pair = /*#__PURE__*/_curry2(function pair(fst, snd) {
  return [fst, snd];
});
module.exports = pair;
},{"./internal/_curry2":107}],227:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _createPartialApplicator = /*#__PURE__*/require('./internal/_createPartialApplicator');

/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partialRight
 * @example
 *
 *      var multiply2 = (a, b) => a * b;
 *      var double = R.partial(multiply2, [2]);
 *      double(2); //=> 4
 *
 *      var greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      var sayHello = R.partial(greet, ['Hello']);
 *      var sayHelloToMs = R.partial(sayHello, ['Ms.']);
 *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)
 */


var partial = /*#__PURE__*/_createPartialApplicator(_concat);
module.exports = partial;
},{"./internal/_concat":102,"./internal/_createPartialApplicator":105}],228:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _createPartialApplicator = /*#__PURE__*/require('./internal/_createPartialApplicator');

var flip = /*#__PURE__*/require('./flip');

/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partial
 * @example
 *
 *      var greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
 */


var partialRight = /*#__PURE__*/_createPartialApplicator( /*#__PURE__*/flip(_concat));
module.exports = partialRight;
},{"./flip":71,"./internal/_concat":102,"./internal/_createPartialApplicator":105}],229:[function(require,module,exports){
var filter = /*#__PURE__*/require('./filter');

var juxt = /*#__PURE__*/require('./juxt');

var reject = /*#__PURE__*/require('./reject');

/**
 * Takes a predicate and a list or other `Filterable` object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
 * @param {Function} pred A predicate to determine which side the element belongs to.
 * @param {Array} filterable the list (or other filterable) to partition.
 * @return {Array} An array, containing first the subset of elements that satisfy the
 *         predicate, and second the subset of elements that do not satisfy.
 * @see R.filter, R.reject
 * @example
 *
 *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
 *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 *
 *      R.partition(R.contains('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
 *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
 */


var partition = /*#__PURE__*/juxt([filter, reject]);
module.exports = partition;
},{"./filter":65,"./juxt":175,"./reject":256}],230:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 */


var path = /*#__PURE__*/_curry2(function path(paths, obj) {
  var val = obj;
  var idx = 0;
  while (idx < paths.length) {
    if (val == null) {
      return;
    }
    val = val[paths[idx]];
    idx += 1;
  }
  return val;
});
module.exports = path;
},{"./internal/_curry2":107}],231:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var equals = /*#__PURE__*/require('./equals');

var path = /*#__PURE__*/require('./path');

/**
 * Determines whether a nested path on an object has a specific value, in
 * [`R.equals`](#equals) terms. Most likely used to filter a list.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Relation
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> Boolean
 * @param {Array} path The path of the nested property to use
 * @param {*} val The value to compare the nested property with
 * @param {Object} obj The object to check the nested property in
 * @return {Boolean} `true` if the value equals the nested object property,
 *         `false` otherwise.
 * @example
 *
 *      var user1 = { address: { zipCode: 90210 } };
 *      var user2 = { address: { zipCode: 55555 } };
 *      var user3 = { name: 'Bob' };
 *      var users = [ user1, user2, user3 ];
 *      var isFamous = R.pathEq(['address', 'zipCode'], 90210);
 *      R.filter(isFamous, users); //=> [ user1 ]
 */


var pathEq = /*#__PURE__*/_curry3(function pathEq(_path, val, obj) {
  return equals(path(_path, obj), val);
});
module.exports = pathEq;
},{"./equals":63,"./internal/_curry3":108,"./path":230}],232:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var defaultTo = /*#__PURE__*/require('./defaultTo');

var path = /*#__PURE__*/require('./path');

/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig a -> [Idx] -> {a} -> a
 * @param {*} d The default value.
 * @param {Array} p The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */


var pathOr = /*#__PURE__*/_curry3(function pathOr(d, p, obj) {
  return defaultTo(d, path(p, obj));
});
module.exports = pathOr;
},{"./defaultTo":45,"./internal/_curry3":108,"./path":230}],233:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var path = /*#__PURE__*/require('./path');

/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Logic
 * @typedefn Idx = String | Int
 * @sig (a -> Boolean) -> [Idx] -> {a} -> Boolean
 * @param {Function} pred
 * @param {Array} propPath
 * @param {*} obj
 * @return {Boolean}
 * @see R.propSatisfies, R.path
 * @example
 *
 *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
 */


var pathSatisfies = /*#__PURE__*/_curry3(function pathSatisfies(pred, propPath, obj) {
  return propPath.length > 0 && pred(path(propPath, obj));
});
module.exports = pathSatisfies;
},{"./internal/_curry3":108,"./path":230}],234:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.omit, R.props
 * @example
 *
 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */


var pick = /*#__PURE__*/_curry2(function pick(names, obj) {
  var result = {};
  var idx = 0;
  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }
    idx += 1;
  }
  return result;
});
module.exports = pick;
},{"./internal/_curry2":107}],235:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.pick
 * @example
 *
 *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 */


var pickAll = /*#__PURE__*/_curry2(function pickAll(names, obj) {
  var result = {};
  var idx = 0;
  var len = names.length;
  while (idx < len) {
    var name = names[idx];
    result[name] = obj[name];
    idx += 1;
  }
  return result;
});
module.exports = pickAll;
},{"./internal/_curry2":107}],236:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig ((v, k) -> Boolean) -> {k: v} -> {k: v}
 * @param {Function} pred A predicate to determine whether or not a key
 *        should be included on the output object.
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties that satisfy `pred`
 *         on it.
 * @see R.pick, R.filter
 * @example
 *
 *      var isUpperCase = (val, key) => key.toUpperCase() === key;
 *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */


var pickBy = /*#__PURE__*/_curry2(function pickBy(test, obj) {
  var result = {};
  for (var prop in obj) {
    if (test(obj[prop], prop, obj)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});
module.exports = pickBy;
},{"./internal/_curry2":107}],237:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _pipe = /*#__PURE__*/require('./internal/_pipe');

var reduce = /*#__PURE__*/require('./reduce');

var tail = /*#__PURE__*/require('./tail');

/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */


function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
}
module.exports = pipe;
},{"./internal/_arity":95,"./internal/_pipe":136,"./reduce":251,"./tail":277}],238:[function(require,module,exports){
var composeK = /*#__PURE__*/require('./composeK');

var reverse = /*#__PURE__*/require('./reverse');

/**
 * Returns the left-to-right Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.pipeK(f, g, h)` is equivalent to `R.pipe(f, R.chain(g), R.chain(h))`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (a -> m z)
 * @param {...Function}
 * @return {Function}
 * @see R.composeK
 * @example
 *
 *      //  parseJson :: String -> Maybe *
 *      //  get :: String -> Object -> Maybe *
 *
 *      //  getStateCode :: Maybe String -> Maybe String
 *      var getStateCode = R.pipeK(
 *        parseJson,
 *        get('user'),
 *        get('address'),
 *        get('state'),
 *        R.compose(Maybe.of, R.toUpper)
 *      );
 *
 *      getStateCode('{"user":{"address":{"state":"ny"}}}');
 *      //=> Just('NY')
 *      getStateCode('[Invalid JSON]');
 *      //=> Nothing()
 * @symb R.pipeK(f, g, h)(a) = R.chain(h, R.chain(g, f(a)))
 */


function pipeK() {
  if (arguments.length === 0) {
    throw new Error('pipeK requires at least one argument');
  }
  return composeK.apply(this, reverse(arguments));
}
module.exports = pipeK;
},{"./composeK":33,"./reverse":260}],239:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _pipeP = /*#__PURE__*/require('./internal/_pipeP');

var reduce = /*#__PURE__*/require('./reduce');

var tail = /*#__PURE__*/require('./tail');

/**
 * Performs left-to-right composition of one or more Promise-returning
 * functions. The leftmost function may have any arity; the remaining functions
 * must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeP
 * @example
 *
 *      //  followersForUser :: String -> Promise [User]
 *      var followersForUser = R.pipeP(db.getUserById, db.getFollowers);
 */


function pipeP() {
  if (arguments.length === 0) {
    throw new Error('pipeP requires at least one argument');
  }
  return _arity(arguments[0].length, reduce(_pipeP, arguments[0], tail(arguments)));
}
module.exports = pipeP;
},{"./internal/_arity":95,"./internal/_pipeP":137,"./reduce":251,"./tail":277}],240:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var map = /*#__PURE__*/require('./map');

var prop = /*#__PURE__*/require('./prop');

/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => k -> f {k: v} -> f v
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} f The array or functor to consider.
 * @return {Array} The list of values for the given key.
 * @see R.props
 * @example
 *
 *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
 *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
 *      R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
 * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
 */


var pluck = /*#__PURE__*/_curry2(function pluck(p, list) {
  return map(prop(p), list);
});
module.exports = pluck;
},{"./internal/_curry2":107,"./map":189,"./prop":244}],241:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @see R.append
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */


var prepend = /*#__PURE__*/_curry2(function prepend(el, list) {
  return _concat([el], list);
});
module.exports = prepend;
},{"./internal/_concat":102,"./internal/_curry2":107}],242:[function(require,module,exports){
var multiply = /*#__PURE__*/require('./multiply');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */


var product = /*#__PURE__*/reduce(multiply, 1);
module.exports = product;
},{"./multiply":212,"./reduce":251}],243:[function(require,module,exports){
var _map = /*#__PURE__*/require('./internal/_map');

var identity = /*#__PURE__*/require('./identity');

var pickAll = /*#__PURE__*/require('./pickAll');

var useWith = /*#__PURE__*/require('./useWith');

/**
 * Reasonable analog to SQL `select` statement.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @category Relation
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array} props The property names to project
 * @param {Array} objs The objects to query
 * @return {Array} An array of objects with just the `props` properties.
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
 *      var kids = [abby, fred];
 *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 */


var project = /*#__PURE__*/useWith(_map, [pickAll, identity]); // passing `identity` gives correct arity
module.exports = project;
},{"./identity":83,"./internal/_map":133,"./pickAll":235,"./useWith":309}],244:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var path = /*#__PURE__*/require('./path');

/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig s -> {s: a} -> a | Undefined
 * @param {String} p The property name
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 */

var prop = /*#__PURE__*/_curry2(function prop(p, obj) {
  return path([p], obj);
});
module.exports = prop;
},{"./internal/_curry2":107,"./path":230}],245:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var equals = /*#__PURE__*/require('./equals');

/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig String -> a -> Object -> Boolean
 * @param {String} name
 * @param {*} val
 * @param {*} obj
 * @return {Boolean}
 * @see R.whereEq, R.propSatisfies, R.equals
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      var kids = [abby, fred, rusty, alois];
 *      var hasBrownHair = R.propEq('hair', 'brown');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */


var propEq = /*#__PURE__*/_curry3(function propEq(name, val, obj) {
  return equals(val, obj[name]);
});
module.exports = propEq;
},{"./equals":63,"./internal/_curry3":108}],246:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var is = /*#__PURE__*/require('./is');

/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Type
 * @sig Type -> String -> Object -> Boolean
 * @param {Function} type
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.is, R.propSatisfies
 * @example
 *
 *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
 *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
 *      R.propIs(Number, 'x', {});            //=> false
 */


var propIs = /*#__PURE__*/_curry3(function propIs(type, name, obj) {
  return is(type, obj[name]);
});
module.exports = propIs;
},{"./internal/_curry3":108,"./is":171}],247:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property. Otherwise returns the provided default
 * value.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Object
 * @sig a -> String -> Object -> a
 * @param {*} val The default value.
 * @param {String} p The name of the property to return.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property of the supplied object or the default value.
 * @example
 *
 *      var alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      var favorite = R.prop('favoriteLibrary');
 *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 */


var propOr = /*#__PURE__*/_curry3(function propOr(val, p, obj) {
  return obj != null && _has(p, obj) ? obj[p] : val;
});
module.exports = propOr;
},{"./internal/_curry3":108,"./internal/_has":118}],248:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise. You can test multiple properties with
 * [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Logic
 * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
 * @param {Function} pred
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.where, R.propEq, R.propIs
 * @example
 *
 *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */


var propSatisfies = /*#__PURE__*/_curry3(function propSatisfies(pred, name, obj) {
  return pred(obj[name]);
});
module.exports = propSatisfies;
},{"./internal/_curry3":108}],249:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> [v]
 * @param {Array} ps The property names to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function.
 * @example
 *
 *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
 *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 *
 *      var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
 *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
 */


var props = /*#__PURE__*/_curry2(function props(ps, obj) {
  var len = ps.length;
  var out = [];
  var idx = 0;

  while (idx < len) {
    out[idx] = obj[ps[idx]];
    idx += 1;
  }

  return out;
});
module.exports = props;
},{"./internal/_curry2":107}],250:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isNumber = /*#__PURE__*/require('./internal/_isNumber');

/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in tthe set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(50, 53);  //=> [50, 51, 52]
 */


var range = /*#__PURE__*/_curry2(function range(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }
  var result = [];
  var n = from;
  while (n < to) {
    result.push(n);
    n += 1;
  }
  return result;
});
module.exports = range;
},{"./internal/_curry2":107,"./internal/_isNumber":126}],251:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */


var reduce = /*#__PURE__*/_curry3(_reduce);
module.exports = reduce;
},{"./internal/_curry3":108,"./internal/_reduce":139}],252:[function(require,module,exports){
var _curryN = /*#__PURE__*/require('./internal/_curryN');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _has = /*#__PURE__*/require('./internal/_has');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _xreduceBy = /*#__PURE__*/require('./internal/_xreduceBy');

/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 *
 * This function is basically a more general [`groupBy`](#groupBy) function.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category List
 * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
 * @param {Function} valueFn The function that reduces the elements of each group to a single
 *        value. Receives two values, accumulator for a particular group and the current element.
 * @param {*} acc The (initial) accumulator value for each group.
 * @param {Function} keyFn The function that maps the list's element into a key.
 * @param {Array} list The array to group.
 * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
 *         `valueFn` for elements which produced that key when passed to `keyFn`.
 * @see R.groupBy, R.reduce
 * @example
 *
 *      var reduceToNamesBy = R.reduceBy((acc, student) => acc.concat(student.name), []);
 *      var namesByGrade = reduceToNamesBy(function(student) {
 *        var score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      var students = [{name: 'Lucy', score: 92},
 *                      {name: 'Drew', score: 85},
 *                      // ...
 *                      {name: 'Bart', score: 62}];
 *      namesByGrade(students);
 *      // {
 *      //   'A': ['Lucy'],
 *      //   'B': ['Drew']
 *      //   // ...,
 *      //   'F': ['Bart']
 *      // }
 */


var reduceBy = /*#__PURE__*/_curryN(4, [], /*#__PURE__*/_dispatchable([], _xreduceBy, function reduceBy(valueFn, valueAcc, keyFn, list) {
  return _reduce(function (acc, elt) {
    var key = keyFn(elt);
    acc[key] = valueFn(_has(key, acc) ? acc[key] : valueAcc, elt);
    return acc;
  }, {}, list);
}));
module.exports = reduceBy;
},{"./internal/_curryN":109,"./internal/_dispatchable":110,"./internal/_has":118,"./internal/_reduce":139,"./internal/_xreduceBy":160}],253:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * Similar to [`reduce`](#reduce), except moves through the input list from the
 * right to the left.
 *
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*.
 *
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduceRight` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> b) -> b -> [a] -> b
 * @param {Function} fn The iterator function. Receives two values, the current element from the array
 *        and the accumulator.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.addIndex
 * @example
 *
 *      R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 *      //    -               -2
 *      //   / \              / \
 *      //  1   -            1   3
 *      //     / \              / \
 *      //    2   -     ==>    2  -1
 *      //       / \              / \
 *      //      3   -            3   4
 *      //         / \              / \
 *      //        4   0            4   0
 *
 * @symb R.reduceRight(f, a, [b, c, d]) = f(b, f(c, f(d, a)))
 */


var reduceRight = /*#__PURE__*/_curry3(function reduceRight(fn, acc, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    acc = fn(list[idx], acc);
    idx -= 1;
  }
  return acc;
});
module.exports = reduceRight;
},{"./internal/_curry3":108}],254:[function(require,module,exports){
var _curryN = /*#__PURE__*/require('./internal/_curryN');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _reduced = /*#__PURE__*/require('./internal/_reduced');

/**
 * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating
 * through the list, successively calling the iterator function. `reduceWhile`
 * also takes a predicate that is evaluated before each step. If the predicate
 * returns `false`, it "short-circuits" the iteration and returns the current
 * value of the accumulator.
 *
 * @func
 * @memberOf R
 * @since v0.22.0
 * @category List
 * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} pred The predicate. It is passed the accumulator and the
 *        current element.
 * @param {Function} fn The iterator function. Receives two values, the
 *        accumulator and the current element.
 * @param {*} a The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced
 * @example
 *
 *      var isOdd = (acc, x) => x % 2 === 1;
 *      var xs = [1, 3, 5, 60, 777, 800];
 *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
 *
 *      var ys = [2, 4, 6]
 *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
 */


var reduceWhile = /*#__PURE__*/_curryN(4, [], function _reduceWhile(pred, fn, a, list) {
  return _reduce(function (acc, x) {
    return pred(acc, x) ? fn(acc, x) : _reduced(acc);
  }, a, list);
});
module.exports = reduceWhile;
},{"./internal/_curryN":109,"./internal/_reduce":139,"./internal/_reduced":140}],255:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _reduced = /*#__PURE__*/require('./internal/_reduced');

/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 *
 * Note: this optimization is unavailable to functions not explicitly listed
 * above. For instance, it is not currently supported by
 * [`reduceRight`](#reduceRight).
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category List
 * @sig a -> *
 * @param {*} x The final value of the reduce.
 * @return {*} The wrapped value.
 * @see R.reduce, R.transduce
 * @example
 *
 *     R.reduce(
 *       (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
 *       [],
 *       [1, 2, 3, 4, 5]) // [1, 2, 3]
 */


var reduced = /*#__PURE__*/_curry1(_reduced);
module.exports = reduced;
},{"./internal/_curry1":106,"./internal/_reduced":140}],256:[function(require,module,exports){
var _complement = /*#__PURE__*/require('./internal/_complement');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var filter = /*#__PURE__*/require('./filter');

/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      var isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */


var reject = /*#__PURE__*/_curry2(function reject(pred, filterable) {
  return filter(_complement(pred), filterable);
});
module.exports = reject;
},{"./filter":65,"./internal/_complement":101,"./internal/_curry2":107}],257:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} start The position to start removing elements
 * @param {Number} count The number of elements to remove
 * @param {Array} list The list to remove from
 * @return {Array} A new Array with `count` elements from `start` removed.
 * @example
 *
 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */


var remove = /*#__PURE__*/_curry3(function remove(start, count, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count);
  return result;
});
module.exports = remove;
},{"./internal/_curry3":108}],258:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var always = /*#__PURE__*/require('./always');

var times = /*#__PURE__*/require('./times');

/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig a -> n -> [a]
 * @param {*} value The value to repeat.
 * @param {Number} n The desired size of the output list.
 * @return {Array} A new array containing `n` `value`s.
 * @see R.times
 * @example
 *
 *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 *
 *      var obj = {};
 *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
 *      repeatedObjs[0] === repeatedObjs[1]; //=> true
 * @symb R.repeat(a, 0) = []
 * @symb R.repeat(a, 1) = [a]
 * @symb R.repeat(a, 2) = [a, a]
 */


var repeat = /*#__PURE__*/_curry2(function repeat(value, n) {
  return times(always(value), n);
});
module.exports = repeat;
},{"./always":10,"./internal/_curry2":107,"./times":284}],259:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Replace a substring or regex match in a string with a replacement.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category String
 * @sig RegExp|String -> String -> String -> String
 * @param {RegExp|String} pattern A regular expression or a substring to match.
 * @param {String} replacement The string to replace the matches with.
 * @param {String} str The String to do the search and replacement in.
 * @return {String} The result.
 * @example
 *
 *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *
 *      // Use the "g" (global) flag to replace all occurrences:
 *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
 */


var replace = /*#__PURE__*/_curry3(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});
module.exports = replace;
},{"./internal/_curry3":108}],260:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _isString = /*#__PURE__*/require('./internal/_isString');

/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */


var reverse = /*#__PURE__*/_curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});
module.exports = reverse;
},{"./internal/_curry1":106,"./internal/_isString":130}],261:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Scan is similar to [`reduce`](#reduce), but returns a list of successively
 * reduced values from the left
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> [a]
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {Array} A list of all intermediately reduced values.
 * @see R.reduce
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 * @symb R.scan(f, a, [b, c]) = [a, f(a, b), f(f(a, b), c)]
 */


var scan = /*#__PURE__*/_curry3(function scan(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [acc];
  while (idx < len) {
    acc = fn(acc, list[idx]);
    result[idx + 1] = acc;
    idx += 1;
  }
  return result;
});
module.exports = scan;
},{"./internal/_curry3":108}],262:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var ap = /*#__PURE__*/require('./ap');

var map = /*#__PURE__*/require('./map');

var prepend = /*#__PURE__*/require('./prepend');

var reduceRight = /*#__PURE__*/require('./reduceRight');

/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of, Nothing());       //=> [Nothing()]
 */


var sequence = /*#__PURE__*/_curry2(function sequence(of, traversable) {
  return typeof traversable.sequence === 'function' ? traversable.sequence(of) : reduceRight(function (x, acc) {
    return ap(map(prepend, x), acc);
  }, of([]), traversable);
});
module.exports = sequence;
},{"./ap":14,"./internal/_curry2":107,"./map":189,"./prepend":241,"./reduceRight":253}],263:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var always = /*#__PURE__*/require('./always');

var over = /*#__PURE__*/require('./over');

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> a -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 */


var set = /*#__PURE__*/_curry3(function set(lens, v, x) {
  return over(lens, always(v), x);
});
module.exports = set;
},{"./always":10,"./internal/_curry3":108,"./over":225}],264:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */


var slice = /*#__PURE__*/_curry3( /*#__PURE__*/_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));
module.exports = slice;
},{"./internal/_checkForMethod":98,"./internal/_curry3":108}],265:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, a) -> Number) -> [a] -> [a]
 * @param {Function} comparator A sorting function :: a -> b -> Int
 * @param {Array} list The list to sort
 * @return {Array} a new array with its elements sorted by the comparator function.
 * @example
 *
 *      var diff = function(a, b) { return a - b; };
 *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */


var sort = /*#__PURE__*/_curry2(function sort(comparator, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});
module.exports = sort;
},{"./internal/_curry2":107}],266:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Sorts the list according to the supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord b => (a -> b) -> [a] -> [a]
 * @param {Function} fn
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted by the keys generated by `fn`.
 * @example
 *
 *      var sortByFirstItem = R.sortBy(R.prop(0));
 *      var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *      var alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      var bob = {
 *        name: 'Bob',
 *        age: -10
 *      };
 *      var clara = {
 *        name: 'clara',
 *        age: 314.159
 *      };
 *      var people = [clara, bob, alice];
 *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 */


var sortBy = /*#__PURE__*/_curry2(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});
module.exports = sortBy;
},{"./internal/_curry2":107}],267:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Sorts a list according to a list of comparators.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Relation
 * @sig [(a, a) -> Number] -> [a] -> [a]
 * @param {Array} functions A list of comparator functions.
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted according to the comarator functions.
 * @example
 *
 *      var alice = {
 *        name: 'alice',
 *        age: 40
 *      };
 *      var bob = {
 *        name: 'bob',
 *        age: 30
 *      };
 *      var clara = {
 *        name: 'clara',
 *        age: 40
 *      };
 *      var people = [clara, bob, alice];
 *      var ageNameSort = R.sortWith([
 *        R.descend(R.prop('age')),
 *        R.ascend(R.prop('name'))
 *      ]);
 *      ageNameSort(people); //=> [alice, clara, bob]
 */


var sortWith = /*#__PURE__*/_curry2(function sortWith(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var result = 0;
    var i = 0;
    while (result === 0 && i < fns.length) {
      result = fns[i](a, b);
      i += 1;
    }
    return result;
  });
});
module.exports = sortWith;
},{"./internal/_curry2":107}],268:[function(require,module,exports){
var invoker = /*#__PURE__*/require('./invoker');

/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig (String | RegExp) -> String -> [String]
 * @param {String|RegExp} sep The pattern.
 * @param {String} str The string to separate into an array.
 * @return {Array} The array of strings from `str` separated by `str`.
 * @see R.join
 * @example
 *
 *      var pathComponents = R.split('/');
 *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 *
 *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 */


var split = /*#__PURE__*/invoker(1, 'split');
module.exports = split;
},{"./invoker":170}],269:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var length = /*#__PURE__*/require('./length');

var slice = /*#__PURE__*/require('./slice');

/**
 * Splits a given list or string at a given index.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig Number -> [a] -> [[a], [a]]
 * @sig Number -> String -> [String, String]
 * @param {Number} index The index where the array/string is split.
 * @param {Array|String} array The array/string to be split.
 * @return {Array}
 * @example
 *
 *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
 *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
 *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
 */


var splitAt = /*#__PURE__*/_curry2(function splitAt(index, array) {
  return [slice(0, index, array), slice(index, length(array), array)];
});
module.exports = splitAt;
},{"./internal/_curry2":107,"./length":180,"./slice":264}],270:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var slice = /*#__PURE__*/require('./slice');

/**
 * Splits a collection into slices of the specified length.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @sig Number -> String -> [String]
 * @param {Number} n
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */


var splitEvery = /*#__PURE__*/_curry2(function splitEvery(n, list) {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }
  var result = [];
  var idx = 0;
  while (idx < list.length) {
    result.push(slice(idx, idx += n, list));
  }
  return result;
});
module.exports = splitEvery;
},{"./internal/_curry2":107,"./slice":264}],271:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 *
 *  - the result of concatenating the two output lists is equivalent to the input list;
 *  - none of the elements of the first output list satisfies the predicate; and
 *  - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a], [a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
 */


var splitWhen = /*#__PURE__*/_curry2(function splitWhen(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];

  while (idx < len && !pred(list[idx])) {
    prefix.push(list[idx]);
    idx += 1;
  }

  return [prefix, Array.prototype.slice.call(list, idx)];
});
module.exports = splitWhen;
},{"./internal/_curry2":107}],272:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var equals = /*#__PURE__*/require('./equals');

var take = /*#__PURE__*/require('./take');

/**
 * Checks if a list starts with the provided values
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> Boolean
 * @sig String -> Boolean
 * @param {*} prefix
 * @param {*} list
 * @return {Boolean}
 * @example
 *
 *      R.startsWith('a', 'abc')                //=> true
 *      R.startsWith('b', 'abc')                //=> false
 *      R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
 *      R.startsWith(['b'], ['a', 'b', 'c'])    //=> false
 */


var startsWith = /*#__PURE__*/_curry2(function (prefix, list) {
  return equals(take(prefix.length, list), prefix);
});
module.exports = startsWith;
},{"./equals":63,"./internal/_curry2":107,"./take":278}],273:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Subtracts its second argument from its first argument.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a - b`.
 * @see R.add
 * @example
 *
 *      R.subtract(10, 8); //=> 2
 *
 *      var minus5 = R.subtract(R.__, 5);
 *      minus5(17); //=> 12
 *
 *      var complementaryAngle = R.subtract(90);
 *      complementaryAngle(30); //=> 60
 *      complementaryAngle(72); //=> 18
 */


var subtract = /*#__PURE__*/_curry2(function subtract(a, b) {
  return Number(a) - Number(b);
});
module.exports = subtract;
},{"./internal/_curry2":107}],274:[function(require,module,exports){
var add = /*#__PURE__*/require('./add');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Adds together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The sum of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */


var sum = /*#__PURE__*/reduce(add, 0);
module.exports = sum;
},{"./add":5,"./reduce":251}],275:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var concat = /*#__PURE__*/require('./concat');

var difference = /*#__PURE__*/require('./difference');

/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
 * @example
 *
 *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
 *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
 */


var symmetricDifference = /*#__PURE__*/_curry2(function symmetricDifference(list1, list2) {
  return concat(difference(list1, list2), difference(list2, list1));
});
module.exports = symmetricDifference;
},{"./concat":35,"./difference":47,"./internal/_curry2":107}],276:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var concat = /*#__PURE__*/require('./concat');

var differenceWith = /*#__PURE__*/require('./differenceWith');

/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifference, R.difference, R.differenceWith
 * @example
 *
 *      var eqA = R.eqBy(R.prop('a'));
 *      var l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
 *      var l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
 *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
 */


var symmetricDifferenceWith = /*#__PURE__*/_curry3(function symmetricDifferenceWith(pred, list1, list2) {
  return concat(differenceWith(pred, list1, list2), differenceWith(pred, list2, list1));
});
module.exports = symmetricDifferenceWith;
},{"./concat":35,"./differenceWith":48,"./internal/_curry3":108}],277:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */


var tail = /*#__PURE__*/_curry1( /*#__PURE__*/_checkForMethod('tail', /*#__PURE__*/slice(1, Infinity)));
module.exports = tail;
},{"./internal/_checkForMethod":98,"./internal/_curry1":106,"./slice":264}],278:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xtake = /*#__PURE__*/require('./internal/_xtake');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 *
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*}
 * @see R.drop
 * @example
 *
 *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(3, 'ramda');               //=> 'ram'
 *
 *      var personnel = [
 *        'Dave Brubeck',
 *        'Paul Desmond',
 *        'Eugene Wright',
 *        'Joe Morello',
 *        'Gerry Mulligan',
 *        'Bob Bates',
 *        'Joe Dodge',
 *        'Ron Crotty'
 *      ];
 *
 *      var takeFive = R.take(5);
 *      takeFive(personnel);
 *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * @symb R.take(-1, [a, b]) = [a, b]
 * @symb R.take(0, [a, b]) = []
 * @symb R.take(1, [a, b]) = [a]
 * @symb R.take(2, [a, b]) = [a, b]
 */


var take = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['take'], _xtake, function take(n, xs) {
  return slice(0, n < 0 ? Infinity : n, xs);
}));
module.exports = take;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_xtake":161,"./slice":264}],279:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var drop = /*#__PURE__*/require('./drop');

/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */


var takeLast = /*#__PURE__*/_curry2(function takeLast(n, xs) {
  return drop(n >= 0 ? xs.length - n : 0, xs);
});
module.exports = takeLast;
},{"./drop":52,"./internal/_curry2":107}],280:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropLastWhile, R.addIndex
 * @example
 *
 *      var isNotOne = x => x !== 1;
 *
 *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
 *
 *      R.takeLastWhile(x => x !== 'R' , 'Ramda'); //=> 'amda'
 */


var takeLastWhile = /*#__PURE__*/_curry2(function takeLastWhile(fn, xs) {
  var idx = xs.length - 1;
  while (idx >= 0 && fn(xs[idx])) {
    idx -= 1;
  }
  return slice(idx + 1, Infinity, xs);
});
module.exports = takeLastWhile;
},{"./internal/_curry2":107,"./slice":264}],281:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xtakeWhile = /*#__PURE__*/require('./internal/_xtakeWhile');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * Dispatches to the `takeWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropWhile, R.transduce, R.addIndex
 * @example
 *
 *      var isNotFour = x => x !== 4;
 *
 *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 *
 *      R.takeWhile(x => x !== 'd' , 'Ramda'); //=> 'Ram'
 */


var takeWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['takeWhile'], _xtakeWhile, function takeWhile(fn, xs) {
  var idx = 0;
  var len = xs.length;
  while (idx < len && fn(xs[idx])) {
    idx += 1;
  }
  return slice(0, idx, xs);
}));
module.exports = takeWhile;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_xtakeWhile":162,"./slice":264}],282:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xtap = /*#__PURE__*/require('./internal/_xtap');

/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *      var sayX = x => console.log('x is ' + x);
 *      R.tap(sayX, 100); //=> 100
 *      // logs 'x is 100'
 * @symb R.tap(f, a) = a
 */


var tap = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xtap, function tap(fn, x) {
  fn(x);
  return x;
}));
module.exports = tap;
},{"./internal/_curry2":107,"./internal/_dispatchable":110,"./internal/_xtap":163}],283:[function(require,module,exports){
var _cloneRegExp = /*#__PURE__*/require('./internal/_cloneRegExp');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isRegExp = /*#__PURE__*/require('./internal/_isRegExp');

var toString = /*#__PURE__*/require('./toString');

/**
 * Determines whether a given string matches a given regular expression.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category String
 * @sig RegExp -> String -> Boolean
 * @param {RegExp} pattern
 * @param {String} str
 * @return {Boolean}
 * @see R.match
 * @example
 *
 *      R.test(/^x/, 'xyz'); //=> true
 *      R.test(/^y/, 'xyz'); //=> false
 */


var test = /*#__PURE__*/_curry2(function test(pattern, str) {
  if (!_isRegExp(pattern)) {
    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + toString(pattern));
  }
  return _cloneRegExp(pattern).test(str);
});
module.exports = test;
},{"./internal/_cloneRegExp":100,"./internal/_curry2":107,"./internal/_isRegExp":129,"./toString":288}],284:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @see R.repeat
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * @symb R.times(f, 0) = []
 * @symb R.times(f, 1) = [f(0)]
 * @symb R.times(f, 2) = [f(0), f(1)]
 */


var times = /*#__PURE__*/_curry2(function times(fn, n) {
  var len = Number(n);
  var idx = 0;
  var list;

  if (len < 0 || isNaN(len)) {
    throw new RangeError('n must be a non-negative number');
  }
  list = new Array(len);
  while (idx < len) {
    list[idx] = fn(idx);
    idx += 1;
  }
  return list;
});
module.exports = times;
},{"./internal/_curry2":107}],285:[function(require,module,exports){
var invoker = /*#__PURE__*/require('./invoker');

/**
 * The lower case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to lower case.
 * @return {String} The lower case version of `str`.
 * @see R.toUpper
 * @example
 *
 *      R.toLower('XYZ'); //=> 'xyz'
 */


var toLower = /*#__PURE__*/invoker(0, 'toLowerCase');
module.exports = toLower;
},{"./invoker":170}],286:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own properties.
 * @see R.fromPairs
 * @example
 *
 *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 */


var toPairs = /*#__PURE__*/_curry1(function toPairs(obj) {
  var pairs = [];
  for (var prop in obj) {
    if (_has(prop, obj)) {
      pairs[pairs.length] = [prop, obj[prop]];
    }
  }
  return pairs;
});
module.exports = toPairs;
},{"./internal/_curry1":106,"./internal/_has":118}],287:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own
 *         and prototype properties.
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
 */


var toPairsIn = /*#__PURE__*/_curry1(function toPairsIn(obj) {
  var pairs = [];
  for (var prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }
  return pairs;
});
module.exports = toPairsIn;
},{"./internal/_curry1":106}],288:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _toString = /*#__PURE__*/require('./internal/_toString');

/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */


var toString = /*#__PURE__*/_curry1(function toString(val) {
  return _toString(val, []);
});
module.exports = toString;
},{"./internal/_curry1":106,"./internal/_toString":143}],289:[function(require,module,exports){
var invoker = /*#__PURE__*/require('./invoker');

/**
 * The upper case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to upper case.
 * @return {String} The upper case version of `str`.
 * @see R.toLower
 * @example
 *
 *      R.toUpper('abc'); //=> 'ABC'
 */


var toUpper = /*#__PURE__*/invoker(0, 'toUpperCase');
module.exports = toUpper;
},{"./invoker":170}],290:[function(require,module,exports){
var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _xwrap = /*#__PURE__*/require('./internal/_xwrap');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 *
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 *
 * A transformer is an an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is
 * [`R.identity`](#identity). The init function can be used to provide an
 * initial accumulator, but is ignored by transduce.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (c -> c) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array. Wrapped as transformer, if necessary, and used to
 *        initialize the transducer
 * @param {*} acc The initial accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced, R.into
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
 *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 *
 *      var isOdd = (x) => x % 2 === 1;
 *      var firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
 *      R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
 */


var transduce = /*#__PURE__*/curryN(4, function transduce(xf, fn, acc, list) {
  return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
});
module.exports = transduce;
},{"./curryN":43,"./internal/_reduce":139,"./internal/_xwrap":164}],291:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [[a]] -> [[a]]
 * @param {Array} list A 2D list
 * @return {Array} A 2D list
 * @example
 *
 *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
 *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 *      // If some of the rows are shorter than the following rows, their elements are skipped:
 *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
 * @symb R.transpose([[a], [b], [c]]) = [a, b, c]
 * @symb R.transpose([[a, b], [c, d]]) = [[a, c], [b, d]]
 * @symb R.transpose([[a, b], [c]]) = [[a, c], [b]]
 */


var transpose = /*#__PURE__*/_curry1(function transpose(outerlist) {
  var i = 0;
  var result = [];
  while (i < outerlist.length) {
    var innerlist = outerlist[i];
    var j = 0;
    while (j < innerlist.length) {
      if (typeof result[j] === 'undefined') {
        result[j] = [];
      }
      result[j].push(innerlist[j]);
      j += 1;
    }
    i += 1;
  }
  return result;
});
module.exports = transpose;
},{"./internal/_curry1":106}],292:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var map = /*#__PURE__*/require('./map');

var sequence = /*#__PURE__*/require('./sequence');

/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
 * @param {Function} of
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      // Returns `Nothing` if the given divisor is `0`
 *      safeDiv = n => d => d === 0 ? Nothing() : Just(n / d)
 *
 *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Just([5, 2.5, 2])
 *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Nothing
 */


var traverse = /*#__PURE__*/_curry3(function traverse(of, f, traversable) {
  return typeof traversable['fantasy-land/traverse'] === 'function' ? traversable['fantasy-land/traverse'](f, of) : sequence(of, map(f, traversable));
});
module.exports = traverse;
},{"./internal/_curry3":108,"./map":189,"./sequence":262}],293:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
var zeroWidth = '\u200b';
var hasProtoTrim = typeof String.prototype.trim === 'function';
/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to trim.
 * @return {String} Trimmed version of `str`.
 * @example
 *
 *      R.trim('   xyz  '); //=> 'xyz'
 *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
 */
var _trim = !hasProtoTrim || /*#__PURE__*/ws.trim() || ! /*#__PURE__*/zeroWidth.trim() ? function trim(str) {
  var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
  var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
  return str.replace(beginRx, '').replace(endRx, '');
} : function trim(str) {
  return str.trim();
};
var trim = /*#__PURE__*/_curry1(_trim);
module.exports = trim;
},{"./internal/_curry1":106}],294:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
 * @param {Function} tryer The function that may throw.
 * @param {Function} catcher The function that will be evaluated if `tryer` throws.
 * @return {Function} A new function that will catch exceptions and send then to the catcher.
 * @example
 *
 *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 *      R.tryCatch(R.prop('x'), R.F)(null);      //=> false
 */


var tryCatch = /*#__PURE__*/_curry2(function _tryCatch(tryer, catcher) {
  return _arity(tryer.length, function () {
    try {
      return tryer.apply(this, arguments);
    } catch (e) {
      return catcher.apply(this, _concat([e], arguments));
    }
  });
});
module.exports = tryCatch;
},{"./internal/_arity":95,"./internal/_concat":102,"./internal/_curry2":107}],295:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */


var type = /*#__PURE__*/_curry1(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});
module.exports = type;
},{"./internal/_curry1":106}],296:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * @symb R.unapply(f)(a, b) = f([a, b])
 */


var unapply = /*#__PURE__*/_curry1(function unapply(fn) {
  return function () {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});
module.exports = unapply;
},{"./internal/_curry1":106}],297:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var nAry = /*#__PURE__*/require('./nAry');

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> b) -> (a -> b)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 1.
 * @see R.binary, R.nAry
 * @example
 *
 *      var takesTwoArgs = function(a, b) {
 *        return [a, b];
 *      };
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.unary(takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only 1 argument is passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.unary(f)(a, b, c) = f(a)
 */


var unary = /*#__PURE__*/_curry1(function unary(fn) {
  return nAry(1, fn);
});
module.exports = unary;
},{"./internal/_curry1":106,"./nAry":213}],298:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Returns a function of arity `n` from a (manually) curried function.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Function
 * @sig Number -> (a -> b) -> (a -> c)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to uncurry.
 * @return {Function} A new function.
 * @see R.curry
 * @example
 *
 *      var addFour = a => b => c => d => a + b + c + d;
 *
 *      var uncurriedAddFour = R.uncurryN(4, addFour);
 *      uncurriedAddFour(1, 2, 3, 4); //=> 10
 */


var uncurryN = /*#__PURE__*/_curry2(function uncurryN(depth, fn) {
  return curryN(depth, function () {
    var currentDepth = 1;
    var value = fn;
    var idx = 0;
    var endIdx;
    while (currentDepth <= depth && typeof value === 'function') {
      endIdx = currentDepth === depth ? arguments.length : idx + value.length;
      value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));
      currentDepth += 1;
      idx = endIdx;
    }
    return value;
  });
});
module.exports = uncurryN;
},{"./curryN":43,"./internal/_curry2":107}],299:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 *
 * The iterator function receives one argument: *(seed)*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (a -> [b]) -> * -> [b]
 * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
 *        either false to quit iteration or an array of length two to proceed. The element
 *        at index 0 of this array will be added to the resulting array, and the element
 *        at index 1 will be passed to the next call to `fn`.
 * @param {*} seed The seed value.
 * @return {Array} The final list.
 * @example
 *
 *      var f = n => n > 50 ? false : [-n, n + 10];
 *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * @symb R.unfold(f, x) = [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...]
 */


var unfold = /*#__PURE__*/_curry2(function unfold(fn, seed) {
  var pair = fn(seed);
  var result = [];
  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn(pair[1]);
  }
  return result;
});
module.exports = unfold;
},{"./internal/_curry2":107}],300:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var compose = /*#__PURE__*/require('./compose');

var uniq = /*#__PURE__*/require('./uniq');

/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @example
 *
 *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 */


var union = /*#__PURE__*/_curry2( /*#__PURE__*/compose(uniq, _concat));
module.exports = union;
},{"./compose":32,"./internal/_concat":102,"./internal/_curry2":107,"./uniq":302}],301:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var uniqWith = /*#__PURE__*/require('./uniqWith');

/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [*] -> [*] -> [*]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @see R.union
 * @example
 *
 *      var l1 = [{a: 1}, {a: 2}];
 *      var l2 = [{a: 1}, {a: 4}];
 *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
 */


var unionWith = /*#__PURE__*/_curry3(function unionWith(pred, list1, list2) {
  return uniqWith(pred, _concat(list1, list2));
});
module.exports = unionWith;
},{"./internal/_concat":102,"./internal/_curry3":108,"./uniqWith":304}],302:[function(require,module,exports){
var identity = /*#__PURE__*/require('./identity');

var uniqBy = /*#__PURE__*/require('./uniqBy');

/**
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([1, '1']);     //=> [1, '1']
 *      R.uniq([[42], [42]]); //=> [[42]]
 */


var uniq = /*#__PURE__*/uniqBy(identity);
module.exports = uniq;
},{"./identity":83,"./uniqBy":303}],303:[function(require,module,exports){
var _Set = /*#__PURE__*/require('./internal/_Set');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */


var uniqBy = /*#__PURE__*/_curry2(function uniqBy(fn, list) {
  var set = new _Set();
  var result = [];
  var idx = 0;
  var appliedItem, item;

  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);
    if (set.add(appliedItem)) {
      result.push(item);
    }
    idx += 1;
  }
  return result;
});
module.exports = uniqBy;
},{"./internal/_Set":93,"./internal/_curry2":107}],304:[function(require,module,exports){
var _containsWith = /*#__PURE__*/require('./internal/_containsWith');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      var strEq = R.eqBy(String);
 *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
 *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
 *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
 *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
 */


var uniqWith = /*#__PURE__*/_curry2(function uniqWith(pred, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var item;
  while (idx < len) {
    item = list[idx];
    if (!_containsWith(pred, item, result)) {
      result[result.length] = item;
    }
    idx += 1;
  }
  return result;
});
module.exports = uniqWith;
},{"./internal/_containsWith":104,"./internal/_curry2":107}],305:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred        A predicate function
 * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
 *                               to a falsy value.
 * @param {*}        x           An object to test with the `pred` function and
 *                               pass to `whenFalseFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
 * @see R.ifElse, R.when
 * @example
 *
 *      let safeInc = R.unless(R.isNil, R.inc);
 *      safeInc(null); //=> null
 *      safeInc(1); //=> 2
 */


var unless = /*#__PURE__*/_curry3(function unless(pred, whenFalseFn, x) {
  return pred(x) ? x : whenFalseFn(x);
});
module.exports = unless;
},{"./internal/_curry3":108}],306:[function(require,module,exports){
var _identity = /*#__PURE__*/require('./internal/_identity');

var chain = /*#__PURE__*/require('./chain');

/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain c => c (c a) -> c a
 * @param {*} list
 * @return {*}
 * @see R.flatten, R.chain
 * @example
 *
 *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 */


var unnest = /*#__PURE__*/chain(_identity);
module.exports = unnest;
},{"./chain":27,"./internal/_identity":119}],307:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred A predicate function
 * @param {Function} fn The iterator function
 * @param {*} init Initial value
 * @return {*} Final value that satisfies predicate
 * @example
 *
 *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 */


var until = /*#__PURE__*/_curry3(function until(pred, fn, init) {
  var val = init;
  while (!pred(val)) {
    val = fn(val);
  }
  return val;
});
module.exports = until;
},{"./internal/_curry3":108}],308:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var adjust = /*#__PURE__*/require('./adjust');

var always = /*#__PURE__*/require('./always');

/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} idx The index to update.
 * @param {*} x The value to exist at the given index of the returned array.
 * @param {Array|Arguments} list The source array-like object to be updated.
 * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
 * @see R.adjust
 * @example
 *
 *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
 *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
 * @symb R.update(-1, a, [b, c]) = [b, a]
 * @symb R.update(0, a, [b, c]) = [a, c]
 * @symb R.update(1, a, [b, c]) = [b, a]
 */


var update = /*#__PURE__*/_curry3(function update(idx, x, list) {
  return adjust(always(x), idx, list);
});
module.exports = update;
},{"./adjust":7,"./always":10,"./internal/_curry3":108}],309:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 *
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {Array} transformers A list of transformer functions
 * @return {Function} The wrapped function.
 * @see R.converge
 * @example
 *
 *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
 */


var useWith = /*#__PURE__*/_curry2(function useWith(fn, transformers) {
  return curryN(transformers.length, function () {
    var args = [];
    var idx = 0;
    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});
module.exports = useWith;
},{"./curryN":43,"./internal/_curry2":107}],310:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var keys = /*#__PURE__*/require('./keys');

/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @see R.valuesIn, R.keys
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */


var values = /*#__PURE__*/_curry1(function values(obj) {
  var props = keys(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;
  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }
  return vals;
});
module.exports = values;
},{"./internal/_curry1":106,"./keys":176}],311:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own and prototype properties.
 * @see R.values, R.keysIn
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.valuesIn(f); //=> ['X', 'Y']
 */


var valuesIn = /*#__PURE__*/_curry1(function valuesIn(obj) {
  var prop;
  var vs = [];
  for (prop in obj) {
    vs[vs.length] = obj[prop];
  }
  return vs;
});
module.exports = valuesIn;
},{"./internal/_curry1":106}],312:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

// `Const` is a functor that effectively ignores the function given to `map`.


var Const = function (x) {
  return { value: x, 'fantasy-land/map': function () {
      return this;
    } };
};

/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> s -> a
 * @param {Lens} lens
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});  //=> 1
 *      R.view(xLens, {x: 4, y: 2});  //=> 4
 */
var view = /*#__PURE__*/_curry2(function view(lens, x) {
  // Using `Const` effectively ignores the setter function of the `lens`,
  // leaving the value returned by the getter function unmodified.
  return lens(Const)(x).value;
});
module.exports = view;
},{"./internal/_curry2":107}],313:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred       A predicate function
 * @param {Function} whenTrueFn A function to invoke when the `condition`
 *                              evaluates to a truthy value.
 * @param {*}        x          An object to test with the `pred` function and
 *                              pass to `whenTrueFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
 * @see R.ifElse, R.unless
 * @example
 *
 *      // truncate :: String -> String
 *      var truncate = R.when(
 *        R.propSatisfies(R.gt(R.__, 10), 'length'),
 *        R.pipe(R.take(10), R.append('…'), R.join(''))
 *      );
 *      truncate('12345');         //=> '12345'
 *      truncate('0123456789ABC'); //=> '0123456789…'
 */


var when = /*#__PURE__*/_curry3(function when(pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});
module.exports = when;
},{"./internal/_curry3":108}],314:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propSatisfies, R.whereEq
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.where({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('bar')),
 *        x: R.gt(R.__, 10),
 *        y: R.lt(R.__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 */


var where = /*#__PURE__*/_curry2(function where(spec, testObj) {
  for (var prop in spec) {
    if (_has(prop, spec) && !spec[prop](testObj[prop])) {
      return false;
    }
  }
  return true;
});
module.exports = where;
},{"./internal/_curry2":107,"./internal/_has":118}],315:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var equals = /*#__PURE__*/require('./equals');

var map = /*#__PURE__*/require('./map');

var where = /*#__PURE__*/require('./where');

/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in [`R.equals`](#equals) terms) as accessing that property of the
 * spec.
 *
 * `whereEq` is a specialization of [`where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @sig {String: *} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propEq, R.where
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.whereEq({a: 1, b: 2});
 *
 *      pred({a: 1});              //=> false
 *      pred({a: 1, b: 2});        //=> true
 *      pred({a: 1, b: 2, c: 3});  //=> true
 *      pred({a: 1, b: 1});        //=> false
 */


var whereEq = /*#__PURE__*/_curry2(function whereEq(spec, testObj) {
  return where(map(equals, spec), testObj);
});
module.exports = whereEq;
},{"./equals":63,"./internal/_curry2":107,"./map":189,"./where":314}],316:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./internal/_contains');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var flip = /*#__PURE__*/require('./flip');

var reject = /*#__PURE__*/require('./reject');

/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The values to be removed from `list2`.
 * @param {Array} list2 The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @see R.transduce, R.difference
 * @example
 *
 *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */


var without = /*#__PURE__*/_curry2(function (xs, list) {
  return reject(flip(_contains)(xs), list);
});
module.exports = without;
},{"./flip":71,"./internal/_contains":103,"./internal/_curry2":107,"./reject":256}],317:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * @symb R.xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]
 */


var xprod = /*#__PURE__*/_curry2(function xprod(a, b) {
  // = xprodWith(prepend); (takes about 3 times as long...)
  var idx = 0;
  var ilen = a.length;
  var j;
  var jlen = b.length;
  var result = [];
  while (idx < ilen) {
    j = 0;
    while (j < jlen) {
      result[result.length] = [a[idx], b[j]];
      j += 1;
    }
    idx += 1;
  }
  return result;
});
module.exports = xprod;
},{"./internal/_curry2":107}],318:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
 * @example
 *
 *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 * @symb R.zip([a, b, c], [d, e, f]) = [[a, d], [b, e], [c, f]]
 */


var zip = /*#__PURE__*/_curry2(function zip(a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }
  return rv;
});
module.exports = zip;
},{"./internal/_curry2":107}],319:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [String] -> [*] -> {String: *}
 * @param {Array} keys The array that will be properties on the output object.
 * @param {Array} values The list of values on the output object.
 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
 * @example
 *
 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 */


var zipObj = /*#__PURE__*/_curry2(function zipObj(keys, values) {
  var idx = 0;
  var len = Math.min(keys.length, values.length);
  var out = {};
  while (idx < len) {
    out[keys[idx]] = values[idx];
    idx += 1;
  }
  return out;
});
module.exports = zipObj;
},{"./internal/_curry2":107}],320:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Creates a new list out of the two supplied by applying the function to each
 * equally-positioned pair in the lists. The returned list is truncated to the
 * length of the shorter of the two input lists.
 *
 * @function
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> c) -> [a] -> [b] -> [c]
 * @param {Function} fn The function used to combine the two elements into one value.
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
 *         using `fn`.
 * @example
 *
 *      var f = (x, y) => {
 *        // ...
 *      };
 *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
 *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
 * @symb R.zipWith(fn, [a, b, c], [d, e, f]) = [fn(a, d), fn(b, e), fn(c, f)]
 */


var zipWith = /*#__PURE__*/_curry3(function zipWith(fn, a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = fn(a[idx], b[idx]);
    idx += 1;
  }
  return rv;
});
module.exports = zipWith;
},{"./internal/_curry3":108}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIm1haW4uanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL0YuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL1QuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL19fLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hZGQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FkZEluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hZGp1c3QuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYWxsUGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYWx3YXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hbmQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FueS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYW55UGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FwZXJ0dXJlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hcHBlbmQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FwcGx5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hcHBseVNwZWMuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FwcGx5VG8uanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FzY2VuZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYXNzb2MuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2Fzc29jUGF0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYmluYXJ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9iaW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9ib3RoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jYWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jaGFpbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY2xhbXAuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2Nsb25lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb21wYXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb21wbGVtZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb21wb3NlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb21wb3NlSy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY29tcG9zZVAuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2NvbmNhdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY29uZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY29uc3RydWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb25zdHJ1Y3ROLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb250YWlucy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY29udmVyZ2UuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2NvdW50QnkuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2N1cnJ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jdXJyeU4uanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2RlYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZGVmYXVsdFRvLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kZXNjZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kaWZmZXJlbmNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kaWZmZXJlbmNlV2l0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZGlzc29jLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kaXNzb2NQYXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kaXZpZGUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2Ryb3AuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2Ryb3BMYXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kcm9wTGFzdFdoaWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kcm9wUmVwZWF0cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZHJvcFJlcGVhdHNXaXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kcm9wV2hpbGUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2VpdGhlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZW1wdHkuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2VuZHNXaXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9lcUJ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9lcVByb3BzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9lcXVhbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2V2b2x2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZmlsdGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9maW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9maW5kSW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZpbmRMYXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9maW5kTGFzdEluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9mbGF0dGVuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9mbGlwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9mb3JFYWNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9mb3JFYWNoT2JqSW5kZXhlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZnJvbVBhaXJzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9ncm91cEJ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9ncm91cFdpdGguanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2d0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9ndGUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2hhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaGFzSW4uanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2hlYWQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2lkZW50aWNhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaWRlbnRpdHkuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2lmRWxzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW5jLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW5kZXhCeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW5kZXhPZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW5pdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW5uZXJKb2luLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnNlcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2luc2VydEFsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX1NldC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2FwZXJ0dXJlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fYXJpdHkuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19hcnJheUZyb21JdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2Fzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2NoZWNrRm9yTWV0aG9kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY2xvbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jbG9uZVJlZ0V4cC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2NvbXBsZW1lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jb25jYXQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jb250YWlucy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2NvbnRhaW5zV2l0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2NyZWF0ZVBhcnRpYWxBcHBsaWNhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkxLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnlOLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fZHJvcExhc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19kcm9wTGFzdFdoaWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fZXF1YWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fZmlsdGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fZmxhdENhdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2ZvcmNlUmVkdWNlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2Z1bmN0aW9uTmFtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2hhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lkZW50aXR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faW5kZXhPZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzQXJndW1lbnRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNBcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzQXJyYXlMaWtlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNGdW5jdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzSW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzTnVtYmVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNPYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc1BsYWNlaG9sZGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNSZWdFeHAuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc1N0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzVHJhbnNmb3JtZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19tYWtlRmxhdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX21hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX29iamVjdEFzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX29mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fcGlwZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3BpcGVQLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fcXVvdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19yZWR1Y2UuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19yZWR1Y2VkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fc3RlcENhdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3RvSVNPU3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fdG9TdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194YWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGFueS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hhcGVydHVyZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hjaGFpbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hkcm9wLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGRyb3BMYXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGRyb3BMYXN0V2hpbGUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194ZHJvcFJlcGVhdHNXaXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGRyb3BXaGlsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hmQmFzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hmaWx0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194ZmluZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hmaW5kSW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194ZmluZExhc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194ZmluZExhc3RJbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3htYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194cmVkdWNlQnkuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194dGFrZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3h0YWtlV2hpbGUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194dGFwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feHdyYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVyc2VjdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJzcGVyc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludG8uanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludmVydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW52ZXJ0T2JqLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnZva2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaXNFbXB0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaXNOaWwuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2pvaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2p1eHQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2tleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2tleXNJbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbGFzdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbGFzdEluZGV4T2YuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2xlbmd0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbGVucy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbGVuc0luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9sZW5zUGF0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbGVuc1Byb3AuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2xpZnQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2xpZnROLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9sdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbHRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL21hcEFjY3VtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tYXBBY2N1bVJpZ2h0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tYXBPYmpJbmRleGVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tYXRjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWF0aE1vZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWF4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tYXhCeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWVhbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWVkaWFuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tZW1vaXplLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tZW1vaXplV2l0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWVyZ2UuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL21lcmdlQWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tZXJnZURlZXBMZWZ0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tZXJnZURlZXBSaWdodC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWVyZ2VEZWVwV2l0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWVyZ2VEZWVwV2l0aEtleS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWVyZ2VXaXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tZXJnZVdpdGhLZXkuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL21pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWluQnkuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL21vZHVsby5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbXVsdGlwbHkuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL25BcnkuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL25lZ2F0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbm9uZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbm90LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9udGguanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL250aEFyZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvby5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvb2JqT2YuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL29mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9vbWl0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9vbmNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9vci5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvb3Zlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGFpci5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGFydGlhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGFydGlhbFJpZ2h0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wYXJ0aXRpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BhdGguanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BhdGhFcS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGF0aE9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wYXRoU2F0aXNmaWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9waWNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9waWNrQWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9waWNrQnkuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BpcGUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BpcGVLLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9waXBlUC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGx1Y2suanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3ByZXBlbmQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3Byb2R1Y3QuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3Byb2plY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3Byb3AuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3Byb3BFcS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcHJvcElzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wcm9wT3IuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3Byb3BTYXRpc2ZpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3Byb3BzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9yYW5nZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcmVkdWNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9yZWR1Y2VCeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcmVkdWNlUmlnaHQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3JlZHVjZVdoaWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9yZWR1Y2VkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9yZWplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3JlbW92ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcmVwZWF0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9yZXBsYWNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9yZXZlcnNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zY2FuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zZXF1ZW5jZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc2V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zbGljZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc29ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc29ydEJ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zb3J0V2l0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc3BsaXQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3NwbGl0QXQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3NwbGl0RXZlcnkuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3NwbGl0V2hlbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc3RhcnRzV2l0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc3VidHJhY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3N1bS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc3ltbWV0cmljRGlmZmVyZW5jZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc3ltbWV0cmljRGlmZmVyZW5jZVdpdGguanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3RhaWwuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3Rha2UuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3Rha2VMYXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90YWtlTGFzdFdoaWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90YWtlV2hpbGUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3RhcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdGVzdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdGltZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3RvTG93ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3RvUGFpcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3RvUGFpcnNJbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdG9TdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3RvVXBwZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3RyYW5zZHVjZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdHJhbnNwb3NlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90cmF2ZXJzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdHJpbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdHJ5Q2F0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3R5cGUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3VuYXBwbHkuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3VuYXJ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy91bmN1cnJ5Ti5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdW5mb2xkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy91bmlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdW5pb25XaXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy91bmlxLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy91bmlxQnkuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3VuaXFXaXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy91bmxlc3MuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3VubmVzdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdW50aWwuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3VwZGF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdXNlV2l0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdmFsdWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy92YWx1ZXNJbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdmlldy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvd2hlbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvd2hlcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3doZXJlRXEuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3dpdGhvdXQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3hwcm9kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy96aXAuanMiLCIuLi9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3ppcE9iai5qcyIsIi4uL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvemlwV2l0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibWFpbi5qc1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSID0gcmVxdWlyZSgncmFtZGEnKTtcblxudmFyIHNxdWFyZSA9IGZ1bmN0aW9uIHNxdWFyZSAoeCkgeyByZXR1cm4geCAqIHg7IH1cbnZhciBzcXVhcmVzID0gUi5jaGFpbihzcXVhcmUsIFsxLCAyLCAzLCA0LCA1XSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNwb25zZScpLmlubmVySFRNTCA9IHNxdWFyZXM7XG4iLCJ2YXIgYWx3YXlzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYWx3YXlzJyk7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IGFsd2F5cyByZXR1cm5zIGBmYWxzZWAuIEFueSBwYXNzZWQgaW4gcGFyYW1ldGVycyBhcmUgaWdub3JlZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC45LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAqIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7Kn1cbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAc2VlIFIuYWx3YXlzLCBSLlRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLkYoKTsgLy89PiBmYWxzZVxuICovXG5cblxudmFyIEYgPSAvKiNfX1BVUkVfXyovYWx3YXlzKGZhbHNlKTtcbm1vZHVsZS5leHBvcnRzID0gRjsiLCJ2YXIgYWx3YXlzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYWx3YXlzJyk7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IGFsd2F5cyByZXR1cm5zIGB0cnVlYC4gQW55IHBhc3NlZCBpbiBwYXJhbWV0ZXJzIGFyZSBpZ25vcmVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICogLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBzZWUgUi5hbHdheXMsIFIuRlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuVCgpOyAvLz0+IHRydWVcbiAqL1xuXG5cbnZhciBUID0gLyojX19QVVJFX18qL2Fsd2F5cyh0cnVlKTtcbm1vZHVsZS5leHBvcnRzID0gVDsiLCIvKipcbiAqIEEgc3BlY2lhbCBwbGFjZWhvbGRlciB2YWx1ZSB1c2VkIHRvIHNwZWNpZnkgXCJnYXBzXCIgd2l0aGluIGN1cnJpZWQgZnVuY3Rpb25zLFxuICogYWxsb3dpbmcgcGFydGlhbCBhcHBsaWNhdGlvbiBvZiBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzLCByZWdhcmRsZXNzIG9mXG4gKiB0aGVpciBwb3NpdGlvbnMuXG4gKlxuICogSWYgYGdgIGlzIGEgY3VycmllZCB0ZXJuYXJ5IGZ1bmN0aW9uIGFuZCBgX2AgaXMgYFIuX19gLCB0aGUgZm9sbG93aW5nIGFyZVxuICogZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gKiAgIC0gYGcoXywgMiwgXykoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoMSkoMylgXG4gKiAgIC0gYGcoXywgMikoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gKlxuICogQGNvbnN0YW50XG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjYuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGdyZWV0ID0gUi5yZXBsYWNlKCd7bmFtZX0nLCBSLl9fLCAnSGVsbG8sIHtuYW1lfSEnKTtcbiAqICAgICAgZ3JlZXQoJ0FsaWNlJyk7IC8vPT4gJ0hlbGxvLCBBbGljZSEnXG4gKi9cbm1vZHVsZS5leHBvcnRzID0geyAnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJzogdHJ1ZSB9OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIEFkZHMgdHdvIHZhbHVlcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gYVxuICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBzZWUgUi5zdWJ0cmFjdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuYWRkKDIsIDMpOyAgICAgICAvLz0+ICA1XG4gKiAgICAgIFIuYWRkKDcpKDEwKTsgICAgICAvLz0+IDE3XG4gKi9cblxuXG52YXIgYWRkID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gYWRkKGEsIGIpIHtcbiAgcmV0dXJuIE51bWJlcihhKSArIE51bWJlcihiKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBhZGQ7IiwidmFyIF9jb25jYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29uY2F0Jyk7XG5cbnZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY3VycnlOJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBsaXN0IGl0ZXJhdGlvbiBmdW5jdGlvbiBmcm9tIGFuIGV4aXN0aW5nIG9uZSBieSBhZGRpbmcgdHdvIG5ld1xuICogcGFyYW1ldGVycyB0byBpdHMgY2FsbGJhY2sgZnVuY3Rpb246IHRoZSBjdXJyZW50IGluZGV4LCBhbmQgdGhlIGVudGlyZSBsaXN0LlxuICpcbiAqIFRoaXMgd291bGQgdHVybiwgZm9yIGluc3RhbmNlLCBbYFIubWFwYF0oI21hcCkgZnVuY3Rpb24gaW50byBvbmUgdGhhdFxuICogbW9yZSBjbG9zZWx5IHJlc2VtYmxlcyBgQXJyYXkucHJvdG90eXBlLm1hcGAuIE5vdGUgdGhhdCB0aGlzIHdpbGwgb25seSB3b3JrXG4gKiBmb3IgZnVuY3Rpb25zIGluIHdoaWNoIHRoZSBpdGVyYXRpb24gY2FsbGJhY2sgZnVuY3Rpb24gaXMgdGhlIGZpcnN0XG4gKiBwYXJhbWV0ZXIsIGFuZCB3aGVyZSB0aGUgbGlzdCBpcyB0aGUgbGFzdCBwYXJhbWV0ZXIuIChUaGlzIGxhdHRlciBtaWdodCBiZVxuICogdW5pbXBvcnRhbnQgaWYgdGhlIGxpc3QgcGFyYW1ldGVyIGlzIG5vdCB1c2VkLilcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoYSAuLi4gLT4gYikgLi4uIC0+IFthXSAtPiAqKSAtPiAoYSAuLi4sIEludCwgW2FdIC0+IGIpIC4uLiAtPiBbYV0gLT4gKilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEEgbGlzdCBpdGVyYXRpb24gZnVuY3Rpb24gdGhhdCBkb2VzIG5vdCBwYXNzIGluZGV4IG9yIGxpc3QgdG8gaXRzIGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQW4gYWx0ZXJlZCBsaXN0IGl0ZXJhdGlvbiBmdW5jdGlvbiB0aGF0IHBhc3NlcyAoaXRlbSwgaW5kZXgsIGxpc3QpIHRvIGl0cyBjYWxsYmFja1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBtYXBJbmRleGVkID0gUi5hZGRJbmRleChSLm1hcCk7XG4gKiAgICAgIG1hcEluZGV4ZWQoKHZhbCwgaWR4KSA9PiBpZHggKyAnLScgKyB2YWwsIFsnZicsICdvJywgJ28nLCAnYicsICdhJywgJ3InXSk7XG4gKiAgICAgIC8vPT4gWycwLWYnLCAnMS1vJywgJzItbycsICczLWInLCAnNC1hJywgJzUtciddXG4gKi9cblxuXG52YXIgYWRkSW5kZXggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBhZGRJbmRleChmbikge1xuICByZXR1cm4gY3VycnlOKGZuLmxlbmd0aCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBpZHggPSAwO1xuICAgIHZhciBvcmlnRm4gPSBhcmd1bWVudHNbMF07XG4gICAgdmFyIGxpc3QgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICBhcmdzWzBdID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJlc3VsdCA9IG9yaWdGbi5hcHBseSh0aGlzLCBfY29uY2F0KGFyZ3VtZW50cywgW2lkeCwgbGlzdF0pKTtcbiAgICAgIGlkeCArPSAxO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gYWRkSW5kZXg7IiwidmFyIF9jb25jYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29uY2F0Jyk7XG5cbnZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byB0aGUgdmFsdWUgYXQgdGhlIGdpdmVuIGluZGV4IG9mIGFuIGFycmF5LCByZXR1cm5pbmcgYVxuICogbmV3IGNvcHkgb2YgdGhlIGFycmF5IHdpdGggdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IHJlcGxhY2VkIHdpdGggdGhlXG4gKiByZXN1bHQgb2YgdGhlIGZ1bmN0aW9uIGFwcGxpY2F0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE0LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhIC0+IGEpIC0+IE51bWJlciAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYXBwbHkuXG4gKiBAcGFyYW0ge051bWJlcn0gaWR4IFRoZSBpbmRleC5cbiAqIEBwYXJhbSB7QXJyYXl8QXJndW1lbnRzfSBsaXN0IEFuIGFycmF5LWxpa2Ugb2JqZWN0IHdob3NlIHZhbHVlXG4gKiAgICAgICAgYXQgdGhlIHN1cHBsaWVkIGluZGV4IHdpbGwgYmUgcmVwbGFjZWQuXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBjb3B5IG9mIHRoZSBzdXBwbGllZCBhcnJheS1saWtlIG9iamVjdCB3aXRoXG4gKiAgICAgICAgIHRoZSBlbGVtZW50IGF0IGluZGV4IGBpZHhgIHJlcGxhY2VkIHdpdGggdGhlIHZhbHVlXG4gKiAgICAgICAgIHJldHVybmVkIGJ5IGFwcGx5aW5nIGBmbmAgdG8gdGhlIGV4aXN0aW5nIGVsZW1lbnQuXG4gKiBAc2VlIFIudXBkYXRlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5hZGp1c3QoUi5hZGQoMTApLCAxLCBbMSwgMiwgM10pOyAgICAgLy89PiBbMSwgMTIsIDNdXG4gKiAgICAgIFIuYWRqdXN0KFIuYWRkKDEwKSkoMSkoWzEsIDIsIDNdKTsgICAgIC8vPT4gWzEsIDEyLCAzXVxuICogQHN5bWIgUi5hZGp1c3QoZiwgLTEsIFthLCBiXSkgPSBbYSwgZihiKV1cbiAqIEBzeW1iIFIuYWRqdXN0KGYsIDAsIFthLCBiXSkgPSBbZihhKSwgYl1cbiAqL1xuXG5cbnZhciBhZGp1c3QgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBhZGp1c3QoZm4sIGlkeCwgbGlzdCkge1xuICBpZiAoaWR4ID49IGxpc3QubGVuZ3RoIHx8IGlkeCA8IC1saXN0Lmxlbmd0aCkge1xuICAgIHJldHVybiBsaXN0O1xuICB9XG4gIHZhciBzdGFydCA9IGlkeCA8IDAgPyBsaXN0Lmxlbmd0aCA6IDA7XG4gIHZhciBfaWR4ID0gc3RhcnQgKyBpZHg7XG4gIHZhciBfbGlzdCA9IF9jb25jYXQobGlzdCk7XG4gIF9saXN0W19pZHhdID0gZm4obGlzdFtfaWR4XSk7XG4gIHJldHVybiBfbGlzdDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBhZGp1c3Q7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfZGlzcGF0Y2hhYmxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xuXG52YXIgX3hhbGwgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feGFsbCcpO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIGFsbCBlbGVtZW50cyBvZiB0aGUgbGlzdCBtYXRjaCB0aGUgcHJlZGljYXRlLCBgZmFsc2VgIGlmXG4gKiB0aGVyZSBhcmUgYW55IHRoYXQgZG9uJ3QuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYGFsbGAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgcHJlZGljYXRlIGlzIHNhdGlzZmllZCBieSBldmVyeSBlbGVtZW50LCBgZmFsc2VgXG4gKiAgICAgICAgIG90aGVyd2lzZS5cbiAqIEBzZWUgUi5hbnksIFIubm9uZSwgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZXF1YWxzMyA9IFIuZXF1YWxzKDMpO1xuICogICAgICBSLmFsbChlcXVhbHMzKShbMywgMywgMywgM10pOyAvLz0+IHRydWVcbiAqICAgICAgUi5hbGwoZXF1YWxzMykoWzMsIDMsIDEsIDNdKTsgLy89PiBmYWxzZVxuICovXG5cblxudmFyIGFsbCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbJ2FsbCddLCBfeGFsbCwgZnVuY3Rpb24gYWxsKGZuLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICBpZiAoIWZuKGxpc3RbaWR4XSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGFsbDsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIGN1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2N1cnJ5TicpO1xuXG52YXIgbWF4ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWF4Jyk7XG5cbnZhciBwbHVjayA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BsdWNrJyk7XG5cbnZhciByZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2UnKTtcblxuLyoqXG4gKiBUYWtlcyBhIGxpc3Qgb2YgcHJlZGljYXRlcyBhbmQgcmV0dXJucyBhIHByZWRpY2F0ZSB0aGF0IHJldHVybnMgdHJ1ZSBmb3IgYVxuICogZ2l2ZW4gbGlzdCBvZiBhcmd1bWVudHMgaWYgZXZlcnkgb25lIG9mIHRoZSBwcm92aWRlZCBwcmVkaWNhdGVzIGlzIHNhdGlzZmllZFxuICogYnkgdGhvc2UgYXJndW1lbnRzLlxuICpcbiAqIFRoZSBmdW5jdGlvbiByZXR1cm5lZCBpcyBhIGN1cnJpZWQgZnVuY3Rpb24gd2hvc2UgYXJpdHkgbWF0Y2hlcyB0aGF0IG9mIHRoZVxuICogaGlnaGVzdC1hcml0eSBwcmVkaWNhdGUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgWygqLi4uIC0+IEJvb2xlYW4pXSAtPiAoKi4uLiAtPiBCb29sZWFuKVxuICogQHBhcmFtIHtBcnJheX0gcHJlZGljYXRlcyBBbiBhcnJheSBvZiBwcmVkaWNhdGVzIHRvIGNoZWNrXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGNvbWJpbmVkIHByZWRpY2F0ZVxuICogQHNlZSBSLmFueVBhc3NcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaXNRdWVlbiA9IFIucHJvcEVxKCdyYW5rJywgJ1EnKTtcbiAqICAgICAgdmFyIGlzU3BhZGUgPSBSLnByb3BFcSgnc3VpdCcsICfimaDvuI4nKTtcbiAqICAgICAgdmFyIGlzUXVlZW5PZlNwYWRlcyA9IFIuYWxsUGFzcyhbaXNRdWVlbiwgaXNTcGFkZV0pO1xuICpcbiAqICAgICAgaXNRdWVlbk9mU3BhZGVzKHtyYW5rOiAnUScsIHN1aXQ6ICfimaPvuI4nfSk7IC8vPT4gZmFsc2VcbiAqICAgICAgaXNRdWVlbk9mU3BhZGVzKHtyYW5rOiAnUScsIHN1aXQ6ICfimaDvuI4nfSk7IC8vPT4gdHJ1ZVxuICovXG5cblxudmFyIGFsbFBhc3MgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBhbGxQYXNzKHByZWRzKSB7XG4gIHJldHVybiBjdXJyeU4ocmVkdWNlKG1heCwgMCwgcGx1Y2soJ2xlbmd0aCcsIHByZWRzKSksIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB2YXIgbGVuID0gcHJlZHMubGVuZ3RoO1xuICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgIGlmICghcHJlZHNbaWR4XS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gYWxsUGFzczsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBhbHdheXMgcmV0dXJucyB0aGUgZ2l2ZW4gdmFsdWUuIE5vdGUgdGhhdCBmb3JcbiAqIG5vbi1wcmltaXRpdmVzIHRoZSB2YWx1ZSByZXR1cm5lZCBpcyBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgdmFsdWUuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBrbm93biBhcyBgY29uc3RgLCBgY29uc3RhbnRgLCBvciBgS2AgKGZvciBLIGNvbWJpbmF0b3IpIGluXG4gKiBvdGhlciBsYW5ndWFnZXMgYW5kIGxpYnJhcmllcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBhIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gd3JhcCBpbiBhIGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBGdW5jdGlvbiA6OiAqIC0+IHZhbC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgdCA9IFIuYWx3YXlzKCdUZWUnKTtcbiAqICAgICAgdCgpOyAvLz0+ICdUZWUnXG4gKi9cblxuXG52YXIgYWx3YXlzID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gYWx3YXlzKHZhbCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB2YWw7XG4gIH07XG59KTtcbm1vZHVsZS5leHBvcnRzID0gYWx3YXlzOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIGJvdGggYXJndW1lbnRzIGFyZSBgdHJ1ZWA7IGBmYWxzZWAgb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnIGEgLT4gYiAtPiBhIHwgYlxuICogQHBhcmFtIHtBbnl9IGFcbiAqIEBwYXJhbSB7QW55fSBiXG4gKiBAcmV0dXJuIHtBbnl9IHRoZSBmaXJzdCBhcmd1bWVudCBpZiBpdCBpcyBmYWxzeSwgb3RoZXJ3aXNlIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gKiBAc2VlIFIuYm90aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuYW5kKHRydWUsIHRydWUpOyAvLz0+IHRydWVcbiAqICAgICAgUi5hbmQodHJ1ZSwgZmFsc2UpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuYW5kKGZhbHNlLCB0cnVlKTsgLy89PiBmYWxzZVxuICogICAgICBSLmFuZChmYWxzZSwgZmFsc2UpOyAvLz0+IGZhbHNlXG4gKi9cblxuXG52YXIgYW5kID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gYW5kKGEsIGIpIHtcbiAgcmV0dXJuIGEgJiYgYjtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBhbmQ7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfZGlzcGF0Y2hhYmxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xuXG52YXIgX3hhbnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feGFueScpO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIGF0IGxlYXN0IG9uZSBvZiBlbGVtZW50cyBvZiB0aGUgbGlzdCBtYXRjaCB0aGUgcHJlZGljYXRlLFxuICogYGZhbHNlYCBvdGhlcndpc2UuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYGFueWAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgcHJlZGljYXRlIGlzIHNhdGlzZmllZCBieSBhdCBsZWFzdCBvbmUgZWxlbWVudCwgYGZhbHNlYFxuICogICAgICAgICBvdGhlcndpc2UuXG4gKiBAc2VlIFIuYWxsLCBSLm5vbmUsIFIudHJhbnNkdWNlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGxlc3NUaGFuMCA9IFIuZmxpcChSLmx0KSgwKTtcbiAqICAgICAgdmFyIGxlc3NUaGFuMiA9IFIuZmxpcChSLmx0KSgyKTtcbiAqICAgICAgUi5hbnkobGVzc1RoYW4wKShbMSwgMl0pOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuYW55KGxlc3NUaGFuMikoWzEsIDJdKTsgLy89PiB0cnVlXG4gKi9cblxuXG52YXIgYW55ID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFsnYW55J10sIF94YW55LCBmdW5jdGlvbiBhbnkoZm4sIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgIGlmIChmbihsaXN0W2lkeF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBhbnk7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBjdXJyeU4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jdXJyeU4nKTtcblxudmFyIG1heCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21heCcpO1xuXG52YXIgcGx1Y2sgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wbHVjaycpO1xuXG52YXIgcmVkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVkdWNlJyk7XG5cbi8qKlxuICogVGFrZXMgYSBsaXN0IG9mIHByZWRpY2F0ZXMgYW5kIHJldHVybnMgYSBwcmVkaWNhdGUgdGhhdCByZXR1cm5zIHRydWUgZm9yIGFcbiAqIGdpdmVuIGxpc3Qgb2YgYXJndW1lbnRzIGlmIGF0IGxlYXN0IG9uZSBvZiB0aGUgcHJvdmlkZWQgcHJlZGljYXRlcyBpc1xuICogc2F0aXNmaWVkIGJ5IHRob3NlIGFyZ3VtZW50cy5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gcmV0dXJuZWQgaXMgYSBjdXJyaWVkIGZ1bmN0aW9uIHdob3NlIGFyaXR5IG1hdGNoZXMgdGhhdCBvZiB0aGVcbiAqIGhpZ2hlc3QtYXJpdHkgcHJlZGljYXRlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnIFsoKi4uLiAtPiBCb29sZWFuKV0gLT4gKCouLi4gLT4gQm9vbGVhbilcbiAqIEBwYXJhbSB7QXJyYXl9IHByZWRpY2F0ZXMgQW4gYXJyYXkgb2YgcHJlZGljYXRlcyB0byBjaGVja1xuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjb21iaW5lZCBwcmVkaWNhdGVcbiAqIEBzZWUgUi5hbGxQYXNzXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzQ2x1YiA9IFIucHJvcEVxKCdzdWl0JywgJ+KZoycpO1xuICogICAgICB2YXIgaXNTcGFkZSA9IFIucHJvcEVxKCdzdWl0JywgJ+KZoCcpO1xuICogICAgICB2YXIgaXNCbGFja0NhcmQgPSBSLmFueVBhc3MoW2lzQ2x1YiwgaXNTcGFkZV0pO1xuICpcbiAqICAgICAgaXNCbGFja0NhcmQoe3Jhbms6ICcxMCcsIHN1aXQ6ICfimaMnfSk7IC8vPT4gdHJ1ZVxuICogICAgICBpc0JsYWNrQ2FyZCh7cmFuazogJ1EnLCBzdWl0OiAn4pmgJ30pOyAvLz0+IHRydWVcbiAqICAgICAgaXNCbGFja0NhcmQoe3Jhbms6ICdRJywgc3VpdDogJ+KZpid9KTsgLy89PiBmYWxzZVxuICovXG5cblxudmFyIGFueVBhc3MgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBhbnlQYXNzKHByZWRzKSB7XG4gIHJldHVybiBjdXJyeU4ocmVkdWNlKG1heCwgMCwgcGx1Y2soJ2xlbmd0aCcsIHByZWRzKSksIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB2YXIgbGVuID0gcHJlZHMubGVuZ3RoO1xuICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgIGlmIChwcmVkc1tpZHhdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZHggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBhbnlQYXNzOyIsInZhciBfY29uY2F0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbmNhdCcpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9yZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fcmVkdWNlJyk7XG5cbnZhciBtYXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tYXAnKTtcblxuLyoqXG4gKiBhcCBhcHBsaWVzIGEgbGlzdCBvZiBmdW5jdGlvbnMgdG8gYSBsaXN0IG9mIHZhbHVlcy5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgYXBgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LiBBbHNvXG4gKiB0cmVhdHMgY3VycmllZCBmdW5jdGlvbnMgYXMgYXBwbGljYXRpdmVzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjMuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIFthIC0+IGJdIC0+IFthXSAtPiBbYl1cbiAqIEBzaWcgQXBwbHkgZiA9PiBmIChhIC0+IGIpIC0+IGYgYSAtPiBmIGJcbiAqIEBzaWcgKGEgLT4gYiAtPiBjKSAtPiAoYSAtPiBiKSAtPiAoYSAtPiBjKVxuICogQHBhcmFtIHsqfSBhcHBseUZcbiAqIEBwYXJhbSB7Kn0gYXBwbHlYXG4gKiBAcmV0dXJuIHsqfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuYXAoW1IubXVsdGlwbHkoMiksIFIuYWRkKDMpXSwgWzEsMiwzXSk7IC8vPT4gWzIsIDQsIDYsIDQsIDUsIDZdXG4gKiAgICAgIFIuYXAoW1IuY29uY2F0KCd0YXN0eSAnKSwgUi50b1VwcGVyXSwgWydwaXp6YScsICdzYWxhZCddKTsgLy89PiBbXCJ0YXN0eSBwaXp6YVwiLCBcInRhc3R5IHNhbGFkXCIsIFwiUElaWkFcIiwgXCJTQUxBRFwiXVxuICpcbiAqICAgICAgLy8gUi5hcCBjYW4gYWxzbyBiZSB1c2VkIGFzIFMgY29tYmluYXRvclxuICogICAgICAvLyB3aGVuIG9ubHkgdHdvIGZ1bmN0aW9ucyBhcmUgcGFzc2VkXG4gKiAgICAgIFIuYXAoUi5jb25jYXQsIFIudG9VcHBlcikoJ1JhbWRhJykgLy89PiAnUmFtZGFSQU1EQSdcbiAqIEBzeW1iIFIuYXAoW2YsIGddLCBbYSwgYl0pID0gW2YoYSksIGYoYiksIGcoYSksIGcoYildXG4gKi9cblxuXG52YXIgYXAgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBhcChhcHBseUYsIGFwcGx5WCkge1xuICByZXR1cm4gdHlwZW9mIGFwcGx5WFsnZmFudGFzeS1sYW5kL2FwJ10gPT09ICdmdW5jdGlvbicgPyBhcHBseVhbJ2ZhbnRhc3ktbGFuZC9hcCddKGFwcGx5RikgOiB0eXBlb2YgYXBwbHlGLmFwID09PSAnZnVuY3Rpb24nID8gYXBwbHlGLmFwKGFwcGx5WCkgOiB0eXBlb2YgYXBwbHlGID09PSAnZnVuY3Rpb24nID8gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gYXBwbHlGKHgpKGFwcGx5WCh4KSk7XG4gIH0gOlxuICAvLyBlbHNlXG4gIF9yZWR1Y2UoZnVuY3Rpb24gKGFjYywgZikge1xuICAgIHJldHVybiBfY29uY2F0KGFjYywgbWFwKGYsIGFwcGx5WCkpO1xuICB9LCBbXSwgYXBwbHlGKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBhcDsiLCJ2YXIgX2FwZXJ0dXJlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2FwZXJ0dXJlJyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF94YXBlcnR1cmUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feGFwZXJ0dXJlJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0LCBjb21wb3NlZCBvZiBuLXR1cGxlcyBvZiBjb25zZWN1dGl2ZSBlbGVtZW50cy4gSWYgYG5gIGlzXG4gKiBncmVhdGVyIHRoYW4gdGhlIGxlbmd0aCBvZiB0aGUgbGlzdCwgYW4gZW1wdHkgbGlzdCBpcyByZXR1cm5lZC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTIuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IFthXSAtPiBbW2FdXVxuICogQHBhcmFtIHtOdW1iZXJ9IG4gVGhlIHNpemUgb2YgdGhlIHR1cGxlcyB0byBjcmVhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gc3BsaXQgaW50byBgbmAtbGVuZ3RoIHR1cGxlc1xuICogQHJldHVybiB7QXJyYXl9IFRoZSByZXN1bHRpbmcgbGlzdCBvZiBgbmAtbGVuZ3RoIHR1cGxlc1xuICogQHNlZSBSLnRyYW5zZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuYXBlcnR1cmUoMiwgWzEsIDIsIDMsIDQsIDVdKTsgLy89PiBbWzEsIDJdLCBbMiwgM10sIFszLCA0XSwgWzQsIDVdXVxuICogICAgICBSLmFwZXJ0dXJlKDMsIFsxLCAyLCAzLCA0LCA1XSk7IC8vPT4gW1sxLCAyLCAzXSwgWzIsIDMsIDRdLCBbMywgNCwgNV1dXG4gKiAgICAgIFIuYXBlcnR1cmUoNywgWzEsIDIsIDMsIDQsIDVdKTsgLy89PiBbXVxuICovXG5cblxudmFyIGFwZXJ0dXJlID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFtdLCBfeGFwZXJ0dXJlLCBfYXBlcnR1cmUpKTtcbm1vZHVsZS5leHBvcnRzID0gYXBlcnR1cmU7IiwidmFyIF9jb25jYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29uY2F0Jyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCBjb250YWluaW5nIHRoZSBjb250ZW50cyBvZiB0aGUgZ2l2ZW4gbGlzdCwgZm9sbG93ZWQgYnlcbiAqIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgYSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0geyp9IGVsIFRoZSBlbGVtZW50IHRvIGFkZCB0byB0aGUgZW5kIG9mIHRoZSBuZXcgbGlzdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3Qgb2YgZWxlbWVudHMgdG8gYWRkIGEgbmV3IGl0ZW0gdG8uXG4gKiAgICAgICAgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBsaXN0IGNvbnRhaW5pbmcgdGhlIGVsZW1lbnRzIG9mIHRoZSBvbGQgbGlzdCBmb2xsb3dlZCBieSBgZWxgLlxuICogQHNlZSBSLnByZXBlbmRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmFwcGVuZCgndGVzdHMnLCBbJ3dyaXRlJywgJ21vcmUnXSk7IC8vPT4gWyd3cml0ZScsICdtb3JlJywgJ3Rlc3RzJ11cbiAqICAgICAgUi5hcHBlbmQoJ3Rlc3RzJywgW10pOyAvLz0+IFsndGVzdHMnXVxuICogICAgICBSLmFwcGVuZChbJ3Rlc3RzJ10sIFsnd3JpdGUnLCAnbW9yZSddKTsgLy89PiBbJ3dyaXRlJywgJ21vcmUnLCBbJ3Rlc3RzJ11dXG4gKi9cblxuXG52YXIgYXBwZW5kID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gYXBwZW5kKGVsLCBsaXN0KSB7XG4gIHJldHVybiBfY29uY2F0KGxpc3QsIFtlbF0pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGFwcGVuZDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBBcHBsaWVzIGZ1bmN0aW9uIGBmbmAgdG8gdGhlIGFyZ3VtZW50IGxpc3QgYGFyZ3NgLiBUaGlzIGlzIHVzZWZ1bCBmb3JcbiAqIGNyZWF0aW5nIGEgZml4ZWQtYXJpdHkgZnVuY3Rpb24gZnJvbSBhIHZhcmlhZGljIGZ1bmN0aW9uLiBgZm5gIHNob3VsZCBiZSBhXG4gKiBib3VuZCBmdW5jdGlvbiBpZiBjb250ZXh0IGlzIHNpZ25pZmljYW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjcuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgqLi4uIC0+IGEpIC0+IFsqXSAtPiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgd2l0aCBgYXJnc2BcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBjYWxsIGBmbmAgd2l0aFxuICogQHJldHVybiB7Kn0gcmVzdWx0IFRoZSByZXN1bHQsIGVxdWl2YWxlbnQgdG8gYGZuKC4uLmFyZ3MpYFxuICogQHNlZSBSLmNhbGwsIFIudW5hcHBseVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBudW1zID0gWzEsIDIsIDMsIC05OSwgNDIsIDYsIDddO1xuICogICAgICBSLmFwcGx5KE1hdGgubWF4LCBudW1zKTsgLy89PiA0MlxuICogQHN5bWIgUi5hcHBseShmLCBbYSwgYiwgY10pID0gZihhLCBiLCBjKVxuICovXG5cblxudmFyIGFwcGx5ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gYXBwbHkoZm4sIGFyZ3MpIHtcbiAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGFwcGx5OyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgYXBwbHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hcHBseScpO1xuXG52YXIgY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY3VycnlOJyk7XG5cbnZhciBtYXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tYXAnKTtcblxudmFyIG1heCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21heCcpO1xuXG52YXIgcGx1Y2sgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wbHVjaycpO1xuXG52YXIgcmVkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVkdWNlJyk7XG5cbnZhciB2YWx1ZXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi92YWx1ZXMnKTtcblxuLyoqXG4gKiBHaXZlbiBhIHNwZWMgb2JqZWN0IHJlY3Vyc2l2ZWx5IG1hcHBpbmcgcHJvcGVydGllcyB0byBmdW5jdGlvbnMsIGNyZWF0ZXMgYVxuICogZnVuY3Rpb24gcHJvZHVjaW5nIGFuIG9iamVjdCBvZiB0aGUgc2FtZSBzdHJ1Y3R1cmUsIGJ5IG1hcHBpbmcgZWFjaCBwcm9wZXJ0eVxuICogdG8gdGhlIHJlc3VsdCBvZiBjYWxsaW5nIGl0cyBhc3NvY2lhdGVkIGZ1bmN0aW9uIHdpdGggdGhlIHN1cHBsaWVkIGFyZ3VtZW50cy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yMC4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcge2s6ICgoYSwgYiwgLi4uLCBtKSAtPiB2KX0gLT4gKChhLCBiLCAuLi4sIG0pIC0+IHtrOiB2fSlcbiAqIEBwYXJhbSB7T2JqZWN0fSBzcGVjIGFuIG9iamVjdCByZWN1cnNpdmVseSBtYXBwaW5nIHByb3BlcnRpZXMgdG8gZnVuY3Rpb25zIGZvclxuICogICAgICAgIHByb2R1Y2luZyB0aGUgdmFsdWVzIGZvciB0aGVzZSBwcm9wZXJ0aWVzLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIG9iamVjdCBvZiB0aGUgc2FtZSBzdHJ1Y3R1cmVcbiAqIGFzIGBzcGVjJywgd2l0aCBlYWNoIHByb3BlcnR5IHNldCB0byB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgY2FsbGluZyBpdHNcbiAqIGFzc29jaWF0ZWQgZnVuY3Rpb24gd2l0aCB0aGUgc3VwcGxpZWQgYXJndW1lbnRzLlxuICogQHNlZSBSLmNvbnZlcmdlLCBSLmp1eHRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZ2V0TWV0cmljcyA9IFIuYXBwbHlTcGVjKHtcbiAqICAgICAgICBzdW06IFIuYWRkLFxuICogICAgICAgIG5lc3RlZDogeyBtdWw6IFIubXVsdGlwbHkgfVxuICogICAgICB9KTtcbiAqICAgICAgZ2V0TWV0cmljcygyLCA0KTsgLy8gPT4geyBzdW06IDYsIG5lc3RlZDogeyBtdWw6IDggfSB9XG4gKiBAc3ltYiBSLmFwcGx5U3BlYyh7IHg6IGYsIHk6IHsgejogZyB9IH0pKGEsIGIpID0geyB4OiBmKGEsIGIpLCB5OiB7IHo6IGcoYSwgYikgfSB9XG4gKi9cblxuXG52YXIgYXBwbHlTcGVjID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gYXBwbHlTcGVjKHNwZWMpIHtcbiAgc3BlYyA9IG1hcChmdW5jdGlvbiAodikge1xuICAgIHJldHVybiB0eXBlb2YgdiA9PSAnZnVuY3Rpb24nID8gdiA6IGFwcGx5U3BlYyh2KTtcbiAgfSwgc3BlYyk7XG4gIHJldHVybiBjdXJyeU4ocmVkdWNlKG1heCwgMCwgcGx1Y2soJ2xlbmd0aCcsIHZhbHVlcyhzcGVjKSkpLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG1hcChmdW5jdGlvbiAoZikge1xuICAgICAgcmV0dXJuIGFwcGx5KGYsIGFyZ3MpO1xuICAgIH0sIHNwZWMpO1xuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBhcHBseVNwZWM7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuKiBUYWtlcyBhIHZhbHVlIGFuZCBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gaXQuXG4qXG4qIFRoaXMgZnVuY3Rpb24gaXMgYWxzbyBrbm93biBhcyB0aGUgYHRocnVzaGAgY29tYmluYXRvci5cbipcbiogQGZ1bmNcbiogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yNS4wXG4qIEBjYXRlZ29yeSBGdW5jdGlvblxuKiBAc2lnIGEgLT4gKGEgLT4gYikgLT4gYlxuKiBAcGFyYW0geyp9IHggVGhlIHZhbHVlXG4qIEBwYXJhbSB7RnVuY3Rpb259IGYgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5XG4qIEByZXR1cm4geyp9IFRoZSByZXN1bHQgb2YgYXBwbHlpbmcgYGZgIHRvIGB4YFxuKiBAZXhhbXBsZVxuKlxuKiAgICAgIHZhciB0NDIgPSBSLmFwcGx5VG8oNDIpO1xuKiAgICAgIHQ0MihSLmlkZW50aXR5KTsgLy89PiA0MlxuKiAgICAgIHQ0MihSLmFkZCgxKSk7IC8vPT4gNDNcbiovXG5cblxudmFyIGFwcGx5VG8gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBhcHBseVRvKHgsIGYpIHtcbiAgcmV0dXJuIGYoeCk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gYXBwbHlUbzsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBNYWtlcyBhbiBhc2NlbmRpbmcgY29tcGFyYXRvciBmdW5jdGlvbiBvdXQgb2YgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSB2YWx1ZVxuICogdGhhdCBjYW4gYmUgY29tcGFyZWQgd2l0aCBgPGAgYW5kIGA+YC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yMy4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgT3JkIGIgPT4gKGEgLT4gYikgLT4gYSAtPiBhIC0+IE51bWJlclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gQSBmdW5jdGlvbiBvZiBhcml0eSBvbmUgdGhhdCByZXR1cm5zIGEgdmFsdWUgdGhhdCBjYW4gYmUgY29tcGFyZWRcbiAqIEBwYXJhbSB7Kn0gYSBUaGUgZmlyc3QgaXRlbSB0byBiZSBjb21wYXJlZC5cbiAqIEBwYXJhbSB7Kn0gYiBUaGUgc2Vjb25kIGl0ZW0gdG8gYmUgY29tcGFyZWQuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGAtMWAgaWYgZm4oYSkgPCBmbihiKSwgYDFgIGlmIGZuKGIpIDwgZm4oYSksIG90aGVyd2lzZSBgMGBcbiAqIEBzZWUgUi5kZXNjZW5kXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGJ5QWdlID0gUi5hc2NlbmQoUi5wcm9wKCdhZ2UnKSk7XG4gKiAgICAgIHZhciBwZW9wbGUgPSBbXG4gKiAgICAgICAgLy8gLi4uXG4gKiAgICAgIF07XG4gKiAgICAgIHZhciBwZW9wbGVCeVlvdW5nZXN0Rmlyc3QgPSBSLnNvcnQoYnlBZ2UsIHBlb3BsZSk7XG4gKi9cblxuXG52YXIgYXNjZW5kID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gYXNjZW5kKGZuLCBhLCBiKSB7XG4gIHZhciBhYSA9IGZuKGEpO1xuICB2YXIgYmIgPSBmbihiKTtcbiAgcmV0dXJuIGFhIDwgYmIgPyAtMSA6IGFhID4gYmIgPyAxIDogMDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBhc2NlbmQ7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogTWFrZXMgYSBzaGFsbG93IGNsb25lIG9mIGFuIG9iamVjdCwgc2V0dGluZyBvciBvdmVycmlkaW5nIHRoZSBzcGVjaWZpZWRcbiAqIHByb3BlcnR5IHdpdGggdGhlIGdpdmVuIHZhbHVlLiBOb3RlIHRoYXQgdGhpcyBjb3BpZXMgYW5kIGZsYXR0ZW5zIHByb3RvdHlwZVxuICogcHJvcGVydGllcyBvbnRvIHRoZSBuZXcgb2JqZWN0IGFzIHdlbGwuIEFsbCBub24tcHJpbWl0aXZlIHByb3BlcnRpZXMgYXJlXG4gKiBjb3BpZWQgYnkgcmVmZXJlbmNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjguMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyBTdHJpbmcgLT4gYSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcCBUaGUgcHJvcGVydHkgbmFtZSB0byBzZXRcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSBuZXcgdmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBjbG9uZVxuICogQHJldHVybiB7T2JqZWN0fSBBIG5ldyBvYmplY3QgZXF1aXZhbGVudCB0byB0aGUgb3JpZ2luYWwgZXhjZXB0IGZvciB0aGUgY2hhbmdlZCBwcm9wZXJ0eS5cbiAqIEBzZWUgUi5kaXNzb2NcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmFzc29jKCdjJywgMywge2E6IDEsIGI6IDJ9KTsgLy89PiB7YTogMSwgYjogMiwgYzogM31cbiAqL1xuXG5cbnZhciBhc3NvYyA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIGFzc29jKHByb3AsIHZhbCwgb2JqKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZm9yICh2YXIgcCBpbiBvYmopIHtcbiAgICByZXN1bHRbcF0gPSBvYmpbcF07XG4gIH1cbiAgcmVzdWx0W3Byb3BdID0gdmFsO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGFzc29jOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgX2hhcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19oYXMnKTtcblxudmFyIF9pc0FycmF5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzQXJyYXknKTtcblxudmFyIF9pc0ludGVnZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNJbnRlZ2VyJyk7XG5cbnZhciBhc3NvYyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2Fzc29jJyk7XG5cbnZhciBpc05pbCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2lzTmlsJyk7XG5cbi8qKlxuICogTWFrZXMgYSBzaGFsbG93IGNsb25lIG9mIGFuIG9iamVjdCwgc2V0dGluZyBvciBvdmVycmlkaW5nIHRoZSBub2RlcyByZXF1aXJlZFxuICogdG8gY3JlYXRlIHRoZSBnaXZlbiBwYXRoLCBhbmQgcGxhY2luZyB0aGUgc3BlY2lmaWMgdmFsdWUgYXQgdGhlIHRhaWwgZW5kIG9mXG4gKiB0aGF0IHBhdGguIE5vdGUgdGhhdCB0aGlzIGNvcGllcyBhbmQgZmxhdHRlbnMgcHJvdG90eXBlIHByb3BlcnRpZXMgb250byB0aGVcbiAqIG5ldyBvYmplY3QgYXMgd2VsbC4gQWxsIG5vbi1wcmltaXRpdmUgcHJvcGVydGllcyBhcmUgY29waWVkIGJ5IHJlZmVyZW5jZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBJZHggPSBTdHJpbmcgfCBJbnRcbiAqIEBzaWcgW0lkeF0gLT4gYSAtPiB7YX0gLT4ge2F9XG4gKiBAcGFyYW0ge0FycmF5fSBwYXRoIHRoZSBwYXRoIHRvIHNldFxuICogQHBhcmFtIHsqfSB2YWwgVGhlIG5ldyB2YWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgbmV3IG9iamVjdCBlcXVpdmFsZW50IHRvIHRoZSBvcmlnaW5hbCBleGNlcHQgYWxvbmcgdGhlIHNwZWNpZmllZCBwYXRoLlxuICogQHNlZSBSLmRpc3NvY1BhdGhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmFzc29jUGF0aChbJ2EnLCAnYicsICdjJ10sIDQyLCB7YToge2I6IHtjOiAwfX19KTsgLy89PiB7YToge2I6IHtjOiA0Mn19fVxuICpcbiAqICAgICAgLy8gQW55IG1pc3Npbmcgb3Igbm9uLW9iamVjdCBrZXlzIGluIHBhdGggd2lsbCBiZSBvdmVycmlkZGVuXG4gKiAgICAgIFIuYXNzb2NQYXRoKFsnYScsICdiJywgJ2MnXSwgNDIsIHthOiA1fSk7IC8vPT4ge2E6IHtiOiB7YzogNDJ9fX1cbiAqL1xuXG5cbnZhciBhc3NvY1BhdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBhc3NvY1BhdGgocGF0aCwgdmFsLCBvYmopIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuICB2YXIgaWR4ID0gcGF0aFswXTtcbiAgaWYgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgIHZhciBuZXh0T2JqID0gIWlzTmlsKG9iaikgJiYgX2hhcyhpZHgsIG9iaikgPyBvYmpbaWR4XSA6IF9pc0ludGVnZXIocGF0aFsxXSkgPyBbXSA6IHt9O1xuICAgIHZhbCA9IGFzc29jUGF0aChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwYXRoLCAxKSwgdmFsLCBuZXh0T2JqKTtcbiAgfVxuICBpZiAoX2lzSW50ZWdlcihpZHgpICYmIF9pc0FycmF5KG9iaikpIHtcbiAgICB2YXIgYXJyID0gW10uY29uY2F0KG9iaik7XG4gICAgYXJyW2lkeF0gPSB2YWw7XG4gICAgcmV0dXJuIGFycjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYXNzb2MoaWR4LCB2YWwsIG9iaik7XG4gIH1cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBhc3NvY1BhdGg7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBuQXJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbkFyeScpO1xuXG4vKipcbiAqIFdyYXBzIGEgZnVuY3Rpb24gb2YgYW55IGFyaXR5IChpbmNsdWRpbmcgbnVsbGFyeSkgaW4gYSBmdW5jdGlvbiB0aGF0IGFjY2VwdHNcbiAqIGV4YWN0bHkgMiBwYXJhbWV0ZXJzLiBBbnkgZXh0cmFuZW91cyBwYXJhbWV0ZXJzIHdpbGwgbm90IGJlIHBhc3NlZCB0byB0aGVcbiAqIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgqIC0+IGMpIC0+IChhLCBiIC0+IGMpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB3cmFwcGluZyBgZm5gLiBUaGUgbmV3IGZ1bmN0aW9uIGlzIGd1YXJhbnRlZWQgdG8gYmUgb2ZcbiAqICAgICAgICAgYXJpdHkgMi5cbiAqIEBzZWUgUi5uQXJ5LCBSLnVuYXJ5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHRha2VzVGhyZWVBcmdzID0gZnVuY3Rpb24oYSwgYiwgYykge1xuICogICAgICAgIHJldHVybiBbYSwgYiwgY107XG4gKiAgICAgIH07XG4gKiAgICAgIHRha2VzVGhyZWVBcmdzLmxlbmd0aDsgLy89PiAzXG4gKiAgICAgIHRha2VzVGhyZWVBcmdzKDEsIDIsIDMpOyAvLz0+IFsxLCAyLCAzXVxuICpcbiAqICAgICAgdmFyIHRha2VzVHdvQXJncyA9IFIuYmluYXJ5KHRha2VzVGhyZWVBcmdzKTtcbiAqICAgICAgdGFrZXNUd29BcmdzLmxlbmd0aDsgLy89PiAyXG4gKiAgICAgIC8vIE9ubHkgMiBhcmd1bWVudHMgYXJlIHBhc3NlZCB0byB0aGUgd3JhcHBlZCBmdW5jdGlvblxuICogICAgICB0YWtlc1R3b0FyZ3MoMSwgMiwgMyk7IC8vPT4gWzEsIDIsIHVuZGVmaW5lZF1cbiAqIEBzeW1iIFIuYmluYXJ5KGYpKGEsIGIsIGMpID0gZihhLCBiKVxuICovXG5cblxudmFyIGJpbmFyeSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGJpbmFyeShmbikge1xuICByZXR1cm4gbkFyeSgyLCBmbik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gYmluYXJ5OyIsInZhciBfYXJpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXJpdHknKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaXMgYm91bmQgdG8gYSBjb250ZXh0LlxuICogTm90ZTogYFIuYmluZGAgZG9lcyBub3QgcHJvdmlkZSB0aGUgYWRkaXRpb25hbCBhcmd1bWVudC1iaW5kaW5nIGNhcGFiaWxpdGllcyBvZlxuICogW0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9GdW5jdGlvbi9iaW5kKS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC42LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyAoKiAtPiAqKSAtPiB7Kn0gLT4gKCogLT4gKilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiaW5kIHRvIGNvbnRleHRcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzT2JqIFRoZSBjb250ZXh0IHRvIGJpbmQgYGZuYCB0b1xuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCB3aWxsIGV4ZWN1dGUgaW4gdGhlIGNvbnRleHQgb2YgYHRoaXNPYmpgLlxuICogQHNlZSBSLnBhcnRpYWxcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbG9nID0gUi5iaW5kKGNvbnNvbGUubG9nLCBjb25zb2xlKTtcbiAqICAgICAgUi5waXBlKFIuYXNzb2MoJ2EnLCAyKSwgUi50YXAobG9nKSwgUi5hc3NvYygnYScsIDMpKSh7YTogMX0pOyAvLz0+IHthOiAzfVxuICogICAgICAvLyBsb2dzIHthOiAyfVxuICogQHN5bWIgUi5iaW5kKGYsIG8pKGEsIGIpID0gZi5jYWxsKG8sIGEsIGIpXG4gKi9cblxuXG52YXIgYmluZCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNPYmopIHtcbiAgcmV0dXJuIF9hcml0eShmbi5sZW5ndGgsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc09iaiwgYXJndW1lbnRzKTtcbiAgfSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gYmluZDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9pc0Z1bmN0aW9uID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzRnVuY3Rpb24nKTtcblxudmFyIGFuZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2FuZCcpO1xuXG52YXIgbGlmdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2xpZnQnKTtcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHdoaWNoIGNhbGxzIHRoZSB0d28gcHJvdmlkZWQgZnVuY3Rpb25zIGFuZCByZXR1cm5zIHRoZSBgJiZgXG4gKiBvZiB0aGUgcmVzdWx0cy5cbiAqIEl0IHJldHVybnMgdGhlIHJlc3VsdCBvZiB0aGUgZmlyc3QgZnVuY3Rpb24gaWYgaXQgaXMgZmFsc2UteSBhbmQgdGhlIHJlc3VsdFxuICogb2YgdGhlIHNlY29uZCBmdW5jdGlvbiBvdGhlcndpc2UuIE5vdGUgdGhhdCB0aGlzIGlzIHNob3J0LWNpcmN1aXRlZCxcbiAqIG1lYW5pbmcgdGhhdCB0aGUgc2Vjb25kIGZ1bmN0aW9uIHdpbGwgbm90IGJlIGludm9rZWQgaWYgdGhlIGZpcnN0IHJldHVybnMgYVxuICogZmFsc2UteSB2YWx1ZS5cbiAqXG4gKiBJbiBhZGRpdGlvbiB0byBmdW5jdGlvbnMsIGBSLmJvdGhgIGFsc28gYWNjZXB0cyBhbnkgZmFudGFzeS1sYW5kIGNvbXBhdGlibGVcbiAqIGFwcGxpY2F0aXZlIGZ1bmN0b3IuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTIuMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnICgqLi4uIC0+IEJvb2xlYW4pIC0+ICgqLi4uIC0+IEJvb2xlYW4pIC0+ICgqLi4uIC0+IEJvb2xlYW4pXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmIEEgcHJlZGljYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBnIEFub3RoZXIgcHJlZGljYXRlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gYSBmdW5jdGlvbiB0aGF0IGFwcGxpZXMgaXRzIGFyZ3VtZW50cyB0byBgZmAgYW5kIGBnYCBhbmQgYCYmYHMgdGhlaXIgb3V0cHV0cyB0b2dldGhlci5cbiAqIEBzZWUgUi5hbmRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZ3QxMCA9IFIuZ3QoUi5fXywgMTApXG4gKiAgICAgIHZhciBsdDIwID0gUi5sdChSLl9fLCAyMClcbiAqICAgICAgdmFyIGYgPSBSLmJvdGgoZ3QxMCwgbHQyMCk7XG4gKiAgICAgIGYoMTUpOyAvLz0+IHRydWVcbiAqICAgICAgZigzMCk7IC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciBib3RoID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gYm90aChmLCBnKSB7XG4gIHJldHVybiBfaXNGdW5jdGlvbihmKSA/IGZ1bmN0aW9uIF9ib3RoKCkge1xuICAgIHJldHVybiBmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgJiYgZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9IDogbGlmdChhbmQpKGYsIGcpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGJvdGg7IiwidmFyIGN1cnJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY3VycnknKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgY2FsbGluZyBpdHMgZmlyc3QgYXJndW1lbnQgd2l0aCB0aGUgcmVtYWluaW5nXG4gKiBhcmd1bWVudHMuIFRoaXMgaXMgb2NjYXNpb25hbGx5IHVzZWZ1bCBhcyBhIGNvbnZlcmdpbmcgZnVuY3Rpb24gZm9yXG4gKiBbYFIuY29udmVyZ2VgXSgjY29udmVyZ2UpOiB0aGUgZmlyc3QgYnJhbmNoIGNhbiBwcm9kdWNlIGEgZnVuY3Rpb24gd2hpbGUgdGhlXG4gKiByZW1haW5pbmcgYnJhbmNoZXMgcHJvZHVjZSB2YWx1ZXMgdG8gYmUgcGFzc2VkIHRvIHRoYXQgZnVuY3Rpb24gYXMgaXRzXG4gKiBhcmd1bWVudHMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCouLi4gLT4gYSksKi4uLiAtPiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgdG8gdGhlIHJlbWFpbmluZyBhcmd1bWVudHMuXG4gKiBAcGFyYW0gey4uLip9IGFyZ3MgQW55IG51bWJlciBvZiBwb3NpdGlvbmFsIGFyZ3VtZW50cy5cbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIuYXBwbHlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmNhbGwoUi5hZGQsIDEsIDIpOyAvLz0+IDNcbiAqXG4gKiAgICAgIHZhciBpbmRlbnROID0gUi5waXBlKFIucmVwZWF0KCcgJyksXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIFIuam9pbignJyksXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIFIucmVwbGFjZSgvXig/ISQpL2dtKSk7XG4gKlxuICogICAgICB2YXIgZm9ybWF0ID0gUi5jb252ZXJnZShSLmNhbGwsIFtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFIucGlwZShSLnByb3AoJ2luZGVudCcpLCBpbmRlbnROKSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFIucHJvcCgndmFsdWUnKVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAqXG4gKiAgICAgIGZvcm1hdCh7aW5kZW50OiAyLCB2YWx1ZTogJ2Zvb1xcbmJhclxcbmJhelxcbid9KTsgLy89PiAnICBmb29cXG4gIGJhclxcbiAgYmF6XFxuJ1xuICogQHN5bWIgUi5jYWxsKGYsIGEsIGIpID0gZihhLCBiKVxuICovXG5cblxudmFyIGNhbGwgPSAvKiNfX1BVUkVfXyovY3VycnkoZnVuY3Rpb24gY2FsbChmbikge1xuICByZXR1cm4gZm4uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gY2FsbDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9kaXNwYXRjaGFibGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG5cbnZhciBfbWFrZUZsYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fbWFrZUZsYXQnKTtcblxudmFyIF94Y2hhaW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feGNoYWluJyk7XG5cbnZhciBtYXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tYXAnKTtcblxuLyoqXG4gKiBgY2hhaW5gIG1hcHMgYSBmdW5jdGlvbiBvdmVyIGEgbGlzdCBhbmQgY29uY2F0ZW5hdGVzIHRoZSByZXN1bHRzLiBgY2hhaW5gXG4gKiBpcyBhbHNvIGtub3duIGFzIGBmbGF0TWFwYCBpbiBzb21lIGxpYnJhcmllc1xuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBjaGFpbmAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQsXG4gKiBhY2NvcmRpbmcgdG8gdGhlIFtGYW50YXN5TGFuZCBDaGFpbiBzcGVjXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI2NoYWluKS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4zLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIENoYWluIG0gPT4gKGEgLT4gbSBiKSAtPiBtIGEgLT4gbSBiXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gbWFwIHdpdGhcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gbWFwIG92ZXJcbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgcmVzdWx0IG9mIGZsYXQtbWFwcGluZyBgbGlzdGAgd2l0aCBgZm5gXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGR1cGxpY2F0ZSA9IG4gPT4gW24sIG5dO1xuICogICAgICBSLmNoYWluKGR1cGxpY2F0ZSwgWzEsIDIsIDNdKTsgLy89PiBbMSwgMSwgMiwgMiwgMywgM11cbiAqXG4gKiAgICAgIFIuY2hhaW4oUi5hcHBlbmQsIFIuaGVhZCkoWzEsIDIsIDNdKTsgLy89PiBbMSwgMiwgMywgMV1cbiAqL1xuXG5cbnZhciBjaGFpbiA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbJ2ZhbnRhc3ktbGFuZC9jaGFpbicsICdjaGFpbiddLCBfeGNoYWluLCBmdW5jdGlvbiBjaGFpbihmbiwgbW9uYWQpIHtcbiAgaWYgKHR5cGVvZiBtb25hZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuIGZuKG1vbmFkKHgpKSh4KTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBfbWFrZUZsYXQoZmFsc2UpKG1hcChmbiwgbW9uYWQpKTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gY2hhaW47IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogUmVzdHJpY3RzIGEgbnVtYmVyIHRvIGJlIHdpdGhpbiBhIHJhbmdlLlxuICpcbiAqIEFsc28gd29ya3MgZm9yIG90aGVyIG9yZGVyZWQgdHlwZXMgc3VjaCBhcyBTdHJpbmdzIGFuZCBEYXRlcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yMC4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgT3JkIGEgPT4gYSAtPiBhIC0+IGEgLT4gYVxuICogQHBhcmFtIHtOdW1iZXJ9IG1pbmltdW0gVGhlIGxvd2VyIGxpbWl0IG9mIHRoZSBjbGFtcCAoaW5jbHVzaXZlKVxuICogQHBhcmFtIHtOdW1iZXJ9IG1heGltdW0gVGhlIHVwcGVyIGxpbWl0IG9mIHRoZSBjbGFtcCAoaW5jbHVzaXZlKVxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIFZhbHVlIHRvIGJlIGNsYW1wZWRcbiAqIEByZXR1cm4ge051bWJlcn0gUmV0dXJucyBgbWluaW11bWAgd2hlbiBgdmFsIDwgbWluaW11bWAsIGBtYXhpbXVtYCB3aGVuIGB2YWwgPiBtYXhpbXVtYCwgcmV0dXJucyBgdmFsYCBvdGhlcndpc2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmNsYW1wKDEsIDEwLCAtNSkgLy8gPT4gMVxuICogICAgICBSLmNsYW1wKDEsIDEwLCAxNSkgLy8gPT4gMTBcbiAqICAgICAgUi5jbGFtcCgxLCAxMCwgNCkgIC8vID0+IDRcbiAqL1xuXG5cbnZhciBjbGFtcCA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIGNsYW1wKG1pbiwgbWF4LCB2YWx1ZSkge1xuICBpZiAobWluID4gbWF4KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtaW4gbXVzdCBub3QgYmUgZ3JlYXRlciB0aGFuIG1heCBpbiBjbGFtcChtaW4sIG1heCwgdmFsdWUpJyk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlIDwgbWluID8gbWluIDogdmFsdWUgPiBtYXggPyBtYXggOiB2YWx1ZTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBjbGFtcDsiLCJ2YXIgX2Nsb25lID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Nsb25lJyk7XG5cbnZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWVwIGNvcHkgb2YgdGhlIHZhbHVlIHdoaWNoIG1heSBjb250YWluIChuZXN0ZWQpIGBBcnJheWBzIGFuZFxuICogYE9iamVjdGBzLCBgTnVtYmVyYHMsIGBTdHJpbmdgcywgYEJvb2xlYW5gcyBhbmQgYERhdGVgcy4gYEZ1bmN0aW9uYHMgYXJlXG4gKiBhc3NpZ25lZCBieSByZWZlcmVuY2UgcmF0aGVyIHRoYW4gY29waWVkXG4gKlxuICogRGlzcGF0Y2hlcyB0byBhIGBjbG9uZWAgbWV0aG9kIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHsqfSAtPiB7Kn1cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIG9iamVjdCBvciBhcnJheSB0byBjbG9uZVxuICogQHJldHVybiB7Kn0gQSBkZWVwbHkgY2xvbmVkIGNvcHkgb2YgYHZhbGBcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgb2JqZWN0cyA9IFt7fSwge30sIHt9XTtcbiAqICAgICAgdmFyIG9iamVjdHNDbG9uZSA9IFIuY2xvbmUob2JqZWN0cyk7XG4gKiAgICAgIG9iamVjdHMgPT09IG9iamVjdHNDbG9uZTsgLy89PiBmYWxzZVxuICogICAgICBvYmplY3RzWzBdID09PSBvYmplY3RzQ2xvbmVbMF07IC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciBjbG9uZSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGNsb25lKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS5jbG9uZSA9PT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLmNsb25lKCkgOiBfY2xvbmUodmFsdWUsIFtdLCBbXSwgdHJ1ZSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gY2xvbmU7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbi8qKlxuICogTWFrZXMgYSBjb21wYXJhdG9yIGZ1bmN0aW9uIG91dCBvZiBhIGZ1bmN0aW9uIHRoYXQgcmVwb3J0cyB3aGV0aGVyIHRoZSBmaXJzdFxuICogZWxlbWVudCBpcyBsZXNzIHRoYW4gdGhlIHNlY29uZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKGEsIGIpIC0+IEJvb2xlYW4pIC0+ICgoYSwgYikgLT4gTnVtYmVyKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSBmdW5jdGlvbiBvZiBhcml0eSB0d28gd2hpY2ggd2lsbCByZXR1cm4gYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudFxuICogaXMgbGVzcyB0aGFuIHRoZSBzZWNvbmQsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBGdW5jdGlvbiA6OiBhIC0+IGIgLT4gSW50IHRoYXQgcmV0dXJucyBgLTFgIGlmIGEgPCBiLCBgMWAgaWYgYiA8IGEsIG90aGVyd2lzZSBgMGBcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYnlBZ2UgPSBSLmNvbXBhcmF0b3IoKGEsIGIpID0+IGEuYWdlIDwgYi5hZ2UpO1xuICogICAgICB2YXIgcGVvcGxlID0gW1xuICogICAgICAgIC8vIC4uLlxuICogICAgICBdO1xuICogICAgICB2YXIgcGVvcGxlQnlJbmNyZWFzaW5nQWdlID0gUi5zb3J0KGJ5QWdlLCBwZW9wbGUpO1xuICovXG5cblxudmFyIGNvbXBhcmF0b3IgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBjb21wYXJhdG9yKHByZWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIHByZWQoYSwgYikgPyAtMSA6IHByZWQoYiwgYSkgPyAxIDogMDtcbiAgfTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBjb21wYXJhdG9yOyIsInZhciBsaWZ0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbGlmdCcpO1xuXG52YXIgbm90ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbm90Jyk7XG5cbi8qKlxuICogVGFrZXMgYSBmdW5jdGlvbiBgZmAgYW5kIHJldHVybnMgYSBmdW5jdGlvbiBgZ2Agc3VjaCB0aGF0IGlmIGNhbGxlZCB3aXRoIHRoZSBzYW1lIGFyZ3VtZW50c1xuICogd2hlbiBgZmAgcmV0dXJucyBhIFwidHJ1dGh5XCIgdmFsdWUsIGBnYCByZXR1cm5zIGBmYWxzZWAgYW5kIHdoZW4gYGZgIHJldHVybnMgYSBcImZhbHN5XCIgdmFsdWUgYGdgIHJldHVybnMgYHRydWVgLlxuICpcbiAqIGBSLmNvbXBsZW1lbnRgIG1heSBiZSBhcHBsaWVkIHRvIGFueSBmdW5jdG9yXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTIuMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnICgqLi4uIC0+ICopIC0+ICgqLi4uIC0+IEJvb2xlYW4pXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5ub3RcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaXNOb3ROaWwgPSBSLmNvbXBsZW1lbnQoUi5pc05pbCk7XG4gKiAgICAgIGlzTmlsKG51bGwpOyAvLz0+IHRydWVcbiAqICAgICAgaXNOb3ROaWwobnVsbCk7IC8vPT4gZmFsc2VcbiAqICAgICAgaXNOaWwoNyk7IC8vPT4gZmFsc2VcbiAqICAgICAgaXNOb3ROaWwoNyk7IC8vPT4gdHJ1ZVxuICovXG5cblxudmFyIGNvbXBsZW1lbnQgPSAvKiNfX1BVUkVfXyovbGlmdChub3QpO1xubW9kdWxlLmV4cG9ydHMgPSBjb21wbGVtZW50OyIsInZhciBwaXBlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGlwZScpO1xuXG52YXIgcmV2ZXJzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JldmVyc2UnKTtcblxuLyoqXG4gKiBQZXJmb3JtcyByaWdodC10by1sZWZ0IGZ1bmN0aW9uIGNvbXBvc2l0aW9uLiBUaGUgcmlnaHRtb3N0IGZ1bmN0aW9uIG1heSBoYXZlXG4gKiBhbnkgYXJpdHk7IHRoZSByZW1haW5pbmcgZnVuY3Rpb25zIG11c3QgYmUgdW5hcnkuXG4gKlxuICogKipOb3RlOioqIFRoZSByZXN1bHQgb2YgY29tcG9zZSBpcyBub3QgYXV0b21hdGljYWxseSBjdXJyaWVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoeSAtPiB6KSwgKHggLT4geSksIC4uLiwgKG8gLT4gcCksICgoYSwgYiwgLi4uLCBuKSAtPiBvKSkgLT4gKChhLCBiLCAuLi4sIG4pIC0+IHopXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSAuLi5mdW5jdGlvbnMgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5waXBlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGNsYXNzeUdyZWV0aW5nID0gKGZpcnN0TmFtZSwgbGFzdE5hbWUpID0+IFwiVGhlIG5hbWUncyBcIiArIGxhc3ROYW1lICsgXCIsIFwiICsgZmlyc3ROYW1lICsgXCIgXCIgKyBsYXN0TmFtZVxuICogICAgICB2YXIgeWVsbEdyZWV0aW5nID0gUi5jb21wb3NlKFIudG9VcHBlciwgY2xhc3N5R3JlZXRpbmcpO1xuICogICAgICB5ZWxsR3JlZXRpbmcoJ0phbWVzJywgJ0JvbmQnKTsgLy89PiBcIlRIRSBOQU1FJ1MgQk9ORCwgSkFNRVMgQk9ORFwiXG4gKlxuICogICAgICBSLmNvbXBvc2UoTWF0aC5hYnMsIFIuYWRkKDEpLCBSLm11bHRpcGx5KDIpKSgtNCkgLy89PiA3XG4gKlxuICogQHN5bWIgUi5jb21wb3NlKGYsIGcsIGgpKGEsIGIpID0gZihnKGgoYSwgYikpKVxuICovXG5cblxuZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvbXBvc2UgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIHBpcGUuYXBwbHkodGhpcywgcmV2ZXJzZShhcmd1bWVudHMpKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gY29tcG9zZTsiLCJ2YXIgY2hhaW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jaGFpbicpO1xuXG52YXIgY29tcG9zZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NvbXBvc2UnKTtcblxudmFyIG1hcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21hcCcpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHJpZ2h0LXRvLWxlZnQgS2xlaXNsaSBjb21wb3NpdGlvbiBvZiB0aGUgcHJvdmlkZWQgZnVuY3Rpb25zLFxuICogZWFjaCBvZiB3aGljaCBtdXN0IHJldHVybiBhIHZhbHVlIG9mIGEgdHlwZSBzdXBwb3J0ZWQgYnkgW2BjaGFpbmBdKCNjaGFpbikuXG4gKlxuICogYFIuY29tcG9zZUsoaCwgZywgZilgIGlzIGVxdWl2YWxlbnQgdG8gYFIuY29tcG9zZShSLmNoYWluKGgpLCBSLmNoYWluKGcpLCBmKWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTYuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIENoYWluIG0gPT4gKCh5IC0+IG0geiksICh4IC0+IG0geSksIC4uLiwgKGEgLT4gbSBiKSkgLT4gKGEgLT4gbSB6KVxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gLi4uZnVuY3Rpb25zIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAc2VlIFIucGlwZUtcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICAgLy8gIGdldCA6OiBTdHJpbmcgLT4gT2JqZWN0IC0+IE1heWJlICpcbiAqICAgICAgIHZhciBnZXQgPSBSLmN1cnJ5KChwcm9wTmFtZSwgb2JqKSA9PiBNYXliZShvYmpbcHJvcE5hbWVdKSlcbiAqXG4gKiAgICAgICAvLyAgZ2V0U3RhdGVDb2RlIDo6IE1heWJlIFN0cmluZyAtPiBNYXliZSBTdHJpbmdcbiAqICAgICAgIHZhciBnZXRTdGF0ZUNvZGUgPSBSLmNvbXBvc2VLKFxuICogICAgICAgICBSLmNvbXBvc2UoTWF5YmUub2YsIFIudG9VcHBlciksXG4gKiAgICAgICAgIGdldCgnc3RhdGUnKSxcbiAqICAgICAgICAgZ2V0KCdhZGRyZXNzJyksXG4gKiAgICAgICAgIGdldCgndXNlcicpLFxuICogICAgICAgKTtcbiAqICAgICAgIGdldFN0YXRlQ29kZSh7XCJ1c2VyXCI6e1wiYWRkcmVzc1wiOntcInN0YXRlXCI6XCJueVwifX19KTsgLy89PiBNYXliZS5KdXN0KFwiTllcIilcbiAqICAgICAgIGdldFN0YXRlQ29kZSh7fSk7IC8vPT4gTWF5YmUuTm90aGluZygpXG4gKiBAc3ltYiBSLmNvbXBvc2VLKGYsIGcsIGgpKGEpID0gUi5jaGFpbihmLCBSLmNoYWluKGcsIGgoYSkpKVxuICovXG5cblxuZnVuY3Rpb24gY29tcG9zZUsoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjb21wb3NlSyByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgfVxuICB2YXIgaW5pdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gIHZhciBsYXN0ID0gaW5pdC5wb3AoKTtcbiAgcmV0dXJuIGNvbXBvc2UoY29tcG9zZS5hcHBseSh0aGlzLCBtYXAoY2hhaW4sIGluaXQpKSwgbGFzdCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBvc2VLOyIsInZhciBwaXBlUCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BpcGVQJyk7XG5cbnZhciByZXZlcnNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmV2ZXJzZScpO1xuXG4vKipcbiAqIFBlcmZvcm1zIHJpZ2h0LXRvLWxlZnQgY29tcG9zaXRpb24gb2Ygb25lIG9yIG1vcmUgUHJvbWlzZS1yZXR1cm5pbmdcbiAqIGZ1bmN0aW9ucy4gVGhlIHJpZ2h0bW9zdCBmdW5jdGlvbiBtYXkgaGF2ZSBhbnkgYXJpdHk7IHRoZSByZW1haW5pbmdcbiAqIGZ1bmN0aW9ucyBtdXN0IGJlIHVuYXJ5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEwLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKHkgLT4gUHJvbWlzZSB6KSwgKHggLT4gUHJvbWlzZSB5KSwgLi4uLCAoYSAtPiBQcm9taXNlIGIpKSAtPiAoYSAtPiBQcm9taXNlIHopXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jdGlvbnMgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5waXBlUFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBkYiA9IHtcbiAqICAgICAgICB1c2Vyczoge1xuICogICAgICAgICAgSk9FOiB7XG4gKiAgICAgICAgICAgIG5hbWU6ICdKb2UnLFxuICogICAgICAgICAgICBmb2xsb3dlcnM6IFsnU1RFVkUnLCAnU1VaWSddXG4gKiAgICAgICAgICB9XG4gKiAgICAgICAgfVxuICogICAgICB9XG4gKlxuICogICAgICAvLyBXZSdsbCBwcmV0ZW5kIHRvIGRvIGEgZGIgbG9va3VwIHdoaWNoIHJldHVybnMgYSBwcm9taXNlXG4gKiAgICAgIHZhciBsb29rdXBVc2VyID0gKHVzZXJJZCkgPT4gUHJvbWlzZS5yZXNvbHZlKGRiLnVzZXJzW3VzZXJJZF0pXG4gKiAgICAgIHZhciBsb29rdXBGb2xsb3dlcnMgPSAodXNlcikgPT4gUHJvbWlzZS5yZXNvbHZlKHVzZXIuZm9sbG93ZXJzKVxuICogICAgICBsb29rdXBVc2VyKCdKT0UnKS50aGVuKGxvb2t1cEZvbGxvd2VycylcbiAqXG4gKiAgICAgIC8vICBmb2xsb3dlcnNGb3JVc2VyIDo6IFN0cmluZyAtPiBQcm9taXNlIFtVc2VySWRdXG4gKiAgICAgIHZhciBmb2xsb3dlcnNGb3JVc2VyID0gUi5jb21wb3NlUChsb29rdXBGb2xsb3dlcnMsIGxvb2t1cFVzZXIpO1xuICogICAgICBmb2xsb3dlcnNGb3JVc2VyKCdKT0UnKS50aGVuKGZvbGxvd2VycyA9PiBjb25zb2xlLmxvZygnRm9sbG93ZXJzOicsIGZvbGxvd2VycykpXG4gKiAgICAgIC8vIEZvbGxvd2VyczogW1wiU1RFVkVcIixcIlNVWllcIl1cbiAqL1xuXG5cbmZ1bmN0aW9uIGNvbXBvc2VQKCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY29tcG9zZVAgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIHBpcGVQLmFwcGx5KHRoaXMsIHJldmVyc2UoYXJndW1lbnRzKSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBvc2VQOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2lzQXJyYXkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNBcnJheScpO1xuXG52YXIgX2lzRnVuY3Rpb24gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNGdW5jdGlvbicpO1xuXG52YXIgX2lzU3RyaW5nID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzU3RyaW5nJyk7XG5cbnZhciB0b1N0cmluZyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIGNvbmNhdGVuYXRpbmcgdGhlIGdpdmVuIGxpc3RzIG9yIHN0cmluZ3MuXG4gKlxuICogTm90ZTogYFIuY29uY2F0YCBleHBlY3RzIGJvdGggYXJndW1lbnRzIHRvIGJlIG9mIHRoZSBzYW1lIHR5cGUsXG4gKiB1bmxpa2UgdGhlIG5hdGl2ZSBgQXJyYXkucHJvdG90eXBlLmNvbmNhdGAgbWV0aG9kLiBJdCB3aWxsIHRocm93XG4gKiBhbiBlcnJvciBpZiB5b3UgYGNvbmNhdGAgYW4gQXJyYXkgd2l0aCBhIG5vbi1BcnJheSB2YWx1ZS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgY29uY2F0YCBtZXRob2Qgb2YgdGhlIGZpcnN0IGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICogQ2FuIGFsc28gY29uY2F0ZW5hdGUgdHdvIG1lbWJlcnMgb2YgYSBbZmFudGFzeS1sYW5kXG4gKiBjb21wYXRpYmxlIHNlbWlncm91cF0oaHR0cHM6Ly9naXRodWIuY29tL2ZhbnRhc3lsYW5kL2ZhbnRhc3ktbGFuZCNzZW1pZ3JvdXApLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXSAtPiBbYV1cbiAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBmaXJzdExpc3QgVGhlIGZpcnN0IGxpc3RcbiAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBzZWNvbmRMaXN0IFRoZSBzZWNvbmQgbGlzdFxuICogQHJldHVybiB7QXJyYXl8U3RyaW5nfSBBIGxpc3QgY29uc2lzdGluZyBvZiB0aGUgZWxlbWVudHMgb2YgYGZpcnN0TGlzdGAgZm9sbG93ZWQgYnkgdGhlIGVsZW1lbnRzIG9mXG4gKiBgc2Vjb25kTGlzdGAuXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuY29uY2F0KCdBQkMnLCAnREVGJyk7IC8vICdBQkNERUYnXG4gKiAgICAgIFIuY29uY2F0KFs0LCA1LCA2XSwgWzEsIDIsIDNdKTsgLy89PiBbNCwgNSwgNiwgMSwgMiwgM11cbiAqICAgICAgUi5jb25jYXQoW10sIFtdKTsgLy89PiBbXVxuICovXG5cblxudmFyIGNvbmNhdCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGNvbmNhdChhLCBiKSB7XG4gIGlmIChfaXNBcnJheShhKSkge1xuICAgIGlmIChfaXNBcnJheShiKSkge1xuICAgICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHRvU3RyaW5nKGIpICsgJyBpcyBub3QgYW4gYXJyYXknKTtcbiAgfVxuICBpZiAoX2lzU3RyaW5nKGEpKSB7XG4gICAgaWYgKF9pc1N0cmluZyhiKSkge1xuICAgICAgcmV0dXJuIGEgKyBiO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHRvU3RyaW5nKGIpICsgJyBpcyBub3QgYSBzdHJpbmcnKTtcbiAgfVxuICBpZiAoYSAhPSBudWxsICYmIF9pc0Z1bmN0aW9uKGFbJ2ZhbnRhc3ktbGFuZC9jb25jYXQnXSkpIHtcbiAgICByZXR1cm4gYVsnZmFudGFzeS1sYW5kL2NvbmNhdCddKGIpO1xuICB9XG4gIGlmIChhICE9IG51bGwgJiYgX2lzRnVuY3Rpb24oYS5jb25jYXQpKSB7XG4gICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICB9XG4gIHRocm93IG5ldyBUeXBlRXJyb3IodG9TdHJpbmcoYSkgKyAnIGRvZXMgbm90IGhhdmUgYSBtZXRob2QgbmFtZWQgXCJjb25jYXRcIiBvciBcImZhbnRhc3ktbGFuZC9jb25jYXRcIicpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbmNhdDsiLCJ2YXIgX2FyaXR5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2FyaXR5Jyk7XG5cbnZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgbWFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWFwJyk7XG5cbnZhciBtYXggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tYXgnKTtcblxudmFyIHJlZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlZHVjZScpO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiwgYGZuYCwgd2hpY2ggZW5jYXBzdWxhdGVzIGBpZi9lbHNlLCBpZi9lbHNlLCAuLi5gIGxvZ2ljLlxuICogYFIuY29uZGAgdGFrZXMgYSBsaXN0IG9mIFtwcmVkaWNhdGUsIHRyYW5zZm9ybWVyXSBwYWlycy4gQWxsIG9mIHRoZSBhcmd1bWVudHNcbiAqIHRvIGBmbmAgYXJlIGFwcGxpZWQgdG8gZWFjaCBvZiB0aGUgcHJlZGljYXRlcyBpbiB0dXJuIHVudGlsIG9uZSByZXR1cm5zIGFcbiAqIFwidHJ1dGh5XCIgdmFsdWUsIGF0IHdoaWNoIHBvaW50IGBmbmAgcmV0dXJucyB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIGl0c1xuICogYXJndW1lbnRzIHRvIHRoZSBjb3JyZXNwb25kaW5nIHRyYW5zZm9ybWVyLiBJZiBub25lIG9mIHRoZSBwcmVkaWNhdGVzXG4gKiBtYXRjaGVzLCBgZm5gIHJldHVybnMgdW5kZWZpbmVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjYuMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnIFtbKCouLi4gLT4gQm9vbGVhbiksKCouLi4gLT4gKildXSAtPiAoKi4uLiAtPiAqKVxuICogQHBhcmFtIHtBcnJheX0gcGFpcnMgQSBsaXN0IG9mIFtwcmVkaWNhdGUsIHRyYW5zZm9ybWVyXVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGZuID0gUi5jb25kKFtcbiAqICAgICAgICBbUi5lcXVhbHMoMCksICAgUi5hbHdheXMoJ3dhdGVyIGZyZWV6ZXMgYXQgMMKwQycpXSxcbiAqICAgICAgICBbUi5lcXVhbHMoMTAwKSwgUi5hbHdheXMoJ3dhdGVyIGJvaWxzIGF0IDEwMMKwQycpXSxcbiAqICAgICAgICBbUi5ULCAgICAgICAgICAgdGVtcCA9PiAnbm90aGluZyBzcGVjaWFsIGhhcHBlbnMgYXQgJyArIHRlbXAgKyAnwrBDJ11cbiAqICAgICAgXSk7XG4gKiAgICAgIGZuKDApOyAvLz0+ICd3YXRlciBmcmVlemVzIGF0IDDCsEMnXG4gKiAgICAgIGZuKDUwKTsgLy89PiAnbm90aGluZyBzcGVjaWFsIGhhcHBlbnMgYXQgNTDCsEMnXG4gKiAgICAgIGZuKDEwMCk7IC8vPT4gJ3dhdGVyIGJvaWxzIGF0IDEwMMKwQydcbiAqL1xuXG5cbnZhciBjb25kID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gY29uZChwYWlycykge1xuICB2YXIgYXJpdHkgPSByZWR1Y2UobWF4LCAwLCBtYXAoZnVuY3Rpb24gKHBhaXIpIHtcbiAgICByZXR1cm4gcGFpclswXS5sZW5ndGg7XG4gIH0sIHBhaXJzKSk7XG4gIHJldHVybiBfYXJpdHkoYXJpdHksIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB3aGlsZSAoaWR4IDwgcGFpcnMubGVuZ3RoKSB7XG4gICAgICBpZiAocGFpcnNbaWR4XVswXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSB7XG4gICAgICAgIHJldHVybiBwYWlyc1tpZHhdWzFdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICBpZHggKz0gMTtcbiAgICB9XG4gIH0pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbmQ7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBjb25zdHJ1Y3ROID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY29uc3RydWN0TicpO1xuXG4vKipcbiAqIFdyYXBzIGEgY29uc3RydWN0b3IgZnVuY3Rpb24gaW5zaWRlIGEgY3VycmllZCBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWRcbiAqIHdpdGggdGhlIHNhbWUgYXJndW1lbnRzIGFuZCByZXR1cm5zIHRoZSBzYW1lIHR5cGUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCogLT4geyp9KSAtPiAoKiAtPiB7Kn0pXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIHdyYXBwZWQsIGN1cnJpZWQgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKiBAc2VlIFIuaW52b2tlclxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIC8vIENvbnN0cnVjdG9yIGZ1bmN0aW9uXG4gKiAgICAgIGZ1bmN0aW9uIEFuaW1hbChraW5kKSB7XG4gKiAgICAgICAgdGhpcy5raW5kID0ga2luZDtcbiAqICAgICAgfTtcbiAqICAgICAgQW5pbWFsLnByb3RvdHlwZS5zaWdodGluZyA9IGZ1bmN0aW9uKCkge1xuICogICAgICAgIHJldHVybiBcIkl0J3MgYSBcIiArIHRoaXMua2luZCArIFwiIVwiO1xuICogICAgICB9XG4gKlxuICogICAgICB2YXIgQW5pbWFsQ29uc3RydWN0b3IgPSBSLmNvbnN0cnVjdChBbmltYWwpXG4gKlxuICogICAgICAvLyBOb3RpY2Ugd2Ugbm8gbG9uZ2VyIG5lZWQgdGhlICduZXcnIGtleXdvcmQ6XG4gKiAgICAgIEFuaW1hbENvbnN0cnVjdG9yKCdQaWcnKTsgLy89PiB7XCJraW5kXCI6IFwiUGlnXCIsIFwic2lnaHRpbmdcIjogZnVuY3Rpb24gKCl7Li4ufX07XG4gKlxuICogICAgICB2YXIgYW5pbWFsVHlwZXMgPSBbXCJMaW9uXCIsIFwiVGlnZXJcIiwgXCJCZWFyXCJdO1xuICogICAgICB2YXIgYW5pbWFsU2lnaHRpbmcgPSBSLmludm9rZXIoMCwgJ3NpZ2h0aW5nJyk7XG4gKiAgICAgIHZhciBzaWdodE5ld0FuaW1hbCA9IFIuY29tcG9zZShhbmltYWxTaWdodGluZywgQW5pbWFsQ29uc3RydWN0b3IpO1xuICogICAgICBSLm1hcChzaWdodE5ld0FuaW1hbCwgYW5pbWFsVHlwZXMpOyAvLz0+IFtcIkl0J3MgYSBMaW9uIVwiLCBcIkl0J3MgYSBUaWdlciFcIiwgXCJJdCdzIGEgQmVhciFcIl1cbiAqL1xuXG5cbnZhciBjb25zdHJ1Y3QgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBjb25zdHJ1Y3QoRm4pIHtcbiAgcmV0dXJuIGNvbnN0cnVjdE4oRm4ubGVuZ3RoLCBGbik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gY29uc3RydWN0OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgY3VycnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jdXJyeScpO1xuXG52YXIgbkFyeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL25BcnknKTtcblxuLyoqXG4gKiBXcmFwcyBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGluc2lkZSBhIGN1cnJpZWQgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkXG4gKiB3aXRoIHRoZSBzYW1lIGFyZ3VtZW50cyBhbmQgcmV0dXJucyB0aGUgc2FtZSB0eXBlLiBUaGUgYXJpdHkgb2YgdGhlIGZ1bmN0aW9uXG4gKiByZXR1cm5lZCBpcyBzcGVjaWZpZWQgdG8gYWxsb3cgdXNpbmcgdmFyaWFkaWMgY29uc3RydWN0b3IgZnVuY3Rpb25zLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjQuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIE51bWJlciAtPiAoKiAtPiB7Kn0pIC0+ICgqIC0+IHsqfSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBhcml0eSBvZiB0aGUgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBGbiBUaGUgY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIHdyYXBwZWQsIGN1cnJpZWQgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgLy8gVmFyaWFkaWMgQ29uc3RydWN0b3IgZnVuY3Rpb25cbiAqICAgICAgZnVuY3Rpb24gU2FsYWQoKSB7XG4gKiAgICAgICAgdGhpcy5pbmdyZWRpZW50cyA9IGFyZ3VtZW50cztcbiAqICAgICAgfVxuICpcbiAqICAgICAgU2FsYWQucHJvdG90eXBlLnJlY2lwZSA9IGZ1bmN0aW9uKCkge1xuICogICAgICAgIHZhciBpbnN0cnVjdGlvbnMgPSBSLm1hcChpbmdyZWRpZW50ID0+ICdBZGQgYSBkb2xsb3Agb2YgJyArIGluZ3JlZGllbnQsIHRoaXMuaW5ncmVkaWVudHMpO1xuICogICAgICAgIHJldHVybiBSLmpvaW4oJ1xcbicsIGluc3RydWN0aW9ucyk7XG4gKiAgICAgIH07XG4gKlxuICogICAgICB2YXIgVGhyZWVMYXllclNhbGFkID0gUi5jb25zdHJ1Y3ROKDMsIFNhbGFkKTtcbiAqXG4gKiAgICAgIC8vIE5vdGljZSB3ZSBubyBsb25nZXIgbmVlZCB0aGUgJ25ldycga2V5d29yZCwgYW5kIHRoZSBjb25zdHJ1Y3RvciBpcyBjdXJyaWVkIGZvciAzIGFyZ3VtZW50cy5cbiAqICAgICAgdmFyIHNhbGFkID0gVGhyZWVMYXllclNhbGFkKCdNYXlvbm5haXNlJykoJ1BvdGF0byBDaGlwcycpKCdLZXRjaHVwJyk7XG4gKlxuICogICAgICBjb25zb2xlLmxvZyhzYWxhZC5yZWNpcGUoKSk7XG4gKiAgICAgIC8vIEFkZCBhIGRvbGxvcCBvZiBNYXlvbm5haXNlXG4gKiAgICAgIC8vIEFkZCBhIGRvbGxvcCBvZiBQb3RhdG8gQ2hpcHNcbiAqICAgICAgLy8gQWRkIGEgZG9sbG9wIG9mIEtldGNodXBcbiAqL1xuXG5cbnZhciBjb25zdHJ1Y3ROID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gY29uc3RydWN0TihuLCBGbikge1xuICBpZiAobiA+IDEwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb25zdHJ1Y3RvciB3aXRoIGdyZWF0ZXIgdGhhbiB0ZW4gYXJndW1lbnRzJyk7XG4gIH1cbiAgaWYgKG4gPT09IDApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBGbigpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGN1cnJ5KG5BcnkobiwgZnVuY3Rpb24gKCQwLCAkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNywgJDgsICQ5KSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBuZXcgRm4oJDApO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gbmV3IEZuKCQwLCAkMSk7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiBuZXcgRm4oJDAsICQxLCAkMik7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMpO1xuICAgICAgY2FzZSA1OlxuICAgICAgICByZXR1cm4gbmV3IEZuKCQwLCAkMSwgJDIsICQzLCAkNCk7XG4gICAgICBjYXNlIDY6XG4gICAgICAgIHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMsICQ0LCAkNSk7XG4gICAgICBjYXNlIDc6XG4gICAgICAgIHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMsICQ0LCAkNSwgJDYpO1xuICAgICAgY2FzZSA4OlxuICAgICAgICByZXR1cm4gbmV3IEZuKCQwLCAkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNyk7XG4gICAgICBjYXNlIDk6XG4gICAgICAgIHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMsICQ0LCAkNSwgJDYsICQ3LCAkOCk7XG4gICAgICBjYXNlIDEwOlxuICAgICAgICByZXR1cm4gbmV3IEZuKCQwLCAkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNywgJDgsICQ5KTtcbiAgICB9XG4gIH0pKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBjb25zdHJ1Y3ROOyIsInZhciBfY29udGFpbnMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29udGFpbnMnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBlcXVhbCwgaW4gW2BSLmVxdWFsc2BdKCNlcXVhbHMpXG4gKiB0ZXJtcywgdG8gYXQgbGVhc3Qgb25lIGVsZW1lbnQgb2YgdGhlIGdpdmVuIGxpc3Q7IGBmYWxzZWAgb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgYSAtPiBbYV0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIGl0ZW0gdG8gY29tcGFyZSBhZ2FpbnN0LlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYW4gZXF1aXZhbGVudCBpdGVtIGlzIGluIHRoZSBsaXN0LCBgZmFsc2VgIG90aGVyd2lzZS5cbiAqIEBzZWUgUi5hbnlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmNvbnRhaW5zKDMsIFsxLCAyLCAzXSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmNvbnRhaW5zKDQsIFsxLCAyLCAzXSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5jb250YWlucyh7IG5hbWU6ICdGcmVkJyB9LCBbeyBuYW1lOiAnRnJlZCcgfV0pOyAvLz0+IHRydWVcbiAqICAgICAgUi5jb250YWlucyhbNDJdLCBbWzQyXV0pOyAvLz0+IHRydWVcbiAqL1xuXG5cbnZhciBjb250YWlucyA9IC8qI19fUFVSRV9fKi9fY3VycnkyKF9jb250YWlucyk7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRhaW5zOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX21hcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19tYXAnKTtcblxudmFyIGN1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2N1cnJ5TicpO1xuXG52YXIgbWF4ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWF4Jyk7XG5cbnZhciBwbHVjayA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BsdWNrJyk7XG5cbnZhciByZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2UnKTtcblxuLyoqXG4gKiBBY2NlcHRzIGEgY29udmVyZ2luZyBmdW5jdGlvbiBhbmQgYSBsaXN0IG9mIGJyYW5jaGluZyBmdW5jdGlvbnMgYW5kIHJldHVybnNcbiAqIGEgbmV3IGZ1bmN0aW9uLiBXaGVuIGludm9rZWQsIHRoaXMgbmV3IGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG8gc29tZVxuICogYXJndW1lbnRzLCBlYWNoIGJyYW5jaGluZyBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIHRob3NlIHNhbWUgYXJndW1lbnRzLiBUaGVcbiAqIHJlc3VsdHMgb2YgZWFjaCBicmFuY2hpbmcgZnVuY3Rpb24gYXJlIHBhc3NlZCBhcyBhcmd1bWVudHMgdG8gdGhlIGNvbnZlcmdpbmdcbiAqIGZ1bmN0aW9uIHRvIHByb2R1Y2UgdGhlIHJldHVybiB2YWx1ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC40LjJcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKHgxLCB4MiwgLi4uKSAtPiB6KSAtPiBbKChhLCBiLCAuLi4pIC0+IHgxKSwgKChhLCBiLCAuLi4pIC0+IHgyKSwgLi4uXSAtPiAoYSAtPiBiIC0+IC4uLiAtPiB6KVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYWZ0ZXIgQSBmdW5jdGlvbi4gYGFmdGVyYCB3aWxsIGJlIGludm9rZWQgd2l0aCB0aGUgcmV0dXJuIHZhbHVlcyBvZlxuICogICAgICAgIGBmbjFgIGFuZCBgZm4yYCBhcyBpdHMgYXJndW1lbnRzLlxuICogQHBhcmFtIHtBcnJheX0gZnVuY3Rpb25zIEEgbGlzdCBvZiBmdW5jdGlvbnMuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24uXG4gKiBAc2VlIFIudXNlV2l0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBhdmVyYWdlID0gUi5jb252ZXJnZShSLmRpdmlkZSwgW1Iuc3VtLCBSLmxlbmd0aF0pXG4gKiAgICAgIGF2ZXJhZ2UoWzEsIDIsIDMsIDQsIDUsIDYsIDddKSAvLz0+IDRcbiAqXG4gKiAgICAgIHZhciBzdHJhbmdlQ29uY2F0ID0gUi5jb252ZXJnZShSLmNvbmNhdCwgW1IudG9VcHBlciwgUi50b0xvd2VyXSlcbiAqICAgICAgc3RyYW5nZUNvbmNhdChcIllvZGVsXCIpIC8vPT4gXCJZT0RFTHlvZGVsXCJcbiAqXG4gKiBAc3ltYiBSLmNvbnZlcmdlKGYsIFtnLCBoXSkoYSwgYikgPSBmKGcoYSwgYiksIGgoYSwgYikpXG4gKi9cblxuXG52YXIgY29udmVyZ2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBjb252ZXJnZShhZnRlciwgZm5zKSB7XG4gIHJldHVybiBjdXJyeU4ocmVkdWNlKG1heCwgMCwgcGx1Y2soJ2xlbmd0aCcsIGZucykpLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgIHJldHVybiBhZnRlci5hcHBseShjb250ZXh0LCBfbWFwKGZ1bmN0aW9uIChmbikge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH0sIGZucykpO1xuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBjb252ZXJnZTsiLCJ2YXIgcmVkdWNlQnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2VCeScpO1xuXG4vKipcbiAqIENvdW50cyB0aGUgZWxlbWVudHMgb2YgYSBsaXN0IGFjY29yZGluZyB0byBob3cgbWFueSBtYXRjaCBlYWNoIHZhbHVlIG9mIGFcbiAqIGtleSBnZW5lcmF0ZWQgYnkgdGhlIHN1cHBsaWVkIGZ1bmN0aW9uLiBSZXR1cm5zIGFuIG9iamVjdCBtYXBwaW5nIHRoZSBrZXlzXG4gKiBwcm9kdWNlZCBieSBgZm5gIHRvIHRoZSBudW1iZXIgb2Ygb2NjdXJyZW5jZXMgaW4gdGhlIGxpc3QuIE5vdGUgdGhhdCBhbGxcbiAqIGtleXMgYXJlIGNvZXJjZWQgdG8gc3RyaW5ncyBiZWNhdXNlIG9mIGhvdyBKYXZhU2NyaXB0IG9iamVjdHMgd29yay5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgKGEgLT4gU3RyaW5nKSAtPiBbYV0gLT4geyp9XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdXNlZCB0byBtYXAgdmFsdWVzIHRvIGtleXMuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGNvdW50IGVsZW1lbnRzIGZyb20uXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCBtYXBwaW5nIGtleXMgdG8gbnVtYmVyIG9mIG9jY3VycmVuY2VzIGluIHRoZSBsaXN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBudW1iZXJzID0gWzEuMCwgMS4xLCAxLjIsIDIuMCwgMy4wLCAyLjJdO1xuICogICAgICBSLmNvdW50QnkoTWF0aC5mbG9vcikobnVtYmVycyk7ICAgIC8vPT4geycxJzogMywgJzInOiAyLCAnMyc6IDF9XG4gKlxuICogICAgICB2YXIgbGV0dGVycyA9IFsnYScsICdiJywgJ0EnLCAnYScsICdCJywgJ2MnXTtcbiAqICAgICAgUi5jb3VudEJ5KFIudG9Mb3dlcikobGV0dGVycyk7ICAgLy89PiB7J2EnOiAzLCAnYic6IDIsICdjJzogMX1cbiAqL1xuXG5cbnZhciBjb3VudEJ5ID0gLyojX19QVVJFX18qL3JlZHVjZUJ5KGZ1bmN0aW9uIChhY2MsIGVsZW0pIHtcbiAgcmV0dXJuIGFjYyArIDE7XG59LCAwKTtcbm1vZHVsZS5leHBvcnRzID0gY291bnRCeTsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIGN1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2N1cnJ5TicpO1xuXG4vKipcbiAqIFJldHVybnMgYSBjdXJyaWVkIGVxdWl2YWxlbnQgb2YgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLiBUaGUgY3VycmllZCBmdW5jdGlvblxuICogaGFzIHR3byB1bnVzdWFsIGNhcGFiaWxpdGllcy4gRmlyc3QsIGl0cyBhcmd1bWVudHMgbmVlZG4ndCBiZSBwcm92aWRlZCBvbmVcbiAqIGF0IGEgdGltZS4gSWYgYGZgIGlzIGEgdGVybmFyeSBmdW5jdGlvbiBhbmQgYGdgIGlzIGBSLmN1cnJ5KGYpYCwgdGhlXG4gKiBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEpKDIpKDMpYFxuICogICAtIGBnKDEpKDIsIDMpYFxuICogICAtIGBnKDEsIDIpKDMpYFxuICogICAtIGBnKDEsIDIsIDMpYFxuICpcbiAqIFNlY29uZGx5LCB0aGUgc3BlY2lhbCBwbGFjZWhvbGRlciB2YWx1ZSBbYFIuX19gXSgjX18pIG1heSBiZSB1c2VkIHRvIHNwZWNpZnlcbiAqIFwiZ2Fwc1wiLCBhbGxvd2luZyBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9mIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMsXG4gKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy4gSWYgYGdgIGlzIGFzIGFib3ZlIGFuZCBgX2AgaXMgW2BSLl9fYF0oI19fKSxcbiAqIHRoZSBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEsIDIsIDMpYFxuICogICAtIGBnKF8sIDIsIDMpKDEpYFxuICogICAtIGBnKF8sIF8sIDMpKDEpKDIpYFxuICogICAtIGBnKF8sIF8sIDMpKDEsIDIpYFxuICogICAtIGBnKF8sIDIpKDEpKDMpYFxuICogICAtIGBnKF8sIDIpKDEsIDMpYFxuICogICAtIGBnKF8sIDIpKF8sIDMpKDEpYFxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcsIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY3VycnlOXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGFkZEZvdXJOdW1iZXJzID0gKGEsIGIsIGMsIGQpID0+IGEgKyBiICsgYyArIGQ7XG4gKlxuICogICAgICB2YXIgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeShhZGRGb3VyTnVtYmVycyk7XG4gKiAgICAgIHZhciBmID0gY3VycmllZEFkZEZvdXJOdW1iZXJzKDEsIDIpO1xuICogICAgICB2YXIgZyA9IGYoMyk7XG4gKiAgICAgIGcoNCk7IC8vPT4gMTBcbiAqL1xuXG5cbnZhciBjdXJyeSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGN1cnJ5KGZuKSB7XG4gIHJldHVybiBjdXJyeU4oZm4ubGVuZ3RoLCBmbik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gY3Vycnk7IiwidmFyIF9hcml0eSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xuXG52YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5TicpO1xuXG4vKipcbiAqIFJldHVybnMgYSBjdXJyaWVkIGVxdWl2YWxlbnQgb2YgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLCB3aXRoIHRoZSBzcGVjaWZpZWRcbiAqIGFyaXR5LiBUaGUgY3VycmllZCBmdW5jdGlvbiBoYXMgdHdvIHVudXN1YWwgY2FwYWJpbGl0aWVzLiBGaXJzdCwgaXRzXG4gKiBhcmd1bWVudHMgbmVlZG4ndCBiZSBwcm92aWRlZCBvbmUgYXQgYSB0aW1lLiBJZiBgZ2AgaXMgYFIuY3VycnlOKDMsIGYpYCwgdGhlXG4gKiBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEpKDIpKDMpYFxuICogICAtIGBnKDEpKDIsIDMpYFxuICogICAtIGBnKDEsIDIpKDMpYFxuICogICAtIGBnKDEsIDIsIDMpYFxuICpcbiAqIFNlY29uZGx5LCB0aGUgc3BlY2lhbCBwbGFjZWhvbGRlciB2YWx1ZSBbYFIuX19gXSgjX18pIG1heSBiZSB1c2VkIHRvIHNwZWNpZnlcbiAqIFwiZ2Fwc1wiLCBhbGxvd2luZyBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9mIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMsXG4gKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy4gSWYgYGdgIGlzIGFzIGFib3ZlIGFuZCBgX2AgaXMgW2BSLl9fYF0oI19fKSxcbiAqIHRoZSBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEsIDIsIDMpYFxuICogICAtIGBnKF8sIDIsIDMpKDEpYFxuICogICAtIGBnKF8sIF8sIDMpKDEpKDIpYFxuICogICAtIGBnKF8sIF8sIDMpKDEsIDIpYFxuICogICAtIGBnKF8sIDIpKDEpKDMpYFxuICogICAtIGBnKF8sIDIpKDEsIDMpYFxuICogICAtIGBnKF8sIDIpKF8sIDMpKDEpYFxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjUuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIE51bWJlciAtPiAoKiAtPiBhKSAtPiAoKiAtPiBhKVxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgZm9yIHRoZSByZXR1cm5lZCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldywgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBzZWUgUi5jdXJyeVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBzdW1BcmdzID0gKC4uLmFyZ3MpID0+IFIuc3VtKGFyZ3MpO1xuICpcbiAqICAgICAgdmFyIGN1cnJpZWRBZGRGb3VyTnVtYmVycyA9IFIuY3VycnlOKDQsIHN1bUFyZ3MpO1xuICogICAgICB2YXIgZiA9IGN1cnJpZWRBZGRGb3VyTnVtYmVycygxLCAyKTtcbiAqICAgICAgdmFyIGcgPSBmKDMpO1xuICogICAgICBnKDQpOyAvLz0+IDEwXG4gKi9cblxuXG52YXIgY3VycnlOID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gY3VycnlOKGxlbmd0aCwgZm4pIHtcbiAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBfY3VycnkxKGZuKTtcbiAgfVxuICByZXR1cm4gX2FyaXR5KGxlbmd0aCwgX2N1cnJ5TihsZW5ndGgsIFtdLCBmbikpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGN1cnJ5TjsiLCJ2YXIgYWRkID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYWRkJyk7XG5cbi8qKlxuICogRGVjcmVtZW50cyBpdHMgYXJndW1lbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gblxuICogQHJldHVybiB7TnVtYmVyfSBuIC0gMVxuICogQHNlZSBSLmluY1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZGVjKDQyKTsgLy89PiA0MVxuICovXG5cblxudmFyIGRlYyA9IC8qI19fUFVSRV9fKi9hZGQoLTEpO1xubW9kdWxlLmV4cG9ydHMgPSBkZWM7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc2Vjb25kIGFyZ3VtZW50IGlmIGl0IGlzIG5vdCBgbnVsbGAsIGB1bmRlZmluZWRgIG9yIGBOYU5gO1xuICogb3RoZXJ3aXNlIHRoZSBmaXJzdCBhcmd1bWVudCBpcyByZXR1cm5lZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMC4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgYSAtPiBiIC0+IGEgfCBiXG4gKiBAcGFyYW0ge2F9IGRlZmF1bHQgVGhlIGRlZmF1bHQgdmFsdWUuXG4gKiBAcGFyYW0ge2J9IHZhbCBgdmFsYCB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2YgYGRlZmF1bHRgIHVubGVzcyBgdmFsYCBpcyBgbnVsbGAsIGB1bmRlZmluZWRgIG9yIGBOYU5gLlxuICogQHJldHVybiB7Kn0gVGhlIHNlY29uZCB2YWx1ZSBpZiBpdCBpcyBub3QgYG51bGxgLCBgdW5kZWZpbmVkYCBvciBgTmFOYCwgb3RoZXJ3aXNlIHRoZSBkZWZhdWx0IHZhbHVlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGRlZmF1bHRUbzQyID0gUi5kZWZhdWx0VG8oNDIpO1xuICpcbiAqICAgICAgZGVmYXVsdFRvNDIobnVsbCk7ICAvLz0+IDQyXG4gKiAgICAgIGRlZmF1bHRUbzQyKHVuZGVmaW5lZCk7ICAvLz0+IDQyXG4gKiAgICAgIGRlZmF1bHRUbzQyKCdSYW1kYScpOyAgLy89PiAnUmFtZGEnXG4gKiAgICAgIC8vIHBhcnNlSW50KCdzdHJpbmcnKSByZXN1bHRzIGluIE5hTlxuICogICAgICBkZWZhdWx0VG80MihwYXJzZUludCgnc3RyaW5nJykpOyAvLz0+IDQyXG4gKi9cblxuXG52YXIgZGVmYXVsdFRvID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gZGVmYXVsdFRvKGQsIHYpIHtcbiAgcmV0dXJuIHYgPT0gbnVsbCB8fCB2ICE9PSB2ID8gZCA6IHY7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdFRvOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG4vKipcbiAqIE1ha2VzIGEgZGVzY2VuZGluZyBjb21wYXJhdG9yIGZ1bmN0aW9uIG91dCBvZiBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHZhbHVlXG4gKiB0aGF0IGNhbiBiZSBjb21wYXJlZCB3aXRoIGA8YCBhbmQgYD5gLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIzLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBPcmQgYiA9PiAoYSAtPiBiKSAtPiBhIC0+IGEgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBBIGZ1bmN0aW9uIG9mIGFyaXR5IG9uZSB0aGF0IHJldHVybnMgYSB2YWx1ZSB0aGF0IGNhbiBiZSBjb21wYXJlZFxuICogQHBhcmFtIHsqfSBhIFRoZSBmaXJzdCBpdGVtIHRvIGJlIGNvbXBhcmVkLlxuICogQHBhcmFtIHsqfSBiIFRoZSBzZWNvbmQgaXRlbSB0byBiZSBjb21wYXJlZC5cbiAqIEByZXR1cm4ge051bWJlcn0gYC0xYCBpZiBmbihhKSA+IGZuKGIpLCBgMWAgaWYgZm4oYikgPiBmbihhKSwgb3RoZXJ3aXNlIGAwYFxuICogQHNlZSBSLmFzY2VuZFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBieUFnZSA9IFIuZGVzY2VuZChSLnByb3AoJ2FnZScpKTtcbiAqICAgICAgdmFyIHBlb3BsZSA9IFtcbiAqICAgICAgICAvLyAuLi5cbiAqICAgICAgXTtcbiAqICAgICAgdmFyIHBlb3BsZUJ5T2xkZXN0Rmlyc3QgPSBSLnNvcnQoYnlBZ2UsIHBlb3BsZSk7XG4gKi9cblxuXG52YXIgZGVzY2VuZCA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIGRlc2NlbmQoZm4sIGEsIGIpIHtcbiAgdmFyIGFhID0gZm4oYSk7XG4gIHZhciBiYiA9IGZuKGIpO1xuICByZXR1cm4gYWEgPiBiYiA/IC0xIDogYWEgPCBiYiA/IDEgOiAwO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGRlc2NlbmQ7IiwidmFyIF9jb250YWlucyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb250YWlucycpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBGaW5kcyB0aGUgc2V0IChpLmUuIG5vIGR1cGxpY2F0ZXMpIG9mIGFsbCBlbGVtZW50cyBpbiB0aGUgZmlyc3QgbGlzdCBub3RcbiAqIGNvbnRhaW5lZCBpbiB0aGUgc2Vjb25kIGxpc3QuIE9iamVjdHMgYW5kIEFycmF5cyBhcmUgY29tcGFyZWQgaW4gdGVybXMgb2ZcbiAqIHZhbHVlIGVxdWFsaXR5LCBub3QgcmVmZXJlbmNlIGVxdWFsaXR5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIFsqXSAtPiBbKl0gLT4gWypdXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MSBUaGUgZmlyc3QgbGlzdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QyIFRoZSBzZWNvbmQgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgZWxlbWVudHMgaW4gYGxpc3QxYCB0aGF0IGFyZSBub3QgaW4gYGxpc3QyYC5cbiAqIEBzZWUgUi5kaWZmZXJlbmNlV2l0aCwgUi5zeW1tZXRyaWNEaWZmZXJlbmNlLCBSLnN5bW1ldHJpY0RpZmZlcmVuY2VXaXRoLCBSLndpdGhvdXRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmRpZmZlcmVuY2UoWzEsMiwzLDRdLCBbNyw2LDUsNCwzXSk7IC8vPT4gWzEsMl1cbiAqICAgICAgUi5kaWZmZXJlbmNlKFs3LDYsNSw0LDNdLCBbMSwyLDMsNF0pOyAvLz0+IFs3LDYsNV1cbiAqICAgICAgUi5kaWZmZXJlbmNlKFt7YTogMX0sIHtiOiAyfV0sIFt7YTogMX0sIHtjOiAzfV0pIC8vPT4gW3tiOiAyfV1cbiAqL1xuXG5cbnZhciBkaWZmZXJlbmNlID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gZGlmZmVyZW5jZShmaXJzdCwgc2Vjb25kKSB7XG4gIHZhciBvdXQgPSBbXTtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBmaXJzdExlbiA9IGZpcnN0Lmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGZpcnN0TGVuKSB7XG4gICAgaWYgKCFfY29udGFpbnMoZmlyc3RbaWR4XSwgc2Vjb25kKSAmJiAhX2NvbnRhaW5zKGZpcnN0W2lkeF0sIG91dCkpIHtcbiAgICAgIG91dFtvdXQubGVuZ3RoXSA9IGZpcnN0W2lkeF07XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBvdXQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZTsiLCJ2YXIgX2NvbnRhaW5zV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb250YWluc1dpdGgnKTtcblxudmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogRmluZHMgdGhlIHNldCAoaS5lLiBubyBkdXBsaWNhdGVzKSBvZiBhbGwgZWxlbWVudHMgaW4gdGhlIGZpcnN0IGxpc3Qgbm90XG4gKiBjb250YWluZWQgaW4gdGhlIHNlY29uZCBsaXN0LiBEdXBsaWNhdGlvbiBpcyBkZXRlcm1pbmVkIGFjY29yZGluZyB0byB0aGVcbiAqIHZhbHVlIHJldHVybmVkIGJ5IGFwcGx5aW5nIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgdG8gdHdvIGxpc3QgZWxlbWVudHMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgKChhLCBhKSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSB1c2VkIHRvIHRlc3Qgd2hldGhlciB0d28gaXRlbXMgYXJlIGVxdWFsLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGxpc3QuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MiBUaGUgc2Vjb25kIGxpc3QuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGVsZW1lbnRzIGluIGBsaXN0MWAgdGhhdCBhcmUgbm90IGluIGBsaXN0MmAuXG4gKiBAc2VlIFIuZGlmZmVyZW5jZSwgUi5zeW1tZXRyaWNEaWZmZXJlbmNlLCBSLnN5bW1ldHJpY0RpZmZlcmVuY2VXaXRoXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGNtcCA9ICh4LCB5KSA9PiB4LmEgPT09IHkuYTtcbiAqICAgICAgdmFyIGwxID0gW3thOiAxfSwge2E6IDJ9LCB7YTogM31dO1xuICogICAgICB2YXIgbDIgPSBbe2E6IDN9LCB7YTogNH1dO1xuICogICAgICBSLmRpZmZlcmVuY2VXaXRoKGNtcCwgbDEsIGwyKTsgLy89PiBbe2E6IDF9LCB7YTogMn1dXG4gKi9cblxuXG52YXIgZGlmZmVyZW5jZVdpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBkaWZmZXJlbmNlV2l0aChwcmVkLCBmaXJzdCwgc2Vjb25kKSB7XG4gIHZhciBvdXQgPSBbXTtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBmaXJzdExlbiA9IGZpcnN0Lmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGZpcnN0TGVuKSB7XG4gICAgaWYgKCFfY29udGFpbnNXaXRoKHByZWQsIGZpcnN0W2lkeF0sIHNlY29uZCkgJiYgIV9jb250YWluc1dpdGgocHJlZCwgZmlyc3RbaWR4XSwgb3V0KSkge1xuICAgICAgb3V0LnB1c2goZmlyc3RbaWR4XSk7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBvdXQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZVdpdGg7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBvYmplY3QgdGhhdCBkb2VzIG5vdCBjb250YWluIGEgYHByb3BgIHByb3BlcnR5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEwLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgU3RyaW5nIC0+IHtrOiB2fSAtPiB7azogdn1cbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBkaXNzb2NpYXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmVcbiAqIEByZXR1cm4ge09iamVjdH0gQSBuZXcgb2JqZWN0IGVxdWl2YWxlbnQgdG8gdGhlIG9yaWdpbmFsIGJ1dCB3aXRob3V0IHRoZSBzcGVjaWZpZWQgcHJvcGVydHlcbiAqIEBzZWUgUi5hc3NvY1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZGlzc29jKCdiJywge2E6IDEsIGI6IDIsIGM6IDN9KTsgLy89PiB7YTogMSwgYzogM31cbiAqL1xuXG5cbnZhciBkaXNzb2MgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBkaXNzb2MocHJvcCwgb2JqKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZm9yICh2YXIgcCBpbiBvYmopIHtcbiAgICByZXN1bHRbcF0gPSBvYmpbcF07XG4gIH1cbiAgZGVsZXRlIHJlc3VsdFtwcm9wXTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBkaXNzb2M7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfaXNJbnRlZ2VyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzSW50ZWdlcicpO1xuXG52YXIgYXNzb2MgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hc3NvYycpO1xuXG52YXIgZGlzc29jID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZGlzc29jJyk7XG5cbnZhciByZW1vdmUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZW1vdmUnKTtcblxudmFyIHVwZGF0ZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VwZGF0ZScpO1xuXG4vKipcbiAqIE1ha2VzIGEgc2hhbGxvdyBjbG9uZSBvZiBhbiBvYmplY3QsIG9taXR0aW5nIHRoZSBwcm9wZXJ0eSBhdCB0aGUgZ2l2ZW4gcGF0aC5cbiAqIE5vdGUgdGhhdCB0aGlzIGNvcGllcyBhbmQgZmxhdHRlbnMgcHJvdG90eXBlIHByb3BlcnRpZXMgb250byB0aGUgbmV3IG9iamVjdFxuICogYXMgd2VsbC4gQWxsIG5vbi1wcmltaXRpdmUgcHJvcGVydGllcyBhcmUgY29waWVkIGJ5IHJlZmVyZW5jZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAdHlwZWRlZm4gSWR4ID0gU3RyaW5nIHwgSW50XG4gKiBAc2lnIFtJZHhdIC0+IHtrOiB2fSAtPiB7azogdn1cbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGggVGhlIHBhdGggdG8gdGhlIHZhbHVlIHRvIG9taXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBjbG9uZVxuICogQHJldHVybiB7T2JqZWN0fSBBIG5ldyBvYmplY3Qgd2l0aG91dCB0aGUgcHJvcGVydHkgYXQgcGF0aFxuICogQHNlZSBSLmFzc29jUGF0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZGlzc29jUGF0aChbJ2EnLCAnYicsICdjJ10sIHthOiB7Yjoge2M6IDQyfX19KTsgLy89PiB7YToge2I6IHt9fX1cbiAqL1xuXG5cbnZhciBkaXNzb2NQYXRoID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gZGlzc29jUGF0aChwYXRoLCBvYmopIHtcbiAgc3dpdGNoIChwYXRoLmxlbmd0aCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiBvYmo7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIF9pc0ludGVnZXIocGF0aFswXSkgPyByZW1vdmUocGF0aFswXSwgMSwgb2JqKSA6IGRpc3NvYyhwYXRoWzBdLCBvYmopO1xuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgaGVhZCA9IHBhdGhbMF07XG4gICAgICB2YXIgdGFpbCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHBhdGgsIDEpO1xuICAgICAgaWYgKG9ialtoZWFkXSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9IGVsc2UgaWYgKF9pc0ludGVnZXIocGF0aFswXSkpIHtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZShoZWFkLCBkaXNzb2NQYXRoKHRhaWwsIG9ialtoZWFkXSksIG9iaik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYXNzb2MoaGVhZCwgZGlzc29jUGF0aCh0YWlsLCBvYmpbaGVhZF0pLCBvYmopO1xuICAgICAgfVxuICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZGlzc29jUGF0aDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBEaXZpZGVzIHR3byBudW1iZXJzLiBFcXVpdmFsZW50IHRvIGBhIC8gYmAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IE51bWJlclxuICogQHBhcmFtIHtOdW1iZXJ9IGEgVGhlIGZpcnN0IHZhbHVlLlxuICogQHBhcmFtIHtOdW1iZXJ9IGIgVGhlIHNlY29uZCB2YWx1ZS5cbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJlc3VsdCBvZiBgYSAvIGJgLlxuICogQHNlZSBSLm11bHRpcGx5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5kaXZpZGUoNzEsIDEwMCk7IC8vPT4gMC43MVxuICpcbiAqICAgICAgdmFyIGhhbGYgPSBSLmRpdmlkZShSLl9fLCAyKTtcbiAqICAgICAgaGFsZig0Mik7IC8vPT4gMjFcbiAqXG4gKiAgICAgIHZhciByZWNpcHJvY2FsID0gUi5kaXZpZGUoMSk7XG4gKiAgICAgIHJlY2lwcm9jYWwoNCk7ICAgLy89PiAwLjI1XG4gKi9cblxuXG52YXIgZGl2aWRlID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gZGl2aWRlKGEsIGIpIHtcbiAgcmV0dXJuIGEgLyBiO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGRpdmlkZTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9kaXNwYXRjaGFibGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG5cbnZhciBfeGRyb3AgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feGRyb3AnKTtcblxudmFyIHNsaWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc2xpY2UnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGFsbCBidXQgdGhlIGZpcnN0IGBuYCBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gbGlzdCwgc3RyaW5nLCBvclxuICogdHJhbnNkdWNlci90cmFuc2Zvcm1lciAob3Igb2JqZWN0IHdpdGggYSBgZHJvcGAgbWV0aG9kKS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgZHJvcGAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gW2FdIC0+IFthXVxuICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEBwYXJhbSB7Kn0gbGlzdFxuICogQHJldHVybiB7Kn0gQSBjb3B5IG9mIGxpc3Qgd2l0aG91dCB0aGUgZmlyc3QgYG5gIGVsZW1lbnRzXG4gKiBAc2VlIFIudGFrZSwgUi50cmFuc2R1Y2UsIFIuZHJvcExhc3QsIFIuZHJvcFdoaWxlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5kcm9wKDEsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydiYXInLCAnYmF6J11cbiAqICAgICAgUi5kcm9wKDIsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydiYXonXVxuICogICAgICBSLmRyb3AoMywgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbXVxuICogICAgICBSLmRyb3AoNCwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbXVxuICogICAgICBSLmRyb3AoMywgJ3JhbWRhJyk7ICAgICAgICAgICAgICAgLy89PiAnZGEnXG4gKi9cblxuXG52YXIgZHJvcCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbJ2Ryb3AnXSwgX3hkcm9wLCBmdW5jdGlvbiBkcm9wKG4sIHhzKSB7XG4gIHJldHVybiBzbGljZShNYXRoLm1heCgwLCBuKSwgSW5maW5pdHksIHhzKTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZHJvcDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9kaXNwYXRjaGFibGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG5cbnZhciBfZHJvcExhc3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZHJvcExhc3QnKTtcblxudmFyIF94ZHJvcExhc3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feGRyb3BMYXN0Jyk7XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3QgY29udGFpbmluZyBhbGwgYnV0IHRoZSBsYXN0IGBuYCBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gYGxpc3RgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE2LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW2FdXG4gKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIG9mIGBsaXN0YCB0byBza2lwLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCBvZiBlbGVtZW50cyB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5fSBBIGNvcHkgb2YgdGhlIGxpc3Qgd2l0aCBvbmx5IHRoZSBmaXJzdCBgbGlzdC5sZW5ndGggLSBuYCBlbGVtZW50c1xuICogQHNlZSBSLnRha2VMYXN0LCBSLmRyb3AsIFIuZHJvcFdoaWxlLCBSLmRyb3BMYXN0V2hpbGVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmRyb3BMYXN0KDEsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nLCAnYmFyJ11cbiAqICAgICAgUi5kcm9wTGFzdCgyLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnZm9vJ11cbiAqICAgICAgUi5kcm9wTGFzdCgzLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFtdXG4gKiAgICAgIFIuZHJvcExhc3QoNCwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbXVxuICogICAgICBSLmRyb3BMYXN0KDMsICdyYW1kYScpOyAgICAgICAgICAgICAgIC8vPT4gJ3JhJ1xuICovXG5cblxudmFyIGRyb3BMYXN0ID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFtdLCBfeGRyb3BMYXN0LCBfZHJvcExhc3QpKTtcbm1vZHVsZS5leHBvcnRzID0gZHJvcExhc3Q7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfZGlzcGF0Y2hhYmxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xuXG52YXIgX2Ryb3BMYXN0V2hpbGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZHJvcExhc3RXaGlsZScpO1xuXG52YXIgX3hkcm9wTGFzdFdoaWxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3hkcm9wTGFzdFdoaWxlJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGV4Y2x1ZGluZyBhbGwgdGhlIHRhaWxpbmcgZWxlbWVudHMgb2YgYSBnaXZlbiBsaXN0IHdoaWNoXG4gKiBzYXRpc2Z5IHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgZnVuY3Rpb24uIEl0IHBhc3NlcyBlYWNoIHZhbHVlIGZyb20gdGhlIHJpZ2h0XG4gKiB0byB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIGZ1bmN0aW9uLCBza2lwcGluZyBlbGVtZW50cyB1bnRpbCB0aGUgcHJlZGljYXRlXG4gKiBmdW5jdGlvbiByZXR1cm5zIGEgYGZhbHN5YCB2YWx1ZS4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIG9uZSBhcmd1bWVudDpcbiAqICoodmFsdWUpKi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNi4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdXG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGVhY2ggZWxlbWVudFxuICogQHBhcmFtIHtBcnJheX0geHMgVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGFycmF5IHdpdGhvdXQgYW55IHRyYWlsaW5nIGVsZW1lbnRzIHRoYXQgcmV0dXJuIGBmYWxzeWAgdmFsdWVzIGZyb20gdGhlIGBwcmVkaWNhdGVgLlxuICogQHNlZSBSLnRha2VMYXN0V2hpbGUsIFIuYWRkSW5kZXgsIFIuZHJvcCwgUi5kcm9wV2hpbGVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbHRlVGhyZWUgPSB4ID0+IHggPD0gMztcbiAqXG4gKiAgICAgIFIuZHJvcExhc3RXaGlsZShsdGVUaHJlZSwgWzEsIDIsIDMsIDQsIDMsIDIsIDFdKTsgLy89PiBbMSwgMiwgMywgNF1cbiAqXG4gKiAgICAgIFIuZHJvcExhc3RXaGlsZSh4ID0+IHggIT09ICdkJyAsICdSYW1kYScpOyAvLz0+ICdSYW1kJ1xuICovXG5cblxudmFyIGRyb3BMYXN0V2hpbGUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MiggLyojX19QVVJFX18qL19kaXNwYXRjaGFibGUoW10sIF94ZHJvcExhc3RXaGlsZSwgX2Ryb3BMYXN0V2hpbGUpKTtcbm1vZHVsZS5leHBvcnRzID0gZHJvcExhc3RXaGlsZTsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIF9kaXNwYXRjaGFibGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG5cbnZhciBfeGRyb3BSZXBlYXRzV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194ZHJvcFJlcGVhdHNXaXRoJyk7XG5cbnZhciBkcm9wUmVwZWF0c1dpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kcm9wUmVwZWF0c1dpdGgnKTtcblxudmFyIGVxdWFscyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2VxdWFscycpO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCB3aXRob3V0IGFueSBjb25zZWN1dGl2ZWx5IHJlcGVhdGluZyBlbGVtZW50cy5cbiAqIFtgUi5lcXVhbHNgXSgjZXF1YWxzKSBpcyB1c2VkIHRvIGRldGVybWluZSBlcXVhbGl0eS5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXVxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gYGxpc3RgIHdpdGhvdXQgcmVwZWF0aW5nIGVsZW1lbnRzLlxuICogQHNlZSBSLnRyYW5zZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgUi5kcm9wUmVwZWF0cyhbMSwgMSwgMSwgMiwgMywgNCwgNCwgMiwgMl0pOyAvLz0+IFsxLCAyLCAzLCA0LCAyXVxuICovXG5cblxudmFyIGRyb3BSZXBlYXRzID0gLyojX19QVVJFX18qL19jdXJyeTEoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFtdLCAvKiNfX1BVUkVfXyovX3hkcm9wUmVwZWF0c1dpdGgoZXF1YWxzKSwgLyojX19QVVJFX18qL2Ryb3BSZXBlYXRzV2l0aChlcXVhbHMpKSk7XG5tb2R1bGUuZXhwb3J0cyA9IGRyb3BSZXBlYXRzOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF94ZHJvcFJlcGVhdHNXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3hkcm9wUmVwZWF0c1dpdGgnKTtcblxudmFyIGxhc3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9sYXN0Jyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IHdpdGhvdXQgYW55IGNvbnNlY3V0aXZlbHkgcmVwZWF0aW5nIGVsZW1lbnRzLiBFcXVhbGl0eSBpc1xuICogZGV0ZXJtaW5lZCBieSBhcHBseWluZyB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIHRvIGVhY2ggcGFpciBvZiBjb25zZWN1dGl2ZSBlbGVtZW50cy4gVGhlXG4gKiBmaXJzdCBlbGVtZW50IGluIGEgc2VyaWVzIG9mIGVxdWFsIGVsZW1lbnRzIHdpbGwgYmUgcHJlc2VydmVkLlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNC4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoKGEsIGEpIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgdXNlZCB0byB0ZXN0IHdoZXRoZXIgdHdvIGl0ZW1zIGFyZSBlcXVhbC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7QXJyYXl9IGBsaXN0YCB3aXRob3V0IHJlcGVhdGluZyBlbGVtZW50cy5cbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbCA9IFsxLCAtMSwgMSwgMywgNCwgLTQsIC00LCAtNSwgNSwgMywgM107XG4gKiAgICAgIFIuZHJvcFJlcGVhdHNXaXRoKFIuZXFCeShNYXRoLmFicyksIGwpOyAvLz0+IFsxLCAzLCA0LCAtNSwgM11cbiAqL1xuXG5cbnZhciBkcm9wUmVwZWF0c1dpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MiggLyojX19QVVJFX18qL19kaXNwYXRjaGFibGUoW10sIF94ZHJvcFJlcGVhdHNXaXRoLCBmdW5jdGlvbiBkcm9wUmVwZWF0c1dpdGgocHJlZCwgbGlzdCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpZHggPSAxO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIGlmIChsZW4gIT09IDApIHtcbiAgICByZXN1bHRbMF0gPSBsaXN0WzBdO1xuICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgIGlmICghcHJlZChsYXN0KHJlc3VsdCksIGxpc3RbaWR4XSkpIHtcbiAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gbGlzdFtpZHhdO1xuICAgICAgfVxuICAgICAgaWR4ICs9IDE7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGRyb3BSZXBlYXRzV2l0aDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9kaXNwYXRjaGFibGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG5cbnZhciBfeGRyb3BXaGlsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194ZHJvcFdoaWxlJyk7XG5cbnZhciBzbGljZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3NsaWNlJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGV4Y2x1ZGluZyB0aGUgbGVhZGluZyBlbGVtZW50cyBvZiBhIGdpdmVuIGxpc3Qgd2hpY2hcbiAqIHNhdGlzZnkgdGhlIHN1cHBsaWVkIHByZWRpY2F0ZSBmdW5jdGlvbi4gSXQgcGFzc2VzIGVhY2ggdmFsdWUgdG8gdGhlIHN1cHBsaWVkXG4gKiBwcmVkaWNhdGUgZnVuY3Rpb24sIHNraXBwaW5nIGVsZW1lbnRzIHdoaWxlIHRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gcmV0dXJuc1xuICogYHRydWVgLiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG8gb25lIGFyZ3VtZW50OiAqKHZhbHVlKSouXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYGRyb3BXaGlsZWAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXVxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0FycmF5fSB4cyBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgYXJyYXkuXG4gKiBAc2VlIFIudGFrZVdoaWxlLCBSLnRyYW5zZHVjZSwgUi5hZGRJbmRleFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBsdGVUd28gPSB4ID0+IHggPD0gMjtcbiAqXG4gKiAgICAgIFIuZHJvcFdoaWxlKGx0ZVR3bywgWzEsIDIsIDMsIDQsIDMsIDIsIDFdKTsgLy89PiBbMywgNCwgMywgMiwgMV1cbiAqXG4gKiAgICAgIFIuZHJvcFdoaWxlKHggPT4geCAhPT0gJ2QnICwgJ1JhbWRhJyk7IC8vPT4gJ2RhJ1xuICovXG5cblxudmFyIGRyb3BXaGlsZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbJ2Ryb3BXaGlsZSddLCBfeGRyb3BXaGlsZSwgZnVuY3Rpb24gZHJvcFdoaWxlKHByZWQsIHhzKSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0geHMubGVuZ3RoO1xuICB3aGlsZSAoaWR4IDwgbGVuICYmIHByZWQoeHNbaWR4XSkpIHtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gc2xpY2UoaWR4LCBJbmZpbml0eSwgeHMpO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBkcm9wV2hpbGU7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfaXNGdW5jdGlvbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19pc0Z1bmN0aW9uJyk7XG5cbnZhciBsaWZ0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbGlmdCcpO1xuXG52YXIgb3IgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9vcicpO1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gd3JhcHBpbmcgY2FsbHMgdG8gdGhlIHR3byBmdW5jdGlvbnMgaW4gYW4gYHx8YCBvcGVyYXRpb24sXG4gKiByZXR1cm5pbmcgdGhlIHJlc3VsdCBvZiB0aGUgZmlyc3QgZnVuY3Rpb24gaWYgaXQgaXMgdHJ1dGgteSBhbmQgdGhlIHJlc3VsdFxuICogb2YgdGhlIHNlY29uZCBmdW5jdGlvbiBvdGhlcndpc2UuIE5vdGUgdGhhdCB0aGlzIGlzIHNob3J0LWNpcmN1aXRlZCxcbiAqIG1lYW5pbmcgdGhhdCB0aGUgc2Vjb25kIGZ1bmN0aW9uIHdpbGwgbm90IGJlIGludm9rZWQgaWYgdGhlIGZpcnN0IHJldHVybnMgYVxuICogdHJ1dGgteSB2YWx1ZS5cbiAqXG4gKiBJbiBhZGRpdGlvbiB0byBmdW5jdGlvbnMsIGBSLmVpdGhlcmAgYWxzbyBhY2NlcHRzIGFueSBmYW50YXN5LWxhbmQgY29tcGF0aWJsZVxuICogYXBwbGljYXRpdmUgZnVuY3Rvci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMi4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgKCouLi4gLT4gQm9vbGVhbikgLT4gKCouLi4gLT4gQm9vbGVhbikgLT4gKCouLi4gLT4gQm9vbGVhbilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGYgYSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGcgYW5vdGhlciBwcmVkaWNhdGVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBhIGZ1bmN0aW9uIHRoYXQgYXBwbGllcyBpdHMgYXJndW1lbnRzIHRvIGBmYCBhbmQgYGdgIGFuZCBgfHxgcyB0aGVpciBvdXRwdXRzIHRvZ2V0aGVyLlxuICogQHNlZSBSLm9yXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGd0MTAgPSB4ID0+IHggPiAxMDtcbiAqICAgICAgdmFyIGV2ZW4gPSB4ID0+IHggJSAyID09PSAwO1xuICogICAgICB2YXIgZiA9IFIuZWl0aGVyKGd0MTAsIGV2ZW4pO1xuICogICAgICBmKDEwMSk7IC8vPT4gdHJ1ZVxuICogICAgICBmKDgpOyAvLz0+IHRydWVcbiAqL1xuXG5cbnZhciBlaXRoZXIgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBlaXRoZXIoZiwgZykge1xuICByZXR1cm4gX2lzRnVuY3Rpb24oZikgPyBmdW5jdGlvbiBfZWl0aGVyKCkge1xuICAgIHJldHVybiBmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9IDogbGlmdChvcikoZiwgZyk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZWl0aGVyOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgX2lzQXJndW1lbnRzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzQXJndW1lbnRzJyk7XG5cbnZhciBfaXNBcnJheSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19pc0FycmF5Jyk7XG5cbnZhciBfaXNPYmplY3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNPYmplY3QnKTtcblxudmFyIF9pc1N0cmluZyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19pc1N0cmluZycpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGVtcHR5IHZhbHVlIG9mIGl0cyBhcmd1bWVudCdzIHR5cGUuIFJhbWRhIGRlZmluZXMgdGhlIGVtcHR5XG4gKiB2YWx1ZSBvZiBBcnJheSAoYFtdYCksIE9iamVjdCAoYHt9YCksIFN0cmluZyAoYCcnYCksIGFuZCBBcmd1bWVudHMuIE90aGVyXG4gKiB0eXBlcyBhcmUgc3VwcG9ydGVkIGlmIHRoZXkgZGVmaW5lIGA8VHlwZT4uZW1wdHlgLFxuICogYDxUeXBlPi5wcm90b3R5cGUuZW1wdHlgIG9yIGltcGxlbWVudCB0aGVcbiAqIFtGYW50YXN5TGFuZCBNb25vaWQgc3BlY10oaHR0cHM6Ly9naXRodWIuY29tL2ZhbnRhc3lsYW5kL2ZhbnRhc3ktbGFuZCNtb25vaWQpLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBlbXB0eWAgbWV0aG9kIG9mIHRoZSBmaXJzdCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4zLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBhIC0+IGFcbiAqIEBwYXJhbSB7Kn0geFxuICogQHJldHVybiB7Kn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmVtcHR5KEp1c3QoNDIpKTsgICAgICAvLz0+IE5vdGhpbmcoKVxuICogICAgICBSLmVtcHR5KFsxLCAyLCAzXSk7ICAgICAvLz0+IFtdXG4gKiAgICAgIFIuZW1wdHkoJ3VuaWNvcm5zJyk7ICAgIC8vPT4gJydcbiAqICAgICAgUi5lbXB0eSh7eDogMSwgeTogMn0pOyAgLy89PiB7fVxuICovXG5cblxudmFyIGVtcHR5ID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gZW1wdHkoeCkge1xuICByZXR1cm4geCAhPSBudWxsICYmIHR5cGVvZiB4WydmYW50YXN5LWxhbmQvZW1wdHknXSA9PT0gJ2Z1bmN0aW9uJyA/IHhbJ2ZhbnRhc3ktbGFuZC9lbXB0eSddKCkgOiB4ICE9IG51bGwgJiYgeC5jb25zdHJ1Y3RvciAhPSBudWxsICYmIHR5cGVvZiB4LmNvbnN0cnVjdG9yWydmYW50YXN5LWxhbmQvZW1wdHknXSA9PT0gJ2Z1bmN0aW9uJyA/IHguY29uc3RydWN0b3JbJ2ZhbnRhc3ktbGFuZC9lbXB0eSddKCkgOiB4ICE9IG51bGwgJiYgdHlwZW9mIHguZW1wdHkgPT09ICdmdW5jdGlvbicgPyB4LmVtcHR5KCkgOiB4ICE9IG51bGwgJiYgeC5jb25zdHJ1Y3RvciAhPSBudWxsICYmIHR5cGVvZiB4LmNvbnN0cnVjdG9yLmVtcHR5ID09PSAnZnVuY3Rpb24nID8geC5jb25zdHJ1Y3Rvci5lbXB0eSgpIDogX2lzQXJyYXkoeCkgPyBbXSA6IF9pc1N0cmluZyh4KSA/ICcnIDogX2lzT2JqZWN0KHgpID8ge30gOiBfaXNBcmd1bWVudHMoeCkgPyBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cztcbiAgfSgpIDpcbiAgLy8gZWxzZVxuICB2b2lkIDA7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZW1wdHk7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBlcXVhbHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9lcXVhbHMnKTtcblxudmFyIHRha2VMYXN0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdGFrZUxhc3QnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGVuZHMgd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWVzXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMjQuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IEJvb2xlYW5cbiAqIEBzaWcgU3RyaW5nIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7Kn0gc3VmZml4XG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5lbmRzV2l0aCgnYycsICdhYmMnKSAgICAgICAgICAgICAgICAvLz0+IHRydWVcbiAqICAgICAgUi5lbmRzV2l0aCgnYicsICdhYmMnKSAgICAgICAgICAgICAgICAvLz0+IGZhbHNlXG4gKiAgICAgIFIuZW5kc1dpdGgoWydjJ10sIFsnYScsICdiJywgJ2MnXSkgICAgLy89PiB0cnVlXG4gKiAgICAgIFIuZW5kc1dpdGgoWydiJ10sIFsnYScsICdiJywgJ2MnXSkgICAgLy89PiBmYWxzZVxuICovXG5cblxudmFyIGVuZHNXaXRoID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gKHN1ZmZpeCwgbGlzdCkge1xuICByZXR1cm4gZXF1YWxzKHRha2VMYXN0KHN1ZmZpeC5sZW5ndGgsIGxpc3QpLCBzdWZmaXgpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGVuZHNXaXRoOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgZXF1YWxzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZXF1YWxzJyk7XG5cbi8qKlxuICogVGFrZXMgYSBmdW5jdGlvbiBhbmQgdHdvIHZhbHVlcyBpbiBpdHMgZG9tYWluIGFuZCByZXR1cm5zIGB0cnVlYCBpZiB0aGVcbiAqIHZhbHVlcyBtYXAgdG8gdGhlIHNhbWUgdmFsdWUgaW4gdGhlIGNvZG9tYWluOyBgZmFsc2VgIG90aGVyd2lzZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOC4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgKGEgLT4gYikgLT4gYSAtPiBhIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAqIEBwYXJhbSB7Kn0geFxuICogQHBhcmFtIHsqfSB5XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZXFCeShNYXRoLmFicywgNSwgLTUpOyAvLz0+IHRydWVcbiAqL1xuXG5cbnZhciBlcUJ5ID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gZXFCeShmLCB4LCB5KSB7XG4gIHJldHVybiBlcXVhbHMoZih4KSwgZih5KSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZXFCeTsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxudmFyIGVxdWFscyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2VxdWFscycpO1xuXG4vKipcbiAqIFJlcG9ydHMgd2hldGhlciB0d28gb2JqZWN0cyBoYXZlIHRoZSBzYW1lIHZhbHVlLCBpbiBbYFIuZXF1YWxzYF0oI2VxdWFscylcbiAqIHRlcm1zLCBmb3IgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eS4gVXNlZnVsIGFzIGEgY3VycmllZCBwcmVkaWNhdGUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIGsgLT4ge2s6IHZ9IC0+IHtrOiB2fSAtPiBCb29sZWFuXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcCBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gY29tcGFyZVxuICogQHBhcmFtIHtPYmplY3R9IG9iajFcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbzEgPSB7IGE6IDEsIGI6IDIsIGM6IDMsIGQ6IDQgfTtcbiAqICAgICAgdmFyIG8yID0geyBhOiAxMCwgYjogMjAsIGM6IDMsIGQ6IDQwIH07XG4gKiAgICAgIFIuZXFQcm9wcygnYScsIG8xLCBvMik7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5lcVByb3BzKCdjJywgbzEsIG8yKTsgLy89PiB0cnVlXG4gKi9cblxuXG52YXIgZXFQcm9wcyA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIGVxUHJvcHMocHJvcCwgb2JqMSwgb2JqMikge1xuICByZXR1cm4gZXF1YWxzKG9iajFbcHJvcF0sIG9iajJbcHJvcF0pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGVxUHJvcHM7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfZXF1YWxzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2VxdWFscycpO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIGl0cyBhcmd1bWVudHMgYXJlIGVxdWl2YWxlbnQsIGBmYWxzZWAgb3RoZXJ3aXNlLiBIYW5kbGVzXG4gKiBjeWNsaWNhbCBkYXRhIHN0cnVjdHVyZXMuXG4gKlxuICogRGlzcGF0Y2hlcyBzeW1tZXRyaWNhbGx5IHRvIHRoZSBgZXF1YWxzYCBtZXRob2RzIG9mIGJvdGggYXJndW1lbnRzLCBpZlxuICogcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgYSAtPiBiIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7Kn0gYVxuICogQHBhcmFtIHsqfSBiXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZXF1YWxzKDEsIDEpOyAvLz0+IHRydWVcbiAqICAgICAgUi5lcXVhbHMoMSwgJzEnKTsgLy89PiBmYWxzZVxuICogICAgICBSLmVxdWFscyhbMSwgMiwgM10sIFsxLCAyLCAzXSk7IC8vPT4gdHJ1ZVxuICpcbiAqICAgICAgdmFyIGEgPSB7fTsgYS52ID0gYTtcbiAqICAgICAgdmFyIGIgPSB7fTsgYi52ID0gYjtcbiAqICAgICAgUi5lcXVhbHMoYSwgYik7IC8vPT4gdHJ1ZVxuICovXG5cblxudmFyIGVxdWFscyA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gIHJldHVybiBfZXF1YWxzKGEsIGIsIFtdLCBbXSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZXF1YWxzOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IGJ5IHJlY3Vyc2l2ZWx5IGV2b2x2aW5nIGEgc2hhbGxvdyBjb3B5IG9mIGBvYmplY3RgLFxuICogYWNjb3JkaW5nIHRvIHRoZSBgdHJhbnNmb3JtYXRpb25gIGZ1bmN0aW9ucy4gQWxsIG5vbi1wcmltaXRpdmUgcHJvcGVydGllc1xuICogYXJlIGNvcGllZCBieSByZWZlcmVuY2UuXG4gKlxuICogQSBgdHJhbnNmb3JtYXRpb25gIGZ1bmN0aW9uIHdpbGwgbm90IGJlIGludm9rZWQgaWYgaXRzIGNvcnJlc3BvbmRpbmcga2V5XG4gKiBkb2VzIG5vdCBleGlzdCBpbiB0aGUgZXZvbHZlZCBvYmplY3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtrOiAodiAtPiB2KX0gLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICogQHBhcmFtIHtPYmplY3R9IHRyYW5zZm9ybWF0aW9ucyBUaGUgb2JqZWN0IHNwZWNpZnlpbmcgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb25zIHRvIGFwcGx5XG4gKiAgICAgICAgdG8gdGhlIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSB0cmFuc2Zvcm1lZC5cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHRyYW5zZm9ybWVkIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgdG9tYXRvICA9IHtmaXJzdE5hbWU6ICcgIFRvbWF0byAnLCBkYXRhOiB7ZWxhcHNlZDogMTAwLCByZW1haW5pbmc6IDE0MDB9LCBpZDoxMjN9O1xuICogICAgICB2YXIgdHJhbnNmb3JtYXRpb25zID0ge1xuICogICAgICAgIGZpcnN0TmFtZTogUi50cmltLFxuICogICAgICAgIGxhc3ROYW1lOiBSLnRyaW0sIC8vIFdpbGwgbm90IGdldCBpbnZva2VkLlxuICogICAgICAgIGRhdGE6IHtlbGFwc2VkOiBSLmFkZCgxKSwgcmVtYWluaW5nOiBSLmFkZCgtMSl9XG4gKiAgICAgIH07XG4gKiAgICAgIFIuZXZvbHZlKHRyYW5zZm9ybWF0aW9ucywgdG9tYXRvKTsgLy89PiB7Zmlyc3ROYW1lOiAnVG9tYXRvJywgZGF0YToge2VsYXBzZWQ6IDEwMSwgcmVtYWluaW5nOiAxMzk5fSwgaWQ6MTIzfVxuICovXG5cblxudmFyIGV2b2x2ZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGV2b2x2ZSh0cmFuc2Zvcm1hdGlvbnMsIG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIHZhciB0cmFuc2Zvcm1hdGlvbiwga2V5LCB0eXBlO1xuICBmb3IgKGtleSBpbiBvYmplY3QpIHtcbiAgICB0cmFuc2Zvcm1hdGlvbiA9IHRyYW5zZm9ybWF0aW9uc1trZXldO1xuICAgIHR5cGUgPSB0eXBlb2YgdHJhbnNmb3JtYXRpb247XG4gICAgcmVzdWx0W2tleV0gPSB0eXBlID09PSAnZnVuY3Rpb24nID8gdHJhbnNmb3JtYXRpb24ob2JqZWN0W2tleV0pIDogdHJhbnNmb3JtYXRpb24gJiYgdHlwZSA9PT0gJ29iamVjdCcgPyBldm9sdmUodHJhbnNmb3JtYXRpb24sIG9iamVjdFtrZXldKSA6IG9iamVjdFtrZXldO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZXZvbHZlOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF9maWx0ZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZmlsdGVyJyk7XG5cbnZhciBfaXNPYmplY3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNPYmplY3QnKTtcblxudmFyIF9yZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fcmVkdWNlJyk7XG5cbnZhciBfeGZpbHRlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194ZmlsdGVyJyk7XG5cbnZhciBrZXlzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIFRha2VzIGEgcHJlZGljYXRlIGFuZCBhIGBGaWx0ZXJhYmxlYCwgYW5kIHJldHVybnMgYSBuZXcgZmlsdGVyYWJsZSBvZiB0aGVcbiAqIHNhbWUgdHlwZSBjb250YWluaW5nIHRoZSBtZW1iZXJzIG9mIHRoZSBnaXZlbiBmaWx0ZXJhYmxlIHdoaWNoIHNhdGlzZnkgdGhlXG4gKiBnaXZlbiBwcmVkaWNhdGUuIEZpbHRlcmFibGUgb2JqZWN0cyBpbmNsdWRlIHBsYWluIG9iamVjdHMgb3IgYW55IG9iamVjdFxuICogdGhhdCBoYXMgYSBmaWx0ZXIgbWV0aG9kIHN1Y2ggYXMgYEFycmF5YC5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgZmlsdGVyYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBGaWx0ZXJhYmxlIGYgPT4gKGEgLT4gQm9vbGVhbikgLT4gZiBhIC0+IGYgYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZFxuICogQHBhcmFtIHtBcnJheX0gZmlsdGVyYWJsZVxuICogQHJldHVybiB7QXJyYXl9IEZpbHRlcmFibGVcbiAqIEBzZWUgUi5yZWplY3QsIFIudHJhbnNkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzRXZlbiA9IG4gPT4gbiAlIDIgPT09IDA7XG4gKlxuICogICAgICBSLmZpbHRlcihpc0V2ZW4sIFsxLCAyLCAzLCA0XSk7IC8vPT4gWzIsIDRdXG4gKlxuICogICAgICBSLmZpbHRlcihpc0V2ZW4sIHthOiAxLCBiOiAyLCBjOiAzLCBkOiA0fSk7IC8vPT4ge2I6IDIsIGQ6IDR9XG4gKi9cblxuXG52YXIgZmlsdGVyID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFsnZmlsdGVyJ10sIF94ZmlsdGVyLCBmdW5jdGlvbiAocHJlZCwgZmlsdGVyYWJsZSkge1xuICByZXR1cm4gX2lzT2JqZWN0KGZpbHRlcmFibGUpID8gX3JlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICBpZiAocHJlZChmaWx0ZXJhYmxlW2tleV0pKSB7XG4gICAgICBhY2Nba2V5XSA9IGZpbHRlcmFibGVba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30sIGtleXMoZmlsdGVyYWJsZSkpIDpcbiAgLy8gZWxzZVxuICBfZmlsdGVyKHByZWQsIGZpbHRlcmFibGUpO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBmaWx0ZXI7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfZGlzcGF0Y2hhYmxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xuXG52YXIgX3hmaW5kID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3hmaW5kJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgbGlzdCB3aGljaCBtYXRjaGVzIHRoZSBwcmVkaWNhdGUsIG9yXG4gKiBgdW5kZWZpbmVkYCBpZiBubyBlbGVtZW50IG1hdGNoZXMuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYGZpbmRgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBhIHwgdW5kZWZpbmVkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoZSBlbGVtZW50IGlzIHRoZVxuICogICAgICAgIGRlc2lyZWQgb25lLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBlbGVtZW50IGZvdW5kLCBvciBgdW5kZWZpbmVkYC5cbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeHMgPSBbe2E6IDF9LCB7YTogMn0sIHthOiAzfV07XG4gKiAgICAgIFIuZmluZChSLnByb3BFcSgnYScsIDIpKSh4cyk7IC8vPT4ge2E6IDJ9XG4gKiAgICAgIFIuZmluZChSLnByb3BFcSgnYScsIDQpKSh4cyk7IC8vPT4gdW5kZWZpbmVkXG4gKi9cblxuXG52YXIgZmluZCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbJ2ZpbmQnXSwgX3hmaW5kLCBmdW5jdGlvbiBmaW5kKGZuLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBpZiAoZm4obGlzdFtpZHhdKSkge1xuICAgICAgcmV0dXJuIGxpc3RbaWR4XTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZmluZDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9kaXNwYXRjaGFibGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG5cbnZhciBfeGZpbmRJbmRleCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194ZmluZEluZGV4Jyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGxpc3Qgd2hpY2ggbWF0Y2hlcyB0aGVcbiAqIHByZWRpY2F0ZSwgb3IgYC0xYCBpZiBubyBlbGVtZW50IG1hdGNoZXMuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMVxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IE51bWJlclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiB1c2VkIHRvIGRldGVybWluZSBpZiB0aGUgZWxlbWVudCBpcyB0aGVcbiAqIGRlc2lyZWQgb25lLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCBmb3VuZCwgb3IgYC0xYC5cbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeHMgPSBbe2E6IDF9LCB7YTogMn0sIHthOiAzfV07XG4gKiAgICAgIFIuZmluZEluZGV4KFIucHJvcEVxKCdhJywgMikpKHhzKTsgLy89PiAxXG4gKiAgICAgIFIuZmluZEluZGV4KFIucHJvcEVxKCdhJywgNCkpKHhzKTsgLy89PiAtMVxuICovXG5cblxudmFyIGZpbmRJbmRleCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbXSwgX3hmaW5kSW5kZXgsIGZ1bmN0aW9uIGZpbmRJbmRleChmbiwgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiAtMTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZmluZEluZGV4OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF94ZmluZExhc3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feGZpbmRMYXN0Jyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IG9mIHRoZSBsaXN0IHdoaWNoIG1hdGNoZXMgdGhlIHByZWRpY2F0ZSwgb3JcbiAqIGB1bmRlZmluZWRgIGlmIG5vIGVsZW1lbnQgbWF0Y2hlcy5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4xXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gYSB8IHVuZGVmaW5lZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiB1c2VkIHRvIGRldGVybWluZSBpZiB0aGUgZWxlbWVudCBpcyB0aGVcbiAqIGRlc2lyZWQgb25lLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBlbGVtZW50IGZvdW5kLCBvciBgdW5kZWZpbmVkYC5cbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeHMgPSBbe2E6IDEsIGI6IDB9LCB7YToxLCBiOiAxfV07XG4gKiAgICAgIFIuZmluZExhc3QoUi5wcm9wRXEoJ2EnLCAxKSkoeHMpOyAvLz0+IHthOiAxLCBiOiAxfVxuICogICAgICBSLmZpbmRMYXN0KFIucHJvcEVxKCdhJywgNCkpKHhzKTsgLy89PiB1bmRlZmluZWRcbiAqL1xuXG5cbnZhciBmaW5kTGFzdCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbXSwgX3hmaW5kTGFzdCwgZnVuY3Rpb24gZmluZExhc3QoZm4sIGxpc3QpIHtcbiAgdmFyIGlkeCA9IGxpc3QubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgIHJldHVybiBsaXN0W2lkeF07XG4gICAgfVxuICAgIGlkeCAtPSAxO1xuICB9XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZpbmRMYXN0OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF94ZmluZExhc3RJbmRleCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194ZmluZExhc3RJbmRleCcpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBsYXN0IGVsZW1lbnQgb2YgdGhlIGxpc3Qgd2hpY2ggbWF0Y2hlcyB0aGVcbiAqIHByZWRpY2F0ZSwgb3IgYC0xYCBpZiBubyBlbGVtZW50IG1hdGNoZXMuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMVxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IE51bWJlclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiB1c2VkIHRvIGRldGVybWluZSBpZiB0aGUgZWxlbWVudCBpcyB0aGVcbiAqIGRlc2lyZWQgb25lLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCBmb3VuZCwgb3IgYC0xYC5cbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeHMgPSBbe2E6IDEsIGI6IDB9LCB7YToxLCBiOiAxfV07XG4gKiAgICAgIFIuZmluZExhc3RJbmRleChSLnByb3BFcSgnYScsIDEpKSh4cyk7IC8vPT4gMVxuICogICAgICBSLmZpbmRMYXN0SW5kZXgoUi5wcm9wRXEoJ2EnLCA0KSkoeHMpOyAvLz0+IC0xXG4gKi9cblxuXG52YXIgZmluZExhc3RJbmRleCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbXSwgX3hmaW5kTGFzdEluZGV4LCBmdW5jdGlvbiBmaW5kTGFzdEluZGV4KGZuLCBsaXN0KSB7XG4gIHZhciBpZHggPSBsaXN0Lmxlbmd0aCAtIDE7XG4gIHdoaWxlIChpZHggPj0gMCkge1xuICAgIGlmIChmbihsaXN0W2lkeF0pKSB7XG4gICAgICByZXR1cm4gaWR4O1xuICAgIH1cbiAgICBpZHggLT0gMTtcbiAgfVxuICByZXR1cm4gLTE7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZpbmRMYXN0SW5kZXg7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBfbWFrZUZsYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fbWFrZUZsYXQnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3QgYnkgcHVsbGluZyBldmVyeSBpdGVtIG91dCBvZiBpdCAoYW5kIGFsbCBpdHMgc3ViLWFycmF5cylcbiAqIGFuZCBwdXR0aW5nIHRoZW0gaW4gYSBuZXcgYXJyYXksIGRlcHRoLWZpcnN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFtiXVxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGZsYXR0ZW5lZCBsaXN0LlxuICogQHNlZSBSLnVubmVzdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZmxhdHRlbihbMSwgMiwgWzMsIDRdLCA1LCBbNiwgWzcsIDgsIFs5LCBbMTAsIDExXSwgMTJdXV1dKTtcbiAqICAgICAgLy89PiBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl1cbiAqL1xuXG5cbnZhciBmbGF0dGVuID0gLyojX19QVVJFX18qL19jdXJyeTEoIC8qI19fUFVSRV9fKi9fbWFrZUZsYXQodHJ1ZSkpO1xubW9kdWxlLmV4cG9ydHMgPSBmbGF0dGVuOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY3VycnlOJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBmdW5jdGlvbiBtdWNoIGxpa2UgdGhlIHN1cHBsaWVkIG9uZSwgZXhjZXB0IHRoYXQgdGhlIGZpcnN0IHR3b1xuICogYXJndW1lbnRzJyBvcmRlciBpcyByZXZlcnNlZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKGEsIGIsIGMsIC4uLikgLT4geikgLT4gKGIgLT4gYSAtPiBjIC0+IC4uLiAtPiB6KVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGludm9rZSB3aXRoIGl0cyBmaXJzdCB0d28gcGFyYW1ldGVycyByZXZlcnNlZC5cbiAqIEByZXR1cm4geyp9IFRoZSByZXN1bHQgb2YgaW52b2tpbmcgYGZuYCB3aXRoIGl0cyBmaXJzdCB0d28gcGFyYW1ldGVycycgb3JkZXIgcmV2ZXJzZWQuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG1lcmdlVGhyZWUgPSAoYSwgYiwgYykgPT4gW10uY29uY2F0KGEsIGIsIGMpO1xuICpcbiAqICAgICAgbWVyZ2VUaHJlZSgxLCAyLCAzKTsgLy89PiBbMSwgMiwgM11cbiAqXG4gKiAgICAgIFIuZmxpcChtZXJnZVRocmVlKSgxLCAyLCAzKTsgLy89PiBbMiwgMSwgM11cbiAqIEBzeW1iIFIuZmxpcChmKShhLCBiLCBjKSA9IGYoYiwgYSwgYylcbiAqL1xuXG5cbnZhciBmbGlwID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gZmxpcChmbikge1xuICByZXR1cm4gY3VycnlOKGZuLmxlbmd0aCwgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgYXJnc1swXSA9IGI7XG4gICAgYXJnc1sxXSA9IGE7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBmbGlwOyIsInZhciBfY2hlY2tGb3JNZXRob2QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY2hlY2tGb3JNZXRob2QnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIGlucHV0IGBsaXN0YCwgY2FsbGluZyBhIHByb3ZpZGVkIGZ1bmN0aW9uIGBmbmAgZm9yIGVhY2hcbiAqIGVsZW1lbnQgaW4gdGhlIGxpc3QuXG4gKlxuICogYGZuYCByZWNlaXZlcyBvbmUgYXJndW1lbnQ6ICoodmFsdWUpKi5cbiAqXG4gKiBOb3RlOiBgUi5mb3JFYWNoYCBkb2VzIG5vdCBza2lwIGRlbGV0ZWQgb3IgdW5hc3NpZ25lZCBpbmRpY2VzIChzcGFyc2VcbiAqIGFycmF5cyksIHVubGlrZSB0aGUgbmF0aXZlIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kLiBGb3IgbW9yZVxuICogZGV0YWlscyBvbiB0aGlzIGJlaGF2aW9yLCBzZWU6XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9mb3JFYWNoI0Rlc2NyaXB0aW9uXG4gKlxuICogQWxzbyBub3RlIHRoYXQsIHVubGlrZSBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgLCBSYW1kYSdzIGBmb3JFYWNoYCByZXR1cm5zXG4gKiB0aGUgb3JpZ2luYWwgYXJyYXkuIEluIHNvbWUgbGlicmFyaWVzIHRoaXMgZnVuY3Rpb24gaXMgbmFtZWQgYGVhY2hgLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBmb3JFYWNoYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjFcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhIC0+ICopIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuIFJlY2VpdmVzIG9uZSBhcmd1bWVudCwgYHZhbHVlYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBvcmlnaW5hbCBsaXN0LlxuICogQHNlZSBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHByaW50WFBsdXNGaXZlID0geCA9PiBjb25zb2xlLmxvZyh4ICsgNSk7XG4gKiAgICAgIFIuZm9yRWFjaChwcmludFhQbHVzRml2ZSwgWzEsIDIsIDNdKTsgLy89PiBbMSwgMiwgM11cbiAqICAgICAgLy8gbG9ncyA2XG4gKiAgICAgIC8vIGxvZ3MgN1xuICogICAgICAvLyBsb2dzIDhcbiAqIEBzeW1iIFIuZm9yRWFjaChmLCBbYSwgYiwgY10pID0gW2EsIGIsIGNdXG4gKi9cblxuXG52YXIgZm9yRWFjaCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2NoZWNrRm9yTWV0aG9kKCdmb3JFYWNoJywgZnVuY3Rpb24gZm9yRWFjaChmbiwgbGlzdCkge1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHZhciBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgZm4obGlzdFtpZHhdKTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gbGlzdDtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIGtleXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIGlucHV0IGBvYmplY3RgLCBjYWxsaW5nIGEgcHJvdmlkZWQgZnVuY3Rpb24gYGZuYCBmb3IgZWFjaFxuICoga2V5IGFuZCB2YWx1ZSBpbiB0aGUgb2JqZWN0LlxuICpcbiAqIGBmbmAgcmVjZWl2ZXMgdGhyZWUgYXJndW1lbnQ6ICoodmFsdWUsIGtleSwgb2JqKSouXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMjMuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyAoKGEsIFN0cmluZywgU3RyTWFwIGEpIC0+IEFueSkgLT4gU3RyTWFwIGEgLT4gU3RyTWFwIGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuIFJlY2VpdmVzIHRocmVlIGFyZ3VtZW50LCBgdmFsdWVgLCBga2V5YCwgYG9iamAuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgb3JpZ2luYWwgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBwcmludEtleUNvbmNhdFZhbHVlID0gKHZhbHVlLCBrZXkpID0+IGNvbnNvbGUubG9nKGtleSArICc6JyArIHZhbHVlKTtcbiAqICAgICAgUi5mb3JFYWNoT2JqSW5kZXhlZChwcmludEtleUNvbmNhdFZhbHVlLCB7eDogMSwgeTogMn0pOyAvLz0+IHt4OiAxLCB5OiAyfVxuICogICAgICAvLyBsb2dzIHg6MVxuICogICAgICAvLyBsb2dzIHk6MlxuICogQHN5bWIgUi5mb3JFYWNoT2JqSW5kZXhlZChmLCB7eDogYSwgeTogYn0pID0ge3g6IGEsIHk6IGJ9XG4gKi9cblxuXG52YXIgZm9yRWFjaE9iakluZGV4ZWQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBmb3JFYWNoT2JqSW5kZXhlZChmbiwgb2JqKSB7XG4gIHZhciBrZXlMaXN0ID0ga2V5cyhvYmopO1xuICB2YXIgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IGtleUxpc3QubGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IGtleUxpc3RbaWR4XTtcbiAgICBmbihvYmpba2V5XSwga2V5LCBvYmopO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBvYmo7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaE9iakluZGV4ZWQ7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBvYmplY3QgZnJvbSBhIGxpc3Qga2V5LXZhbHVlIHBhaXJzLiBJZiBhIGtleSBhcHBlYXJzIGluXG4gKiBtdWx0aXBsZSBwYWlycywgdGhlIHJpZ2h0bW9zdCBwYWlyIGlzIGluY2x1ZGVkIGluIHRoZSBvYmplY3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMy4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbW2ssdl1dIC0+IHtrOiB2fVxuICogQHBhcmFtIHtBcnJheX0gcGFpcnMgQW4gYXJyYXkgb2YgdHdvLWVsZW1lbnQgYXJyYXlzIHRoYXQgd2lsbCBiZSB0aGUga2V5cyBhbmQgdmFsdWVzIG9mIHRoZSBvdXRwdXQgb2JqZWN0LlxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgb2JqZWN0IG1hZGUgYnkgcGFpcmluZyB1cCBga2V5c2AgYW5kIGB2YWx1ZXNgLlxuICogQHNlZSBSLnRvUGFpcnMsIFIucGFpclxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZnJvbVBhaXJzKFtbJ2EnLCAxXSwgWydiJywgMl0sIFsnYycsIDNdXSk7IC8vPT4ge2E6IDEsIGI6IDIsIGM6IDN9XG4gKi9cblxuXG52YXIgZnJvbVBhaXJzID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gZnJvbVBhaXJzKHBhaXJzKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgdmFyIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBwYWlycy5sZW5ndGgpIHtcbiAgICByZXN1bHRbcGFpcnNbaWR4XVswXV0gPSBwYWlyc1tpZHhdWzFdO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZnJvbVBhaXJzOyIsInZhciBfY2hlY2tGb3JNZXRob2QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY2hlY2tGb3JNZXRob2QnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciByZWR1Y2VCeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlZHVjZUJ5Jyk7XG5cbi8qKlxuICogU3BsaXRzIGEgbGlzdCBpbnRvIHN1Yi1saXN0cyBzdG9yZWQgaW4gYW4gb2JqZWN0LCBiYXNlZCBvbiB0aGUgcmVzdWx0IG9mXG4gKiBjYWxsaW5nIGEgU3RyaW5nLXJldHVybmluZyBmdW5jdGlvbiBvbiBlYWNoIGVsZW1lbnQsIGFuZCBncm91cGluZyB0aGVcbiAqIHJlc3VsdHMgYWNjb3JkaW5nIHRvIHZhbHVlcyByZXR1cm5lZC5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgZ3JvdXBCeWAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gU3RyaW5nKSAtPiBbYV0gLT4ge1N0cmluZzogW2FdfVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gOjogYSAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGdyb3VwXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIHRoZSBvdXRwdXQgb2YgYGZuYCBmb3Iga2V5cywgbWFwcGVkIHRvIGFycmF5cyBvZiBlbGVtZW50c1xuICogICAgICAgICB0aGF0IHByb2R1Y2VkIHRoYXQga2V5IHdoZW4gcGFzc2VkIHRvIGBmbmAuXG4gKiBAc2VlIFIudHJhbnNkdWNlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGJ5R3JhZGUgPSBSLmdyb3VwQnkoZnVuY3Rpb24oc3R1ZGVudCkge1xuICogICAgICAgIHZhciBzY29yZSA9IHN0dWRlbnQuc2NvcmU7XG4gKiAgICAgICAgcmV0dXJuIHNjb3JlIDwgNjUgPyAnRicgOlxuICogICAgICAgICAgICAgICBzY29yZSA8IDcwID8gJ0QnIDpcbiAqICAgICAgICAgICAgICAgc2NvcmUgPCA4MCA/ICdDJyA6XG4gKiAgICAgICAgICAgICAgIHNjb3JlIDwgOTAgPyAnQicgOiAnQSc7XG4gKiAgICAgIH0pO1xuICogICAgICB2YXIgc3R1ZGVudHMgPSBbe25hbWU6ICdBYmJ5Jywgc2NvcmU6IDg0fSxcbiAqICAgICAgICAgICAgICAgICAgICAgIHtuYW1lOiAnRWRkeScsIHNjb3JlOiA1OH0sXG4gKiAgICAgICAgICAgICAgICAgICAgICAvLyAuLi5cbiAqICAgICAgICAgICAgICAgICAgICAgIHtuYW1lOiAnSmFjaycsIHNjb3JlOiA2OX1dO1xuICogICAgICBieUdyYWRlKHN0dWRlbnRzKTtcbiAqICAgICAgLy8ge1xuICogICAgICAvLyAgICdBJzogW3tuYW1lOiAnRGlhbm5lJywgc2NvcmU6IDk5fV0sXG4gKiAgICAgIC8vICAgJ0InOiBbe25hbWU6ICdBYmJ5Jywgc2NvcmU6IDg0fV1cbiAqICAgICAgLy8gICAvLyAuLi4sXG4gKiAgICAgIC8vICAgJ0YnOiBbe25hbWU6ICdFZGR5Jywgc2NvcmU6IDU4fV1cbiAqICAgICAgLy8gfVxuICovXG5cblxudmFyIGdyb3VwQnkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MiggLyojX19QVVJFX18qL19jaGVja0Zvck1ldGhvZCgnZ3JvdXBCeScsIC8qI19fUFVSRV9fKi9yZWR1Y2VCeShmdW5jdGlvbiAoYWNjLCBpdGVtKSB7XG4gIGlmIChhY2MgPT0gbnVsbCkge1xuICAgIGFjYyA9IFtdO1xuICB9XG4gIGFjYy5wdXNoKGl0ZW0pO1xuICByZXR1cm4gYWNjO1xufSwgbnVsbCkpKTtcbm1vZHVsZS5leHBvcnRzID0gZ3JvdXBCeTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBUYWtlcyBhIGxpc3QgYW5kIHJldHVybnMgYSBsaXN0IG9mIGxpc3RzIHdoZXJlIGVhY2ggc3VibGlzdCdzIGVsZW1lbnRzIGFyZVxuICogYWxsIHNhdGlzZmllZCBwYWlyd2lzZSBjb21wYXJpc29uIGFjY29yZGluZyB0byB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uXG4gKiBPbmx5IGFkamFjZW50IGVsZW1lbnRzIGFyZSBwYXNzZWQgdG8gdGhlIGNvbXBhcmlzb24gZnVuY3Rpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKChhLCBhKSDihpIgQm9vbGVhbikg4oaSIFthXSDihpIgW1thXV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIHR3byBnaXZlbiAoYWRqYWNlbnQpXG4gKiAgICAgICAgZWxlbWVudHMgc2hvdWxkIGJlIGluIHRoZSBzYW1lIGdyb3VwXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBncm91cC4gQWxzbyBhY2NlcHRzIGEgc3RyaW5nLCB3aGljaCB3aWxsIGJlXG4gKiAgICAgICAgdHJlYXRlZCBhcyBhIGxpc3Qgb2YgY2hhcmFjdGVycy5cbiAqIEByZXR1cm4ge0xpc3R9IEEgbGlzdCB0aGF0IGNvbnRhaW5zIHN1Ymxpc3RzIG9mIGVsZW1lbnRzLFxuICogICAgICAgICB3aG9zZSBjb25jYXRlbmF0aW9ucyBhcmUgZXF1YWwgdG8gdGhlIG9yaWdpbmFsIGxpc3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIFIuZ3JvdXBXaXRoKFIuZXF1YWxzLCBbMCwgMSwgMSwgMiwgMywgNSwgOCwgMTMsIDIxXSlcbiAqIC8vPT4gW1swXSwgWzEsIDFdLCBbMl0sIFszXSwgWzVdLCBbOF0sIFsxM10sIFsyMV1dXG4gKlxuICogUi5ncm91cFdpdGgoKGEsIGIpID0+IGEgKyAxID09PSBiLCBbMCwgMSwgMSwgMiwgMywgNSwgOCwgMTMsIDIxXSlcbiAqIC8vPT4gW1swLCAxXSwgWzEsIDIsIDNdLCBbNV0sIFs4XSwgWzEzXSwgWzIxXV1cbiAqXG4gKiBSLmdyb3VwV2l0aCgoYSwgYikgPT4gYSAlIDIgPT09IGIgJSAyLCBbMCwgMSwgMSwgMiwgMywgNSwgOCwgMTMsIDIxXSlcbiAqIC8vPT4gW1swXSwgWzEsIDFdLCBbMl0sIFszLCA1XSwgWzhdLCBbMTMsIDIxXV1cbiAqXG4gKiBSLmdyb3VwV2l0aChSLmVxQnkoaXNWb3dlbCksICdhZXN0aW91JylcbiAqIC8vPT4gWydhZScsICdzdCcsICdpb3UnXVxuICovXG5cblxudmFyIGdyb3VwV2l0aCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIChmbiwgbGlzdCkge1xuICB2YXIgcmVzID0gW107XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICB2YXIgbmV4dGlkeCA9IGlkeCArIDE7XG4gICAgd2hpbGUgKG5leHRpZHggPCBsZW4gJiYgZm4obGlzdFtuZXh0aWR4IC0gMV0sIGxpc3RbbmV4dGlkeF0pKSB7XG4gICAgICBuZXh0aWR4ICs9IDE7XG4gICAgfVxuICAgIHJlcy5wdXNoKGxpc3Quc2xpY2UoaWR4LCBuZXh0aWR4KSk7XG4gICAgaWR4ID0gbmV4dGlkeDtcbiAgfVxuICByZXR1cm4gcmVzO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGdyb3VwV2l0aDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgZ3JlYXRlciB0aGFuIHRoZSBzZWNvbmQ7IGBmYWxzZWBcbiAqIG90aGVyd2lzZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBPcmQgYSA9PiBhIC0+IGEgLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSBhXG4gKiBAcGFyYW0geyp9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAc2VlIFIubHRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmd0KDIsIDEpOyAvLz0+IHRydWVcbiAqICAgICAgUi5ndCgyLCAyKTsgLy89PiBmYWxzZVxuICogICAgICBSLmd0KDIsIDMpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuZ3QoJ2EnLCAneicpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuZ3QoJ3onLCAnYScpOyAvLz0+IHRydWVcbiAqL1xuXG5cbnZhciBndCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGd0KGEsIGIpIHtcbiAgcmV0dXJuIGEgPiBiO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGd0OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHNlY29uZDtcbiAqIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBCb29sZWFuXG4gKiBAcGFyYW0ge051bWJlcn0gYVxuICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAc2VlIFIubHRlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5ndGUoMiwgMSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmd0ZSgyLCAyKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuZ3RlKDIsIDMpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuZ3RlKCdhJywgJ3onKTsgLy89PiBmYWxzZVxuICogICAgICBSLmd0ZSgneicsICdhJyk7IC8vPT4gdHJ1ZVxuICovXG5cblxudmFyIGd0ZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGd0ZShhLCBiKSB7XG4gIHJldHVybiBhID49IGI7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZ3RlOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2hhcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19oYXMnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCBoYXMgYW4gb3duIHByb3BlcnR5IHdpdGggdGhlIHNwZWNpZmllZCBuYW1lXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHMgLT4ge3M6IHh9IC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBjaGVjayBmb3IuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBXaGV0aGVyIHRoZSBwcm9wZXJ0eSBleGlzdHMuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGhhc05hbWUgPSBSLmhhcygnbmFtZScpO1xuICogICAgICBoYXNOYW1lKHtuYW1lOiAnYWxpY2UnfSk7ICAgLy89PiB0cnVlXG4gKiAgICAgIGhhc05hbWUoe25hbWU6ICdib2InfSk7ICAgICAvLz0+IHRydWVcbiAqICAgICAgaGFzTmFtZSh7fSk7ICAgICAgICAgICAgICAgIC8vPT4gZmFsc2VcbiAqXG4gKiAgICAgIHZhciBwb2ludCA9IHt4OiAwLCB5OiAwfTtcbiAqICAgICAgdmFyIHBvaW50SGFzID0gUi5oYXMoUi5fXywgcG9pbnQpO1xuICogICAgICBwb2ludEhhcygneCcpOyAgLy89PiB0cnVlXG4gKiAgICAgIHBvaW50SGFzKCd5Jyk7ICAvLz0+IHRydWVcbiAqICAgICAgcG9pbnRIYXMoJ3onKTsgIC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciBoYXMgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihfaGFzKTtcbm1vZHVsZS5leHBvcnRzID0gaGFzOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUgY2hhaW4gaGFzIGEgcHJvcGVydHkgd2l0aFxuICogdGhlIHNwZWNpZmllZCBuYW1lXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHMgLT4ge3M6IHh9IC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBjaGVjayBmb3IuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBXaGV0aGVyIHRoZSBwcm9wZXJ0eSBleGlzdHMuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgZnVuY3Rpb24gUmVjdGFuZ2xlKHdpZHRoLCBoZWlnaHQpIHtcbiAqICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gKiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gKiAgICAgIH1cbiAqICAgICAgUmVjdGFuZ2xlLnByb3RvdHlwZS5hcmVhID0gZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGggKiB0aGlzLmhlaWdodDtcbiAqICAgICAgfTtcbiAqXG4gKiAgICAgIHZhciBzcXVhcmUgPSBuZXcgUmVjdGFuZ2xlKDIsIDIpO1xuICogICAgICBSLmhhc0luKCd3aWR0aCcsIHNxdWFyZSk7ICAvLz0+IHRydWVcbiAqICAgICAgUi5oYXNJbignYXJlYScsIHNxdWFyZSk7ICAvLz0+IHRydWVcbiAqL1xuXG5cbnZhciBoYXNJbiA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGhhc0luKHByb3AsIG9iaikge1xuICByZXR1cm4gcHJvcCBpbiBvYmo7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gaGFzSW47IiwidmFyIG50aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL250aCcpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGdpdmVuIGxpc3Qgb3Igc3RyaW5nLiBJbiBzb21lIGxpYnJhcmllc1xuICogdGhpcyBmdW5jdGlvbiBpcyBuYW1lZCBgZmlyc3RgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IGEgfCBVbmRlZmluZWRcbiAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIudGFpbCwgUi5pbml0LCBSLmxhc3RcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmhlYWQoWydmaScsICdmbycsICdmdW0nXSk7IC8vPT4gJ2ZpJ1xuICogICAgICBSLmhlYWQoW10pOyAvLz0+IHVuZGVmaW5lZFxuICpcbiAqICAgICAgUi5oZWFkKCdhYmMnKTsgLy89PiAnYSdcbiAqICAgICAgUi5oZWFkKCcnKTsgLy89PiAnJ1xuICovXG5cblxudmFyIGhlYWQgPSAvKiNfX1BVUkVfXyovbnRoKDApO1xubW9kdWxlLmV4cG9ydHMgPSBoZWFkOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBpdHMgYXJndW1lbnRzIGFyZSBpZGVudGljYWwsIGZhbHNlIG90aGVyd2lzZS4gVmFsdWVzIGFyZVxuICogaWRlbnRpY2FsIGlmIHRoZXkgcmVmZXJlbmNlIHRoZSBzYW1lIG1lbW9yeS4gYE5hTmAgaXMgaWRlbnRpY2FsIHRvIGBOYU5gO1xuICogYDBgIGFuZCBgLTBgIGFyZSBub3QgaWRlbnRpY2FsLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE1LjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBhIC0+IGEgLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSBhXG4gKiBAcGFyYW0geyp9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG8gPSB7fTtcbiAqICAgICAgUi5pZGVudGljYWwobywgbyk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmlkZW50aWNhbCgxLCAxKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaWRlbnRpY2FsKDEsICcxJyk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5pZGVudGljYWwoW10sIFtdKTsgLy89PiBmYWxzZVxuICogICAgICBSLmlkZW50aWNhbCgwLCAtMCk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5pZGVudGljYWwoTmFOLCBOYU4pOyAvLz0+IHRydWVcbiAqL1xuXG5cbnZhciBpZGVudGljYWwgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBpZGVudGljYWwoYSwgYikge1xuICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gIGlmIChhID09PSBiKSB7XG4gICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICByZXR1cm4gYSAhPT0gMCB8fCAxIC8gYSA9PT0gMSAvIGI7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICByZXR1cm4gYSAhPT0gYSAmJiBiICE9PSBiO1xuICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpY2FsOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgX2lkZW50aXR5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lkZW50aXR5Jyk7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IGRvZXMgbm90aGluZyBidXQgcmV0dXJuIHRoZSBwYXJhbWV0ZXIgc3VwcGxpZWQgdG8gaXQuIEdvb2RcbiAqIGFzIGEgZGVmYXVsdCBvciBwbGFjZWhvbGRlciBmdW5jdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBhIC0+IGFcbiAqIEBwYXJhbSB7Kn0geCBUaGUgdmFsdWUgdG8gcmV0dXJuLlxuICogQHJldHVybiB7Kn0gVGhlIGlucHV0IHZhbHVlLCBgeGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5pZGVudGl0eSgxKTsgLy89PiAxXG4gKlxuICogICAgICB2YXIgb2JqID0ge307XG4gKiAgICAgIFIuaWRlbnRpdHkob2JqKSA9PT0gb2JqOyAvLz0+IHRydWVcbiAqIEBzeW1iIFIuaWRlbnRpdHkoYSkgPSBhXG4gKi9cblxuXG52YXIgaWRlbnRpdHkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShfaWRlbnRpdHkpO1xubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxudmFyIGN1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2N1cnJ5TicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgcHJvY2VzcyBlaXRoZXIgdGhlIGBvblRydWVgIG9yIHRoZSBgb25GYWxzZWBcbiAqIGZ1bmN0aW9uIGRlcGVuZGluZyB1cG9uIHRoZSByZXN1bHQgb2YgdGhlIGBjb25kaXRpb25gIHByZWRpY2F0ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHNpZyAoKi4uLiAtPiBCb29sZWFuKSAtPiAoKi4uLiAtPiAqKSAtPiAoKi4uLiAtPiAqKSAtPiAoKi4uLiAtPiAqKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29uZGl0aW9uIEEgcHJlZGljYXRlIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvblRydWUgQSBmdW5jdGlvbiB0byBpbnZva2Ugd2hlbiB0aGUgYGNvbmRpdGlvbmAgZXZhbHVhdGVzIHRvIGEgdHJ1dGh5IHZhbHVlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25GYWxzZSBBIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBgY29uZGl0aW9uYCBldmFsdWF0ZXMgdG8gYSBmYWxzeSB2YWx1ZS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyB1bmFyeSBmdW5jdGlvbiB0aGF0IHdpbGwgcHJvY2VzcyBlaXRoZXIgdGhlIGBvblRydWVgIG9yIHRoZSBgb25GYWxzZWBcbiAqICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBkZXBlbmRpbmcgdXBvbiB0aGUgcmVzdWx0IG9mIHRoZSBgY29uZGl0aW9uYCBwcmVkaWNhdGUuXG4gKiBAc2VlIFIudW5sZXNzLCBSLndoZW5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaW5jQ291bnQgPSBSLmlmRWxzZShcbiAqICAgICAgICBSLmhhcygnY291bnQnKSxcbiAqICAgICAgICBSLm92ZXIoUi5sZW5zUHJvcCgnY291bnQnKSwgUi5pbmMpLFxuICogICAgICAgIFIuYXNzb2MoJ2NvdW50JywgMSlcbiAqICAgICAgKTtcbiAqICAgICAgaW5jQ291bnQoe30pOyAgICAgICAgICAgLy89PiB7IGNvdW50OiAxIH1cbiAqICAgICAgaW5jQ291bnQoeyBjb3VudDogMSB9KTsgLy89PiB7IGNvdW50OiAyIH1cbiAqL1xuXG5cbnZhciBpZkVsc2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBpZkVsc2UoY29uZGl0aW9uLCBvblRydWUsIG9uRmFsc2UpIHtcbiAgcmV0dXJuIGN1cnJ5TihNYXRoLm1heChjb25kaXRpb24ubGVuZ3RoLCBvblRydWUubGVuZ3RoLCBvbkZhbHNlLmxlbmd0aCksIGZ1bmN0aW9uIF9pZkVsc2UoKSB7XG4gICAgcmV0dXJuIGNvbmRpdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpID8gb25UcnVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBvbkZhbHNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH0pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGlmRWxzZTsiLCJ2YXIgYWRkID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYWRkJyk7XG5cbi8qKlxuICogSW5jcmVtZW50cyBpdHMgYXJndW1lbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gblxuICogQHJldHVybiB7TnVtYmVyfSBuICsgMVxuICogQHNlZSBSLmRlY1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaW5jKDQyKTsgLy89PiA0M1xuICovXG5cblxudmFyIGluYyA9IC8qI19fUFVSRV9fKi9hZGQoMSk7XG5tb2R1bGUuZXhwb3J0cyA9IGluYzsiLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xubW9kdWxlLmV4cG9ydHMuRiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL0YnKTtcbm1vZHVsZS5leHBvcnRzLlQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9UJyk7XG5tb2R1bGUuZXhwb3J0cy5fXyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19fJyk7XG5tb2R1bGUuZXhwb3J0cy5hZGQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hZGQnKTtcbm1vZHVsZS5leHBvcnRzLmFkZEluZGV4ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYWRkSW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzLmFkanVzdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2FkanVzdCcpO1xubW9kdWxlLmV4cG9ydHMuYWxsID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYWxsJyk7XG5tb2R1bGUuZXhwb3J0cy5hbGxQYXNzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYWxsUGFzcycpO1xubW9kdWxlLmV4cG9ydHMuYWx3YXlzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYWx3YXlzJyk7XG5tb2R1bGUuZXhwb3J0cy5hbmQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hbmQnKTtcbm1vZHVsZS5leHBvcnRzLmFueSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2FueScpO1xubW9kdWxlLmV4cG9ydHMuYW55UGFzcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2FueVBhc3MnKTtcbm1vZHVsZS5leHBvcnRzLmFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYXAnKTtcbm1vZHVsZS5leHBvcnRzLmFwZXJ0dXJlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYXBlcnR1cmUnKTtcbm1vZHVsZS5leHBvcnRzLmFwcGVuZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2FwcGVuZCcpO1xubW9kdWxlLmV4cG9ydHMuYXBwbHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hcHBseScpO1xubW9kdWxlLmV4cG9ydHMuYXBwbHlTcGVjID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYXBwbHlTcGVjJyk7XG5tb2R1bGUuZXhwb3J0cy5hcHBseVRvID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYXBwbHlUbycpO1xubW9kdWxlLmV4cG9ydHMuYXNjZW5kID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYXNjZW5kJyk7XG5tb2R1bGUuZXhwb3J0cy5hc3NvYyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2Fzc29jJyk7XG5tb2R1bGUuZXhwb3J0cy5hc3NvY1BhdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hc3NvY1BhdGgnKTtcbm1vZHVsZS5leHBvcnRzLmJpbmFyeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2JpbmFyeScpO1xubW9kdWxlLmV4cG9ydHMuYmluZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2JpbmQnKTtcbm1vZHVsZS5leHBvcnRzLmJvdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9ib3RoJyk7XG5tb2R1bGUuZXhwb3J0cy5jYWxsID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY2FsbCcpO1xubW9kdWxlLmV4cG9ydHMuY2hhaW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jaGFpbicpO1xubW9kdWxlLmV4cG9ydHMuY2xhbXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jbGFtcCcpO1xubW9kdWxlLmV4cG9ydHMuY2xvbmUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jbG9uZScpO1xubW9kdWxlLmV4cG9ydHMuY29tcGFyYXRvciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NvbXBhcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzLmNvbXBsZW1lbnQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb21wbGVtZW50Jyk7XG5tb2R1bGUuZXhwb3J0cy5jb21wb3NlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY29tcG9zZScpO1xubW9kdWxlLmV4cG9ydHMuY29tcG9zZUsgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb21wb3NlSycpO1xubW9kdWxlLmV4cG9ydHMuY29tcG9zZVAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb21wb3NlUCcpO1xubW9kdWxlLmV4cG9ydHMuY29uY2F0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY29uY2F0Jyk7XG5tb2R1bGUuZXhwb3J0cy5jb25kID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY29uZCcpO1xubW9kdWxlLmV4cG9ydHMuY29uc3RydWN0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY29uc3RydWN0Jyk7XG5tb2R1bGUuZXhwb3J0cy5jb25zdHJ1Y3ROID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY29uc3RydWN0TicpO1xubW9kdWxlLmV4cG9ydHMuY29udGFpbnMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb250YWlucycpO1xubW9kdWxlLmV4cG9ydHMuY29udmVyZ2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb252ZXJnZScpO1xubW9kdWxlLmV4cG9ydHMuY291bnRCeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NvdW50QnknKTtcbm1vZHVsZS5leHBvcnRzLmN1cnJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY3VycnknKTtcbm1vZHVsZS5leHBvcnRzLmN1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2N1cnJ5TicpO1xubW9kdWxlLmV4cG9ydHMuZGVjID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZGVjJyk7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0VG8gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kZWZhdWx0VG8nKTtcbm1vZHVsZS5leHBvcnRzLmRlc2NlbmQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kZXNjZW5kJyk7XG5tb2R1bGUuZXhwb3J0cy5kaWZmZXJlbmNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZGlmZmVyZW5jZScpO1xubW9kdWxlLmV4cG9ydHMuZGlmZmVyZW5jZVdpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kaWZmZXJlbmNlV2l0aCcpO1xubW9kdWxlLmV4cG9ydHMuZGlzc29jID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZGlzc29jJyk7XG5tb2R1bGUuZXhwb3J0cy5kaXNzb2NQYXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZGlzc29jUGF0aCcpO1xubW9kdWxlLmV4cG9ydHMuZGl2aWRlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZGl2aWRlJyk7XG5tb2R1bGUuZXhwb3J0cy5kcm9wID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZHJvcCcpO1xubW9kdWxlLmV4cG9ydHMuZHJvcExhc3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kcm9wTGFzdCcpO1xubW9kdWxlLmV4cG9ydHMuZHJvcExhc3RXaGlsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2Ryb3BMYXN0V2hpbGUnKTtcbm1vZHVsZS5leHBvcnRzLmRyb3BSZXBlYXRzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZHJvcFJlcGVhdHMnKTtcbm1vZHVsZS5leHBvcnRzLmRyb3BSZXBlYXRzV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2Ryb3BSZXBlYXRzV2l0aCcpO1xubW9kdWxlLmV4cG9ydHMuZHJvcFdoaWxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZHJvcFdoaWxlJyk7XG5tb2R1bGUuZXhwb3J0cy5laXRoZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9laXRoZXInKTtcbm1vZHVsZS5leHBvcnRzLmVtcHR5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZW1wdHknKTtcbm1vZHVsZS5leHBvcnRzLmVuZHNXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZW5kc1dpdGgnKTtcbm1vZHVsZS5leHBvcnRzLmVxQnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9lcUJ5Jyk7XG5tb2R1bGUuZXhwb3J0cy5lcVByb3BzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZXFQcm9wcycpO1xubW9kdWxlLmV4cG9ydHMuZXF1YWxzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZXF1YWxzJyk7XG5tb2R1bGUuZXhwb3J0cy5ldm9sdmUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9ldm9sdmUnKTtcbm1vZHVsZS5leHBvcnRzLmZpbHRlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ZpbHRlcicpO1xubW9kdWxlLmV4cG9ydHMuZmluZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ZpbmQnKTtcbm1vZHVsZS5leHBvcnRzLmZpbmRJbmRleCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ZpbmRJbmRleCcpO1xubW9kdWxlLmV4cG9ydHMuZmluZExhc3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9maW5kTGFzdCcpO1xubW9kdWxlLmV4cG9ydHMuZmluZExhc3RJbmRleCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ZpbmRMYXN0SW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzLmZsYXR0ZW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9mbGF0dGVuJyk7XG5tb2R1bGUuZXhwb3J0cy5mbGlwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZmxpcCcpO1xubW9kdWxlLmV4cG9ydHMuZm9yRWFjaCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ZvckVhY2gnKTtcbm1vZHVsZS5leHBvcnRzLmZvckVhY2hPYmpJbmRleGVkID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZm9yRWFjaE9iakluZGV4ZWQnKTtcbm1vZHVsZS5leHBvcnRzLmZyb21QYWlycyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2Zyb21QYWlycycpO1xubW9kdWxlLmV4cG9ydHMuZ3JvdXBCeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2dyb3VwQnknKTtcbm1vZHVsZS5leHBvcnRzLmdyb3VwV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2dyb3VwV2l0aCcpO1xubW9kdWxlLmV4cG9ydHMuZ3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9ndCcpO1xubW9kdWxlLmV4cG9ydHMuZ3RlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZ3RlJyk7XG5tb2R1bGUuZXhwb3J0cy5oYXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9oYXMnKTtcbm1vZHVsZS5leHBvcnRzLmhhc0luID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaGFzSW4nKTtcbm1vZHVsZS5leHBvcnRzLmhlYWQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9oZWFkJyk7XG5tb2R1bGUuZXhwb3J0cy5pZGVudGljYWwgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pZGVudGljYWwnKTtcbm1vZHVsZS5leHBvcnRzLmlkZW50aXR5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaWRlbnRpdHknKTtcbm1vZHVsZS5leHBvcnRzLmlmRWxzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2lmRWxzZScpO1xubW9kdWxlLmV4cG9ydHMuaW5jID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW5jJyk7XG5tb2R1bGUuZXhwb3J0cy5pbmRleEJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW5kZXhCeScpO1xubW9kdWxlLmV4cG9ydHMuaW5kZXhPZiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2luZGV4T2YnKTtcbm1vZHVsZS5leHBvcnRzLmluaXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbml0Jyk7XG5tb2R1bGUuZXhwb3J0cy5pbm5lckpvaW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbm5lckpvaW4nKTtcbm1vZHVsZS5leHBvcnRzLmluc2VydCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2luc2VydCcpO1xubW9kdWxlLmV4cG9ydHMuaW5zZXJ0QWxsID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW5zZXJ0QWxsJyk7XG5tb2R1bGUuZXhwb3J0cy5pbnRlcnNlY3Rpb24gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcnNlY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzLmludGVyc3BlcnNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJzcGVyc2UnKTtcbm1vZHVsZS5leHBvcnRzLmludG8gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRvJyk7XG5tb2R1bGUuZXhwb3J0cy5pbnZlcnQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnZlcnQnKTtcbm1vZHVsZS5leHBvcnRzLmludmVydE9iaiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludmVydE9iaicpO1xubW9kdWxlLmV4cG9ydHMuaW52b2tlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludm9rZXInKTtcbm1vZHVsZS5leHBvcnRzLmlzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaXMnKTtcbm1vZHVsZS5leHBvcnRzLmlzRW1wdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pc0VtcHR5Jyk7XG5tb2R1bGUuZXhwb3J0cy5pc05pbCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2lzTmlsJyk7XG5tb2R1bGUuZXhwb3J0cy5qb2luID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vam9pbicpO1xubW9kdWxlLmV4cG9ydHMuanV4dCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2p1eHQnKTtcbm1vZHVsZS5leHBvcnRzLmtleXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cy5rZXlzSW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9rZXlzSW4nKTtcbm1vZHVsZS5leHBvcnRzLmxhc3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9sYXN0Jyk7XG5tb2R1bGUuZXhwb3J0cy5sYXN0SW5kZXhPZiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2xhc3RJbmRleE9mJyk7XG5tb2R1bGUuZXhwb3J0cy5sZW5ndGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9sZW5ndGgnKTtcbm1vZHVsZS5leHBvcnRzLmxlbnMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9sZW5zJyk7XG5tb2R1bGUuZXhwb3J0cy5sZW5zSW5kZXggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9sZW5zSW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzLmxlbnNQYXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbGVuc1BhdGgnKTtcbm1vZHVsZS5leHBvcnRzLmxlbnNQcm9wID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbGVuc1Byb3AnKTtcbm1vZHVsZS5leHBvcnRzLmxpZnQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9saWZ0Jyk7XG5tb2R1bGUuZXhwb3J0cy5saWZ0TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2xpZnROJyk7XG5tb2R1bGUuZXhwb3J0cy5sdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2x0Jyk7XG5tb2R1bGUuZXhwb3J0cy5sdGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9sdGUnKTtcbm1vZHVsZS5leHBvcnRzLm1hcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21hcCcpO1xubW9kdWxlLmV4cG9ydHMubWFwQWNjdW0gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tYXBBY2N1bScpO1xubW9kdWxlLmV4cG9ydHMubWFwQWNjdW1SaWdodCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21hcEFjY3VtUmlnaHQnKTtcbm1vZHVsZS5leHBvcnRzLm1hcE9iakluZGV4ZWQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tYXBPYmpJbmRleGVkJyk7XG5tb2R1bGUuZXhwb3J0cy5tYXRjaCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21hdGNoJyk7XG5tb2R1bGUuZXhwb3J0cy5tYXRoTW9kID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWF0aE1vZCcpO1xubW9kdWxlLmV4cG9ydHMubWF4ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWF4Jyk7XG5tb2R1bGUuZXhwb3J0cy5tYXhCeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21heEJ5Jyk7XG5tb2R1bGUuZXhwb3J0cy5tZWFuID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWVhbicpO1xubW9kdWxlLmV4cG9ydHMubWVkaWFuID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWVkaWFuJyk7XG5tb2R1bGUuZXhwb3J0cy5tZW1vaXplID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWVtb2l6ZScpO1xubW9kdWxlLmV4cG9ydHMubWVtb2l6ZVdpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZW1vaXplV2l0aCcpO1xubW9kdWxlLmV4cG9ydHMubWVyZ2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZXJnZScpO1xubW9kdWxlLmV4cG9ydHMubWVyZ2VBbGwgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZXJnZUFsbCcpO1xubW9kdWxlLmV4cG9ydHMubWVyZ2VEZWVwTGVmdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21lcmdlRGVlcExlZnQnKTtcbm1vZHVsZS5leHBvcnRzLm1lcmdlRGVlcFJpZ2h0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWVyZ2VEZWVwUmlnaHQnKTtcbm1vZHVsZS5leHBvcnRzLm1lcmdlRGVlcFdpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZXJnZURlZXBXaXRoJyk7XG5tb2R1bGUuZXhwb3J0cy5tZXJnZURlZXBXaXRoS2V5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWVyZ2VEZWVwV2l0aEtleScpO1xubW9kdWxlLmV4cG9ydHMubWVyZ2VXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWVyZ2VXaXRoJyk7XG5tb2R1bGUuZXhwb3J0cy5tZXJnZVdpdGhLZXkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZXJnZVdpdGhLZXknKTtcbm1vZHVsZS5leHBvcnRzLm1pbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21pbicpO1xubW9kdWxlLmV4cG9ydHMubWluQnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9taW5CeScpO1xubW9kdWxlLmV4cG9ydHMubW9kdWxvID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbW9kdWxvJyk7XG5tb2R1bGUuZXhwb3J0cy5tdWx0aXBseSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL211bHRpcGx5Jyk7XG5tb2R1bGUuZXhwb3J0cy5uQXJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbkFyeScpO1xubW9kdWxlLmV4cG9ydHMubmVnYXRlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbmVnYXRlJyk7XG5tb2R1bGUuZXhwb3J0cy5ub25lID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbm9uZScpO1xubW9kdWxlLmV4cG9ydHMubm90ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbm90Jyk7XG5tb2R1bGUuZXhwb3J0cy5udGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9udGgnKTtcbm1vZHVsZS5leHBvcnRzLm50aEFyZyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL250aEFyZycpO1xubW9kdWxlLmV4cG9ydHMubyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL28nKTtcbm1vZHVsZS5leHBvcnRzLm9iak9mID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vb2JqT2YnKTtcbm1vZHVsZS5leHBvcnRzLm9mID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vb2YnKTtcbm1vZHVsZS5leHBvcnRzLm9taXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9vbWl0Jyk7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vb25jZScpO1xubW9kdWxlLmV4cG9ydHMub3IgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9vcicpO1xubW9kdWxlLmV4cG9ydHMub3ZlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL292ZXInKTtcbm1vZHVsZS5leHBvcnRzLnBhaXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wYWlyJyk7XG5tb2R1bGUuZXhwb3J0cy5wYXJ0aWFsID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGFydGlhbCcpO1xubW9kdWxlLmV4cG9ydHMucGFydGlhbFJpZ2h0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGFydGlhbFJpZ2h0Jyk7XG5tb2R1bGUuZXhwb3J0cy5wYXJ0aXRpb24gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wYXJ0aXRpb24nKTtcbm1vZHVsZS5leHBvcnRzLnBhdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wYXRoJyk7XG5tb2R1bGUuZXhwb3J0cy5wYXRoRXEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wYXRoRXEnKTtcbm1vZHVsZS5leHBvcnRzLnBhdGhPciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BhdGhPcicpO1xubW9kdWxlLmV4cG9ydHMucGF0aFNhdGlzZmllcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BhdGhTYXRpc2ZpZXMnKTtcbm1vZHVsZS5leHBvcnRzLnBpY2sgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9waWNrJyk7XG5tb2R1bGUuZXhwb3J0cy5waWNrQWxsID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGlja0FsbCcpO1xubW9kdWxlLmV4cG9ydHMucGlja0J5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGlja0J5Jyk7XG5tb2R1bGUuZXhwb3J0cy5waXBlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGlwZScpO1xubW9kdWxlLmV4cG9ydHMucGlwZUsgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9waXBlSycpO1xubW9kdWxlLmV4cG9ydHMucGlwZVAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9waXBlUCcpO1xubW9kdWxlLmV4cG9ydHMucGx1Y2sgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wbHVjaycpO1xubW9kdWxlLmV4cG9ydHMucHJlcGVuZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3ByZXBlbmQnKTtcbm1vZHVsZS5leHBvcnRzLnByb2R1Y3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wcm9kdWN0Jyk7XG5tb2R1bGUuZXhwb3J0cy5wcm9qZWN0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcHJvamVjdCcpO1xubW9kdWxlLmV4cG9ydHMucHJvcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3Byb3AnKTtcbm1vZHVsZS5leHBvcnRzLnByb3BFcSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3Byb3BFcScpO1xubW9kdWxlLmV4cG9ydHMucHJvcElzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcHJvcElzJyk7XG5tb2R1bGUuZXhwb3J0cy5wcm9wT3IgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wcm9wT3InKTtcbm1vZHVsZS5leHBvcnRzLnByb3BTYXRpc2ZpZXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wcm9wU2F0aXNmaWVzJyk7XG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3Byb3BzJyk7XG5tb2R1bGUuZXhwb3J0cy5yYW5nZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JhbmdlJyk7XG5tb2R1bGUuZXhwb3J0cy5yZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2UnKTtcbm1vZHVsZS5leHBvcnRzLnJlZHVjZUJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVkdWNlQnknKTtcbm1vZHVsZS5leHBvcnRzLnJlZHVjZVJpZ2h0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVkdWNlUmlnaHQnKTtcbm1vZHVsZS5leHBvcnRzLnJlZHVjZVdoaWxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVkdWNlV2hpbGUnKTtcbm1vZHVsZS5leHBvcnRzLnJlZHVjZWQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2VkJyk7XG5tb2R1bGUuZXhwb3J0cy5yZWplY3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWplY3QnKTtcbm1vZHVsZS5leHBvcnRzLnJlbW92ZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlbW92ZScpO1xubW9kdWxlLmV4cG9ydHMucmVwZWF0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVwZWF0Jyk7XG5tb2R1bGUuZXhwb3J0cy5yZXBsYWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVwbGFjZScpO1xubW9kdWxlLmV4cG9ydHMucmV2ZXJzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JldmVyc2UnKTtcbm1vZHVsZS5leHBvcnRzLnNjYW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zY2FuJyk7XG5tb2R1bGUuZXhwb3J0cy5zZXF1ZW5jZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3NlcXVlbmNlJyk7XG5tb2R1bGUuZXhwb3J0cy5zZXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zZXQnKTtcbm1vZHVsZS5leHBvcnRzLnNsaWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc2xpY2UnKTtcbm1vZHVsZS5leHBvcnRzLnNvcnQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zb3J0Jyk7XG5tb2R1bGUuZXhwb3J0cy5zb3J0QnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zb3J0QnknKTtcbm1vZHVsZS5leHBvcnRzLnNvcnRXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc29ydFdpdGgnKTtcbm1vZHVsZS5leHBvcnRzLnNwbGl0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc3BsaXQnKTtcbm1vZHVsZS5leHBvcnRzLnNwbGl0QXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zcGxpdEF0Jyk7XG5tb2R1bGUuZXhwb3J0cy5zcGxpdEV2ZXJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc3BsaXRFdmVyeScpO1xubW9kdWxlLmV4cG9ydHMuc3BsaXRXaGVuID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc3BsaXRXaGVuJyk7XG5tb2R1bGUuZXhwb3J0cy5zdGFydHNXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc3RhcnRzV2l0aCcpO1xubW9kdWxlLmV4cG9ydHMuc3VidHJhY3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zdWJ0cmFjdCcpO1xubW9kdWxlLmV4cG9ydHMuc3VtID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc3VtJyk7XG5tb2R1bGUuZXhwb3J0cy5zeW1tZXRyaWNEaWZmZXJlbmNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc3ltbWV0cmljRGlmZmVyZW5jZScpO1xubW9kdWxlLmV4cG9ydHMuc3ltbWV0cmljRGlmZmVyZW5jZVdpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zeW1tZXRyaWNEaWZmZXJlbmNlV2l0aCcpO1xubW9kdWxlLmV4cG9ydHMudGFpbCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RhaWwnKTtcbm1vZHVsZS5leHBvcnRzLnRha2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90YWtlJyk7XG5tb2R1bGUuZXhwb3J0cy50YWtlTGFzdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3Rha2VMYXN0Jyk7XG5tb2R1bGUuZXhwb3J0cy50YWtlTGFzdFdoaWxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdGFrZUxhc3RXaGlsZScpO1xubW9kdWxlLmV4cG9ydHMudGFrZVdoaWxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdGFrZVdoaWxlJyk7XG5tb2R1bGUuZXhwb3J0cy50YXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90YXAnKTtcbm1vZHVsZS5leHBvcnRzLnRlc3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90ZXN0Jyk7XG5tb2R1bGUuZXhwb3J0cy50aW1lcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RpbWVzJyk7XG5tb2R1bGUuZXhwb3J0cy50b0xvd2VyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdG9Mb3dlcicpO1xubW9kdWxlLmV4cG9ydHMudG9QYWlycyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RvUGFpcnMnKTtcbm1vZHVsZS5leHBvcnRzLnRvUGFpcnNJbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RvUGFpcnNJbicpO1xubW9kdWxlLmV4cG9ydHMudG9TdHJpbmcgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90b1N0cmluZycpO1xubW9kdWxlLmV4cG9ydHMudG9VcHBlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RvVXBwZXInKTtcbm1vZHVsZS5leHBvcnRzLnRyYW5zZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RyYW5zZHVjZScpO1xubW9kdWxlLmV4cG9ydHMudHJhbnNwb3NlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdHJhbnNwb3NlJyk7XG5tb2R1bGUuZXhwb3J0cy50cmF2ZXJzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RyYXZlcnNlJyk7XG5tb2R1bGUuZXhwb3J0cy50cmltID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdHJpbScpO1xubW9kdWxlLmV4cG9ydHMudHJ5Q2F0Y2ggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90cnlDYXRjaCcpO1xubW9kdWxlLmV4cG9ydHMudHlwZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3R5cGUnKTtcbm1vZHVsZS5leHBvcnRzLnVuYXBwbHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi91bmFwcGx5Jyk7XG5tb2R1bGUuZXhwb3J0cy51bmFyeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VuYXJ5Jyk7XG5tb2R1bGUuZXhwb3J0cy51bmN1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VuY3VycnlOJyk7XG5tb2R1bGUuZXhwb3J0cy51bmZvbGQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi91bmZvbGQnKTtcbm1vZHVsZS5leHBvcnRzLnVuaW9uID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdW5pb24nKTtcbm1vZHVsZS5leHBvcnRzLnVuaW9uV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VuaW9uV2l0aCcpO1xubW9kdWxlLmV4cG9ydHMudW5pcSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VuaXEnKTtcbm1vZHVsZS5leHBvcnRzLnVuaXFCeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VuaXFCeScpO1xubW9kdWxlLmV4cG9ydHMudW5pcVdpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi91bmlxV2l0aCcpO1xubW9kdWxlLmV4cG9ydHMudW5sZXNzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdW5sZXNzJyk7XG5tb2R1bGUuZXhwb3J0cy51bm5lc3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi91bm5lc3QnKTtcbm1vZHVsZS5leHBvcnRzLnVudGlsID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdW50aWwnKTtcbm1vZHVsZS5leHBvcnRzLnVwZGF0ZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VwZGF0ZScpO1xubW9kdWxlLmV4cG9ydHMudXNlV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VzZVdpdGgnKTtcbm1vZHVsZS5leHBvcnRzLnZhbHVlcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3ZhbHVlcycpO1xubW9kdWxlLmV4cG9ydHMudmFsdWVzSW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi92YWx1ZXNJbicpO1xubW9kdWxlLmV4cG9ydHMudmlldyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3ZpZXcnKTtcbm1vZHVsZS5leHBvcnRzLndoZW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi93aGVuJyk7XG5tb2R1bGUuZXhwb3J0cy53aGVyZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3doZXJlJyk7XG5tb2R1bGUuZXhwb3J0cy53aGVyZUVxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vd2hlcmVFcScpO1xubW9kdWxlLmV4cG9ydHMud2l0aG91dCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3dpdGhvdXQnKTtcbm1vZHVsZS5leHBvcnRzLnhwcm9kID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4veHByb2QnKTtcbm1vZHVsZS5leHBvcnRzLnppcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3ppcCcpO1xubW9kdWxlLmV4cG9ydHMuemlwT2JqID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vemlwT2JqJyk7XG5tb2R1bGUuZXhwb3J0cy56aXBXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vemlwV2l0aCcpOyIsInZhciByZWR1Y2VCeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlZHVjZUJ5Jyk7XG5cbi8qKlxuICogR2l2ZW4gYSBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyBhIGtleSwgdHVybnMgYSBsaXN0IG9mIG9iamVjdHMgaW50byBhblxuICogb2JqZWN0IGluZGV4aW5nIHRoZSBvYmplY3RzIGJ5IHRoZSBnaXZlbiBrZXkuIE5vdGUgdGhhdCBpZiBtdWx0aXBsZVxuICogb2JqZWN0cyBnZW5lcmF0ZSB0aGUgc2FtZSB2YWx1ZSBmb3IgdGhlIGluZGV4aW5nIGtleSBvbmx5IHRoZSBsYXN0IHZhbHVlXG4gKiB3aWxsIGJlIGluY2x1ZGVkIGluIHRoZSBnZW5lcmF0ZWQgb2JqZWN0LlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBTdHJpbmcpIC0+IFt7azogdn1dIC0+IHtrOiB7azogdn19XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiA6OiBhIC0+IFN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IG9mIG9iamVjdHMgdG8gaW5kZXhcbiAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IGluZGV4aW5nIGVhY2ggYXJyYXkgZWxlbWVudCBieSB0aGUgZ2l2ZW4gcHJvcGVydHkuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGxpc3QgPSBbe2lkOiAneHl6JywgdGl0bGU6ICdBJ30sIHtpZDogJ2FiYycsIHRpdGxlOiAnQid9XTtcbiAqICAgICAgUi5pbmRleEJ5KFIucHJvcCgnaWQnKSwgbGlzdCk7XG4gKiAgICAgIC8vPT4ge2FiYzoge2lkOiAnYWJjJywgdGl0bGU6ICdCJ30sIHh5ejoge2lkOiAneHl6JywgdGl0bGU6ICdBJ319XG4gKi9cblxuXG52YXIgaW5kZXhCeSA9IC8qI19fUFVSRV9fKi9yZWR1Y2VCeShmdW5jdGlvbiAoYWNjLCBlbGVtKSB7XG4gIHJldHVybiBlbGVtO1xufSwgbnVsbCk7XG5tb2R1bGUuZXhwb3J0cyA9IGluZGV4Qnk7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfaW5kZXhPZiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19pbmRleE9mJyk7XG5cbnZhciBfaXNBcnJheSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19pc0FycmF5Jyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYW4gaXRlbSBpbiBhbiBhcnJheSwgb3IgLTFcbiAqIGlmIHRoZSBpdGVtIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYXJyYXkuIFtgUi5lcXVhbHNgXSgjZXF1YWxzKSBpcyB1c2VkIHRvXG4gKiBkZXRlcm1pbmUgZXF1YWxpdHkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBhIC0+IFthXSAtPiBOdW1iZXJcbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSBpdGVtIHRvIGZpbmQuXG4gKiBAcGFyYW0ge0FycmF5fSB4cyBUaGUgYXJyYXkgdG8gc2VhcmNoIGluLlxuICogQHJldHVybiB7TnVtYmVyfSB0aGUgaW5kZXggb2YgdGhlIHRhcmdldCwgb3IgLTEgaWYgdGhlIHRhcmdldCBpcyBub3QgZm91bmQuXG4gKiBAc2VlIFIubGFzdEluZGV4T2ZcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmluZGV4T2YoMywgWzEsMiwzLDRdKTsgLy89PiAyXG4gKiAgICAgIFIuaW5kZXhPZigxMCwgWzEsMiwzLDRdKTsgLy89PiAtMVxuICovXG5cblxudmFyIGluZGV4T2YgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBpbmRleE9mKHRhcmdldCwgeHMpIHtcbiAgcmV0dXJuIHR5cGVvZiB4cy5pbmRleE9mID09PSAnZnVuY3Rpb24nICYmICFfaXNBcnJheSh4cykgPyB4cy5pbmRleE9mKHRhcmdldCkgOiBfaW5kZXhPZih4cywgdGFyZ2V0LCAwKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBpbmRleE9mOyIsInZhciBzbGljZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3NsaWNlJyk7XG5cbi8qKlxuICogUmV0dXJucyBhbGwgYnV0IHRoZSBsYXN0IGVsZW1lbnQgb2YgdGhlIGdpdmVuIGxpc3Qgb3Igc3RyaW5nLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXVxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIubGFzdCwgUi5oZWFkLCBSLnRhaWxcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmluaXQoWzEsIDIsIDNdKTsgIC8vPT4gWzEsIDJdXG4gKiAgICAgIFIuaW5pdChbMSwgMl0pOyAgICAgLy89PiBbMV1cbiAqICAgICAgUi5pbml0KFsxXSk7ICAgICAgICAvLz0+IFtdXG4gKiAgICAgIFIuaW5pdChbXSk7ICAgICAgICAgLy89PiBbXVxuICpcbiAqICAgICAgUi5pbml0KCdhYmMnKTsgIC8vPT4gJ2FiJ1xuICogICAgICBSLmluaXQoJ2FiJyk7ICAgLy89PiAnYSdcbiAqICAgICAgUi5pbml0KCdhJyk7ICAgIC8vPT4gJydcbiAqICAgICAgUi5pbml0KCcnKTsgICAgIC8vPT4gJydcbiAqL1xuXG5cbnZhciBpbml0ID0gLyojX19QVVJFX18qL3NsaWNlKDAsIC0xKTtcbm1vZHVsZS5leHBvcnRzID0gaW5pdDsiLCJ2YXIgX2NvbnRhaW5zV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb250YWluc1dpdGgnKTtcblxudmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBfZmlsdGVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2ZpbHRlcicpO1xuXG4vKipcbiAqIFRha2VzIGEgcHJlZGljYXRlIGBwcmVkYCwgYSBsaXN0IGB4c2AsIGFuZCBhIGxpc3QgYHlzYCwgYW5kIHJldHVybnMgYSBsaXN0XG4gKiBgeHMnYCBjb21wcmlzaW5nIGVhY2ggb2YgdGhlIGVsZW1lbnRzIG9mIGB4c2Agd2hpY2ggaXMgZXF1YWwgdG8gb25lIG9yIG1vcmVcbiAqIGVsZW1lbnRzIG9mIGB5c2AgYWNjb3JkaW5nIHRvIGBwcmVkYC5cbiAqXG4gKiBgcHJlZGAgbXVzdCBiZSBhIGJpbmFyeSBmdW5jdGlvbiBleHBlY3RpbmcgYW4gZWxlbWVudCBmcm9tIGVhY2ggbGlzdC5cbiAqXG4gKiBgeHNgLCBgeXNgLCBhbmQgYHhzJ2AgYXJlIHRyZWF0ZWQgYXMgc2V0cywgc2VtYW50aWNhbGx5LCBzbyBvcmRlcmluZyBzaG91bGRcbiAqIG5vdCBiZSBzaWduaWZpY2FudCwgYnV0IHNpbmNlIGB4cydgIGlzIG9yZGVyZWQgdGhlIGltcGxlbWVudGF0aW9uIGd1YXJhbnRlZXNcbiAqIHRoYXQgaXRzIHZhbHVlcyBhcmUgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhleSBhcHBlYXIgaW4gYHhzYC4gRHVwbGljYXRlcyBhcmVcbiAqIG5vdCByZW1vdmVkLCBzbyBgeHMnYCBtYXkgY29udGFpbiBkdXBsaWNhdGVzIGlmIGB4c2AgY29udGFpbnMgZHVwbGljYXRlcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yNC4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgKChhLCBiKSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2JdIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZFxuICogQHBhcmFtIHtBcnJheX0geHNcbiAqIEBwYXJhbSB7QXJyYXl9IHlzXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBzZWUgUi5pbnRlcnNlY3Rpb25cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmlubmVySm9pbihcbiAqICAgICAgICAocmVjb3JkLCBpZCkgPT4gcmVjb3JkLmlkID09PSBpZCxcbiAqICAgICAgICBbe2lkOiA4MjQsIG5hbWU6ICdSaWNoaWUgRnVyYXknfSxcbiAqICAgICAgICAge2lkOiA5NTYsIG5hbWU6ICdEZXdleSBNYXJ0aW4nfSxcbiAqICAgICAgICAge2lkOiAzMTMsIG5hbWU6ICdCcnVjZSBQYWxtZXInfSxcbiAqICAgICAgICAge2lkOiA0NTYsIG5hbWU6ICdTdGVwaGVuIFN0aWxscyd9LFxuICogICAgICAgICB7aWQ6IDE3NywgbmFtZTogJ05laWwgWW91bmcnfV0sXG4gKiAgICAgICAgWzE3NywgNDU2LCA5OTldXG4gKiAgICAgICk7XG4gKiAgICAgIC8vPT4gW3tpZDogNDU2LCBuYW1lOiAnU3RlcGhlbiBTdGlsbHMnfSwge2lkOiAxNzcsIG5hbWU6ICdOZWlsIFlvdW5nJ31dXG4gKi9cblxuXG52YXIgaW5uZXJKb2luID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gaW5uZXJKb2luKHByZWQsIHhzLCB5cykge1xuICByZXR1cm4gX2ZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBfY29udGFpbnNXaXRoKHByZWQsIHgsIHlzKTtcbiAgfSwgeHMpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGlubmVySm9pbjsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBJbnNlcnRzIHRoZSBzdXBwbGllZCBlbGVtZW50IGludG8gdGhlIGxpc3QsIGF0IHRoZSBzcGVjaWZpZWQgYGluZGV4YC4gX05vdGUgdGhhdFxuXG4gKiB0aGlzIGlzIG5vdCBkZXN0cnVjdGl2ZV86IGl0IHJldHVybnMgYSBjb3B5IG9mIHRoZSBsaXN0IHdpdGggdGhlIGNoYW5nZXMuXG4gKiA8c21hbGw+Tm8gbGlzdHMgaGF2ZSBiZWVuIGhhcm1lZCBpbiB0aGUgYXBwbGljYXRpb24gb2YgdGhpcyBmdW5jdGlvbi48L3NtYWxsPlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIuMlxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IGEgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBwb3NpdGlvbiB0byBpbnNlcnQgdGhlIGVsZW1lbnRcbiAqIEBwYXJhbSB7Kn0gZWx0IFRoZSBlbGVtZW50IHRvIGluc2VydCBpbnRvIHRoZSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpbnNlcnQgaW50b1xuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IEFycmF5IHdpdGggYGVsdGAgaW5zZXJ0ZWQgYXQgYGluZGV4YC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmluc2VydCgyLCAneCcsIFsxLDIsMyw0XSk7IC8vPT4gWzEsMiwneCcsMyw0XVxuICovXG5cblxudmFyIGluc2VydCA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIGluc2VydChpZHgsIGVsdCwgbGlzdCkge1xuICBpZHggPSBpZHggPCBsaXN0Lmxlbmd0aCAmJiBpZHggPj0gMCA/IGlkeCA6IGxpc3QubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgMCk7XG4gIHJlc3VsdC5zcGxpY2UoaWR4LCAwLCBlbHQpO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydDsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBJbnNlcnRzIHRoZSBzdWItbGlzdCBpbnRvIHRoZSBsaXN0LCBhdCB0aGUgc3BlY2lmaWVkIGBpbmRleGAuIF9Ob3RlIHRoYXQgdGhpcyBpcyBub3RcbiAqIGRlc3RydWN0aXZlXzogaXQgcmV0dXJucyBhIGNvcHkgb2YgdGhlIGxpc3Qgd2l0aCB0aGUgY2hhbmdlcy5cbiAqIDxzbWFsbD5ObyBsaXN0cyBoYXZlIGJlZW4gaGFybWVkIGluIHRoZSBhcHBsaWNhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uLjwvc21hbGw+XG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gW2FdIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgcG9zaXRpb24gdG8gaW5zZXJ0IHRoZSBzdWItbGlzdFxuICogQHBhcmFtIHtBcnJheX0gZWx0cyBUaGUgc3ViLWxpc3QgdG8gaW5zZXJ0IGludG8gdGhlIEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGluc2VydCB0aGUgc3ViLWxpc3QgaW50b1xuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IEFycmF5IHdpdGggYGVsdHNgIGluc2VydGVkIHN0YXJ0aW5nIGF0IGBpbmRleGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5pbnNlcnRBbGwoMiwgWyd4JywneScsJ3onXSwgWzEsMiwzLDRdKTsgLy89PiBbMSwyLCd4JywneScsJ3onLDMsNF1cbiAqL1xuXG5cbnZhciBpbnNlcnRBbGwgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBpbnNlcnRBbGwoaWR4LCBlbHRzLCBsaXN0KSB7XG4gIGlkeCA9IGlkeCA8IGxpc3QubGVuZ3RoICYmIGlkeCA+PSAwID8gaWR4IDogbGlzdC5sZW5ndGg7XG4gIHJldHVybiBbXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgMCwgaWR4KSwgZWx0cywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgaWR4KSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QWxsOyIsInZhciBfY29udGFpbnMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY29udGFpbnMnKTtcblxudmFyIF9TZXQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIF9TZXQoKSB7XG4gICAgLyogZ2xvYmFscyBTZXQgKi9cbiAgICB0aGlzLl9uYXRpdmVTZXQgPSB0eXBlb2YgU2V0ID09PSAnZnVuY3Rpb24nID8gbmV3IFNldCgpIDogbnVsbDtcbiAgICB0aGlzLl9pdGVtcyA9IHt9O1xuICB9XG5cbiAgLy8gdW50aWwgd2UgZmlndXJlIG91dCB3aHkganNkb2MgY2hva2VzIG9uIHRoaXNcbiAgLy8gQHBhcmFtIGl0ZW0gVGhlIGl0ZW0gdG8gYWRkIHRvIHRoZSBTZXRcbiAgLy8gQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIGl0ZW0gZGlkIG5vdCBleGlzdCBwcmlvciwgb3RoZXJ3aXNlIGZhbHNlXG4gIC8vXG4gIF9TZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuICFoYXNPckFkZChpdGVtLCB0cnVlLCB0aGlzKTtcbiAgfTtcblxuICAvL1xuICAvLyBAcGFyYW0gaXRlbSBUaGUgaXRlbSB0byBjaGVjayBmb3IgZXhpc3RlbmNlIGluIHRoZSBTZXRcbiAgLy8gQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIGl0ZW0gZXhpc3RzIGluIHRoZSBTZXQsIG90aGVyd2lzZSBmYWxzZVxuICAvL1xuICBfU2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiBoYXNPckFkZChpdGVtLCBmYWxzZSwgdGhpcyk7XG4gIH07XG5cbiAgLy9cbiAgLy8gQ29tYmluZXMgdGhlIGxvZ2ljIGZvciBjaGVja2luZyB3aGV0aGVyIGFuIGl0ZW0gaXMgYSBtZW1iZXIgb2YgdGhlIHNldCBhbmRcbiAgLy8gZm9yIGFkZGluZyBhIG5ldyBpdGVtIHRvIHRoZSBzZXQuXG4gIC8vXG4gIC8vIEBwYXJhbSBpdGVtICAgICAgIFRoZSBpdGVtIHRvIGNoZWNrIG9yIGFkZCB0byB0aGUgU2V0IGluc3RhbmNlLlxuICAvLyBAcGFyYW0gc2hvdWxkQWRkICBJZiB0cnVlLCB0aGUgaXRlbSB3aWxsIGJlIGFkZGVkIHRvIHRoZSBzZXQgaWYgaXQgZG9lc24ndFxuICAvLyAgICAgICAgICAgICAgICAgICBhbHJlYWR5IGV4aXN0LlxuICAvLyBAcGFyYW0gc2V0ICAgICAgICBUaGUgc2V0IGluc3RhbmNlIHRvIGNoZWNrIG9yIGFkZCB0by5cbiAgLy8gQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgaXRlbSBhbHJlYWR5IGV4aXN0ZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgLy9cbiAgcmV0dXJuIF9TZXQ7XG59KCk7XG5cbmZ1bmN0aW9uIGhhc09yQWRkKGl0ZW0sIHNob3VsZEFkZCwgc2V0KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGl0ZW07XG4gIHZhciBwcmV2U2l6ZSwgbmV3U2l6ZTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgLy8gZGlzdGluZ3Vpc2ggYmV0d2VlbiArMCBhbmQgLTBcbiAgICAgIGlmIChpdGVtID09PSAwICYmIDEgLyBpdGVtID09PSAtSW5maW5pdHkpIHtcbiAgICAgICAgaWYgKHNldC5faXRlbXNbJy0wJ10pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2hvdWxkQWRkKSB7XG4gICAgICAgICAgICBzZXQuX2l0ZW1zWyctMCddID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyB0aGVzZSB0eXBlcyBjYW4gYWxsIHV0aWxpc2UgdGhlIG5hdGl2ZSBTZXRcbiAgICAgIGlmIChzZXQuX25hdGl2ZVNldCAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoc2hvdWxkQWRkKSB7XG4gICAgICAgICAgcHJldlNpemUgPSBzZXQuX25hdGl2ZVNldC5zaXplO1xuICAgICAgICAgIHNldC5fbmF0aXZlU2V0LmFkZChpdGVtKTtcbiAgICAgICAgICBuZXdTaXplID0gc2V0Ll9uYXRpdmVTZXQuc2l6ZTtcbiAgICAgICAgICByZXR1cm4gbmV3U2l6ZSA9PT0gcHJldlNpemU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHNldC5fbmF0aXZlU2V0LmhhcyhpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCEodHlwZSBpbiBzZXQuX2l0ZW1zKSkge1xuICAgICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgIHNldC5faXRlbXNbdHlwZV0gPSB7fTtcbiAgICAgICAgICAgIHNldC5faXRlbXNbdHlwZV1baXRlbV0gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbSBpbiBzZXQuX2l0ZW1zW3R5cGVdKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNob3VsZEFkZCkge1xuICAgICAgICAgICAgc2V0Ll9pdGVtc1t0eXBlXVtpdGVtXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAvLyBzZXQuX2l0ZW1zWydib29sZWFuJ10gaG9sZHMgYSB0d28gZWxlbWVudCBhcnJheVxuICAgICAgLy8gcmVwcmVzZW50aW5nIFsgZmFsc2VFeGlzdHMsIHRydWVFeGlzdHMgXVxuICAgICAgaWYgKHR5cGUgaW4gc2V0Ll9pdGVtcykge1xuICAgICAgICB2YXIgYklkeCA9IGl0ZW0gPyAxIDogMDtcbiAgICAgICAgaWYgKHNldC5faXRlbXNbdHlwZV1bYklkeF0pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2hvdWxkQWRkKSB7XG4gICAgICAgICAgICBzZXQuX2l0ZW1zW3R5cGVdW2JJZHhdID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2hvdWxkQWRkKSB7XG4gICAgICAgICAgc2V0Ll9pdGVtc1t0eXBlXSA9IGl0ZW0gPyBbZmFsc2UsIHRydWVdIDogW3RydWUsIGZhbHNlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAvLyBjb21wYXJlIGZ1bmN0aW9ucyBmb3IgcmVmZXJlbmNlIGVxdWFsaXR5XG4gICAgICBpZiAoc2V0Ll9uYXRpdmVTZXQgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKHNob3VsZEFkZCkge1xuICAgICAgICAgIHByZXZTaXplID0gc2V0Ll9uYXRpdmVTZXQuc2l6ZTtcbiAgICAgICAgICBzZXQuX25hdGl2ZVNldC5hZGQoaXRlbSk7XG4gICAgICAgICAgbmV3U2l6ZSA9IHNldC5fbmF0aXZlU2V0LnNpemU7XG4gICAgICAgICAgcmV0dXJuIG5ld1NpemUgPT09IHByZXZTaXplO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBzZXQuX25hdGl2ZVNldC5oYXMoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghKHR5cGUgaW4gc2V0Ll9pdGVtcykpIHtcbiAgICAgICAgICBpZiAoc2hvdWxkQWRkKSB7XG4gICAgICAgICAgICBzZXQuX2l0ZW1zW3R5cGVdID0gW2l0ZW1dO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFfY29udGFpbnMoaXRlbSwgc2V0Ll9pdGVtc1t0eXBlXSkpIHtcbiAgICAgICAgICBpZiAoc2hvdWxkQWRkKSB7XG4gICAgICAgICAgICBzZXQuX2l0ZW1zW3R5cGVdLnB1c2goaXRlbSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICBpZiAoc2V0Ll9pdGVtc1t0eXBlXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICBzZXQuX2l0ZW1zW3R5cGVdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgaWYgKCFzZXQuX2l0ZW1zWydudWxsJ10pIHtcbiAgICAgICAgICBpZiAoc2hvdWxkQWRkKSB7XG4gICAgICAgICAgICBzZXQuX2l0ZW1zWydudWxsJ10gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgIGRlZmF1bHQ6XG4gICAgICAvLyByZWR1Y2UgdGhlIHNlYXJjaCBzaXplIG9mIGhldGVyb2dlbmVvdXMgc2V0cyBieSBjcmVhdGluZyBidWNrZXRzXG4gICAgICAvLyBmb3IgZWFjaCB0eXBlLlxuICAgICAgdHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVtKTtcbiAgICAgIGlmICghKHR5cGUgaW4gc2V0Ll9pdGVtcykpIHtcbiAgICAgICAgaWYgKHNob3VsZEFkZCkge1xuICAgICAgICAgIHNldC5faXRlbXNbdHlwZV0gPSBbaXRlbV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gc2NhbiB0aHJvdWdoIGFsbCBwcmV2aW91c2x5IGFwcGxpZWQgaXRlbXNcbiAgICAgIGlmICghX2NvbnRhaW5zKGl0ZW0sIHNldC5faXRlbXNbdHlwZV0pKSB7XG4gICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICBzZXQuX2l0ZW1zW3R5cGVdLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuLy8gQSBzaW1wbGUgU2V0IHR5cGUgdGhhdCBob25vdXJzIFIuZXF1YWxzIHNlbWFudGljc1xubW9kdWxlLmV4cG9ydHMgPSBfU2V0OyIsImZ1bmN0aW9uIF9hcGVydHVyZShuLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGltaXQgPSBsaXN0Lmxlbmd0aCAtIChuIC0gMSk7XG4gIHZhciBhY2MgPSBuZXcgQXJyYXkobGltaXQgPj0gMCA/IGxpbWl0IDogMCk7XG4gIHdoaWxlIChpZHggPCBsaW1pdCkge1xuICAgIGFjY1tpZHhdID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgaWR4LCBpZHggKyBuKTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gYWNjO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfYXBlcnR1cmU7IiwiZnVuY3Rpb24gX2FyaXR5KG4sIGZuKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4gIHN3aXRjaCAobikge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSA2OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDc6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDg6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNykge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSA5OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDEwOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gX2FyaXR5IG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciBubyBncmVhdGVyIHRoYW4gdGVuJyk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gX2FyaXR5OyIsImZ1bmN0aW9uIF9hcnJheUZyb21JdGVyYXRvcihpdGVyKSB7XG4gIHZhciBsaXN0ID0gW107XG4gIHZhciBuZXh0O1xuICB3aGlsZSAoIShuZXh0ID0gaXRlci5uZXh0KCkpLmRvbmUpIHtcbiAgICBsaXN0LnB1c2gobmV4dC52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheUZyb21JdGVyYXRvcjsiLCJ2YXIgX29iamVjdEFzc2lnbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19vYmplY3RBc3NpZ24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PT0gJ2Z1bmN0aW9uJyA/IE9iamVjdC5hc3NpZ24gOiBfb2JqZWN0QXNzaWduOyIsInZhciBfaXNBcnJheSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc0FycmF5Jyk7XG5cbi8qKlxuICogVGhpcyBjaGVja3Mgd2hldGhlciBhIGZ1bmN0aW9uIGhhcyBhIFttZXRob2RuYW1lXSBmdW5jdGlvbi4gSWYgaXQgaXNuJ3QgYW5cbiAqIGFycmF5IGl0IHdpbGwgZXhlY3V0ZSB0aGF0IGZ1bmN0aW9uIG90aGVyd2lzZSBpdCB3aWxsIGRlZmF1bHQgdG8gdGhlIHJhbWRhXG4gKiBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gcmFtZGEgaW1wbGVtdGF0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kbmFtZSBwcm9wZXJ0eSB0byBjaGVjayBmb3IgYSBjdXN0b20gaW1wbGVtZW50YXRpb25cbiAqIEByZXR1cm4ge09iamVjdH0gV2hhdGV2ZXIgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgbWV0aG9kIGlzLlxuICovXG5cblxuZnVuY3Rpb24gX2NoZWNrRm9yTWV0aG9kKG1ldGhvZG5hbWUsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuICAgIHZhciBvYmogPSBhcmd1bWVudHNbbGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIF9pc0FycmF5KG9iaikgfHwgdHlwZW9mIG9ialttZXRob2RuYW1lXSAhPT0gJ2Z1bmN0aW9uJyA/IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBvYmpbbWV0aG9kbmFtZV0uYXBwbHkob2JqLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIGxlbmd0aCAtIDEpKTtcbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2NoZWNrRm9yTWV0aG9kOyIsInZhciBfY2xvbmVSZWdFeHAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY2xvbmVSZWdFeHAnKTtcblxudmFyIHR5cGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi4vdHlwZScpO1xuXG4vKipcbiAqIENvcGllcyBhbiBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGJlIGNvcGllZFxuICogQHBhcmFtIHtBcnJheX0gcmVmRnJvbSBBcnJheSBjb250YWluaW5nIHRoZSBzb3VyY2UgcmVmZXJlbmNlc1xuICogQHBhcmFtIHtBcnJheX0gcmVmVG8gQXJyYXkgY29udGFpbmluZyB0aGUgY29waWVkIHNvdXJjZSByZWZlcmVuY2VzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGRlZXAgV2hldGhlciBvciBub3QgdG8gcGVyZm9ybSBkZWVwIGNsb25pbmcuXG4gKiBAcmV0dXJuIHsqfSBUaGUgY29waWVkIHZhbHVlLlxuICovXG5cblxuZnVuY3Rpb24gX2Nsb25lKHZhbHVlLCByZWZGcm9tLCByZWZUbywgZGVlcCkge1xuICB2YXIgY29weSA9IGZ1bmN0aW9uIGNvcHkoY29waWVkVmFsdWUpIHtcbiAgICB2YXIgbGVuID0gcmVmRnJvbS5sZW5ndGg7XG4gICAgdmFyIGlkeCA9IDA7XG4gICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgaWYgKHZhbHVlID09PSByZWZGcm9tW2lkeF0pIHtcbiAgICAgICAgcmV0dXJuIHJlZlRvW2lkeF07XG4gICAgICB9XG4gICAgICBpZHggKz0gMTtcbiAgICB9XG4gICAgcmVmRnJvbVtpZHggKyAxXSA9IHZhbHVlO1xuICAgIHJlZlRvW2lkeCArIDFdID0gY29waWVkVmFsdWU7XG4gICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICBjb3BpZWRWYWx1ZVtrZXldID0gZGVlcCA/IF9jbG9uZSh2YWx1ZVtrZXldLCByZWZGcm9tLCByZWZUbywgdHJ1ZSkgOiB2YWx1ZVtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gY29waWVkVmFsdWU7XG4gIH07XG4gIHN3aXRjaCAodHlwZSh2YWx1ZSkpIHtcbiAgICBjYXNlICdPYmplY3QnOlxuICAgICAgcmV0dXJuIGNvcHkoe30pO1xuICAgIGNhc2UgJ0FycmF5JzpcbiAgICAgIHJldHVybiBjb3B5KFtdKTtcbiAgICBjYXNlICdEYXRlJzpcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZS52YWx1ZU9mKCkpO1xuICAgIGNhc2UgJ1JlZ0V4cCc6XG4gICAgICByZXR1cm4gX2Nsb25lUmVnRXhwKHZhbHVlKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9jbG9uZTsiLCJmdW5jdGlvbiBfY2xvbmVSZWdFeHAocGF0dGVybikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKHBhdHRlcm4uc291cmNlLCAocGF0dGVybi5nbG9iYWwgPyAnZycgOiAnJykgKyAocGF0dGVybi5pZ25vcmVDYXNlID8gJ2knIDogJycpICsgKHBhdHRlcm4ubXVsdGlsaW5lID8gJ20nIDogJycpICsgKHBhdHRlcm4uc3RpY2t5ID8gJ3knIDogJycpICsgKHBhdHRlcm4udW5pY29kZSA/ICd1JyA6ICcnKSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9jbG9uZVJlZ0V4cDsiLCJmdW5jdGlvbiBfY29tcGxlbWVudChmKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICFmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9jb21wbGVtZW50OyIsIi8qKlxuICogUHJpdmF0ZSBgY29uY2F0YCBmdW5jdGlvbiB0byBtZXJnZSB0d28gYXJyYXktbGlrZSBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fEFyZ3VtZW50c30gW3NldDE9W11dIEFuIGFycmF5LWxpa2Ugb2JqZWN0LlxuICogQHBhcmFtIHtBcnJheXxBcmd1bWVudHN9IFtzZXQyPVtdXSBBbiBhcnJheS1saWtlIG9iamVjdC5cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldywgbWVyZ2VkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIF9jb25jYXQoWzQsIDUsIDZdLCBbMSwgMiwgM10pOyAvLz0+IFs0LCA1LCA2LCAxLCAyLCAzXVxuICovXG5mdW5jdGlvbiBfY29uY2F0KHNldDEsIHNldDIpIHtcbiAgc2V0MSA9IHNldDEgfHwgW107XG4gIHNldDIgPSBzZXQyIHx8IFtdO1xuICB2YXIgaWR4O1xuICB2YXIgbGVuMSA9IHNldDEubGVuZ3RoO1xuICB2YXIgbGVuMiA9IHNldDIubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IGxlbjEpIHtcbiAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBzZXQxW2lkeF07XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IGxlbjIpIHtcbiAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBzZXQyW2lkeF07XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2NvbmNhdDsiLCJ2YXIgX2luZGV4T2YgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faW5kZXhPZicpO1xuXG5mdW5jdGlvbiBfY29udGFpbnMoYSwgbGlzdCkge1xuICByZXR1cm4gX2luZGV4T2YobGlzdCwgYSwgMCkgPj0gMDtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2NvbnRhaW5zOyIsImZ1bmN0aW9uIF9jb250YWluc1dpdGgocHJlZCwgeCwgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuXG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBpZiAocHJlZCh4LCBsaXN0W2lkeF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY29udGFpbnNXaXRoOyIsInZhciBfYXJpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fYXJpdHknKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkyJyk7XG5cbmZ1bmN0aW9uIF9jcmVhdGVQYXJ0aWFsQXBwbGljYXRvcihjb25jYXQpIHtcbiAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gKGZuLCBhcmdzKSB7XG4gICAgcmV0dXJuIF9hcml0eShNYXRoLm1heCgwLCBmbi5sZW5ndGggLSBhcmdzLmxlbmd0aCksIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBjb25jYXQoYXJncywgYXJndW1lbnRzKSk7XG4gICAgfSk7XG4gIH0pO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlUGFydGlhbEFwcGxpY2F0b3I7IiwidmFyIF9pc1BsYWNlaG9sZGVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuLyoqXG4gKiBPcHRpbWl6ZWQgaW50ZXJuYWwgb25lLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xuXG5cbmZ1bmN0aW9uIF9jdXJyeTEoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKGEpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCBfaXNQbGFjZWhvbGRlcihhKSkge1xuICAgICAgcmV0dXJuIGYxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTE7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkxJyk7XG5cbnZhciBfaXNQbGFjZWhvbGRlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc1BsYWNlaG9sZGVyJyk7XG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIHR3by1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBfY3VycnkyKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMihhLCBiKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBmMjtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpID8gZjIgOiBfY3VycnkxKGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgIHJldHVybiBmbihhLCBfYik7XG4gICAgICAgIH0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpID8gZjIgOiBfaXNQbGFjZWhvbGRlcihhKSA/IF9jdXJyeTEoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKF9hLCBiKTtcbiAgICAgICAgfSkgOiBfaXNQbGFjZWhvbGRlcihiKSA/IF9jdXJyeTEoZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKGEsIF9iKTtcbiAgICAgICAgfSkgOiBmbihhLCBiKTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTI7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkxJyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX2lzUGxhY2Vob2xkZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faXNQbGFjZWhvbGRlcicpO1xuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCB0aHJlZS1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBfY3VycnkzKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMyhhLCBiLCBjKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBmMztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpID8gZjMgOiBfY3VycnkyKGZ1bmN0aW9uIChfYiwgX2MpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgX2IsIF9jKTtcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSA/IGYzIDogX2lzUGxhY2Vob2xkZXIoYSkgPyBfY3VycnkyKGZ1bmN0aW9uIChfYSwgX2MpIHtcbiAgICAgICAgICByZXR1cm4gZm4oX2EsIGIsIF9jKTtcbiAgICAgICAgfSkgOiBfaXNQbGFjZWhvbGRlcihiKSA/IF9jdXJyeTIoZnVuY3Rpb24gKF9iLCBfYykge1xuICAgICAgICAgIHJldHVybiBmbihhLCBfYiwgX2MpO1xuICAgICAgICB9KSA6IF9jdXJyeTEoZnVuY3Rpb24gKF9jKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKGEsIGIsIF9jKTtcbiAgICAgICAgfSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYikgJiYgX2lzUGxhY2Vob2xkZXIoYykgPyBmMyA6IF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MihmdW5jdGlvbiAoX2EsIF9iKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKF9hLCBfYiwgYyk7XG4gICAgICAgIH0pIDogX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYykgPyBfY3VycnkyKGZ1bmN0aW9uIChfYSwgX2MpIHtcbiAgICAgICAgICByZXR1cm4gZm4oX2EsIGIsIF9jKTtcbiAgICAgICAgfSkgOiBfaXNQbGFjZWhvbGRlcihiKSAmJiBfaXNQbGFjZWhvbGRlcihjKSA/IF9jdXJyeTIoZnVuY3Rpb24gKF9iLCBfYykge1xuICAgICAgICAgIHJldHVybiBmbihhLCBfYiwgX2MpO1xuICAgICAgICB9KSA6IF9pc1BsYWNlaG9sZGVyKGEpID8gX2N1cnJ5MShmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICByZXR1cm4gZm4oX2EsIGIsIGMpO1xuICAgICAgICB9KSA6IF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MShmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgX2IsIGMpO1xuICAgICAgICB9KSA6IF9pc1BsYWNlaG9sZGVyKGMpID8gX2N1cnJ5MShmdW5jdGlvbiAoX2MpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgYiwgX2MpO1xuICAgICAgICB9KSA6IGZuKGEsIGIsIGMpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MzsiLCJ2YXIgX2FyaXR5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2FyaXR5Jyk7XG5cbnZhciBfaXNQbGFjZWhvbGRlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc1BsYWNlaG9sZGVyJyk7XG5cbi8qKlxuICogSW50ZXJuYWwgY3VycnlOIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggVGhlIGFyaXR5IG9mIHRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtBcnJheX0gcmVjZWl2ZWQgQW4gYXJyYXkgb2YgYXJndW1lbnRzIHJlY2VpdmVkIHRodXMgZmFyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5cblxuZnVuY3Rpb24gX2N1cnJ5TihsZW5ndGgsIHJlY2VpdmVkLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb21iaW5lZCA9IFtdO1xuICAgIHZhciBhcmdzSWR4ID0gMDtcbiAgICB2YXIgbGVmdCA9IGxlbmd0aDtcbiAgICB2YXIgY29tYmluZWRJZHggPSAwO1xuICAgIHdoaWxlIChjb21iaW5lZElkeCA8IHJlY2VpdmVkLmxlbmd0aCB8fCBhcmdzSWR4IDwgYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdmFyIHJlc3VsdDtcbiAgICAgIGlmIChjb21iaW5lZElkeCA8IHJlY2VpdmVkLmxlbmd0aCAmJiAoIV9pc1BsYWNlaG9sZGVyKHJlY2VpdmVkW2NvbWJpbmVkSWR4XSkgfHwgYXJnc0lkeCA+PSBhcmd1bWVudHMubGVuZ3RoKSkge1xuICAgICAgICByZXN1bHQgPSByZWNlaXZlZFtjb21iaW5lZElkeF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBhcmd1bWVudHNbYXJnc0lkeF07XG4gICAgICAgIGFyZ3NJZHggKz0gMTtcbiAgICAgIH1cbiAgICAgIGNvbWJpbmVkW2NvbWJpbmVkSWR4XSA9IHJlc3VsdDtcbiAgICAgIGlmICghX2lzUGxhY2Vob2xkZXIocmVzdWx0KSkge1xuICAgICAgICBsZWZ0IC09IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZElkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbGVmdCA8PSAwID8gZm4uYXBwbHkodGhpcywgY29tYmluZWQpIDogX2FyaXR5KGxlZnQsIF9jdXJyeU4obGVuZ3RoLCBjb21iaW5lZCwgZm4pKTtcbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5TjsiLCJ2YXIgX2lzQXJyYXkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faXNBcnJheScpO1xuXG52YXIgX2lzVHJhbnNmb3JtZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faXNUcmFuc2Zvcm1lcicpO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGRpc3BhdGNoZXMgd2l0aCBkaWZmZXJlbnQgc3RyYXRlZ2llcyBiYXNlZCBvbiB0aGVcbiAqIG9iamVjdCBpbiBsaXN0IHBvc2l0aW9uIChsYXN0IGFyZ3VtZW50KS4gSWYgaXQgaXMgYW4gYXJyYXksIGV4ZWN1dGVzIFtmbl0uXG4gKiBPdGhlcndpc2UsIGlmIGl0IGhhcyBhIGZ1bmN0aW9uIHdpdGggb25lIG9mIHRoZSBnaXZlbiBtZXRob2QgbmFtZXMsIGl0IHdpbGxcbiAqIGV4ZWN1dGUgdGhhdCBmdW5jdGlvbiAoZnVuY3RvciBjYXNlKS4gT3RoZXJ3aXNlLCBpZiBpdCBpcyBhIHRyYW5zZm9ybWVyLFxuICogdXNlcyB0cmFuc2R1Y2VyIFt4Zl0gdG8gcmV0dXJuIGEgbmV3IHRyYW5zZm9ybWVyICh0cmFuc2R1Y2VyIGNhc2UpLlxuICogT3RoZXJ3aXNlLCBpdCB3aWxsIGRlZmF1bHQgdG8gZXhlY3V0aW5nIFtmbl0uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IG1ldGhvZE5hbWVzIHByb3BlcnRpZXMgdG8gY2hlY2sgZm9yIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB4ZiB0cmFuc2R1Y2VyIHRvIGluaXRpYWxpemUgaWYgb2JqZWN0IGlzIHRyYW5zZm9ybWVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBkZWZhdWx0IHJhbWRhIGltcGxlbWVudGF0aW9uXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGRpc3BhdGNoZXMgb24gb2JqZWN0IGluIGxpc3QgcG9zaXRpb25cbiAqL1xuXG5cbmZ1bmN0aW9uIF9kaXNwYXRjaGFibGUobWV0aG9kTmFtZXMsIHhmLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZm4oKTtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIHZhciBvYmogPSBhcmdzLnBvcCgpO1xuICAgIGlmICghX2lzQXJyYXkob2JqKSkge1xuICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICB3aGlsZSAoaWR4IDwgbWV0aG9kTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW21ldGhvZE5hbWVzW2lkeF1dID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIG9ialttZXRob2ROYW1lc1tpZHhdXS5hcHBseShvYmosIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGlkeCArPSAxO1xuICAgICAgfVxuICAgICAgaWYgKF9pc1RyYW5zZm9ybWVyKG9iaikpIHtcbiAgICAgICAgdmFyIHRyYW5zZHVjZXIgPSB4Zi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRyYW5zZHVjZXIob2JqKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9kaXNwYXRjaGFibGU7IiwidmFyIHRha2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi4vdGFrZScpO1xuXG5mdW5jdGlvbiBkcm9wTGFzdChuLCB4cykge1xuICByZXR1cm4gdGFrZShuIDwgeHMubGVuZ3RoID8geHMubGVuZ3RoIC0gbiA6IDAsIHhzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZHJvcExhc3Q7IiwidmFyIHNsaWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4uL3NsaWNlJyk7XG5cbmZ1bmN0aW9uIGRyb3BMYXN0V2hpbGUocHJlZCwgeHMpIHtcbiAgdmFyIGlkeCA9IHhzLmxlbmd0aCAtIDE7XG4gIHdoaWxlIChpZHggPj0gMCAmJiBwcmVkKHhzW2lkeF0pKSB7XG4gICAgaWR4IC09IDE7XG4gIH1cbiAgcmV0dXJuIHNsaWNlKDAsIGlkeCArIDEsIHhzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZHJvcExhc3RXaGlsZTsiLCJ2YXIgX2FycmF5RnJvbUl0ZXJhdG9yID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2FycmF5RnJvbUl0ZXJhdG9yJyk7XG5cbnZhciBfY29udGFpbnNXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2NvbnRhaW5zV2l0aCcpO1xuXG52YXIgX2Z1bmN0aW9uTmFtZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19mdW5jdGlvbk5hbWUnKTtcblxudmFyIF9oYXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faGFzJyk7XG5cbnZhciBpZGVudGljYWwgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi4vaWRlbnRpY2FsJyk7XG5cbnZhciBrZXlzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4uL2tleXMnKTtcblxudmFyIHR5cGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi4vdHlwZScpO1xuXG4vKipcbiAqIHByaXZhdGUgX3VuaXFDb250ZW50RXF1YWxzIGZ1bmN0aW9uLlxuICogVGhhdCBmdW5jdGlvbiBpcyBjaGVja2luZyBlcXVhbGl0eSBvZiAyIGl0ZXJhdG9yIGNvbnRlbnRzIHdpdGggMiBhc3N1bXB0aW9uc1xuICogLSBpdGVyYXRvcnMgbGVuZ3RocyBhcmUgdGhlIHNhbWVcbiAqIC0gaXRlcmF0b3JzIHZhbHVlcyBhcmUgdW5pcXVlXG4gKlxuICogZmFsc2UtcG9zaXRpdmUgcmVzdWx0IHdpbGwgYmUgcmV0dXJuZWQgZm9yIGNvbXBhcmlzaW9uIG9mLCBlLmcuXG4gKiAtIFsxLDIsM10gYW5kIFsxLDIsMyw0XVxuICogLSBbMSwxLDFdIGFuZCBbMSwyLDNdXG4gKiAqL1xuXG5mdW5jdGlvbiBfdW5pcUNvbnRlbnRFcXVhbHMoYUl0ZXJhdG9yLCBiSXRlcmF0b3IsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBhID0gX2FycmF5RnJvbUl0ZXJhdG9yKGFJdGVyYXRvcik7XG4gIHZhciBiID0gX2FycmF5RnJvbUl0ZXJhdG9yKGJJdGVyYXRvcik7XG5cbiAgZnVuY3Rpb24gZXEoX2EsIF9iKSB7XG4gICAgcmV0dXJuIF9lcXVhbHMoX2EsIF9iLCBzdGFja0Euc2xpY2UoKSwgc3RhY2tCLnNsaWNlKCkpO1xuICB9XG5cbiAgLy8gaWYgKmEqIGFycmF5IGNvbnRhaW5zIGFueSBlbGVtZW50IHRoYXQgaXMgbm90IGluY2x1ZGVkIGluICpiKlxuICByZXR1cm4gIV9jb250YWluc1dpdGgoZnVuY3Rpb24gKGIsIGFJdGVtKSB7XG4gICAgcmV0dXJuICFfY29udGFpbnNXaXRoKGVxLCBhSXRlbSwgYik7XG4gIH0sIGIsIGEpO1xufVxuXG5mdW5jdGlvbiBfZXF1YWxzKGEsIGIsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIGlmIChpZGVudGljYWwoYSwgYikpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHZhciB0eXBlQSA9IHR5cGUoYSk7XG5cbiAgaWYgKHR5cGVBICE9PSB0eXBlKGIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIGFbJ2ZhbnRhc3ktbGFuZC9lcXVhbHMnXSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgYlsnZmFudGFzeS1sYW5kL2VxdWFscyddID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBhWydmYW50YXN5LWxhbmQvZXF1YWxzJ10gPT09ICdmdW5jdGlvbicgJiYgYVsnZmFudGFzeS1sYW5kL2VxdWFscyddKGIpICYmIHR5cGVvZiBiWydmYW50YXN5LWxhbmQvZXF1YWxzJ10gPT09ICdmdW5jdGlvbicgJiYgYlsnZmFudGFzeS1sYW5kL2VxdWFscyddKGEpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgYi5lcXVhbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHlwZW9mIGEuZXF1YWxzID09PSAnZnVuY3Rpb24nICYmIGEuZXF1YWxzKGIpICYmIHR5cGVvZiBiLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJyAmJiBiLmVxdWFscyhhKTtcbiAgfVxuXG4gIHN3aXRjaCAodHlwZUEpIHtcbiAgICBjYXNlICdBcmd1bWVudHMnOlxuICAgIGNhc2UgJ0FycmF5JzpcbiAgICBjYXNlICdPYmplY3QnOlxuICAgICAgaWYgKHR5cGVvZiBhLmNvbnN0cnVjdG9yID09PSAnZnVuY3Rpb24nICYmIF9mdW5jdGlvbk5hbWUoYS5jb25zdHJ1Y3RvcikgPT09ICdQcm9taXNlJykge1xuICAgICAgICByZXR1cm4gYSA9PT0gYjtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgIGNhc2UgJ051bWJlcic6XG4gICAgY2FzZSAnU3RyaW5nJzpcbiAgICAgIGlmICghKHR5cGVvZiBhID09PSB0eXBlb2YgYiAmJiBpZGVudGljYWwoYS52YWx1ZU9mKCksIGIudmFsdWVPZigpKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRGF0ZSc6XG4gICAgICBpZiAoIWlkZW50aWNhbChhLnZhbHVlT2YoKSwgYi52YWx1ZU9mKCkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0Vycm9yJzpcbiAgICAgIHJldHVybiBhLm5hbWUgPT09IGIubmFtZSAmJiBhLm1lc3NhZ2UgPT09IGIubWVzc2FnZTtcbiAgICBjYXNlICdSZWdFeHAnOlxuICAgICAgaWYgKCEoYS5zb3VyY2UgPT09IGIuc291cmNlICYmIGEuZ2xvYmFsID09PSBiLmdsb2JhbCAmJiBhLmlnbm9yZUNhc2UgPT09IGIuaWdub3JlQ2FzZSAmJiBhLm11bHRpbGluZSA9PT0gYi5tdWx0aWxpbmUgJiYgYS5zdGlja3kgPT09IGIuc3RpY2t5ICYmIGEudW5pY29kZSA9PT0gYi51bmljb2RlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHZhciBpZHggPSBzdGFja0EubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgaWYgKHN0YWNrQVtpZHhdID09PSBhKSB7XG4gICAgICByZXR1cm4gc3RhY2tCW2lkeF0gPT09IGI7XG4gICAgfVxuICAgIGlkeCAtPSAxO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlQSkge1xuICAgIGNhc2UgJ01hcCc6XG4gICAgICBpZiAoYS5zaXplICE9PSBiLnNpemUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3VuaXFDb250ZW50RXF1YWxzKGEuZW50cmllcygpLCBiLmVudHJpZXMoKSwgc3RhY2tBLmNvbmNhdChbYV0pLCBzdGFja0IuY29uY2F0KFtiXSkpO1xuICAgIGNhc2UgJ1NldCc6XG4gICAgICBpZiAoYS5zaXplICE9PSBiLnNpemUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3VuaXFDb250ZW50RXF1YWxzKGEudmFsdWVzKCksIGIudmFsdWVzKCksIHN0YWNrQS5jb25jYXQoW2FdKSwgc3RhY2tCLmNvbmNhdChbYl0pKTtcbiAgICBjYXNlICdBcmd1bWVudHMnOlxuICAgIGNhc2UgJ0FycmF5JzpcbiAgICBjYXNlICdPYmplY3QnOlxuICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgIGNhc2UgJ051bWJlcic6XG4gICAgY2FzZSAnU3RyaW5nJzpcbiAgICBjYXNlICdEYXRlJzpcbiAgICBjYXNlICdFcnJvcic6XG4gICAgY2FzZSAnUmVnRXhwJzpcbiAgICBjYXNlICdJbnQ4QXJyYXknOlxuICAgIGNhc2UgJ1VpbnQ4QXJyYXknOlxuICAgIGNhc2UgJ1VpbnQ4Q2xhbXBlZEFycmF5JzpcbiAgICBjYXNlICdJbnQxNkFycmF5JzpcbiAgICBjYXNlICdVaW50MTZBcnJheSc6XG4gICAgY2FzZSAnSW50MzJBcnJheSc6XG4gICAgY2FzZSAnVWludDMyQXJyYXknOlxuICAgIGNhc2UgJ0Zsb2F0MzJBcnJheSc6XG4gICAgY2FzZSAnRmxvYXQ2NEFycmF5JzpcbiAgICBjYXNlICdBcnJheUJ1ZmZlcic6XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgLy8gVmFsdWVzIG9mIG90aGVyIHR5cGVzIGFyZSBvbmx5IGVxdWFsIGlmIGlkZW50aWNhbC5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBrZXlzQSA9IGtleXMoYSk7XG4gIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXMoYikubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGV4dGVuZGVkU3RhY2tBID0gc3RhY2tBLmNvbmNhdChbYV0pO1xuICB2YXIgZXh0ZW5kZWRTdGFja0IgPSBzdGFja0IuY29uY2F0KFtiXSk7XG5cbiAgaWR4ID0ga2V5c0EubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgdmFyIGtleSA9IGtleXNBW2lkeF07XG4gICAgaWYgKCEoX2hhcyhrZXksIGIpICYmIF9lcXVhbHMoYltrZXldLCBhW2tleV0sIGV4dGVuZGVkU3RhY2tBLCBleHRlbmRlZFN0YWNrQikpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlkeCAtPSAxO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfZXF1YWxzOyIsImZ1bmN0aW9uIF9maWx0ZXIoZm4sIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBpZiAoZm4obGlzdFtpZHhdKSkge1xuICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gbGlzdFtpZHhdO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfZmlsdGVyOyIsInZhciBfZm9yY2VSZWR1Y2VkID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2ZvcmNlUmVkdWNlZCcpO1xuXG52YXIgX2lzQXJyYXlMaWtlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2lzQXJyYXlMaWtlJyk7XG5cbnZhciBfcmVkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3JlZHVjZScpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIHByZXNlcnZpbmdSZWR1Y2VkID0gZnVuY3Rpb24gKHhmKSB7XG4gIHJldHVybiB7XG4gICAgJ0BAdHJhbnNkdWNlci9pbml0JzogX3hmQmFzZS5pbml0LFxuICAgICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgICB9LFxuICAgICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICB2YXIgcmV0ID0geGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCk7XG4gICAgICByZXR1cm4gcmV0WydAQHRyYW5zZHVjZXIvcmVkdWNlZCddID8gX2ZvcmNlUmVkdWNlZChyZXQpIDogcmV0O1xuICAgIH1cbiAgfTtcbn07XG5cbnZhciBfZmxhdENhdCA9IGZ1bmN0aW9uIF94Y2F0KHhmKSB7XG4gIHZhciByeGYgPSBwcmVzZXJ2aW5nUmVkdWNlZCh4Zik7XG4gIHJldHVybiB7XG4gICAgJ0BAdHJhbnNkdWNlci9pbml0JzogX3hmQmFzZS5pbml0LFxuICAgICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJ4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gICAgfSxcbiAgICAnQEB0cmFuc2R1Y2VyL3N0ZXAnOiBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgICAgcmV0dXJuICFfaXNBcnJheUxpa2UoaW5wdXQpID8gX3JlZHVjZShyeGYsIHJlc3VsdCwgW2lucHV0XSkgOiBfcmVkdWNlKHJ4ZiwgcmVzdWx0LCBpbnB1dCk7XG4gICAgfVxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBfZmxhdENhdDsiLCJmdW5jdGlvbiBfZm9yY2VSZWR1Y2VkKHgpIHtcbiAgcmV0dXJuIHtcbiAgICAnQEB0cmFuc2R1Y2VyL3ZhbHVlJzogeCxcbiAgICAnQEB0cmFuc2R1Y2VyL3JlZHVjZWQnOiB0cnVlXG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9mb3JjZVJlZHVjZWQ7IiwiZnVuY3Rpb24gX2Z1bmN0aW9uTmFtZShmKSB7XG4gIC8vIFN0cmluZyh4ID0+IHgpIGV2YWx1YXRlcyB0byBcInggPT4geFwiLCBzbyB0aGUgcGF0dGVybiBtYXkgbm90IG1hdGNoLlxuICB2YXIgbWF0Y2ggPSBTdHJpbmcoZikubWF0Y2goL15mdW5jdGlvbiAoXFx3KikvKTtcbiAgcmV0dXJuIG1hdGNoID09IG51bGwgPyAnJyA6IG1hdGNoWzFdO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfZnVuY3Rpb25OYW1lOyIsImZ1bmN0aW9uIF9oYXMocHJvcCwgb2JqKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2hhczsiLCJmdW5jdGlvbiBfaWRlbnRpdHkoeCkge1xuICByZXR1cm4geDtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2lkZW50aXR5OyIsInZhciBlcXVhbHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi4vZXF1YWxzJyk7XG5cbmZ1bmN0aW9uIF9pbmRleE9mKGxpc3QsIGEsIGlkeCkge1xuICB2YXIgaW5mLCBpdGVtO1xuICAvLyBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiBkb2Vzbid0IGV4aXN0IGJlbG93IElFOVxuICBpZiAodHlwZW9mIGxpc3QuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHN3aXRjaCAodHlwZW9mIGEpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGlmIChhID09PSAwKSB7XG4gICAgICAgICAgLy8gbWFudWFsbHkgY3Jhd2wgdGhlIGxpc3QgdG8gZGlzdGluZ3Vpc2ggYmV0d2VlbiArMCBhbmQgLTBcbiAgICAgICAgICBpbmYgPSAxIC8gYTtcbiAgICAgICAgICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZW0gPSBsaXN0W2lkeF07XG4gICAgICAgICAgICBpZiAoaXRlbSA9PT0gMCAmJiAxIC8gaXRlbSA9PT0gaW5mKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2UgaWYgKGEgIT09IGEpIHtcbiAgICAgICAgICAvLyBOYU5cbiAgICAgICAgICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZW0gPSBsaXN0W2lkeF07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdudW1iZXInICYmIGl0ZW0gIT09IGl0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbm9uLXplcm8gbnVtYmVycyBjYW4gdXRpbGlzZSBTZXRcbiAgICAgICAgcmV0dXJuIGxpc3QuaW5kZXhPZihhLCBpZHgpO1xuXG4gICAgICAvLyBhbGwgdGhlc2UgdHlwZXMgY2FuIHV0aWxpc2UgU2V0XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gbGlzdC5pbmRleE9mKGEsIGlkeCk7XG5cbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChhID09PSBudWxsKSB7XG4gICAgICAgICAgLy8gbnVsbCBjYW4gdXRpbGlzZSBTZXRcbiAgICAgICAgICByZXR1cm4gbGlzdC5pbmRleE9mKGEsIGlkeCk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gYW55dGhpbmcgZWxzZSBub3QgY292ZXJlZCBhYm92ZSwgZGVmZXIgdG8gUi5lcXVhbHNcbiAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgaWYgKGVxdWFscyhsaXN0W2lkeF0sIGEpKSB7XG4gICAgICByZXR1cm4gaWR4O1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gLTE7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9pbmRleE9mOyIsInZhciBfaGFzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2hhcycpO1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIF9pc0FyZ3VtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJndW1lbnRzKSA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXScgPyBmdW5jdGlvbiBfaXNBcmd1bWVudHMoeCkge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcmd1bWVudHNdJztcbiAgfSA6IGZ1bmN0aW9uIF9pc0FyZ3VtZW50cyh4KSB7XG4gICAgcmV0dXJuIF9oYXMoJ2NhbGxlZScsIHgpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBfaXNBcmd1bWVudHM7IiwiLyoqXG4gKiBUZXN0cyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QgaXMgYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSBvYmplY3QgdG8gdGVzdC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgdmFsYCBpcyBhbiBhcnJheSwgYGZhbHNlYCBvdGhlcndpc2UuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgX2lzQXJyYXkoW10pOyAvLz0+IHRydWVcbiAqICAgICAgX2lzQXJyYXkobnVsbCk7IC8vPT4gZmFsc2VcbiAqICAgICAgX2lzQXJyYXkoe30pOyAvLz0+IGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBfaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbC5sZW5ndGggPj0gMCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkxJyk7XG5cbnZhciBfaXNBcnJheSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc0FycmF5Jyk7XG5cbnZhciBfaXNTdHJpbmcgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faXNTdHJpbmcnKTtcblxuLyoqXG4gKiBUZXN0cyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QgaXMgc2ltaWxhciB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICogLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSB4IFRoZSBvYmplY3QgdG8gdGVzdC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgeGAgaGFzIGEgbnVtZXJpYyBsZW5ndGggcHJvcGVydHkgYW5kIGV4dHJlbWUgaW5kaWNlcyBkZWZpbmVkOyBgZmFsc2VgIG90aGVyd2lzZS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBfaXNBcnJheUxpa2UoW10pOyAvLz0+IHRydWVcbiAqICAgICAgX2lzQXJyYXlMaWtlKHRydWUpOyAvLz0+IGZhbHNlXG4gKiAgICAgIF9pc0FycmF5TGlrZSh7fSk7IC8vPT4gZmFsc2VcbiAqICAgICAgX2lzQXJyYXlMaWtlKHtsZW5ndGg6IDEwfSk7IC8vPT4gZmFsc2VcbiAqICAgICAgX2lzQXJyYXlMaWtlKHswOiAnemVybycsIDk6ICduaW5lJywgbGVuZ3RoOiAxMH0pOyAvLz0+IHRydWVcbiAqL1xuXG5cbnZhciBfaXNBcnJheUxpa2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBpc0FycmF5TGlrZSh4KSB7XG4gIGlmIChfaXNBcnJheSh4KSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICgheCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChfaXNTdHJpbmcoeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHgubm9kZVR5cGUgPT09IDEpIHtcbiAgICByZXR1cm4gISF4Lmxlbmd0aDtcbiAgfVxuICBpZiAoeC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoeC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHguaGFzT3duUHJvcGVydHkoMCkgJiYgeC5oYXNPd25Qcm9wZXJ0eSh4Lmxlbmd0aCAtIDEpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfaXNBcnJheUxpa2U7IiwiZnVuY3Rpb24gX2lzRnVuY3Rpb24oeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfaXNGdW5jdGlvbjsiLCIvKipcbiAqIERldGVybWluZSBpZiB0aGUgcGFzc2VkIGFyZ3VtZW50IGlzIGFuIGludGVnZXIuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gblxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gTnVtYmVyLmlzSW50ZWdlciB8fCBmdW5jdGlvbiBfaXNJbnRlZ2VyKG4pIHtcbiAgcmV0dXJuIG4gPDwgMCA9PT0gbjtcbn07IiwiZnVuY3Rpb24gX2lzTnVtYmVyKHgpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9pc051bWJlcjsiLCJmdW5jdGlvbiBfaXNPYmplY3QoeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cbm1vZHVsZS5leHBvcnRzID0gX2lzT2JqZWN0OyIsImZ1bmN0aW9uIF9pc1BsYWNlaG9sZGVyKGEpIHtcbiAgICAgICByZXR1cm4gYSAhPSBudWxsICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JyAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2lzUGxhY2Vob2xkZXI7IiwiZnVuY3Rpb24gX2lzUmVnRXhwKHgpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9pc1JlZ0V4cDsiLCJmdW5jdGlvbiBfaXNTdHJpbmcoeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcbn1cbm1vZHVsZS5leHBvcnRzID0gX2lzU3RyaW5nOyIsImZ1bmN0aW9uIF9pc1RyYW5zZm9ybWVyKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9ialsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9PT0gJ2Z1bmN0aW9uJztcbn1cbm1vZHVsZS5leHBvcnRzID0gX2lzVHJhbnNmb3JtZXI7IiwidmFyIF9pc0FycmF5TGlrZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc0FycmF5TGlrZScpO1xuXG4vKipcbiAqIGBfbWFrZUZsYXRgIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIG9uZS1sZXZlbCBvciBmdWxseSByZWN1cnNpdmVcbiAqIGZ1bmN0aW9uIGJhc2VkIG9uIHRoZSBmbGFnIHBhc3NlZCBpbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5cblxuZnVuY3Rpb24gX21ha2VGbGF0KHJlY3Vyc2l2ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gZmxhdHQobGlzdCkge1xuICAgIHZhciB2YWx1ZSwgamxlbiwgajtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGlkeCA9IDA7XG4gICAgdmFyIGlsZW4gPSBsaXN0Lmxlbmd0aDtcblxuICAgIHdoaWxlIChpZHggPCBpbGVuKSB7XG4gICAgICBpZiAoX2lzQXJyYXlMaWtlKGxpc3RbaWR4XSkpIHtcbiAgICAgICAgdmFsdWUgPSByZWN1cnNpdmUgPyBmbGF0dChsaXN0W2lkeF0pIDogbGlzdFtpZHhdO1xuICAgICAgICBqID0gMDtcbiAgICAgICAgamxlbiA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGogPCBqbGVuKSB7XG4gICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gdmFsdWVbal07XG4gICAgICAgICAgaiArPSAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBsaXN0W2lkeF07XG4gICAgICB9XG4gICAgICBpZHggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX21ha2VGbGF0OyIsImZ1bmN0aW9uIF9tYXAoZm4sIGZ1bmN0b3IpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBmdW5jdG9yLmxlbmd0aDtcbiAgdmFyIHJlc3VsdCA9IEFycmF5KGxlbik7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICByZXN1bHRbaWR4XSA9IGZuKGZ1bmN0b3JbaWR4XSk7XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbm1vZHVsZS5leHBvcnRzID0gX21hcDsiLCJ2YXIgX2hhcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19oYXMnKTtcblxuLy8gQmFzZWQgb24gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2Fzc2lnblxuXG5cbmZ1bmN0aW9uIF9vYmplY3RBc3NpZ24odGFyZ2V0KSB7XG4gIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICB9XG5cbiAgdmFyIG91dHB1dCA9IE9iamVjdCh0YXJnZXQpO1xuICB2YXIgaWR4ID0gMTtcbiAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW5ndGgpIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2lkeF07XG4gICAgaWYgKHNvdXJjZSAhPSBudWxsKSB7XG4gICAgICBmb3IgKHZhciBuZXh0S2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoX2hhcyhuZXh0S2V5LCBzb3VyY2UpKSB7XG4gICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RBc3NpZ247IiwiZnVuY3Rpb24gX29mKHgpIHtcbiAgcmV0dXJuIFt4XTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX29mOyIsImZ1bmN0aW9uIF9waXBlKGYsIGcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZy5jYWxsKHRoaXMsIGYuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9waXBlOyIsImZ1bmN0aW9uIF9waXBlUChmLCBnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGN0eCA9IHRoaXM7XG4gICAgcmV0dXJuIGYuYXBwbHkoY3R4LCBhcmd1bWVudHMpLnRoZW4oZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiBnLmNhbGwoY3R4LCB4KTtcbiAgICB9KTtcbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX3BpcGVQOyIsImZ1bmN0aW9uIF9xdW90ZShzKSB7XG4gIHZhciBlc2NhcGVkID0gcy5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpLnJlcGxhY2UoL1tcXGJdL2csICdcXFxcYicpIC8vIFxcYiBtYXRjaGVzIHdvcmQgYm91bmRhcnk7IFtcXGJdIG1hdGNoZXMgYmFja3NwYWNlXG4gIC5yZXBsYWNlKC9cXGYvZywgJ1xcXFxmJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKS5yZXBsYWNlKC9cXHQvZywgJ1xcXFx0JykucmVwbGFjZSgvXFx2L2csICdcXFxcdicpLnJlcGxhY2UoL1xcMC9nLCAnXFxcXDAnKTtcblxuICByZXR1cm4gJ1wiJyArIGVzY2FwZWQucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiJztcbn1cbm1vZHVsZS5leHBvcnRzID0gX3F1b3RlOyIsInZhciBfaXNBcnJheUxpa2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faXNBcnJheUxpa2UnKTtcblxudmFyIF94d3JhcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194d3JhcCcpO1xuXG52YXIgYmluZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuLi9iaW5kJyk7XG5cbmZ1bmN0aW9uIF9hcnJheVJlZHVjZSh4ZiwgYWNjLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBhY2MgPSB4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShhY2MsIGxpc3RbaWR4XSk7XG4gICAgaWYgKGFjYyAmJiBhY2NbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ10pIHtcbiAgICAgIGFjYyA9IGFjY1snQEB0cmFuc2R1Y2VyL3ZhbHVlJ107XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10oYWNjKTtcbn1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlUmVkdWNlKHhmLCBhY2MsIGl0ZXIpIHtcbiAgdmFyIHN0ZXAgPSBpdGVyLm5leHQoKTtcbiAgd2hpbGUgKCFzdGVwLmRvbmUpIHtcbiAgICBhY2MgPSB4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShhY2MsIHN0ZXAudmFsdWUpO1xuICAgIGlmIChhY2MgJiYgYWNjWydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKSB7XG4gICAgICBhY2MgPSBhY2NbJ0BAdHJhbnNkdWNlci92YWx1ZSddO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHN0ZXAgPSBpdGVyLm5leHQoKTtcbiAgfVxuICByZXR1cm4geGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShhY2MpO1xufVxuXG5mdW5jdGlvbiBfbWV0aG9kUmVkdWNlKHhmLCBhY2MsIG9iaiwgbWV0aG9kTmFtZSkge1xuICByZXR1cm4geGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShvYmpbbWV0aG9kTmFtZV0oYmluZCh4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSwgeGYpLCBhY2MpKTtcbn1cblxudmFyIHN5bUl0ZXJhdG9yID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgPyBTeW1ib2wuaXRlcmF0b3IgOiAnQEBpdGVyYXRvcic7XG5cbmZ1bmN0aW9uIF9yZWR1Y2UoZm4sIGFjYywgbGlzdCkge1xuICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm4gPSBfeHdyYXAoZm4pO1xuICB9XG4gIGlmIChfaXNBcnJheUxpa2UobGlzdCkpIHtcbiAgICByZXR1cm4gX2FycmF5UmVkdWNlKGZuLCBhY2MsIGxpc3QpO1xuICB9XG4gIGlmICh0eXBlb2YgbGlzdFsnZmFudGFzeS1sYW5kL3JlZHVjZSddID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIF9tZXRob2RSZWR1Y2UoZm4sIGFjYywgbGlzdCwgJ2ZhbnRhc3ktbGFuZC9yZWR1Y2UnKTtcbiAgfVxuICBpZiAobGlzdFtzeW1JdGVyYXRvcl0gIT0gbnVsbCkge1xuICAgIHJldHVybiBfaXRlcmFibGVSZWR1Y2UoZm4sIGFjYywgbGlzdFtzeW1JdGVyYXRvcl0oKSk7XG4gIH1cbiAgaWYgKHR5cGVvZiBsaXN0Lm5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gX2l0ZXJhYmxlUmVkdWNlKGZuLCBhY2MsIGxpc3QpO1xuICB9XG4gIGlmICh0eXBlb2YgbGlzdC5yZWR1Y2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gX21ldGhvZFJlZHVjZShmbiwgYWNjLCBsaXN0LCAncmVkdWNlJyk7XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdyZWR1Y2U6IGxpc3QgbXVzdCBiZSBhcnJheSBvciBpdGVyYWJsZScpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfcmVkdWNlOyIsImZ1bmN0aW9uIF9yZWR1Y2VkKHgpIHtcbiAgcmV0dXJuIHggJiYgeFsnQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSA/IHggOiB7XG4gICAgJ0BAdHJhbnNkdWNlci92YWx1ZSc6IHgsXG4gICAgJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJzogdHJ1ZVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfcmVkdWNlZDsiLCJ2YXIgX2Fzc2lnbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19hc3NpZ24nKTtcblxudmFyIF9pZGVudGl0eSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pZGVudGl0eScpO1xuXG52YXIgX2lzQXJyYXlMaWtlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2lzQXJyYXlMaWtlJyk7XG5cbnZhciBfaXNUcmFuc2Zvcm1lciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc1RyYW5zZm9ybWVyJyk7XG5cbnZhciBvYmpPZiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuLi9vYmpPZicpO1xuXG52YXIgX3N0ZXBDYXRBcnJheSA9IHtcbiAgJ0BAdHJhbnNkdWNlci9pbml0JzogQXJyYXksXG4gICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uICh4cywgeCkge1xuICAgIHhzLnB1c2goeCk7XG4gICAgcmV0dXJuIHhzO1xuICB9LFxuICAnQEB0cmFuc2R1Y2VyL3Jlc3VsdCc6IF9pZGVudGl0eVxufTtcbnZhciBfc3RlcENhdFN0cmluZyA9IHtcbiAgJ0BAdHJhbnNkdWNlci9pbml0JzogU3RyaW5nLFxuICAnQEB0cmFuc2R1Y2VyL3N0ZXAnOiBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhICsgYjtcbiAgfSxcbiAgJ0BAdHJhbnNkdWNlci9yZXN1bHQnOiBfaWRlbnRpdHlcbn07XG52YXIgX3N0ZXBDYXRPYmplY3QgPSB7XG4gICdAQHRyYW5zZHVjZXIvaW5pdCc6IE9iamVjdCxcbiAgJ0BAdHJhbnNkdWNlci9zdGVwJzogZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICByZXR1cm4gX2Fzc2lnbihyZXN1bHQsIF9pc0FycmF5TGlrZShpbnB1dCkgPyBvYmpPZihpbnB1dFswXSwgaW5wdXRbMV0pIDogaW5wdXQpO1xuICB9LFxuICAnQEB0cmFuc2R1Y2VyL3Jlc3VsdCc6IF9pZGVudGl0eVxufTtcblxuZnVuY3Rpb24gX3N0ZXBDYXQob2JqKSB7XG4gIGlmIChfaXNUcmFuc2Zvcm1lcihvYmopKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBpZiAoX2lzQXJyYXlMaWtlKG9iaikpIHtcbiAgICByZXR1cm4gX3N0ZXBDYXRBcnJheTtcbiAgfVxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gX3N0ZXBDYXRTdHJpbmc7XG4gIH1cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIF9zdGVwQ2F0T2JqZWN0O1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNyZWF0ZSB0cmFuc2Zvcm1lciBmb3IgJyArIG9iaik7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9zdGVwQ2F0OyIsIi8qKlxuICogUG9seWZpbGwgZnJvbSA8aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRGF0ZS90b0lTT1N0cmluZz4uXG4gKi9cbnZhciBwYWQgPSBmdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gKG4gPCAxMCA/ICcwJyA6ICcnKSArIG47XG59O1xuXG52YXIgX3RvSVNPU3RyaW5nID0gdHlwZW9mIERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nID8gZnVuY3Rpb24gX3RvSVNPU3RyaW5nKGQpIHtcbiAgcmV0dXJuIGQudG9JU09TdHJpbmcoKTtcbn0gOiBmdW5jdGlvbiBfdG9JU09TdHJpbmcoZCkge1xuICByZXR1cm4gZC5nZXRVVENGdWxsWWVhcigpICsgJy0nICsgcGFkKGQuZ2V0VVRDTW9udGgoKSArIDEpICsgJy0nICsgcGFkKGQuZ2V0VVRDRGF0ZSgpKSArICdUJyArIHBhZChkLmdldFVUQ0hvdXJzKCkpICsgJzonICsgcGFkKGQuZ2V0VVRDTWludXRlcygpKSArICc6JyArIHBhZChkLmdldFVUQ1NlY29uZHMoKSkgKyAnLicgKyAoZC5nZXRVVENNaWxsaXNlY29uZHMoKSAvIDEwMDApLnRvRml4ZWQoMykuc2xpY2UoMiwgNSkgKyAnWic7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IF90b0lTT1N0cmluZzsiLCJ2YXIgX2NvbnRhaW5zID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2NvbnRhaW5zJyk7XG5cbnZhciBfbWFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX21hcCcpO1xuXG52YXIgX3F1b3RlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3F1b3RlJyk7XG5cbnZhciBfdG9JU09TdHJpbmcgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fdG9JU09TdHJpbmcnKTtcblxudmFyIGtleXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi4va2V5cycpO1xuXG52YXIgcmVqZWN0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4uL3JlamVjdCcpO1xuXG5mdW5jdGlvbiBfdG9TdHJpbmcoeCwgc2Vlbikge1xuICB2YXIgcmVjdXIgPSBmdW5jdGlvbiByZWN1cih5KSB7XG4gICAgdmFyIHhzID0gc2Vlbi5jb25jYXQoW3hdKTtcbiAgICByZXR1cm4gX2NvbnRhaW5zKHksIHhzKSA/ICc8Q2lyY3VsYXI+JyA6IF90b1N0cmluZyh5LCB4cyk7XG4gIH07XG5cbiAgLy8gIG1hcFBhaXJzIDo6IChPYmplY3QsIFtTdHJpbmddKSAtPiBbU3RyaW5nXVxuICB2YXIgbWFwUGFpcnMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgcmV0dXJuIF9tYXAoZnVuY3Rpb24gKGspIHtcbiAgICAgIHJldHVybiBfcXVvdGUoaykgKyAnOiAnICsgcmVjdXIob2JqW2tdKTtcbiAgICB9LCBrZXlzLnNsaWNlKCkuc29ydCgpKTtcbiAgfTtcblxuICBzd2l0Y2ggKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSkge1xuICAgIGNhc2UgJ1tvYmplY3QgQXJndW1lbnRzXSc6XG4gICAgICByZXR1cm4gJyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgnICsgX21hcChyZWN1ciwgeCkuam9pbignLCAnKSArICcpKSc7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheV0nOlxuICAgICAgcmV0dXJuICdbJyArIF9tYXAocmVjdXIsIHgpLmNvbmNhdChtYXBQYWlycyh4LCByZWplY3QoZnVuY3Rpb24gKGspIHtcbiAgICAgICAgcmV0dXJuICgvXlxcZCskLy50ZXN0KGspXG4gICAgICAgICk7XG4gICAgICB9LCBrZXlzKHgpKSkpLmpvaW4oJywgJykgKyAnXSc7XG4gICAgY2FzZSAnW29iamVjdCBCb29sZWFuXSc6XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnID8gJ25ldyBCb29sZWFuKCcgKyByZWN1cih4LnZhbHVlT2YoKSkgKyAnKScgOiB4LnRvU3RyaW5nKCk7XG4gICAgY2FzZSAnW29iamVjdCBEYXRlXSc6XG4gICAgICByZXR1cm4gJ25ldyBEYXRlKCcgKyAoaXNOYU4oeC52YWx1ZU9mKCkpID8gcmVjdXIoTmFOKSA6IF9xdW90ZShfdG9JU09TdHJpbmcoeCkpKSArICcpJztcbiAgICBjYXNlICdbb2JqZWN0IE51bGxdJzpcbiAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgY2FzZSAnW29iamVjdCBOdW1iZXJdJzpcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgPyAnbmV3IE51bWJlcignICsgcmVjdXIoeC52YWx1ZU9mKCkpICsgJyknIDogMSAvIHggPT09IC1JbmZpbml0eSA/ICctMCcgOiB4LnRvU3RyaW5nKDEwKTtcbiAgICBjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyA/ICduZXcgU3RyaW5nKCcgKyByZWN1cih4LnZhbHVlT2YoKSkgKyAnKScgOiBfcXVvdGUoeCk7XG4gICAgY2FzZSAnW29iamVjdCBVbmRlZmluZWRdJzpcbiAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKHR5cGVvZiB4LnRvU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhciByZXByID0geC50b1N0cmluZygpO1xuICAgICAgICBpZiAocmVwciAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICByZXR1cm4gcmVwcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICd7JyArIG1hcFBhaXJzKHgsIGtleXMoeCkpLmpvaW4oJywgJykgKyAnfSc7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gX3RvU3RyaW5nOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3JlZHVjZWQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fcmVkdWNlZCcpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhBbGwgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIFhBbGwoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgICB0aGlzLmFsbCA9IHRydWU7XG4gIH1cbiAgWEFsbC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhBbGwucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgaWYgKHRoaXMuYWxsKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgfTtcbiAgWEFsbC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIGlmICghdGhpcy5mKGlucHV0KSkge1xuICAgICAgdGhpcy5hbGwgPSBmYWxzZTtcbiAgICAgIHJlc3VsdCA9IF9yZWR1Y2VkKHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBmYWxzZSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiBYQWxsO1xufSgpO1xuXG52YXIgX3hhbGwgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeGFsbChmLCB4Zikge1xuICByZXR1cm4gbmV3IFhBbGwoZiwgeGYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF94YWxsOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3JlZHVjZWQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fcmVkdWNlZCcpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhBbnkgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIFhBbnkoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgICB0aGlzLmFueSA9IGZhbHNlO1xuICB9XG4gIFhBbnkucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYQW55LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIGlmICghdGhpcy5hbnkpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBmYWxzZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgfTtcbiAgWEFueS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIGlmICh0aGlzLmYoaW5wdXQpKSB7XG4gICAgICB0aGlzLmFueSA9IHRydWU7XG4gICAgICByZXN1bHQgPSBfcmVkdWNlZCh0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdHJ1ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiBYQW55O1xufSgpO1xuXG52YXIgX3hhbnkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeGFueShmLCB4Zikge1xuICByZXR1cm4gbmV3IFhBbnkoZiwgeGYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF94YW55OyIsInZhciBfY29uY2F0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2NvbmNhdCcpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTInKTtcblxudmFyIF94ZkJhc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cbnZhciBYQXBlcnR1cmUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIFhBcGVydHVyZShuLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLnBvcyA9IDA7XG4gICAgdGhpcy5mdWxsID0gZmFsc2U7XG4gICAgdGhpcy5hY2MgPSBuZXcgQXJyYXkobik7XG4gIH1cbiAgWEFwZXJ0dXJlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWEFwZXJ0dXJlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHRoaXMuYWNjID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gIH07XG4gIFhBcGVydHVyZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIHRoaXMuc3RvcmUoaW5wdXQpO1xuICAgIHJldHVybiB0aGlzLmZ1bGwgPyB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdGhpcy5nZXRDb3B5KCkpIDogcmVzdWx0O1xuICB9O1xuICBYQXBlcnR1cmUucHJvdG90eXBlLnN0b3JlID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgdGhpcy5hY2NbdGhpcy5wb3NdID0gaW5wdXQ7XG4gICAgdGhpcy5wb3MgKz0gMTtcbiAgICBpZiAodGhpcy5wb3MgPT09IHRoaXMuYWNjLmxlbmd0aCkge1xuICAgICAgdGhpcy5wb3MgPSAwO1xuICAgICAgdGhpcy5mdWxsID0gdHJ1ZTtcbiAgICB9XG4gIH07XG4gIFhBcGVydHVyZS5wcm90b3R5cGUuZ2V0Q29weSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX2NvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmFjYywgdGhpcy5wb3MpLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmFjYywgMCwgdGhpcy5wb3MpKTtcbiAgfTtcblxuICByZXR1cm4gWEFwZXJ0dXJlO1xufSgpO1xuXG52YXIgX3hhcGVydHVyZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIF94YXBlcnR1cmUobiwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYQXBlcnR1cmUobiwgeGYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF94YXBlcnR1cmU7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkyJyk7XG5cbnZhciBfZmxhdENhdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19mbGF0Q2F0Jyk7XG5cbnZhciBtYXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi4vbWFwJyk7XG5cbnZhciBfeGNoYWluID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gX3hjaGFpbihmLCB4Zikge1xuICByZXR1cm4gbWFwKGYsIF9mbGF0Q2F0KHhmKSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX3hjaGFpbjsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTInKTtcblxudmFyIF94ZkJhc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cbnZhciBYRHJvcCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gWERyb3AobiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5uID0gbjtcbiAgfVxuICBYRHJvcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhEcm9wLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gX3hmQmFzZS5yZXN1bHQ7XG4gIFhEcm9wLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgaWYgKHRoaXMubiA+IDApIHtcbiAgICAgIHRoaXMubiAtPSAxO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCk7XG4gIH07XG5cbiAgcmV0dXJuIFhEcm9wO1xufSgpO1xuXG52YXIgX3hkcm9wID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gX3hkcm9wKG4sIHhmKSB7XG4gIHJldHVybiBuZXcgWERyb3AobiwgeGYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF94ZHJvcDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTInKTtcblxudmFyIF94ZkJhc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cbnZhciBYRHJvcExhc3QgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIFhEcm9wTGFzdChuLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLnBvcyA9IDA7XG4gICAgdGhpcy5mdWxsID0gZmFsc2U7XG4gICAgdGhpcy5hY2MgPSBuZXcgQXJyYXkobik7XG4gIH1cbiAgWERyb3BMYXN0LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWERyb3BMYXN0LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHRoaXMuYWNjID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gIH07XG4gIFhEcm9wTGFzdC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIGlmICh0aGlzLmZ1bGwpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0aGlzLmFjY1t0aGlzLnBvc10pO1xuICAgIH1cbiAgICB0aGlzLnN0b3JlKGlucHV0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBYRHJvcExhc3QucHJvdG90eXBlLnN0b3JlID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgdGhpcy5hY2NbdGhpcy5wb3NdID0gaW5wdXQ7XG4gICAgdGhpcy5wb3MgKz0gMTtcbiAgICBpZiAodGhpcy5wb3MgPT09IHRoaXMuYWNjLmxlbmd0aCkge1xuICAgICAgdGhpcy5wb3MgPSAwO1xuICAgICAgdGhpcy5mdWxsID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFhEcm9wTGFzdDtcbn0oKTtcblxudmFyIF94ZHJvcExhc3QgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeGRyb3BMYXN0KG4sIHhmKSB7XG4gIHJldHVybiBuZXcgWERyb3BMYXN0KG4sIHhmKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfeGRyb3BMYXN0OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3JlZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19yZWR1Y2UnKTtcblxudmFyIF94ZkJhc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cbnZhciBYRHJvcExhc3RXaGlsZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gWERyb3BMYXN0V2hpbGUoZm4sIHhmKSB7XG4gICAgdGhpcy5mID0gZm47XG4gICAgdGhpcy5yZXRhaW5lZCA9IFtdO1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgfVxuICBYRHJvcExhc3RXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhEcm9wTGFzdFdoaWxlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHRoaXMucmV0YWluZWQgPSBudWxsO1xuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgfTtcbiAgWERyb3BMYXN0V2hpbGUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5mKGlucHV0KSA/IHRoaXMucmV0YWluKHJlc3VsdCwgaW5wdXQpIDogdGhpcy5mbHVzaChyZXN1bHQsIGlucHV0KTtcbiAgfTtcbiAgWERyb3BMYXN0V2hpbGUucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICByZXN1bHQgPSBfcmVkdWNlKHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10sIHJlc3VsdCwgdGhpcy5yZXRhaW5lZCk7XG4gICAgdGhpcy5yZXRhaW5lZCA9IFtdO1xuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpO1xuICB9O1xuICBYRHJvcExhc3RXaGlsZS5wcm90b3R5cGUucmV0YWluID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICB0aGlzLnJldGFpbmVkLnB1c2goaW5wdXQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgcmV0dXJuIFhEcm9wTGFzdFdoaWxlO1xufSgpO1xuXG52YXIgX3hkcm9wTGFzdFdoaWxlID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gX3hkcm9wTGFzdFdoaWxlKGZuLCB4Zikge1xuICByZXR1cm4gbmV3IFhEcm9wTGFzdFdoaWxlKGZuLCB4Zik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX3hkcm9wTGFzdFdoaWxlOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhEcm9wUmVwZWF0c1dpdGggPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIFhEcm9wUmVwZWF0c1dpdGgocHJlZCwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5wcmVkID0gcHJlZDtcbiAgICB0aGlzLmxhc3RWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNlZW5GaXJzdFZhbHVlID0gZmFsc2U7XG4gIH1cblxuICBYRHJvcFJlcGVhdHNXaXRoLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWERyb3BSZXBlYXRzV2l0aC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICBYRHJvcFJlcGVhdHNXaXRoLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgdmFyIHNhbWVBc0xhc3QgPSBmYWxzZTtcbiAgICBpZiAoIXRoaXMuc2VlbkZpcnN0VmFsdWUpIHtcbiAgICAgIHRoaXMuc2VlbkZpcnN0VmFsdWUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcmVkKHRoaXMubGFzdFZhbHVlLCBpbnB1dCkpIHtcbiAgICAgIHNhbWVBc0xhc3QgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmxhc3RWYWx1ZSA9IGlucHV0O1xuICAgIHJldHVybiBzYW1lQXNMYXN0ID8gcmVzdWx0IDogdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KTtcbiAgfTtcblxuICByZXR1cm4gWERyb3BSZXBlYXRzV2l0aDtcbn0oKTtcblxudmFyIF94ZHJvcFJlcGVhdHNXaXRoID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gX3hkcm9wUmVwZWF0c1dpdGgocHJlZCwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYRHJvcFJlcGVhdHNXaXRoKHByZWQsIHhmKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfeGRyb3BSZXBlYXRzV2l0aDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTInKTtcblxudmFyIF94ZkJhc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cbnZhciBYRHJvcFdoaWxlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBYRHJvcFdoaWxlKGYsIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuZiA9IGY7XG4gIH1cbiAgWERyb3BXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhEcm9wV2hpbGUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgWERyb3BXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIGlmICh0aGlzLmYpIHtcbiAgICAgIGlmICh0aGlzLmYoaW5wdXQpKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICB0aGlzLmYgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KTtcbiAgfTtcblxuICByZXR1cm4gWERyb3BXaGlsZTtcbn0oKTtcblxudmFyIF94ZHJvcFdoaWxlID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gX3hkcm9wV2hpbGUoZiwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYRHJvcFdoaWxlKGYsIHhmKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfeGRyb3BXaGlsZTsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvaW5pdCddKCk7XG4gIH0sXG4gIHJlc3VsdDogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgfVxufTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTInKTtcblxudmFyIF94ZkJhc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cbnZhciBYRmlsdGVyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBYRmlsdGVyKGYsIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuZiA9IGY7XG4gIH1cbiAgWEZpbHRlci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhGaWx0ZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgWEZpbHRlci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmYoaW5wdXQpID8gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KSA6IHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gWEZpbHRlcjtcbn0oKTtcblxudmFyIF94ZmlsdGVyID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gX3hmaWx0ZXIoZiwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYRmlsdGVyKGYsIHhmKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfeGZpbHRlcjsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTInKTtcblxudmFyIF9yZWR1Y2VkID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3JlZHVjZWQnKTtcblxudmFyIF94ZkJhc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cbnZhciBYRmluZCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gWEZpbmQoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgICB0aGlzLmZvdW5kID0gZmFsc2U7XG4gIH1cbiAgWEZpbmQucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYRmluZC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICBpZiAoIXRoaXMuZm91bmQpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB2b2lkIDApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gIH07XG4gIFhGaW5kLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgaWYgKHRoaXMuZihpbnB1dCkpIHtcbiAgICAgIHRoaXMuZm91bmQgPSB0cnVlO1xuICAgICAgcmVzdWx0ID0gX3JlZHVjZWQodGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgcmV0dXJuIFhGaW5kO1xufSgpO1xuXG52YXIgX3hmaW5kID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gX3hmaW5kKGYsIHhmKSB7XG4gIHJldHVybiBuZXcgWEZpbmQoZiwgeGYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF94ZmluZDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTInKTtcblxudmFyIF9yZWR1Y2VkID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3JlZHVjZWQnKTtcblxudmFyIF94ZkJhc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cbnZhciBYRmluZEluZGV4ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBYRmluZEluZGV4KGYsIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuZiA9IGY7XG4gICAgdGhpcy5pZHggPSAtMTtcbiAgICB0aGlzLmZvdW5kID0gZmFsc2U7XG4gIH1cbiAgWEZpbmRJbmRleC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhGaW5kSW5kZXgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgaWYgKCF0aGlzLmZvdW5kKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgLTEpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gIH07XG4gIFhGaW5kSW5kZXgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICB0aGlzLmlkeCArPSAxO1xuICAgIGlmICh0aGlzLmYoaW5wdXQpKSB7XG4gICAgICB0aGlzLmZvdW5kID0gdHJ1ZTtcbiAgICAgIHJlc3VsdCA9IF9yZWR1Y2VkKHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0aGlzLmlkeCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiBYRmluZEluZGV4O1xufSgpO1xuXG52YXIgX3hmaW5kSW5kZXggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeGZpbmRJbmRleChmLCB4Zikge1xuICByZXR1cm4gbmV3IFhGaW5kSW5kZXgoZiwgeGYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF94ZmluZEluZGV4OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhGaW5kTGFzdCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gWEZpbmRMYXN0KGYsIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuZiA9IGY7XG4gIH1cbiAgWEZpbmRMYXN0LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWEZpbmRMYXN0LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10odGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMubGFzdCkpO1xuICB9O1xuICBYRmluZExhc3QucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICBpZiAodGhpcy5mKGlucHV0KSkge1xuICAgICAgdGhpcy5sYXN0ID0gaW5wdXQ7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgcmV0dXJuIFhGaW5kTGFzdDtcbn0oKTtcblxudmFyIF94ZmluZExhc3QgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeGZpbmRMYXN0KGYsIHhmKSB7XG4gIHJldHVybiBuZXcgWEZpbmRMYXN0KGYsIHhmKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfeGZpbmRMYXN0OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhGaW5kTGFzdEluZGV4ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBYRmluZExhc3RJbmRleChmLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLmYgPSBmO1xuICAgIHRoaXMuaWR4ID0gLTE7XG4gICAgdGhpcy5sYXN0SWR4ID0gLTE7XG4gIH1cbiAgWEZpbmRMYXN0SW5kZXgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYRmluZExhc3RJbmRleC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0aGlzLmxhc3RJZHgpKTtcbiAgfTtcbiAgWEZpbmRMYXN0SW5kZXgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICB0aGlzLmlkeCArPSAxO1xuICAgIGlmICh0aGlzLmYoaW5wdXQpKSB7XG4gICAgICB0aGlzLmxhc3RJZHggPSB0aGlzLmlkeDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gWEZpbmRMYXN0SW5kZXg7XG59KCk7XG5cbnZhciBfeGZpbmRMYXN0SW5kZXggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeGZpbmRMYXN0SW5kZXgoZiwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYRmluZExhc3RJbmRleChmLCB4Zik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX3hmaW5kTGFzdEluZGV4OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhNYXAgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIFhNYXAoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgfVxuICBYTWFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWE1hcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICBYTWFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0aGlzLmYoaW5wdXQpKTtcbiAgfTtcblxuICByZXR1cm4gWE1hcDtcbn0oKTtcblxudmFyIF94bWFwID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gX3htYXAoZiwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYTWFwKGYsIHhmKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfeG1hcDsiLCJ2YXIgX2N1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeU4nKTtcblxudmFyIF9oYXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faGFzJyk7XG5cbnZhciBfeGZCYXNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3hmQmFzZScpO1xuXG52YXIgWFJlZHVjZUJ5ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBYUmVkdWNlQnkodmFsdWVGbiwgdmFsdWVBY2MsIGtleUZuLCB4Zikge1xuICAgIHRoaXMudmFsdWVGbiA9IHZhbHVlRm47XG4gICAgdGhpcy52YWx1ZUFjYyA9IHZhbHVlQWNjO1xuICAgIHRoaXMua2V5Rm4gPSBrZXlGbjtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5pbnB1dHMgPSB7fTtcbiAgfVxuICBYUmVkdWNlQnkucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYUmVkdWNlQnkucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgdmFyIGtleTtcbiAgICBmb3IgKGtleSBpbiB0aGlzLmlucHV0cykge1xuICAgICAgaWYgKF9oYXMoa2V5LCB0aGlzLmlucHV0cykpIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMuaW5wdXRzW2tleV0pO1xuICAgICAgICBpZiAocmVzdWx0WydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKSB7XG4gICAgICAgICAgcmVzdWx0ID0gcmVzdWx0WydAQHRyYW5zZHVjZXIvdmFsdWUnXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmlucHV0cyA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICB9O1xuICBYUmVkdWNlQnkucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICB2YXIga2V5ID0gdGhpcy5rZXlGbihpbnB1dCk7XG4gICAgdGhpcy5pbnB1dHNba2V5XSA9IHRoaXMuaW5wdXRzW2tleV0gfHwgW2tleSwgdGhpcy52YWx1ZUFjY107XG4gICAgdGhpcy5pbnB1dHNba2V5XVsxXSA9IHRoaXMudmFsdWVGbih0aGlzLmlucHV0c1trZXldWzFdLCBpbnB1dCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gWFJlZHVjZUJ5O1xufSgpO1xuXG52YXIgX3hyZWR1Y2VCeSA9IC8qI19fUFVSRV9fKi9fY3VycnlOKDQsIFtdLCBmdW5jdGlvbiBfeHJlZHVjZUJ5KHZhbHVlRm4sIHZhbHVlQWNjLCBrZXlGbiwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYUmVkdWNlQnkodmFsdWVGbiwgdmFsdWVBY2MsIGtleUZuLCB4Zik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX3hyZWR1Y2VCeTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTInKTtcblxudmFyIF9yZWR1Y2VkID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3JlZHVjZWQnKTtcblxudmFyIF94ZkJhc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cbnZhciBYVGFrZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gWFRha2UobiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5uID0gbjtcbiAgICB0aGlzLmkgPSAwO1xuICB9XG4gIFhUYWtlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWFRha2UucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgWFRha2UucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICB0aGlzLmkgKz0gMTtcbiAgICB2YXIgcmV0ID0gdGhpcy5uID09PSAwID8gcmVzdWx0IDogdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KTtcbiAgICByZXR1cm4gdGhpcy5uID49IDAgJiYgdGhpcy5pID49IHRoaXMubiA/IF9yZWR1Y2VkKHJldCkgOiByZXQ7XG4gIH07XG5cbiAgcmV0dXJuIFhUYWtlO1xufSgpO1xuXG52YXIgX3h0YWtlID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gX3h0YWtlKG4sIHhmKSB7XG4gIHJldHVybiBuZXcgWFRha2UobiwgeGYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF94dGFrZTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTInKTtcblxudmFyIF9yZWR1Y2VkID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3JlZHVjZWQnKTtcblxudmFyIF94ZkJhc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cbnZhciBYVGFrZVdoaWxlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBYVGFrZVdoaWxlKGYsIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuZiA9IGY7XG4gIH1cbiAgWFRha2VXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhUYWtlV2hpbGUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgWFRha2VXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmYoaW5wdXQpID8gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KSA6IF9yZWR1Y2VkKHJlc3VsdCk7XG4gIH07XG5cbiAgcmV0dXJuIFhUYWtlV2hpbGU7XG59KCk7XG5cbnZhciBfeHRha2VXaGlsZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIF94dGFrZVdoaWxlKGYsIHhmKSB7XG4gIHJldHVybiBuZXcgWFRha2VXaGlsZShmLCB4Zik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX3h0YWtlV2hpbGU7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkyJyk7XG5cbnZhciBfeGZCYXNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3hmQmFzZScpO1xuXG52YXIgWFRhcCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gWFRhcChmLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLmYgPSBmO1xuICB9XG4gIFhUYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYVGFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gX3hmQmFzZS5yZXN1bHQ7XG4gIFhUYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICB0aGlzLmYoaW5wdXQpO1xuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpO1xuICB9O1xuXG4gIHJldHVybiBYVGFwO1xufSgpO1xuXG52YXIgX3h0YXAgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeHRhcChmLCB4Zikge1xuICByZXR1cm4gbmV3IFhUYXAoZiwgeGYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF94dGFwOyIsInZhciBYV3JhcCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFhXcmFwKGZuKSB7XG4gICAgdGhpcy5mID0gZm47XG4gIH1cbiAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gZnVuY3Rpb24gKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdCBub3QgaW1wbGVtZW50ZWQgb24gWFdyYXAnKTtcbiAgfTtcbiAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAoYWNjKSB7XG4gICAgcmV0dXJuIGFjYztcbiAgfTtcbiAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKGFjYywgeCkge1xuICAgIHJldHVybiB0aGlzLmYoYWNjLCB4KTtcbiAgfTtcblxuICByZXR1cm4gWFdyYXA7XG59KCk7XG5cbmZ1bmN0aW9uIF94d3JhcChmbikge1xuICByZXR1cm4gbmV3IFhXcmFwKGZuKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX3h3cmFwOyIsInZhciBfY29udGFpbnMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29udGFpbnMnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfZmlsdGVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2ZpbHRlcicpO1xuXG52YXIgZmxpcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ZsaXAnKTtcblxudmFyIHVuaXEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi91bmlxJyk7XG5cbi8qKlxuICogQ29tYmluZXMgdHdvIGxpc3RzIGludG8gYSBzZXQgKGkuZS4gbm8gZHVwbGljYXRlcykgY29tcG9zZWQgb2YgdGhvc2VcbiAqIGVsZW1lbnRzIGNvbW1vbiB0byBib3RoIGxpc3RzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIFsqXSAtPiBbKl0gLT4gWypdXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MSBUaGUgZmlyc3QgbGlzdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QyIFRoZSBzZWNvbmQgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBvZiBlbGVtZW50cyBmb3VuZCBpbiBib3RoIGBsaXN0MWAgYW5kIGBsaXN0MmAuXG4gKiBAc2VlIFIuaW5uZXJKb2luXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5pbnRlcnNlY3Rpb24oWzEsMiwzLDRdLCBbNyw2LDUsNCwzXSk7IC8vPT4gWzQsIDNdXG4gKi9cblxuXG52YXIgaW50ZXJzZWN0aW9uID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gaW50ZXJzZWN0aW9uKGxpc3QxLCBsaXN0Mikge1xuICB2YXIgbG9va3VwTGlzdCwgZmlsdGVyZWRMaXN0O1xuICBpZiAobGlzdDEubGVuZ3RoID4gbGlzdDIubGVuZ3RoKSB7XG4gICAgbG9va3VwTGlzdCA9IGxpc3QxO1xuICAgIGZpbHRlcmVkTGlzdCA9IGxpc3QyO1xuICB9IGVsc2Uge1xuICAgIGxvb2t1cExpc3QgPSBsaXN0MjtcbiAgICBmaWx0ZXJlZExpc3QgPSBsaXN0MTtcbiAgfVxuICByZXR1cm4gdW5pcShfZmlsdGVyKGZsaXAoX2NvbnRhaW5zKShsb29rdXBMaXN0KSwgZmlsdGVyZWRMaXN0KSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gaW50ZXJzZWN0aW9uOyIsInZhciBfY2hlY2tGb3JNZXRob2QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY2hlY2tGb3JNZXRob2QnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBsaXN0IHdpdGggdGhlIHNlcGFyYXRvciBpbnRlcnBvc2VkIGJldHdlZW4gZWxlbWVudHMuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYGludGVyc3BlcnNlYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNC4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBhIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7Kn0gc2VwYXJhdG9yIFRoZSBlbGVtZW50IHRvIGFkZCB0byB0aGUgbGlzdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gYmUgaW50ZXJwb3NlZC5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbmV3IGxpc3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5pbnRlcnNwZXJzZSgnbicsIFsnYmEnLCAnYScsICdhJ10pOyAvLz0+IFsnYmEnLCAnbicsICdhJywgJ24nLCAnYSddXG4gKi9cblxuXG52YXIgaW50ZXJzcGVyc2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MiggLyojX19QVVJFX18qL19jaGVja0Zvck1ldGhvZCgnaW50ZXJzcGVyc2UnLCBmdW5jdGlvbiBpbnRlcnNwZXJzZShzZXBhcmF0b3IsIGxpc3QpIHtcbiAgdmFyIG91dCA9IFtdO1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICB3aGlsZSAoaWR4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGlkeCA9PT0gbGVuZ3RoIC0gMSkge1xuICAgICAgb3V0LnB1c2gobGlzdFtpZHhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0LnB1c2gobGlzdFtpZHhdLCBzZXBhcmF0b3IpO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gb3V0O1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBpbnRlcnNwZXJzZTsiLCJ2YXIgX2Nsb25lID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Nsb25lJyk7XG5cbnZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgX2lzVHJhbnNmb3JtZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNUcmFuc2Zvcm1lcicpO1xuXG52YXIgX3JlZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2UnKTtcblxudmFyIF9zdGVwQ2F0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3N0ZXBDYXQnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSBpdGVtcyBvZiB0aGUgbGlzdCB3aXRoIHRoZSB0cmFuc2R1Y2VyIGFuZCBhcHBlbmRzIHRoZVxuICogdHJhbnNmb3JtZWQgaXRlbXMgdG8gdGhlIGFjY3VtdWxhdG9yIHVzaW5nIGFuIGFwcHJvcHJpYXRlIGl0ZXJhdG9yIGZ1bmN0aW9uXG4gKiBiYXNlZCBvbiB0aGUgYWNjdW11bGF0b3IgdHlwZS5cbiAqXG4gKiBUaGUgYWNjdW11bGF0b3IgY2FuIGJlIGFuIGFycmF5LCBzdHJpbmcsIG9iamVjdCBvciBhIHRyYW5zZm9ybWVyLiBJdGVyYXRlZFxuICogaXRlbXMgd2lsbCBiZSBhcHBlbmRlZCB0byBhcnJheXMgYW5kIGNvbmNhdGVuYXRlZCB0byBzdHJpbmdzLiBPYmplY3RzIHdpbGxcbiAqIGJlIG1lcmdlZCBkaXJlY3RseSBvciAyLWl0ZW0gYXJyYXlzIHdpbGwgYmUgbWVyZ2VkIGFzIGtleSwgdmFsdWUgcGFpcnMuXG4gKlxuICogVGhlIGFjY3VtdWxhdG9yIGNhbiBhbHNvIGJlIGEgdHJhbnNmb3JtZXIgb2JqZWN0IHRoYXQgcHJvdmlkZXMgYSAyLWFyaXR5XG4gKiByZWR1Y2luZyBpdGVyYXRvciBmdW5jdGlvbiwgc3RlcCwgMC1hcml0eSBpbml0aWFsIHZhbHVlIGZ1bmN0aW9uLCBpbml0LCBhbmRcbiAqIDEtYXJpdHkgcmVzdWx0IGV4dHJhY3Rpb24gZnVuY3Rpb24gcmVzdWx0LiBUaGUgc3RlcCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZVxuICogaXRlcmF0b3IgZnVuY3Rpb24gaW4gcmVkdWNlLiBUaGUgcmVzdWx0IGZ1bmN0aW9uIGlzIHVzZWQgdG8gY29udmVydCB0aGVcbiAqIGZpbmFsIGFjY3VtdWxhdG9yIGludG8gdGhlIHJldHVybiB0eXBlIGFuZCBpbiBtb3N0IGNhc2VzIGlzIFIuaWRlbnRpdHkuIFRoZVxuICogaW5pdCBmdW5jdGlvbiBpcyB1c2VkIHRvIHByb3ZpZGUgdGhlIGluaXRpYWwgYWNjdW11bGF0b3IuXG4gKlxuICogVGhlIGl0ZXJhdGlvbiBpcyBwZXJmb3JtZWQgd2l0aCBbYFIucmVkdWNlYF0oI3JlZHVjZSkgYWZ0ZXIgaW5pdGlhbGl6aW5nIHRoZVxuICogdHJhbnNkdWNlci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMi4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBhIC0+IChiIC0+IGIpIC0+IFtjXSAtPiBhXG4gKiBAcGFyYW0geyp9IGFjYyBUaGUgaW5pdGlhbCBhY2N1bXVsYXRvciB2YWx1ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHhmIFRoZSB0cmFuc2R1Y2VyIGZ1bmN0aW9uLiBSZWNlaXZlcyBhIHRyYW5zZm9ybWVyIGFuZCByZXR1cm5zIGEgdHJhbnNmb3JtZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4geyp9IFRoZSBmaW5hbCwgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG51bWJlcnMgPSBbMSwgMiwgMywgNF07XG4gKiAgICAgIHZhciB0cmFuc2R1Y2VyID0gUi5jb21wb3NlKFIubWFwKFIuYWRkKDEpKSwgUi50YWtlKDIpKTtcbiAqXG4gKiAgICAgIFIuaW50byhbXSwgdHJhbnNkdWNlciwgbnVtYmVycyk7IC8vPT4gWzIsIDNdXG4gKlxuICogICAgICB2YXIgaW50b0FycmF5ID0gUi5pbnRvKFtdKTtcbiAqICAgICAgaW50b0FycmF5KHRyYW5zZHVjZXIsIG51bWJlcnMpOyAvLz0+IFsyLCAzXVxuICovXG5cblxudmFyIGludG8gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBpbnRvKGFjYywgeGYsIGxpc3QpIHtcbiAgcmV0dXJuIF9pc1RyYW5zZm9ybWVyKGFjYykgPyBfcmVkdWNlKHhmKGFjYyksIGFjY1snQEB0cmFuc2R1Y2VyL2luaXQnXSgpLCBsaXN0KSA6IF9yZWR1Y2UoeGYoX3N0ZXBDYXQoYWNjKSksIF9jbG9uZShhY2MsIFtdLCBbXSwgZmFsc2UpLCBsaXN0KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBpbnRvOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgX2hhcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19oYXMnKTtcblxudmFyIGtleXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKlxuICogU2FtZSBhcyBbYFIuaW52ZXJ0T2JqYF0oI2ludmVydE9iaiksIGhvd2V2ZXIgdGhpcyBhY2NvdW50cyBmb3Igb2JqZWN0cyB3aXRoXG4gKiBkdXBsaWNhdGUgdmFsdWVzIGJ5IHB1dHRpbmcgdGhlIHZhbHVlcyBpbnRvIGFuIGFycmF5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7czogeH0gLT4ge3g6IFsgcywgLi4uIF19XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gaW52ZXJ0XG4gKiBAcmV0dXJuIHtPYmplY3R9IG91dCBBIG5ldyBvYmplY3Qgd2l0aCBrZXlzIGluIGFuIGFycmF5LlxuICogQHNlZSBSLmludmVydE9ialxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciByYWNlUmVzdWx0c0J5Rmlyc3ROYW1lID0ge1xuICogICAgICAgIGZpcnN0OiAnYWxpY2UnLFxuICogICAgICAgIHNlY29uZDogJ2pha2UnLFxuICogICAgICAgIHRoaXJkOiAnYWxpY2UnLFxuICogICAgICB9O1xuICogICAgICBSLmludmVydChyYWNlUmVzdWx0c0J5Rmlyc3ROYW1lKTtcbiAqICAgICAgLy89PiB7ICdhbGljZSc6IFsnZmlyc3QnLCAndGhpcmQnXSwgJ2pha2UnOlsnc2Vjb25kJ10gfVxuICovXG5cblxudmFyIGludmVydCA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGludmVydChvYmopIHtcbiAgdmFyIHByb3BzID0ga2V5cyhvYmopO1xuICB2YXIgbGVuID0gcHJvcHMubGVuZ3RoO1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIG91dCA9IHt9O1xuXG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaWR4XTtcbiAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgdmFyIGxpc3QgPSBfaGFzKHZhbCwgb3V0KSA/IG91dFt2YWxdIDogb3V0W3ZhbF0gPSBbXTtcbiAgICBsaXN0W2xpc3QubGVuZ3RoXSA9IGtleTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gb3V0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGludmVydDsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIGtleXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBvYmplY3Qgd2l0aCB0aGUga2V5cyBvZiB0aGUgZ2l2ZW4gb2JqZWN0IGFzIHZhbHVlcywgYW5kIHRoZVxuICogdmFsdWVzIG9mIHRoZSBnaXZlbiBvYmplY3QsIHdoaWNoIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MsIGFzIGtleXMuIE5vdGVcbiAqIHRoYXQgdGhlIGxhc3Qga2V5IGZvdW5kIGlzIHByZWZlcnJlZCB3aGVuIGhhbmRsaW5nIHRoZSBzYW1lIHZhbHVlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7czogeH0gLT4ge3g6IHN9XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gaW52ZXJ0XG4gKiBAcmV0dXJuIHtPYmplY3R9IG91dCBBIG5ldyBvYmplY3RcbiAqIEBzZWUgUi5pbnZlcnRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgcmFjZVJlc3VsdHMgPSB7XG4gKiAgICAgICAgZmlyc3Q6ICdhbGljZScsXG4gKiAgICAgICAgc2Vjb25kOiAnamFrZSdcbiAqICAgICAgfTtcbiAqICAgICAgUi5pbnZlcnRPYmoocmFjZVJlc3VsdHMpO1xuICogICAgICAvLz0+IHsgJ2FsaWNlJzogJ2ZpcnN0JywgJ2pha2UnOidzZWNvbmQnIH1cbiAqXG4gKiAgICAgIC8vIEFsdGVybmF0aXZlbHk6XG4gKiAgICAgIHZhciByYWNlUmVzdWx0cyA9IFsnYWxpY2UnLCAnamFrZSddO1xuICogICAgICBSLmludmVydE9iaihyYWNlUmVzdWx0cyk7XG4gKiAgICAgIC8vPT4geyAnYWxpY2UnOiAnMCcsICdqYWtlJzonMScgfVxuICovXG5cblxudmFyIGludmVydE9iaiA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGludmVydE9iaihvYmopIHtcbiAgdmFyIHByb3BzID0ga2V5cyhvYmopO1xuICB2YXIgbGVuID0gcHJvcHMubGVuZ3RoO1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIG91dCA9IHt9O1xuXG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaWR4XTtcbiAgICBvdXRbb2JqW2tleV1dID0ga2V5O1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBvdXQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gaW52ZXJ0T2JqOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2lzRnVuY3Rpb24gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNGdW5jdGlvbicpO1xuXG52YXIgY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY3VycnlOJyk7XG5cbnZhciB0b1N0cmluZyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKlxuICogVHVybnMgYSBuYW1lZCBtZXRob2Qgd2l0aCBhIHNwZWNpZmllZCBhcml0eSBpbnRvIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmVcbiAqIGNhbGxlZCBkaXJlY3RseSBzdXBwbGllZCB3aXRoIGFyZ3VtZW50cyBhbmQgYSB0YXJnZXQgb2JqZWN0LlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiBpcyBjdXJyaWVkIGFuZCBhY2NlcHRzIGBhcml0eSArIDFgIHBhcmFtZXRlcnMgd2hlcmVcbiAqIHRoZSBmaW5hbCBwYXJhbWV0ZXIgaXMgdGhlIHRhcmdldCBvYmplY3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+IFN0cmluZyAtPiAoYSAtPiBiIC0+IC4uLiAtPiBuIC0+IE9iamVjdCAtPiAqKVxuICogQHBhcmFtIHtOdW1iZXJ9IGFyaXR5IE51bWJlciBvZiBhcmd1bWVudHMgdGhlIHJldHVybmVkIGZ1bmN0aW9uIHNob3VsZCB0YWtlXG4gKiAgICAgICAgYmVmb3JlIHRoZSB0YXJnZXQgb2JqZWN0LlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBOYW1lIG9mIHRoZSBtZXRob2QgdG8gY2FsbC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmNvbnN0cnVjdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBzbGljZUZyb20gPSBSLmludm9rZXIoMSwgJ3NsaWNlJyk7XG4gKiAgICAgIHNsaWNlRnJvbSg2LCAnYWJjZGVmZ2hpamtsbScpOyAvLz0+ICdnaGlqa2xtJ1xuICogICAgICB2YXIgc2xpY2VGcm9tNiA9IFIuaW52b2tlcigyLCAnc2xpY2UnKSg2KTtcbiAqICAgICAgc2xpY2VGcm9tNig4LCAnYWJjZGVmZ2hpamtsbScpOyAvLz0+ICdnaCdcbiAqIEBzeW1iIFIuaW52b2tlcigwLCAnbWV0aG9kJykobykgPSBvWydtZXRob2QnXSgpXG4gKiBAc3ltYiBSLmludm9rZXIoMSwgJ21ldGhvZCcpKGEsIG8pID0gb1snbWV0aG9kJ10oYSlcbiAqIEBzeW1iIFIuaW52b2tlcigyLCAnbWV0aG9kJykoYSwgYiwgbykgPSBvWydtZXRob2QnXShhLCBiKVxuICovXG5cblxudmFyIGludm9rZXIgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBpbnZva2VyKGFyaXR5LCBtZXRob2QpIHtcbiAgcmV0dXJuIGN1cnJ5Tihhcml0eSArIDEsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzW2FyaXR5XTtcbiAgICBpZiAodGFyZ2V0ICE9IG51bGwgJiYgX2lzRnVuY3Rpb24odGFyZ2V0W21ldGhvZF0pKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0W21ldGhvZF0uYXBwbHkodGFyZ2V0LCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIGFyaXR5KSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IodG9TdHJpbmcodGFyZ2V0KSArICcgZG9lcyBub3QgaGF2ZSBhIG1ldGhvZCBuYW1lZCBcIicgKyBtZXRob2QgKyAnXCInKTtcbiAgfSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gaW52b2tlcjsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBTZWUgaWYgYW4gb2JqZWN0IChgdmFsYCkgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIHN1cHBsaWVkIGNvbnN0cnVjdG9yLiBUaGlzXG4gKiBmdW5jdGlvbiB3aWxsIGNoZWNrIHVwIHRoZSBpbmhlcml0YW5jZSBjaGFpbiwgaWYgYW55LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjMuMFxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBzaWcgKCogLT4geyp9KSAtPiBhIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjdG9yIEEgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaXMoT2JqZWN0LCB7fSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmlzKE51bWJlciwgMSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmlzKE9iamVjdCwgMSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5pcyhTdHJpbmcsICdzJyk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmlzKFN0cmluZywgbmV3IFN0cmluZygnJykpOyAvLz0+IHRydWVcbiAqICAgICAgUi5pcyhPYmplY3QsIG5ldyBTdHJpbmcoJycpKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaXMoT2JqZWN0LCAncycpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuaXMoTnVtYmVyLCB7fSk7IC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciBpcyA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGlzKEN0b3IsIHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBDdG9yIHx8IHZhbCBpbnN0YW5jZW9mIEN0b3I7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gaXM7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBlbXB0eSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2VtcHR5Jyk7XG5cbnZhciBlcXVhbHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9lcXVhbHMnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgaXRzIHR5cGUncyBlbXB0eSB2YWx1ZTsgYGZhbHNlYFxuICogb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnIGEgLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSB4XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLmVtcHR5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5pc0VtcHR5KFsxLCAyLCAzXSk7ICAgLy89PiBmYWxzZVxuICogICAgICBSLmlzRW1wdHkoW10pOyAgICAgICAgICAvLz0+IHRydWVcbiAqICAgICAgUi5pc0VtcHR5KCcnKTsgICAgICAgICAgLy89PiB0cnVlXG4gKiAgICAgIFIuaXNFbXB0eShudWxsKTsgICAgICAgIC8vPT4gZmFsc2VcbiAqICAgICAgUi5pc0VtcHR5KHt9KTsgICAgICAgICAgLy89PiB0cnVlXG4gKiAgICAgIFIuaXNFbXB0eSh7bGVuZ3RoOiAwfSk7IC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciBpc0VtcHR5ID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gaXNFbXB0eSh4KSB7XG4gIHJldHVybiB4ICE9IG51bGwgJiYgZXF1YWxzKHgsIGVtcHR5KHgpKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBpc0VtcHR5OyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgaW5wdXQgdmFsdWUgaXMgYG51bGxgIG9yIGB1bmRlZmluZWRgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBzaWcgKiAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IHggVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYHhgIGlzIGB1bmRlZmluZWRgIG9yIGBudWxsYCwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5pc05pbChudWxsKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaXNOaWwodW5kZWZpbmVkKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaXNOaWwoMCk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5pc05pbChbXSk7IC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciBpc05pbCA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGlzTmlsKHgpIHtcbiAgcmV0dXJuIHggPT0gbnVsbDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBpc05pbDsiLCJ2YXIgaW52b2tlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludm9rZXInKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIG1hZGUgYnkgaW5zZXJ0aW5nIHRoZSBgc2VwYXJhdG9yYCBiZXR3ZWVuIGVhY2ggZWxlbWVudCBhbmRcbiAqIGNvbmNhdGVuYXRpbmcgYWxsIHRoZSBlbGVtZW50cyBpbnRvIGEgc2luZ2xlIHN0cmluZy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFN0cmluZyAtPiBbYV0gLT4gU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IHNlcGFyYXRvciBUaGUgc3RyaW5nIHVzZWQgdG8gc2VwYXJhdGUgdGhlIGVsZW1lbnRzLlxuICogQHBhcmFtIHtBcnJheX0geHMgVGhlIGVsZW1lbnRzIHRvIGpvaW4gaW50byBhIHN0cmluZy5cbiAqIEByZXR1cm4ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgbWFkZSBieSBjb25jYXRlbmF0aW5nIGB4c2Agd2l0aCBgc2VwYXJhdG9yYC5cbiAqIEBzZWUgUi5zcGxpdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBzcGFjZXIgPSBSLmpvaW4oJyAnKTtcbiAqICAgICAgc3BhY2VyKFsnYScsIDIsIDMuNF0pOyAgIC8vPT4gJ2EgMiAzLjQnXG4gKiAgICAgIFIuam9pbignfCcsIFsxLCAyLCAzXSk7ICAgIC8vPT4gJzF8MnwzJ1xuICovXG5cblxudmFyIGpvaW4gPSAvKiNfX1BVUkVfXyovaW52b2tlcigxLCAnam9pbicpO1xubW9kdWxlLmV4cG9ydHMgPSBqb2luOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgY29udmVyZ2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb252ZXJnZScpO1xuXG4vKipcbiAqIGp1eHQgYXBwbGllcyBhIGxpc3Qgb2YgZnVuY3Rpb25zIHRvIGEgbGlzdCBvZiB2YWx1ZXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIFsoYSwgYiwgLi4uLCBtKSAtPiBuXSAtPiAoKGEsIGIsIC4uLiwgbSkgLT4gW25dKVxuICogQHBhcmFtIHtBcnJheX0gZm5zIEFuIGFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgbGlzdCBvZiB2YWx1ZXMgYWZ0ZXIgYXBwbHlpbmcgZWFjaCBvZiB0aGUgb3JpZ2luYWwgYGZuc2AgdG8gaXRzIHBhcmFtZXRlcnMuXG4gKiBAc2VlIFIuYXBwbHlTcGVjXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGdldFJhbmdlID0gUi5qdXh0KFtNYXRoLm1pbiwgTWF0aC5tYXhdKTtcbiAqICAgICAgZ2V0UmFuZ2UoMywgNCwgOSwgLTMpOyAvLz0+IFstMywgOV1cbiAqIEBzeW1iIFIuanV4dChbZiwgZywgaF0pKGEsIGIpID0gW2YoYSwgYiksIGcoYSwgYiksIGgoYSwgYildXG4gKi9cblxuXG52YXIganV4dCA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGp1eHQoZm5zKSB7XG4gIHJldHVybiBjb252ZXJnZShmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIH0sIGZucyk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0ganV4dDsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIF9oYXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faGFzJyk7XG5cbnZhciBfaXNBcmd1bWVudHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNBcmd1bWVudHMnKTtcblxuLy8gY292ZXIgSUUgPCA5IGtleXMgaXNzdWVzXG5cblxudmFyIGhhc0VudW1CdWcgPSAhIC8qI19fUFVSRV9fKi97IHRvU3RyaW5nOiBudWxsIH0ucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyk7XG52YXIgbm9uRW51bWVyYWJsZVByb3BzID0gWydjb25zdHJ1Y3RvcicsICd2YWx1ZU9mJywgJ2lzUHJvdG90eXBlT2YnLCAndG9TdHJpbmcnLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAnaGFzT3duUHJvcGVydHknLCAndG9Mb2NhbGVTdHJpbmcnXTtcbi8vIFNhZmFyaSBidWdcbnZhciBoYXNBcmdzRW51bUJ1ZyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICByZXR1cm4gYXJndW1lbnRzLnByb3BlcnR5SXNFbnVtZXJhYmxlKCdsZW5ndGgnKTtcbn0oKTtcblxudmFyIGNvbnRhaW5zID0gZnVuY3Rpb24gY29udGFpbnMobGlzdCwgaXRlbSkge1xuICB2YXIgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgaWYgKGxpc3RbaWR4XSA9PT0gaXRlbSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3QgY29udGFpbmluZyB0aGUgbmFtZXMgb2YgYWxsIHRoZSBlbnVtZXJhYmxlIG93biBwcm9wZXJ0aWVzIG9mXG4gKiB0aGUgc3VwcGxpZWQgb2JqZWN0LlxuICogTm90ZSB0aGF0IHRoZSBvcmRlciBvZiB0aGUgb3V0cHV0IGFycmF5IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGNvbnNpc3RlbnRcbiAqIGFjcm9zcyBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7azogdn0gLT4gW2tdXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gZXh0cmFjdCBwcm9wZXJ0aWVzIGZyb21cbiAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiB0aGUgb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMuXG4gKiBAc2VlIFIua2V5c0luLCBSLnZhbHVlc1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIua2V5cyh7YTogMSwgYjogMiwgYzogM30pOyAvLz0+IFsnYScsICdiJywgJ2MnXVxuICovXG52YXIgX2tleXMgPSB0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbicgJiYgIWhhc0FyZ3NFbnVtQnVnID8gZnVuY3Rpb24ga2V5cyhvYmopIHtcbiAgcmV0dXJuIE9iamVjdChvYmopICE9PSBvYmogPyBbXSA6IE9iamVjdC5rZXlzKG9iaik7XG59IDogZnVuY3Rpb24ga2V5cyhvYmopIHtcbiAgaWYgKE9iamVjdChvYmopICE9PSBvYmopIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgdmFyIHByb3AsIG5JZHg7XG4gIHZhciBrcyA9IFtdO1xuICB2YXIgY2hlY2tBcmdzTGVuZ3RoID0gaGFzQXJnc0VudW1CdWcgJiYgX2lzQXJndW1lbnRzKG9iaik7XG4gIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICBpZiAoX2hhcyhwcm9wLCBvYmopICYmICghY2hlY2tBcmdzTGVuZ3RoIHx8IHByb3AgIT09ICdsZW5ndGgnKSkge1xuICAgICAga3Nba3MubGVuZ3RoXSA9IHByb3A7XG4gICAgfVxuICB9XG4gIGlmIChoYXNFbnVtQnVnKSB7XG4gICAgbklkeCA9IG5vbkVudW1lcmFibGVQcm9wcy5sZW5ndGggLSAxO1xuICAgIHdoaWxlIChuSWR4ID49IDApIHtcbiAgICAgIHByb3AgPSBub25FbnVtZXJhYmxlUHJvcHNbbklkeF07XG4gICAgICBpZiAoX2hhcyhwcm9wLCBvYmopICYmICFjb250YWlucyhrcywgcHJvcCkpIHtcbiAgICAgICAga3Nba3MubGVuZ3RoXSA9IHByb3A7XG4gICAgICB9XG4gICAgICBuSWR4IC09IDE7XG4gICAgfVxuICB9XG4gIHJldHVybiBrcztcbn07XG52YXIga2V5cyA9IC8qI19fUFVSRV9fKi9fY3VycnkxKF9rZXlzKTtcbm1vZHVsZS5leHBvcnRzID0ga2V5czsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBjb250YWluaW5nIHRoZSBuYW1lcyBvZiBhbGwgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHN1cHBsaWVkXG4gKiBvYmplY3QsIGluY2x1ZGluZyBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgdGhlIG91dHB1dCBhcnJheSBpcyBub3QgZ3VhcmFudGVlZCB0byBiZSBjb25zaXN0ZW50XG4gKiBhY3Jvc3MgZGlmZmVyZW50IEpTIHBsYXRmb3Jtcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcge2s6IHZ9IC0+IFtrXVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGV4dHJhY3QgcHJvcGVydGllcyBmcm9tXG4gKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2YgdGhlIG9iamVjdCdzIG93biBhbmQgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKiBAc2VlIFIua2V5cywgUi52YWx1ZXNJblxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBGID0gZnVuY3Rpb24oKSB7IHRoaXMueCA9ICdYJzsgfTtcbiAqICAgICAgRi5wcm90b3R5cGUueSA9ICdZJztcbiAqICAgICAgdmFyIGYgPSBuZXcgRigpO1xuICogICAgICBSLmtleXNJbihmKTsgLy89PiBbJ3gnLCAneSddXG4gKi9cblxuXG52YXIga2V5c0luID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24ga2V5c0luKG9iaikge1xuICB2YXIgcHJvcDtcbiAgdmFyIGtzID0gW107XG4gIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICBrc1trcy5sZW5ndGhdID0gcHJvcDtcbiAgfVxuICByZXR1cm4ga3M7XG59KTtcbm1vZHVsZS5leHBvcnRzID0ga2V5c0luOyIsInZhciBudGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9udGgnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgb2YgdGhlIGdpdmVuIGxpc3Qgb3Igc3RyaW5nLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuNFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IGEgfCBVbmRlZmluZWRcbiAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHsqfSBsaXN0XG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLmluaXQsIFIuaGVhZCwgUi50YWlsXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5sYXN0KFsnZmknLCAnZm8nLCAnZnVtJ10pOyAvLz0+ICdmdW0nXG4gKiAgICAgIFIubGFzdChbXSk7IC8vPT4gdW5kZWZpbmVkXG4gKlxuICogICAgICBSLmxhc3QoJ2FiYycpOyAvLz0+ICdjJ1xuICogICAgICBSLmxhc3QoJycpOyAvLz0+ICcnXG4gKi9cblxuXG52YXIgbGFzdCA9IC8qI19fUFVSRV9fKi9udGgoLTEpO1xubW9kdWxlLmV4cG9ydHMgPSBsYXN0OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2lzQXJyYXkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNBcnJheScpO1xuXG52YXIgZXF1YWxzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZXF1YWxzJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiBhbiBpdGVtIGluIGFuIGFycmF5LCBvciAtMSBpZlxuICogdGhlIGl0ZW0gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBhcnJheS4gW2BSLmVxdWFsc2BdKCNlcXVhbHMpIGlzIHVzZWQgdG9cbiAqIGRldGVybWluZSBlcXVhbGl0eS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIGEgLT4gW2FdIC0+IE51bWJlclxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIGl0ZW0gdG8gZmluZC5cbiAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBhcnJheSB0byBzZWFyY2ggaW4uXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBpbmRleCBvZiB0aGUgdGFyZ2V0LCBvciAtMSBpZiB0aGUgdGFyZ2V0IGlzIG5vdCBmb3VuZC5cbiAqIEBzZWUgUi5pbmRleE9mXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5sYXN0SW5kZXhPZigzLCBbLTEsMywzLDAsMSwyLDMsNF0pOyAvLz0+IDZcbiAqICAgICAgUi5sYXN0SW5kZXhPZigxMCwgWzEsMiwzLDRdKTsgLy89PiAtMVxuICovXG5cblxudmFyIGxhc3RJbmRleE9mID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gbGFzdEluZGV4T2YodGFyZ2V0LCB4cykge1xuICBpZiAodHlwZW9mIHhzLmxhc3RJbmRleE9mID09PSAnZnVuY3Rpb24nICYmICFfaXNBcnJheSh4cykpIHtcbiAgICByZXR1cm4geHMubGFzdEluZGV4T2YodGFyZ2V0KTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaWR4ID0geHMubGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICAgIGlmIChlcXVhbHMoeHNbaWR4XSwgdGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gaWR4O1xuICAgICAgfVxuICAgICAgaWR4IC09IDE7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGxhc3RJbmRleE9mOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgX2lzTnVtYmVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzTnVtYmVyJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBhcnJheSBieSByZXR1cm5pbmcgYGxpc3QubGVuZ3RoYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4zLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFthXSAtPiBOdW1iZXJcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBsZW5ndGggb2YgdGhlIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubGVuZ3RoKFtdKTsgLy89PiAwXG4gKiAgICAgIFIubGVuZ3RoKFsxLCAyLCAzXSk7IC8vPT4gM1xuICovXG5cblxudmFyIGxlbmd0aCA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGxlbmd0aChsaXN0KSB7XG4gIHJldHVybiBsaXN0ICE9IG51bGwgJiYgX2lzTnVtYmVyKGxpc3QubGVuZ3RoKSA/IGxpc3QubGVuZ3RoIDogTmFOO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGxlbmd0aDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIG1hcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21hcCcpO1xuXG4vKipcbiAqIFJldHVybnMgYSBsZW5zIGZvciB0aGUgZ2l2ZW4gZ2V0dGVyIGFuZCBzZXR0ZXIgZnVuY3Rpb25zLiBUaGUgZ2V0dGVyIFwiZ2V0c1wiXG4gKiB0aGUgdmFsdWUgb2YgdGhlIGZvY3VzOyB0aGUgc2V0dGVyIFwic2V0c1wiIHRoZSB2YWx1ZSBvZiB0aGUgZm9jdXMuIFRoZSBzZXR0ZXJcbiAqIHNob3VsZCBub3QgbXV0YXRlIHRoZSBkYXRhIHN0cnVjdHVyZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBMZW5zIHMgYSA9IEZ1bmN0b3IgZiA9PiAoYSAtPiBmIGEpIC0+IHMgLT4gZiBzXG4gKiBAc2lnIChzIC0+IGEpIC0+ICgoYSwgcykgLT4gcykgLT4gTGVucyBzIGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGdldHRlclxuICogQHBhcmFtIHtGdW5jdGlvbn0gc2V0dGVyXG4gKiBAcmV0dXJuIHtMZW5zfVxuICogQHNlZSBSLnZpZXcsIFIuc2V0LCBSLm92ZXIsIFIubGVuc0luZGV4LCBSLmxlbnNQcm9wXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHhMZW5zID0gUi5sZW5zKFIucHJvcCgneCcpLCBSLmFzc29jKCd4JykpO1xuICpcbiAqICAgICAgUi52aWV3KHhMZW5zLCB7eDogMSwgeTogMn0pOyAgICAgICAgICAgIC8vPT4gMVxuICogICAgICBSLnNldCh4TGVucywgNCwge3g6IDEsIHk6IDJ9KTsgICAgICAgICAgLy89PiB7eDogNCwgeTogMn1cbiAqICAgICAgUi5vdmVyKHhMZW5zLCBSLm5lZ2F0ZSwge3g6IDEsIHk6IDJ9KTsgIC8vPT4ge3g6IC0xLCB5OiAyfVxuICovXG5cblxudmFyIGxlbnMgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBsZW5zKGdldHRlciwgc2V0dGVyKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodG9GdW5jdG9yRm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgcmV0dXJuIG1hcChmdW5jdGlvbiAoZm9jdXMpIHtcbiAgICAgICAgcmV0dXJuIHNldHRlcihmb2N1cywgdGFyZ2V0KTtcbiAgICAgIH0sIHRvRnVuY3RvckZuKGdldHRlcih0YXJnZXQpKSk7XG4gICAgfTtcbiAgfTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBsZW5zOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgbGVucyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2xlbnMnKTtcblxudmFyIG50aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL250aCcpO1xuXG52YXIgdXBkYXRlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdXBkYXRlJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIGxlbnMgd2hvc2UgZm9jdXMgaXMgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAdHlwZWRlZm4gTGVucyBzIGEgPSBGdW5jdG9yIGYgPT4gKGEgLT4gZiBhKSAtPiBzIC0+IGYgc1xuICogQHNpZyBOdW1iZXIgLT4gTGVucyBzIGFcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcmV0dXJuIHtMZW5zfVxuICogQHNlZSBSLnZpZXcsIFIuc2V0LCBSLm92ZXJcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaGVhZExlbnMgPSBSLmxlbnNJbmRleCgwKTtcbiAqXG4gKiAgICAgIFIudmlldyhoZWFkTGVucywgWydhJywgJ2InLCAnYyddKTsgICAgICAgICAgICAvLz0+ICdhJ1xuICogICAgICBSLnNldChoZWFkTGVucywgJ3gnLCBbJ2EnLCAnYicsICdjJ10pOyAgICAgICAgLy89PiBbJ3gnLCAnYicsICdjJ11cbiAqICAgICAgUi5vdmVyKGhlYWRMZW5zLCBSLnRvVXBwZXIsIFsnYScsICdiJywgJ2MnXSk7IC8vPT4gWydBJywgJ2InLCAnYyddXG4gKi9cblxuXG52YXIgbGVuc0luZGV4ID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gbGVuc0luZGV4KG4pIHtcbiAgcmV0dXJuIGxlbnMobnRoKG4pLCB1cGRhdGUobikpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGxlbnNJbmRleDsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIGFzc29jUGF0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2Fzc29jUGF0aCcpO1xuXG52YXIgbGVucyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2xlbnMnKTtcblxudmFyIHBhdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wYXRoJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIGxlbnMgd2hvc2UgZm9jdXMgaXMgdGhlIHNwZWNpZmllZCBwYXRoLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE5LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBJZHggPSBTdHJpbmcgfCBJbnRcbiAqIEB0eXBlZGVmbiBMZW5zIHMgYSA9IEZ1bmN0b3IgZiA9PiAoYSAtPiBmIGEpIC0+IHMgLT4gZiBzXG4gKiBAc2lnIFtJZHhdIC0+IExlbnMgcyBhXG4gKiBAcGFyYW0ge0FycmF5fSBwYXRoIFRoZSBwYXRoIHRvIHVzZS5cbiAqIEByZXR1cm4ge0xlbnN9XG4gKiBAc2VlIFIudmlldywgUi5zZXQsIFIub3ZlclxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB4SGVhZFlMZW5zID0gUi5sZW5zUGF0aChbJ3gnLCAwLCAneSddKTtcbiAqXG4gKiAgICAgIFIudmlldyh4SGVhZFlMZW5zLCB7eDogW3t5OiAyLCB6OiAzfSwge3k6IDQsIHo6IDV9XX0pO1xuICogICAgICAvLz0+IDJcbiAqICAgICAgUi5zZXQoeEhlYWRZTGVucywgMSwge3g6IFt7eTogMiwgejogM30sIHt5OiA0LCB6OiA1fV19KTtcbiAqICAgICAgLy89PiB7eDogW3t5OiAxLCB6OiAzfSwge3k6IDQsIHo6IDV9XX1cbiAqICAgICAgUi5vdmVyKHhIZWFkWUxlbnMsIFIubmVnYXRlLCB7eDogW3t5OiAyLCB6OiAzfSwge3k6IDQsIHo6IDV9XX0pO1xuICogICAgICAvLz0+IHt4OiBbe3k6IC0yLCB6OiAzfSwge3k6IDQsIHo6IDV9XX1cbiAqL1xuXG5cbnZhciBsZW5zUGF0aCA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGxlbnNQYXRoKHApIHtcbiAgcmV0dXJuIGxlbnMocGF0aChwKSwgYXNzb2NQYXRoKHApKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBsZW5zUGF0aDsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIGFzc29jID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYXNzb2MnKTtcblxudmFyIGxlbnMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9sZW5zJyk7XG5cbnZhciBwcm9wID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcHJvcCcpO1xuXG4vKipcbiAqIFJldHVybnMgYSBsZW5zIHdob3NlIGZvY3VzIGlzIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHR5cGVkZWZuIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAqIEBzaWcgU3RyaW5nIC0+IExlbnMgcyBhXG4gKiBAcGFyYW0ge1N0cmluZ30ga1xuICogQHJldHVybiB7TGVuc31cbiAqIEBzZWUgUi52aWV3LCBSLnNldCwgUi5vdmVyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHhMZW5zID0gUi5sZW5zUHJvcCgneCcpO1xuICpcbiAqICAgICAgUi52aWV3KHhMZW5zLCB7eDogMSwgeTogMn0pOyAgICAgICAgICAgIC8vPT4gMVxuICogICAgICBSLnNldCh4TGVucywgNCwge3g6IDEsIHk6IDJ9KTsgICAgICAgICAgLy89PiB7eDogNCwgeTogMn1cbiAqICAgICAgUi5vdmVyKHhMZW5zLCBSLm5lZ2F0ZSwge3g6IDEsIHk6IDJ9KTsgIC8vPT4ge3g6IC0xLCB5OiAyfVxuICovXG5cblxudmFyIGxlbnNQcm9wID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gbGVuc1Byb3Aoaykge1xuICByZXR1cm4gbGVucyhwcm9wKGspLCBhc3NvYyhrKSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbGVuc1Byb3A7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBsaWZ0TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2xpZnROJyk7XG5cbi8qKlxuICogXCJsaWZ0c1wiIGEgZnVuY3Rpb24gb2YgYXJpdHkgPiAxIHNvIHRoYXQgaXQgbWF5IFwibWFwIG92ZXJcIiBhIGxpc3QsIEZ1bmN0aW9uIG9yIG90aGVyXG4gKiBvYmplY3QgdGhhdCBzYXRpc2ZpZXMgdGhlIFtGYW50YXN5TGFuZCBBcHBseSBzcGVjXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI2FwcGx5KS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC43LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKi4uLiAtPiAqKSAtPiAoWypdLi4uIC0+IFsqXSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBsaWZ0IGludG8gaGlnaGVyIGNvbnRleHRcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgbGlmdGVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmxpZnROXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG1hZGQzID0gUi5saWZ0KChhLCBiLCBjKSA9PiBhICsgYiArIGMpO1xuICpcbiAqICAgICAgbWFkZDMoWzEsMiwzXSwgWzEsMiwzXSwgWzFdKTsgLy89PiBbMywgNCwgNSwgNCwgNSwgNiwgNSwgNiwgN11cbiAqXG4gKiAgICAgIHZhciBtYWRkNSA9IFIubGlmdCgoYSwgYiwgYywgZCwgZSkgPT4gYSArIGIgKyBjICsgZCArIGUpO1xuICpcbiAqICAgICAgbWFkZDUoWzEsMl0sIFszXSwgWzQsIDVdLCBbNl0sIFs3LCA4XSk7IC8vPT4gWzIxLCAyMiwgMjIsIDIzLCAyMiwgMjMsIDIzLCAyNF1cbiAqL1xuXG5cbnZhciBsaWZ0ID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gbGlmdChmbikge1xuICByZXR1cm4gbGlmdE4oZm4ubGVuZ3RoLCBmbik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbGlmdDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9yZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fcmVkdWNlJyk7XG5cbnZhciBhcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2FwJyk7XG5cbnZhciBjdXJyeU4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jdXJyeU4nKTtcblxudmFyIG1hcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21hcCcpO1xuXG4vKipcbiAqIFwibGlmdHNcIiBhIGZ1bmN0aW9uIHRvIGJlIHRoZSBzcGVjaWZpZWQgYXJpdHksIHNvIHRoYXQgaXQgbWF5IFwibWFwIG92ZXJcIiB0aGF0XG4gKiBtYW55IGxpc3RzLCBGdW5jdGlvbnMgb3Igb3RoZXIgb2JqZWN0cyB0aGF0IHNhdGlzZnkgdGhlIFtGYW50YXN5TGFuZCBBcHBseSBzcGVjXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI2FwcGx5KS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC43LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBOdW1iZXIgLT4gKCouLi4gLT4gKikgLT4gKFsqXS4uLiAtPiBbKl0pXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gbGlmdCBpbnRvIGhpZ2hlciBjb250ZXh0XG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGxpZnRlZCBmdW5jdGlvbi5cbiAqIEBzZWUgUi5saWZ0LCBSLmFwXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG1hZGQzID0gUi5saWZ0TigzLCAoLi4uYXJncykgPT4gUi5zdW0oYXJncykpO1xuICogICAgICBtYWRkMyhbMSwyLDNdLCBbMSwyLDNdLCBbMV0pOyAvLz0+IFszLCA0LCA1LCA0LCA1LCA2LCA1LCA2LCA3XVxuICovXG5cblxudmFyIGxpZnROID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gbGlmdE4oYXJpdHksIGZuKSB7XG4gIHZhciBsaWZ0ZWQgPSBjdXJyeU4oYXJpdHksIGZuKTtcbiAgcmV0dXJuIGN1cnJ5Tihhcml0eSwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfcmVkdWNlKGFwLCBtYXAobGlmdGVkLCBhcmd1bWVudHNbMF0pLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgfSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbGlmdE47IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIGxlc3MgdGhhbiB0aGUgc2Vjb25kOyBgZmFsc2VgXG4gKiBvdGhlcndpc2UuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgT3JkIGEgPT4gYSAtPiBhIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7Kn0gYVxuICogQHBhcmFtIHsqfSBiXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLmd0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5sdCgyLCAxKTsgLy89PiBmYWxzZVxuICogICAgICBSLmx0KDIsIDIpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIubHQoMiwgMyk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmx0KCdhJywgJ3onKTsgLy89PiB0cnVlXG4gKiAgICAgIFIubHQoJ3onLCAnYScpOyAvLz0+IGZhbHNlXG4gKi9cblxuXG52YXIgbHQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBsdChhLCBiKSB7XG4gIHJldHVybiBhIDwgYjtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBsdDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSBzZWNvbmQ7XG4gKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBPcmQgYSA9PiBhIC0+IGEgLT4gQm9vbGVhblxuICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAqIEBwYXJhbSB7TnVtYmVyfSBiXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLmd0ZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubHRlKDIsIDEpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIubHRlKDIsIDIpOyAvLz0+IHRydWVcbiAqICAgICAgUi5sdGUoMiwgMyk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmx0ZSgnYScsICd6Jyk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmx0ZSgneicsICdhJyk7IC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciBsdGUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBsdGUoYSwgYikge1xuICByZXR1cm4gYSA8PSBiO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGx0ZTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9kaXNwYXRjaGFibGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG5cbnZhciBfbWFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX21hcCcpO1xuXG52YXIgX3JlZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2UnKTtcblxudmFyIF94bWFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3htYXAnKTtcblxudmFyIGN1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2N1cnJ5TicpO1xuXG52YXIga2V5cyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBUYWtlcyBhIGZ1bmN0aW9uIGFuZFxuICogYSBbZnVuY3Rvcl0oaHR0cHM6Ly9naXRodWIuY29tL2ZhbnRhc3lsYW5kL2ZhbnRhc3ktbGFuZCNmdW5jdG9yKSxcbiAqIGFwcGxpZXMgdGhlIGZ1bmN0aW9uIHRvIGVhY2ggb2YgdGhlIGZ1bmN0b3IncyB2YWx1ZXMsIGFuZCByZXR1cm5zXG4gKiBhIGZ1bmN0b3Igb2YgdGhlIHNhbWUgc2hhcGUuXG4gKlxuICogUmFtZGEgcHJvdmlkZXMgc3VpdGFibGUgYG1hcGAgaW1wbGVtZW50YXRpb25zIGZvciBgQXJyYXlgIGFuZCBgT2JqZWN0YCxcbiAqIHNvIHRoaXMgZnVuY3Rpb24gbWF5IGJlIGFwcGxpZWQgdG8gYFsxLCAyLCAzXWAgb3IgYHt4OiAxLCB5OiAyLCB6OiAzfWAuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYG1hcGAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEFsc28gdHJlYXRzIGZ1bmN0aW9ucyBhcyBmdW5jdG9ycyBhbmQgd2lsbCBjb21wb3NlIHRoZW0gdG9nZXRoZXIuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBGdW5jdG9yIGYgPT4gKGEgLT4gYikgLT4gZiBhIC0+IGYgYlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBldmVyeSBlbGVtZW50IG9mIHRoZSBpbnB1dCBgbGlzdGAuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGJlIGl0ZXJhdGVkIG92ZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIG5ldyBsaXN0LlxuICogQHNlZSBSLnRyYW5zZHVjZSwgUi5hZGRJbmRleFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBkb3VibGUgPSB4ID0+IHggKiAyO1xuICpcbiAqICAgICAgUi5tYXAoZG91YmxlLCBbMSwgMiwgM10pOyAvLz0+IFsyLCA0LCA2XVxuICpcbiAqICAgICAgUi5tYXAoZG91YmxlLCB7eDogMSwgeTogMiwgejogM30pOyAvLz0+IHt4OiAyLCB5OiA0LCB6OiA2fVxuICogQHN5bWIgUi5tYXAoZiwgW2EsIGJdKSA9IFtmKGEpLCBmKGIpXVxuICogQHN5bWIgUi5tYXAoZiwgeyB4OiBhLCB5OiBiIH0pID0geyB4OiBmKGEpLCB5OiBmKGIpIH1cbiAqIEBzeW1iIFIubWFwKGYsIGZ1bmN0b3JfbykgPSBmdW5jdG9yX28ubWFwKGYpXG4gKi9cblxuXG52YXIgbWFwID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFsnZmFudGFzeS1sYW5kL21hcCcsICdtYXAnXSwgX3htYXAsIGZ1bmN0aW9uIG1hcChmbiwgZnVuY3Rvcikge1xuICBzd2l0Y2ggKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChmdW5jdG9yKSkge1xuICAgIGNhc2UgJ1tvYmplY3QgRnVuY3Rpb25dJzpcbiAgICAgIHJldHVybiBjdXJyeU4oZnVuY3Rvci5sZW5ndGgsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZnVuY3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICAgIH0pO1xuICAgIGNhc2UgJ1tvYmplY3QgT2JqZWN0XSc6XG4gICAgICByZXR1cm4gX3JlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgYWNjW2tleV0gPSBmbihmdW5jdG9yW2tleV0pO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30sIGtleXMoZnVuY3RvcikpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gX21hcChmbiwgZnVuY3Rvcik7XG4gIH1cbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gbWFwOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG4vKipcbiAqIFRoZSBgbWFwQWNjdW1gIGZ1bmN0aW9uIGJlaGF2ZXMgbGlrZSBhIGNvbWJpbmF0aW9uIG9mIG1hcCBhbmQgcmVkdWNlOyBpdFxuICogYXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggZWxlbWVudCBvZiBhIGxpc3QsIHBhc3NpbmcgYW4gYWNjdW11bGF0aW5nXG4gKiBwYXJhbWV0ZXIgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuaW5nIGEgZmluYWwgdmFsdWUgb2YgdGhpc1xuICogYWNjdW11bGF0b3IgdG9nZXRoZXIgd2l0aCB0aGUgbmV3IGxpc3QuXG4gKlxuICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIHR3byBhcmd1bWVudHMsICphY2MqIGFuZCAqdmFsdWUqLCBhbmQgc2hvdWxkXG4gKiByZXR1cm4gYSB0dXBsZSAqW2FjYywgdmFsdWVdKi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMC4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoKGFjYywgeCkgLT4gKGFjYywgeSkpIC0+IGFjYyAtPiBbeF0gLT4gKGFjYywgW3ldKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBldmVyeSBlbGVtZW50IG9mIHRoZSBpbnB1dCBgbGlzdGAuXG4gKiBAcGFyYW0geyp9IGFjYyBUaGUgYWNjdW11bGF0b3IgdmFsdWUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4geyp9IFRoZSBmaW5hbCwgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKiBAc2VlIFIuYWRkSW5kZXgsIFIubWFwQWNjdW1SaWdodFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBkaWdpdHMgPSBbJzEnLCAnMicsICczJywgJzQnXTtcbiAqICAgICAgdmFyIGFwcGVuZGVyID0gKGEsIGIpID0+IFthICsgYiwgYSArIGJdO1xuICpcbiAqICAgICAgUi5tYXBBY2N1bShhcHBlbmRlciwgMCwgZGlnaXRzKTsgLy89PiBbJzAxMjM0JywgWycwMScsICcwMTInLCAnMDEyMycsICcwMTIzNCddXVxuICogQHN5bWIgUi5tYXBBY2N1bShmLCBhLCBbYiwgYywgZF0pID0gW1xuICogICBmKGYoZihhLCBiKVswXSwgYylbMF0sIGQpWzBdLFxuICogICBbXG4gKiAgICAgZihhLCBiKVsxXSxcbiAqICAgICBmKGYoYSwgYilbMF0sIGMpWzFdLFxuICogICAgIGYoZihmKGEsIGIpWzBdLCBjKVswXSwgZClbMV1cbiAqICAgXVxuICogXVxuICovXG5cblxudmFyIG1hcEFjY3VtID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gbWFwQWNjdW0oZm4sIGFjYywgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciB0dXBsZSA9IFthY2NdO1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgdHVwbGUgPSBmbih0dXBsZVswXSwgbGlzdFtpZHhdKTtcbiAgICByZXN1bHRbaWR4XSA9IHR1cGxlWzFdO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBbdHVwbGVbMF0sIHJlc3VsdF07XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbWFwQWNjdW07IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogVGhlIGBtYXBBY2N1bVJpZ2h0YCBmdW5jdGlvbiBiZWhhdmVzIGxpa2UgYSBjb21iaW5hdGlvbiBvZiBtYXAgYW5kIHJlZHVjZTsgaXRcbiAqIGFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIGVsZW1lbnQgb2YgYSBsaXN0LCBwYXNzaW5nIGFuIGFjY3VtdWxhdGluZ1xuICogcGFyYW1ldGVyIGZyb20gcmlnaHQgdG8gbGVmdCwgYW5kIHJldHVybmluZyBhIGZpbmFsIHZhbHVlIG9mIHRoaXNcbiAqIGFjY3VtdWxhdG9yIHRvZ2V0aGVyIHdpdGggdGhlIG5ldyBsaXN0LlxuICpcbiAqIFNpbWlsYXIgdG8gW2BtYXBBY2N1bWBdKCNtYXBBY2N1bSksIGV4Y2VwdCBtb3ZlcyB0aHJvdWdoIHRoZSBpbnB1dCBsaXN0IGZyb21cbiAqIHRoZSByaWdodCB0byB0aGUgbGVmdC5cbiAqXG4gKiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gcmVjZWl2ZXMgdHdvIGFyZ3VtZW50cywgKnZhbHVlKiBhbmQgKmFjYyosIGFuZCBzaG91bGRcbiAqIHJldHVybiBhIHR1cGxlICpbdmFsdWUsIGFjY10qLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEwLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoeCwgYWNjKSAtPiAoeSwgYWNjKSkgLT4gYWNjIC0+IFt4XSAtPiAoW3ldLCBhY2MpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGV2ZXJ5IGVsZW1lbnQgb2YgdGhlIGlucHV0IGBsaXN0YC5cbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7Kn0gVGhlIGZpbmFsLCBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqIEBzZWUgUi5hZGRJbmRleCwgUi5tYXBBY2N1bVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBkaWdpdHMgPSBbJzEnLCAnMicsICczJywgJzQnXTtcbiAqICAgICAgdmFyIGFwcGVuZCA9IChhLCBiKSA9PiBbYSArIGIsIGEgKyBiXTtcbiAqXG4gKiAgICAgIFIubWFwQWNjdW1SaWdodChhcHBlbmQsIDUsIGRpZ2l0cyk7IC8vPT4gW1snMTIzNDUnLCAnMjM0NScsICczNDUnLCAnNDUnXSwgJzEyMzQ1J11cbiAqIEBzeW1iIFIubWFwQWNjdW1SaWdodChmLCBhLCBbYiwgYywgZF0pID0gW1xuICogICBbXG4gKiAgICAgZihiLCBmKGMsIGYoZCwgYSlbMF0pWzBdKVsxXSxcbiAqICAgICBmKGMsIGYoZCwgYSlbMF0pWzFdLFxuICogICAgIGYoZCwgYSlbMV0sXG4gKiAgIF1cbiAqICAgZihiLCBmKGMsIGYoZCwgYSlbMF0pWzBdKVswXSxcbiAqIF1cbiAqL1xuXG5cbnZhciBtYXBBY2N1bVJpZ2h0ID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gbWFwQWNjdW1SaWdodChmbiwgYWNjLCBsaXN0KSB7XG4gIHZhciBpZHggPSBsaXN0Lmxlbmd0aCAtIDE7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIHR1cGxlID0gW2FjY107XG4gIHdoaWxlIChpZHggPj0gMCkge1xuICAgIHR1cGxlID0gZm4obGlzdFtpZHhdLCB0dXBsZVswXSk7XG4gICAgcmVzdWx0W2lkeF0gPSB0dXBsZVsxXTtcbiAgICBpZHggLT0gMTtcbiAgfVxuICByZXR1cm4gW3Jlc3VsdCwgdHVwbGVbMF1dO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1hcEFjY3VtUmlnaHQ7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfcmVkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xuXG52YXIga2V5cyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBBbiBPYmplY3Qtc3BlY2lmaWMgdmVyc2lvbiBvZiBbYG1hcGBdKCNtYXApLiBUaGUgZnVuY3Rpb24gaXMgYXBwbGllZCB0byB0aHJlZVxuICogYXJndW1lbnRzOiAqKHZhbHVlLCBrZXksIG9iaikqLiBJZiBvbmx5IHRoZSB2YWx1ZSBpcyBzaWduaWZpY2FudCwgdXNlXG4gKiBbYG1hcGBdKCNtYXApIGluc3RlYWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnICgoKiwgU3RyaW5nLCBPYmplY3QpIC0+ICopIC0+IE9iamVjdCAtPiBPYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAc2VlIFIubWFwXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHZhbHVlcyA9IHsgeDogMSwgeTogMiwgejogMyB9O1xuICogICAgICB2YXIgcHJlcGVuZEtleUFuZERvdWJsZSA9IChudW0sIGtleSwgb2JqKSA9PiBrZXkgKyAobnVtICogMik7XG4gKlxuICogICAgICBSLm1hcE9iakluZGV4ZWQocHJlcGVuZEtleUFuZERvdWJsZSwgdmFsdWVzKTsgLy89PiB7IHg6ICd4MicsIHk6ICd5NCcsIHo6ICd6NicgfVxuICovXG5cblxudmFyIG1hcE9iakluZGV4ZWQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBtYXBPYmpJbmRleGVkKGZuLCBvYmopIHtcbiAgcmV0dXJuIF9yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgYWNjW2tleV0gPSBmbihvYmpba2V5XSwga2V5LCBvYmopO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9LCBrZXlzKG9iaikpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1hcE9iakluZGV4ZWQ7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogVGVzdHMgYSByZWd1bGFyIGV4cHJlc3Npb24gYWdhaW5zdCBhIFN0cmluZy4gTm90ZSB0aGF0IHRoaXMgZnVuY3Rpb24gd2lsbFxuICogcmV0dXJuIGFuIGVtcHR5IGFycmF5IHdoZW4gdGhlcmUgYXJlIG5vIG1hdGNoZXMuIFRoaXMgZGlmZmVycyBmcm9tXG4gKiBbYFN0cmluZy5wcm90b3R5cGUubWF0Y2hgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvbWF0Y2gpXG4gKiB3aGljaCByZXR1cm5zIGBudWxsYCB3aGVuIHRoZXJlIGFyZSBubyBtYXRjaGVzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHNpZyBSZWdFeHAgLT4gU3RyaW5nIC0+IFtTdHJpbmcgfCBVbmRlZmluZWRdXG4gKiBAcGFyYW0ge1JlZ0V4cH0gcnggQSByZWd1bGFyIGV4cHJlc3Npb24uXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gbWF0Y2ggYWdhaW5zdFxuICogQHJldHVybiB7QXJyYXl9IFRoZSBsaXN0IG9mIG1hdGNoZXMgb3IgZW1wdHkgYXJyYXkuXG4gKiBAc2VlIFIudGVzdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubWF0Y2goLyhbYS16XWEpL2csICdiYW5hbmFzJyk7IC8vPT4gWydiYScsICduYScsICduYSddXG4gKiAgICAgIFIubWF0Y2goL2EvLCAnYicpOyAvLz0+IFtdXG4gKiAgICAgIFIubWF0Y2goL2EvLCBudWxsKTsgLy89PiBUeXBlRXJyb3I6IG51bGwgZG9lcyBub3QgaGF2ZSBhIG1ldGhvZCBuYW1lZCBcIm1hdGNoXCJcbiAqL1xuXG5cbnZhciBtYXRjaCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIG1hdGNoKHJ4LCBzdHIpIHtcbiAgcmV0dXJuIHN0ci5tYXRjaChyeCkgfHwgW107XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbWF0Y2g7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfaXNJbnRlZ2VyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzSW50ZWdlcicpO1xuXG4vKipcbiAqIGBtYXRoTW9kYCBiZWhhdmVzIGxpa2UgdGhlIG1vZHVsbyBvcGVyYXRvciBzaG91bGQgbWF0aGVtYXRpY2FsbHksIHVubGlrZSB0aGVcbiAqIGAlYCBvcGVyYXRvciAoYW5kIGJ5IGV4dGVuc2lvbiwgW2BSLm1vZHVsb2BdKCNtb2R1bG8pKS4gU28gd2hpbGVcbiAqIGAtMTcgJSA1YCBpcyBgLTJgLCBgbWF0aE1vZCgtMTcsIDUpYCBpcyBgM2AuIGBtYXRoTW9kYCByZXF1aXJlcyBJbnRlZ2VyXG4gKiBhcmd1bWVudHMsIGFuZCByZXR1cm5zIE5hTiB3aGVuIHRoZSBtb2R1bHVzIGlzIHplcm8gb3IgbmVnYXRpdmUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMy4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IE51bWJlclxuICogQHBhcmFtIHtOdW1iZXJ9IG0gVGhlIGRpdmlkZW5kLlxuICogQHBhcmFtIHtOdW1iZXJ9IHAgdGhlIG1vZHVsdXMuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSByZXN1bHQgb2YgYGIgbW9kIGFgLlxuICogQHNlZSBSLm1vZHVsb1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubWF0aE1vZCgtMTcsIDUpOyAgLy89PiAzXG4gKiAgICAgIFIubWF0aE1vZCgxNywgNSk7ICAgLy89PiAyXG4gKiAgICAgIFIubWF0aE1vZCgxNywgLTUpOyAgLy89PiBOYU5cbiAqICAgICAgUi5tYXRoTW9kKDE3LCAwKTsgICAvLz0+IE5hTlxuICogICAgICBSLm1hdGhNb2QoMTcuMiwgNSk7IC8vPT4gTmFOXG4gKiAgICAgIFIubWF0aE1vZCgxNywgNS4zKTsgLy89PiBOYU5cbiAqXG4gKiAgICAgIHZhciBjbG9jayA9IFIubWF0aE1vZChSLl9fLCAxMik7XG4gKiAgICAgIGNsb2NrKDE1KTsgLy89PiAzXG4gKiAgICAgIGNsb2NrKDI0KTsgLy89PiAwXG4gKlxuICogICAgICB2YXIgc2V2ZW50ZWVuTW9kID0gUi5tYXRoTW9kKDE3KTtcbiAqICAgICAgc2V2ZW50ZWVuTW9kKDMpOyAgLy89PiAyXG4gKiAgICAgIHNldmVudGVlbk1vZCg0KTsgIC8vPT4gMVxuICogICAgICBzZXZlbnRlZW5Nb2QoMTApOyAvLz0+IDdcbiAqL1xuXG5cbnZhciBtYXRoTW9kID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gbWF0aE1vZChtLCBwKSB7XG4gIGlmICghX2lzSW50ZWdlcihtKSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cbiAgaWYgKCFfaXNJbnRlZ2VyKHApIHx8IHAgPCAxKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuICByZXR1cm4gKG0gJSBwICsgcCkgJSBwO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1hdGhNb2Q7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbGFyZ2VyIG9mIGl0cyB0d28gYXJndW1lbnRzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBhXG4gKiBAcGFyYW0geyp9IGFcbiAqIEBwYXJhbSB7Kn0gYlxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5tYXhCeSwgUi5taW5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm1heCg3ODksIDEyMyk7IC8vPT4gNzg5XG4gKiAgICAgIFIubWF4KCdhJywgJ2InKTsgLy89PiAnYidcbiAqL1xuXG5cbnZhciBtYXggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBtYXgoYSwgYikge1xuICByZXR1cm4gYiA+IGEgPyBiIDogYTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtYXg7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogVGFrZXMgYSBmdW5jdGlvbiBhbmQgdHdvIHZhbHVlcywgYW5kIHJldHVybnMgd2hpY2hldmVyIHZhbHVlIHByb2R1Y2VzIHRoZVxuICogbGFyZ2VyIHJlc3VsdCB3aGVuIHBhc3NlZCB0byB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOC4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgT3JkIGIgPT4gKGEgLT4gYikgLT4gYSAtPiBhIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAqIEBwYXJhbSB7Kn0gYVxuICogQHBhcmFtIHsqfSBiXG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLm1heCwgUi5taW5CeVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIC8vICBzcXVhcmUgOjogTnVtYmVyIC0+IE51bWJlclxuICogICAgICB2YXIgc3F1YXJlID0gbiA9PiBuICogbjtcbiAqXG4gKiAgICAgIFIubWF4Qnkoc3F1YXJlLCAtMywgMik7IC8vPT4gLTNcbiAqXG4gKiAgICAgIFIucmVkdWNlKFIubWF4Qnkoc3F1YXJlKSwgMCwgWzMsIC01LCA0LCAxLCAtMl0pOyAvLz0+IC01XG4gKiAgICAgIFIucmVkdWNlKFIubWF4Qnkoc3F1YXJlKSwgMCwgW10pOyAvLz0+IDBcbiAqL1xuXG5cbnZhciBtYXhCeSA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIG1heEJ5KGYsIGEsIGIpIHtcbiAgcmV0dXJuIGYoYikgPiBmKGEpID8gYiA6IGE7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbWF4Qnk7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBzdW0gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zdW0nKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtZWFuIG9mIHRoZSBnaXZlbiBsaXN0IG9mIG51bWJlcnMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBzaWcgW051bWJlcl0gLT4gTnVtYmVyXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0XG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAc2VlIFIubWVkaWFuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5tZWFuKFsyLCA3LCA5XSk7IC8vPT4gNlxuICogICAgICBSLm1lYW4oW10pOyAvLz0+IE5hTlxuICovXG5cblxudmFyIG1lYW4gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBtZWFuKGxpc3QpIHtcbiAgcmV0dXJuIHN1bShsaXN0KSAvIGxpc3QubGVuZ3RoO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1lYW47IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBtZWFuID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWVhbicpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1lZGlhbiBvZiB0aGUgZ2l2ZW4gbGlzdCBvZiBudW1iZXJzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE0LjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIFtOdW1iZXJdIC0+IE51bWJlclxuICogQHBhcmFtIHtBcnJheX0gbGlzdFxuICogQHJldHVybiB7TnVtYmVyfVxuICogQHNlZSBSLm1lYW5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm1lZGlhbihbMiwgOSwgN10pOyAvLz0+IDdcbiAqICAgICAgUi5tZWRpYW4oWzcsIDIsIDEwLCA5XSk7IC8vPT4gOFxuICogICAgICBSLm1lZGlhbihbXSk7IC8vPT4gTmFOXG4gKi9cblxuXG52YXIgbWVkaWFuID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gbWVkaWFuKGxpc3QpIHtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICBpZiAobGVuID09PSAwKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuICB2YXIgd2lkdGggPSAyIC0gbGVuICUgMjtcbiAgdmFyIGlkeCA9IChsZW4gLSB3aWR0aCkgLyAyO1xuICByZXR1cm4gbWVhbihBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCAwKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xuICB9KS5zbGljZShpZHgsIGlkeCArIHdpZHRoKSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbWVkaWFuOyIsInZhciBtZW1vaXplV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21lbW9pemVXaXRoJyk7XG5cbnZhciB0b1N0cmluZyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmdW5jdGlvbiB0aGF0LCB3aGVuIGludm9rZWQsIGNhY2hlcyB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgYGZuYFxuICogZm9yIGEgZ2l2ZW4gYXJndW1lbnQgc2V0IGFuZCByZXR1cm5zIHRoZSByZXN1bHQuIFN1YnNlcXVlbnQgY2FsbHMgdG8gdGhlXG4gKiBtZW1vaXplZCBgZm5gIHdpdGggdGhlIHNhbWUgYXJndW1lbnQgc2V0IHdpbGwgbm90IHJlc3VsdCBpbiBhbiBhZGRpdGlvbmFsXG4gKiBjYWxsIHRvIGBmbmA7IGluc3RlYWQsIHRoZSBjYWNoZWQgcmVzdWx0IGZvciB0aGF0IHNldCBvZiBhcmd1bWVudHMgd2lsbCBiZVxuICogcmV0dXJuZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCouLi4gLT4gYSkgLT4gKCouLi4gLT4gYSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBtZW1vaXplLlxuICogQHJldHVybiB7RnVuY3Rpb259IE1lbW9pemVkIHZlcnNpb24gb2YgYGZuYC5cbiAqIEBzZWUgUi5tZW1vaXplV2l0aFxuICogQGRlcHJlY2F0ZWQgc2luY2UgdjAuMjUuMFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGxldCBjb3VudCA9IDA7XG4gKiAgICAgIGNvbnN0IGZhY3RvcmlhbCA9IFIubWVtb2l6ZShuID0+IHtcbiAqICAgICAgICBjb3VudCArPSAxO1xuICogICAgICAgIHJldHVybiBSLnByb2R1Y3QoUi5yYW5nZSgxLCBuICsgMSkpO1xuICogICAgICB9KTtcbiAqICAgICAgZmFjdG9yaWFsKDUpOyAvLz0+IDEyMFxuICogICAgICBmYWN0b3JpYWwoNSk7IC8vPT4gMTIwXG4gKiAgICAgIGZhY3RvcmlhbCg1KTsgLy89PiAxMjBcbiAqICAgICAgY291bnQ7IC8vPT4gMVxuICovXG5cblxudmFyIG1lbW9pemUgPSAvKiNfX1BVUkVfXyovbWVtb2l6ZVdpdGgoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdG9TdHJpbmcoYXJndW1lbnRzKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtZW1vaXplOyIsInZhciBfYXJpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXJpdHknKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfaGFzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2hhcycpO1xuXG4vKipcbiAqIEEgY3VzdG9taXNhYmxlIHZlcnNpb24gb2YgW2BSLm1lbW9pemVgXSgjbWVtb2l6ZSkuIGBtZW1vaXplV2l0aGAgdGFrZXMgYW5cbiAqIGFkZGl0aW9uYWwgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGFwcGxpZWQgdG8gYSBnaXZlbiBhcmd1bWVudCBzZXQgYW5kIHVzZWQgdG9cbiAqIGNyZWF0ZSB0aGUgY2FjaGUga2V5IHVuZGVyIHdoaWNoIHRoZSByZXN1bHRzIG9mIHRoZSBmdW5jdGlvbiB0byBiZSBtZW1vaXplZFxuICogd2lsbCBiZSBzdG9yZWQuIENhcmUgbXVzdCBiZSB0YWtlbiB3aGVuIGltcGxlbWVudGluZyBrZXkgZ2VuZXJhdGlvbiB0byBhdm9pZFxuICogY2xhc2hlcyB0aGF0IG1heSBvdmVyd3JpdGUgcHJldmlvdXMgZW50cmllcyBlcnJvbmVvdXNseS5cbiAqXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMjQuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgqLi4uIC0+IFN0cmluZykgLT4gKCouLi4gLT4gYSkgLT4gKCouLi4gLT4gYSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBnZW5lcmF0ZSB0aGUgY2FjaGUga2V5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIG1lbW9pemUuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gTWVtb2l6ZWQgdmVyc2lvbiBvZiBgZm5gLlxuICogQHNlZSBSLm1lbW9pemVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBsZXQgY291bnQgPSAwO1xuICogICAgICBjb25zdCBmYWN0b3JpYWwgPSBSLm1lbW9pemVXaXRoKFIuaWRlbnRpdHksIG4gPT4ge1xuICogICAgICAgIGNvdW50ICs9IDE7XG4gKiAgICAgICAgcmV0dXJuIFIucHJvZHVjdChSLnJhbmdlKDEsIG4gKyAxKSk7XG4gKiAgICAgIH0pO1xuICogICAgICBmYWN0b3JpYWwoNSk7IC8vPT4gMTIwXG4gKiAgICAgIGZhY3RvcmlhbCg1KTsgLy89PiAxMjBcbiAqICAgICAgZmFjdG9yaWFsKDUpOyAvLz0+IDEyMFxuICogICAgICBjb3VudDsgLy89PiAxXG4gKi9cblxuXG52YXIgbWVtb2l6ZVdpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBtZW1vaXplV2l0aChtRm4sIGZuKSB7XG4gIHZhciBjYWNoZSA9IHt9O1xuICByZXR1cm4gX2FyaXR5KGZuLmxlbmd0aCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBrZXkgPSBtRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoIV9oYXMoa2V5LCBjYWNoZSkpIHtcbiAgICAgIGNhY2hlW2tleV0gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVba2V5XTtcbiAgfSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbWVtb2l6ZVdpdGg7IiwidmFyIF9hc3NpZ24gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXNzaWduJyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgb3duIHByb3BlcnRpZXMgb2YgdGhlIGZpcnN0IG9iamVjdCBtZXJnZWQgd2l0aFxuICogdGhlIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBzZWNvbmQgb2JqZWN0LiBJZiBhIGtleSBleGlzdHMgaW4gYm90aCBvYmplY3RzLFxuICogdGhlIHZhbHVlIGZyb20gdGhlIHNlY29uZCBvYmplY3Qgd2lsbCBiZSB1c2VkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7azogdn0gLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICogQHBhcmFtIHtPYmplY3R9IGxcbiAqIEBwYXJhbSB7T2JqZWN0fSByXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAc2VlIFIubWVyZ2VEZWVwUmlnaHQsIFIubWVyZ2VXaXRoLCBSLm1lcmdlV2l0aEtleVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubWVyZ2UoeyAnbmFtZSc6ICdmcmVkJywgJ2FnZSc6IDEwIH0sIHsgJ2FnZSc6IDQwIH0pO1xuICogICAgICAvLz0+IHsgJ25hbWUnOiAnZnJlZCcsICdhZ2UnOiA0MCB9XG4gKlxuICogICAgICB2YXIgcmVzZXRUb0RlZmF1bHQgPSBSLm1lcmdlKFIuX18sIHt4OiAwfSk7XG4gKiAgICAgIHJlc2V0VG9EZWZhdWx0KHt4OiA1LCB5OiAyfSk7IC8vPT4ge3g6IDAsIHk6IDJ9XG4gKiBAc3ltYiBSLm1lcmdlKHsgeDogMSwgeTogMiB9LCB7IHk6IDUsIHo6IDMgfSkgPSB7IHg6IDEsIHk6IDUsIHo6IDMgfVxuICovXG5cblxudmFyIG1lcmdlID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gbWVyZ2UobCwgcikge1xuICByZXR1cm4gX2Fzc2lnbih7fSwgbCwgcik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbWVyZ2U7IiwidmFyIF9hc3NpZ24gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXNzaWduJyk7XG5cbnZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG4vKipcbiAqIE1lcmdlcyBhIGxpc3Qgb2Ygb2JqZWN0cyB0b2dldGhlciBpbnRvIG9uZSBvYmplY3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTAuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW3trOiB2fV0gLT4ge2s6IHZ9XG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IEFuIGFycmF5IG9mIG9iamVjdHNcbiAqIEByZXR1cm4ge09iamVjdH0gQSBtZXJnZWQgb2JqZWN0LlxuICogQHNlZSBSLnJlZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubWVyZ2VBbGwoW3tmb286MX0se2JhcjoyfSx7YmF6OjN9XSk7IC8vPT4ge2ZvbzoxLGJhcjoyLGJhejozfVxuICogICAgICBSLm1lcmdlQWxsKFt7Zm9vOjF9LHtmb286Mn0se2JhcjoyfV0pOyAvLz0+IHtmb286MixiYXI6Mn1cbiAqIEBzeW1iIFIubWVyZ2VBbGwoW3sgeDogMSB9LCB7IHk6IDIgfSwgeyB6OiAzIH1dKSA9IHsgeDogMSwgeTogMiwgejogMyB9XG4gKi9cblxuXG52YXIgbWVyZ2VBbGwgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBtZXJnZUFsbChsaXN0KSB7XG4gIHJldHVybiBfYXNzaWduLmFwcGx5KG51bGwsIFt7fV0uY29uY2F0KGxpc3QpKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtZXJnZUFsbDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIG1lcmdlRGVlcFdpdGhLZXkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZXJnZURlZXBXaXRoS2V5Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgb3duIHByb3BlcnRpZXMgb2YgdGhlIGZpcnN0IG9iamVjdCBtZXJnZWQgd2l0aFxuICogdGhlIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBzZWNvbmQgb2JqZWN0LiBJZiBhIGtleSBleGlzdHMgaW4gYm90aCBvYmplY3RzOlxuICogLSBhbmQgYm90aCB2YWx1ZXMgYXJlIG9iamVjdHMsIHRoZSB0d28gdmFsdWVzIHdpbGwgYmUgcmVjdXJzaXZlbHkgbWVyZ2VkXG4gKiAtIG90aGVyd2lzZSB0aGUgdmFsdWUgZnJvbSB0aGUgZmlyc3Qgb2JqZWN0IHdpbGwgYmUgdXNlZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yNC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHthfSAtPiB7YX0gLT4ge2F9XG4gKiBAcGFyYW0ge09iamVjdH0gbE9ialxuICogQHBhcmFtIHtPYmplY3R9IHJPYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBzZWUgUi5tZXJnZSwgUi5tZXJnZURlZXBSaWdodCwgUi5tZXJnZURlZXBXaXRoLCBSLm1lcmdlRGVlcFdpdGhLZXlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm1lcmdlRGVlcExlZnQoeyBuYW1lOiAnZnJlZCcsIGFnZTogMTAsIGNvbnRhY3Q6IHsgZW1haWw6ICdtb29AZXhhbXBsZS5jb20nIH19LFxuICogICAgICAgICAgICAgICAgICAgICAgeyBhZ2U6IDQwLCBjb250YWN0OiB7IGVtYWlsOiAnYmFhQGV4YW1wbGUuY29tJyB9fSk7XG4gKiAgICAgIC8vPT4geyBuYW1lOiAnZnJlZCcsIGFnZTogMTAsIGNvbnRhY3Q6IHsgZW1haWw6ICdtb29AZXhhbXBsZS5jb20nIH19XG4gKi9cblxuXG52YXIgbWVyZ2VEZWVwTGVmdCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIG1lcmdlRGVlcExlZnQobE9iaiwgck9iaikge1xuICByZXR1cm4gbWVyZ2VEZWVwV2l0aEtleShmdW5jdGlvbiAoaywgbFZhbCwgclZhbCkge1xuICAgIHJldHVybiBsVmFsO1xuICB9LCBsT2JqLCByT2JqKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtZXJnZURlZXBMZWZ0OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgbWVyZ2VEZWVwV2l0aEtleSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21lcmdlRGVlcFdpdGhLZXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBvd24gcHJvcGVydGllcyBvZiB0aGUgZmlyc3Qgb2JqZWN0IG1lcmdlZCB3aXRoXG4gKiB0aGUgb3duIHByb3BlcnRpZXMgb2YgdGhlIHNlY29uZCBvYmplY3QuIElmIGEga2V5IGV4aXN0cyBpbiBib3RoIG9iamVjdHM6XG4gKiAtIGFuZCBib3RoIHZhbHVlcyBhcmUgb2JqZWN0cywgdGhlIHR3byB2YWx1ZXMgd2lsbCBiZSByZWN1cnNpdmVseSBtZXJnZWRcbiAqIC0gb3RoZXJ3aXNlIHRoZSB2YWx1ZSBmcm9tIHRoZSBzZWNvbmQgb2JqZWN0IHdpbGwgYmUgdXNlZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yNC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHthfSAtPiB7YX0gLT4ge2F9XG4gKiBAcGFyYW0ge09iamVjdH0gbE9ialxuICogQHBhcmFtIHtPYmplY3R9IHJPYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBzZWUgUi5tZXJnZSwgUi5tZXJnZURlZXBMZWZ0LCBSLm1lcmdlRGVlcFdpdGgsIFIubWVyZ2VEZWVwV2l0aEtleVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubWVyZ2VEZWVwUmlnaHQoeyBuYW1lOiAnZnJlZCcsIGFnZTogMTAsIGNvbnRhY3Q6IHsgZW1haWw6ICdtb29AZXhhbXBsZS5jb20nIH19LFxuICogICAgICAgICAgICAgICAgICAgICAgIHsgYWdlOiA0MCwgY29udGFjdDogeyBlbWFpbDogJ2JhYUBleGFtcGxlLmNvbScgfX0pO1xuICogICAgICAvLz0+IHsgbmFtZTogJ2ZyZWQnLCBhZ2U6IDQwLCBjb250YWN0OiB7IGVtYWlsOiAnYmFhQGV4YW1wbGUuY29tJyB9fVxuICovXG5cblxudmFyIG1lcmdlRGVlcFJpZ2h0ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gbWVyZ2VEZWVwUmlnaHQobE9iaiwgck9iaikge1xuICByZXR1cm4gbWVyZ2VEZWVwV2l0aEtleShmdW5jdGlvbiAoaywgbFZhbCwgclZhbCkge1xuICAgIHJldHVybiByVmFsO1xuICB9LCBsT2JqLCByT2JqKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtZXJnZURlZXBSaWdodDsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxudmFyIG1lcmdlRGVlcFdpdGhLZXkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZXJnZURlZXBXaXRoS2V5Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgb3duIHByb3BlcnRpZXMgb2YgdGhlIHR3byBwcm92aWRlZCBvYmplY3RzLlxuICogSWYgYSBrZXkgZXhpc3RzIGluIGJvdGggb2JqZWN0czpcbiAqIC0gYW5kIGJvdGggYXNzb2NpYXRlZCB2YWx1ZXMgYXJlIGFsc28gb2JqZWN0cyB0aGVuIHRoZSB2YWx1ZXMgd2lsbCBiZVxuICogICByZWN1cnNpdmVseSBtZXJnZWQuXG4gKiAtIG90aGVyd2lzZSB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gaXMgYXBwbGllZCB0byBhc3NvY2lhdGVkIHZhbHVlcyB1c2luZyB0aGVcbiAqICAgcmVzdWx0aW5nIHZhbHVlIGFzIHRoZSBuZXcgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXkuXG4gKiBJZiBhIGtleSBvbmx5IGV4aXN0cyBpbiBvbmUgb2JqZWN0LCB0aGUgdmFsdWUgd2lsbCBiZSBhc3NvY2lhdGVkIHdpdGggdGhlIGtleVxuICogb2YgdGhlIHJlc3VsdGluZyBvYmplY3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMjQuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyAoKGEsIGEpIC0+IGEpIC0+IHthfSAtPiB7YX0gLT4ge2F9XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3R9IGxPYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSByT2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAc2VlIFIubWVyZ2VXaXRoLCBSLm1lcmdlRGVlcCwgUi5tZXJnZURlZXBXaXRoS2V5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5tZXJnZURlZXBXaXRoKFIuY29uY2F0LFxuICogICAgICAgICAgICAgICAgICAgICAgeyBhOiB0cnVlLCBjOiB7IHZhbHVlczogWzEwLCAyMF0gfX0sXG4gKiAgICAgICAgICAgICAgICAgICAgICB7IGI6IHRydWUsIGM6IHsgdmFsdWVzOiBbMTUsIDM1XSB9fSk7XG4gKiAgICAgIC8vPT4geyBhOiB0cnVlLCBiOiB0cnVlLCBjOiB7IHZhbHVlczogWzEwLCAyMCwgMTUsIDM1XSB9fVxuICovXG5cblxudmFyIG1lcmdlRGVlcFdpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBtZXJnZURlZXBXaXRoKGZuLCBsT2JqLCByT2JqKSB7XG4gIHJldHVybiBtZXJnZURlZXBXaXRoS2V5KGZ1bmN0aW9uIChrLCBsVmFsLCByVmFsKSB7XG4gICAgcmV0dXJuIGZuKGxWYWwsIHJWYWwpO1xuICB9LCBsT2JqLCByT2JqKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtZXJnZURlZXBXaXRoOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgX2lzT2JqZWN0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzT2JqZWN0Jyk7XG5cbnZhciBtZXJnZVdpdGhLZXkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZXJnZVdpdGhLZXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBvd24gcHJvcGVydGllcyBvZiB0aGUgdHdvIHByb3ZpZGVkIG9iamVjdHMuXG4gKiBJZiBhIGtleSBleGlzdHMgaW4gYm90aCBvYmplY3RzOlxuICogLSBhbmQgYm90aCBhc3NvY2lhdGVkIHZhbHVlcyBhcmUgYWxzbyBvYmplY3RzIHRoZW4gdGhlIHZhbHVlcyB3aWxsIGJlXG4gKiAgIHJlY3Vyc2l2ZWx5IG1lcmdlZC5cbiAqIC0gb3RoZXJ3aXNlIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIHRoZSBrZXkgYW5kIGFzc29jaWF0ZWQgdmFsdWVzXG4gKiAgIHVzaW5nIHRoZSByZXN1bHRpbmcgdmFsdWUgYXMgdGhlIG5ldyB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIGtleS5cbiAqIElmIGEga2V5IG9ubHkgZXhpc3RzIGluIG9uZSBvYmplY3QsIHRoZSB2YWx1ZSB3aWxsIGJlIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5XG4gKiBvZiB0aGUgcmVzdWx0aW5nIG9iamVjdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yNC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnICgoU3RyaW5nLCBhLCBhKSAtPiBhKSAtPiB7YX0gLT4ge2F9IC0+IHthfVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBsT2JqXG4gKiBAcGFyYW0ge09iamVjdH0gck9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQHNlZSBSLm1lcmdlV2l0aEtleSwgUi5tZXJnZURlZXAsIFIubWVyZ2VEZWVwV2l0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGxldCBjb25jYXRWYWx1ZXMgPSAoaywgbCwgcikgPT4gayA9PSAndmFsdWVzJyA/IFIuY29uY2F0KGwsIHIpIDogclxuICogICAgICBSLm1lcmdlRGVlcFdpdGhLZXkoY29uY2F0VmFsdWVzLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgeyBhOiB0cnVlLCBjOiB7IHRoaW5nOiAnZm9vJywgdmFsdWVzOiBbMTAsIDIwXSB9fSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHsgYjogdHJ1ZSwgYzogeyB0aGluZzogJ2JhcicsIHZhbHVlczogWzE1LCAzNV0gfX0pO1xuICogICAgICAvLz0+IHsgYTogdHJ1ZSwgYjogdHJ1ZSwgYzogeyB0aGluZzogJ2JhcicsIHZhbHVlczogWzEwLCAyMCwgMTUsIDM1XSB9fVxuICovXG5cblxudmFyIG1lcmdlRGVlcFdpdGhLZXkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBtZXJnZURlZXBXaXRoS2V5KGZuLCBsT2JqLCByT2JqKSB7XG4gIHJldHVybiBtZXJnZVdpdGhLZXkoZnVuY3Rpb24gKGssIGxWYWwsIHJWYWwpIHtcbiAgICBpZiAoX2lzT2JqZWN0KGxWYWwpICYmIF9pc09iamVjdChyVmFsKSkge1xuICAgICAgcmV0dXJuIG1lcmdlRGVlcFdpdGhLZXkoZm4sIGxWYWwsIHJWYWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4oaywgbFZhbCwgclZhbCk7XG4gICAgfVxuICB9LCBsT2JqLCByT2JqKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtZXJnZURlZXBXaXRoS2V5OyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgbWVyZ2VXaXRoS2V5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWVyZ2VXaXRoS2V5Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgb3duIHByb3BlcnRpZXMgb2YgdGhlIHR3byBwcm92aWRlZCBvYmplY3RzLiBJZlxuICogYSBrZXkgZXhpc3RzIGluIGJvdGggb2JqZWN0cywgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG8gdGhlIHZhbHVlc1xuICogYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXkgaW4gZWFjaCBvYmplY3QsIHdpdGggdGhlIHJlc3VsdCBiZWluZyB1c2VkIGFzIHRoZVxuICogdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXkgaW4gdGhlIHJldHVybmVkIG9iamVjdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnICgoYSwgYSkgLT4gYSkgLT4ge2F9IC0+IHthfSAtPiB7YX1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gbFxuICogQHBhcmFtIHtPYmplY3R9IHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBzZWUgUi5tZXJnZURlZXBXaXRoLCBSLm1lcmdlLCBSLm1lcmdlV2l0aEtleVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubWVyZ2VXaXRoKFIuY29uY2F0LFxuICogICAgICAgICAgICAgICAgICB7IGE6IHRydWUsIHZhbHVlczogWzEwLCAyMF0gfSxcbiAqICAgICAgICAgICAgICAgICAgeyBiOiB0cnVlLCB2YWx1ZXM6IFsxNSwgMzVdIH0pO1xuICogICAgICAvLz0+IHsgYTogdHJ1ZSwgYjogdHJ1ZSwgdmFsdWVzOiBbMTAsIDIwLCAxNSwgMzVdIH1cbiAqL1xuXG5cbnZhciBtZXJnZVdpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBtZXJnZVdpdGgoZm4sIGwsIHIpIHtcbiAgcmV0dXJuIG1lcmdlV2l0aEtleShmdW5jdGlvbiAoXywgX2wsIF9yKSB7XG4gICAgcmV0dXJuIGZuKF9sLCBfcik7XG4gIH0sIGwsIHIpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlV2l0aDsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxudmFyIF9oYXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faGFzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgb3duIHByb3BlcnRpZXMgb2YgdGhlIHR3byBwcm92aWRlZCBvYmplY3RzLiBJZlxuICogYSBrZXkgZXhpc3RzIGluIGJvdGggb2JqZWN0cywgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG8gdGhlIGtleVxuICogYW5kIHRoZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXkgaW4gZWFjaCBvYmplY3QsIHdpdGggdGhlIHJlc3VsdCBiZWluZ1xuICogdXNlZCBhcyB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXkgaW4gdGhlIHJldHVybmVkIG9iamVjdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnICgoU3RyaW5nLCBhLCBhKSAtPiBhKSAtPiB7YX0gLT4ge2F9IC0+IHthfVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBsXG4gKiBAcGFyYW0ge09iamVjdH0gclxuICogQHJldHVybiB7T2JqZWN0fVxuICogQHNlZSBSLm1lcmdlRGVlcFdpdGhLZXksIFIubWVyZ2UsIFIubWVyZ2VXaXRoXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgbGV0IGNvbmNhdFZhbHVlcyA9IChrLCBsLCByKSA9PiBrID09ICd2YWx1ZXMnID8gUi5jb25jYXQobCwgcikgOiByXG4gKiAgICAgIFIubWVyZ2VXaXRoS2V5KGNvbmNhdFZhbHVlcyxcbiAqICAgICAgICAgICAgICAgICAgICAgeyBhOiB0cnVlLCB0aGluZzogJ2ZvbycsIHZhbHVlczogWzEwLCAyMF0gfSxcbiAqICAgICAgICAgICAgICAgICAgICAgeyBiOiB0cnVlLCB0aGluZzogJ2JhcicsIHZhbHVlczogWzE1LCAzNV0gfSk7XG4gKiAgICAgIC8vPT4geyBhOiB0cnVlLCBiOiB0cnVlLCB0aGluZzogJ2JhcicsIHZhbHVlczogWzEwLCAyMCwgMTUsIDM1XSB9XG4gKiBAc3ltYiBSLm1lcmdlV2l0aEtleShmLCB7IHg6IDEsIHk6IDIgfSwgeyB5OiA1LCB6OiAzIH0pID0geyB4OiAxLCB5OiBmKCd5JywgMiwgNSksIHo6IDMgfVxuICovXG5cblxudmFyIG1lcmdlV2l0aEtleSA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIG1lcmdlV2l0aEtleShmbiwgbCwgcikge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIHZhciBrO1xuXG4gIGZvciAoayBpbiBsKSB7XG4gICAgaWYgKF9oYXMoaywgbCkpIHtcbiAgICAgIHJlc3VsdFtrXSA9IF9oYXMoaywgcikgPyBmbihrLCBsW2tdLCByW2tdKSA6IGxba107XG4gICAgfVxuICB9XG5cbiAgZm9yIChrIGluIHIpIHtcbiAgICBpZiAoX2hhcyhrLCByKSAmJiAhX2hhcyhrLCByZXN1bHQpKSB7XG4gICAgICByZXN1bHRba10gPSByW2tdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbWVyZ2VXaXRoS2V5OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHNtYWxsZXIgb2YgaXRzIHR3byBhcmd1bWVudHMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgT3JkIGEgPT4gYSAtPiBhIC0+IGFcbiAqIEBwYXJhbSB7Kn0gYVxuICogQHBhcmFtIHsqfSBiXG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLm1pbkJ5LCBSLm1heFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubWluKDc4OSwgMTIzKTsgLy89PiAxMjNcbiAqICAgICAgUi5taW4oJ2EnLCAnYicpOyAvLz0+ICdhJ1xuICovXG5cblxudmFyIG1pbiA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIG1pbihhLCBiKSB7XG4gIHJldHVybiBiIDwgYSA/IGIgOiBhO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1pbjsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBUYWtlcyBhIGZ1bmN0aW9uIGFuZCB0d28gdmFsdWVzLCBhbmQgcmV0dXJucyB3aGljaGV2ZXIgdmFsdWUgcHJvZHVjZXMgdGhlXG4gKiBzbWFsbGVyIHJlc3VsdCB3aGVuIHBhc3NlZCB0byB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOC4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgT3JkIGIgPT4gKGEgLT4gYikgLT4gYSAtPiBhIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAqIEBwYXJhbSB7Kn0gYVxuICogQHBhcmFtIHsqfSBiXG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLm1pbiwgUi5tYXhCeVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIC8vICBzcXVhcmUgOjogTnVtYmVyIC0+IE51bWJlclxuICogICAgICB2YXIgc3F1YXJlID0gbiA9PiBuICogbjtcbiAqXG4gKiAgICAgIFIubWluQnkoc3F1YXJlLCAtMywgMik7IC8vPT4gMlxuICpcbiAqICAgICAgUi5yZWR1Y2UoUi5taW5CeShzcXVhcmUpLCBJbmZpbml0eSwgWzMsIC01LCA0LCAxLCAtMl0pOyAvLz0+IDFcbiAqICAgICAgUi5yZWR1Y2UoUi5taW5CeShzcXVhcmUpLCBJbmZpbml0eSwgW10pOyAvLz0+IEluZmluaXR5XG4gKi9cblxuXG52YXIgbWluQnkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBtaW5CeShmLCBhLCBiKSB7XG4gIHJldHVybiBmKGIpIDwgZihhKSA/IGIgOiBhO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1pbkJ5OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIERpdmlkZXMgdGhlIGZpcnN0IHBhcmFtZXRlciBieSB0aGUgc2Vjb25kIGFuZCByZXR1cm5zIHRoZSByZW1haW5kZXIuIE5vdGVcbiAqIHRoYXQgdGhpcyBmdW5jdGlvbiBwcmVzZXJ2ZXMgdGhlIEphdmFTY3JpcHQtc3R5bGUgYmVoYXZpb3IgZm9yIG1vZHVsby4gRm9yXG4gKiBtYXRoZW1hdGljYWwgbW9kdWxvIHNlZSBbYG1hdGhNb2RgXSgjbWF0aE1vZCkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4xXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IE51bWJlclxuICogQHBhcmFtIHtOdW1iZXJ9IGEgVGhlIHZhbHVlIHRvIHRoZSBkaXZpZGUuXG4gKiBAcGFyYW0ge051bWJlcn0gYiBUaGUgcHNldWRvLW1vZHVsdXNcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJlc3VsdCBvZiBgYiAlIGFgLlxuICogQHNlZSBSLm1hdGhNb2RcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm1vZHVsbygxNywgMyk7IC8vPT4gMlxuICogICAgICAvLyBKUyBiZWhhdmlvcjpcbiAqICAgICAgUi5tb2R1bG8oLTE3LCAzKTsgLy89PiAtMlxuICogICAgICBSLm1vZHVsbygxNywgLTMpOyAvLz0+IDJcbiAqXG4gKiAgICAgIHZhciBpc09kZCA9IFIubW9kdWxvKFIuX18sIDIpO1xuICogICAgICBpc09kZCg0Mik7IC8vPT4gMFxuICogICAgICBpc09kZCgyMSk7IC8vPT4gMVxuICovXG5cblxudmFyIG1vZHVsbyA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIG1vZHVsbyhhLCBiKSB7XG4gIHJldHVybiBhICUgYjtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtb2R1bG87IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gbnVtYmVycy4gRXF1aXZhbGVudCB0byBgYSAqIGJgIGJ1dCBjdXJyaWVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBOdW1iZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBhIFRoZSBmaXJzdCB2YWx1ZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBiIFRoZSBzZWNvbmQgdmFsdWUuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSByZXN1bHQgb2YgYGEgKiBiYC5cbiAqIEBzZWUgUi5kaXZpZGVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZG91YmxlID0gUi5tdWx0aXBseSgyKTtcbiAqICAgICAgdmFyIHRyaXBsZSA9IFIubXVsdGlwbHkoMyk7XG4gKiAgICAgIGRvdWJsZSgzKTsgICAgICAgLy89PiAgNlxuICogICAgICB0cmlwbGUoNCk7ICAgICAgIC8vPT4gMTJcbiAqICAgICAgUi5tdWx0aXBseSgyLCA1KTsgIC8vPT4gMTBcbiAqL1xuXG5cbnZhciBtdWx0aXBseSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIG11bHRpcGx5KGEsIGIpIHtcbiAgcmV0dXJuIGEgKiBiO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG11bHRpcGx5OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFdyYXBzIGEgZnVuY3Rpb24gb2YgYW55IGFyaXR5IChpbmNsdWRpbmcgbnVsbGFyeSkgaW4gYSBmdW5jdGlvbiB0aGF0IGFjY2VwdHNcbiAqIGV4YWN0bHkgYG5gIHBhcmFtZXRlcnMuIEFueSBleHRyYW5lb3VzIHBhcmFtZXRlcnMgd2lsbCBub3QgYmUgcGFzc2VkIHRvIHRoZVxuICogc3VwcGxpZWQgZnVuY3Rpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+ICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0ge051bWJlcn0gbiBUaGUgZGVzaXJlZCBhcml0eSBvZiB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gd3JhcHBpbmcgYGZuYC4gVGhlIG5ldyBmdW5jdGlvbiBpcyBndWFyYW50ZWVkIHRvIGJlIG9mXG4gKiAgICAgICAgIGFyaXR5IGBuYC5cbiAqIEBzZWUgUi5iaW5hcnksIFIudW5hcnlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgdGFrZXNUd29BcmdzID0gKGEsIGIpID0+IFthLCBiXTtcbiAqXG4gKiAgICAgIHRha2VzVHdvQXJncy5sZW5ndGg7IC8vPT4gMlxuICogICAgICB0YWtlc1R3b0FyZ3MoMSwgMik7IC8vPT4gWzEsIDJdXG4gKlxuICogICAgICB2YXIgdGFrZXNPbmVBcmcgPSBSLm5BcnkoMSwgdGFrZXNUd29BcmdzKTtcbiAqICAgICAgdGFrZXNPbmVBcmcubGVuZ3RoOyAvLz0+IDFcbiAqICAgICAgLy8gT25seSBgbmAgYXJndW1lbnRzIGFyZSBwYXNzZWQgdG8gdGhlIHdyYXBwZWQgZnVuY3Rpb25cbiAqICAgICAgdGFrZXNPbmVBcmcoMSwgMik7IC8vPT4gWzEsIHVuZGVmaW5lZF1cbiAqIEBzeW1iIFIubkFyeSgwLCBmKShhLCBiKSA9IGYoKVxuICogQHN5bWIgUi5uQXJ5KDEsIGYpKGEsIGIpID0gZihhKVxuICogQHN5bWIgUi5uQXJ5KDIsIGYpKGEsIGIpID0gZihhLCBiKVxuICovXG5cblxudmFyIG5BcnkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBuQXJ5KG4sIGZuKSB7XG4gIHN3aXRjaCAobikge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMpO1xuICAgICAgfTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwKSB7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGEwKTtcbiAgICAgIH07XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExKTtcbiAgICAgIH07XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyKSB7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGEwLCBhMSwgYTIpO1xuICAgICAgfTtcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGEwLCBhMSwgYTIsIGEzKTtcbiAgICAgIH07XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMsIGE0KTtcbiAgICAgIH07XG4gICAgY2FzZSA2OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgICAgfTtcbiAgICBjYXNlIDc6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KSB7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KTtcbiAgICAgIH07XG4gICAgY2FzZSA4OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3KTtcbiAgICAgIH07XG4gICAgY2FzZSA5OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KSB7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpO1xuICAgICAgfTtcbiAgICBjYXNlIDEwOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSkge1xuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSk7XG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIG5BcnkgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIG5vIGdyZWF0ZXIgdGhhbiB0ZW4nKTtcbiAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG5Bcnk7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbi8qKlxuICogTmVnYXRlcyBpdHMgYXJndW1lbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gblxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubmVnYXRlKDQyKTsgLy89PiAtNDJcbiAqL1xuXG5cbnZhciBuZWdhdGUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBuZWdhdGUobikge1xuICByZXR1cm4gLW47XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbmVnYXRlOyIsInZhciBfY29tcGxlbWVudCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb21wbGVtZW50Jyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF94YW55ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3hhbnknKTtcblxudmFyIGFueSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2FueScpO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIG5vIGVsZW1lbnRzIG9mIHRoZSBsaXN0IG1hdGNoIHRoZSBwcmVkaWNhdGUsIGBmYWxzZWBcbiAqIG90aGVyd2lzZS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgYW55YCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMi4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBwcmVkaWNhdGUgaXMgbm90IHNhdGlzZmllZCBieSBldmVyeSBlbGVtZW50LCBgZmFsc2VgIG90aGVyd2lzZS5cbiAqIEBzZWUgUi5hbGwsIFIuYW55XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzRXZlbiA9IG4gPT4gbiAlIDIgPT09IDA7XG4gKiAgICAgIHZhciBpc09kZCA9IG4gPT4gbiAlIDIgPT09IDE7XG4gKlxuICogICAgICBSLm5vbmUoaXNFdmVuLCBbMSwgMywgNSwgNywgOSwgMTFdKTsgLy89PiB0cnVlXG4gKiAgICAgIFIubm9uZShpc09kZCwgWzEsIDMsIDUsIDcsIDgsIDExXSk7IC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciBub25lID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fY29tcGxlbWVudCggLyojX19QVVJFX18qL19kaXNwYXRjaGFibGUoWydhbnknXSwgX3hhbnksIGFueSkpKTtcbm1vZHVsZS5leHBvcnRzID0gbm9uZTsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgYCFgIG9mIGl0cyBhcmd1bWVudC4gSXQgd2lsbCByZXR1cm4gYHRydWVgIHdoZW5cbiAqIHBhc3NlZCBmYWxzZS15IHZhbHVlLCBhbmQgYGZhbHNlYCB3aGVuIHBhc3NlZCBhIHRydXRoLXkgb25lLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnICogLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSBhIGFueSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn0gdGhlIGxvZ2ljYWwgaW52ZXJzZSBvZiBwYXNzZWQgYXJndW1lbnQuXG4gKiBAc2VlIFIuY29tcGxlbWVudFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubm90KHRydWUpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIubm90KGZhbHNlKTsgLy89PiB0cnVlXG4gKiAgICAgIFIubm90KDApOyAvLz0+IHRydWVcbiAqICAgICAgUi5ub3QoMSk7IC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciBub3QgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBub3QoYSkge1xuICByZXR1cm4gIWE7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbm90OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2lzU3RyaW5nID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzU3RyaW5nJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnRoIGVsZW1lbnQgb2YgdGhlIGdpdmVuIGxpc3Qgb3Igc3RyaW5nLiBJZiBuIGlzIG5lZ2F0aXZlIHRoZVxuICogZWxlbWVudCBhdCBpbmRleCBsZW5ndGggKyBuIGlzIHJldHVybmVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IFthXSAtPiBhIHwgVW5kZWZpbmVkXG4gKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0XG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGxpc3QgPSBbJ2ZvbycsICdiYXInLCAnYmF6JywgJ3F1dXgnXTtcbiAqICAgICAgUi5udGgoMSwgbGlzdCk7IC8vPT4gJ2JhcidcbiAqICAgICAgUi5udGgoLTEsIGxpc3QpOyAvLz0+ICdxdXV4J1xuICogICAgICBSLm50aCgtOTksIGxpc3QpOyAvLz0+IHVuZGVmaW5lZFxuICpcbiAqICAgICAgUi5udGgoMiwgJ2FiYycpOyAvLz0+ICdjJ1xuICogICAgICBSLm50aCgzLCAnYWJjJyk7IC8vPT4gJydcbiAqIEBzeW1iIFIubnRoKC0xLCBbYSwgYiwgY10pID0gY1xuICogQHN5bWIgUi5udGgoMCwgW2EsIGIsIGNdKSA9IGFcbiAqIEBzeW1iIFIubnRoKDEsIFthLCBiLCBjXSkgPSBiXG4gKi9cblxuXG52YXIgbnRoID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gbnRoKG9mZnNldCwgbGlzdCkge1xuICB2YXIgaWR4ID0gb2Zmc2V0IDwgMCA/IGxpc3QubGVuZ3RoICsgb2Zmc2V0IDogb2Zmc2V0O1xuICByZXR1cm4gX2lzU3RyaW5nKGxpc3QpID8gbGlzdC5jaGFyQXQoaWR4KSA6IGxpc3RbaWR4XTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBudGg7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBjdXJyeU4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jdXJyeU4nKTtcblxudmFyIG50aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL250aCcpO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGl0cyBudGggYXJndW1lbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+ICouLi4gLT4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubnRoQXJnKDEpKCdhJywgJ2InLCAnYycpOyAvLz0+ICdiJ1xuICogICAgICBSLm50aEFyZygtMSkoJ2EnLCAnYicsICdjJyk7IC8vPT4gJ2MnXG4gKiBAc3ltYiBSLm50aEFyZygtMSkoYSwgYiwgYykgPSBjXG4gKiBAc3ltYiBSLm50aEFyZygwKShhLCBiLCBjKSA9IGFcbiAqIEBzeW1iIFIubnRoQXJnKDEpKGEsIGIsIGMpID0gYlxuICovXG5cblxudmFyIG50aEFyZyA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIG50aEFyZyhuKSB7XG4gIHZhciBhcml0eSA9IG4gPCAwID8gMSA6IG4gKyAxO1xuICByZXR1cm4gY3VycnlOKGFyaXR5LCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG50aChuLCBhcmd1bWVudHMpO1xuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBudGhBcmc7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogYG9gIGlzIGEgY3VycmllZCBjb21wb3NpdGlvbiBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSB1bmFyeSBmdW5jdGlvbi5cbiAqIExpa2UgW2Bjb21wb3NlYF0oI2NvbXBvc2UpLCBgb2AgcGVyZm9ybXMgcmlnaHQtdG8tbGVmdCBmdW5jdGlvbiBjb21wb3NpdGlvbi5cbiAqIFVubGlrZSBbYGNvbXBvc2VgXSgjY29tcG9zZSksIHRoZSByaWdodG1vc3QgZnVuY3Rpb24gcGFzc2VkIHRvIGBvYCB3aWxsIGJlXG4gKiBpbnZva2VkIHdpdGggb25seSBvbmUgYXJndW1lbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMjQuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIChiIC0+IGMpIC0+IChhIC0+IGIpIC0+IGEgLT4gY1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZ1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAc2VlIFIuY29tcG9zZSwgUi5waXBlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGNsYXNzeUdyZWV0aW5nID0gbmFtZSA9PiBcIlRoZSBuYW1lJ3MgXCIgKyBuYW1lLmxhc3QgKyBcIiwgXCIgKyBuYW1lLmZpcnN0ICsgXCIgXCIgKyBuYW1lLmxhc3RcbiAqICAgICAgdmFyIHllbGxHcmVldGluZyA9IFIubyhSLnRvVXBwZXIsIGNsYXNzeUdyZWV0aW5nKTtcbiAqICAgICAgeWVsbEdyZWV0aW5nKHtmaXJzdDogJ0phbWVzJywgbGFzdDogJ0JvbmQnfSk7IC8vPT4gXCJUSEUgTkFNRSdTIEJPTkQsIEpBTUVTIEJPTkRcIlxuICpcbiAqICAgICAgUi5vKFIubXVsdGlwbHkoMTApLCBSLmFkZCgxMCkpKC00KSAvLz0+IDYwXG4gKlxuICogQHN5bWIgUi5vKGYsIGcsIHgpID0gZihnKHgpKVxuICovXG5cblxudmFyIG8gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBvKGYsIGcsIHgpIHtcbiAgcmV0dXJuIGYoZyh4KSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbzsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCBjb250YWluaW5nIGEgc2luZ2xlIGtleTp2YWx1ZSBwYWlyLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE4LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgU3RyaW5nIC0+IGEgLT4ge1N0cmluZzphfVxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBzZWUgUi5wYWlyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG1hdGNoUGhyYXNlcyA9IFIuY29tcG9zZShcbiAqICAgICAgICBSLm9iak9mKCdtdXN0JyksXG4gKiAgICAgICAgUi5tYXAoUi5vYmpPZignbWF0Y2hfcGhyYXNlJykpXG4gKiAgICAgICk7XG4gKiAgICAgIG1hdGNoUGhyYXNlcyhbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IHttdXN0OiBbe21hdGNoX3BocmFzZTogJ2Zvbyd9LCB7bWF0Y2hfcGhyYXNlOiAnYmFyJ30sIHttYXRjaF9waHJhc2U6ICdiYXonfV19XG4gKi9cblxuXG52YXIgb2JqT2YgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBvYmpPZihrZXksIHZhbCkge1xuICB2YXIgb2JqID0ge307XG4gIG9ialtrZXldID0gdmFsO1xuICByZXR1cm4gb2JqO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG9iak9mOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgX29mID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX29mJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIHNpbmdsZXRvbiBhcnJheSBjb250YWluaW5nIHRoZSB2YWx1ZSBwcm92aWRlZC5cbiAqXG4gKiBOb3RlIHRoaXMgYG9mYCBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgRVM2IGBvZmA7IFNlZVxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvb2ZcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4zLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBhIC0+IFthXVxuICogQHBhcmFtIHsqfSB4IGFueSB2YWx1ZVxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IHdyYXBwaW5nIGB4YC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm9mKG51bGwpOyAvLz0+IFtudWxsXVxuICogICAgICBSLm9mKFs0Ml0pOyAvLz0+IFtbNDJdXVxuICovXG5cblxudmFyIG9mID0gLyojX19QVVJFX18qL19jdXJyeTEoX29mKTtcbm1vZHVsZS5leHBvcnRzID0gb2Y7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIHBhcnRpYWwgY29weSBvZiBhbiBvYmplY3Qgb21pdHRpbmcgdGhlIGtleXMgc3BlY2lmaWVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyBbU3RyaW5nXSAtPiB7U3RyaW5nOiAqfSAtPiB7U3RyaW5nOiAqfVxuICogQHBhcmFtIHtBcnJheX0gbmFtZXMgYW4gYXJyYXkgb2YgU3RyaW5nIHByb3BlcnR5IG5hbWVzIHRvIG9taXQgZnJvbSB0aGUgbmV3IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGNvcHkgZnJvbVxuICogQHJldHVybiB7T2JqZWN0fSBBIG5ldyBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzIGZyb20gYG5hbWVzYCBub3Qgb24gaXQuXG4gKiBAc2VlIFIucGlja1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIub21pdChbJ2EnLCAnZCddLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHtiOiAyLCBjOiAzfVxuICovXG5cblxudmFyIG9taXQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBvbWl0KG5hbWVzLCBvYmopIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICB2YXIgaW5kZXggPSB7fTtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBuYW1lcy5sZW5ndGg7XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGluZGV4W25hbWVzW2lkeF1dID0gMTtcbiAgICBpZHggKz0gMTtcbiAgfVxuXG4gIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgaWYgKCFpbmRleC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgcmVzdWx0W3Byb3BdID0gb2JqW3Byb3BdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG9taXQ7IiwidmFyIF9hcml0eSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xuXG52YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuLyoqXG4gKiBBY2NlcHRzIGEgZnVuY3Rpb24gYGZuYCBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgZ3VhcmRzIGludm9jYXRpb24gb2ZcbiAqIGBmbmAgc3VjaCB0aGF0IGBmbmAgY2FuIG9ubHkgZXZlciBiZSBjYWxsZWQgb25jZSwgbm8gbWF0dGVyIGhvdyBtYW55IHRpbWVzXG4gKiB0aGUgcmV0dXJuZWQgZnVuY3Rpb24gaXMgaW52b2tlZC4gVGhlIGZpcnN0IHZhbHVlIGNhbGN1bGF0ZWQgaXMgcmV0dXJuZWQgaW5cbiAqIHN1YnNlcXVlbnQgaW52b2NhdGlvbnMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKGEuLi4gLT4gYikgLT4gKGEuLi4gLT4gYilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byB3cmFwIGluIGEgY2FsbC1vbmx5LW9uY2Ugd3JhcHBlci5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgd3JhcHBlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYWRkT25lT25jZSA9IFIub25jZSh4ID0+IHggKyAxKTtcbiAqICAgICAgYWRkT25lT25jZSgxMCk7IC8vPT4gMTFcbiAqICAgICAgYWRkT25lT25jZShhZGRPbmVPbmNlKDUwKSk7IC8vPT4gMTFcbiAqL1xuXG5cbnZhciBvbmNlID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gb25jZShmbikge1xuICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gIHZhciByZXN1bHQ7XG4gIHJldHVybiBfYXJpdHkoZm4ubGVuZ3RoLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNhbGxlZCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY2FsbGVkID0gdHJ1ZTtcbiAgICByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG9uY2U7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgb25lIG9yIGJvdGggb2YgaXRzIGFyZ3VtZW50cyBhcmUgYHRydWVgLiBSZXR1cm5zIGBmYWxzZWBcbiAqIGlmIGJvdGggYXJndW1lbnRzIGFyZSBgZmFsc2VgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnIGEgLT4gYiAtPiBhIHwgYlxuICogQHBhcmFtIHtBbnl9IGFcbiAqIEBwYXJhbSB7QW55fSBiXG4gKiBAcmV0dXJuIHtBbnl9IHRoZSBmaXJzdCBhcmd1bWVudCBpZiB0cnV0aHksIG90aGVyd2lzZSB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICogQHNlZSBSLmVpdGhlclxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIub3IodHJ1ZSwgdHJ1ZSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLm9yKHRydWUsIGZhbHNlKTsgLy89PiB0cnVlXG4gKiAgICAgIFIub3IoZmFsc2UsIHRydWUpOyAvLz0+IHRydWVcbiAqICAgICAgUi5vcihmYWxzZSwgZmFsc2UpOyAvLz0+IGZhbHNlXG4gKi9cblxuXG52YXIgb3IgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBvcihhLCBiKSB7XG4gIHJldHVybiBhIHx8IGI7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gb3I7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8vIGBJZGVudGl0eWAgaXMgYSBmdW5jdG9yIHRoYXQgaG9sZHMgYSBzaW5nbGUgdmFsdWUsIHdoZXJlIGBtYXBgIHNpbXBseVxuLy8gdHJhbnNmb3JtcyB0aGUgaGVsZCB2YWx1ZSB3aXRoIHRoZSBwcm92aWRlZCBmdW5jdGlvbi5cblxuXG52YXIgSWRlbnRpdHkgPSBmdW5jdGlvbiAoeCkge1xuICByZXR1cm4geyB2YWx1ZTogeCwgbWFwOiBmdW5jdGlvbiAoZikge1xuICAgICAgcmV0dXJuIElkZW50aXR5KGYoeCkpO1xuICAgIH0gfTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIFwic2V0dGluZ1wiIHRoZSBwb3J0aW9uIG9mIHRoZSBnaXZlbiBkYXRhIHN0cnVjdHVyZVxuICogZm9jdXNlZCBieSB0aGUgZ2l2ZW4gbGVucyB0byB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIHRoZSBnaXZlbiBmdW5jdGlvbiB0b1xuICogdGhlIGZvY3VzZWQgdmFsdWUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTYuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHR5cGVkZWZuIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAqIEBzaWcgTGVucyBzIGEgLT4gKGEgLT4gYSkgLT4gcyAtPiBzXG4gKiBAcGFyYW0ge0xlbnN9IGxlbnNcbiAqIEBwYXJhbSB7Kn0gdlxuICogQHBhcmFtIHsqfSB4XG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLnByb3AsIFIubGVuc0luZGV4LCBSLmxlbnNQcm9wXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGhlYWRMZW5zID0gUi5sZW5zSW5kZXgoMCk7XG4gKlxuICogICAgICBSLm92ZXIoaGVhZExlbnMsIFIudG9VcHBlciwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ0ZPTycsICdiYXInLCAnYmF6J11cbiAqL1xudmFyIG92ZXIgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBvdmVyKGxlbnMsIGYsIHgpIHtcbiAgLy8gVGhlIHZhbHVlIHJldHVybmVkIGJ5IHRoZSBnZXR0ZXIgZnVuY3Rpb24gaXMgZmlyc3QgdHJhbnNmb3JtZWQgd2l0aCBgZmAsXG4gIC8vIHRoZW4gc2V0IGFzIHRoZSB2YWx1ZSBvZiBhbiBgSWRlbnRpdHlgLiBUaGlzIGlzIHRoZW4gbWFwcGVkIG92ZXIgd2l0aCB0aGVcbiAgLy8gc2V0dGVyIGZ1bmN0aW9uIG9mIHRoZSBsZW5zLlxuICByZXR1cm4gbGVucyhmdW5jdGlvbiAoeSkge1xuICAgIHJldHVybiBJZGVudGl0eShmKHkpKTtcbiAgfSkoeCkudmFsdWU7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gb3ZlcjsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBUYWtlcyB0d28gYXJndW1lbnRzLCBgZnN0YCBhbmQgYHNuZGAsIGFuZCByZXR1cm5zIGBbZnN0LCBzbmRdYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOC4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBhIC0+IGIgLT4gKGEsYilcbiAqIEBwYXJhbSB7Kn0gZnN0XG4gKiBAcGFyYW0geyp9IHNuZFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAc2VlIFIub2JqT2YsIFIub2ZcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnBhaXIoJ2ZvbycsICdiYXInKTsgLy89PiBbJ2ZvbycsICdiYXInXVxuICovXG5cblxudmFyIHBhaXIgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBwYWlyKGZzdCwgc25kKSB7XG4gIHJldHVybiBbZnN0LCBzbmRdO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHBhaXI7IiwidmFyIF9jb25jYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29uY2F0Jyk7XG5cbnZhciBfY3JlYXRlUGFydGlhbEFwcGxpY2F0b3IgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3JlYXRlUGFydGlhbEFwcGxpY2F0b3InKTtcblxuLyoqXG4gKiBUYWtlcyBhIGZ1bmN0aW9uIGBmYCBhbmQgYSBsaXN0IG9mIGFyZ3VtZW50cywgYW5kIHJldHVybnMgYSBmdW5jdGlvbiBgZ2AuXG4gKiBXaGVuIGFwcGxpZWQsIGBnYCByZXR1cm5zIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgYGZgIHRvIHRoZSBhcmd1bWVudHNcbiAqIHByb3ZpZGVkIGluaXRpYWxseSBmb2xsb3dlZCBieSB0aGUgYXJndW1lbnRzIHByb3ZpZGVkIHRvIGBnYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMC4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKChhLCBiLCBjLCAuLi4sIG4pIC0+IHgpIC0+IFthLCBiLCBjLCAuLi5dIC0+ICgoZCwgZSwgZiwgLi4uLCBuKSAtPiB4KVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICogQHBhcmFtIHtBcnJheX0gYXJnc1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAc2VlIFIucGFydGlhbFJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG11bHRpcGx5MiA9IChhLCBiKSA9PiBhICogYjtcbiAqICAgICAgdmFyIGRvdWJsZSA9IFIucGFydGlhbChtdWx0aXBseTIsIFsyXSk7XG4gKiAgICAgIGRvdWJsZSgyKTsgLy89PiA0XG4gKlxuICogICAgICB2YXIgZ3JlZXQgPSAoc2FsdXRhdGlvbiwgdGl0bGUsIGZpcnN0TmFtZSwgbGFzdE5hbWUpID0+XG4gKiAgICAgICAgc2FsdXRhdGlvbiArICcsICcgKyB0aXRsZSArICcgJyArIGZpcnN0TmFtZSArICcgJyArIGxhc3ROYW1lICsgJyEnO1xuICpcbiAqICAgICAgdmFyIHNheUhlbGxvID0gUi5wYXJ0aWFsKGdyZWV0LCBbJ0hlbGxvJ10pO1xuICogICAgICB2YXIgc2F5SGVsbG9Ub01zID0gUi5wYXJ0aWFsKHNheUhlbGxvLCBbJ01zLiddKTtcbiAqICAgICAgc2F5SGVsbG9Ub01zKCdKYW5lJywgJ0pvbmVzJyk7IC8vPT4gJ0hlbGxvLCBNcy4gSmFuZSBKb25lcyEnXG4gKiBAc3ltYiBSLnBhcnRpYWwoZiwgW2EsIGJdKShjLCBkKSA9IGYoYSwgYiwgYywgZClcbiAqL1xuXG5cbnZhciBwYXJ0aWFsID0gLyojX19QVVJFX18qL19jcmVhdGVQYXJ0aWFsQXBwbGljYXRvcihfY29uY2F0KTtcbm1vZHVsZS5leHBvcnRzID0gcGFydGlhbDsiLCJ2YXIgX2NvbmNhdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcblxudmFyIF9jcmVhdGVQYXJ0aWFsQXBwbGljYXRvciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jcmVhdGVQYXJ0aWFsQXBwbGljYXRvcicpO1xuXG52YXIgZmxpcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ZsaXAnKTtcblxuLyoqXG4gKiBUYWtlcyBhIGZ1bmN0aW9uIGBmYCBhbmQgYSBsaXN0IG9mIGFyZ3VtZW50cywgYW5kIHJldHVybnMgYSBmdW5jdGlvbiBgZ2AuXG4gKiBXaGVuIGFwcGxpZWQsIGBnYCByZXR1cm5zIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgYGZgIHRvIHRoZSBhcmd1bWVudHNcbiAqIHByb3ZpZGVkIHRvIGBnYCBmb2xsb3dlZCBieSB0aGUgYXJndW1lbnRzIHByb3ZpZGVkIGluaXRpYWxseS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMC4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKChhLCBiLCBjLCAuLi4sIG4pIC0+IHgpIC0+IFtkLCBlLCBmLCAuLi4sIG5dIC0+ICgoYSwgYiwgYywgLi4uKSAtPiB4KVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICogQHBhcmFtIHtBcnJheX0gYXJnc1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAc2VlIFIucGFydGlhbFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBncmVldCA9IChzYWx1dGF0aW9uLCB0aXRsZSwgZmlyc3ROYW1lLCBsYXN0TmFtZSkgPT5cbiAqICAgICAgICBzYWx1dGF0aW9uICsgJywgJyArIHRpdGxlICsgJyAnICsgZmlyc3ROYW1lICsgJyAnICsgbGFzdE5hbWUgKyAnISc7XG4gKlxuICogICAgICB2YXIgZ3JlZXRNc0phbmVKb25lcyA9IFIucGFydGlhbFJpZ2h0KGdyZWV0LCBbJ01zLicsICdKYW5lJywgJ0pvbmVzJ10pO1xuICpcbiAqICAgICAgZ3JlZXRNc0phbmVKb25lcygnSGVsbG8nKTsgLy89PiAnSGVsbG8sIE1zLiBKYW5lIEpvbmVzISdcbiAqIEBzeW1iIFIucGFydGlhbFJpZ2h0KGYsIFthLCBiXSkoYywgZCkgPSBmKGMsIGQsIGEsIGIpXG4gKi9cblxuXG52YXIgcGFydGlhbFJpZ2h0ID0gLyojX19QVVJFX18qL19jcmVhdGVQYXJ0aWFsQXBwbGljYXRvciggLyojX19QVVJFX18qL2ZsaXAoX2NvbmNhdCkpO1xubW9kdWxlLmV4cG9ydHMgPSBwYXJ0aWFsUmlnaHQ7IiwidmFyIGZpbHRlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ZpbHRlcicpO1xuXG52YXIganV4dCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2p1eHQnKTtcblxudmFyIHJlamVjdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlamVjdCcpO1xuXG4vKipcbiAqIFRha2VzIGEgcHJlZGljYXRlIGFuZCBhIGxpc3Qgb3Igb3RoZXIgYEZpbHRlcmFibGVgIG9iamVjdCBhbmQgcmV0dXJucyB0aGVcbiAqIHBhaXIgb2YgZmlsdGVyYWJsZSBvYmplY3RzIG9mIHRoZSBzYW1lIHR5cGUgb2YgZWxlbWVudHMgd2hpY2ggZG8gYW5kIGRvIG5vdFxuICogc2F0aXNmeSwgdGhlIHByZWRpY2F0ZSwgcmVzcGVjdGl2ZWx5LiBGaWx0ZXJhYmxlIG9iamVjdHMgaW5jbHVkZSBwbGFpbiBvYmplY3RzIG9yIGFueSBvYmplY3RcbiAqIHRoYXQgaGFzIGEgZmlsdGVyIG1ldGhvZCBzdWNoIGFzIGBBcnJheWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS40XG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBGaWx0ZXJhYmxlIGYgPT4gKGEgLT4gQm9vbGVhbikgLT4gZiBhIC0+IFtmIGEsIGYgYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgdG8gZGV0ZXJtaW5lIHdoaWNoIHNpZGUgdGhlIGVsZW1lbnQgYmVsb25ncyB0by5cbiAqIEBwYXJhbSB7QXJyYXl9IGZpbHRlcmFibGUgdGhlIGxpc3QgKG9yIG90aGVyIGZpbHRlcmFibGUpIHRvIHBhcnRpdGlvbi5cbiAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSwgY29udGFpbmluZyBmaXJzdCB0aGUgc3Vic2V0IG9mIGVsZW1lbnRzIHRoYXQgc2F0aXNmeSB0aGVcbiAqICAgICAgICAgcHJlZGljYXRlLCBhbmQgc2Vjb25kIHRoZSBzdWJzZXQgb2YgZWxlbWVudHMgdGhhdCBkbyBub3Qgc2F0aXNmeS5cbiAqIEBzZWUgUi5maWx0ZXIsIFIucmVqZWN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wYXJ0aXRpb24oUi5jb250YWlucygncycpLCBbJ3NzcycsICd0dHQnLCAnZm9vJywgJ2JhcnMnXSk7XG4gKiAgICAgIC8vID0+IFsgWyAnc3NzJywgJ2JhcnMnIF0sICBbICd0dHQnLCAnZm9vJyBdIF1cbiAqXG4gKiAgICAgIFIucGFydGl0aW9uKFIuY29udGFpbnMoJ3MnKSwgeyBhOiAnc3NzJywgYjogJ3R0dCcsIGZvbzogJ2JhcnMnIH0pO1xuICogICAgICAvLyA9PiBbIHsgYTogJ3NzcycsIGZvbzogJ2JhcnMnIH0sIHsgYjogJ3R0dCcgfSAgXVxuICovXG5cblxudmFyIHBhcnRpdGlvbiA9IC8qI19fUFVSRV9fKi9qdXh0KFtmaWx0ZXIsIHJlamVjdF0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXJ0aXRpb247IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIHZhbHVlIGF0IGEgZ2l2ZW4gcGF0aC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBJZHggPSBTdHJpbmcgfCBJbnRcbiAqIEBzaWcgW0lkeF0gLT4ge2F9IC0+IGEgfCBVbmRlZmluZWRcbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGggVGhlIHBhdGggdG8gdXNlLlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHJldHJpZXZlIHRoZSBuZXN0ZWQgcHJvcGVydHkgZnJvbS5cbiAqIEByZXR1cm4geyp9IFRoZSBkYXRhIGF0IGBwYXRoYC5cbiAqIEBzZWUgUi5wcm9wXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wYXRoKFsnYScsICdiJ10sIHthOiB7YjogMn19KTsgLy89PiAyXG4gKiAgICAgIFIucGF0aChbJ2EnLCAnYiddLCB7Yzoge2I6IDJ9fSk7IC8vPT4gdW5kZWZpbmVkXG4gKi9cblxuXG52YXIgcGF0aCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHBhdGgocGF0aHMsIG9iaikge1xuICB2YXIgdmFsID0gb2JqO1xuICB2YXIgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IHBhdGhzLmxlbmd0aCkge1xuICAgIGlmICh2YWwgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YWwgPSB2YWxbcGF0aHNbaWR4XV07XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHZhbDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgZXF1YWxzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZXF1YWxzJyk7XG5cbnZhciBwYXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGF0aCcpO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIG5lc3RlZCBwYXRoIG9uIGFuIG9iamVjdCBoYXMgYSBzcGVjaWZpYyB2YWx1ZSwgaW5cbiAqIFtgUi5lcXVhbHNgXSgjZXF1YWxzKSB0ZXJtcy4gTW9zdCBsaWtlbHkgdXNlZCB0byBmaWx0ZXIgYSBsaXN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjcuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAdHlwZWRlZm4gSWR4ID0gU3RyaW5nIHwgSW50XG4gKiBAc2lnIFtJZHhdIC0+IGEgLT4ge2F9IC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGggVGhlIHBhdGggb2YgdGhlIG5lc3RlZCBwcm9wZXJ0eSB0byB1c2VcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byBjb21wYXJlIHRoZSBuZXN0ZWQgcHJvcGVydHkgd2l0aFxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGNoZWNrIHRoZSBuZXN0ZWQgcHJvcGVydHkgaW5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgdmFsdWUgZXF1YWxzIHRoZSBuZXN0ZWQgb2JqZWN0IHByb3BlcnR5LFxuICogICAgICAgICBgZmFsc2VgIG90aGVyd2lzZS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgdXNlcjEgPSB7IGFkZHJlc3M6IHsgemlwQ29kZTogOTAyMTAgfSB9O1xuICogICAgICB2YXIgdXNlcjIgPSB7IGFkZHJlc3M6IHsgemlwQ29kZTogNTU1NTUgfSB9O1xuICogICAgICB2YXIgdXNlcjMgPSB7IG5hbWU6ICdCb2InIH07XG4gKiAgICAgIHZhciB1c2VycyA9IFsgdXNlcjEsIHVzZXIyLCB1c2VyMyBdO1xuICogICAgICB2YXIgaXNGYW1vdXMgPSBSLnBhdGhFcShbJ2FkZHJlc3MnLCAnemlwQ29kZSddLCA5MDIxMCk7XG4gKiAgICAgIFIuZmlsdGVyKGlzRmFtb3VzLCB1c2Vycyk7IC8vPT4gWyB1c2VyMSBdXG4gKi9cblxuXG52YXIgcGF0aEVxID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gcGF0aEVxKF9wYXRoLCB2YWwsIG9iaikge1xuICByZXR1cm4gZXF1YWxzKHBhdGgoX3BhdGgsIG9iaiksIHZhbCk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcGF0aEVxOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgZGVmYXVsdFRvID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZGVmYXVsdFRvJyk7XG5cbnZhciBwYXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGF0aCcpO1xuXG4vKipcbiAqIElmIHRoZSBnaXZlbiwgbm9uLW51bGwgb2JqZWN0IGhhcyBhIHZhbHVlIGF0IHRoZSBnaXZlbiBwYXRoLCByZXR1cm5zIHRoZVxuICogdmFsdWUgYXQgdGhhdCBwYXRoLiBPdGhlcndpc2UgcmV0dXJucyB0aGUgcHJvdmlkZWQgZGVmYXVsdCB2YWx1ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAdHlwZWRlZm4gSWR4ID0gU3RyaW5nIHwgSW50XG4gKiBAc2lnIGEgLT4gW0lkeF0gLT4ge2F9IC0+IGFcbiAqIEBwYXJhbSB7Kn0gZCBUaGUgZGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IHAgVGhlIHBhdGggdG8gdXNlLlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHJldHJpZXZlIHRoZSBuZXN0ZWQgcHJvcGVydHkgZnJvbS5cbiAqIEByZXR1cm4geyp9IFRoZSBkYXRhIGF0IGBwYXRoYCBvZiB0aGUgc3VwcGxpZWQgb2JqZWN0IG9yIHRoZSBkZWZhdWx0IHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucGF0aE9yKCdOL0EnLCBbJ2EnLCAnYiddLCB7YToge2I6IDJ9fSk7IC8vPT4gMlxuICogICAgICBSLnBhdGhPcignTi9BJywgWydhJywgJ2InXSwge2M6IHtiOiAyfX0pOyAvLz0+IFwiTi9BXCJcbiAqL1xuXG5cbnZhciBwYXRoT3IgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBwYXRoT3IoZCwgcCwgb2JqKSB7XG4gIHJldHVybiBkZWZhdWx0VG8oZCwgcGF0aChwLCBvYmopKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoT3I7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBwYXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGF0aCcpO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBzcGVjaWZpZWQgb2JqZWN0IHByb3BlcnR5IGF0IGdpdmVuIHBhdGggc2F0aXNmaWVzIHRoZVxuICogZ2l2ZW4gcHJlZGljYXRlOyBgZmFsc2VgIG90aGVyd2lzZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEB0eXBlZGVmbiBJZHggPSBTdHJpbmcgfCBJbnRcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW0lkeF0gLT4ge2F9IC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRcbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BQYXRoXG4gKiBAcGFyYW0geyp9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBzZWUgUi5wcm9wU2F0aXNmaWVzLCBSLnBhdGhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnBhdGhTYXRpc2ZpZXMoeSA9PiB5ID4gMCwgWyd4JywgJ3knXSwge3g6IHt5OiAyfX0pOyAvLz0+IHRydWVcbiAqL1xuXG5cbnZhciBwYXRoU2F0aXNmaWVzID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gcGF0aFNhdGlzZmllcyhwcmVkLCBwcm9wUGF0aCwgb2JqKSB7XG4gIHJldHVybiBwcm9wUGF0aC5sZW5ndGggPiAwICYmIHByZWQocGF0aChwcm9wUGF0aCwgb2JqKSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcGF0aFNhdGlzZmllczsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGFydGlhbCBjb3B5IG9mIGFuIG9iamVjdCBjb250YWluaW5nIG9ubHkgdGhlIGtleXMgc3BlY2lmaWVkLiBJZlxuICogdGhlIGtleSBkb2VzIG5vdCBleGlzdCwgdGhlIHByb3BlcnR5IGlzIGlnbm9yZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIFtrXSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gKiBAcGFyYW0ge0FycmF5fSBuYW1lcyBhbiBhcnJheSBvZiBTdHJpbmcgcHJvcGVydHkgbmFtZXMgdG8gY29weSBvbnRvIGEgbmV3IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGNvcHkgZnJvbVxuICogQHJldHVybiB7T2JqZWN0fSBBIG5ldyBvYmplY3Qgd2l0aCBvbmx5IHByb3BlcnRpZXMgZnJvbSBgbmFtZXNgIG9uIGl0LlxuICogQHNlZSBSLm9taXQsIFIucHJvcHNcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnBpY2soWydhJywgJ2QnXSwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YTogMSwgZDogNH1cbiAqICAgICAgUi5waWNrKFsnYScsICdlJywgJ2YnXSwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YTogMX1cbiAqL1xuXG5cbnZhciBwaWNrID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gcGljayhuYW1lcywgb2JqKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgdmFyIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBuYW1lcy5sZW5ndGgpIHtcbiAgICBpZiAobmFtZXNbaWR4XSBpbiBvYmopIHtcbiAgICAgIHJlc3VsdFtuYW1lc1tpZHhdXSA9IG9ialtuYW1lc1tpZHhdXTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBwaWNrOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gYHBpY2tgIGV4Y2VwdCB0aGF0IHRoaXMgb25lIGluY2x1ZGVzIGEgYGtleTogdW5kZWZpbmVkYCBwYWlyIGZvclxuICogcHJvcGVydGllcyB0aGF0IGRvbid0IGV4aXN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyBba10gLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICogQHBhcmFtIHtBcnJheX0gbmFtZXMgYW4gYXJyYXkgb2YgU3RyaW5nIHByb3BlcnR5IG5hbWVzIHRvIGNvcHkgb250byBhIG5ldyBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBjb3B5IGZyb21cbiAqIEByZXR1cm4ge09iamVjdH0gQSBuZXcgb2JqZWN0IHdpdGggb25seSBwcm9wZXJ0aWVzIGZyb20gYG5hbWVzYCBvbiBpdC5cbiAqIEBzZWUgUi5waWNrXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5waWNrQWxsKFsnYScsICdkJ10sIHthOiAxLCBiOiAyLCBjOiAzLCBkOiA0fSk7IC8vPT4ge2E6IDEsIGQ6IDR9XG4gKiAgICAgIFIucGlja0FsbChbJ2EnLCAnZScsICdmJ10sIHthOiAxLCBiOiAyLCBjOiAzLCBkOiA0fSk7IC8vPT4ge2E6IDEsIGU6IHVuZGVmaW5lZCwgZjogdW5kZWZpbmVkfVxuICovXG5cblxudmFyIHBpY2tBbGwgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBwaWNrQWxsKG5hbWVzLCBvYmopIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IG5hbWVzLmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIHZhciBuYW1lID0gbmFtZXNbaWR4XTtcbiAgICByZXN1bHRbbmFtZV0gPSBvYmpbbmFtZV07XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBwaWNrQWxsOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFJldHVybnMgYSBwYXJ0aWFsIGNvcHkgb2YgYW4gb2JqZWN0IGNvbnRhaW5pbmcgb25seSB0aGUga2V5cyB0aGF0IHNhdGlzZnlcbiAqIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnICgodiwgaykgLT4gQm9vbGVhbikgLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3QgYSBrZXlcbiAqICAgICAgICBzaG91bGQgYmUgaW5jbHVkZWQgb24gdGhlIG91dHB1dCBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY29weSBmcm9tXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgbmV3IG9iamVjdCB3aXRoIG9ubHkgcHJvcGVydGllcyB0aGF0IHNhdGlzZnkgYHByZWRgXG4gKiAgICAgICAgIG9uIGl0LlxuICogQHNlZSBSLnBpY2ssIFIuZmlsdGVyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzVXBwZXJDYXNlID0gKHZhbCwga2V5KSA9PiBrZXkudG9VcHBlckNhc2UoKSA9PT0ga2V5O1xuICogICAgICBSLnBpY2tCeShpc1VwcGVyQ2FzZSwge2E6IDEsIGI6IDIsIEE6IDMsIEI6IDR9KTsgLy89PiB7QTogMywgQjogNH1cbiAqL1xuXG5cbnZhciBwaWNrQnkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBwaWNrQnkodGVzdCwgb2JqKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcbiAgICBpZiAodGVzdChvYmpbcHJvcF0sIHByb3AsIG9iaikpIHtcbiAgICAgIHJlc3VsdFtwcm9wXSA9IG9ialtwcm9wXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBwaWNrQnk7IiwidmFyIF9hcml0eSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xuXG52YXIgX3BpcGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fcGlwZScpO1xuXG52YXIgcmVkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVkdWNlJyk7XG5cbnZhciB0YWlsID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdGFpbCcpO1xuXG4vKipcbiAqIFBlcmZvcm1zIGxlZnQtdG8tcmlnaHQgZnVuY3Rpb24gY29tcG9zaXRpb24uIFRoZSBsZWZ0bW9zdCBmdW5jdGlvbiBtYXkgaGF2ZVxuICogYW55IGFyaXR5OyB0aGUgcmVtYWluaW5nIGZ1bmN0aW9ucyBtdXN0IGJlIHVuYXJ5LlxuICpcbiAqIEluIHNvbWUgbGlicmFyaWVzIHRoaXMgZnVuY3Rpb24gaXMgbmFtZWQgYHNlcXVlbmNlYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIHJlc3VsdCBvZiBwaXBlIGlzIG5vdCBhdXRvbWF0aWNhbGx5IGN1cnJpZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCgoYSwgYiwgLi4uLCBuKSAtPiBvKSwgKG8gLT4gcCksIC4uLiwgKHggLT4geSksICh5IC0+IHopKSAtPiAoKGEsIGIsIC4uLiwgbikgLT4geilcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmN0aW9uc1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAc2VlIFIuY29tcG9zZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBmID0gUi5waXBlKE1hdGgucG93LCBSLm5lZ2F0ZSwgUi5pbmMpO1xuICpcbiAqICAgICAgZigzLCA0KTsgLy8gLSgzXjQpICsgMVxuICogQHN5bWIgUi5waXBlKGYsIGcsIGgpKGEsIGIpID0gaChnKGYoYSwgYikpKVxuICovXG5cblxuZnVuY3Rpb24gcGlwZSgpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BpcGUgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIF9hcml0eShhcmd1bWVudHNbMF0ubGVuZ3RoLCByZWR1Y2UoX3BpcGUsIGFyZ3VtZW50c1swXSwgdGFpbChhcmd1bWVudHMpKSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IHBpcGU7IiwidmFyIGNvbXBvc2VLID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY29tcG9zZUsnKTtcblxudmFyIHJldmVyc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZXZlcnNlJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbGVmdC10by1yaWdodCBLbGVpc2xpIGNvbXBvc2l0aW9uIG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbnMsXG4gKiBlYWNoIG9mIHdoaWNoIG11c3QgcmV0dXJuIGEgdmFsdWUgb2YgYSB0eXBlIHN1cHBvcnRlZCBieSBbYGNoYWluYF0oI2NoYWluKS5cbiAqXG4gKiBgUi5waXBlSyhmLCBnLCBoKWAgaXMgZXF1aXZhbGVudCB0byBgUi5waXBlKGYsIFIuY2hhaW4oZyksIFIuY2hhaW4oaCkpYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNi4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgQ2hhaW4gbSA9PiAoKGEgLT4gbSBiKSwgKGIgLT4gbSBjKSwgLi4uLCAoeSAtPiBtIHopKSAtPiAoYSAtPiBtIHopXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAc2VlIFIuY29tcG9zZUtcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICAvLyAgcGFyc2VKc29uIDo6IFN0cmluZyAtPiBNYXliZSAqXG4gKiAgICAgIC8vICBnZXQgOjogU3RyaW5nIC0+IE9iamVjdCAtPiBNYXliZSAqXG4gKlxuICogICAgICAvLyAgZ2V0U3RhdGVDb2RlIDo6IE1heWJlIFN0cmluZyAtPiBNYXliZSBTdHJpbmdcbiAqICAgICAgdmFyIGdldFN0YXRlQ29kZSA9IFIucGlwZUsoXG4gKiAgICAgICAgcGFyc2VKc29uLFxuICogICAgICAgIGdldCgndXNlcicpLFxuICogICAgICAgIGdldCgnYWRkcmVzcycpLFxuICogICAgICAgIGdldCgnc3RhdGUnKSxcbiAqICAgICAgICBSLmNvbXBvc2UoTWF5YmUub2YsIFIudG9VcHBlcilcbiAqICAgICAgKTtcbiAqXG4gKiAgICAgIGdldFN0YXRlQ29kZSgne1widXNlclwiOntcImFkZHJlc3NcIjp7XCJzdGF0ZVwiOlwibnlcIn19fScpO1xuICogICAgICAvLz0+IEp1c3QoJ05ZJylcbiAqICAgICAgZ2V0U3RhdGVDb2RlKCdbSW52YWxpZCBKU09OXScpO1xuICogICAgICAvLz0+IE5vdGhpbmcoKVxuICogQHN5bWIgUi5waXBlSyhmLCBnLCBoKShhKSA9IFIuY2hhaW4oaCwgUi5jaGFpbihnLCBmKGEpKSlcbiAqL1xuXG5cbmZ1bmN0aW9uIHBpcGVLKCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigncGlwZUsgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIGNvbXBvc2VLLmFwcGx5KHRoaXMsIHJldmVyc2UoYXJndW1lbnRzKSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IHBpcGVLOyIsInZhciBfYXJpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXJpdHknKTtcblxudmFyIF9waXBlUCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19waXBlUCcpO1xuXG52YXIgcmVkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVkdWNlJyk7XG5cbnZhciB0YWlsID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdGFpbCcpO1xuXG4vKipcbiAqIFBlcmZvcm1zIGxlZnQtdG8tcmlnaHQgY29tcG9zaXRpb24gb2Ygb25lIG9yIG1vcmUgUHJvbWlzZS1yZXR1cm5pbmdcbiAqIGZ1bmN0aW9ucy4gVGhlIGxlZnRtb3N0IGZ1bmN0aW9uIG1heSBoYXZlIGFueSBhcml0eTsgdGhlIHJlbWFpbmluZyBmdW5jdGlvbnNcbiAqIG11c3QgYmUgdW5hcnkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTAuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoYSAtPiBQcm9taXNlIGIpLCAoYiAtPiBQcm9taXNlIGMpLCAuLi4sICh5IC0+IFByb21pc2UgeikpIC0+IChhIC0+IFByb21pc2UgeilcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmN0aW9uc1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAc2VlIFIuY29tcG9zZVBcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICAvLyAgZm9sbG93ZXJzRm9yVXNlciA6OiBTdHJpbmcgLT4gUHJvbWlzZSBbVXNlcl1cbiAqICAgICAgdmFyIGZvbGxvd2Vyc0ZvclVzZXIgPSBSLnBpcGVQKGRiLmdldFVzZXJCeUlkLCBkYi5nZXRGb2xsb3dlcnMpO1xuICovXG5cblxuZnVuY3Rpb24gcGlwZVAoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwaXBlUCByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgfVxuICByZXR1cm4gX2FyaXR5KGFyZ3VtZW50c1swXS5sZW5ndGgsIHJlZHVjZShfcGlwZVAsIGFyZ3VtZW50c1swXSwgdGFpbChhcmd1bWVudHMpKSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IHBpcGVQOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgbWFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWFwJyk7XG5cbnZhciBwcm9wID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcHJvcCcpO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCBieSBwbHVja2luZyB0aGUgc2FtZSBuYW1lZCBwcm9wZXJ0eSBvZmYgYWxsIG9iamVjdHMgaW5cbiAqIHRoZSBsaXN0IHN1cHBsaWVkLlxuICpcbiAqIGBwbHVja2Agd2lsbCB3b3JrIG9uXG4gKiBhbnkgW2Z1bmN0b3JdKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjZnVuY3RvcikgaW5cbiAqIGFkZGl0aW9uIHRvIGFycmF5cywgYXMgaXQgaXMgZXF1aXZhbGVudCB0byBgUi5tYXAoUi5wcm9wKGspLCBmKWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBGdW5jdG9yIGYgPT4gayAtPiBmIHtrOiB2fSAtPiBmIHZcbiAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30ga2V5IFRoZSBrZXkgbmFtZSB0byBwbHVjayBvZmYgb2YgZWFjaCBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5fSBmIFRoZSBhcnJheSBvciBmdW5jdG9yIHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBsaXN0IG9mIHZhbHVlcyBmb3IgdGhlIGdpdmVuIGtleS5cbiAqIEBzZWUgUi5wcm9wc1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucGx1Y2soJ2EnKShbe2E6IDF9LCB7YTogMn1dKTsgLy89PiBbMSwgMl1cbiAqICAgICAgUi5wbHVjaygwKShbWzEsIDJdLCBbMywgNF1dKTsgICAvLz0+IFsxLCAzXVxuICogICAgICBSLnBsdWNrKCd2YWwnLCB7YToge3ZhbDogM30sIGI6IHt2YWw6IDV9fSk7IC8vPT4ge2E6IDMsIGI6IDV9XG4gKiBAc3ltYiBSLnBsdWNrKCd4JywgW3t4OiAxLCB5OiAyfSwge3g6IDMsIHk6IDR9LCB7eDogNSwgeTogNn1dKSA9IFsxLCAzLCA1XVxuICogQHN5bWIgUi5wbHVjaygwLCBbWzEsIDJdLCBbMywgNF0sIFs1LCA2XV0pID0gWzEsIDMsIDVdXG4gKi9cblxuXG52YXIgcGx1Y2sgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBwbHVjayhwLCBsaXN0KSB7XG4gIHJldHVybiBtYXAocHJvcChwKSwgbGlzdCk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcGx1Y2s7IiwidmFyIF9jb25jYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29uY2F0Jyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCB3aXRoIHRoZSBnaXZlbiBlbGVtZW50IGF0IHRoZSBmcm9udCwgZm9sbG93ZWQgYnkgdGhlXG4gKiBjb250ZW50cyBvZiB0aGUgbGlzdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIGEgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHsqfSBlbCBUaGUgaXRlbSB0byBhZGQgdG8gdGhlIGhlYWQgb2YgdGhlIG91dHB1dCBsaXN0LlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gYWRkIHRvIHRoZSB0YWlsIG9mIHRoZSBvdXRwdXQgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBhcnJheS5cbiAqIEBzZWUgUi5hcHBlbmRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnByZXBlbmQoJ2ZlZScsIFsnZmknLCAnZm8nLCAnZnVtJ10pOyAvLz0+IFsnZmVlJywgJ2ZpJywgJ2ZvJywgJ2Z1bSddXG4gKi9cblxuXG52YXIgcHJlcGVuZCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHByZXBlbmQoZWwsIGxpc3QpIHtcbiAgcmV0dXJuIF9jb25jYXQoW2VsXSwgbGlzdCk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcHJlcGVuZDsiLCJ2YXIgbXVsdGlwbHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tdWx0aXBseScpO1xuXG52YXIgcmVkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVkdWNlJyk7XG5cbi8qKlxuICogTXVsdGlwbGllcyB0b2dldGhlciBhbGwgdGhlIGVsZW1lbnRzIG9mIGEgbGlzdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIFtOdW1iZXJdIC0+IE51bWJlclxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBBbiBhcnJheSBvZiBudW1iZXJzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBwcm9kdWN0IG9mIGFsbCB0aGUgbnVtYmVycyBpbiB0aGUgbGlzdC5cbiAqIEBzZWUgUi5yZWR1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnByb2R1Y3QoWzIsNCw2LDgsMTAwLDFdKTsgLy89PiAzODQwMFxuICovXG5cblxudmFyIHByb2R1Y3QgPSAvKiNfX1BVUkVfXyovcmVkdWNlKG11bHRpcGx5LCAxKTtcbm1vZHVsZS5leHBvcnRzID0gcHJvZHVjdDsiLCJ2YXIgX21hcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19tYXAnKTtcblxudmFyIGlkZW50aXR5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaWRlbnRpdHknKTtcblxudmFyIHBpY2tBbGwgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9waWNrQWxsJyk7XG5cbnZhciB1c2VXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdXNlV2l0aCcpO1xuXG4vKipcbiAqIFJlYXNvbmFibGUgYW5hbG9nIHRvIFNRTCBgc2VsZWN0YCBzdGF0ZW1lbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgW2tdIC0+IFt7azogdn1dIC0+IFt7azogdn1dXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gcHJvamVjdFxuICogQHBhcmFtIHtBcnJheX0gb2JqcyBUaGUgb2JqZWN0cyB0byBxdWVyeVxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIG9iamVjdHMgd2l0aCBqdXN0IHRoZSBgcHJvcHNgIHByb3BlcnRpZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGFiYnkgPSB7bmFtZTogJ0FiYnknLCBhZ2U6IDcsIGhhaXI6ICdibG9uZCcsIGdyYWRlOiAyfTtcbiAqICAgICAgdmFyIGZyZWQgPSB7bmFtZTogJ0ZyZWQnLCBhZ2U6IDEyLCBoYWlyOiAnYnJvd24nLCBncmFkZTogN307XG4gKiAgICAgIHZhciBraWRzID0gW2FiYnksIGZyZWRdO1xuICogICAgICBSLnByb2plY3QoWyduYW1lJywgJ2dyYWRlJ10sIGtpZHMpOyAvLz0+IFt7bmFtZTogJ0FiYnknLCBncmFkZTogMn0sIHtuYW1lOiAnRnJlZCcsIGdyYWRlOiA3fV1cbiAqL1xuXG5cbnZhciBwcm9qZWN0ID0gLyojX19QVVJFX18qL3VzZVdpdGgoX21hcCwgW3BpY2tBbGwsIGlkZW50aXR5XSk7IC8vIHBhc3NpbmcgYGlkZW50aXR5YCBnaXZlcyBjb3JyZWN0IGFyaXR5XG5tb2R1bGUuZXhwb3J0cyA9IHByb2plY3Q7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBwYXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGF0aCcpO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdoZW4gc3VwcGxpZWQgYW4gb2JqZWN0IHJldHVybnMgdGhlIGluZGljYXRlZFxuICogcHJvcGVydHkgb2YgdGhhdCBvYmplY3QsIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgcyAtPiB7czogYX0gLT4gYSB8IFVuZGVmaW5lZFxuICogQHBhcmFtIHtTdHJpbmd9IHAgVGhlIHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBxdWVyeVxuICogQHJldHVybiB7Kn0gVGhlIHZhbHVlIGF0IGBvYmoucGAuXG4gKiBAc2VlIFIucGF0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucHJvcCgneCcsIHt4OiAxMDB9KTsgLy89PiAxMDBcbiAqICAgICAgUi5wcm9wKCd4Jywge30pOyAvLz0+IHVuZGVmaW5lZFxuICovXG5cbnZhciBwcm9wID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gcHJvcChwLCBvYmopIHtcbiAgcmV0dXJuIHBhdGgoW3BdLCBvYmopO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHByb3A7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBlcXVhbHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9lcXVhbHMnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgc3BlY2lmaWVkIG9iamVjdCBwcm9wZXJ0eSBpcyBlcXVhbCwgaW5cbiAqIFtgUi5lcXVhbHNgXSgjZXF1YWxzKSB0ZXJtcywgdG8gdGhlIGdpdmVuIHZhbHVlOyBgZmFsc2VgIG90aGVyd2lzZS5cbiAqIFlvdSBjYW4gdGVzdCBtdWx0aXBsZSBwcm9wZXJ0aWVzIHdpdGggW2BSLndoZXJlYF0oI3doZXJlKS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBTdHJpbmcgLT4gYSAtPiBPYmplY3QgLT4gQm9vbGVhblxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcGFyYW0geyp9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBzZWUgUi53aGVyZUVxLCBSLnByb3BTYXRpc2ZpZXMsIFIuZXF1YWxzXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGFiYnkgPSB7bmFtZTogJ0FiYnknLCBhZ2U6IDcsIGhhaXI6ICdibG9uZCd9O1xuICogICAgICB2YXIgZnJlZCA9IHtuYW1lOiAnRnJlZCcsIGFnZTogMTIsIGhhaXI6ICdicm93bid9O1xuICogICAgICB2YXIgcnVzdHkgPSB7bmFtZTogJ1J1c3R5JywgYWdlOiAxMCwgaGFpcjogJ2Jyb3duJ307XG4gKiAgICAgIHZhciBhbG9pcyA9IHtuYW1lOiAnQWxvaXMnLCBhZ2U6IDE1LCBkaXNwb3NpdGlvbjogJ3N1cmx5J307XG4gKiAgICAgIHZhciBraWRzID0gW2FiYnksIGZyZWQsIHJ1c3R5LCBhbG9pc107XG4gKiAgICAgIHZhciBoYXNCcm93bkhhaXIgPSBSLnByb3BFcSgnaGFpcicsICdicm93bicpO1xuICogICAgICBSLmZpbHRlcihoYXNCcm93bkhhaXIsIGtpZHMpOyAvLz0+IFtmcmVkLCBydXN0eV1cbiAqL1xuXG5cbnZhciBwcm9wRXEgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBwcm9wRXEobmFtZSwgdmFsLCBvYmopIHtcbiAgcmV0dXJuIGVxdWFscyh2YWwsIG9ialtuYW1lXSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcHJvcEVxOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgaXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pcycpO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBzcGVjaWZpZWQgb2JqZWN0IHByb3BlcnR5IGlzIG9mIHRoZSBnaXZlbiB0eXBlO1xuICogYGZhbHNlYCBvdGhlcndpc2UuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTYuMFxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBzaWcgVHlwZSAtPiBTdHJpbmcgLT4gT2JqZWN0IC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHR5cGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0geyp9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBzZWUgUi5pcywgUi5wcm9wU2F0aXNmaWVzXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wcm9wSXMoTnVtYmVyLCAneCcsIHt4OiAxLCB5OiAyfSk7ICAvLz0+IHRydWVcbiAqICAgICAgUi5wcm9wSXMoTnVtYmVyLCAneCcsIHt4OiAnZm9vJ30pOyAgICAvLz0+IGZhbHNlXG4gKiAgICAgIFIucHJvcElzKE51bWJlciwgJ3gnLCB7fSk7ICAgICAgICAgICAgLy89PiBmYWxzZVxuICovXG5cblxudmFyIHByb3BJcyA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIHByb3BJcyh0eXBlLCBuYW1lLCBvYmopIHtcbiAgcmV0dXJuIGlzKHR5cGUsIG9ialtuYW1lXSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcHJvcElzOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgX2hhcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19oYXMnKTtcblxuLyoqXG4gKiBJZiB0aGUgZ2l2ZW4sIG5vbi1udWxsIG9iamVjdCBoYXMgYW4gb3duIHByb3BlcnR5IHdpdGggdGhlIHNwZWNpZmllZCBuYW1lLFxuICogcmV0dXJucyB0aGUgdmFsdWUgb2YgdGhhdCBwcm9wZXJ0eS4gT3RoZXJ3aXNlIHJldHVybnMgdGhlIHByb3ZpZGVkIGRlZmF1bHRcbiAqIHZhbHVlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjYuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyBhIC0+IFN0cmluZyAtPiBPYmplY3QgLT4gYVxuICogQHBhcmFtIHsqfSB2YWwgVGhlIGRlZmF1bHQgdmFsdWUuXG4gKiBAcGFyYW0ge1N0cmluZ30gcCBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gcmV0dXJuLlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybiB7Kn0gVGhlIHZhbHVlIG9mIGdpdmVuIHByb3BlcnR5IG9mIHRoZSBzdXBwbGllZCBvYmplY3Qgb3IgdGhlIGRlZmF1bHQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGFsaWNlID0ge1xuICogICAgICAgIG5hbWU6ICdBTElDRScsXG4gKiAgICAgICAgYWdlOiAxMDFcbiAqICAgICAgfTtcbiAqICAgICAgdmFyIGZhdm9yaXRlID0gUi5wcm9wKCdmYXZvcml0ZUxpYnJhcnknKTtcbiAqICAgICAgdmFyIGZhdm9yaXRlV2l0aERlZmF1bHQgPSBSLnByb3BPcignUmFtZGEnLCAnZmF2b3JpdGVMaWJyYXJ5Jyk7XG4gKlxuICogICAgICBmYXZvcml0ZShhbGljZSk7ICAvLz0+IHVuZGVmaW5lZFxuICogICAgICBmYXZvcml0ZVdpdGhEZWZhdWx0KGFsaWNlKTsgIC8vPT4gJ1JhbWRhJ1xuICovXG5cblxudmFyIHByb3BPciA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIHByb3BPcih2YWwsIHAsIG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgX2hhcyhwLCBvYmopID8gb2JqW3BdIDogdmFsO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHByb3BPcjsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgc3BlY2lmaWVkIG9iamVjdCBwcm9wZXJ0eSBzYXRpc2ZpZXMgdGhlIGdpdmVuXG4gKiBwcmVkaWNhdGU7IGBmYWxzZWAgb3RoZXJ3aXNlLiBZb3UgY2FuIHRlc3QgbXVsdGlwbGUgcHJvcGVydGllcyB3aXRoXG4gKiBbYFIud2hlcmVgXSgjd2hlcmUpLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE2LjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBTdHJpbmcgLT4ge1N0cmluZzogYX0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLndoZXJlLCBSLnByb3BFcSwgUi5wcm9wSXNcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnByb3BTYXRpc2ZpZXMoeCA9PiB4ID4gMCwgJ3gnLCB7eDogMSwgeTogMn0pOyAvLz0+IHRydWVcbiAqL1xuXG5cbnZhciBwcm9wU2F0aXNmaWVzID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gcHJvcFNhdGlzZmllcyhwcmVkLCBuYW1lLCBvYmopIHtcbiAgcmV0dXJuIHByZWQob2JqW25hbWVdKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBwcm9wU2F0aXNmaWVzOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIEFjdHMgYXMgbXVsdGlwbGUgYHByb3BgOiBhcnJheSBvZiBrZXlzIGluLCBhcnJheSBvZiB2YWx1ZXMgb3V0LiBQcmVzZXJ2ZXNcbiAqIG9yZGVyLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyBba10gLT4ge2s6IHZ9IC0+IFt2XVxuICogQHBhcmFtIHtBcnJheX0gcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGZldGNoXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcXVlcnlcbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgY29ycmVzcG9uZGluZyB2YWx1ZXMgb3IgcGFydGlhbGx5IGFwcGxpZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wcm9wcyhbJ3gnLCAneSddLCB7eDogMSwgeTogMn0pOyAvLz0+IFsxLCAyXVxuICogICAgICBSLnByb3BzKFsnYycsICdhJywgJ2InXSwge2I6IDIsIGE6IDF9KTsgLy89PiBbdW5kZWZpbmVkLCAxLCAyXVxuICpcbiAqICAgICAgdmFyIGZ1bGxOYW1lID0gUi5jb21wb3NlKFIuam9pbignICcpLCBSLnByb3BzKFsnZmlyc3QnLCAnbGFzdCddKSk7XG4gKiAgICAgIGZ1bGxOYW1lKHtsYXN0OiAnQnVsbGV0LVRvb3RoJywgYWdlOiAzMywgZmlyc3Q6ICdUb255J30pOyAvLz0+ICdUb255IEJ1bGxldC1Ub290aCdcbiAqL1xuXG5cbnZhciBwcm9wcyA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHByb3BzKHBzLCBvYmopIHtcbiAgdmFyIGxlbiA9IHBzLmxlbmd0aDtcbiAgdmFyIG91dCA9IFtdO1xuICB2YXIgaWR4ID0gMDtcblxuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgb3V0W2lkeF0gPSBvYmpbcHNbaWR4XV07XG4gICAgaWR4ICs9IDE7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHByb3BzOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2lzTnVtYmVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzTnVtYmVyJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2YgbnVtYmVycyBmcm9tIGBmcm9tYCAoaW5jbHVzaXZlKSB0byBgdG9gIChleGNsdXNpdmUpLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBbTnVtYmVyXVxuICogQHBhcmFtIHtOdW1iZXJ9IGZyb20gVGhlIGZpcnN0IG51bWJlciBpbiB0aGUgbGlzdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSB0byBPbmUgbW9yZSB0aGFuIHRoZSBsYXN0IG51bWJlciBpbiB0aGUgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBvZiBudW1iZXJzIGluIHR0aGUgc2V0IGBbYSwgYilgLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucmFuZ2UoMSwgNSk7ICAgIC8vPT4gWzEsIDIsIDMsIDRdXG4gKiAgICAgIFIucmFuZ2UoNTAsIDUzKTsgIC8vPT4gWzUwLCA1MSwgNTJdXG4gKi9cblxuXG52YXIgcmFuZ2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiByYW5nZShmcm9tLCB0bykge1xuICBpZiAoIShfaXNOdW1iZXIoZnJvbSkgJiYgX2lzTnVtYmVyKHRvKSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb3RoIGFyZ3VtZW50cyB0byByYW5nZSBtdXN0IGJlIG51bWJlcnMnKTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBuID0gZnJvbTtcbiAgd2hpbGUgKG4gPCB0bykge1xuICAgIHJlc3VsdC5wdXNoKG4pO1xuICAgIG4gKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHJhbmdlOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgX3JlZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2UnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc2luZ2xlIGl0ZW0gYnkgaXRlcmF0aW5nIHRocm91Z2ggdGhlIGxpc3QsIHN1Y2Nlc3NpdmVseSBjYWxsaW5nXG4gKiB0aGUgaXRlcmF0b3IgZnVuY3Rpb24gYW5kIHBhc3NpbmcgaXQgYW4gYWNjdW11bGF0b3IgdmFsdWUgYW5kIHRoZSBjdXJyZW50XG4gKiB2YWx1ZSBmcm9tIHRoZSBhcnJheSwgYW5kIHRoZW4gcGFzc2luZyB0aGUgcmVzdWx0IHRvIHRoZSBuZXh0IGNhbGwuXG4gKlxuICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIHR3byB2YWx1ZXM6ICooYWNjLCB2YWx1ZSkqLiBJdCBtYXkgdXNlXG4gKiBbYFIucmVkdWNlZGBdKCNyZWR1Y2VkKSB0byBzaG9ydGN1dCB0aGUgaXRlcmF0aW9uLlxuICpcbiAqIFRoZSBhcmd1bWVudHMnIG9yZGVyIG9mIFtgcmVkdWNlUmlnaHRgXSgjcmVkdWNlUmlnaHQpJ3MgaXRlcmF0b3IgZnVuY3Rpb25cbiAqIGlzICoodmFsdWUsIGFjYykqLlxuICpcbiAqIE5vdGU6IGBSLnJlZHVjZWAgZG9lcyBub3Qgc2tpcCBkZWxldGVkIG9yIHVuYXNzaWduZWQgaW5kaWNlcyAoc3BhcnNlXG4gKiBhcnJheXMpLCB1bmxpa2UgdGhlIG5hdGl2ZSBgQXJyYXkucHJvdG90eXBlLnJlZHVjZWAgbWV0aG9kLiBGb3IgbW9yZSBkZXRhaWxzXG4gKiBvbiB0aGlzIGJlaGF2aW9yLCBzZWU6XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9yZWR1Y2UjRGVzY3JpcHRpb25cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgcmVkdWNlYCBtZXRob2Qgb2YgdGhlIHRoaXJkIGFyZ3VtZW50LCBpZiBwcmVzZW50LiBXaGVuXG4gKiBkb2luZyBzbywgaXQgaXMgdXAgdG8gdGhlIHVzZXIgdG8gaGFuZGxlIHRoZSBbYFIucmVkdWNlZGBdKCNyZWR1Y2VkKVxuICogc2hvcnRjdXRpbmcsIGFzIHRoaXMgaXMgbm90IGltcGxlbWVudGVkIGJ5IGByZWR1Y2VgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKChhLCBiKSAtPiBhKSAtPiBhIC0+IFtiXSAtPiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24uIFJlY2VpdmVzIHR3byB2YWx1ZXMsIHRoZSBhY2N1bXVsYXRvciBhbmQgdGhlXG4gKiAgICAgICAgY3VycmVudCBlbGVtZW50IGZyb20gdGhlIGFycmF5LlxuICogQHBhcmFtIHsqfSBhY2MgVGhlIGFjY3VtdWxhdG9yIHZhbHVlLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHsqfSBUaGUgZmluYWwsIGFjY3VtdWxhdGVkIHZhbHVlLlxuICogQHNlZSBSLnJlZHVjZWQsIFIuYWRkSW5kZXgsIFIucmVkdWNlUmlnaHRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnJlZHVjZShSLnN1YnRyYWN0LCAwLCBbMSwgMiwgMywgNF0pIC8vID0+ICgoKCgwIC0gMSkgLSAyKSAtIDMpIC0gNCkgPSAtMTBcbiAqICAgICAgLy8gICAgICAgICAgLSAgICAgICAgICAgICAgIC0xMFxuICogICAgICAvLyAgICAgICAgIC8gXFwgICAgICAgICAgICAgIC8gXFxcbiAqICAgICAgLy8gICAgICAgIC0gICA0ICAgICAgICAgICAtNiAgIDRcbiAqICAgICAgLy8gICAgICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAvLyAgICAgIC0gICAzICAgPT0+ICAgICAtMyAgIDNcbiAqICAgICAgLy8gICAgIC8gXFwgICAgICAgICAgICAgIC8gXFxcbiAqICAgICAgLy8gICAgLSAgIDIgICAgICAgICAgIC0xICAgMlxuICogICAgICAvLyAgIC8gXFwgICAgICAgICAgICAgIC8gXFxcbiAqICAgICAgLy8gIDAgICAxICAgICAgICAgICAgMCAgIDFcbiAqXG4gKiBAc3ltYiBSLnJlZHVjZShmLCBhLCBbYiwgYywgZF0pID0gZihmKGYoYSwgYiksIGMpLCBkKVxuICovXG5cblxudmFyIHJlZHVjZSA9IC8qI19fUFVSRV9fKi9fY3VycnkzKF9yZWR1Y2UpO1xubW9kdWxlLmV4cG9ydHMgPSByZWR1Y2U7IiwidmFyIF9jdXJyeU4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnlOJyk7XG5cbnZhciBfZGlzcGF0Y2hhYmxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xuXG52YXIgX2hhcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19oYXMnKTtcblxudmFyIF9yZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fcmVkdWNlJyk7XG5cbnZhciBfeHJlZHVjZUJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3hyZWR1Y2VCeScpO1xuXG4vKipcbiAqIEdyb3VwcyB0aGUgZWxlbWVudHMgb2YgdGhlIGxpc3QgYWNjb3JkaW5nIHRvIHRoZSByZXN1bHQgb2YgY2FsbGluZ1xuICogdGhlIFN0cmluZy1yZXR1cm5pbmcgZnVuY3Rpb24gYGtleUZuYCBvbiBlYWNoIGVsZW1lbnQgYW5kIHJlZHVjZXMgdGhlIGVsZW1lbnRzXG4gKiBvZiBlYWNoIGdyb3VwIHRvIGEgc2luZ2xlIHZhbHVlIHZpYSB0aGUgcmVkdWNlciBmdW5jdGlvbiBgdmFsdWVGbmAuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBiYXNpY2FsbHkgYSBtb3JlIGdlbmVyYWwgW2Bncm91cEJ5YF0oI2dyb3VwQnkpIGZ1bmN0aW9uLlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yMC4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoKGEsIGIpIC0+IGEpIC0+IGEgLT4gKGIgLT4gU3RyaW5nKSAtPiBbYl0gLT4ge1N0cmluZzogYX1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHZhbHVlRm4gVGhlIGZ1bmN0aW9uIHRoYXQgcmVkdWNlcyB0aGUgZWxlbWVudHMgb2YgZWFjaCBncm91cCB0byBhIHNpbmdsZVxuICogICAgICAgIHZhbHVlLiBSZWNlaXZlcyB0d28gdmFsdWVzLCBhY2N1bXVsYXRvciBmb3IgYSBwYXJ0aWN1bGFyIGdyb3VwIGFuZCB0aGUgY3VycmVudCBlbGVtZW50LlxuICogQHBhcmFtIHsqfSBhY2MgVGhlIChpbml0aWFsKSBhY2N1bXVsYXRvciB2YWx1ZSBmb3IgZWFjaCBncm91cC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleUZuIFRoZSBmdW5jdGlvbiB0aGF0IG1hcHMgdGhlIGxpc3QncyBlbGVtZW50IGludG8gYSBrZXkuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBncm91cC5cbiAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IHdpdGggdGhlIG91dHB1dCBvZiBga2V5Rm5gIGZvciBrZXlzLCBtYXBwZWQgdG8gdGhlIG91dHB1dCBvZlxuICogICAgICAgICBgdmFsdWVGbmAgZm9yIGVsZW1lbnRzIHdoaWNoIHByb2R1Y2VkIHRoYXQga2V5IHdoZW4gcGFzc2VkIHRvIGBrZXlGbmAuXG4gKiBAc2VlIFIuZ3JvdXBCeSwgUi5yZWR1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgcmVkdWNlVG9OYW1lc0J5ID0gUi5yZWR1Y2VCeSgoYWNjLCBzdHVkZW50KSA9PiBhY2MuY29uY2F0KHN0dWRlbnQubmFtZSksIFtdKTtcbiAqICAgICAgdmFyIG5hbWVzQnlHcmFkZSA9IHJlZHVjZVRvTmFtZXNCeShmdW5jdGlvbihzdHVkZW50KSB7XG4gKiAgICAgICAgdmFyIHNjb3JlID0gc3R1ZGVudC5zY29yZTtcbiAqICAgICAgICByZXR1cm4gc2NvcmUgPCA2NSA/ICdGJyA6XG4gKiAgICAgICAgICAgICAgIHNjb3JlIDwgNzAgPyAnRCcgOlxuICogICAgICAgICAgICAgICBzY29yZSA8IDgwID8gJ0MnIDpcbiAqICAgICAgICAgICAgICAgc2NvcmUgPCA5MCA/ICdCJyA6ICdBJztcbiAqICAgICAgfSk7XG4gKiAgICAgIHZhciBzdHVkZW50cyA9IFt7bmFtZTogJ0x1Y3knLCBzY29yZTogOTJ9LFxuICogICAgICAgICAgICAgICAgICAgICAge25hbWU6ICdEcmV3Jywgc2NvcmU6IDg1fSxcbiAqICAgICAgICAgICAgICAgICAgICAgIC8vIC4uLlxuICogICAgICAgICAgICAgICAgICAgICAge25hbWU6ICdCYXJ0Jywgc2NvcmU6IDYyfV07XG4gKiAgICAgIG5hbWVzQnlHcmFkZShzdHVkZW50cyk7XG4gKiAgICAgIC8vIHtcbiAqICAgICAgLy8gICAnQSc6IFsnTHVjeSddLFxuICogICAgICAvLyAgICdCJzogWydEcmV3J11cbiAqICAgICAgLy8gICAvLyAuLi4sXG4gKiAgICAgIC8vICAgJ0YnOiBbJ0JhcnQnXVxuICogICAgICAvLyB9XG4gKi9cblxuXG52YXIgcmVkdWNlQnkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5Tig0LCBbXSwgLyojX19QVVJFX18qL19kaXNwYXRjaGFibGUoW10sIF94cmVkdWNlQnksIGZ1bmN0aW9uIHJlZHVjZUJ5KHZhbHVlRm4sIHZhbHVlQWNjLCBrZXlGbiwgbGlzdCkge1xuICByZXR1cm4gX3JlZHVjZShmdW5jdGlvbiAoYWNjLCBlbHQpIHtcbiAgICB2YXIga2V5ID0ga2V5Rm4oZWx0KTtcbiAgICBhY2Nba2V5XSA9IHZhbHVlRm4oX2hhcyhrZXksIGFjYykgPyBhY2Nba2V5XSA6IHZhbHVlQWNjLCBlbHQpO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9LCBsaXN0KTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gcmVkdWNlQnk7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIHNpbmdsZSBpdGVtIGJ5IGl0ZXJhdGluZyB0aHJvdWdoIHRoZSBsaXN0LCBzdWNjZXNzaXZlbHkgY2FsbGluZ1xuICogdGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIGFuZCBwYXNzaW5nIGl0IGFuIGFjY3VtdWxhdG9yIHZhbHVlIGFuZCB0aGUgY3VycmVudFxuICogdmFsdWUgZnJvbSB0aGUgYXJyYXksIGFuZCB0aGVuIHBhc3NpbmcgdGhlIHJlc3VsdCB0byB0aGUgbmV4dCBjYWxsLlxuICpcbiAqIFNpbWlsYXIgdG8gW2ByZWR1Y2VgXSgjcmVkdWNlKSwgZXhjZXB0IG1vdmVzIHRocm91Z2ggdGhlIGlucHV0IGxpc3QgZnJvbSB0aGVcbiAqIHJpZ2h0IHRvIHRoZSBsZWZ0LlxuICpcbiAqIFRoZSBpdGVyYXRvciBmdW5jdGlvbiByZWNlaXZlcyB0d28gdmFsdWVzOiAqKHZhbHVlLCBhY2MpKiwgd2hpbGUgdGhlIGFyZ3VtZW50cydcbiAqIG9yZGVyIG9mIGByZWR1Y2VgJ3MgaXRlcmF0b3IgZnVuY3Rpb24gaXMgKihhY2MsIHZhbHVlKSouXG4gKlxuICogTm90ZTogYFIucmVkdWNlUmlnaHRgIGRvZXMgbm90IHNraXAgZGVsZXRlZCBvciB1bmFzc2lnbmVkIGluZGljZXMgKHNwYXJzZVxuICogYXJyYXlzKSwgdW5saWtlIHRoZSBuYXRpdmUgYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VSaWdodGAgbWV0aG9kLiBGb3IgbW9yZSBkZXRhaWxzXG4gKiBvbiB0aGlzIGJlaGF2aW9yLCBzZWU6XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9yZWR1Y2VSaWdodCNEZXNjcmlwdGlvblxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKChhLCBiKSAtPiBiKSAtPiBiIC0+IFthXSAtPiBiXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24uIFJlY2VpdmVzIHR3byB2YWx1ZXMsIHRoZSBjdXJyZW50IGVsZW1lbnQgZnJvbSB0aGUgYXJyYXlcbiAqICAgICAgICBhbmQgdGhlIGFjY3VtdWxhdG9yLlxuICogQHBhcmFtIHsqfSBhY2MgVGhlIGFjY3VtdWxhdG9yIHZhbHVlLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHsqfSBUaGUgZmluYWwsIGFjY3VtdWxhdGVkIHZhbHVlLlxuICogQHNlZSBSLnJlZHVjZSwgUi5hZGRJbmRleFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucmVkdWNlUmlnaHQoUi5zdWJ0cmFjdCwgMCwgWzEsIDIsIDMsIDRdKSAvLyA9PiAoMSAtICgyIC0gKDMgLSAoNCAtIDApKSkpID0gLTJcbiAqICAgICAgLy8gICAgLSAgICAgICAgICAgICAgIC0yXG4gKiAgICAgIC8vICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAvLyAgMSAgIC0gICAgICAgICAgICAxICAgM1xuICogICAgICAvLyAgICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAvLyAgICAyICAgLSAgICAgPT0+ICAgIDIgIC0xXG4gKiAgICAgIC8vICAgICAgIC8gXFwgICAgICAgICAgICAgIC8gXFxcbiAqICAgICAgLy8gICAgICAzICAgLSAgICAgICAgICAgIDMgICA0XG4gKiAgICAgIC8vICAgICAgICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAvLyAgICAgICAgNCAgIDAgICAgICAgICAgICA0ICAgMFxuICpcbiAqIEBzeW1iIFIucmVkdWNlUmlnaHQoZiwgYSwgW2IsIGMsIGRdKSA9IGYoYiwgZihjLCBmKGQsIGEpKSlcbiAqL1xuXG5cbnZhciByZWR1Y2VSaWdodCA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIHJlZHVjZVJpZ2h0KGZuLCBhY2MsIGxpc3QpIHtcbiAgdmFyIGlkeCA9IGxpc3QubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgYWNjID0gZm4obGlzdFtpZHhdLCBhY2MpO1xuICAgIGlkeCAtPSAxO1xuICB9XG4gIHJldHVybiBhY2M7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcmVkdWNlUmlnaHQ7IiwidmFyIF9jdXJyeU4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnlOJyk7XG5cbnZhciBfcmVkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xuXG52YXIgX3JlZHVjZWQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fcmVkdWNlZCcpO1xuXG4vKipcbiAqIExpa2UgW2ByZWR1Y2VgXSgjcmVkdWNlKSwgYHJlZHVjZVdoaWxlYCByZXR1cm5zIGEgc2luZ2xlIGl0ZW0gYnkgaXRlcmF0aW5nXG4gKiB0aHJvdWdoIHRoZSBsaXN0LCBzdWNjZXNzaXZlbHkgY2FsbGluZyB0aGUgaXRlcmF0b3IgZnVuY3Rpb24uIGByZWR1Y2VXaGlsZWBcbiAqIGFsc28gdGFrZXMgYSBwcmVkaWNhdGUgdGhhdCBpcyBldmFsdWF0ZWQgYmVmb3JlIGVhY2ggc3RlcC4gSWYgdGhlIHByZWRpY2F0ZVxuICogcmV0dXJucyBgZmFsc2VgLCBpdCBcInNob3J0LWNpcmN1aXRzXCIgdGhlIGl0ZXJhdGlvbiBhbmQgcmV0dXJucyB0aGUgY3VycmVudFxuICogdmFsdWUgb2YgdGhlIGFjY3VtdWxhdG9yLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIyLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoYSwgYikgLT4gQm9vbGVhbikgLT4gKChhLCBiKSAtPiBhKSAtPiBhIC0+IFtiXSAtPiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkIFRoZSBwcmVkaWNhdGUuIEl0IGlzIHBhc3NlZCB0aGUgYWNjdW11bGF0b3IgYW5kIHRoZVxuICogICAgICAgIGN1cnJlbnQgZWxlbWVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBpdGVyYXRvciBmdW5jdGlvbi4gUmVjZWl2ZXMgdHdvIHZhbHVlcywgdGhlXG4gKiAgICAgICAgYWNjdW11bGF0b3IgYW5kIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gKiBAcGFyYW0geyp9IGEgVGhlIGFjY3VtdWxhdG9yIHZhbHVlLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHsqfSBUaGUgZmluYWwsIGFjY3VtdWxhdGVkIHZhbHVlLlxuICogQHNlZSBSLnJlZHVjZSwgUi5yZWR1Y2VkXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzT2RkID0gKGFjYywgeCkgPT4geCAlIDIgPT09IDE7XG4gKiAgICAgIHZhciB4cyA9IFsxLCAzLCA1LCA2MCwgNzc3LCA4MDBdO1xuICogICAgICBSLnJlZHVjZVdoaWxlKGlzT2RkLCBSLmFkZCwgMCwgeHMpOyAvLz0+IDlcbiAqXG4gKiAgICAgIHZhciB5cyA9IFsyLCA0LCA2XVxuICogICAgICBSLnJlZHVjZVdoaWxlKGlzT2RkLCBSLmFkZCwgMTExLCB5cyk7IC8vPT4gMTExXG4gKi9cblxuXG52YXIgcmVkdWNlV2hpbGUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5Tig0LCBbXSwgZnVuY3Rpb24gX3JlZHVjZVdoaWxlKHByZWQsIGZuLCBhLCBsaXN0KSB7XG4gIHJldHVybiBfcmVkdWNlKGZ1bmN0aW9uIChhY2MsIHgpIHtcbiAgICByZXR1cm4gcHJlZChhY2MsIHgpID8gZm4oYWNjLCB4KSA6IF9yZWR1Y2VkKGFjYyk7XG4gIH0sIGEsIGxpc3QpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlZHVjZVdoaWxlOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgX3JlZHVjZWQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fcmVkdWNlZCcpO1xuXG4vKipcbiAqIFJldHVybnMgYSB2YWx1ZSB3cmFwcGVkIHRvIGluZGljYXRlIHRoYXQgaXQgaXMgdGhlIGZpbmFsIHZhbHVlIG9mIHRoZSByZWR1Y2VcbiAqIGFuZCB0cmFuc2R1Y2UgZnVuY3Rpb25zLiBUaGUgcmV0dXJuZWQgdmFsdWUgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYSBibGFja1xuICogYm94OiB0aGUgaW50ZXJuYWwgc3RydWN0dXJlIGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIHN0YWJsZS5cbiAqXG4gKiBOb3RlOiB0aGlzIG9wdGltaXphdGlvbiBpcyB1bmF2YWlsYWJsZSB0byBmdW5jdGlvbnMgbm90IGV4cGxpY2l0bHkgbGlzdGVkXG4gKiBhYm92ZS4gRm9yIGluc3RhbmNlLCBpdCBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZCBieVxuICogW2ByZWR1Y2VSaWdodGBdKCNyZWR1Y2VSaWdodCkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTUuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgYSAtPiAqXG4gKiBAcGFyYW0geyp9IHggVGhlIGZpbmFsIHZhbHVlIG9mIHRoZSByZWR1Y2UuXG4gKiBAcmV0dXJuIHsqfSBUaGUgd3JhcHBlZCB2YWx1ZS5cbiAqIEBzZWUgUi5yZWR1Y2UsIFIudHJhbnNkdWNlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICBSLnJlZHVjZShcbiAqICAgICAgIChhY2MsIGl0ZW0pID0+IGl0ZW0gPiAzID8gUi5yZWR1Y2VkKGFjYykgOiBhY2MuY29uY2F0KGl0ZW0pLFxuICogICAgICAgW10sXG4gKiAgICAgICBbMSwgMiwgMywgNCwgNV0pIC8vIFsxLCAyLCAzXVxuICovXG5cblxudmFyIHJlZHVjZWQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShfcmVkdWNlZCk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlZHVjZWQ7IiwidmFyIF9jb21wbGVtZW50ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbXBsZW1lbnQnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBmaWx0ZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9maWx0ZXInKTtcblxuLyoqXG4gKiBUaGUgY29tcGxlbWVudCBvZiBbYGZpbHRlcmBdKCNmaWx0ZXIpLlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi4gRmlsdGVyYWJsZVxuICogb2JqZWN0cyBpbmNsdWRlIHBsYWluIG9iamVjdHMgb3IgYW55IG9iamVjdCB0aGF0IGhhcyBhIGZpbHRlciBtZXRob2Qgc3VjaFxuICogYXMgYEFycmF5YC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZpbHRlcmFibGUgZiA9PiAoYSAtPiBCb29sZWFuKSAtPiBmIGEgLT4gZiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkXG4gKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXJhYmxlXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBzZWUgUi5maWx0ZXIsIFIudHJhbnNkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzT2RkID0gKG4pID0+IG4gJSAyID09PSAxO1xuICpcbiAqICAgICAgUi5yZWplY3QoaXNPZGQsIFsxLCAyLCAzLCA0XSk7IC8vPT4gWzIsIDRdXG4gKlxuICogICAgICBSLnJlamVjdChpc09kZCwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YjogMiwgZDogNH1cbiAqL1xuXG5cbnZhciByZWplY3QgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiByZWplY3QocHJlZCwgZmlsdGVyYWJsZSkge1xuICByZXR1cm4gZmlsdGVyKF9jb21wbGVtZW50KHByZWQpLCBmaWx0ZXJhYmxlKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSByZWplY3Q7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgc3ViLWxpc3Qgb2YgYGxpc3RgIHN0YXJ0aW5nIGF0IGluZGV4IGBzdGFydGAgYW5kIGNvbnRhaW5pbmdcbiAqIGBjb3VudGAgZWxlbWVudHMuIF9Ob3RlIHRoYXQgdGhpcyBpcyBub3QgZGVzdHJ1Y3RpdmVfOiBpdCByZXR1cm5zIGEgY29weSBvZlxuICogdGhlIGxpc3Qgd2l0aCB0aGUgY2hhbmdlcy5cbiAqIDxzbWFsbD5ObyBsaXN0cyBoYXZlIGJlZW4gaGFybWVkIGluIHRoZSBhcHBsaWNhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uLjwvc21hbGw+XG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMi4yXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCBUaGUgcG9zaXRpb24gdG8gc3RhcnQgcmVtb3ZpbmcgZWxlbWVudHNcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIHRvIHJlbW92ZVxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byByZW1vdmUgZnJvbVxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IEFycmF5IHdpdGggYGNvdW50YCBlbGVtZW50cyBmcm9tIGBzdGFydGAgcmVtb3ZlZC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnJlbW92ZSgyLCAzLCBbMSwyLDMsNCw1LDYsNyw4XSk7IC8vPT4gWzEsMiw2LDcsOF1cbiAqL1xuXG5cbnZhciByZW1vdmUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiByZW1vdmUoc3RhcnQsIGNvdW50LCBsaXN0KSB7XG4gIHZhciByZXN1bHQgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCAwKTtcbiAgcmVzdWx0LnNwbGljZShzdGFydCwgY291bnQpO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlbW92ZTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIGFsd2F5cyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2Fsd2F5cycpO1xuXG52YXIgdGltZXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90aW1lcycpO1xuXG4vKipcbiAqIFJldHVybnMgYSBmaXhlZCBsaXN0IG9mIHNpemUgYG5gIGNvbnRhaW5pbmcgYSBzcGVjaWZpZWQgaWRlbnRpY2FsIHZhbHVlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMVxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgYSAtPiBuIC0+IFthXVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcmVwZWF0LlxuICogQHBhcmFtIHtOdW1iZXJ9IG4gVGhlIGRlc2lyZWQgc2l6ZSBvZiB0aGUgb3V0cHV0IGxpc3QuXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgYXJyYXkgY29udGFpbmluZyBgbmAgYHZhbHVlYHMuXG4gKiBAc2VlIFIudGltZXNcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnJlcGVhdCgnaGknLCA1KTsgLy89PiBbJ2hpJywgJ2hpJywgJ2hpJywgJ2hpJywgJ2hpJ11cbiAqXG4gKiAgICAgIHZhciBvYmogPSB7fTtcbiAqICAgICAgdmFyIHJlcGVhdGVkT2JqcyA9IFIucmVwZWF0KG9iaiwgNSk7IC8vPT4gW3t9LCB7fSwge30sIHt9LCB7fV1cbiAqICAgICAgcmVwZWF0ZWRPYmpzWzBdID09PSByZXBlYXRlZE9ianNbMV07IC8vPT4gdHJ1ZVxuICogQHN5bWIgUi5yZXBlYXQoYSwgMCkgPSBbXVxuICogQHN5bWIgUi5yZXBlYXQoYSwgMSkgPSBbYV1cbiAqIEBzeW1iIFIucmVwZWF0KGEsIDIpID0gW2EsIGFdXG4gKi9cblxuXG52YXIgcmVwZWF0ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gcmVwZWF0KHZhbHVlLCBuKSB7XG4gIHJldHVybiB0aW1lcyhhbHdheXModmFsdWUpLCBuKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSByZXBlYXQ7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogUmVwbGFjZSBhIHN1YnN0cmluZyBvciByZWdleCBtYXRjaCBpbiBhIHN0cmluZyB3aXRoIGEgcmVwbGFjZW1lbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNy4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAc2lnIFJlZ0V4cHxTdHJpbmcgLT4gU3RyaW5nIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7UmVnRXhwfFN0cmluZ30gcGF0dGVybiBBIHJlZ3VsYXIgZXhwcmVzc2lvbiBvciBhIHN1YnN0cmluZyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7U3RyaW5nfSByZXBsYWNlbWVudCBUaGUgc3RyaW5nIHRvIHJlcGxhY2UgdGhlIG1hdGNoZXMgd2l0aC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byBkbyB0aGUgc2VhcmNoIGFuZCByZXBsYWNlbWVudCBpbi5cbiAqIEByZXR1cm4ge1N0cmluZ30gVGhlIHJlc3VsdC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnJlcGxhY2UoJ2ZvbycsICdiYXInLCAnZm9vIGZvbyBmb28nKTsgLy89PiAnYmFyIGZvbyBmb28nXG4gKiAgICAgIFIucmVwbGFjZSgvZm9vLywgJ2JhcicsICdmb28gZm9vIGZvbycpOyAvLz0+ICdiYXIgZm9vIGZvbydcbiAqXG4gKiAgICAgIC8vIFVzZSB0aGUgXCJnXCIgKGdsb2JhbCkgZmxhZyB0byByZXBsYWNlIGFsbCBvY2N1cnJlbmNlczpcbiAqICAgICAgUi5yZXBsYWNlKC9mb28vZywgJ2JhcicsICdmb28gZm9vIGZvbycpOyAvLz0+ICdiYXIgYmFyIGJhcidcbiAqL1xuXG5cbnZhciByZXBsYWNlID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gcmVwbGFjZShyZWdleCwgcmVwbGFjZW1lbnQsIHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UocmVnZXgsIHJlcGxhY2VtZW50KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSByZXBsYWNlOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgX2lzU3RyaW5nID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzU3RyaW5nJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IG9yIHN0cmluZyB3aXRoIHRoZSBlbGVtZW50cyBvciBjaGFyYWN0ZXJzIGluIHJldmVyc2VcbiAqIG9yZGVyLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXVxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gbGlzdFxuICogQHJldHVybiB7QXJyYXl8U3RyaW5nfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucmV2ZXJzZShbMSwgMiwgM10pOyAgLy89PiBbMywgMiwgMV1cbiAqICAgICAgUi5yZXZlcnNlKFsxLCAyXSk7ICAgICAvLz0+IFsyLCAxXVxuICogICAgICBSLnJldmVyc2UoWzFdKTsgICAgICAgIC8vPT4gWzFdXG4gKiAgICAgIFIucmV2ZXJzZShbXSk7ICAgICAgICAgLy89PiBbXVxuICpcbiAqICAgICAgUi5yZXZlcnNlKCdhYmMnKTsgICAgICAvLz0+ICdjYmEnXG4gKiAgICAgIFIucmV2ZXJzZSgnYWInKTsgICAgICAgLy89PiAnYmEnXG4gKiAgICAgIFIucmV2ZXJzZSgnYScpOyAgICAgICAgLy89PiAnYSdcbiAqICAgICAgUi5yZXZlcnNlKCcnKTsgICAgICAgICAvLz0+ICcnXG4gKi9cblxuXG52YXIgcmV2ZXJzZSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIHJldmVyc2UobGlzdCkge1xuICByZXR1cm4gX2lzU3RyaW5nKGxpc3QpID8gbGlzdC5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpIDogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgMCkucmV2ZXJzZSgpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHJldmVyc2U7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogU2NhbiBpcyBzaW1pbGFyIHRvIFtgcmVkdWNlYF0oI3JlZHVjZSksIGJ1dCByZXR1cm5zIGEgbGlzdCBvZiBzdWNjZXNzaXZlbHlcbiAqIHJlZHVjZWQgdmFsdWVzIGZyb20gdGhlIGxlZnRcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMC4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoKGEsIGIpIC0+IGEpIC0+IGEgLT4gW2JdIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiBSZWNlaXZlcyB0d28gdmFsdWVzLCB0aGUgYWNjdW11bGF0b3IgYW5kIHRoZVxuICogICAgICAgIGN1cnJlbnQgZWxlbWVudCBmcm9tIHRoZSBhcnJheVxuICogQHBhcmFtIHsqfSBhY2MgVGhlIGFjY3VtdWxhdG9yIHZhbHVlLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBsaXN0IG9mIGFsbCBpbnRlcm1lZGlhdGVseSByZWR1Y2VkIHZhbHVlcy5cbiAqIEBzZWUgUi5yZWR1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbnVtYmVycyA9IFsxLCAyLCAzLCA0XTtcbiAqICAgICAgdmFyIGZhY3RvcmlhbHMgPSBSLnNjYW4oUi5tdWx0aXBseSwgMSwgbnVtYmVycyk7IC8vPT4gWzEsIDEsIDIsIDYsIDI0XVxuICogQHN5bWIgUi5zY2FuKGYsIGEsIFtiLCBjXSkgPSBbYSwgZihhLCBiKSwgZihmKGEsIGIpLCBjKV1cbiAqL1xuXG5cbnZhciBzY2FuID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gc2NhbihmbiwgYWNjLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBbYWNjXTtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGFjYyA9IGZuKGFjYywgbGlzdFtpZHhdKTtcbiAgICByZXN1bHRbaWR4ICsgMV0gPSBhY2M7XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBzY2FuOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgYXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hcCcpO1xuXG52YXIgbWFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWFwJyk7XG5cbnZhciBwcmVwZW5kID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcHJlcGVuZCcpO1xuXG52YXIgcmVkdWNlUmlnaHQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2VSaWdodCcpO1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYSBbVHJhdmVyc2FibGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjdHJhdmVyc2FibGUpXG4gKiBvZiBbQXBwbGljYXRpdmVdKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjYXBwbGljYXRpdmUpIGludG8gYW5cbiAqIEFwcGxpY2F0aXZlIG9mIFRyYXZlcnNhYmxlLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBzZXF1ZW5jZWAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKEFwcGxpY2F0aXZlIGYsIFRyYXZlcnNhYmxlIHQpID0+IChhIC0+IGYgYSkgLT4gdCAoZiBhKSAtPiBmICh0IGEpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvZlxuICogQHBhcmFtIHsqfSB0cmF2ZXJzYWJsZVxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi50cmF2ZXJzZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuc2VxdWVuY2UoTWF5YmUub2YsIFtKdXN0KDEpLCBKdXN0KDIpLCBKdXN0KDMpXSk7ICAgLy89PiBKdXN0KFsxLCAyLCAzXSlcbiAqICAgICAgUi5zZXF1ZW5jZShNYXliZS5vZiwgW0p1c3QoMSksIEp1c3QoMiksIE5vdGhpbmcoKV0pOyAvLz0+IE5vdGhpbmcoKVxuICpcbiAqICAgICAgUi5zZXF1ZW5jZShSLm9mLCBKdXN0KFsxLCAyLCAzXSkpOyAvLz0+IFtKdXN0KDEpLCBKdXN0KDIpLCBKdXN0KDMpXVxuICogICAgICBSLnNlcXVlbmNlKFIub2YsIE5vdGhpbmcoKSk7ICAgICAgIC8vPT4gW05vdGhpbmcoKV1cbiAqL1xuXG5cbnZhciBzZXF1ZW5jZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHNlcXVlbmNlKG9mLCB0cmF2ZXJzYWJsZSkge1xuICByZXR1cm4gdHlwZW9mIHRyYXZlcnNhYmxlLnNlcXVlbmNlID09PSAnZnVuY3Rpb24nID8gdHJhdmVyc2FibGUuc2VxdWVuY2Uob2YpIDogcmVkdWNlUmlnaHQoZnVuY3Rpb24gKHgsIGFjYykge1xuICAgIHJldHVybiBhcChtYXAocHJlcGVuZCwgeCksIGFjYyk7XG4gIH0sIG9mKFtdKSwgdHJhdmVyc2FibGUpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHNlcXVlbmNlOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgYWx3YXlzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYWx3YXlzJyk7XG5cbnZhciBvdmVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vb3ZlcicpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBcInNldHRpbmdcIiB0aGUgcG9ydGlvbiBvZiB0aGUgZ2l2ZW4gZGF0YSBzdHJ1Y3R1cmVcbiAqIGZvY3VzZWQgYnkgdGhlIGdpdmVuIGxlbnMgdG8gdGhlIGdpdmVuIHZhbHVlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE2LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBMZW5zIHMgYSA9IEZ1bmN0b3IgZiA9PiAoYSAtPiBmIGEpIC0+IHMgLT4gZiBzXG4gKiBAc2lnIExlbnMgcyBhIC0+IGEgLT4gcyAtPiBzXG4gKiBAcGFyYW0ge0xlbnN9IGxlbnNcbiAqIEBwYXJhbSB7Kn0gdlxuICogQHBhcmFtIHsqfSB4XG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLnByb3AsIFIubGVuc0luZGV4LCBSLmxlbnNQcm9wXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHhMZW5zID0gUi5sZW5zUHJvcCgneCcpO1xuICpcbiAqICAgICAgUi5zZXQoeExlbnMsIDQsIHt4OiAxLCB5OiAyfSk7ICAvLz0+IHt4OiA0LCB5OiAyfVxuICogICAgICBSLnNldCh4TGVucywgOCwge3g6IDEsIHk6IDJ9KTsgIC8vPT4ge3g6IDgsIHk6IDJ9XG4gKi9cblxuXG52YXIgc2V0ID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gc2V0KGxlbnMsIHYsIHgpIHtcbiAgcmV0dXJuIG92ZXIobGVucywgYWx3YXlzKHYpLCB4KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBzZXQ7IiwidmFyIF9jaGVja0Zvck1ldGhvZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jaGVja0Zvck1ldGhvZCcpO1xuXG52YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcgKG9yIG9iamVjdCB3aXRoIGEgYHNsaWNlYFxuICogbWV0aG9kKSBmcm9tIGBmcm9tSW5kZXhgIChpbmNsdXNpdmUpIHRvIGB0b0luZGV4YCAoZXhjbHVzaXZlKS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgc2xpY2VgIG1ldGhvZCBvZiB0aGUgdGhpcmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS40XG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IFthXSAtPiBbYV1cbiAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gZnJvbUluZGV4IFRoZSBzdGFydCBpbmRleCAoaW5jbHVzaXZlKS5cbiAqIEBwYXJhbSB7TnVtYmVyfSB0b0luZGV4IFRoZSBlbmQgaW5kZXggKGV4Y2x1c2l2ZSkuXG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5zbGljZSgxLCAzLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgICAvLz0+IFsnYicsICdjJ11cbiAqICAgICAgUi5zbGljZSgxLCBJbmZpbml0eSwgWydhJywgJ2InLCAnYycsICdkJ10pOyAvLz0+IFsnYicsICdjJywgJ2QnXVxuICogICAgICBSLnNsaWNlKDAsIC0xLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgIC8vPT4gWydhJywgJ2InLCAnYyddXG4gKiAgICAgIFIuc2xpY2UoLTMsIC0xLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgLy89PiBbJ2InLCAnYyddXG4gKiAgICAgIFIuc2xpY2UoMCwgMywgJ3JhbWRhJyk7ICAgICAgICAgICAgICAgICAgICAgLy89PiAncmFtJ1xuICovXG5cblxudmFyIHNsaWNlID0gLyojX19QVVJFX18qL19jdXJyeTMoIC8qI19fUFVSRV9fKi9fY2hlY2tGb3JNZXRob2QoJ3NsaWNlJywgZnVuY3Rpb24gc2xpY2UoZnJvbUluZGV4LCB0b0luZGV4LCBsaXN0KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCBmcm9tSW5kZXgsIHRvSW5kZXgpO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBzbGljZTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgY29weSBvZiB0aGUgbGlzdCwgc29ydGVkIGFjY29yZGluZyB0byB0aGUgY29tcGFyYXRvciBmdW5jdGlvbixcbiAqIHdoaWNoIHNob3VsZCBhY2NlcHQgdHdvIHZhbHVlcyBhdCBhIHRpbWUgYW5kIHJldHVybiBhIG5lZ2F0aXZlIG51bWJlciBpZiB0aGVcbiAqIGZpcnN0IHZhbHVlIGlzIHNtYWxsZXIsIGEgcG9zaXRpdmUgbnVtYmVyIGlmIGl0J3MgbGFyZ2VyLCBhbmQgemVybyBpZiB0aGV5XG4gKiBhcmUgZXF1YWwuIFBsZWFzZSBub3RlIHRoYXQgdGhpcyBpcyBhICoqY29weSoqIG9mIHRoZSBsaXN0LiBJdCBkb2VzIG5vdFxuICogbW9kaWZ5IHRoZSBvcmlnaW5hbC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoYSwgYSkgLT4gTnVtYmVyKSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJhdG9yIEEgc29ydGluZyBmdW5jdGlvbiA6OiBhIC0+IGIgLT4gSW50XG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIHNvcnRcbiAqIEByZXR1cm4ge0FycmF5fSBhIG5ldyBhcnJheSB3aXRoIGl0cyBlbGVtZW50cyBzb3J0ZWQgYnkgdGhlIGNvbXBhcmF0b3IgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGRpZmYgPSBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhIC0gYjsgfTtcbiAqICAgICAgUi5zb3J0KGRpZmYsIFs0LDIsNyw1XSk7IC8vPT4gWzIsIDQsIDUsIDddXG4gKi9cblxuXG52YXIgc29ydCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHNvcnQoY29tcGFyYXRvciwgbGlzdCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgMCkuc29ydChjb21wYXJhdG9yKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBzb3J0OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFNvcnRzIHRoZSBsaXN0IGFjY29yZGluZyB0byB0aGUgc3VwcGxpZWQgZnVuY3Rpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgT3JkIGIgPT4gKGEgLT4gYikgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gc29ydC5cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBsaXN0IHNvcnRlZCBieSB0aGUga2V5cyBnZW5lcmF0ZWQgYnkgYGZuYC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgc29ydEJ5Rmlyc3RJdGVtID0gUi5zb3J0QnkoUi5wcm9wKDApKTtcbiAqICAgICAgdmFyIHNvcnRCeU5hbWVDYXNlSW5zZW5zaXRpdmUgPSBSLnNvcnRCeShSLmNvbXBvc2UoUi50b0xvd2VyLCBSLnByb3AoJ25hbWUnKSkpO1xuICogICAgICB2YXIgcGFpcnMgPSBbWy0xLCAxXSwgWy0yLCAyXSwgWy0zLCAzXV07XG4gKiAgICAgIHNvcnRCeUZpcnN0SXRlbShwYWlycyk7IC8vPT4gW1stMywgM10sIFstMiwgMl0sIFstMSwgMV1dXG4gKiAgICAgIHZhciBhbGljZSA9IHtcbiAqICAgICAgICBuYW1lOiAnQUxJQ0UnLFxuICogICAgICAgIGFnZTogMTAxXG4gKiAgICAgIH07XG4gKiAgICAgIHZhciBib2IgPSB7XG4gKiAgICAgICAgbmFtZTogJ0JvYicsXG4gKiAgICAgICAgYWdlOiAtMTBcbiAqICAgICAgfTtcbiAqICAgICAgdmFyIGNsYXJhID0ge1xuICogICAgICAgIG5hbWU6ICdjbGFyYScsXG4gKiAgICAgICAgYWdlOiAzMTQuMTU5XG4gKiAgICAgIH07XG4gKiAgICAgIHZhciBwZW9wbGUgPSBbY2xhcmEsIGJvYiwgYWxpY2VdO1xuICogICAgICBzb3J0QnlOYW1lQ2FzZUluc2Vuc2l0aXZlKHBlb3BsZSk7IC8vPT4gW2FsaWNlLCBib2IsIGNsYXJhXVxuICovXG5cblxudmFyIHNvcnRCeSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHNvcnRCeShmbiwgbGlzdCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgMCkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHZhciBhYSA9IGZuKGEpO1xuICAgIHZhciBiYiA9IGZuKGIpO1xuICAgIHJldHVybiBhYSA8IGJiID8gLTEgOiBhYSA+IGJiID8gMSA6IDA7XG4gIH0pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHNvcnRCeTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBTb3J0cyBhIGxpc3QgYWNjb3JkaW5nIHRvIGEgbGlzdCBvZiBjb21wYXJhdG9ycy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yMy4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgWyhhLCBhKSAtPiBOdW1iZXJdIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7QXJyYXl9IGZ1bmN0aW9ucyBBIGxpc3Qgb2YgY29tcGFyYXRvciBmdW5jdGlvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIHNvcnQuXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgbGlzdCBzb3J0ZWQgYWNjb3JkaW5nIHRvIHRoZSBjb21hcmF0b3IgZnVuY3Rpb25zLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBhbGljZSA9IHtcbiAqICAgICAgICBuYW1lOiAnYWxpY2UnLFxuICogICAgICAgIGFnZTogNDBcbiAqICAgICAgfTtcbiAqICAgICAgdmFyIGJvYiA9IHtcbiAqICAgICAgICBuYW1lOiAnYm9iJyxcbiAqICAgICAgICBhZ2U6IDMwXG4gKiAgICAgIH07XG4gKiAgICAgIHZhciBjbGFyYSA9IHtcbiAqICAgICAgICBuYW1lOiAnY2xhcmEnLFxuICogICAgICAgIGFnZTogNDBcbiAqICAgICAgfTtcbiAqICAgICAgdmFyIHBlb3BsZSA9IFtjbGFyYSwgYm9iLCBhbGljZV07XG4gKiAgICAgIHZhciBhZ2VOYW1lU29ydCA9IFIuc29ydFdpdGgoW1xuICogICAgICAgIFIuZGVzY2VuZChSLnByb3AoJ2FnZScpKSxcbiAqICAgICAgICBSLmFzY2VuZChSLnByb3AoJ25hbWUnKSlcbiAqICAgICAgXSk7XG4gKiAgICAgIGFnZU5hbWVTb3J0KHBlb3BsZSk7IC8vPT4gW2FsaWNlLCBjbGFyYSwgYm9iXVxuICovXG5cblxudmFyIHNvcnRXaXRoID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gc29ydFdpdGgoZm5zLCBsaXN0KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCAwKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChyZXN1bHQgPT09IDAgJiYgaSA8IGZucy5sZW5ndGgpIHtcbiAgICAgIHJlc3VsdCA9IGZuc1tpXShhLCBiKTtcbiAgICAgIGkgKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gc29ydFdpdGg7IiwidmFyIGludm9rZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnZva2VyJyk7XG5cbi8qKlxuICogU3BsaXRzIGEgc3RyaW5nIGludG8gYW4gYXJyYXkgb2Ygc3RyaW5ncyBiYXNlZCBvbiB0aGUgZ2l2ZW5cbiAqIHNlcGFyYXRvci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBzaWcgKFN0cmluZyB8IFJlZ0V4cCkgLT4gU3RyaW5nIC0+IFtTdHJpbmddXG4gKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IHNlcCBUaGUgcGF0dGVybi5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBzZXBhcmF0ZSBpbnRvIGFuIGFycmF5LlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBhcnJheSBvZiBzdHJpbmdzIGZyb20gYHN0cmAgc2VwYXJhdGVkIGJ5IGBzdHJgLlxuICogQHNlZSBSLmpvaW5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgcGF0aENvbXBvbmVudHMgPSBSLnNwbGl0KCcvJyk7XG4gKiAgICAgIFIudGFpbChwYXRoQ29tcG9uZW50cygnL3Vzci9sb2NhbC9iaW4vbm9kZScpKTsgLy89PiBbJ3VzcicsICdsb2NhbCcsICdiaW4nLCAnbm9kZSddXG4gKlxuICogICAgICBSLnNwbGl0KCcuJywgJ2EuYi5jLnh5ei5kJyk7IC8vPT4gWydhJywgJ2InLCAnYycsICd4eXonLCAnZCddXG4gKi9cblxuXG52YXIgc3BsaXQgPSAvKiNfX1BVUkVfXyovaW52b2tlcigxLCAnc3BsaXQnKTtcbm1vZHVsZS5leHBvcnRzID0gc3BsaXQ7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBsZW5ndGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9sZW5ndGgnKTtcblxudmFyIHNsaWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc2xpY2UnKTtcblxuLyoqXG4gKiBTcGxpdHMgYSBnaXZlbiBsaXN0IG9yIHN0cmluZyBhdCBhIGdpdmVuIGluZGV4LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE5LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW1thXSwgW2FdXVxuICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFtTdHJpbmcsIFN0cmluZ11cbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggd2hlcmUgdGhlIGFycmF5L3N0cmluZyBpcyBzcGxpdC5cbiAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBhcnJheSBUaGUgYXJyYXkvc3RyaW5nIHRvIGJlIHNwbGl0LlxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5zcGxpdEF0KDEsIFsxLCAyLCAzXSk7ICAgICAgICAgIC8vPT4gW1sxXSwgWzIsIDNdXVxuICogICAgICBSLnNwbGl0QXQoNSwgJ2hlbGxvIHdvcmxkJyk7ICAgICAgLy89PiBbJ2hlbGxvJywgJyB3b3JsZCddXG4gKiAgICAgIFIuc3BsaXRBdCgtMSwgJ2Zvb2JhcicpOyAgICAgICAgICAvLz0+IFsnZm9vYmEnLCAnciddXG4gKi9cblxuXG52YXIgc3BsaXRBdCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHNwbGl0QXQoaW5kZXgsIGFycmF5KSB7XG4gIHJldHVybiBbc2xpY2UoMCwgaW5kZXgsIGFycmF5KSwgc2xpY2UoaW5kZXgsIGxlbmd0aChhcnJheSksIGFycmF5KV07XG59KTtcbm1vZHVsZS5leHBvcnRzID0gc3BsaXRBdDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIHNsaWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc2xpY2UnKTtcblxuLyoqXG4gKiBTcGxpdHMgYSBjb2xsZWN0aW9uIGludG8gc2xpY2VzIG9mIHRoZSBzcGVjaWZpZWQgbGVuZ3RoLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE2LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW1thXV1cbiAqIEBzaWcgTnVtYmVyIC0+IFN0cmluZyAtPiBbU3RyaW5nXVxuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3RcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuc3BsaXRFdmVyeSgzLCBbMSwgMiwgMywgNCwgNSwgNiwgN10pOyAvLz0+IFtbMSwgMiwgM10sIFs0LCA1LCA2XSwgWzddXVxuICogICAgICBSLnNwbGl0RXZlcnkoMywgJ2Zvb2JhcmJheicpOyAvLz0+IFsnZm9vJywgJ2JhcicsICdiYXonXVxuICovXG5cblxudmFyIHNwbGl0RXZlcnkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBzcGxpdEV2ZXJ5KG4sIGxpc3QpIHtcbiAgaWYgKG4gPD0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gc3BsaXRFdmVyeSBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlcicpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgIHJlc3VsdC5wdXNoKHNsaWNlKGlkeCwgaWR4ICs9IG4sIGxpc3QpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHNwbGl0RXZlcnk7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogVGFrZXMgYSBsaXN0IGFuZCBhIHByZWRpY2F0ZSBhbmQgcmV0dXJucyBhIHBhaXIgb2YgbGlzdHMgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKlxuICogIC0gdGhlIHJlc3VsdCBvZiBjb25jYXRlbmF0aW5nIHRoZSB0d28gb3V0cHV0IGxpc3RzIGlzIGVxdWl2YWxlbnQgdG8gdGhlIGlucHV0IGxpc3Q7XG4gKiAgLSBub25lIG9mIHRoZSBlbGVtZW50cyBvZiB0aGUgZmlyc3Qgb3V0cHV0IGxpc3Qgc2F0aXNmaWVzIHRoZSBwcmVkaWNhdGU7IGFuZFxuICogIC0gaWYgdGhlIHNlY29uZCBvdXRwdXQgbGlzdCBpcyBub24tZW1wdHksIGl0cyBmaXJzdCBlbGVtZW50IHNhdGlzZmllcyB0aGUgcHJlZGljYXRlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE5LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbW2FdLCBbYV1dXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkIFRoZSBwcmVkaWNhdGUgdGhhdCBkZXRlcm1pbmVzIHdoZXJlIHRoZSBhcnJheSBpcyBzcGxpdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGJlIHNwbGl0LlxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5zcGxpdFdoZW4oUi5lcXVhbHMoMiksIFsxLCAyLCAzLCAxLCAyLCAzXSk7ICAgLy89PiBbWzFdLCBbMiwgMywgMSwgMiwgM11dXG4gKi9cblxuXG52YXIgc3BsaXRXaGVuID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gc3BsaXRXaGVuKHByZWQsIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgdmFyIHByZWZpeCA9IFtdO1xuXG4gIHdoaWxlIChpZHggPCBsZW4gJiYgIXByZWQobGlzdFtpZHhdKSkge1xuICAgIHByZWZpeC5wdXNoKGxpc3RbaWR4XSk7XG4gICAgaWR4ICs9IDE7XG4gIH1cblxuICByZXR1cm4gW3ByZWZpeCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgaWR4KV07XG59KTtcbm1vZHVsZS5leHBvcnRzID0gc3BsaXRXaGVuOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgZXF1YWxzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZXF1YWxzJyk7XG5cbnZhciB0YWtlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdGFrZScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3Qgc3RhcnRzIHdpdGggdGhlIHByb3ZpZGVkIHZhbHVlc1xuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjI0LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFthXSAtPiBCb29sZWFuXG4gKiBAc2lnIFN0cmluZyAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IHByZWZpeFxuICogQHBhcmFtIHsqfSBsaXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuc3RhcnRzV2l0aCgnYScsICdhYmMnKSAgICAgICAgICAgICAgICAvLz0+IHRydWVcbiAqICAgICAgUi5zdGFydHNXaXRoKCdiJywgJ2FiYycpICAgICAgICAgICAgICAgIC8vPT4gZmFsc2VcbiAqICAgICAgUi5zdGFydHNXaXRoKFsnYSddLCBbJ2EnLCAnYicsICdjJ10pICAgIC8vPT4gdHJ1ZVxuICogICAgICBSLnN0YXJ0c1dpdGgoWydiJ10sIFsnYScsICdiJywgJ2MnXSkgICAgLy89PiBmYWxzZVxuICovXG5cblxudmFyIHN0YXJ0c1dpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiAocHJlZml4LCBsaXN0KSB7XG4gIHJldHVybiBlcXVhbHModGFrZShwcmVmaXgubGVuZ3RoLCBsaXN0KSwgcHJlZml4KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBzdGFydHNXaXRoOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFN1YnRyYWN0cyBpdHMgc2Vjb25kIGFyZ3VtZW50IGZyb20gaXRzIGZpcnN0IGFyZ3VtZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBOdW1iZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBhIFRoZSBmaXJzdCB2YWx1ZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBiIFRoZSBzZWNvbmQgdmFsdWUuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSByZXN1bHQgb2YgYGEgLSBiYC5cbiAqIEBzZWUgUi5hZGRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnN1YnRyYWN0KDEwLCA4KTsgLy89PiAyXG4gKlxuICogICAgICB2YXIgbWludXM1ID0gUi5zdWJ0cmFjdChSLl9fLCA1KTtcbiAqICAgICAgbWludXM1KDE3KTsgLy89PiAxMlxuICpcbiAqICAgICAgdmFyIGNvbXBsZW1lbnRhcnlBbmdsZSA9IFIuc3VidHJhY3QoOTApO1xuICogICAgICBjb21wbGVtZW50YXJ5QW5nbGUoMzApOyAvLz0+IDYwXG4gKiAgICAgIGNvbXBsZW1lbnRhcnlBbmdsZSg3Mik7IC8vPT4gMThcbiAqL1xuXG5cbnZhciBzdWJ0cmFjdCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHN1YnRyYWN0KGEsIGIpIHtcbiAgcmV0dXJuIE51bWJlcihhKSAtIE51bWJlcihiKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBzdWJ0cmFjdDsiLCJ2YXIgYWRkID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYWRkJyk7XG5cbnZhciByZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2UnKTtcblxuLyoqXG4gKiBBZGRzIHRvZ2V0aGVyIGFsbCB0aGUgZWxlbWVudHMgb2YgYSBsaXN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBzaWcgW051bWJlcl0gLT4gTnVtYmVyXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IEFuIGFycmF5IG9mIG51bWJlcnNcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHN1bSBvZiBhbGwgdGhlIG51bWJlcnMgaW4gdGhlIGxpc3QuXG4gKiBAc2VlIFIucmVkdWNlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5zdW0oWzIsNCw2LDgsMTAwLDFdKTsgLy89PiAxMjFcbiAqL1xuXG5cbnZhciBzdW0gPSAvKiNfX1BVUkVfXyovcmVkdWNlKGFkZCwgMCk7XG5tb2R1bGUuZXhwb3J0cyA9IHN1bTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIGNvbmNhdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NvbmNhdCcpO1xuXG52YXIgZGlmZmVyZW5jZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2RpZmZlcmVuY2UnKTtcblxuLyoqXG4gKiBGaW5kcyB0aGUgc2V0IChpLmUuIG5vIGR1cGxpY2F0ZXMpIG9mIGFsbCBlbGVtZW50cyBjb250YWluZWQgaW4gdGhlIGZpcnN0IG9yXG4gKiBzZWNvbmQgbGlzdCwgYnV0IG5vdCBib3RoLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE5LjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBbKl0gLT4gWypdIC0+IFsqXVxuICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGxpc3QuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MiBUaGUgc2Vjb25kIGxpc3QuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGVsZW1lbnRzIGluIGBsaXN0MWAgb3IgYGxpc3QyYCwgYnV0IG5vdCBib3RoLlxuICogQHNlZSBSLnN5bW1ldHJpY0RpZmZlcmVuY2VXaXRoLCBSLmRpZmZlcmVuY2UsIFIuZGlmZmVyZW5jZVdpdGhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnN5bW1ldHJpY0RpZmZlcmVuY2UoWzEsMiwzLDRdLCBbNyw2LDUsNCwzXSk7IC8vPT4gWzEsMiw3LDYsNV1cbiAqICAgICAgUi5zeW1tZXRyaWNEaWZmZXJlbmNlKFs3LDYsNSw0LDNdLCBbMSwyLDMsNF0pOyAvLz0+IFs3LDYsNSwxLDJdXG4gKi9cblxuXG52YXIgc3ltbWV0cmljRGlmZmVyZW5jZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHN5bW1ldHJpY0RpZmZlcmVuY2UobGlzdDEsIGxpc3QyKSB7XG4gIHJldHVybiBjb25jYXQoZGlmZmVyZW5jZShsaXN0MSwgbGlzdDIpLCBkaWZmZXJlbmNlKGxpc3QyLCBsaXN0MSkpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHN5bW1ldHJpY0RpZmZlcmVuY2U7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBjb25jYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb25jYXQnKTtcblxudmFyIGRpZmZlcmVuY2VXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZGlmZmVyZW5jZVdpdGgnKTtcblxuLyoqXG4gKiBGaW5kcyB0aGUgc2V0IChpLmUuIG5vIGR1cGxpY2F0ZXMpIG9mIGFsbCBlbGVtZW50cyBjb250YWluZWQgaW4gdGhlIGZpcnN0IG9yXG4gKiBzZWNvbmQgbGlzdCwgYnV0IG5vdCBib3RoLiBEdXBsaWNhdGlvbiBpcyBkZXRlcm1pbmVkIGFjY29yZGluZyB0byB0aGUgdmFsdWVcbiAqIHJldHVybmVkIGJ5IGFwcGx5aW5nIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgdG8gdHdvIGxpc3QgZWxlbWVudHMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnICgoYSwgYSkgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgdXNlZCB0byB0ZXN0IHdoZXRoZXIgdHdvIGl0ZW1zIGFyZSBlcXVhbC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QxIFRoZSBmaXJzdCBsaXN0LlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDIgVGhlIHNlY29uZCBsaXN0LlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBlbGVtZW50cyBpbiBgbGlzdDFgIG9yIGBsaXN0MmAsIGJ1dCBub3QgYm90aC5cbiAqIEBzZWUgUi5zeW1tZXRyaWNEaWZmZXJlbmNlLCBSLmRpZmZlcmVuY2UsIFIuZGlmZmVyZW5jZVdpdGhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZXFBID0gUi5lcUJ5KFIucHJvcCgnYScpKTtcbiAqICAgICAgdmFyIGwxID0gW3thOiAxfSwge2E6IDJ9LCB7YTogM30sIHthOiA0fV07XG4gKiAgICAgIHZhciBsMiA9IFt7YTogM30sIHthOiA0fSwge2E6IDV9LCB7YTogNn1dO1xuICogICAgICBSLnN5bW1ldHJpY0RpZmZlcmVuY2VXaXRoKGVxQSwgbDEsIGwyKTsgLy89PiBbe2E6IDF9LCB7YTogMn0sIHthOiA1fSwge2E6IDZ9XVxuICovXG5cblxudmFyIHN5bW1ldHJpY0RpZmZlcmVuY2VXaXRoID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gc3ltbWV0cmljRGlmZmVyZW5jZVdpdGgocHJlZCwgbGlzdDEsIGxpc3QyKSB7XG4gIHJldHVybiBjb25jYXQoZGlmZmVyZW5jZVdpdGgocHJlZCwgbGlzdDEsIGxpc3QyKSwgZGlmZmVyZW5jZVdpdGgocHJlZCwgbGlzdDIsIGxpc3QxKSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gc3ltbWV0cmljRGlmZmVyZW5jZVdpdGg7IiwidmFyIF9jaGVja0Zvck1ldGhvZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jaGVja0Zvck1ldGhvZCcpO1xuXG52YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIHNsaWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc2xpY2UnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGFsbCBidXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGdpdmVuIGxpc3Qgb3Igc3RyaW5nIChvciBvYmplY3RcbiAqIHdpdGggYSBgdGFpbGAgbWV0aG9kKS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgc2xpY2VgIG1ldGhvZCBvZiB0aGUgZmlyc3QgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gW2FdXG4gKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7Kn0gbGlzdFxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5oZWFkLCBSLmluaXQsIFIubGFzdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudGFpbChbMSwgMiwgM10pOyAgLy89PiBbMiwgM11cbiAqICAgICAgUi50YWlsKFsxLCAyXSk7ICAgICAvLz0+IFsyXVxuICogICAgICBSLnRhaWwoWzFdKTsgICAgICAgIC8vPT4gW11cbiAqICAgICAgUi50YWlsKFtdKTsgICAgICAgICAvLz0+IFtdXG4gKlxuICogICAgICBSLnRhaWwoJ2FiYycpOyAgLy89PiAnYmMnXG4gKiAgICAgIFIudGFpbCgnYWInKTsgICAvLz0+ICdiJ1xuICogICAgICBSLnRhaWwoJ2EnKTsgICAgLy89PiAnJ1xuICogICAgICBSLnRhaWwoJycpOyAgICAgLy89PiAnJ1xuICovXG5cblxudmFyIHRhaWwgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MSggLyojX19QVVJFX18qL19jaGVja0Zvck1ldGhvZCgndGFpbCcsIC8qI19fUFVSRV9fKi9zbGljZSgxLCBJbmZpbml0eSkpKTtcbm1vZHVsZS5leHBvcnRzID0gdGFpbDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9kaXNwYXRjaGFibGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG5cbnZhciBfeHRha2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feHRha2UnKTtcblxudmFyIHNsaWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc2xpY2UnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBgbmAgZWxlbWVudHMgb2YgdGhlIGdpdmVuIGxpc3QsIHN0cmluZywgb3JcbiAqIHRyYW5zZHVjZXIvdHJhbnNmb3JtZXIgKG9yIG9iamVjdCB3aXRoIGEgYHRha2VgIG1ldGhvZCkuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYHRha2VgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IFthXSAtPiBbYV1cbiAqIEBzaWcgTnVtYmVyIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIuZHJvcFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudGFrZSgxLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnZm9vJ11cbiAqICAgICAgUi50YWtlKDIsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nLCAnYmFyJ11cbiAqICAgICAgUi50YWtlKDMsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nLCAnYmFyJywgJ2JheiddXG4gKiAgICAgIFIudGFrZSg0LCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnZm9vJywgJ2JhcicsICdiYXonXVxuICogICAgICBSLnRha2UoMywgJ3JhbWRhJyk7ICAgICAgICAgICAgICAgLy89PiAncmFtJ1xuICpcbiAqICAgICAgdmFyIHBlcnNvbm5lbCA9IFtcbiAqICAgICAgICAnRGF2ZSBCcnViZWNrJyxcbiAqICAgICAgICAnUGF1bCBEZXNtb25kJyxcbiAqICAgICAgICAnRXVnZW5lIFdyaWdodCcsXG4gKiAgICAgICAgJ0pvZSBNb3JlbGxvJyxcbiAqICAgICAgICAnR2VycnkgTXVsbGlnYW4nLFxuICogICAgICAgICdCb2IgQmF0ZXMnLFxuICogICAgICAgICdKb2UgRG9kZ2UnLFxuICogICAgICAgICdSb24gQ3JvdHR5J1xuICogICAgICBdO1xuICpcbiAqICAgICAgdmFyIHRha2VGaXZlID0gUi50YWtlKDUpO1xuICogICAgICB0YWtlRml2ZShwZXJzb25uZWwpO1xuICogICAgICAvLz0+IFsnRGF2ZSBCcnViZWNrJywgJ1BhdWwgRGVzbW9uZCcsICdFdWdlbmUgV3JpZ2h0JywgJ0pvZSBNb3JlbGxvJywgJ0dlcnJ5IE11bGxpZ2FuJ11cbiAqIEBzeW1iIFIudGFrZSgtMSwgW2EsIGJdKSA9IFthLCBiXVxuICogQHN5bWIgUi50YWtlKDAsIFthLCBiXSkgPSBbXVxuICogQHN5bWIgUi50YWtlKDEsIFthLCBiXSkgPSBbYV1cbiAqIEBzeW1iIFIudGFrZSgyLCBbYSwgYl0pID0gW2EsIGJdXG4gKi9cblxuXG52YXIgdGFrZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbJ3Rha2UnXSwgX3h0YWtlLCBmdW5jdGlvbiB0YWtlKG4sIHhzKSB7XG4gIHJldHVybiBzbGljZSgwLCBuIDwgMCA/IEluZmluaXR5IDogbiwgeHMpO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSB0YWtlOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgZHJvcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2Ryb3AnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyB0aGUgbGFzdCBgbmAgZWxlbWVudHMgb2YgdGhlIGdpdmVuIGxpc3QuXG4gKiBJZiBgbiA+IGxpc3QubGVuZ3RoYCwgcmV0dXJucyBhIGxpc3Qgb2YgYGxpc3QubGVuZ3RoYCBlbGVtZW50cy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNi4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gW2FdIC0+IFthXVxuICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IG4gVGhlIG51bWJlciBvZiBlbGVtZW50cyB0byByZXR1cm4uXG4gKiBAcGFyYW0ge0FycmF5fSB4cyBUaGUgY29sbGVjdGlvbiB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5fVxuICogQHNlZSBSLmRyb3BMYXN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50YWtlTGFzdCgxLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnYmF6J11cbiAqICAgICAgUi50YWtlTGFzdCgyLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnYmFyJywgJ2JheiddXG4gKiAgICAgIFIudGFrZUxhc3QoMywgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2ZvbycsICdiYXInLCAnYmF6J11cbiAqICAgICAgUi50YWtlTGFzdCg0LCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnZm9vJywgJ2JhcicsICdiYXonXVxuICogICAgICBSLnRha2VMYXN0KDMsICdyYW1kYScpOyAgICAgICAgICAgICAgIC8vPT4gJ21kYSdcbiAqL1xuXG5cbnZhciB0YWtlTGFzdCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHRha2VMYXN0KG4sIHhzKSB7XG4gIHJldHVybiBkcm9wKG4gPj0gMCA/IHhzLmxlbmd0aCAtIG4gOiAwLCB4cyk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdGFrZUxhc3Q7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBzbGljZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3NsaWNlJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGNvbnRhaW5pbmcgdGhlIGxhc3QgYG5gIGVsZW1lbnRzIG9mIGEgZ2l2ZW4gbGlzdCwgcGFzc2luZ1xuICogZWFjaCB2YWx1ZSB0byB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIGZ1bmN0aW9uLCBhbmQgdGVybWluYXRpbmcgd2hlbiB0aGVcbiAqIHByZWRpY2F0ZSBmdW5jdGlvbiByZXR1cm5zIGBmYWxzZWAuIEV4Y2x1ZGVzIHRoZSBlbGVtZW50IHRoYXQgY2F1c2VkIHRoZVxuICogcHJlZGljYXRlIGZ1bmN0aW9uIHRvIGZhaWwuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gaXMgcGFzc2VkIG9uZSBhcmd1bWVudDpcbiAqICoodmFsdWUpKi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNi4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdXG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBhcnJheS5cbiAqIEBzZWUgUi5kcm9wTGFzdFdoaWxlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzTm90T25lID0geCA9PiB4ICE9PSAxO1xuICpcbiAqICAgICAgUi50YWtlTGFzdFdoaWxlKGlzTm90T25lLCBbMSwgMiwgMywgNF0pOyAvLz0+IFsyLCAzLCA0XVxuICpcbiAqICAgICAgUi50YWtlTGFzdFdoaWxlKHggPT4geCAhPT0gJ1InICwgJ1JhbWRhJyk7IC8vPT4gJ2FtZGEnXG4gKi9cblxuXG52YXIgdGFrZUxhc3RXaGlsZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHRha2VMYXN0V2hpbGUoZm4sIHhzKSB7XG4gIHZhciBpZHggPSB4cy5sZW5ndGggLSAxO1xuICB3aGlsZSAoaWR4ID49IDAgJiYgZm4oeHNbaWR4XSkpIHtcbiAgICBpZHggLT0gMTtcbiAgfVxuICByZXR1cm4gc2xpY2UoaWR4ICsgMSwgSW5maW5pdHksIHhzKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB0YWtlTGFzdFdoaWxlOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF94dGFrZVdoaWxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3h0YWtlV2hpbGUnKTtcblxudmFyIHNsaWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc2xpY2UnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyB0aGUgZmlyc3QgYG5gIGVsZW1lbnRzIG9mIGEgZ2l2ZW4gbGlzdCxcbiAqIHBhc3NpbmcgZWFjaCB2YWx1ZSB0byB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIGZ1bmN0aW9uLCBhbmQgdGVybWluYXRpbmcgd2hlblxuICogdGhlIHByZWRpY2F0ZSBmdW5jdGlvbiByZXR1cm5zIGBmYWxzZWAuIEV4Y2x1ZGVzIHRoZSBlbGVtZW50IHRoYXQgY2F1c2VkIHRoZVxuICogcHJlZGljYXRlIGZ1bmN0aW9uIHRvIGZhaWwuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gaXMgcGFzc2VkIG9uZSBhcmd1bWVudDpcbiAqICoodmFsdWUpKi5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgdGFrZVdoaWxlYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdXG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBhcnJheS5cbiAqIEBzZWUgUi5kcm9wV2hpbGUsIFIudHJhbnNkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzTm90Rm91ciA9IHggPT4geCAhPT0gNDtcbiAqXG4gKiAgICAgIFIudGFrZVdoaWxlKGlzTm90Rm91ciwgWzEsIDIsIDMsIDQsIDMsIDIsIDFdKTsgLy89PiBbMSwgMiwgM11cbiAqXG4gKiAgICAgIFIudGFrZVdoaWxlKHggPT4geCAhPT0gJ2QnICwgJ1JhbWRhJyk7IC8vPT4gJ1JhbSdcbiAqL1xuXG5cbnZhciB0YWtlV2hpbGUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MiggLyojX19QVVJFX18qL19kaXNwYXRjaGFibGUoWyd0YWtlV2hpbGUnXSwgX3h0YWtlV2hpbGUsIGZ1bmN0aW9uIHRha2VXaGlsZShmbiwgeHMpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSB4cy5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW4gJiYgZm4oeHNbaWR4XSkpIHtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gc2xpY2UoMCwgaWR4LCB4cyk7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IHRha2VXaGlsZTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9kaXNwYXRjaGFibGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG5cbnZhciBfeHRhcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194dGFwJyk7XG5cbi8qKlxuICogUnVucyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2l0aCB0aGUgc3VwcGxpZWQgb2JqZWN0LCB0aGVuIHJldHVybnMgdGhlIG9iamVjdC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGFzIHNlY29uZCBwYXJhbWV0ZXIuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKGEgLT4gKikgLT4gYSAtPiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aXRoIGB4YC4gVGhlIHJldHVybiB2YWx1ZSBvZiBgZm5gIHdpbGwgYmUgdGhyb3duIGF3YXkuXG4gKiBAcGFyYW0geyp9IHhcbiAqIEByZXR1cm4geyp9IGB4YC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgc2F5WCA9IHggPT4gY29uc29sZS5sb2coJ3ggaXMgJyArIHgpO1xuICogICAgICBSLnRhcChzYXlYLCAxMDApOyAvLz0+IDEwMFxuICogICAgICAvLyBsb2dzICd4IGlzIDEwMCdcbiAqIEBzeW1iIFIudGFwKGYsIGEpID0gYVxuICovXG5cblxudmFyIHRhcCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbXSwgX3h0YXAsIGZ1bmN0aW9uIHRhcChmbiwgeCkge1xuICBmbih4KTtcbiAgcmV0dXJuIHg7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IHRhcDsiLCJ2YXIgX2Nsb25lUmVnRXhwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Nsb25lUmVnRXhwJyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2lzUmVnRXhwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzUmVnRXhwJyk7XG5cbnZhciB0b1N0cmluZyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgZ2l2ZW4gc3RyaW5nIG1hdGNoZXMgYSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTIuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHNpZyBSZWdFeHAgLT4gU3RyaW5nIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7UmVnRXhwfSBwYXR0ZXJuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLm1hdGNoXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50ZXN0KC9eeC8sICd4eXonKTsgLy89PiB0cnVlXG4gKiAgICAgIFIudGVzdCgvXnkvLCAneHl6Jyk7IC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciB0ZXN0ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gdGVzdChwYXR0ZXJuLCBzdHIpIHtcbiAgaWYgKCFfaXNSZWdFeHAocGF0dGVybikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCfigJh0ZXN04oCZIHJlcXVpcmVzIGEgdmFsdWUgb2YgdHlwZSBSZWdFeHAgYXMgaXRzIGZpcnN0IGFyZ3VtZW50OyByZWNlaXZlZCAnICsgdG9TdHJpbmcocGF0dGVybikpO1xuICB9XG4gIHJldHVybiBfY2xvbmVSZWdFeHAocGF0dGVybikudGVzdChzdHIpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHRlc3Q7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogQ2FsbHMgYW4gaW5wdXQgZnVuY3Rpb24gYG5gIHRpbWVzLCByZXR1cm5pbmcgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgcmVzdWx0c1xuICogb2YgdGhvc2UgZnVuY3Rpb24gY2FsbHMuXG4gKlxuICogYGZuYCBpcyBwYXNzZWQgb25lIGFyZ3VtZW50OiBUaGUgY3VycmVudCB2YWx1ZSBvZiBgbmAsIHdoaWNoIGJlZ2lucyBhdCBgMGBcbiAqIGFuZCBpcyBncmFkdWFsbHkgaW5jcmVtZW50ZWQgdG8gYG4gLSAxYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yLjNcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChOdW1iZXIgLT4gYSkgLT4gTnVtYmVyIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGludm9rZS4gUGFzc2VkIG9uZSBhcmd1bWVudCwgdGhlIGN1cnJlbnQgdmFsdWUgb2YgYG5gLlxuICogQHBhcmFtIHtOdW1iZXJ9IG4gQSB2YWx1ZSBiZXR3ZWVuIGAwYCBhbmQgYG4gLSAxYC4gSW5jcmVtZW50cyBhZnRlciBlYWNoIGZ1bmN0aW9uIGNhbGwuXG4gKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgY29udGFpbmluZyB0aGUgcmV0dXJuIHZhbHVlcyBvZiBhbGwgY2FsbHMgdG8gYGZuYC5cbiAqIEBzZWUgUi5yZXBlYXRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRpbWVzKFIuaWRlbnRpdHksIDUpOyAvLz0+IFswLCAxLCAyLCAzLCA0XVxuICogQHN5bWIgUi50aW1lcyhmLCAwKSA9IFtdXG4gKiBAc3ltYiBSLnRpbWVzKGYsIDEpID0gW2YoMCldXG4gKiBAc3ltYiBSLnRpbWVzKGYsIDIpID0gW2YoMCksIGYoMSldXG4gKi9cblxuXG52YXIgdGltZXMgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiB0aW1lcyhmbiwgbikge1xuICB2YXIgbGVuID0gTnVtYmVyKG4pO1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxpc3Q7XG5cbiAgaWYgKGxlbiA8IDAgfHwgaXNOYU4obGVuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCduIG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyJyk7XG4gIH1cbiAgbGlzdCA9IG5ldyBBcnJheShsZW4pO1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgbGlzdFtpZHhdID0gZm4oaWR4KTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gbGlzdDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB0aW1lczsiLCJ2YXIgaW52b2tlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludm9rZXInKTtcblxuLyoqXG4gKiBUaGUgbG93ZXIgY2FzZSB2ZXJzaW9uIG9mIGEgc3RyaW5nLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gbG93ZXIgY2FzZS5cbiAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGxvd2VyIGNhc2UgdmVyc2lvbiBvZiBgc3RyYC5cbiAqIEBzZWUgUi50b1VwcGVyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50b0xvd2VyKCdYWVonKTsgLy89PiAneHl6J1xuICovXG5cblxudmFyIHRvTG93ZXIgPSAvKiNfX1BVUkVfXyovaW52b2tlcigwLCAndG9Mb3dlckNhc2UnKTtcbm1vZHVsZS5leHBvcnRzID0gdG9Mb3dlcjsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIF9oYXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faGFzJyk7XG5cbi8qKlxuICogQ29udmVydHMgYW4gb2JqZWN0IGludG8gYW4gYXJyYXkgb2Yga2V5LCB2YWx1ZSBhcnJheXMuIE9ubHkgdGhlIG9iamVjdCdzXG4gKiBvd24gcHJvcGVydGllcyBhcmUgdXNlZC5cbiAqIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgdGhlIG91dHB1dCBhcnJheSBpcyBub3QgZ3VhcmFudGVlZCB0byBiZSBjb25zaXN0ZW50XG4gKiBhY3Jvc3MgZGlmZmVyZW50IEpTIHBsYXRmb3Jtcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC40LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcge1N0cmluZzogKn0gLT4gW1tTdHJpbmcsKl1dXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gZXh0cmFjdCBmcm9tXG4gKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2Yga2V5LCB2YWx1ZSBhcnJheXMgZnJvbSB0aGUgb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMuXG4gKiBAc2VlIFIuZnJvbVBhaXJzXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50b1BhaXJzKHthOiAxLCBiOiAyLCBjOiAzfSk7IC8vPT4gW1snYScsIDFdLCBbJ2InLCAyXSwgWydjJywgM11dXG4gKi9cblxuXG52YXIgdG9QYWlycyA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIHRvUGFpcnMob2JqKSB7XG4gIHZhciBwYWlycyA9IFtdO1xuICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgIGlmIChfaGFzKHByb3AsIG9iaikpIHtcbiAgICAgIHBhaXJzW3BhaXJzLmxlbmd0aF0gPSBbcHJvcCwgb2JqW3Byb3BdXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBhaXJzO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHRvUGFpcnM7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbi8qKlxuICogQ29udmVydHMgYW4gb2JqZWN0IGludG8gYW4gYXJyYXkgb2Yga2V5LCB2YWx1ZSBhcnJheXMuIFRoZSBvYmplY3QncyBvd25cbiAqIHByb3BlcnRpZXMgYW5kIHByb3RvdHlwZSBwcm9wZXJ0aWVzIGFyZSB1c2VkLiBOb3RlIHRoYXQgdGhlIG9yZGVyIG9mIHRoZVxuICogb3V0cHV0IGFycmF5IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGNvbnNpc3RlbnQgYWNyb3NzIGRpZmZlcmVudCBKU1xuICogcGxhdGZvcm1zLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjQuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7U3RyaW5nOiAqfSAtPiBbW1N0cmluZywqXV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBleHRyYWN0IGZyb21cbiAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiBrZXksIHZhbHVlIGFycmF5cyBmcm9tIHRoZSBvYmplY3QncyBvd25cbiAqICAgICAgICAgYW5kIHByb3RvdHlwZSBwcm9wZXJ0aWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBGID0gZnVuY3Rpb24oKSB7IHRoaXMueCA9ICdYJzsgfTtcbiAqICAgICAgRi5wcm90b3R5cGUueSA9ICdZJztcbiAqICAgICAgdmFyIGYgPSBuZXcgRigpO1xuICogICAgICBSLnRvUGFpcnNJbihmKTsgLy89PiBbWyd4JywnWCddLCBbJ3knLCdZJ11dXG4gKi9cblxuXG52YXIgdG9QYWlyc0luID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gdG9QYWlyc0luKG9iaikge1xuICB2YXIgcGFpcnMgPSBbXTtcbiAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcbiAgICBwYWlyc1twYWlycy5sZW5ndGhdID0gW3Byb3AsIG9ialtwcm9wXV07XG4gIH1cbiAgcmV0dXJuIHBhaXJzO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHRvUGFpcnNJbjsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIF90b1N0cmluZyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL190b1N0cmluZycpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gdmFsdWUuIGBldmFsYCdpbmcgdGhlIG91dHB1dFxuICogc2hvdWxkIHJlc3VsdCBpbiBhIHZhbHVlIGVxdWl2YWxlbnQgdG8gdGhlIGlucHV0IHZhbHVlLiBNYW55IG9mIHRoZSBidWlsdC1pblxuICogYHRvU3RyaW5nYCBtZXRob2RzIGRvIG5vdCBzYXRpc2Z5IHRoaXMgcmVxdWlyZW1lbnQuXG4gKlxuICogSWYgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGBbb2JqZWN0IE9iamVjdF1gIHdpdGggYSBgdG9TdHJpbmdgIG1ldGhvZCBvdGhlclxuICogdGhhbiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AsIHRoaXMgbWV0aG9kIGlzIGludm9rZWQgd2l0aCBubyBhcmd1bWVudHNcbiAqIHRvIHByb2R1Y2UgdGhlIHJldHVybiB2YWx1ZS4gVGhpcyBtZWFucyB1c2VyLWRlZmluZWQgY29uc3RydWN0b3IgZnVuY3Rpb25zXG4gKiBjYW4gcHJvdmlkZSBhIHN1aXRhYmxlIGB0b1N0cmluZ2AgbWV0aG9kLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICogICAgICAgdGhpcy54ID0geDtcbiAqICAgICAgIHRoaXMueSA9IHk7XG4gKiAgICAgfVxuICpcbiAqICAgICBQb2ludC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAqICAgICAgIHJldHVybiAnbmV3IFBvaW50KCcgKyB0aGlzLnggKyAnLCAnICsgdGhpcy55ICsgJyknO1xuICogICAgIH07XG4gKlxuICogICAgIFIudG9TdHJpbmcobmV3IFBvaW50KDEsIDIpKTsgLy89PiAnbmV3IFBvaW50KDEsIDIpJ1xuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE0LjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBzaWcgKiAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50b1N0cmluZyg0Mik7IC8vPT4gJzQyJ1xuICogICAgICBSLnRvU3RyaW5nKCdhYmMnKTsgLy89PiAnXCJhYmNcIidcbiAqICAgICAgUi50b1N0cmluZyhbMSwgMiwgM10pOyAvLz0+ICdbMSwgMiwgM10nXG4gKiAgICAgIFIudG9TdHJpbmcoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9KTsgLy89PiAne1wiYmFyXCI6IDIsIFwiYmF6XCI6IDMsIFwiZm9vXCI6IDF9J1xuICogICAgICBSLnRvU3RyaW5nKG5ldyBEYXRlKCcyMDAxLTAyLTAzVDA0OjA1OjA2WicpKTsgLy89PiAnbmV3IERhdGUoXCIyMDAxLTAyLTAzVDA0OjA1OjA2LjAwMFpcIiknXG4gKi9cblxuXG52YXIgdG9TdHJpbmcgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiB0b1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIF90b1N0cmluZyh2YWwsIFtdKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB0b1N0cmluZzsiLCJ2YXIgaW52b2tlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludm9rZXInKTtcblxuLyoqXG4gKiBUaGUgdXBwZXIgY2FzZSB2ZXJzaW9uIG9mIGEgc3RyaW5nLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gdXBwZXIgY2FzZS5cbiAqIEByZXR1cm4ge1N0cmluZ30gVGhlIHVwcGVyIGNhc2UgdmVyc2lvbiBvZiBgc3RyYC5cbiAqIEBzZWUgUi50b0xvd2VyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50b1VwcGVyKCdhYmMnKTsgLy89PiAnQUJDJ1xuICovXG5cblxudmFyIHRvVXBwZXIgPSAvKiNfX1BVUkVfXyovaW52b2tlcigwLCAndG9VcHBlckNhc2UnKTtcbm1vZHVsZS5leHBvcnRzID0gdG9VcHBlcjsiLCJ2YXIgX3JlZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2UnKTtcblxudmFyIF94d3JhcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194d3JhcCcpO1xuXG52YXIgY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY3VycnlOJyk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYSB0cmFuc2R1Y2VyIHVzaW5nIHN1cHBsaWVkIGl0ZXJhdG9yIGZ1bmN0aW9uLiBSZXR1cm5zIGEgc2luZ2xlXG4gKiBpdGVtIGJ5IGl0ZXJhdGluZyB0aHJvdWdoIHRoZSBsaXN0LCBzdWNjZXNzaXZlbHkgY2FsbGluZyB0aGUgdHJhbnNmb3JtZWRcbiAqIGl0ZXJhdG9yIGZ1bmN0aW9uIGFuZCBwYXNzaW5nIGl0IGFuIGFjY3VtdWxhdG9yIHZhbHVlIGFuZCB0aGUgY3VycmVudCB2YWx1ZVxuICogZnJvbSB0aGUgYXJyYXksIGFuZCB0aGVuIHBhc3NpbmcgdGhlIHJlc3VsdCB0byB0aGUgbmV4dCBjYWxsLlxuICpcbiAqIFRoZSBpdGVyYXRvciBmdW5jdGlvbiByZWNlaXZlcyB0d28gdmFsdWVzOiAqKGFjYywgdmFsdWUpKi4gSXQgd2lsbCBiZVxuICogd3JhcHBlZCBhcyBhIHRyYW5zZm9ybWVyIHRvIGluaXRpYWxpemUgdGhlIHRyYW5zZHVjZXIuIEEgdHJhbnNmb3JtZXIgY2FuIGJlXG4gKiBwYXNzZWQgZGlyZWN0bHkgaW4gcGxhY2Ugb2YgYW4gaXRlcmF0b3IgZnVuY3Rpb24uIEluIGJvdGggY2FzZXMsIGl0ZXJhdGlvblxuICogbWF5IGJlIHN0b3BwZWQgZWFybHkgd2l0aCB0aGUgW2BSLnJlZHVjZWRgXSgjcmVkdWNlZCkgZnVuY3Rpb24uXG4gKlxuICogQSB0cmFuc2R1Y2VyIGlzIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGEgdHJhbnNmb3JtZXIgYW5kIHJldHVybnMgYVxuICogdHJhbnNmb3JtZXIgYW5kIGNhbiBiZSBjb21wb3NlZCBkaXJlY3RseS5cbiAqXG4gKiBBIHRyYW5zZm9ybWVyIGlzIGFuIGFuIG9iamVjdCB0aGF0IHByb3ZpZGVzIGEgMi1hcml0eSByZWR1Y2luZyBpdGVyYXRvclxuICogZnVuY3Rpb24sIHN0ZXAsIDAtYXJpdHkgaW5pdGlhbCB2YWx1ZSBmdW5jdGlvbiwgaW5pdCwgYW5kIDEtYXJpdHkgcmVzdWx0XG4gKiBleHRyYWN0aW9uIGZ1bmN0aW9uLCByZXN1bHQuIFRoZSBzdGVwIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIGl0ZXJhdG9yXG4gKiBmdW5jdGlvbiBpbiByZWR1Y2UuIFRoZSByZXN1bHQgZnVuY3Rpb24gaXMgdXNlZCB0byBjb252ZXJ0IHRoZSBmaW5hbFxuICogYWNjdW11bGF0b3IgaW50byB0aGUgcmV0dXJuIHR5cGUgYW5kIGluIG1vc3QgY2FzZXMgaXNcbiAqIFtgUi5pZGVudGl0eWBdKCNpZGVudGl0eSkuIFRoZSBpbml0IGZ1bmN0aW9uIGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgYW5cbiAqIGluaXRpYWwgYWNjdW11bGF0b3IsIGJ1dCBpcyBpZ25vcmVkIGJ5IHRyYW5zZHVjZS5cbiAqXG4gKiBUaGUgaXRlcmF0aW9uIGlzIHBlcmZvcm1lZCB3aXRoIFtgUi5yZWR1Y2VgXSgjcmVkdWNlKSBhZnRlciBpbml0aWFsaXppbmcgdGhlIHRyYW5zZHVjZXIuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTIuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGMgLT4gYykgLT4gKChhLCBiKSAtPiBhKSAtPiBhIC0+IFtiXSAtPiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB4ZiBUaGUgdHJhbnNkdWNlciBmdW5jdGlvbi4gUmVjZWl2ZXMgYSB0cmFuc2Zvcm1lciBhbmQgcmV0dXJucyBhIHRyYW5zZm9ybWVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiBSZWNlaXZlcyB0d28gdmFsdWVzLCB0aGUgYWNjdW11bGF0b3IgYW5kIHRoZVxuICogICAgICAgIGN1cnJlbnQgZWxlbWVudCBmcm9tIHRoZSBhcnJheS4gV3JhcHBlZCBhcyB0cmFuc2Zvcm1lciwgaWYgbmVjZXNzYXJ5LCBhbmQgdXNlZCB0b1xuICogICAgICAgIGluaXRpYWxpemUgdGhlIHRyYW5zZHVjZXJcbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBpbml0aWFsIGFjY3VtdWxhdG9yIHZhbHVlLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHsqfSBUaGUgZmluYWwsIGFjY3VtdWxhdGVkIHZhbHVlLlxuICogQHNlZSBSLnJlZHVjZSwgUi5yZWR1Y2VkLCBSLmludG9cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbnVtYmVycyA9IFsxLCAyLCAzLCA0XTtcbiAqICAgICAgdmFyIHRyYW5zZHVjZXIgPSBSLmNvbXBvc2UoUi5tYXAoUi5hZGQoMSkpLCBSLnRha2UoMikpO1xuICogICAgICBSLnRyYW5zZHVjZSh0cmFuc2R1Y2VyLCBSLmZsaXAoUi5hcHBlbmQpLCBbXSwgbnVtYmVycyk7IC8vPT4gWzIsIDNdXG4gKlxuICogICAgICB2YXIgaXNPZGQgPSAoeCkgPT4geCAlIDIgPT09IDE7XG4gKiAgICAgIHZhciBmaXJzdE9kZFRyYW5zZHVjZXIgPSBSLmNvbXBvc2UoUi5maWx0ZXIoaXNPZGQpLCBSLnRha2UoMSkpO1xuICogICAgICBSLnRyYW5zZHVjZShmaXJzdE9kZFRyYW5zZHVjZXIsIFIuZmxpcChSLmFwcGVuZCksIFtdLCBSLnJhbmdlKDAsIDEwMCkpOyAvLz0+IFsxXVxuICovXG5cblxudmFyIHRyYW5zZHVjZSA9IC8qI19fUFVSRV9fKi9jdXJyeU4oNCwgZnVuY3Rpb24gdHJhbnNkdWNlKHhmLCBmbiwgYWNjLCBsaXN0KSB7XG4gIHJldHVybiBfcmVkdWNlKHhmKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyA/IF94d3JhcChmbikgOiBmbiksIGFjYywgbGlzdCk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdHJhbnNkdWNlOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG4vKipcbiAqIFRyYW5zcG9zZXMgdGhlIHJvd3MgYW5kIGNvbHVtbnMgb2YgYSAyRCBsaXN0LlxuICogV2hlbiBwYXNzZWQgYSBsaXN0IG9mIGBuYCBsaXN0cyBvZiBsZW5ndGggYHhgLFxuICogcmV0dXJucyBhIGxpc3Qgb2YgYHhgIGxpc3RzIG9mIGxlbmd0aCBgbmAuXG4gKlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE5LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFtbYV1dIC0+IFtbYV1dXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IEEgMkQgbGlzdFxuICogQHJldHVybiB7QXJyYXl9IEEgMkQgbGlzdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudHJhbnNwb3NlKFtbMSwgJ2EnXSwgWzIsICdiJ10sIFszLCAnYyddXSkgLy89PiBbWzEsIDIsIDNdLCBbJ2EnLCAnYicsICdjJ11dXG4gKiAgICAgIFIudHJhbnNwb3NlKFtbMSwgMiwgM10sIFsnYScsICdiJywgJ2MnXV0pIC8vPT4gW1sxLCAnYSddLCBbMiwgJ2InXSwgWzMsICdjJ11dXG4gKlxuICogICAgICAvLyBJZiBzb21lIG9mIHRoZSByb3dzIGFyZSBzaG9ydGVyIHRoYW4gdGhlIGZvbGxvd2luZyByb3dzLCB0aGVpciBlbGVtZW50cyBhcmUgc2tpcHBlZDpcbiAqICAgICAgUi50cmFuc3Bvc2UoW1sxMCwgMTFdLCBbMjBdLCBbXSwgWzMwLCAzMSwgMzJdXSkgLy89PiBbWzEwLCAyMCwgMzBdLCBbMTEsIDMxXSwgWzMyXV1cbiAqIEBzeW1iIFIudHJhbnNwb3NlKFtbYV0sIFtiXSwgW2NdXSkgPSBbYSwgYiwgY11cbiAqIEBzeW1iIFIudHJhbnNwb3NlKFtbYSwgYl0sIFtjLCBkXV0pID0gW1thLCBjXSwgW2IsIGRdXVxuICogQHN5bWIgUi50cmFuc3Bvc2UoW1thLCBiXSwgW2NdXSkgPSBbW2EsIGNdLCBbYl1dXG4gKi9cblxuXG52YXIgdHJhbnNwb3NlID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gdHJhbnNwb3NlKG91dGVybGlzdCkge1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgd2hpbGUgKGkgPCBvdXRlcmxpc3QubGVuZ3RoKSB7XG4gICAgdmFyIGlubmVybGlzdCA9IG91dGVybGlzdFtpXTtcbiAgICB2YXIgaiA9IDA7XG4gICAgd2hpbGUgKGogPCBpbm5lcmxpc3QubGVuZ3RoKSB7XG4gICAgICBpZiAodHlwZW9mIHJlc3VsdFtqXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmVzdWx0W2pdID0gW107XG4gICAgICB9XG4gICAgICByZXN1bHRbal0ucHVzaChpbm5lcmxpc3Rbal0pO1xuICAgICAgaiArPSAxO1xuICAgIH1cbiAgICBpICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB0cmFuc3Bvc2U7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBtYXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tYXAnKTtcblxudmFyIHNlcXVlbmNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc2VxdWVuY2UnKTtcblxuLyoqXG4gKiBNYXBzIGFuIFtBcHBsaWNhdGl2ZV0oaHR0cHM6Ly9naXRodWIuY29tL2ZhbnRhc3lsYW5kL2ZhbnRhc3ktbGFuZCNhcHBsaWNhdGl2ZSktcmV0dXJuaW5nXG4gKiBmdW5jdGlvbiBvdmVyIGEgW1RyYXZlcnNhYmxlXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI3RyYXZlcnNhYmxlKSxcbiAqIHRoZW4gdXNlcyBbYHNlcXVlbmNlYF0oI3NlcXVlbmNlKSB0byB0cmFuc2Zvcm0gdGhlIHJlc3VsdGluZyBUcmF2ZXJzYWJsZSBvZiBBcHBsaWNhdGl2ZVxuICogaW50byBhbiBBcHBsaWNhdGl2ZSBvZiBUcmF2ZXJzYWJsZS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgdHJhdmVyc2VgIG1ldGhvZCBvZiB0aGUgdGhpcmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKEFwcGxpY2F0aXZlIGYsIFRyYXZlcnNhYmxlIHQpID0+IChhIC0+IGYgYSkgLT4gKGEgLT4gZiBiKSAtPiB0IGEgLT4gZiAodCBiKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gb2ZcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAqIEBwYXJhbSB7Kn0gdHJhdmVyc2FibGVcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIuc2VxdWVuY2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICAvLyBSZXR1cm5zIGBOb3RoaW5nYCBpZiB0aGUgZ2l2ZW4gZGl2aXNvciBpcyBgMGBcbiAqICAgICAgc2FmZURpdiA9IG4gPT4gZCA9PiBkID09PSAwID8gTm90aGluZygpIDogSnVzdChuIC8gZClcbiAqXG4gKiAgICAgIFIudHJhdmVyc2UoTWF5YmUub2YsIHNhZmVEaXYoMTApLCBbMiwgNCwgNV0pOyAvLz0+IEp1c3QoWzUsIDIuNSwgMl0pXG4gKiAgICAgIFIudHJhdmVyc2UoTWF5YmUub2YsIHNhZmVEaXYoMTApLCBbMiwgMCwgNV0pOyAvLz0+IE5vdGhpbmdcbiAqL1xuXG5cbnZhciB0cmF2ZXJzZSA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIHRyYXZlcnNlKG9mLCBmLCB0cmF2ZXJzYWJsZSkge1xuICByZXR1cm4gdHlwZW9mIHRyYXZlcnNhYmxlWydmYW50YXN5LWxhbmQvdHJhdmVyc2UnXSA9PT0gJ2Z1bmN0aW9uJyA/IHRyYXZlcnNhYmxlWydmYW50YXN5LWxhbmQvdHJhdmVyc2UnXShmLCBvZikgOiBzZXF1ZW5jZShvZiwgbWFwKGYsIHRyYXZlcnNhYmxlKSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdHJhdmVyc2U7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciB3cyA9ICdcXHgwOVxceDBBXFx4MEJcXHgwQ1xceDBEXFx4MjBcXHhBMFxcdTE2ODBcXHUxODBFXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwMycgKyAnXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjgnICsgJ1xcdTIwMjlcXHVGRUZGJztcbnZhciB6ZXJvV2lkdGggPSAnXFx1MjAwYic7XG52YXIgaGFzUHJvdG9UcmltID0gdHlwZW9mIFN0cmluZy5wcm90b3R5cGUudHJpbSA9PT0gJ2Z1bmN0aW9uJztcbi8qKlxuICogUmVtb3ZlcyAoc3RyaXBzKSB3aGl0ZXNwYWNlIGZyb20gYm90aCBlbmRzIG9mIHRoZSBzdHJpbmcuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNi4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byB0cmltLlxuICogQHJldHVybiB7U3RyaW5nfSBUcmltbWVkIHZlcnNpb24gb2YgYHN0cmAuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50cmltKCcgICB4eXogICcpOyAvLz0+ICd4eXonXG4gKiAgICAgIFIubWFwKFIudHJpbSwgUi5zcGxpdCgnLCcsICd4LCB5LCB6JykpOyAvLz0+IFsneCcsICd5JywgJ3onXVxuICovXG52YXIgX3RyaW0gPSAhaGFzUHJvdG9UcmltIHx8IC8qI19fUFVSRV9fKi93cy50cmltKCkgfHwgISAvKiNfX1BVUkVfXyovemVyb1dpZHRoLnRyaW0oKSA/IGZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHZhciBiZWdpblJ4ID0gbmV3IFJlZ0V4cCgnXlsnICsgd3MgKyAnXVsnICsgd3MgKyAnXSonKTtcbiAgdmFyIGVuZFJ4ID0gbmV3IFJlZ0V4cCgnWycgKyB3cyArICddWycgKyB3cyArICddKiQnKTtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGJlZ2luUngsICcnKS5yZXBsYWNlKGVuZFJ4LCAnJyk7XG59IDogZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci50cmltKCk7XG59O1xudmFyIHRyaW0gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShfdHJpbSk7XG5tb2R1bGUuZXhwb3J0cyA9IHRyaW07IiwidmFyIF9hcml0eSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xuXG52YXIgX2NvbmNhdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogYHRyeUNhdGNoYCB0YWtlcyB0d28gZnVuY3Rpb25zLCBhIGB0cnllcmAgYW5kIGEgYGNhdGNoZXJgLiBUaGUgcmV0dXJuZWRcbiAqIGZ1bmN0aW9uIGV2YWx1YXRlcyB0aGUgYHRyeWVyYDsgaWYgaXQgZG9lcyBub3QgdGhyb3csIGl0IHNpbXBseSByZXR1cm5zIHRoZVxuICogcmVzdWx0LiBJZiB0aGUgYHRyeWVyYCAqZG9lcyogdGhyb3csIHRoZSByZXR1cm5lZCBmdW5jdGlvbiBldmFsdWF0ZXMgdGhlXG4gKiBgY2F0Y2hlcmAgZnVuY3Rpb24gYW5kIHJldHVybnMgaXRzIHJlc3VsdC4gTm90ZSB0aGF0IGZvciBlZmZlY3RpdmVcbiAqIGNvbXBvc2l0aW9uIHdpdGggdGhpcyBmdW5jdGlvbiwgYm90aCB0aGUgYHRyeWVyYCBhbmQgYGNhdGNoZXJgIGZ1bmN0aW9uc1xuICogbXVzdCByZXR1cm4gdGhlIHNhbWUgdHlwZSBvZiByZXN1bHRzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIwLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoLi4ueCAtPiBhKSAtPiAoKGUsIC4uLngpIC0+IGEpIC0+ICguLi54IC0+IGEpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cnllciBUaGUgZnVuY3Rpb24gdGhhdCBtYXkgdGhyb3cuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYXRjaGVyIFRoZSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgZXZhbHVhdGVkIGlmIGB0cnllcmAgdGhyb3dzLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgd2lsbCBjYXRjaCBleGNlcHRpb25zIGFuZCBzZW5kIHRoZW4gdG8gdGhlIGNhdGNoZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50cnlDYXRjaChSLnByb3AoJ3gnKSwgUi5GKSh7eDogdHJ1ZX0pOyAvLz0+IHRydWVcbiAqICAgICAgUi50cnlDYXRjaChSLnByb3AoJ3gnKSwgUi5GKShudWxsKTsgICAgICAvLz0+IGZhbHNlXG4gKi9cblxuXG52YXIgdHJ5Q2F0Y2ggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfdHJ5Q2F0Y2godHJ5ZXIsIGNhdGNoZXIpIHtcbiAgcmV0dXJuIF9hcml0eSh0cnllci5sZW5ndGgsIGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRyeWVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGNhdGNoZXIuYXBwbHkodGhpcywgX2NvbmNhdChbZV0sIGFyZ3VtZW50cykpO1xuICAgIH1cbiAgfSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdHJ5Q2F0Y2g7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbi8qKlxuICogR2l2ZXMgYSBzaW5nbGUtd29yZCBzdHJpbmcgZGVzY3JpcHRpb24gb2YgdGhlIChuYXRpdmUpIHR5cGUgb2YgYSB2YWx1ZSxcbiAqIHJldHVybmluZyBzdWNoIGFuc3dlcnMgYXMgJ09iamVjdCcsICdOdW1iZXInLCAnQXJyYXknLCBvciAnTnVsbCcuIERvZXMgbm90XG4gKiBhdHRlbXB0IHRvIGRpc3Rpbmd1aXNoIHVzZXIgT2JqZWN0IHR5cGVzIGFueSBmdXJ0aGVyLCByZXBvcnRpbmcgdGhlbSBhbGwgYXNcbiAqICdPYmplY3QnLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjguMFxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBzaWcgKCogLT4geyp9KSAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50eXBlKHt9KTsgLy89PiBcIk9iamVjdFwiXG4gKiAgICAgIFIudHlwZSgxKTsgLy89PiBcIk51bWJlclwiXG4gKiAgICAgIFIudHlwZShmYWxzZSk7IC8vPT4gXCJCb29sZWFuXCJcbiAqICAgICAgUi50eXBlKCdzJyk7IC8vPT4gXCJTdHJpbmdcIlxuICogICAgICBSLnR5cGUobnVsbCk7IC8vPT4gXCJOdWxsXCJcbiAqICAgICAgUi50eXBlKFtdKTsgLy89PiBcIkFycmF5XCJcbiAqICAgICAgUi50eXBlKC9bQS16XS8pOyAvLz0+IFwiUmVnRXhwXCJcbiAqICAgICAgUi50eXBlKCgpID0+IHt9KTsgLy89PiBcIkZ1bmN0aW9uXCJcbiAqICAgICAgUi50eXBlKHVuZGVmaW5lZCk7IC8vPT4gXCJVbmRlZmluZWRcIlxuICovXG5cblxudmFyIHR5cGUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiB0eXBlKHZhbCkge1xuICByZXR1cm4gdmFsID09PSBudWxsID8gJ051bGwnIDogdmFsID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpLnNsaWNlKDgsIC0xKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG4vKipcbiAqIFRha2VzIGEgZnVuY3Rpb24gYGZuYCwgd2hpY2ggdGFrZXMgYSBzaW5nbGUgYXJyYXkgYXJndW1lbnQsIGFuZCByZXR1cm5zIGFcbiAqIGZ1bmN0aW9uIHdoaWNoOlxuICpcbiAqICAgLSB0YWtlcyBhbnkgbnVtYmVyIG9mIHBvc2l0aW9uYWwgYXJndW1lbnRzO1xuICogICAtIHBhc3NlcyB0aGVzZSBhcmd1bWVudHMgdG8gYGZuYCBhcyBhbiBhcnJheTsgYW5kXG4gKiAgIC0gcmV0dXJucyB0aGUgcmVzdWx0LlxuICpcbiAqIEluIG90aGVyIHdvcmRzLCBgUi51bmFwcGx5YCBkZXJpdmVzIGEgdmFyaWFkaWMgZnVuY3Rpb24gZnJvbSBhIGZ1bmN0aW9uIHdoaWNoXG4gKiB0YWtlcyBhbiBhcnJheS4gYFIudW5hcHBseWAgaXMgdGhlIGludmVyc2Ugb2YgW2BSLmFwcGx5YF0oI2FwcGx5KS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoWyouLi5dIC0+IGEpIC0+ICgqLi4uIC0+IGEpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAc2VlIFIuYXBwbHlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnVuYXBwbHkoSlNPTi5zdHJpbmdpZnkpKDEsIDIsIDMpOyAvLz0+ICdbMSwyLDNdJ1xuICogQHN5bWIgUi51bmFwcGx5KGYpKGEsIGIpID0gZihbYSwgYl0pXG4gKi9cblxuXG52YXIgdW5hcHBseSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIHVuYXBwbHkoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZm4oQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gIH07XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdW5hcHBseTsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIG5BcnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9uQXJ5Jyk7XG5cbi8qKlxuICogV3JhcHMgYSBmdW5jdGlvbiBvZiBhbnkgYXJpdHkgKGluY2x1ZGluZyBudWxsYXJ5KSBpbiBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0c1xuICogZXhhY3RseSAxIHBhcmFtZXRlci4gQW55IGV4dHJhbmVvdXMgcGFyYW1ldGVycyB3aWxsIG5vdCBiZSBwYXNzZWQgdG8gdGhlXG4gKiBzdXBwbGllZCBmdW5jdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKiAtPiBiKSAtPiAoYSAtPiBiKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gd3JhcHBpbmcgYGZuYC4gVGhlIG5ldyBmdW5jdGlvbiBpcyBndWFyYW50ZWVkIHRvIGJlIG9mXG4gKiAgICAgICAgIGFyaXR5IDEuXG4gKiBAc2VlIFIuYmluYXJ5LCBSLm5BcnlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgdGFrZXNUd29BcmdzID0gZnVuY3Rpb24oYSwgYikge1xuICogICAgICAgIHJldHVybiBbYSwgYl07XG4gKiAgICAgIH07XG4gKiAgICAgIHRha2VzVHdvQXJncy5sZW5ndGg7IC8vPT4gMlxuICogICAgICB0YWtlc1R3b0FyZ3MoMSwgMik7IC8vPT4gWzEsIDJdXG4gKlxuICogICAgICB2YXIgdGFrZXNPbmVBcmcgPSBSLnVuYXJ5KHRha2VzVHdvQXJncyk7XG4gKiAgICAgIHRha2VzT25lQXJnLmxlbmd0aDsgLy89PiAxXG4gKiAgICAgIC8vIE9ubHkgMSBhcmd1bWVudCBpcyBwYXNzZWQgdG8gdGhlIHdyYXBwZWQgZnVuY3Rpb25cbiAqICAgICAgdGFrZXNPbmVBcmcoMSwgMik7IC8vPT4gWzEsIHVuZGVmaW5lZF1cbiAqIEBzeW1iIFIudW5hcnkoZikoYSwgYiwgYykgPSBmKGEpXG4gKi9cblxuXG52YXIgdW5hcnkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiB1bmFyeShmbikge1xuICByZXR1cm4gbkFyeSgxLCBmbik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdW5hcnk7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBjdXJyeU4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jdXJyeU4nKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gb2YgYXJpdHkgYG5gIGZyb20gYSAobWFudWFsbHkpIGN1cnJpZWQgZnVuY3Rpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIE51bWJlciAtPiAoYSAtPiBiKSAtPiAoYSAtPiBjKVxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgZm9yIHRoZSByZXR1cm5lZCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byB1bmN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uLlxuICogQHNlZSBSLmN1cnJ5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGFkZEZvdXIgPSBhID0+IGIgPT4gYyA9PiBkID0+IGEgKyBiICsgYyArIGQ7XG4gKlxuICogICAgICB2YXIgdW5jdXJyaWVkQWRkRm91ciA9IFIudW5jdXJyeU4oNCwgYWRkRm91cik7XG4gKiAgICAgIHVuY3VycmllZEFkZEZvdXIoMSwgMiwgMywgNCk7IC8vPT4gMTBcbiAqL1xuXG5cbnZhciB1bmN1cnJ5TiA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHVuY3VycnlOKGRlcHRoLCBmbikge1xuICByZXR1cm4gY3VycnlOKGRlcHRoLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGN1cnJlbnREZXB0aCA9IDE7XG4gICAgdmFyIHZhbHVlID0gZm47XG4gICAgdmFyIGlkeCA9IDA7XG4gICAgdmFyIGVuZElkeDtcbiAgICB3aGlsZSAoY3VycmVudERlcHRoIDw9IGRlcHRoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZW5kSWR4ID0gY3VycmVudERlcHRoID09PSBkZXB0aCA/IGFyZ3VtZW50cy5sZW5ndGggOiBpZHggKyB2YWx1ZS5sZW5ndGg7XG4gICAgICB2YWx1ZSA9IHZhbHVlLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgaWR4LCBlbmRJZHgpKTtcbiAgICAgIGN1cnJlbnREZXB0aCArPSAxO1xuICAgICAgaWR4ID0gZW5kSWR4O1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH0pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHVuY3VycnlOOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIEJ1aWxkcyBhIGxpc3QgZnJvbSBhIHNlZWQgdmFsdWUuIEFjY2VwdHMgYW4gaXRlcmF0b3IgZnVuY3Rpb24sIHdoaWNoIHJldHVybnNcbiAqIGVpdGhlciBmYWxzZSB0byBzdG9wIGl0ZXJhdGlvbiBvciBhbiBhcnJheSBvZiBsZW5ndGggMiBjb250YWluaW5nIHRoZSB2YWx1ZVxuICogdG8gYWRkIHRvIHRoZSByZXN1bHRpbmcgbGlzdCBhbmQgdGhlIHNlZWQgdG8gYmUgdXNlZCBpbiB0aGUgbmV4dCBjYWxsIHRvIHRoZVxuICogaXRlcmF0b3IgZnVuY3Rpb24uXG4gKlxuICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIG9uZSBhcmd1bWVudDogKihzZWVkKSouXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTAuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gW2JdKSAtPiAqIC0+IFtiXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiByZWNlaXZlcyBvbmUgYXJndW1lbnQsIGBzZWVkYCwgYW5kIHJldHVybnNcbiAqICAgICAgICBlaXRoZXIgZmFsc2UgdG8gcXVpdCBpdGVyYXRpb24gb3IgYW4gYXJyYXkgb2YgbGVuZ3RoIHR3byB0byBwcm9jZWVkLiBUaGUgZWxlbWVudFxuICogICAgICAgIGF0IGluZGV4IDAgb2YgdGhpcyBhcnJheSB3aWxsIGJlIGFkZGVkIHRvIHRoZSByZXN1bHRpbmcgYXJyYXksIGFuZCB0aGUgZWxlbWVudFxuICogICAgICAgIGF0IGluZGV4IDEgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIG5leHQgY2FsbCB0byBgZm5gLlxuICogQHBhcmFtIHsqfSBzZWVkIFRoZSBzZWVkIHZhbHVlLlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBmaW5hbCBsaXN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBmID0gbiA9PiBuID4gNTAgPyBmYWxzZSA6IFstbiwgbiArIDEwXTtcbiAqICAgICAgUi51bmZvbGQoZiwgMTApOyAvLz0+IFstMTAsIC0yMCwgLTMwLCAtNDAsIC01MF1cbiAqIEBzeW1iIFIudW5mb2xkKGYsIHgpID0gW2YoeClbMF0sIGYoZih4KVsxXSlbMF0sIGYoZihmKHgpWzFdKVsxXSlbMF0sIC4uLl1cbiAqL1xuXG5cbnZhciB1bmZvbGQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiB1bmZvbGQoZm4sIHNlZWQpIHtcbiAgdmFyIHBhaXIgPSBmbihzZWVkKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB3aGlsZSAocGFpciAmJiBwYWlyLmxlbmd0aCkge1xuICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHBhaXJbMF07XG4gICAgcGFpciA9IGZuKHBhaXJbMV0pO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdW5mb2xkOyIsInZhciBfY29uY2F0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbmNhdCcpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIGNvbXBvc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb21wb3NlJyk7XG5cbnZhciB1bmlxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdW5pcScpO1xuXG4vKipcbiAqIENvbWJpbmVzIHR3byBsaXN0cyBpbnRvIGEgc2V0IChpLmUuIG5vIGR1cGxpY2F0ZXMpIGNvbXBvc2VkIG9mIHRoZSBlbGVtZW50c1xuICogb2YgZWFjaCBsaXN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIFsqXSAtPiBbKl0gLT4gWypdXG4gKiBAcGFyYW0ge0FycmF5fSBhcyBUaGUgZmlyc3QgbGlzdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGJzIFRoZSBzZWNvbmQgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgZmlyc3QgYW5kIHNlY29uZCBsaXN0cyBjb25jYXRlbmF0ZWQsIHdpdGhcbiAqICAgICAgICAgZHVwbGljYXRlcyByZW1vdmVkLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudW5pb24oWzEsIDIsIDNdLCBbMiwgMywgNF0pOyAvLz0+IFsxLCAyLCAzLCA0XVxuICovXG5cblxudmFyIHVuaW9uID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9jb21wb3NlKHVuaXEsIF9jb25jYXQpKTtcbm1vZHVsZS5leHBvcnRzID0gdW5pb247IiwidmFyIF9jb25jYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29uY2F0Jyk7XG5cbnZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgdW5pcVdpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi91bmlxV2l0aCcpO1xuXG4vKipcbiAqIENvbWJpbmVzIHR3byBsaXN0cyBpbnRvIGEgc2V0IChpLmUuIG5vIGR1cGxpY2F0ZXMpIGNvbXBvc2VkIG9mIHRoZSBlbGVtZW50c1xuICogb2YgZWFjaCBsaXN0LiBEdXBsaWNhdGlvbiBpcyBkZXRlcm1pbmVkIGFjY29yZGluZyB0byB0aGUgdmFsdWUgcmV0dXJuZWQgYnlcbiAqIGFwcGx5aW5nIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgdG8gdHdvIGxpc3QgZWxlbWVudHMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgKChhLCBhKSAtPiBCb29sZWFuKSAtPiBbKl0gLT4gWypdIC0+IFsqXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSB1c2VkIHRvIHRlc3Qgd2hldGhlciB0d28gaXRlbXMgYXJlIGVxdWFsLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGxpc3QuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MiBUaGUgc2Vjb25kIGxpc3QuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGZpcnN0IGFuZCBzZWNvbmQgbGlzdHMgY29uY2F0ZW5hdGVkLCB3aXRoXG4gKiAgICAgICAgIGR1cGxpY2F0ZXMgcmVtb3ZlZC5cbiAqIEBzZWUgUi51bmlvblxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBsMSA9IFt7YTogMX0sIHthOiAyfV07XG4gKiAgICAgIHZhciBsMiA9IFt7YTogMX0sIHthOiA0fV07XG4gKiAgICAgIFIudW5pb25XaXRoKFIuZXFCeShSLnByb3AoJ2EnKSksIGwxLCBsMik7IC8vPT4gW3thOiAxfSwge2E6IDJ9LCB7YTogNH1dXG4gKi9cblxuXG52YXIgdW5pb25XaXRoID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gdW5pb25XaXRoKHByZWQsIGxpc3QxLCBsaXN0Mikge1xuICByZXR1cm4gdW5pcVdpdGgocHJlZCwgX2NvbmNhdChsaXN0MSwgbGlzdDIpKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB1bmlvbldpdGg7IiwidmFyIGlkZW50aXR5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaWRlbnRpdHknKTtcblxudmFyIHVuaXFCeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VuaXFCeScpO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCBjb250YWluaW5nIG9ubHkgb25lIGNvcHkgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBvcmlnaW5hbFxuICogbGlzdC4gW2BSLmVxdWFsc2BdKCNlcXVhbHMpIGlzIHVzZWQgdG8gZGV0ZXJtaW5lIGVxdWFsaXR5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXVxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3Qgb2YgdW5pcXVlIGl0ZW1zLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudW5pcShbMSwgMSwgMiwgMV0pOyAvLz0+IFsxLCAyXVxuICogICAgICBSLnVuaXEoWzEsICcxJ10pOyAgICAgLy89PiBbMSwgJzEnXVxuICogICAgICBSLnVuaXEoW1s0Ml0sIFs0Ml1dKTsgLy89PiBbWzQyXV1cbiAqL1xuXG5cbnZhciB1bmlxID0gLyojX19QVVJFX18qL3VuaXFCeShpZGVudGl0eSk7XG5tb2R1bGUuZXhwb3J0cyA9IHVuaXE7IiwidmFyIF9TZXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fU2V0Jyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCBjb250YWluaW5nIG9ubHkgb25lIGNvcHkgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBvcmlnaW5hbFxuICogbGlzdCwgYmFzZWQgdXBvbiB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgYXBwbHlpbmcgdGhlIHN1cHBsaWVkIGZ1bmN0aW9uIHRvXG4gKiBlYWNoIGxpc3QgZWxlbWVudC4gUHJlZmVycyB0aGUgZmlyc3QgaXRlbSBpZiB0aGUgc3VwcGxpZWQgZnVuY3Rpb24gcHJvZHVjZXNcbiAqIHRoZSBzYW1lIHZhbHVlIG9uIHR3byBpdGVtcy4gW2BSLmVxdWFsc2BdKCNlcXVhbHMpIGlzIHVzZWQgZm9yIGNvbXBhcmlzb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTYuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gYikgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gQSBmdW5jdGlvbiB1c2VkIHRvIHByb2R1Y2UgYSB2YWx1ZSB0byB1c2UgZHVyaW5nIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3Qgb2YgdW5pcXVlIGl0ZW1zLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudW5pcUJ5KE1hdGguYWJzLCBbLTEsIC01LCAyLCAxMCwgMSwgMl0pOyAvLz0+IFstMSwgLTUsIDIsIDEwXVxuICovXG5cblxudmFyIHVuaXFCeSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHVuaXFCeShmbiwgbGlzdCkge1xuICB2YXIgc2V0ID0gbmV3IF9TZXQoKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGFwcGxpZWRJdGVtLCBpdGVtO1xuXG4gIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgIGl0ZW0gPSBsaXN0W2lkeF07XG4gICAgYXBwbGllZEl0ZW0gPSBmbihpdGVtKTtcbiAgICBpZiAoc2V0LmFkZChhcHBsaWVkSXRlbSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHVuaXFCeTsiLCJ2YXIgX2NvbnRhaW5zV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb250YWluc1dpdGgnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGNvbnRhaW5pbmcgb25seSBvbmUgY29weSBvZiBlYWNoIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsXG4gKiBsaXN0LCBiYXNlZCB1cG9uIHRoZSB2YWx1ZSByZXR1cm5lZCBieSBhcHBseWluZyB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIHRvXG4gKiB0d28gbGlzdCBlbGVtZW50cy4gUHJlZmVycyB0aGUgZmlyc3QgaXRlbSBpZiB0d28gaXRlbXMgY29tcGFyZSBlcXVhbCBiYXNlZFxuICogb24gdGhlIHByZWRpY2F0ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoYSwgYSkgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSB1c2VkIHRvIHRlc3Qgd2hldGhlciB0d28gaXRlbXMgYXJlIGVxdWFsLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3Qgb2YgdW5pcXVlIGl0ZW1zLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBzdHJFcSA9IFIuZXFCeShTdHJpbmcpO1xuICogICAgICBSLnVuaXFXaXRoKHN0ckVxKShbMSwgJzEnLCAyLCAxXSk7IC8vPT4gWzEsIDJdXG4gKiAgICAgIFIudW5pcVdpdGgoc3RyRXEpKFt7fSwge31dKTsgICAgICAgLy89PiBbe31dXG4gKiAgICAgIFIudW5pcVdpdGgoc3RyRXEpKFsxLCAnMScsIDFdKTsgICAgLy89PiBbMV1cbiAqICAgICAgUi51bmlxV2l0aChzdHJFcSkoWycxJywgMSwgMV0pOyAgICAvLz0+IFsnMSddXG4gKi9cblxuXG52YXIgdW5pcVdpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiB1bmlxV2l0aChwcmVkLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGl0ZW07XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBpdGVtID0gbGlzdFtpZHhdO1xuICAgIGlmICghX2NvbnRhaW5zV2l0aChwcmVkLCBpdGVtLCByZXN1bHQpKSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBpdGVtO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHVuaXFXaXRoOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG4vKipcbiAqIFRlc3RzIHRoZSBmaW5hbCBhcmd1bWVudCBieSBwYXNzaW5nIGl0IHRvIHRoZSBnaXZlbiBwcmVkaWNhdGUgZnVuY3Rpb24uIElmXG4gKiB0aGUgcHJlZGljYXRlIGlzIG5vdCBzYXRpc2ZpZWQsIHRoZSBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgcmVzdWx0IG9mXG4gKiBjYWxsaW5nIHRoZSBgd2hlbkZhbHNlRm5gIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgYXJndW1lbnQuIElmIHRoZSBwcmVkaWNhdGVcbiAqIGlzIHNhdGlzZmllZCwgdGhlIGFyZ3VtZW50IGlzIHJldHVybmVkIGFzIGlzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE4LjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiAoYSAtPiBhKSAtPiBhIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgICAgICAgIEEgcHJlZGljYXRlIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB3aGVuRmFsc2VGbiBBIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBgcHJlZGAgZXZhbHVhdGVzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBhIGZhbHN5IHZhbHVlLlxuICogQHBhcmFtIHsqfSAgICAgICAgeCAgICAgICAgICAgQW4gb2JqZWN0IHRvIHRlc3Qgd2l0aCB0aGUgYHByZWRgIGZ1bmN0aW9uIGFuZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzcyB0byBgd2hlbkZhbHNlRm5gIGlmIG5lY2Vzc2FyeS5cbiAqIEByZXR1cm4geyp9IEVpdGhlciBgeGAgb3IgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBgeGAgdG8gYHdoZW5GYWxzZUZuYC5cbiAqIEBzZWUgUi5pZkVsc2UsIFIud2hlblxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGxldCBzYWZlSW5jID0gUi51bmxlc3MoUi5pc05pbCwgUi5pbmMpO1xuICogICAgICBzYWZlSW5jKG51bGwpOyAvLz0+IG51bGxcbiAqICAgICAgc2FmZUluYygxKTsgLy89PiAyXG4gKi9cblxuXG52YXIgdW5sZXNzID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gdW5sZXNzKHByZWQsIHdoZW5GYWxzZUZuLCB4KSB7XG4gIHJldHVybiBwcmVkKHgpID8geCA6IHdoZW5GYWxzZUZuKHgpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHVubGVzczsiLCJ2YXIgX2lkZW50aXR5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lkZW50aXR5Jyk7XG5cbnZhciBjaGFpbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NoYWluJyk7XG5cbi8qKlxuICogU2hvcnRoYW5kIGZvciBgUi5jaGFpbihSLmlkZW50aXR5KWAsIHdoaWNoIHJlbW92ZXMgb25lIGxldmVsIG9mIG5lc3RpbmcgZnJvbVxuICogYW55IFtDaGFpbl0oaHR0cHM6Ly9naXRodWIuY29tL2ZhbnRhc3lsYW5kL2ZhbnRhc3ktbGFuZCNjaGFpbikuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMy4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBDaGFpbiBjID0+IGMgKGMgYSkgLT4gYyBhXG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIuZmxhdHRlbiwgUi5jaGFpblxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudW5uZXN0KFsxLCBbMl0sIFtbM11dXSk7IC8vPT4gWzEsIDIsIFszXV1cbiAqICAgICAgUi51bm5lc3QoW1sxLCAyXSwgWzMsIDRdLCBbNSwgNl1dKTsgLy89PiBbMSwgMiwgMywgNCwgNSwgNl1cbiAqL1xuXG5cbnZhciB1bm5lc3QgPSAvKiNfX1BVUkVfXyovY2hhaW4oX2lkZW50aXR5KTtcbm1vZHVsZS5leHBvcnRzID0gdW5uZXN0OyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG4vKipcbiAqIFRha2VzIGEgcHJlZGljYXRlLCBhIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uLCBhbmQgYW4gaW5pdGlhbCB2YWx1ZSxcbiAqIGFuZCByZXR1cm5zIGEgdmFsdWUgb2YgdGhlIHNhbWUgdHlwZSBhcyB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEl0IGRvZXMgc28gYnkgYXBwbHlpbmcgdGhlIHRyYW5zZm9ybWF0aW9uIHVudGlsIHRoZSBwcmVkaWNhdGUgaXMgc2F0aXNmaWVkLFxuICogYXQgd2hpY2ggcG9pbnQgaXQgcmV0dXJucyB0aGUgc2F0aXNmYWN0b3J5IHZhbHVlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIwLjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiAoYSAtPiBhKSAtPiBhIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgZnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBpdGVyYXRvciBmdW5jdGlvblxuICogQHBhcmFtIHsqfSBpbml0IEluaXRpYWwgdmFsdWVcbiAqIEByZXR1cm4geyp9IEZpbmFsIHZhbHVlIHRoYXQgc2F0aXNmaWVzIHByZWRpY2F0ZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudW50aWwoUi5ndChSLl9fLCAxMDApLCBSLm11bHRpcGx5KDIpKSgxKSAvLyA9PiAxMjhcbiAqL1xuXG5cbnZhciB1bnRpbCA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIHVudGlsKHByZWQsIGZuLCBpbml0KSB7XG4gIHZhciB2YWwgPSBpbml0O1xuICB3aGlsZSAoIXByZWQodmFsKSkge1xuICAgIHZhbCA9IGZuKHZhbCk7XG4gIH1cbiAgcmV0dXJuIHZhbDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB1bnRpbDsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxudmFyIGFkanVzdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2FkanVzdCcpO1xuXG52YXIgYWx3YXlzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYWx3YXlzJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBjb3B5IG9mIHRoZSBhcnJheSB3aXRoIHRoZSBlbGVtZW50IGF0IHRoZSBwcm92aWRlZCBpbmRleFxuICogcmVwbGFjZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IGEgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtOdW1iZXJ9IGlkeCBUaGUgaW5kZXggdG8gdXBkYXRlLlxuICogQHBhcmFtIHsqfSB4IFRoZSB2YWx1ZSB0byBleGlzdCBhdCB0aGUgZ2l2ZW4gaW5kZXggb2YgdGhlIHJldHVybmVkIGFycmF5LlxuICogQHBhcmFtIHtBcnJheXxBcmd1bWVudHN9IGxpc3QgVGhlIHNvdXJjZSBhcnJheS1saWtlIG9iamVjdCB0byBiZSB1cGRhdGVkLlxuICogQHJldHVybiB7QXJyYXl9IEEgY29weSBvZiBgbGlzdGAgd2l0aCB0aGUgdmFsdWUgYXQgaW5kZXggYGlkeGAgcmVwbGFjZWQgd2l0aCBgeGAuXG4gKiBAc2VlIFIuYWRqdXN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi51cGRhdGUoMSwgMTEsIFswLCAxLCAyXSk7ICAgICAvLz0+IFswLCAxMSwgMl1cbiAqICAgICAgUi51cGRhdGUoMSkoMTEpKFswLCAxLCAyXSk7ICAgICAvLz0+IFswLCAxMSwgMl1cbiAqIEBzeW1iIFIudXBkYXRlKC0xLCBhLCBbYiwgY10pID0gW2IsIGFdXG4gKiBAc3ltYiBSLnVwZGF0ZSgwLCBhLCBbYiwgY10pID0gW2EsIGNdXG4gKiBAc3ltYiBSLnVwZGF0ZSgxLCBhLCBbYiwgY10pID0gW2IsIGFdXG4gKi9cblxuXG52YXIgdXBkYXRlID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gdXBkYXRlKGlkeCwgeCwgbGlzdCkge1xuICByZXR1cm4gYWRqdXN0KGFsd2F5cyh4KSwgaWR4LCBsaXN0KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB1cGRhdGU7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBjdXJyeU4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jdXJyeU4nKTtcblxuLyoqXG4gKiBBY2NlcHRzIGEgZnVuY3Rpb24gYGZuYCBhbmQgYSBsaXN0IG9mIHRyYW5zZm9ybWVyIGZ1bmN0aW9ucyBhbmQgcmV0dXJucyBhXG4gKiBuZXcgY3VycmllZCBmdW5jdGlvbi4gV2hlbiB0aGUgbmV3IGZ1bmN0aW9uIGlzIGludm9rZWQsIGl0IGNhbGxzIHRoZVxuICogZnVuY3Rpb24gYGZuYCB3aXRoIHBhcmFtZXRlcnMgY29uc2lzdGluZyBvZiB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgZWFjaFxuICogc3VwcGxpZWQgaGFuZGxlciBvbiBzdWNjZXNzaXZlIGFyZ3VtZW50cyB0byB0aGUgbmV3IGZ1bmN0aW9uLlxuICpcbiAqIElmIG1vcmUgYXJndW1lbnRzIGFyZSBwYXNzZWQgdG8gdGhlIHJldHVybmVkIGZ1bmN0aW9uIHRoYW4gdHJhbnNmb3JtZXJcbiAqIGZ1bmN0aW9ucywgdGhvc2UgYXJndW1lbnRzIGFyZSBwYXNzZWQgZGlyZWN0bHkgdG8gYGZuYCBhcyBhZGRpdGlvbmFsXG4gKiBwYXJhbWV0ZXJzLiBJZiB5b3UgZXhwZWN0IGFkZGl0aW9uYWwgYXJndW1lbnRzIHRoYXQgZG9uJ3QgbmVlZCB0byBiZVxuICogdHJhbnNmb3JtZWQsIGFsdGhvdWdoIHlvdSBjYW4gaWdub3JlIHRoZW0sIGl0J3MgYmVzdCB0byBwYXNzIGFuIGlkZW50aXR5XG4gKiBmdW5jdGlvbiBzbyB0aGF0IHRoZSBuZXcgZnVuY3Rpb24gcmVwb3J0cyB0aGUgY29ycmVjdCBhcml0eS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKHgxLCB4MiwgLi4uKSAtPiB6KSAtPiBbKGEgLT4geDEpLCAoYiAtPiB4MiksIC4uLl0gLT4gKGEgLT4gYiAtPiAuLi4gLT4geilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtBcnJheX0gdHJhbnNmb3JtZXJzIEEgbGlzdCBvZiB0cmFuc2Zvcm1lciBmdW5jdGlvbnNcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgd3JhcHBlZCBmdW5jdGlvbi5cbiAqIEBzZWUgUi5jb252ZXJnZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudXNlV2l0aChNYXRoLnBvdywgW1IuaWRlbnRpdHksIFIuaWRlbnRpdHldKSgzLCA0KTsgLy89PiA4MVxuICogICAgICBSLnVzZVdpdGgoTWF0aC5wb3csIFtSLmlkZW50aXR5LCBSLmlkZW50aXR5XSkoMykoNCk7IC8vPT4gODFcbiAqICAgICAgUi51c2VXaXRoKE1hdGgucG93LCBbUi5kZWMsIFIuaW5jXSkoMywgNCk7IC8vPT4gMzJcbiAqICAgICAgUi51c2VXaXRoKE1hdGgucG93LCBbUi5kZWMsIFIuaW5jXSkoMykoNCk7IC8vPT4gMzJcbiAqIEBzeW1iIFIudXNlV2l0aChmLCBbZywgaF0pKGEsIGIpID0gZihnKGEpLCBoKGIpKVxuICovXG5cblxudmFyIHVzZVdpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiB1c2VXaXRoKGZuLCB0cmFuc2Zvcm1lcnMpIHtcbiAgcmV0dXJuIGN1cnJ5Tih0cmFuc2Zvcm1lcnMubGVuZ3RoLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB3aGlsZSAoaWR4IDwgdHJhbnNmb3JtZXJzLmxlbmd0aCkge1xuICAgICAgYXJncy5wdXNoKHRyYW5zZm9ybWVyc1tpZHhdLmNhbGwodGhpcywgYXJndW1lbnRzW2lkeF0pKTtcbiAgICAgIGlkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncy5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCB0cmFuc2Zvcm1lcnMubGVuZ3RoKSkpO1xuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB1c2VXaXRoOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIga2V5cyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgdGhlIGVudW1lcmFibGUgb3duIHByb3BlcnRpZXMgb2YgdGhlIHN1cHBsaWVkIG9iamVjdC5cbiAqIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgdGhlIG91dHB1dCBhcnJheSBpcyBub3QgZ3VhcmFudGVlZCBhY3Jvc3MgZGlmZmVyZW50XG4gKiBKUyBwbGF0Zm9ybXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtrOiB2fSAtPiBbdl1cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBleHRyYWN0IHZhbHVlcyBmcm9tXG4gKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2YgdGhlIHZhbHVlcyBvZiB0aGUgb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMuXG4gKiBAc2VlIFIudmFsdWVzSW4sIFIua2V5c1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudmFsdWVzKHthOiAxLCBiOiAyLCBjOiAzfSk7IC8vPT4gWzEsIDIsIDNdXG4gKi9cblxuXG52YXIgdmFsdWVzID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gdmFsdWVzKG9iaikge1xuICB2YXIgcHJvcHMgPSBrZXlzKG9iaik7XG4gIHZhciBsZW4gPSBwcm9wcy5sZW5ndGg7XG4gIHZhciB2YWxzID0gW107XG4gIHZhciBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgdmFsc1tpZHhdID0gb2JqW3Byb3BzW2lkeF1dO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiB2YWxzO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHZhbHVlczsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgdGhlIHByb3BlcnRpZXMsIGluY2x1ZGluZyBwcm90b3R5cGUgcHJvcGVydGllcywgb2YgdGhlXG4gKiBzdXBwbGllZCBvYmplY3QuXG4gKiBOb3RlIHRoYXQgdGhlIG9yZGVyIG9mIHRoZSBvdXRwdXQgYXJyYXkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgY29uc2lzdGVudFxuICogYWNyb3NzIGRpZmZlcmVudCBKUyBwbGF0Zm9ybXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMi4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtrOiB2fSAtPiBbdl1cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBleHRyYWN0IHZhbHVlcyBmcm9tXG4gKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2YgdGhlIHZhbHVlcyBvZiB0aGUgb2JqZWN0J3Mgb3duIGFuZCBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqIEBzZWUgUi52YWx1ZXMsIFIua2V5c0luXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIEYgPSBmdW5jdGlvbigpIHsgdGhpcy54ID0gJ1gnOyB9O1xuICogICAgICBGLnByb3RvdHlwZS55ID0gJ1knO1xuICogICAgICB2YXIgZiA9IG5ldyBGKCk7XG4gKiAgICAgIFIudmFsdWVzSW4oZik7IC8vPT4gWydYJywgJ1knXVxuICovXG5cblxudmFyIHZhbHVlc0luID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gdmFsdWVzSW4ob2JqKSB7XG4gIHZhciBwcm9wO1xuICB2YXIgdnMgPSBbXTtcbiAgZm9yIChwcm9wIGluIG9iaikge1xuICAgIHZzW3ZzLmxlbmd0aF0gPSBvYmpbcHJvcF07XG4gIH1cbiAgcmV0dXJuIHZzO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHZhbHVlc0luOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vLyBgQ29uc3RgIGlzIGEgZnVuY3RvciB0aGF0IGVmZmVjdGl2ZWx5IGlnbm9yZXMgdGhlIGZ1bmN0aW9uIGdpdmVuIHRvIGBtYXBgLlxuXG5cbnZhciBDb25zdCA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiB7IHZhbHVlOiB4LCAnZmFudGFzeS1sYW5kL21hcCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gfTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIFwidmlld1wiIG9mIHRoZSBnaXZlbiBkYXRhIHN0cnVjdHVyZSwgZGV0ZXJtaW5lZCBieSB0aGUgZ2l2ZW4gbGVucy5cbiAqIFRoZSBsZW5zJ3MgZm9jdXMgZGV0ZXJtaW5lcyB3aGljaCBwb3J0aW9uIG9mIHRoZSBkYXRhIHN0cnVjdHVyZSBpcyB2aXNpYmxlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE2LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBMZW5zIHMgYSA9IEZ1bmN0b3IgZiA9PiAoYSAtPiBmIGEpIC0+IHMgLT4gZiBzXG4gKiBAc2lnIExlbnMgcyBhIC0+IHMgLT4gYVxuICogQHBhcmFtIHtMZW5zfSBsZW5zXG4gKiBAcGFyYW0geyp9IHhcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIucHJvcCwgUi5sZW5zSW5kZXgsIFIubGVuc1Byb3BcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeExlbnMgPSBSLmxlbnNQcm9wKCd4Jyk7XG4gKlxuICogICAgICBSLnZpZXcoeExlbnMsIHt4OiAxLCB5OiAyfSk7ICAvLz0+IDFcbiAqICAgICAgUi52aWV3KHhMZW5zLCB7eDogNCwgeTogMn0pOyAgLy89PiA0XG4gKi9cbnZhciB2aWV3ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gdmlldyhsZW5zLCB4KSB7XG4gIC8vIFVzaW5nIGBDb25zdGAgZWZmZWN0aXZlbHkgaWdub3JlcyB0aGUgc2V0dGVyIGZ1bmN0aW9uIG9mIHRoZSBgbGVuc2AsXG4gIC8vIGxlYXZpbmcgdGhlIHZhbHVlIHJldHVybmVkIGJ5IHRoZSBnZXR0ZXIgZnVuY3Rpb24gdW5tb2RpZmllZC5cbiAgcmV0dXJuIGxlbnMoQ29uc3QpKHgpLnZhbHVlO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHZpZXc7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogVGVzdHMgdGhlIGZpbmFsIGFyZ3VtZW50IGJ5IHBhc3NpbmcgaXQgdG8gdGhlIGdpdmVuIHByZWRpY2F0ZSBmdW5jdGlvbi4gSWZcbiAqIHRoZSBwcmVkaWNhdGUgaXMgc2F0aXNmaWVkLCB0aGUgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBvZiBjYWxsaW5nXG4gKiB0aGUgYHdoZW5UcnVlRm5gIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgYXJndW1lbnQuIElmIHRoZSBwcmVkaWNhdGUgaXMgbm90XG4gKiBzYXRpc2ZpZWQsIHRoZSBhcmd1bWVudCBpcyByZXR1cm5lZCBhcyBpcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOC4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gKGEgLT4gYSkgLT4gYSAtPiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkICAgICAgIEEgcHJlZGljYXRlIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB3aGVuVHJ1ZUZuIEEgZnVuY3Rpb24gdG8gaW52b2tlIHdoZW4gdGhlIGBjb25kaXRpb25gXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWx1YXRlcyB0byBhIHRydXRoeSB2YWx1ZS5cbiAqIEBwYXJhbSB7Kn0gICAgICAgIHggICAgICAgICAgQW4gb2JqZWN0IHRvIHRlc3Qgd2l0aCB0aGUgYHByZWRgIGZ1bmN0aW9uIGFuZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzIHRvIGB3aGVuVHJ1ZUZuYCBpZiBuZWNlc3NhcnkuXG4gKiBAcmV0dXJuIHsqfSBFaXRoZXIgYHhgIG9yIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgYHhgIHRvIGB3aGVuVHJ1ZUZuYC5cbiAqIEBzZWUgUi5pZkVsc2UsIFIudW5sZXNzXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgLy8gdHJ1bmNhdGUgOjogU3RyaW5nIC0+IFN0cmluZ1xuICogICAgICB2YXIgdHJ1bmNhdGUgPSBSLndoZW4oXG4gKiAgICAgICAgUi5wcm9wU2F0aXNmaWVzKFIuZ3QoUi5fXywgMTApLCAnbGVuZ3RoJyksXG4gKiAgICAgICAgUi5waXBlKFIudGFrZSgxMCksIFIuYXBwZW5kKCfigKYnKSwgUi5qb2luKCcnKSlcbiAqICAgICAgKTtcbiAqICAgICAgdHJ1bmNhdGUoJzEyMzQ1Jyk7ICAgICAgICAgLy89PiAnMTIzNDUnXG4gKiAgICAgIHRydW5jYXRlKCcwMTIzNDU2Nzg5QUJDJyk7IC8vPT4gJzAxMjM0NTY3ODnigKYnXG4gKi9cblxuXG52YXIgd2hlbiA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIHdoZW4ocHJlZCwgd2hlblRydWVGbiwgeCkge1xuICByZXR1cm4gcHJlZCh4KSA/IHdoZW5UcnVlRm4oeCkgOiB4O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHdoZW47IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfaGFzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2hhcycpO1xuXG4vKipcbiAqIFRha2VzIGEgc3BlYyBvYmplY3QgYW5kIGEgdGVzdCBvYmplY3Q7IHJldHVybnMgdHJ1ZSBpZiB0aGUgdGVzdCBzYXRpc2ZpZXNcbiAqIHRoZSBzcGVjLiBFYWNoIG9mIHRoZSBzcGVjJ3Mgb3duIHByb3BlcnRpZXMgbXVzdCBiZSBhIHByZWRpY2F0ZSBmdW5jdGlvbi5cbiAqIEVhY2ggcHJlZGljYXRlIGlzIGFwcGxpZWQgdG8gdGhlIHZhbHVlIG9mIHRoZSBjb3JyZXNwb25kaW5nIHByb3BlcnR5IG9mIHRoZVxuICogdGVzdCBvYmplY3QuIGB3aGVyZWAgcmV0dXJucyB0cnVlIGlmIGFsbCB0aGUgcHJlZGljYXRlcyByZXR1cm4gdHJ1ZSwgZmFsc2VcbiAqIG90aGVyd2lzZS5cbiAqXG4gKiBgd2hlcmVgIGlzIHdlbGwgc3VpdGVkIHRvIGRlY2xhcmF0aXZlbHkgZXhwcmVzc2luZyBjb25zdHJhaW50cyBmb3Igb3RoZXJcbiAqIGZ1bmN0aW9ucyBzdWNoIGFzIFtgZmlsdGVyYF0oI2ZpbHRlcikgYW5kIFtgZmluZGBdKCNmaW5kKS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjFcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcge1N0cmluZzogKCogLT4gQm9vbGVhbil9IC0+IHtTdHJpbmc6ICp9IC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzcGVjXG4gKiBAcGFyYW0ge09iamVjdH0gdGVzdE9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBzZWUgUi5wcm9wU2F0aXNmaWVzLCBSLndoZXJlRXFcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICAvLyBwcmVkIDo6IE9iamVjdCAtPiBCb29sZWFuXG4gKiAgICAgIHZhciBwcmVkID0gUi53aGVyZSh7XG4gKiAgICAgICAgYTogUi5lcXVhbHMoJ2ZvbycpLFxuICogICAgICAgIGI6IFIuY29tcGxlbWVudChSLmVxdWFscygnYmFyJykpLFxuICogICAgICAgIHg6IFIuZ3QoUi5fXywgMTApLFxuICogICAgICAgIHk6IFIubHQoUi5fXywgMjApXG4gKiAgICAgIH0pO1xuICpcbiAqICAgICAgcHJlZCh7YTogJ2ZvbycsIGI6ICd4eHgnLCB4OiAxMSwgeTogMTl9KTsgLy89PiB0cnVlXG4gKiAgICAgIHByZWQoe2E6ICd4eHgnLCBiOiAneHh4JywgeDogMTEsIHk6IDE5fSk7IC8vPT4gZmFsc2VcbiAqICAgICAgcHJlZCh7YTogJ2ZvbycsIGI6ICdiYXInLCB4OiAxMSwgeTogMTl9KTsgLy89PiBmYWxzZVxuICogICAgICBwcmVkKHthOiAnZm9vJywgYjogJ3h4eCcsIHg6IDEwLCB5OiAxOX0pOyAvLz0+IGZhbHNlXG4gKiAgICAgIHByZWQoe2E6ICdmb28nLCBiOiAneHh4JywgeDogMTEsIHk6IDIwfSk7IC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciB3aGVyZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHdoZXJlKHNwZWMsIHRlc3RPYmopIHtcbiAgZm9yICh2YXIgcHJvcCBpbiBzcGVjKSB7XG4gICAgaWYgKF9oYXMocHJvcCwgc3BlYykgJiYgIXNwZWNbcHJvcF0odGVzdE9ialtwcm9wXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gd2hlcmU7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBlcXVhbHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9lcXVhbHMnKTtcblxudmFyIG1hcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21hcCcpO1xuXG52YXIgd2hlcmUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi93aGVyZScpO1xuXG4vKipcbiAqIFRha2VzIGEgc3BlYyBvYmplY3QgYW5kIGEgdGVzdCBvYmplY3Q7IHJldHVybnMgdHJ1ZSBpZiB0aGUgdGVzdCBzYXRpc2ZpZXNcbiAqIHRoZSBzcGVjLCBmYWxzZSBvdGhlcndpc2UuIEFuIG9iamVjdCBzYXRpc2ZpZXMgdGhlIHNwZWMgaWYsIGZvciBlYWNoIG9mIHRoZVxuICogc3BlYydzIG93biBwcm9wZXJ0aWVzLCBhY2Nlc3NpbmcgdGhhdCBwcm9wZXJ0eSBvZiB0aGUgb2JqZWN0IGdpdmVzIHRoZSBzYW1lXG4gKiB2YWx1ZSAoaW4gW2BSLmVxdWFsc2BdKCNlcXVhbHMpIHRlcm1zKSBhcyBhY2Nlc3NpbmcgdGhhdCBwcm9wZXJ0eSBvZiB0aGVcbiAqIHNwZWMuXG4gKlxuICogYHdoZXJlRXFgIGlzIGEgc3BlY2lhbGl6YXRpb24gb2YgW2B3aGVyZWBdKCN3aGVyZSkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7U3RyaW5nOiAqfSAtPiB7U3RyaW5nOiAqfSAtPiBCb29sZWFuXG4gKiBAcGFyYW0ge09iamVjdH0gc3BlY1xuICogQHBhcmFtIHtPYmplY3R9IHRlc3RPYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAc2VlIFIucHJvcEVxLCBSLndoZXJlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgLy8gcHJlZCA6OiBPYmplY3QgLT4gQm9vbGVhblxuICogICAgICB2YXIgcHJlZCA9IFIud2hlcmVFcSh7YTogMSwgYjogMn0pO1xuICpcbiAqICAgICAgcHJlZCh7YTogMX0pOyAgICAgICAgICAgICAgLy89PiBmYWxzZVxuICogICAgICBwcmVkKHthOiAxLCBiOiAyfSk7ICAgICAgICAvLz0+IHRydWVcbiAqICAgICAgcHJlZCh7YTogMSwgYjogMiwgYzogM30pOyAgLy89PiB0cnVlXG4gKiAgICAgIHByZWQoe2E6IDEsIGI6IDF9KTsgICAgICAgIC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciB3aGVyZUVxID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gd2hlcmVFcShzcGVjLCB0ZXN0T2JqKSB7XG4gIHJldHVybiB3aGVyZShtYXAoZXF1YWxzLCBzcGVjKSwgdGVzdE9iaik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gd2hlcmVFcTsiLCJ2YXIgX2NvbnRhaW5zID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbnRhaW5zJyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgZmxpcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ZsaXAnKTtcblxudmFyIHJlamVjdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlamVjdCcpO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCB3aXRob3V0IHZhbHVlcyBpbiB0aGUgZmlyc3QgYXJndW1lbnQuXG4gKiBbYFIuZXF1YWxzYF0oI2VxdWFscykgaXMgdXNlZCB0byBkZXRlcm1pbmUgZXF1YWxpdHkuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE5LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFthXSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MSBUaGUgdmFsdWVzIHRvIGJlIHJlbW92ZWQgZnJvbSBgbGlzdDJgLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDIgVGhlIGFycmF5IHRvIHJlbW92ZSB2YWx1ZXMgZnJvbS5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbmV3IGFycmF5IHdpdGhvdXQgdmFsdWVzIGluIGBsaXN0MWAuXG4gKiBAc2VlIFIudHJhbnNkdWNlLCBSLmRpZmZlcmVuY2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLndpdGhvdXQoWzEsIDJdLCBbMSwgMiwgMSwgMywgNF0pOyAvLz0+IFszLCA0XVxuICovXG5cblxudmFyIHdpdGhvdXQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiAoeHMsIGxpc3QpIHtcbiAgcmV0dXJuIHJlamVjdChmbGlwKF9jb250YWlucykoeHMpLCBsaXN0KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB3aXRob3V0OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbGlzdCBvdXQgb2YgdGhlIHR3byBzdXBwbGllZCBieSBjcmVhdGluZyBlYWNoIHBvc3NpYmxlIHBhaXJcbiAqIGZyb20gdGhlIGxpc3RzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFtiXSAtPiBbW2EsYl1dXG4gKiBAcGFyYW0ge0FycmF5fSBhcyBUaGUgZmlyc3QgbGlzdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGJzIFRoZSBzZWNvbmQgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBtYWRlIGJ5IGNvbWJpbmluZyBlYWNoIHBvc3NpYmxlIHBhaXIgZnJvbVxuICogICAgICAgICBgYXNgIGFuZCBgYnNgIGludG8gcGFpcnMgKGBbYSwgYl1gKS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnhwcm9kKFsxLCAyXSwgWydhJywgJ2InXSk7IC8vPT4gW1sxLCAnYSddLCBbMSwgJ2InXSwgWzIsICdhJ10sIFsyLCAnYiddXVxuICogQHN5bWIgUi54cHJvZChbYSwgYl0sIFtjLCBkXSkgPSBbW2EsIGNdLCBbYSwgZF0sIFtiLCBjXSwgW2IsIGRdXVxuICovXG5cblxudmFyIHhwcm9kID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24geHByb2QoYSwgYikge1xuICAvLyA9IHhwcm9kV2l0aChwcmVwZW5kKTsgKHRha2VzIGFib3V0IDMgdGltZXMgYXMgbG9uZy4uLilcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBpbGVuID0gYS5sZW5ndGg7XG4gIHZhciBqO1xuICB2YXIgamxlbiA9IGIubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHdoaWxlIChpZHggPCBpbGVuKSB7XG4gICAgaiA9IDA7XG4gICAgd2hpbGUgKGogPCBqbGVuKSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBbYVtpZHhdLCBiW2pdXTtcbiAgICAgIGogKz0gMTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB4cHJvZDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGxpc3Qgb3V0IG9mIHRoZSB0d28gc3VwcGxpZWQgYnkgcGFpcmluZyB1cCBlcXVhbGx5LXBvc2l0aW9uZWRcbiAqIGl0ZW1zIGZyb20gYm90aCBsaXN0cy4gVGhlIHJldHVybmVkIGxpc3QgaXMgdHJ1bmNhdGVkIHRvIHRoZSBsZW5ndGggb2YgdGhlXG4gKiBzaG9ydGVyIG9mIHRoZSB0d28gaW5wdXQgbGlzdHMuXG4gKiBOb3RlOiBgemlwYCBpcyBlcXVpdmFsZW50IHRvIGB6aXBXaXRoKGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIFthLCBiXSB9KWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gW2JdIC0+IFtbYSxiXV1cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QxIFRoZSBmaXJzdCBhcnJheSB0byBjb25zaWRlci5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QyIFRoZSBzZWNvbmQgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3QgbWFkZSBieSBwYWlyaW5nIHVwIHNhbWUtaW5kZXhlZCBlbGVtZW50cyBvZiBgbGlzdDFgIGFuZCBgbGlzdDJgLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuemlwKFsxLCAyLCAzXSwgWydhJywgJ2InLCAnYyddKTsgLy89PiBbWzEsICdhJ10sIFsyLCAnYiddLCBbMywgJ2MnXV1cbiAqIEBzeW1iIFIuemlwKFthLCBiLCBjXSwgW2QsIGUsIGZdKSA9IFtbYSwgZF0sIFtiLCBlXSwgW2MsIGZdXVxuICovXG5cblxudmFyIHppcCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHppcChhLCBiKSB7XG4gIHZhciBydiA9IFtdO1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IE1hdGgubWluKGEubGVuZ3RoLCBiLmxlbmd0aCk7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBydltpZHhdID0gW2FbaWR4XSwgYltpZHhdXTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcnY7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gemlwOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IG91dCBvZiBhIGxpc3Qgb2Yga2V5cyBhbmQgYSBsaXN0IG9mIHZhbHVlcy5cbiAqIEtleS92YWx1ZSBwYWlyaW5nIGlzIHRydW5jYXRlZCB0byB0aGUgbGVuZ3RoIG9mIHRoZSBzaG9ydGVyIG9mIHRoZSB0d28gbGlzdHMuXG4gKiBOb3RlOiBgemlwT2JqYCBpcyBlcXVpdmFsZW50IHRvIGBwaXBlKHppcCwgZnJvbVBhaXJzKWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMy4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbU3RyaW5nXSAtPiBbKl0gLT4ge1N0cmluZzogKn1cbiAqIEBwYXJhbSB7QXJyYXl9IGtleXMgVGhlIGFycmF5IHRoYXQgd2lsbCBiZSBwcm9wZXJ0aWVzIG9uIHRoZSBvdXRwdXQgb2JqZWN0LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSBsaXN0IG9mIHZhbHVlcyBvbiB0aGUgb3V0cHV0IG9iamVjdC5cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIG9iamVjdCBtYWRlIGJ5IHBhaXJpbmcgdXAgc2FtZS1pbmRleGVkIGVsZW1lbnRzIG9mIGBrZXlzYCBhbmQgYHZhbHVlc2AuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi56aXBPYmooWydhJywgJ2InLCAnYyddLCBbMSwgMiwgM10pOyAvLz0+IHthOiAxLCBiOiAyLCBjOiAzfVxuICovXG5cblxudmFyIHppcE9iaiA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHppcE9iaihrZXlzLCB2YWx1ZXMpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBNYXRoLm1pbihrZXlzLmxlbmd0aCwgdmFsdWVzLmxlbmd0aCk7XG4gIHZhciBvdXQgPSB7fTtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIG91dFtrZXlzW2lkeF1dID0gdmFsdWVzW2lkeF07XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB6aXBPYmo7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBsaXN0IG91dCBvZiB0aGUgdHdvIHN1cHBsaWVkIGJ5IGFwcGx5aW5nIHRoZSBmdW5jdGlvbiB0byBlYWNoXG4gKiBlcXVhbGx5LXBvc2l0aW9uZWQgcGFpciBpbiB0aGUgbGlzdHMuIFRoZSByZXR1cm5lZCBsaXN0IGlzIHRydW5jYXRlZCB0byB0aGVcbiAqIGxlbmd0aCBvZiB0aGUgc2hvcnRlciBvZiB0aGUgdHdvIGlucHV0IGxpc3RzLlxuICpcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoYSwgYikgLT4gYykgLT4gW2FdIC0+IFtiXSAtPiBbY11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB1c2VkIHRvIGNvbWJpbmUgdGhlIHR3byBlbGVtZW50cyBpbnRvIG9uZSB2YWx1ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QxIFRoZSBmaXJzdCBhcnJheSB0byBjb25zaWRlci5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QyIFRoZSBzZWNvbmQgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3QgbWFkZSBieSBjb21iaW5pbmcgc2FtZS1pbmRleGVkIGVsZW1lbnRzIG9mIGBsaXN0MWAgYW5kIGBsaXN0MmBcbiAqICAgICAgICAgdXNpbmcgYGZuYC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZiA9ICh4LCB5KSA9PiB7XG4gKiAgICAgICAgLy8gLi4uXG4gKiAgICAgIH07XG4gKiAgICAgIFIuemlwV2l0aChmLCBbMSwgMiwgM10sIFsnYScsICdiJywgJ2MnXSk7XG4gKiAgICAgIC8vPT4gW2YoMSwgJ2EnKSwgZigyLCAnYicpLCBmKDMsICdjJyldXG4gKiBAc3ltYiBSLnppcFdpdGgoZm4sIFthLCBiLCBjXSwgW2QsIGUsIGZdKSA9IFtmbihhLCBkKSwgZm4oYiwgZSksIGZuKGMsIGYpXVxuICovXG5cblxudmFyIHppcFdpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiB6aXBXaXRoKGZuLCBhLCBiKSB7XG4gIHZhciBydiA9IFtdO1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IE1hdGgubWluKGEubGVuZ3RoLCBiLmxlbmd0aCk7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBydltpZHhdID0gZm4oYVtpZHhdLCBiW2lkeF0pO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBydjtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB6aXBXaXRoOyJdfQ==
