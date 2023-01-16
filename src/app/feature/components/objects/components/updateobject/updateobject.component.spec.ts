import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateobjectComponent } from './updateobject.component';

describe('UpdateobjectComponent', () => {
  let component: UpdateobjectComponent;
  let fixture: ComponentFixture<UpdateobjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateobjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
