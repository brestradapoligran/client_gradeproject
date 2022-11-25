import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { FormControl, FormGroup } from '@angular/forms'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email : new FormControl(''),
    pass : new FormControl('')
  });

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    
  }

  login(){
    this.api.callApi('api/v1/login', ApiMethods.POST, this.form)
    .subscribe(data => console.log(data));
    
  }
}
