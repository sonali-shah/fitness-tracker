import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private router: Router) {}

  authChange: Subject<boolean> = new Subject<boolean>();
  private user: User | null = null;

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };

    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigateByUrl('login');
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  authSuccessfully() {
    this.authChange.next(true);
    this.router.navigateByUrl('training');
  }
}
