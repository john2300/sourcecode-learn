/**
 * 两个数组合并成一个数组
 */
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

//第一种方法，es5
// let arr3 = [].concat(arr1,arr2);
//第二种方法，es6
let arr3 = [...arr1, ...arr2];
console.log(arr3);

/**
 * es5模拟es6中的reduce
 */

Array.prototype.reduce1 = function(reducer, inital) {
  for (var i = 0; i < this.length; i++) {
    inital = reducer(inital, this[i], i, this);
  }
  return inital;
};

let arr4 = [3, 4, 5, 6];
let result = arr4.reduce1(function(val, item, index, arr) {
  if (index === arr.length - 1) {
    return (val + item) / arr.length;
  } else {
    return val + item;
  }
}, 0);

//  console.log(result)

/**
 * 借用方法
 */
// let max = Math.max(1,2,3);
//es5
// let max = Math.max.apply(null,arr2);
//es6
let max = Math.max(...arr2);
console.log(max);

/**
 *  对象属性拷贝
 */

let obj1 = { name: "1" };
let obj2 = { age: 2 };
let obj3 = {};

//循环赋值

//  for(let key in obj1){
//      obj3[key] = obj1[key];
//  }
//  for(let key in obj2){
//      obj3[key] = obj2[key];
//  }
//  console.log(obj3);

//assign(原理跟循环赋值是一样的)
// Object.assign(obj3,obj1,obj2);
// console.log(obj3);

//解构赋值

obj3 = { ...obj1, ...obj2 };
console.log(obj3);

/**
 * 深拷贝和浅拷贝
 */

let obj5 = {
  name: "zfpx",
  home: {
    city: "beijing"
  }
};
//浅拷贝,拷贝对象或者被拷贝对象修改了属性，拷贝对象和被拷贝对象都会改变
// let obj6 = {};
// obj6 = Object.assign(obj6,obj5);

//深拷贝,但是这种json方式浪费内存空间
// let obj6 = JSON.parse(JSON.stringify(obj5));

//深拷贝封装方法，一般会封装一个深拷贝的方法
function clone(origin) {
  let newObj = {};
  for(let i in origin){
    if(typeof origin[i] == 'object'){
      newObj[i] = clone(origin[i]);
    }else{
      newObj[i] = origin[i];
    }
  }
  return newObj;
}


let obj6 = clone(obj5);
obj6.home.city = "guangzhou";
console.log(obj5);
console.log(obj6);

//网上找的深拷贝方法

// function clone(obj){
//   if(typeof obj!=='object'){return obj;}
//   let cloneObj = {};
//   switch(obj.constructor){
//     case Array:
//       cloneObj = [];
//     case Object:
//       for(var property in obj){
//         cloneObj[property] = typeof obj[property] === 'object'?clone(obj[property]):obj[property];
//       }
//       break;
//     case Map:
//       cloneObj = new Map();
//       obj.forEach((value,key)=>{
//         cloneObj.set(key,typeof value==='object'?clone(value):value);
//       });
//       break;
//     case Set:
//       cloneObj = new Set();
//       obj.forEach(value=>{
//         cloneObj.add(typeof value==='object'?clone(value):value);
//       });
//       break;
//   }
//   return cloneObj;
// }

//箭头函数常见错误
let obj8 = {
  name:'zfpx',
  getName:()=>{
    console.log(this.name);
  }
};
let obj9 = {
  name:'9',
  gN:obj8.getName
}
//输出为undefined，箭头函数的上一级方法是全局
obj9.gN();
