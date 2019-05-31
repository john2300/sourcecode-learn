let express = require('express');

let app = express();

let webpack = require('webpack');

//中间件webpack-dev-middleware

let middle = require('webpack-dev-middleware');

//先通过webpack拿到配置对象,再交给webpack处理,产生编译对象,扔给这个中间件
let config = require('./webpack.base');

let compiler = webpack(config);

app.use(middle(compiler));

app.get('/user',(req,res)=>{
  res.json({name:'珠峰架构'})
})

app.listen(3000);

//只启动node就行了