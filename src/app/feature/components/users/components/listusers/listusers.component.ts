import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import UserModel from 'src/app/feature/models/user.model';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { ToastService } from 'src/app/feature/services/toast/toast.service';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {

  users: UserModel[] = [];
  selectedUser: UserModel = new UserModel();
  userModal: any;
  validationModal: any;

  constructor(private api: ApiService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {

    this.userModal = new window.bootstrap.Modal(
      document.getElementById('userModal')
    );
    this.validationModal = new window.bootstrap.Modal(
      document.getElementById('validationModal')
    );
    if (localStorage.getItem('role') != 'Administrador') {
      this.router.navigate(['objects/']);
    }
    this.getUsers();
  }

  getUsers() {
    this.api.callApi('api/v1/users', ApiMethods.GET, true, new Map())
      .subscribe((data: any) => {
        this.users = data;
        this.users = this.filter()
      });
  }

  changeStatus(user: UserModel) {
    if (user.status == 'Activo') {
      user.status = 'Inactivo'
    } else {
      user.status = 'Activo'
    }
    this.api.callApi(`api/v1/user/status/${user.id}`, ApiMethods.PUT, true, new Map())
      .subscribe(() => {
        this.toastService.showSuccessToast('Actualización Exitosa', `Se actualizó el estado exitosamente`);
      });
  }

  filter() {
    return this.users.filter(user => user.email != localStorage.getItem('email'))
  }

  openUserModel(user: UserModel) {
    this.selectedUser = user;
    this.userModal.show();
  }

  onDelete(user: UserModel) {
    this.selectedUser = user;
    this.userModal.hide();
    this.validationModal.show();
  }

  deleteUser(user: UserModel) {
    this.api.callApi(`api/v1/user/delete/${user.id}`, ApiMethods.DELETE, true, new Map())
      .subscribe(() => {
        this.toastService.showSuccessToast('Eliminación exitosa', `El usuario ${user.name} ${user.lastName} fue eliminado correctamente`);
        this.validationModal.hide();
        this.getUsers();
      });
  }

}
