import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTypeEnum } from 'src/app/feature/models/enum/DocumentTypeEnum';
import { ObjectFeatureTypeEnum } from 'src/app/feature/models/enum/ObjectFeatureTypeEnum';
import { ObjectStatusEnum } from 'src/app/feature/models/enum/ObjectStatusEnum';
import { ObjectTypeEnum } from 'src/app/feature/models/enum/ObjectTypeEnum';
import { UserTypeEnum } from 'src/app/feature/models/enum/UserTypeEnum';
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

  EventTypes = EventTypes;
  formGroup: FormGroup;
  submitted: Boolean = false;
  model: any;
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
    lostDate: new FormControl(''),
    claimer: this.fb.group({
      name: new FormControl(''),
      lastName: new FormControl(''),
      document: new FormControl(''),
      documentType: new FormControl(''),
      contact: new FormControl(''),
      userType: new FormControl(''),
      foundDate: new FormControl('')
    })
  });

  featureForm = this.fb.group({
    name: new FormControl(''),
    description: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private api: ApiService,
    private router: Router,
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
      lostDate: ['', Validators.required],
      claimer: this.fb.group({
        name: ['', []],
        lastName: ['', []],
        document: ['', []],
        documentType: ['CC', []],
        contact: ['', []],
        userType: ['Estudiante', []],
        foundDate: ['', []]
      })
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.object.invalid) {
      return;
    }
    this.createObject();
  }

  createObject() {
    this.api.callApi('api/v1/object', ApiMethods.POST, true, new Map(), this.object.value)
      .subscribe(() => {
        this.router.navigate(['objects/']);
        this.showToast('Creación Correcta', `Se creó el objeto ${this.object.value.name} correctamente`, EventTypes.Success)
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

  addClaimer() {
    console.log(this.obj['status'].value)
    if (this.obj['status'].value == 'RECLAMADO') {
      this.cla['name'].setValidators([Validators.required, Validators.minLength(3)])
      this.cla['lastName'].setValidators([Validators.required, Validators.minLength(3)])
      this.cla['document'].setValidators([Validators.required, Validators.minLength(5)])
      this.cla['documentType'].setValidators([Validators.required, Validators.minLength(2)])
      this.cla['contact'].setValidators([Validators.required, Validators.minLength(3)])
      this.cla['userType'].setValidators([Validators.required, Validators.minLength(3)])
      this.cla['foundDate'].setValidators([Validators.required])
      this.cla['name'].updateValueAndValidity();
      this.cla['lastName'].updateValueAndValidity();
      this.cla['document'].updateValueAndValidity();
      this.cla['documentType'].updateValueAndValidity();
      this.cla['contact'].updateValueAndValidity();
      this.cla['userType'].updateValueAndValidity();
      this.cla['foundDate'].updateValueAndValidity();
    }
    else {
      this.cla['name'].clearValidators()
      this.cla['lastName'].clearValidators()
      this.cla['document'].clearValidators()
      this.cla['documentType'].clearValidators()
      this.cla['contact'].clearValidators()
      this.cla['userType'].clearValidators()
      this.cla['foundDate'].clearValidators()
      this.cla['name'].updateValueAndValidity();
      this.cla['lastName'].updateValueAndValidity();
      this.cla['document'].updateValueAndValidity();
      this.cla['documentType'].updateValueAndValidity();
      this.cla['contact'].updateValueAndValidity();
      this.cla['userType'].updateValueAndValidity();
      this.cla['foundDate'].updateValueAndValidity();
    }
    console.log(this.object)
    console.log(this.object.invalid)
  }

  get obj(): { [key: string]: AbstractControl } {
    return this.object.controls;
  }

  get cla(): { [key: string]: AbstractControl } {
    return this.object.controls.claimer.controls;
  }

  get claimer() {
    return this.object.get('claimer') as FormGroup;
  }

  get features() {
    return this.object.get('features') as FormArray;
  }

}
