//npm i  esprima estraverse escodegen -S
let esprima = require('esprima');
let estraverse = require('estraverse');
//讲语法树对象重新生成代码
let escodegen = require('escodegen');
let code = 'function ast(){}';
let ast = esprima.parse(code);
//遍历抽象语法树
estraverse.traverse(ast, {
    enter(node) {
        console.log('enter ', node.type);
        if (node.type == 'Identifier') {
            node.name += '_enter';
        }

    },
    leave(node) ;{
        console.log('leave ', node.type);
        if (node.type == 'Identifier') {
            node.name += '_leave';
        }
    }
});
//
let result = escodegen.generate(ast);
console.log(result);//重新生成后的代码


//https://astexplorer.net/
