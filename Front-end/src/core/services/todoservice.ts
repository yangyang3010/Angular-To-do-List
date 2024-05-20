// user.service.ts

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../dtos/user";
import {Task} from "../dtos/task";
import {ToDo} from "../dtos/todo";


@Injectable({
  providedIn: 'root'
})
export class ToDoservice {
  private baseUrl = 'http://localhost:5555';

  constructor(private http: HttpClient) {
  }


  addToDo(todo: ToDo): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/todo/addToDo`, todo);
  }

  updateToDo(todo: ToDo): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/todo/updateToDo`, todo);
  }

  deleteToDo(todos: ToDo[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/todo/deleteToDo`, todos);
  }


}
