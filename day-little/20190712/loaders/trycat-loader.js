const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
let aaaa;
module.exports = function(source){
  // console.log(parser.parse);
  //实在是不懂这玩意的内在逻辑,怎么输出ast
  let ast = parser.parse(source);
  console.log('-----------------------ast',ast);
  traverse(ast, {
    
    // enter(path) {
      //这里面是个循环
      // aaaa = path;
      // console.log('1111111');
      AwaitExpression(path) {
        let tryCatchAst = t.tryStatement(
            // try 子句（必需项）
            t.blockStatement([
                t.expressionStatement(path.node)
            ]),
            // catch 子句
            t.catchClause(
                //...
            )
        )
        path.replaceWithMultiple([
            tryCatchAst
        ])
    }
    // }
  });
  // console.log('-------lastPath',aaaa);
}