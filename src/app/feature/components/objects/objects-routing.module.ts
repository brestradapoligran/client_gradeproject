import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateObjectComponent } from './components/create-object/create-object.component';
import { GetObjectComponent } from './components/get-object/get-object.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: '', component: ListComponent
  },
  {
    path: 'create', component: CreateObjectComponent
  },
  {
    path: 'object', component: GetObjectComponent
  },
  {
    path: 'edit/:id', component: CreateObjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectsRoutingModule { }
