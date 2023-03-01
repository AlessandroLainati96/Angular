import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  
  newthing: string = '';

  @Output() insertNewThing = new EventEmitter<string>();

  updateOnChange(newValue: string): void {
    this.newthing = newValue;
  }

  addThing(newthing: string) {
    this.insertNewThing.emit(newthing);
    this.newthing = '';
  }
}
