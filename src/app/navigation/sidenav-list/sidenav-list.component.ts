import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable} from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {

  @Output() closeSidenavbar: EventEmitter<void> = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store) {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  closeSidenav() {
    this.closeSidenavbar.emit();
  }

  onLogout() {
    this.closeSidenav();
    this.authService.logout();
  }
}
