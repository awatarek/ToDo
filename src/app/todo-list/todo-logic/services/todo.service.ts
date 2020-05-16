import { Injectable } from '@angular/core';
import { Todo } from '../models';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    public task: any;
    public tasks: any;
    public cacheID: any;
    public doneTasks: any;

    public onStart() {
      if (localStorage.getItem('Id Task') == null) {
        localStorage.setItem('Id Task', '0');
        this.tasks = [];
      }
    }

    public higerTaskId() {
        this.cacheID = parseInt(localStorage.getItem('Id Task') ) + 1;
        localStorage.removeItem('Id Task');
        localStorage.setItem('Id Task', this.cacheID);
    }

    public addTodo(inputTitle: string, inputDescription: string) {
          this.higerTaskId();
          this.task = new Todo(this.cacheID, inputTitle, inputDescription, false);
          this.tasks = this.getTasks();
          this.tasks.push(this.task);
          this.saveToStorage(this.tasks);

    }

    public getTasks() {
     let localStorageItem = JSON.parse(localStorage.getItem('todos'));
     if (localStorageItem == null) {
       return localStorageItem = [];
     } else {
       return localStorageItem.task;
     }
    }

    public saveToStorage( tasks: Todo) {
      localStorage.setItem('todos', JSON.stringify({ task: tasks }));
    }

    public remove(id: number) {
      this.tasks = this.getTasks();
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveToStorage(this.tasks);
    }

    public edit(id: number, newTitle: string, newDescription: string) {
      this.tasks = this.getTasks();
      const editData = {eid: id, eTitle: newTitle, eDescription: newDescription};

      this.tasks.forEach( value => {
        if (value.id === editData.eid) {
          value.title = editData.eTitle;
          value.description = editData.eDescription;
        }
      });

      this.saveToStorage(this.tasks);
    }

    public done(id: number) {
      this.tasks = this.getTasks();
  
      this.tasks.forEach( value => {
        if (value.id === id) {
          value.done = true;
        }
      });

      this.saveToStorage(this.tasks);
    }
}
