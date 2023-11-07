import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({ 
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]) 
    });
  }


  onLoginFormSubmit() {
    console.log(this.loginForm);
    this.authService.login({
      email: this.loginForm.email,
      password: this.loginForm.password
    });
  }
}