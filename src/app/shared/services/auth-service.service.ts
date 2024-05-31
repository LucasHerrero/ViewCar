// authService.service.ts

import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  decodedToken: any;

  constructor(private router: Router) { }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) {
      this.decodedToken = jwtDecode(token);
    }
    return !!token;
  }

  getUserId() {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) {
      this.decodedToken = jwtDecode(token);
      console.log(this.decodedToken);
      return this.decodedToken.id;
    }
    return null;
  }

  getUserInfo() {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) {
      this.decodedToken = jwtDecode(token);
      console.log(this.decodedToken);
      return this.decodedToken;
    }
    return null;
  }

  logout() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  keepUserLoggedIn() {
    const token = localStorage.getItem('token') ;
    if (token) {
      this.decodedToken = jwtDecode(token);
    }
  }
}
