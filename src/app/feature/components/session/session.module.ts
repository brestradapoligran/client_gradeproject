import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotpasswordComponent
  ],
  imports: [
    CommonModule,
    SessionRoutingModule,
    SharedModule
  ], exports: [
    LoginComponent,
    SharedModule
  ]
})
export class SessionModule { }
