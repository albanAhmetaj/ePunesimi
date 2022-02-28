import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loginUrl = 'http://localhost:3000/login';
  private _registerUrl = 'http://localhost:3000/register';
  
  constructor(private http: HttpClient, private router: Router) {}

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin_id');
    this.router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}