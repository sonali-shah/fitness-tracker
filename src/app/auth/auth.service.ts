import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as AuthActions from '../auth/auth.actions';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: Auth,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {
    onAuthStateChanged(this.afAuth, (userData: any) => {
      if (userData) {
        this.user = userData;
        this.store.dispatch(new AuthActions.SetAuthenticated());
        this.router.navigateByUrl('training');
      } else {
        this.store.dispatch(new AuthActions.SetUnaunthenticated());
        this.router.navigateByUrl('login');
      }
    });
  }

  private user: User | null = null;

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    createUserWithEmailAndPassword(
      this.afAuth,
      authData.email,
      authData.password
    )
      .then((result) => {
        this.store.dispatch(new UI.StopLoading());
        this.router.navigateByUrl('login');
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(error.message, 'Close', {
          duration: 3000,
        });
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    signInWithEmailAndPassword(this.afAuth, authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new AuthActions.SetAuthenticated());
        // this.router.navigateByUrl('training');
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new AuthActions.SetUnaunthenticated());
        this.uiService.showSnackBar(error.message, undefined, {
          duration: 3000,
        });
      });
  }

  logout() {
    signOut(this.afAuth).then(() => {
      this.store.dispatch(new AuthActions.SetUnaunthenticated());
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
