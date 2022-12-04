import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListusersComponent } from './listusers/listusers.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListusersComponent,
    CreateuserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
