import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserRoleEnum } from 'src/app/feature/models/enum/UserRolesEnum';
import { UserStatusEnum } from 'src/app/feature/models/enum/UserStatusEnum';
import { EventTypes } from 'src/app/feature/models/toast/event-types';
import UserModel from 'src/app/feature/models/user.model';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { ToastService } from 'src/app/feature/services/toast/toast.service';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  title: String = 'Crear Usuario';
  id: String = "";
  user: any;
  roles: string[] = Object.keys(UserRoleEnum).filter((item) => isNaN(Number(item)));
  userStatuses: string[] = Object.keys(UserStatusEnum).filter((item) => isNaN(Number(item)));

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    pass: new FormControl(''),
    confirmPass: new FormControl(''),
    status: new FormControl('')
  });

  constructor(private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    console.log(this.id)
    this.form.patchValue({
      id: this.activatedRoute.snapshot.params["id"]
    });
    this.loadUserData();
  }

  onSubmit() {
    this.id == undefined ? this.createUser() : this.updateUser();
  }

  createUser() {
    this.api.callApi('api/v1/user', ApiMethods.POST, true, new Map(), this.form.value)
      .subscribe(() => {
        this.router.navigate(['users/']);
        this.toastService.showSuccessToast('Creación Exitosa', `Usuario creado correctamente`);
      });
  }

  updateUser() {
    this.api.callApi(`api/v1/user/${this.form.value.id}`, ApiMethods.PUT, true, new Map(), this.form.value)
      .subscribe(() => {
        this.router.navigate(['users/']);
        this.toastService.showSuccessToast('Actualización Exitosa', `Usuario editado correctamente`);
      });
  }

  loadUserData() {
    if (this.form.value.id == '' || this.form.value.id == undefined) {
      this.title = "Crear Usuario"
    } else {
      this.title = "Editar Usuario"
      this.api.callApi(`api/v1/user/${this.id}`, ApiMethods.GET, true, new Map())
        .subscribe((data: any) => {
          this.setValue(data);
        });
    }
  }

  get userId() {
    return this.form.get('id')
  }

  setValue(data: any) {
    this.form.setValue({
      id: data.id,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      pass: '',
      confirmPass: '',
      status: data.status
    });
  }
}
