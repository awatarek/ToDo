import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from './todo-logic';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [ TodoService ]
})
export class TodoListComponent implements OnInit {
  public title: string;
  public description: string;
  public tasks: Todo;
  public doneTasks: Todo;
  public newTitle: string;
  public newDescription: string;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.onStart();
    this.refresh();
  }
  public refresh() {
    this.tasks = this.todoService.getTasks();
  }

  public addTodo() {
    this.todoService.addTodo(this.title, this.description);
    this.title = '';
    this.description = '';
    this.refresh();
  }

  public remove(id) {
    this.todoService.remove(id);
    this.refresh();
  }

  public edit(id: number, odlTitle: string, oldDescriptio: string, newTitle: string, newDescription: string) {
    if (newTitle === '' || newTitle == undefined || newTitle == null) {
      newTitle = odlTitle;
    }
    if (newDescription === '' || newDescription == undefined || newDescription == null) {
      newDescription = oldDescriptio;
    }
    this.todoService.edit(id, newTitle, newDescription);
    this.newTitle = '';
    this.newDescription = '';
    this.refresh();
  }

  public done(id) {
    this.todoService.done(id);
    this.refresh();
  }

}

