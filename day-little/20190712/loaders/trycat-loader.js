const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
let aaaa;
module.exports = function(source){
  // console.log(parser.parse);
  let ast = parser.parse(source);
  console.log(ast);
  traverse(ast, {
    enter(path) {
      aaaa = path;
      console.log('1111111');
      // if (
      //   path.node.type === "Identifier" &&
      //   path.node.name === "n"
      // ) {
      //   path.node.name = "x";
      // }
    }
  });
  console.log("---------",aaaa)
}