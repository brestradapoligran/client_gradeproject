import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiMethods } from 'src/app/feature/utils/api-methods';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl('')
  });

  logged: Boolean = true;
  submitted: Boolean = false;

  constructor(private api: ApiService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      pass: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40)
        ]
      ],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  login() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.api.callApi('api/v1/login', ApiMethods.POST, false, new Map(), this.form.value)
      .subscribe((data: any) => {
        console.log(data)
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        localStorage.setItem('role', data.role);
        this.router.navigate(['objects'])
      }, () => {
        this.logged = false;
      }
      );
  }

}
