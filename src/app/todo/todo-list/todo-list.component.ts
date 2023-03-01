import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, switchMap, takeUntil } from 'rxjs';
import { Todo } from '../interfaces/todo.interface';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  //todoId : number = 0;
  status: boolean = false;
  todoId!: Observable<string>;
  todoElement!: Observable<Todo>;
  subscribeList: Subscription[] = [];

  @Input() things: Todo[] = [];

  @Output() deletedThing = new EventEmitter<Todo>();

  ngOnInit(): void {

    this.todoId = this.route.url.pipe(map(segments => segments.toString()));
    this.subscribeList.push(this.todoId.subscribe(
      (data) => {
        if (data.length > 4) { 
          this.status = true;
          this.todoElement = this.todoService.getOne(Number(data[5]));
          console.log("if");
          console.log(data.length);
          console.log(data);
          console.log(this.status);
        }
        else {
          console.log("else");
          console.log(data.length);
          console.log(data);
          console.log(this.status);
          this.status = false; 
        }
      }
    ));

    /*this.subscribeList.push(this.route.params.pipe(
      switchMap((params) => {
        this.todoId = params['todoId'];
        return this.todoService.getOne(this.todoId);
      })
    ).subscribe(
      todoThing => {
        this.todoLabel = todoThing.label;
      },
      response => {
        console.log("Errore", response);
       }
    ));*/
  }

  ngOnDestroy(): void {
    this.subscribeList.forEach(element => {
      element.unsubscribe();
    });
    this.subscribeList.length = 0;
  }

  deleteThing(todoThing: Todo) {
    console.log(todoThing);
    this.deletedThing.emit(todoThing);
  }

  convToNumber() {
    return Number(this.todoId);
  }

}
