import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormSubmitted = false;
  isLoginFailed = false;
  authMessage = '';
  form?: FormGroup;
  constructor(private formbuilder: FormBuilder, private router: Router) {}
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get lf() {
    return this.form!.controls;
  }
  login() {
    this.loginFormSubmitted = true;
 
    if (this.form!.invalid) {
      return;
    } 
    if (
      this.form!.value.email === 'zezo_email@gmail.com' &&
      this.form!.value.password === 'zezo@app@123'
    ) {
      this.router.navigate(['admin/pages/home']);
      
    } else {
      return;
    }
  }
}
