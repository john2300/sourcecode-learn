const Promise1 = require('./es5-promise');
let p1 = new Promise1(function (resolve, reject) {
  //测试同步调用
  // reject('同步失败');
  // resolve('同步成功');
  setTimeout(() => {
    let num = Math.random()
    if (num > .5) {
      resolve('大成功')
    }else {
      reject('小失败')
    }
  }, 1000)
  
})

// p1.then((value) => {
//   console.log(value)
// }, (reason) => {
//   console.log(reason)
// })

let p2 = p1.then(function(data){
  return data+100;
},function(err){
  console.log(err);
});
// p2.then(function(data){
//   console.log('p2成功',data);
// },function(err){
//   console.log('p2失败',err);
// })
console.log(p2);
