import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {SocialAuthService} from "angularx-social-login";
import {FacebookLoginProvider} from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  error = false;

  form = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private socialAuthService: SocialAuthService,
              private router: Router) {}

  ngOnInit(): void {}

  get emailControl() {
    return this.form.get("email") as FormControl;
  }

  get passwordControl() {
    return this.form.get("password") as FormControl;
  }

  login(form: FormGroup) {
    this.submitted = true;
    const { value, valid } = form;

    if (valid) {
      this.authService.login(value.email, value.password).subscribe(
        data => {
          console.log(data)
          const url = '/admin';
          this.router.navigate([url]);
        },
        error => {
          this.error = true;
        }
      );
    }
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
}
}
