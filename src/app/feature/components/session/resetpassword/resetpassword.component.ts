import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { ToastService } from 'src/app/feature/services/toast/toast.service';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  token: string = '';
  formGroup: FormGroup = new FormGroup({
    pass: new FormControl(''),
    confirmpass: new FormControl('')
  });

  constructor(private api: ApiService, private router: Router, private activatedRoute: ActivatedRoute, private toastService: ToastService) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params["token"];
    console.log(this.token)
  }

  onSubmit() {
    let headers = new Map<string, string>();
    headers.set('Authorization', `Bearer ${this.token}`)
    this.api.callApi('api/v1/user/resetpassword', ApiMethods.POST, false, headers, this.formGroup.value)
      .subscribe(() => {
        this.router.navigate(['session']);
        this.toastService.showSuccessToast('Actualización Exitosa', `Se actualizó correctamente la contraseña`)
      });
  }

}
