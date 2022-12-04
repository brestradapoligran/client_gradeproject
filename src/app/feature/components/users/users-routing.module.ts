import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateuserComponent } from './createuser/createuser.component';
import { ListusersComponent } from './listusers/listusers.component';

const routes: Routes = [
  {
    path: '', component: ListusersComponent
  },
  {
    path: 'create', component: CreateuserComponent
  },
  {
    path: 'edit/:id', component: CreateuserComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
