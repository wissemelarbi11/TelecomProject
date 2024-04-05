import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserValue: any;
  constructor(private http: HttpClient ,   private router : Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post( 'http://localhost:3000/login', { 
      username,
      password
    }, httpOptions);


  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(' http://localhost:3000/register', {
      username,
      email,
      password
    }, httpOptions);
  }


  
}
