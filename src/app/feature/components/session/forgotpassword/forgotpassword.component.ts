import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  formGroup = new FormGroup({
    email: new FormControl('')
  });

  showForm: Boolean = true;
  showMessage: Boolean = false;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.api.callApi(`api/v1/user/forgot`, ApiMethods.POST, false, new Map(), this.formGroup.value)
      .subscribe();
    this.showForm = false;
    this.showMessage = true;
  }
}
