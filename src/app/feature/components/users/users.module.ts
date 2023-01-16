import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListusersComponent } from './components/listusers/listusers.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdatemyuserComponent } from './components/updatemyuser/updatemyuser.component';
import { UpdateuserComponent } from './components/updateuser/updateuser.component';

@NgModule({
  declarations: [
    ListusersComponent,
    CreateuserComponent,
    UpdatemyuserComponent,
    UpdateuserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
