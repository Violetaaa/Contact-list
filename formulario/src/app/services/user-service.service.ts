import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url='http://localhost:3000/users';

  constructor(private http: HttpClient) { 
    
  }

  getUsers(): Observable<any>{
    return this.http.get(this.url);
  }

}
