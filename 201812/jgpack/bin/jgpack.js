#! /usr/bin/env node

const path = require('path');
const fs = require('fs');
const root = process.cwd();//取得当前的工作目录
//这个文件是在根目录下运行的,webpack.config.js就在根目录下
let configPath = path.join(root,'webpack.config.js');
let config = require(configPath);

const Compiler = require('./../lib/Compiler');
let compiler = new Compiler(config);
//Compiler和Compilation都是继承于Tabel,可以发送事件
//发射entryOption事件,call是发射,tap是监听
compiler.hooks.entryOption.call(config);
// compiler.hooks.entryOption.tap();
compiler.run();