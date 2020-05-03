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

    public addTodo(storageName: string, inputTitle: string, inputDescription: string, oldId: any) {
        if (storageName === 'todos') {
          this.higerTaskId();
          this.task = new Todo(this.cacheID, inputTitle, inputDescription);
          this.tasks = this.getTasks(storageName);
          this.tasks.push(this.task);
          this.saveToStorage(storageName, this.tasks);
        } else if (storageName === 'doneTodos') {
          this.task = new Todo(oldId, inputTitle, inputDescription);
          this.doneTasks = this.getTasks(storageName);
          this.doneTasks.push(this.task);
          this.saveToStorage(storageName, this.doneTasks);
        }
    }

    public getTasks(storageName: string) {
     let localStorageItem = JSON.parse(localStorage.getItem(storageName));
     if (localStorageItem == null) {
       return localStorageItem = [];
     } else {
       return localStorageItem.task;
     }
    }

    public saveToStorage(storageName: string, tasks: Todo) {
      localStorage.setItem(storageName, JSON.stringify({ task: tasks }));
    }

    public remove(storageName: string, id: number) {
      this.tasks = this.getTasks(storageName);
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveToStorage(storageName, this.tasks);
    }

    public edit(id: number, newTitle: string, newDescription: string) {
      this.tasks = this.getTasks('todos');
      const editData = {eid: id, eTitle: newTitle, eDescription: newDescription};
      this.tasks.forEach( value => {
        if (value.id === editData.eid) {
          value.title = editData.eTitle;
          value.description = editData.eDescription;
        }
      });
      this.saveToStorage('todos', this.tasks);
    }

    public done(id: number) {
      this.tasks = this.getTasks('todos');
      let doneTask;
      this.tasks.forEach( value => {
        if (value.id === id) {
          doneTask = value;
        }
      });
      this.remove('todos', id);
      this.addTodo('doneTodos', doneTask.title, doneTask.description, id);

    }
}
