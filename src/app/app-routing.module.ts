import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { TodoFormComponent } from './todo/todo-form/todo-form.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: 'home', component: TodoComponent},
  { path: 'todo/:todoId', component: TodoListComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  //{ path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}