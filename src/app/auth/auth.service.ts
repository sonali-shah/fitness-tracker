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
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: Auth,
    private uiService: UIService
  ) {
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
    this.uiService.loadingStateChanged.next(true);
    createUserWithEmailAndPassword(
      this.afAuth,
      authData.email,
      authData.password
    )
      .then((result) => {
        this.uiService.loadingStateChanged.next(false);
        this.router.navigateByUrl('login');
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar(error.message, 'Close', {
          duration: 3000
        })
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    signInWithEmailAndPassword(this.afAuth, authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingStateChanged.next(false);
        this.authChange.next(true);
        this.router.navigateByUrl('training');
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar(error.message, undefined, {
          duration: 3000
        })
      });
  }

  logout() {
    signOut(this.afAuth).then(() => {
      this.authChange.next(false);
      this.router.navigateByUrl('login');
    });
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
