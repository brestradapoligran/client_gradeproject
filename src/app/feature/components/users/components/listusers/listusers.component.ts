import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleEnum } from 'src/app/feature/models/enum/UserRolesEnum';
import UserModel from 'src/app/feature/models/user.model';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { AuthService } from 'src/app/feature/services/auth/AuthService';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {

  users: UserModel[] = [];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
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
      .subscribe();
  }

  filter() {
    return this.users.filter(user => user.email != localStorage.getItem('email'))
  }

}
