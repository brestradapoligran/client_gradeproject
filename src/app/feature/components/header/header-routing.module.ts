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
  },
  {
    path: 'users',
    loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
