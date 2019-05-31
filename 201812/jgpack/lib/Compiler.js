const {SyncHook} = require('tapable')
const fs = require('fs')
const esprima = require('esprima')
const path = require('path')
const estraverse = require('estraverse')
const escodegen = require('escodegen')
const ejs = require('ejs');
class Compiler {
  constructor (options) {
    this.options = options
    this.hooks = {
      entryOption: new SyncHook(['config']),
      afterPlugins: new SyncHook(['config']),
      run: new SyncHook(['config']),
      compile: new SyncHook(['config']),
      afterCompile: new SyncHook(['config']),
      emit: new SyncHook(['config']),
      done: new SyncHook(['config'])
    }
    let plugins = options.plugins
    if (plugins && plugins.length > 0) {
      // 挂载插件
      plugins.forEach(plugin => {
        plugin.apply(this)
      })
    }

    // 触发插件挂载完成事件
    this.hooks.afterPlugins.call(this)
  }
  // 找到入口文件进行编译
  run () {
    // 这是什么意思?
    this.hooks.run.call(this)
    let { entry, output:{path:dist, filename},resolveLoaders:{modules:loaderPath},module:{rules}} = this.options
    let root = process.cwd()
    // 获得入口文件的绝对路径
    let entryPath = path.join(root, entry)
    let modules = {}; // 存放所有的模块,格式为路径:源代码
    this.hooks.compile.call(this)
    // 入口文件的路径,对象打包模板文件mian.js里的-entry
    let entryId
    parseModule(entryPath, true)
    this.hooks.afterCompile.call(this)

    //模板替换数据

    let bundle = ejs.compile(fs.readFileSync(path.join(__dirname,'main.ejs'),'utf8'))({
      modules,entryId
    });
    this.hooks.emit.call(this);
    //写入目标文件
    fs.writeFileSync(path.join(dist,filename),bundle);
    this.hooks.done.call(this);
    // 第二个参数判断是否为入口文件路径,调用该函数没有第二个参数为false
    function parseModule (modulePath, isEntry) {
      // 这里解析模块,顺便获得模块的路径./src/xx这种
      // path.relative() 方法根据当前工作目录返回 from 到 to 的相对路径
      let parentPath = path.relative(root, modulePath)
      // 取得入口文件的内容
      let source = fs.readFileSync(modulePath, 'utf8');

      //处理loader
      for(let i=0;i<rules.length;i++){
        let rule = rules[i];
        //正则判断绝对路径中是否有.xxx的文件后缀
        if(rule.test.test(modulePath)){
          //loader在webpack.config.js里的写法,用use或者loader需要判断一下
          let loaders = rule.use || rule.loader;
          //loader有可能是数组,也有可能是字符串,或者是对象
          if(loaders instanceof Array){
            for(let j=loaders.length-1;j>=0;j--){
              let loader = loaders[j];
              loader = require(path.join(root,loaderPath,loader));
              source = loader(source);
            }
          }else if(typeof loaders == 'string'){
            loader = loader.loader;
          }else if(typeof loaders == 'object'){
            loader = loaders.loader;
          }
        }
      }
      // TODO执行loader进行转换
      // path.dirname() 方法返回 path 的目录名
      let result = parse(source, path.dirname(parentPath)); // 用来解析模块内容并且返回依赖的模块
      // 打包后的key为路径,value为源代码
      modules['./' + parentPath] = result.source
      // 记录入口文件的路径
      if (isEntry) {
        entryId = './' + parentPath
      }
      let requires = result.requires
      // 递归处理依赖模块,路径为绝对路径
      if (requires && requires.length > 0) {
        requires.forEach(require => parseModule(path.join(root, require)))
      }
    }

    function parse (source, parentPath) { // parentPath是相对的,类似于/src
      let ast = esprima.parse(source); // 生成抽象语法树
      // 模块依赖其他模块的路径数组
      let requires = []
      // 遍历抽象语法树1找到此模块依赖的模块,2替换掉老的加载路径
      estraverse.replace(ast, {
        enter(node, parent) {
          if (node.type == 'CallExpression' && node.callee.name == 'require') {
            let name = node.arguments[0].value; // 原模块路径为./a/a1 打包之后要改成新的模块文件./src/a/a1.js
            // 判断有没有后缀,没有就加上
            name += (name.lastIndexOf('.') > 0 ? '' : '.js')
            // 拼接路径为./src/xxx
            let moduleId = './' + path.join(parentPath, name)
            requires.push(moduleId)
            // 再改变打包后的语法树
            node.arguments = [{type: 'Literal',value: moduleId}]
            return node; // 返回新节点
          }
        }
      })
      // 由语法树生成代码
      source = escodegen.generate(ast)
      return {requires,source}
    }
  }
}

module.exports = Compiler
