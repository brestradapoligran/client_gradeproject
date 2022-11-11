import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectsRoutingModule } from './objects-routing.module';
import { ListComponent } from './components/list/list.component';
import { FilterComponent } from './components/filter/filter.component'


@NgModule({
  declarations: [
    ListComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    ObjectsRoutingModule
  ],
  exports: [
    ListComponent
  ]
})
export class ObjectsModule { }
