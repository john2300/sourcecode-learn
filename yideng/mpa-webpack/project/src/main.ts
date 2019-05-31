import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//增加模板
const swig = require('swig');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //增加静态文件请求目录
  app.useStaticAssets(__dirname + "/public");
  //增加前端渲染模板目录
  app.setBaseViewsDir(__dirname + "/views");
  //设置模板引擎
  app.engine("html",swig.renderFile);
  //设置模板引擎
  app.setViewEngine("html");
  await app.listen(3000);
}
bootstrap();
