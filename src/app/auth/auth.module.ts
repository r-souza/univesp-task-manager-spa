import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from './../shared/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { BaseComponent } from './base/base.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, BaseComponent, LogoutComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialModule, SharedModule],
})
export class AuthModule {}
