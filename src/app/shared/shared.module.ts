import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../feature/services/api/api.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule
  ], exports: [
    FontAwesomeModule
  ]
})
export class SharedModule { }
