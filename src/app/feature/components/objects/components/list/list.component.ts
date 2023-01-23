import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import ClaimerModel from 'src/app/feature/models/claimer.model';
import ObjectModel from 'src/app/feature/models/object.model';
import FiltersObjectModel from 'src/app/feature/models/request/filters-object.model';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { AuthService } from 'src/app/feature/services/auth/AuthService';
import { ToastService } from 'src/app/feature/services/toast/toast.service';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  formModal: any;
  objectModal: any;
  objects: ObjectModel[] = [];
  searchWord: String = '';
  objectTypes: any[] = [];
  filters: FiltersObjectModel = new FiltersObjectModel();
  logged: Boolean = false;
  objectModalValidation: ObjectModel = new ObjectModel('', '', '', '', '', new ClaimerModel('', '', '', '', '', ''), []);
  objectSelected: ObjectModel = new ObjectModel('', '', '', '', '', new ClaimerModel('', '', '', '', '', ''), []);

  constructor(private api: ApiService, public authService: AuthService, private router: Router, private toastService: ToastService) {
    this.logged = this.authService.isLoggedIn();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.logged = this.authService.isLoggedIn();
      }
    });
  }

  ngOnInit(): void {
    this.searchFilters(this.filters);
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.objectModal = new window.bootstrap.Modal(
      document.getElementById('objectModal')
    );
  }

  async getObjects() {
    await this.api.callApi('api/v1/objects', ApiMethods.GET, false, new Map())
      .subscribe((data: any) => this.objects = data);
  }

  async searchFilters(filters: any) {
    this.filters = filters;
    await this.api.callApi('api/v1/object/search', ApiMethods.POST, true, new Map(), filters)
      .subscribe((data: any) => this.objects = data);
  }

  onDelete(object: ObjectModel) {
    this.validationOption(object);
  }

  async deleteObject(id: string) {
    await this.api.callApi(`api/v1/object/${id}`, ApiMethods.DELETE, true, new Map())
      .subscribe(() => {
        this.searchFilters(this.filters);
        this.formModal.hide();
        this.objectModal.hide();
        this.toastService.showErrorToast('Eliminación Correcta', `Se eliminó correctamente el objeto: ${this.objectModalValidation.name}`)
      });
  }

  validationOption(object: ObjectModel) {
    this.objectModalValidation = object;
    this.formModal.show();
  }

  onDeleteModal(id: string) {
    this.deleteObject(id);
  }

  openObjectModal(object: any) {
    this.objectSelected = object;
    this.objectModal.show();
  }

  isReclamadoSelected() {
    if (this.objectSelected.status == 'RECLAMADO') {
      return true;
    }
    return false;
  }

  isFeaturesEmpty() {
    if (this.objectSelected.features.length == 0) {
      return true;
    }
    return false;
  }
}
