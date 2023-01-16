import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRoleEnum } from 'src/app/feature/models/enum/UserRolesEnum';
import { UserStatusEnum } from 'src/app/feature/models/enum/UserStatusEnum';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { ToastService } from 'src/app/feature/services/toast/toast.service';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  id: String = "";
  user: any;
  roles: string[] = Object.keys(UserRoleEnum).filter((item) => isNaN(Number(item)));
  userStatuses: string[] = Object.keys(UserStatusEnum).filter((item) => isNaN(Number(item)));
  submitted: Boolean = false;

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    status: new FormControl('')
  });

  constructor(private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      role: ['', [Validators.required, Validators.minLength(3)]],
      status: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.id = this.activatedRoute.snapshot.params["id"];

    this.form.patchValue({
      id: this.activatedRoute.snapshot.params["id"]
    });

    this.getUserToEdit();
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.updateUser();
  }
  updateUser() {
    this.api.callApi(`api/v1/user/${this.form.value.id}`, ApiMethods.PUT, true, new Map(), this.form.value)
      .subscribe(() => {
        this.router.navigate(['users/']);
        this.toastService.showSuccessToast('Actualización Exitosa', `Usuario editado correctamente`);
      });
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
      status: data.status
    });
  }

  get usr(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getUserToEdit() {
    this.api.callApi(`api/v1/user/${this.id}`, ApiMethods.GET, true, new Map())
      .subscribe((data: any) => {
        this.setValue(data);
      });
  }

}
