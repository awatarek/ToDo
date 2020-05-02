import { Injectable } from '@angular/core';
import { Todo } from '../models';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})
export class TodoService 
{
    public task;
    public tasks;
    public cacheID;
    public doneTasks;

    public onStart(){
      if(localStorage.getItem('Id Task') == null){
        localStorage.setItem('Id Task', '0');
        this.tasks = [];
      }
    }

    public higerTaskId(){
        this.cacheID = parseInt(localStorage.getItem('Id Task')) + 1;
        localStorage.removeItem('Id Task');
        localStorage.setItem('Id Task', this.cacheID);
    }

    public addTodo(storageName, inputText)
    {
        this.higerTaskId()
        this.task = new Todo(this.cacheID, inputText);
        if(storageName=='todos'){
          this.tasks = this.getTasks(storageName);
          this.tasks.push(this.task);
          this.saveToStorage(storageName, this.tasks);
        } else if(storageName=='doneTodos'){
          this.doneTasks = this.getTasks(storageName);
          this.doneTasks.push(this.task);
          this.saveToStorage(storageName, this.doneTasks);
        }
    }

    public getTasks(storageName: string){
     let localStorageItem = JSON.parse(localStorage.getItem(storageName));
     if(localStorageItem==null){
       return localStorageItem = [];
     }else{
       return localStorageItem.task;
     }
    }

    public saveToStorage(storageName:string, tasks: Todo){
      localStorage.setItem(storageName, JSON.stringify({ task: tasks }));
    }

    public remove(id: number){
      this.tasks = this.getTasks('todos');
      this.tasks = this.tasks.filter((task)=>task.id != id)
      this.saveToStorage('todos', this.tasks);
    }

    public edit(id: number, oldtext: string, text: string){
      this.tasks = this.getTasks('todos');
      let editData = {eid: id, etext: text};
      this.tasks.forEach(function(value) {
        if(value.id == editData.eid){
          value.text = editData.etext;
        }
      });
      this.saveToStorage('todos', this.tasks);
    }

    public done(id: number){
      this.tasks = this.getTasks('todos');
      let doneTask;
      this.tasks.forEach(function(value) {
        if(value.id == id){
          doneTask = value;
        }
      });
      this.remove(id);
      this.addTodo('doneTodos', doneTask.text);

    }
}