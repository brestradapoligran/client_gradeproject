import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { ToastService } from 'src/app/feature/services/toast/toast.service';
import { ApiMethods } from 'src/app/feature/utils/api-methods';
import Validation from 'src/app/feature/utils/validation';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  token: string = '';
  submitted: Boolean = false;
  formGroup: FormGroup = new FormGroup({
    oldPass: new FormControl(''),
    pass: new FormControl(''),
    confirmpass: new FormControl('')
  });

  constructor(private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      oldPass: ['', [Validators.required]],
      pass: ['', [Validators.required, Validators.minLength(3)]],
      confirmpass: ['', [Validators.required, Validators.minLength(3)]],
    },
      {
        validators: [Validation.match('pass', 'confirmpass')]
      });
    this.token = this.activatedRoute.snapshot.params["token"];
  }

  onSubmit() {
    this.submitted = true;
    this.token == undefined ? this.updatePassword() : this.resetPasssword();
  }

  resetPasssword() {
    if (this.formGroup.invalid) {
      return;
    }
    let headers = new Map<string, string>();
    headers.set('Authorization', `Bearer ${this.token}`)
    this.api.callApi('api/v1/user/resetpassword', ApiMethods.POST, false, headers, this.formGroup.value)
      .subscribe(() => {
        this.router.navigate(['session']);
        this.toastService.showSuccessToast('Actualización Exitosa', `Se actualizó correctamente la contraseña`)
      });
  }

  updatePassword() {
    if (this.formGroup.invalid) {
      return;
    }
    this.api.callApi('api/v1/user/updatepassword', ApiMethods.POST, true, new Map<string, string>, this.formGroup.value)
      .subscribe(() => {
        this.router.navigate(['session']);
        this.toastService.showSuccessToast('Actualización Exitosa', `Se actualizó correctamente la contraseña`)
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

}
