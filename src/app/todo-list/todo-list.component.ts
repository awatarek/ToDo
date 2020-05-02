import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from './todo-logic';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [ TodoService ]
})
export class TodoListComponent implements OnInit {
  public text:string;
  public tasks: Todo;
  public doneTasks: Todo;

  constructor(private todoService: TodoService) {
    
  }

  ngOnInit() { 
    this.todoService.onStart();
    this.refresh();    
  }
  public refresh(){
    this.tasks = this.todoService.getTasks('todos');
    this.doneTasks = this.todoService.getTasks('doneTodos');
  }

  public addTodo(){
    this.todoService.addTodo('todos', this.text);
    this.refresh();
  }
  public remove(id){
    this.todoService.remove(id);
    this.refresh();
  }

  public edit(id, text, oldtext){
    this.todoService.edit(id, text, oldtext);
    this.refresh();
  }

  public done(id){
    this.todoService.done(id)
    this.refresh();
  }

}
