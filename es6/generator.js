// function isType(type) {
//   return function(parma){
//     return Object.prototype.toString.call(parma) == `[object ${type}]`;
//   }
// }

// let isString = isType('String');
// console.log(isString('aaa'));
// let isArray = isType('Array');
// console.log(isArray([1,2,3]));

//制定一个函数被调用多少次才会真正执行
function eat(){
  console.log('吃完了');
}
function after(times,fn){
  let count = 0;
  return function(){
    if(++count == times){
      fn();
    }
  }
}

let newEat = after(3,eat);
newEat();
newEat();
newEat();