import { Component, OnInit } from '@angular/core';
import { Todo } from './todo-logic';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public data: Todo[] = [
    {
      id: 1,
      dueDate: '11-02-2020',
      priority: 2
    }
  ]

  constructor() { }

  ngOnInit() {
  }
  public whereIsJson(){
    console.log(this.data);
  }

}
