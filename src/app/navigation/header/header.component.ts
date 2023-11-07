import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  @Output() openSidenavbar: EventEmitter<void> = new EventEmitter<void> ();
  isAuth: boolean = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.authSubscription = this.authService.authChange.subscribe((auth) => {
      this.isAuth = auth;
    })
  }

  openSidenav() {
    this.openSidenavbar.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
