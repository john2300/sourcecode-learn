// let memory = function (x) {
//   let cache = {};

//   return function () {
//     cache[i] = cache[i] || x.aplly(x,arguments);
//   }
// }

// var memoize = function(f) {
//   var cache = {};

//   return function() {
//     var arg_str = JSON.stringify(arguments);
//     console.log(arguments)
//     console.log(arg_str)
//     // console.log(typeof arg_str)
//     cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
//     return cache[arg_str];
//   };
// };

// var squareNumber  = memoize(function(x){ return x*x; });

// console.log(squareNumber(4));
//=> 16

// squareNumber(4); // 从缓存中读取输入值为 4 的结果
// //=> 16

// squareNumber(5);
// //=> 25

// squareNumber(5); // 从缓存中读取输入值为 5 的结果
// //=> 25


// var add = function(x) {
//   return function(y) {
//     return x + y;
//   };
// };

// let increment = add(1)
// console.log(add(1))
//=> Immutable.Map({name:"Michael", hp:19, team: "green"})
// var curry = require('lodash').curry;

// var match = curry(function (what, str) {
//   return str.match(what);
// });

// var replace = curry(function (what, replacement, str) {
//   return str.replace(what, replacement);
// });

// var filter = curry(function (f, ary) {
//   return ary.filter(f);
// });

// var map = curry(function (f, ary) {
//   return ary.map(f);
// });


// let a = function(x){
//   return function(y){
//     return x+y;
//   }
// }

// let b = a(1);

// console.log(b(2))

let compose = function(f,g){
  return function(y){
    return f(g(y));
  }
}

let a = function(x){
  return x.toUpperCase();
}

let b = function(x){
  return x+'!';
}

let shot = compose(a,b);
console.log(compose)
console.log(shot('fuck you'));


