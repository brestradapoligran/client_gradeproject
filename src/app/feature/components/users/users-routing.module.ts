import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { CreateuserComponent } from './createuser/createuser.component';
import { ListusersComponent } from './listusers/listusers.component';

const routes: Routes = [
  {
    path: '', component: ListusersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create', component: CreateuserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id', component: CreateuserComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
