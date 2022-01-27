import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ApiService} from "../shared/services/api.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitDisabled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    });

    this.registerForm.valueChanges.subscribe(_ => {
      this.checkDisabled()
    })
  }

  checkDisabled(): void {
    let username = this.registerForm.controls['username'].value;
    let email = this.registerForm.controls['email'].value;
    let password = this.registerForm.controls['password'].value;
    let confirmPassword = this.registerForm.controls['confirmPassword'].value;
    this.submitDisabled = username === '' || email === '' || password === '' || confirmPassword === '';
  }

  async checkUsername() {
    let username = this.registerForm.controls['username'].value;
    let usernameExists = await this.api.usernameExists(username);

    if (usernameExists) {
      this.registerForm.controls['username'].setErrors({'takenUsername': true});
    }
  }

  async submit() {
    this.validateForm();
    if (this.registerForm.valid) {
      let username = this.registerForm.controls['username'].value;
      let email = this.registerForm.controls['email'].value;
      let password = this.registerForm.controls['password'].value;

      let newUser = await this.api.createUser(username, email, password);

      if (newUser) {
        let message = 'User created succesfully';
        let action = 'close'
        this._snackBar.open(message, action, {
          duration: 1000
        });

        this.clearFields()
      }
    }
  }

  clearFields() {
    this.registerForm.reset();
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key)?.setErrors(null);
    })
  }

  validateForm(): void {
    let password = this.registerForm.controls['password'].value;
    let confirmPassword = this.registerForm.controls['confirmPassword'].value;
    if (password !== confirmPassword) {
      this.registerForm.controls['confirmPassword'].setErrors({'nomatch': true});
    }
  }
}
