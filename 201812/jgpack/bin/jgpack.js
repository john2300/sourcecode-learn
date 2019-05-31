#! /usr/bin/env node

const path = require('path');
const fs = require('fs');
const root = process.cwd();//取得当前的工作目录
//这个文件是在根目录下运行的,webpack.config.js就在根目录下
let configPath = path.join(root,'webpack.config.js');
let config = require(configPath);

const Compiler = require('./../lib/Compiler');
let  compiler = new Compiler(config);
//Compiler和Compilation都是继承于Tapabel,可以发送事件
//发射entryOption事件,call是发射,tap是监听
//重新指定实例化的SyncHook(['config'])为config,并且执行发射
compiler.hooks.entryOption.call(config);
// compiler.hooks.entryOption.tap();
compiler.run();



















/**
 * 
 * class SyncHook {//钩子是同步的
	constructor(args){//args => ['name']
		this.tasks = [];
	}
	call(...args){
		this.tasks.forEach((task) => task(...args))
	}
	tap(name,task){
		this.tasks.push(task);
	}
}

let hook = new SyncHook(['name']);
hook.tap('react',function(name){
	console.log('react',name)
})
hook.tap('node',function(name){
	console.log('node',name)
})
hook.call('yuhua');
 */