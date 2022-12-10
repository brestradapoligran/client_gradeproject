import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import UserModel from 'src/app/feature/models/user.model';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  title: String = "Crear usuario";
  id: String = "";
  user: any;

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    pass: new FormControl(''),
    confirmPass: new FormControl(''),
  });

  constructor(private api: ApiService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.changeComponentToEdit();
  }

  onSubmit() {
    this.id == undefined ? this.createUser() : this.updateUser();
  }

  createUser() {
    this.api.callApi('api/v1/user', ApiMethods.POST, true, this.form.value)
      .subscribe(() => this.router.navigate(['users/']));
  }

  updateUser() {
    this.api.callApi(`api/v1/user/${this.form.value.id}`, ApiMethods.PUT, true, this.form.value)
      .subscribe(() => this.router.navigate(['users/']));
  }

  changeComponentToEdit() {
    if (this.id != undefined) {
      this.title = "Editar Usuario"
      this.loadUserData();
    };
  }

  loadUserData() {
    this.api.callApi(`api/v1/user/${this.id}`, ApiMethods.GET, true)
      .subscribe((data: any) => {
        this.form.setValue({
          id: data.id,
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          role: data.role,
          pass: '',
          confirmPass: ''
        });
      });
  }
}