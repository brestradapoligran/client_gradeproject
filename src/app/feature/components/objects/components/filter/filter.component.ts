import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import FiltersObjectModel from 'src/app/feature/models/request/filters-object.model';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { AuthService } from 'src/app/feature/services/auth/AuthService';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() searchFilters = new EventEmitter<FiltersObjectModel>();

  word: String = '';
  filters: FiltersObjectModel = new FiltersObjectModel();
  objectTypesEnabled: any[] = [];
  objectStatusesEnabled: any[] = [];
  allFilters: FiltersObjectModel = new FiltersObjectModel();
  logged: Boolean = false;

  constructor(private api: ApiService, public authService: AuthService, private router: Router) {
    this.logged = this.authService.isLoggedIn();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.logged = this.authService.isLoggedIn();
      }
    });
    this.getFilters();
  }

  ngOnInit(): void {
  }

  sendSearch() {
    this.allFilters.searchWord = this.word;
    this.allFilters.objectTypes = this.objectTypesEnabled;
    this.allFilters.objectStatuses = this.objectStatusesEnabled;
    this.searchFilters.emit(this.allFilters);
  }

  async getFilters() {
    await this.api.callApi(`api/v1/object/filters`, ApiMethods.GET, false, new Map())
      .subscribe((data: any) => this.filters = data)
  }

  filterResultsObjectStatus(objectStatus: any, e: any) {
    if (e.currentTarget.checked) {
      this.objectStatusesEnabled.push(objectStatus)
    } else {
      this.objectStatusesEnabled = this.objectStatusesEnabled.filter(obj => obj !== objectStatus)
    }
    this.sendSearch();
  }

  filterResultsObjectTypes(objectType: any, e: any) {
    if (e.currentTarget.checked) {
      this.objectTypesEnabled.push(objectType)
    } else {
      this.objectTypesEnabled = this.objectTypesEnabled.filter(obj => obj !== objectType)
    }
    this.sendSearch();
  }

}
