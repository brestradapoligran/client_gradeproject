import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectFeatureTypeEnum } from 'src/app/feature/models/enum/ObjectFeatureTypeEnum';
import { ObjectStatusEnum } from 'src/app/feature/models/enum/ObjectStatusEnum';
import { ObjectTypeEnum } from 'src/app/feature/models/enum/ObjectTypeEnum';
import FeaturesModel from 'src/app/feature/models/features.model';
import ObjectModel from 'src/app/feature/models/object.model';
import { EventTypes } from 'src/app/feature/models/toast/event-types';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { ToastService } from 'src/app/feature/services/toast/toast.service';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css']
})
export class CreateObjectComponent implements OnInit {

  id: string = '';
  title: string = 'Crear Objeto';
  EventTypes = EventTypes;
  formGroup: FormGroup;
  statuses: string[] = Object.keys(ObjectStatusEnum).filter((item) => isNaN(Number(item)));
  objectTypes: string[] = Object.keys(ObjectTypeEnum).filter((item) => isNaN(Number(item)));
  featureTypes: string[] = Object.keys(ObjectFeatureTypeEnum).filter((item) => isNaN(Number(item)));
  featuress: FeaturesModel[] = [];

  object = this.fb.group({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
    type: new FormControl(''),
    features: this.fb.array([])
  });

  constructor(private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastService: ToastService) { }


  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.changeComponentToEdit();

  }

  onSubmit() {
    this.id == undefined ? this.createObject() : this.updateObject();
  }

  createObject() {
    this.api.callApi('api/v1/object', ApiMethods.POST, true, new Map(), this.object.value)
      .subscribe(() => {
        this.router.navigate(['objects/']);
        this.showToast('Creación Correcta', `Se creó el objeto ${this.object.value.name} correctamente`, EventTypes.Success)
      });
  }

  updateObject() {
    this.api.callApi(`api/v1/object/${this.id}`, ApiMethods.PUT, true, new Map(), this.object.value)
      .subscribe(() => {
        this.router.navigate(['objects/'])
        this.showToast('Actualización Correcta', `Se actualizó el objeto ${this.object.value.name} correctamente`, EventTypes.Success)
      });
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
          description: data.description,
          status: data.status,
          type: data.type,
          features: []
        });

        data.features.forEach(element => {
          const features = this.fb.group({
            name: element.name,
            description: element.description,
          });

          this.features.push(features);
        });
      });
  }

  get features() {
    return this.object.get('features') as FormArray;
  }

  addFeature() {
    this.features.push(
      this.fb.group({
        name: [''],
        description: [''],
      })
    );
  }

  removeFeature(index: number) {
    this.features.removeAt(index);
    this.showToast('Eliminación Exitosa', 'La característica se eliminó exitosamente', EventTypes.Error);
  }

  showToast(title: string, message: string, eventType: EventTypes) {
    switch (eventType) {
      case EventTypes.Error: this.toastService.showErrorToast(title, message);
        break;
      case EventTypes.Success: this.toastService.showSuccessToast(title, message);
        break;
    }

  }
}
