console.log("开发坏境");
const { join } = require("path");
module.exports={
  devServer:{
    contentBase:join(__dirname,"../dist"),
    hot:true
  }
}