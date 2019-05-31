const less = require('less');

module.exports = function(source){
  let css;
  less.render(source,(err,output)=>{
    css = output.css;
  });
  //换行符在打包后的bundle.js里的eval(`xxxx`)中的\n是不生效且会报错,用//n代替
  return css.replace(/\n/g,'\\n');
}

