#!/usr/bin node

//后台给的interface

const mockdata = {
  data:"京程一灯",
  result:{
    title:"冲击月薪三万"
  }
}

const json2ts = require("json2ts");
const jsonContent = JSON.stringify(mockdata);
let result = json2ts.convert(jsonContent);
/* 打印出的结果
export interface Result {
	title: string;
}

export interface RootObject {
	data: string;
	result: Result;
}
*/
console.log(result);
