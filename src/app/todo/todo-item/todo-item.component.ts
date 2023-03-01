import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../interfaces/todo.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {

  @Input() thing!: Todo;

  @Output() deletedThing = new EventEmitter<Todo>();
  
  deleteThing(todo: Todo) {
    console.log(todo);
    this.deletedThing.emit(todo);
  }
}
