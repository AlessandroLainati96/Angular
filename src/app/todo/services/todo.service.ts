import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Todo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private url: string = 'http://localhost:3000/todo';

  constructor(private httpClient: HttpClient) {
    console.log("Costruttore")
   }

  getAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.url);
  }

  public getOne(id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(this.url + "/" + id);
  }

  public createOne(label: string): Observable<Todo> {
    return this.httpClient.post<Todo>(this.url, {label});
  }

  public deleteOne(id: number): any {
    return this.httpClient.delete<Todo>(this.url + "/" + id.toString());
  }

}
