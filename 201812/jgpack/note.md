webpack流程概括

初始化参数:从配置文件和shell语句中读取与合并参数,得出最终的参数

开始编译:用上一步得到的参数初始化Compiler对象,加载所有配置的插件,执行对象的run方法,开始执行编译.

确定入口:根据配置中的entry找出所有的入口文件

编译模块:从入口文件出发,调用所有配置的Loader对模块进行编译,再找出该模块依赖的模块,再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理

完成模块编译:在经过第4步使用loader翻译完所有模块后,得到了每个模块被编译后的最终内容以及它们之间的依赖关系

输出资源:根据入口和模块之间的依赖关系,组装成一个个包括多个模块的chunk,再把每个chunk转换成一个单独的文件加入到输出列表,这步是可以修改输出内容的最后机会

输出完成:在确定好输出内容后,根据配置确定输出的路径的文件名,把文件内容写入到文件系统

以上过程中,webpack会在特定的时间点广播特定的事件,插件在监听感兴趣的事件后会执行特定的逻辑,并且插件可以调用webpack提供的API改变webpack的运行结果

钩子函数:对应上面的过程

entryOption

run

afterPlugins

compiler

afterCompile

emit

done

###编写webpack







npm link 把该文件链接到全局目录下


/usr/bin/jgpack -> /usr/lib/node_modules/jgpack/bin/jgpack.js
/usr/lib/node_modules/jgpack -> /home/john/Desktop/sourcecode-learn/201812/jgpack



必要模块

tapable:处理事件

esprima:解析语法树

escodegen:生成代码

estraverse:遍历语法树

ejscompiler











webpack语法树网站:astexplorer.net

let a2 = require('./a2');
module.exports = a2;

以上这段代码,主要查看依赖模块在语法树的哪一句里面"

  body:[
    //变量声明
    VariableDeclaration{
      ...
      declarations:[
        VaribleDeclarator{
          ...
          //调用表达式
          init:CallExpression{
            ...
            //调用者requirede的信息
            callee:Identifiler{
              ...
              name:"require"
            }
            arguments:[
              //文本
              Literal{
                ...
                value:"./a2"
                raw:"'./a2'"
              }
            ]
          }
        }
      ]
    }
  ]


  在没加入打包模板文件之前,打包后的文件是依赖什么模板的?解决了,之前可能是webpack编译出来的