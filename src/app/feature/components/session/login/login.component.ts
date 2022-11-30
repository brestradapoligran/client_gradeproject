import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { FormControl, FormGroup } from '@angular/forms'
import { ApiMethods } from 'src/app/feature/utils/api-methods';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('bbrestrada@gmail.com'),
    pass: new FormControl('Test4echo')
  });
  logged: Boolean = true;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {

  }

  login() {
    this.api.callApi('api/v1/login', ApiMethods.POST, false, this.form.value)
      .subscribe((data: any) => {
        if (data)
          sessionStorage.setItem('token', data.token);
        this.router.navigate(['users'])
      }, () => {
        this.logged = false;
      }
      );
  }

}
