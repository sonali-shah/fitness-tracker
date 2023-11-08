import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate: Date = new Date();
  isLoading: boolean = false;
  loadingSubs?: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit() {

    this.loadingSubs = this.uiService.loadingStateChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    })

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onFormSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs?.unsubscribe();
  }

}
