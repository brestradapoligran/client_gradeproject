import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListusersComponent } from './listusers/listusers.component';

const routes: Routes = [
  {
    path: '', component: ListusersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
