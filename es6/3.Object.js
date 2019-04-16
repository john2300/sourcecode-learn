let obj1 = {age:1};
let obj2 = {age:2};
let obj3 = {};
//设置obj3的原型为obj1
//第一种方法
// Object.setPrototypeOf(obj3,obj1);
//第二种方法
obj3.__proto__ = obj1;
//第三种方法
// let obj3 = {
//   __proto__:obj1
// }
console.log(obj3);//{}
console.log(obj3.age);//1