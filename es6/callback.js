/**
 * 回调函数的问题
 * 1.无法捕获错误,因为无法使用try catch
 * 2.return
 * 3.回调地狱:
 *  1)非常难看
 *  2)非常难以维护
 *  3)效率比较低,因为它们是串行的
 */
// const fs = require('fs');
// function read(filename){
//   //为什么不能return,因为fs.readFile是个异步函数,在等待数据读取的过程中,不能return中断
//   fs.readFile(filename,'utf8',function(err,data){
//     throw Error('出错了');
//     if(err){
//       console.log(err);
//     }else{
//       console.log(data);
//     }
//   })
// }

// //这样不行,没有return拿不到结果
// // let result = read('./1.txt');
// // read('./1.txt');
// // console.log(2);


// try{
//   let result = read('./1.txt');
// }catch(e){
//   //错误是上面的打印出来,这里的caych并没有捕获到错误,因为try catch执行的时候,错误没有发生,详细一点就是读取之后的回调函数是异步的,try catch执行的是同步的,同步无法捕获异步的错误.
//   console.log(e)
// }





/**
 * 如何解决回调嵌套的问题
 * 1.通过事件发布订阅来现实
 */

 //事件发布订阅

 let EventEmitter = require('')