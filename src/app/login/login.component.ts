import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitDisabled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.loginForm.valueChanges.subscribe(_ => {
      this.checkDisabled()
    })
  }

  async submit() {
    let username = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;

    let submit = await this.api.login(username, password);

    if (submit) {
      let message = 'Inicio de sesión con éxito';
      let action = 'close'
      this._snackBar.open(message, action, {
        duration: 1000
      });

      await this.router.navigate(['/preferences']);

      this.clearFields()
    } else {
      let message = 'Error en la autenticación';
      let action = 'close'
      this._snackBar.open(message, action, {
        duration: 1000
      });

    }
  }

  clearFields() {
    this.loginForm.reset();
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.setErrors(null);
    })
  }

  private checkDisabled() {
    let username = this.loginForm.controls['username'].value;
    let password = this.loginForm.controls['password'].value;
    this.submitDisabled = username === '' || password === '';
  }
}
