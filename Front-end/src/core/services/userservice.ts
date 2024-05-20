// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../dtos/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5555';

  constructor(private http: HttpClient) {
  }

  checkUserLogin(user:User): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/user/checkUserLogin`, user);
  }

 addUser(user:User): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/user/createUserLogin`, user);
  }

}
