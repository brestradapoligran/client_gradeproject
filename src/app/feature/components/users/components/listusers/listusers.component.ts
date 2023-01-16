import { Component, OnInit } from '@angular/core';
import UserModel from 'src/app/feature/models/user.model';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {

  users: UserModel[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.callApi('api/v1/users', ApiMethods.GET, true, new Map())
      .subscribe((data: any) => this.users = data);
  }

  getUser(userId: String) {
    console.log(userId)
  }

  changeStatus(user: UserModel) {
    user.status = !user.status;
    this.api.callApi(`api/v1/user/status/${user.id}`, ApiMethods.PUT, true, new Map())
      .subscribe();
  }

}