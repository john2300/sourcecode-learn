//filter，es5实现方式
let arr1 = [3,4,5,6];
Array.prototype.filter1 = function(fn){
  let newArr = [];
  for(let i = 0; i < this.length; i++){
    let flag = fn(this[i]);
    flag && newArr.push(this[i]);
  }
  return newArr;
}
let arrFilter = arr1.filter1(function(item){
  return item > 4;
})
console.log(arrFilter);

//find,es5实现方式

let arr2 = [1,2,3];
Array.prototype.find1 = function(fn){
  for(let i = 0; i < this.length; i++){
    let flag = fn(this[i]);
    if(flag){
      return this[i];
    }
  }
}
let result = arr2.find1(function(item){
  return item == 4;
})
console.log(result);

