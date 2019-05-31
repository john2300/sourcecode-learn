// import { Controller, Get } from '@nestjs/common';
//增加Render
import { Controller, Render, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  //增加
  @Render("index.html")
  getHello(): string {
    return this.appService.getHello();
  }
}
