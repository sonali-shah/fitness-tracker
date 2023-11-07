import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
  constructor(private router: Router, private afAuth: Auth) {
    onAuthStateChanged(this.afAuth, (userData: any) => {
      if (userData) {
        this.user = userData;
        console.log(userData);
        this.authChange.next(true);
        this.router.navigateByUrl('training');
      } else {
        this.authChange.next(false);
        this.router.navigateByUrl('login');
      }
    });
  }

  authChange: Subject<boolean> = new Subject<boolean>();
  private user: User | null = null;

  registerUser(authData: AuthData) {
    createUserWithEmailAndPassword(
      this.afAuth,
      authData.email,
      authData.password
    )
      .then((result) => {
        this.router.navigateByUrl('login');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    signInWithEmailAndPassword(this.afAuth, authData.email, authData.password)
      .then((result) => {
        this.authChange.next(true);
        this.router.navigateByUrl('training');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    signOut(this.afAuth).then(() => {
      this.authChange.next(false);
      this.router.navigateByUrl('login');
    })
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
