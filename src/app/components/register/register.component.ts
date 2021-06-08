import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  error = false;

  form = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required]
  });
  constructor(   private fb: FormBuilder,
                 private authService: AuthService,
                 private router: Router) { }

  ngOnInit(): void {
  }

  get firstNameControl() {
    return this.form.get("firstName") as FormControl;
  }

  get lastNameControl() {
    return this.form.get("lastName") as FormControl;
  }

  get emailControl() {
    return this.form.get("email") as FormControl;
  }

  get passwordControl() {
    return this.form.get("password") as FormControl;
  }

  register(form: FormGroup) {
    this.submitted = true;
    const {value, valid} = form;

    if (valid) {
      this.authService.register(value.firstName, value.lastName, value.email, value.password).subscribe(
        data => {
          this.form.reset()
          this.submitted = false;
        },
        error => {
          this.error = true;
        }
      );
    }
  }
}
