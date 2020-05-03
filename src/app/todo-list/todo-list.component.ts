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
  public newText: string;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.onStart();
    this.refresh();
  }
  public refresh() {
    this.tasks = this.todoService.getTasks('todos');
    this.doneTasks = this.todoService.getTasks('doneTodos');
  }

  public addTodo() {
    this.todoService.addTodo('todos', this.title, this.description, '');
    this.refresh();
  }
  public remove(storageName, id) {
    this.todoService.remove(storageName, id);
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
    this.newText = '';
    this.refresh();
  }

  public done(id) {
    this.todoService.done(id);
    this.refresh();
  }

}

