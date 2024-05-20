// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../dtos/user";
import {Task} from "../dtos/task";


@Injectable({
  providedIn: 'root'
})
export class Taskservice {
  private baseUrl = 'http://localhost:5555';

  constructor(private http: HttpClient) {
  }

  getAllTasks(user:User): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/task/getAllTasks`, user);
  }
   addTask(task:Task): Observable<any> {
      return this.http.post(`${this.baseUrl}/api/v1/task/addTask`, task);
   }
   deleteTask(task:Task): Observable<any> {
          return this.http.post(`${this.baseUrl}/api/v1/task/deleteTask`, task);
        }



}
