import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTypeEnum } from 'src/app/feature/models/enum/DocumentTypeEnum';
import { ObjectFeatureTypeEnum } from 'src/app/feature/models/enum/ObjectFeatureTypeEnum';
import { ObjectStatusEnum } from 'src/app/feature/models/enum/ObjectStatusEnum';
import { ObjectTypeEnum } from 'src/app/feature/models/enum/ObjectTypeEnum';
import { UserTypeEnum } from 'src/app/feature/models/enum/UserTypeEnum';
import { EventTypes } from 'src/app/feature/models/toast/event-types';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { ToastService } from 'src/app/feature/services/toast/toast.service';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-updateobject',
  templateUrl: './updateobject.component.html',
  styleUrls: ['./updateobject.component.css']
})
export class UpdateobjectComponent implements OnInit {

  id: string = '';
  EventTypes = EventTypes;
  formGroup: FormGroup;
  submitted: Boolean = false;
  statuses: string[] = Object.keys(ObjectStatusEnum).filter((item) => isNaN(Number(item)));
  objectTypes: string[] = Object.keys(ObjectTypeEnum).filter((item) => isNaN(Number(item)));
  featureTypes: string[] = Object.keys(ObjectFeatureTypeEnum).filter((item) => isNaN(Number(item)));
  userTypes: string[] = Object.keys(UserTypeEnum).filter((item) => isNaN(Number(item)));
  documentTypes: string[] = Object.keys(DocumentTypeEnum).filter((item) => isNaN(Number(item)));

  object = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
    type: new FormControl(''),
    features: new FormArray([]),
    claimer: this.fb.group({
      name: new FormControl(''),
      lastName: new FormControl(''),
      document: new FormControl(''),
      documentType: new FormControl(''),
      contact: new FormControl(''),
      userType: new FormControl('')
    })
  });

  featureForm = this.fb.group({
    name: new FormControl(''),
    description: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastService: ToastService) { }


  ngOnInit(): void {
    this.object = this.fb.group({
      id: new FormControl(''),
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      status: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', [Validators.required, Validators.minLength(3)]],
      features: this.fb.array([]),
      claimer: this.fb.group({
        name: ['', []],
        lastName: ['', []],
        document: ['', []],
        documentType: ['CC', []],
        contact: ['', []],
        userType: ['Estudiante', []]
      })
    });
    this.id = this.activatedRoute.snapshot.params["id"];
    this.loadObjectData();
  }

  onSubmit() {
    this.submitted = true;
    if (this.object.invalid) {
      return;
    }
    this.updateObject();
  }

  updateObject() {
    this.api.callApi(`api/v1/object/${this.id}`, ApiMethods.PUT, true, new Map(), this.object.value)
      .subscribe(() => {
        this.router.navigate(['objects/'])
        this.showToast('Actualización Correcta', `Se actualizó el objeto ${this.object.value.name} correctamente`, EventTypes.Success)
      });
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
          features: [],
          claimer: data.claimer
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

  addFeature() {
    this.features.push(this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    }));
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

  get obj(): { [key: string]: AbstractControl } {
    return this.object.controls;
  }

  get cla(): { [key: string]: AbstractControl } {
    return this.object.controls.claimer.controls;
  }

  get features() {
    return this.object.get('features') as FormArray;
  }
}
