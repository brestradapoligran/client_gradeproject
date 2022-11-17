import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectsRoutingModule } from './objects-routing.module';
import { ListComponent } from './components/list/list.component';
import { FilterComponent } from './components/filter/filter.component';
import { CreateObjectComponent } from './components/create-object/create-object.component';
import { GetObjectComponent } from './components/get-object/get-object.component'
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    FilterComponent,
    CreateObjectComponent,
    GetObjectComponent
  ],
  imports: [
    CommonModule,
    ObjectsRoutingModule,
    SharedModule
  ],
  exports: [
    ListComponent,
    SharedModule
  ]
})
export class ObjectsModule { }
