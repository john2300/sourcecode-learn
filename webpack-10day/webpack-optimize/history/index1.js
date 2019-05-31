// import calc from './test';


//development模式引入的对象没有add方法,但是一样会引入整个对象的方法
// console.log(calc.add(1,2))

//development模式也会整个引入,但是production模式不会整个引入,按需要加载
//import 在生产环境下会 自动去除掉没用的代码
//这种功能叫tres-shaking 把没用的代码,自动删除掉
// console.log(calc.sum(1,2));

//require引入,也会整个引入
//es6模块也会把结果放到default上
//require引入模块不支持tree-shaking
// let calc = require('./test.js');
// console.log(calc.default.sum(1,2));


//scope hosting作用域提升
import calc from './test';
//定义了这么多的比变量,最后只有一个结果,如果打包后不清除这些变量,浪费空间
//在webpack中自动省略一些可以简化的代码
let a = 1;
let b = 2;
let c = 3;
let d = a+b+c;
console.log(d,"---------------------");

console.log(calc.sum(1,2));

