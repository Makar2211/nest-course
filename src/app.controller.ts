import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { UserAgent } from './common/decorators/user-agent.decorator';
import { AuthGuard } from './common/guards/auth.guard';
import { StringToLowercase } from './common/pipes/string-to-lowercase.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UsePipes(StringToLowercase)
  @Post()
  create(@Body() body: any) {
    return `This action adds a new movie with title: ${body.title}`;
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@UserAgent() userAgent: string) {
    return `This is the profile page. Your user agent is: ${userAgent}`;
  }
}
