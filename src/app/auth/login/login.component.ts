import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginUrl = `${environment.apiBaseUrl}/auth/passport`;
  public loginButtonLabel: string = 'Logar';

  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  ifFormValid() {
    return this.form.valid;
  }

  onSubmit() {
    console.log(this.form.value);
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    if (this.ifFormValid()) {
      this.loginButtonLabel = 'Logando...';
      this.authService
        .login(email, password)
        .pipe(
          tap((data: any) => {
            console.log(data);
          }),
          catchError((errorData: any) => {
            console.error(errorData);
            return throwError(errorData);
          })
        )
        .subscribe();
    }
  }
}
