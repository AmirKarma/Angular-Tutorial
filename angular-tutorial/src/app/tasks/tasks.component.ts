import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { type NewTaskData } from './task/task.model';
import { TaskService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;
  isAddingTask = false;

  constructor(private tasksService: TaskService) { }

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }

  onComplete(id: string) {
    this.tasksService.removeTask(id);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onAddTask(taskData: NewTaskData) {
    this.tasksService.addTask(taskData, this.userId);

    this.isAddingTask = false;
  }
}