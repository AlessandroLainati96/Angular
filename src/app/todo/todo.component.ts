import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Todo } from './interfaces/todo.interface';
import { Observable, Subscription, of, pipe, switchMap } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {

  subscribeList: Subscription[] = [];
  todoList: Todo[] = [];
  todo!: Todo;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.subscribeList.push(this.todoService.getAll().subscribe(todos => {
        this.todoList = todos;
      }));

    console.log(this.todoList);
  }

  ngOnDestroy(): void {
    this.subscribeList.forEach(element => {
      element.unsubscribe();
    });
    this.subscribeList.length = 0;
  }

  insertThing(newthing: string) {

    this.subscribeList.push(this.todoService.createOne(newthing).pipe(
      switchMap(() => {
        return this.todoService.getAll();
        }
      )).subscribe(
        todos => {
          this.todoList = todos;
        },
        response => {
          console.log("Errore", response);
         }
      ));
  }

  deleteThing(todoThing: Todo) {

    this.subscribeList.push(this.todoService.deleteOne(todoThing.id).pipe(
      switchMap(() => {
        return this.todoService.getAll();
        }
      )).subscribe(
        (        todos: Todo[]) => {
          this.todoList = todos;
        },
        (        response: any) => {
          console.log("Errore", response);
         }
      ));
  }
}
