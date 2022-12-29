import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { CreateObjectComponent } from './components/create-object/create-object.component';
import { GetObjectComponent } from './components/get-object/get-object.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: '', component: ListComponent
  },
  {
    path: 'create',
    component: CreateObjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'object', component: GetObjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id', component: CreateObjectComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectsRoutingModule { }
