import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup | any;
  isLoading: boolean = false;
  loadingSub?: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    })

    this.loginForm = new FormGroup({ 
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]) 
    });
  }


  onLoginFormSubmit() {
    this.authService.login({
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    });
  }

  ngOnDestroy(): void {
    this.loadingSub?.unsubscribe();
  }
}
