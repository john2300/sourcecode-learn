import express from 'express';
import config from './config';
// 1.引入路由的文件
import indexRouter from './../routes/index';
import sowingRouter from './../routes/sowing';
import homeRouter from './../routes/home';
import userRouter from './../routes/user';
import studentRouter from './../routes/student';
import classificationRouter from '../routes/classification';

// 引入中间件
import bodyParser from './../middle_wares/body_parser';
import errorLog from './../middle_wares/error_log';

// 2. 引入模板引擎
import nunjucks from 'nunjucks';

const app = express();

// 3. 设置模板引擎
nunjucks.configure(config.viewPath, {
    autoescape: true,
    express: app,
    noCache: true
});


// 4. 配置静态的资源
app.use(express.static(config.publicPath));
app.use('/node_modules', express.static(config.node_modules));

// 注意: 一定要走在所有的路由之前
app.use(bodyParser);


let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCrossDomain);

// 5. 挂载路由容器
app.use(indexRouter);
app.use(sowingRouter);
app.use(homeRouter);
app.use(userRouter);
app.use(studentRouter);
app.use(classificationRouter);
// app.use(johnRouter);

// 6. 挂载错误中间件
app.use(errorLog);

app.listen(1688, ()=>{
    console.log('server is running');
});