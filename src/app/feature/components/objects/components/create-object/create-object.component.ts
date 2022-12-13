import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ObjectModel from 'src/app/feature/models/object.model';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css']
})
export class CreateObjectComponent implements OnInit {

  id: string = '';
  title: string = 'Crear Objeto';

  object = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private api: ApiService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.changeComponentToEdit();
  }

  createObject() {
    this.api.callApi('api/v1/object', ApiMethods.POST, true, new Map(), this.object.value)
      .subscribe(() => this.router.navigate(['objects/']));
  }

  onSubmit() {
    this.createObject();
  }

  changeComponentToEdit() {
    if (this.id != undefined) {
      this.title = "Editar Objeto"
      this.loadObjectData();
    };
  }

  loadObjectData() {
    this.api.callApi(`api/v1/object/${this.id}`, ApiMethods.GET, true, new Map())
      .subscribe((data: any) => {
        this.object.setValue({
          id: data.id,
          name: data.name,
          description: data.description
        });
      });
  }

}
