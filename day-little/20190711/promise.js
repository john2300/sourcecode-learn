//按顺序执行多个promise
//1.连续使用then链式操作
let num = 0;
function getA() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("A");
      num = num + 1;
      resolve(1);
    }, 3000);
  });
}

function getB() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("B")
      num = num - 1;
      resolve(2);
    }, 1000);
  });
}
function addAB(a, b) {
  return a + b
}

/**
 * 2.2 方法二——使用promise构建队列
 *  */
//自己写的
// function queue(arr){
//   let res = [];
//   let result = Promise.resolve();
//   arr.forEach(a=>{

//     result = result.then(a);
//   });
//   return result;
// }
// let res2 = queue([getA,getB]);
// res2.then(r=>{
//   console.log(r);
// })

//别人的
// function getResult(){
//   var res=[];
//   // 构建队列
//   function queue(arr) {
//     var sequence = Promise.resolve();
//     arr.forEach(function (item) {
//       //一直以为sequence在数组循环的时候,会不停重写为数组,其实错了,每次循环重写都是一个正在pedding的promise,下一次再重写其实是接着上一次的promise之后then,把这一次循环的正在正在pending的promise再赋值给sequence,相当sequence = Promise.resolve().then(item).then(item),最后才变为一个数组
//       sequence = sequence.then(item).then(data=>{
//           res.push(data);
//           return res
//       })
//     })
//     console.log(sequence);
//     return sequence
//   }

//   // 执行队列
//   queue([getA,getB]).then(data=>{
//       return addAB(data[0],data[1])
//   })
//   .then(data => {
//       console.log(data)
//   })
//   .catch(e => console.log(e));

// }

// getResult();

// 方法三——使用async、await实现类似同步编程

// 自己的
async function queue(arr) {
  //不能用forEach,因为forEach在循环的时候不会停下来,加return false才会停下来
  let res = [];
  // console.log(arr);
  for(let a of arr){
    // console.log(a);
    let result = await a();
    res.push(result);
  }

  //async/await 语法糖本身就是为了避免回调函数这种“不直观”的逻辑，将异步回调转成同步顺序执行，从而使得代码符合直观的理解。而用 forEach/map/reduce 代替for循环，则正是利用回调函数的语法，牺牲代码的直观性，提升代码的简洁性。 
  // arr.forEach(a => {
  //   let result = await a();
  //   res.push(result);
  // })
  return res;
}

queue([getA, getB]).then(r => {
  console.log(r);
})
// arr = [1,2,3,4];

// arr.forEach(a=>{
//   if(a == 1){
//     console.log(a);
//     return false;
//   }
// })