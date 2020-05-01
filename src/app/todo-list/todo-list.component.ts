import { Component, OnInit } from '@angular/core';
import { Todo } from './todo-logic';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public data: Todo[];
  public nextId: number;

  constructor() {
    const data = this.getTask();
    let nextID = 1;
  }

  ngOnInit() {
    const data = this.getTask();
  }
  public addTask(text: string): void {
    let task = new Todo(this.nextId, text);
    let data = this.getTask();
    console.log(this.data);
    this.setLocalStorageTasks(data);
    this.nextId++;
  }

  public getTask(){
    const localStorageItem = JSON.parse(localStorage.getItem('tasks'));
    return localStorageItem == null ? [] : localStorage.tasks;
  }

  private setLocalStorageTasks(todo: Todo[]): void{
    localStorage.setItem('tasks', JSON.stringify({ data: todo }));
  }

  public removeTask(id: number):void {
    let tasks = this.getTask()
    tasks = tasks.filter( (task) => task.id !== id );
  }

}
