import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetObjectComponent } from './get-object.component';

describe('GetObjectComponent', () => {
  let component: GetObjectComponent;
  let fixture: ComponentFixture<GetObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetObjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
