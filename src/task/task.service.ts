import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {

  private tasks = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
  ];
  findAll() {
    return this.tasks;
  }

  findTask(id: number) {
    return this.tasks.find(task => task.id === id);
  }

  createTask(body: CreateTaskDto) {
    const { title, completed, priority, description, tags } = body;
    const newTask = {
      id: this.tasks.length + 1,
      title,
      priority,
      description,
      completed,
      tags
    };
    this.tasks.push(newTask);
    return this.tasks;
  }


  updateTask(dto: UpdateTaskDto, id: number) {
    const { title, completed } = dto;
    const task = this.findTask(id);
    if (!task) {
      return null;
    }

    task.title = title;
    task.completed = completed;
    return task;
  }

  patchUpdate(id: number, completed: boolean) {
    const task = this.findTask(id);
    if (!task) {
      return null;
    }
    task.completed = completed;
    return task;
  }


  delete(id: number) {
    const currentTask = this.findTask(id);
    if (!currentTask) {
      throw new NotFoundException('Task not found');
    }
    this.tasks = this.tasks.filter(task => task.id !== currentTask.id);
    return true;
  }
}
