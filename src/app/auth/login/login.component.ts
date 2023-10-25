import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    if (this.ifFormValid()) {
      this.loginButtonLabel = 'Logando...';
      this.authService.login(email, password);
    }
  }
}
