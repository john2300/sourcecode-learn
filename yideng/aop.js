// function test () {
//   console.log(2)
//   return 'test'
// }

// Function.prototype.before = function (fn) {
//   // console.log(this)

//   let __self = this

//   return function () {
//     fn.apply(this,arguments)
//     return __self.apply(__self,arguments)
//   }
// }

// Function.prototype.after = function (fn) {
//   let __self = this

//   return function () {
//     let result =  __self.apply(__self,arguments)
//     fn.apply(this,arguments)
//     return result
//   }
// }

// test.before(function () {
//   console.log(1)
// }).after(function () {
//   console.log(3)
// })()

// ---------------------------------------------------------------

// AOP是对OOP（面向对象编程）的一个横向的补充，主要作用就是把一些业务无关的功能抽离出来，例如日志打印、统计数据、数据验证、安全控制、异常处理等等。这些功能都与某些核心业务无关，但又随处可见，如果都是复制粘贴未免太没逼格，而且难以维护，不优雅。把它们抽离出来，用“动态”插入的方式嵌到各业务逻辑中。这样的好处是业务模块可以变得比较干净，不受污染，同时这些功能点能够得到很好的复用，给模块解耦。

let a = b = c = 0

let setA = function (action) {
  return function (value) {
    action(value)
    a = b + c
  }
}
let verifyValue = function (action) {
  return function (value) {
    if (typeof value != 'number') {
      throw new Error('你传了个什么鬼进来')
    }
    action(value)
  }
}

let setB = verifyValue(setA(function (value) {b = value;}))

let setC = verifyValue(setA(function (value) {
  c = value
}))

setC('10')
console.log(a)
