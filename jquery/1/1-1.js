// (function (window,undefined) {
//   //rootJquery是jquery的根目录,下面会把jquery(document)赋值给rootJquery,为了压缩,为了好维护.例如3
//   var rootJquery,
//     readyList,
//     //保存一个字符串形式的undefined,4
//     core_strundefined = typeof undefined,
// })(window)

//因为window对象位于js的顶端,变量查找顺序是从里往外,从低到高,一层层往外找.另外window可以被压缩成一个字母,便于优化代码体积.传入undefined是为了防止外面改变undefined值,只从里面进行查找.


// 3
//把常量赋值给一个变量,变量有名字,更容易阅读和维护
// var speed = 10;
// var a = a + speed;

//4
//没区别啊
console.log(typeof undefined);
console.log(undefined);
