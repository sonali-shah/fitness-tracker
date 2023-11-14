import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() openSidenavbar: EventEmitter<void> = new EventEmitter<void> ();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  openSidenav() {
    this.openSidenavbar.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
