import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateObjectComponent } from './components/create-object/create-object.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: '', component: ListComponent
  },
  {
    path: 'create', component: CreateObjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectsRoutingModule { }
