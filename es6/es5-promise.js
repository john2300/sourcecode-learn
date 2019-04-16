// es6的Promsie
// let p1 = new Promise(function (resolve,reject) {
//   setTimeout(() => {
//     let num = Math.random()
//     if(num>.5){
//       resolve('大成功')
//     }else{
//       reject('小失败')
//     }
//   }, 2000)
// })

// p1.then((value)=>{
//   console.log(value)
// },(reason)=>{
//   console.log(reason)
// })

/**
1.new Promise(),调用的是es6的内置构造函数,所以第一步需要模块化这个promise
2.new Promise(function(){})里面是一个函数,把它在Promise构造对象里命令为task,该task异步任务会在某种情况下执行,一定有task();;;;;;;;;;;;;;;;视频里说的是在new的时候,task会立即执行?????,用setTimeout包裹p1.then(),确实是new的同时立马执行了task
3.异步任务task里有resolve和reject,有几种状态需要初始化,resolve和reject是函数
4.reject获取任务失败信息,用try catch捕获异常
5.p.then()是实例上的方法,也就是所谓Promise原型上的方法,

6.如果new Promise(function(resolve,reject){
  //本来是异步调用这个,但是这里直接同步调用.要注意的是,onFulfilled, onReject是要then后才会把回调函数放到回调数组里,resolve函数才接着处理回调数组,执行每个回调函数.直接同步调用,回调数组里没有任何的回调函数.用if解决
  resolve('直接调用resolve'),实现即可以同步,又可以异步
})
 */

function Promise (task) {
  // 哪个步骤会让this的指向发生变化呢?
  let that = this
  // 默认状态为pedding
  that.status = 'pedding'
  // 此变量里放着此promise的结果,默认为undefined
  that.value = undefined
  // 存放的着所有成功的回调函数
  that.onResolvedCallbacks = []
  // 存放着所有的失败的回调函数
  that.onRejectedCallbacks = []
  // 调用此方法可以把promise变成成功态
  function resolve (value) {
    if (that.status == 'pedding') {
      that.status = 'fulfilled'
      that.value = value
      that.onResolvedCallbacks.forEach(item => item(that.value))
    }
  }
  // 调用此方法可以把当前的promise变成失败态
  function reject (reason) {
    // 如果当前状态是初始态，则转成失败态
    if (that.status == 'pedding') {
      that.status = 'rejected'
      that.value = reason
      that.onRejectedCallbacks.forEach(item => item(that.value))
    }
  }
  // 立即执行传入的任务
  try {
    task(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
// onFulfilled成功的回调，onReject失败的回调
// p.then()这句代码,执行的时候,下面的代码就已经执行了一次,p.then(onFulfilled,onReject)里的onFulfilled,onReject已经被缓存了起来,里面的回调代码会在resolve和reject函数里被调用
Promise.prototype.then = function (onFulfilled, onReject) {
  // 缓存onFulfilled,等成功了,再执行onFulfilled,onReject同理,另外then可以then多次,内部需要一个数组存放所有成功的回调函数
  let that = this
  // if判断解决同步调用resolve和reject的问题
  //同步调用,直接执行onFulfilled
  if (that.status == 'fulfilled') {
    onFulfilled(that.value);
  }
  if (that.status == 'rejected') {
    onReject(that.value);
  }
  if (that.status == 'pedding') {
    that.onResolvedCallbacks.push(onFulfilled)
    that.onRejectedCallbacks.push(onReject)
  }
}
module.exports = Promise
