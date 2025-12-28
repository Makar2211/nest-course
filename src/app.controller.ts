import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowercase } from './common/pipes/string-to-lowercase.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UsePipes(StringToLowercase)
  @Post()
  create(@Body() body: any) {
    return `This action adds a new movie with title: ${body.title}`;
  }
}
