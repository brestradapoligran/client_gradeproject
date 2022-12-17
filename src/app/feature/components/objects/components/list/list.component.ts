import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import ObjectModel from 'src/app/feature/models/object.model';
import ObjectTypeModel from 'src/app/feature/models/objet-type.model';
import FiltersObjectModel from 'src/app/feature/models/request/filters-object.model';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  objects: ObjectModel[] = [];
  searchWord: String = '';
  objectTypes: any[] = [];
  filters: FiltersObjectModel = new FiltersObjectModel();

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getObjects();
  }

  async getObjects() {
    await this.api.callApi('api/v1/objects', ApiMethods.GET, true, new Map())
      .subscribe((data: any) => this.objects = data);
  }

  searchFilters(filters: any) {
    this.filters = filters;
    this.api.callApi('api/v1/object/search', ApiMethods.POST, true, new Map(), filters)
      .subscribe((data: any) => this.objects = data);
  }

  async onDelete(id: string) {
    await this.api.callApi(`api/v1/object/${id}`, ApiMethods.DELETE, true, new Map())
      .subscribe(() => this.searchFilters(this.filters));
  }

}
