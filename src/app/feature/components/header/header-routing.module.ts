import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'objects',
    loadChildren: () => import('../objects/objects.module').then(m => m.ObjectsModule)
  },
  {
    path: 'session',
    loadChildren: () => import('../session/session.module').then(m => m.SessionModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
