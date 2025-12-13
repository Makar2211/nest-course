import { Body, Controller, Delete, Get, Headers, NotFoundException, Param, Patch, Post, Put, Query, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller({
  path: 'task',
  host: ['localhost', 'myapp.com']
})
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get('get-param/:id')
  getParam(@Param('id') id: number) {
    return { id };
  }

  @Get('get-query')
  getQuery(@Query() query: any) {
    return query;
  }

  @Get('get-headers')
  getHeaders(@Headers() header: any) {
    return header;
  }

  @Get('get-request')
  getRequest(@Req() req: Request) {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      params: req.params
    };
  }



  @Get('get-response')
  getResponse(@Res() res: Response) {
    return res.status(200).send('Response from get-response endpoint');
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  fingTask(@Param('id') id: string) {
    const task = this.taskService.findTask(Number(id));
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  @Post('create')
  create(@Body() body: CreateTaskDto) {
    return this.taskService.createTask(body);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() body: CreateTaskDto) {
    const updatedTask = this.taskService.updateTask(body, Number(id));
    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    return updatedTask;
  }

  @Patch('update/:id')
  patchUpdate(@Param('id') id: string, @Body() body: Pick<CreateTaskDto, 'completed'>) {
    const task = this.taskService.patchUpdate(Number(id), body.completed);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(Number(id));
  }
}
