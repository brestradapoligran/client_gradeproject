import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { ListusersComponent } from './components/listusers/listusers.component';
import { UpdatemyuserComponent } from './components/updatemyuser/updatemyuser.component';
import { UpdateuserComponent } from './components/updateuser/updateuser.component';

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
    path: 'edit/:id', component: UpdateuserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myuser', component: UpdatemyuserComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
