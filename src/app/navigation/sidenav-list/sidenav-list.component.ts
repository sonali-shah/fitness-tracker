import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnDestroy {

  @Output() closeSidenavbar: EventEmitter<void> = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.authSubscription = this.authService.authChange.subscribe((auth) => {
      this.isAuth = auth;
    })
  }

  closeSidenav() {
    this.closeSidenavbar.emit();
  }

  onLogout() {
    this.closeSidenav();
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
