import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url='http://localhost:3000/users/';

  constructor(private http: HttpClient) { 
  }

  getUsers(): Observable<any>{
    return this.http.get(this.url);
  }

  postUser(person: Person): Observable<any>{
    return this.http.post(this.url, person);
  }

  deleteUser(id: number): Observable <any>{
    return this.http.delete(this.url + id);
  }

  updateUser(id: number, person: Person): Observable <any>{
    return this.http.put(this.url + id, person);
  }

}
