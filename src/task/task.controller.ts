import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

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
