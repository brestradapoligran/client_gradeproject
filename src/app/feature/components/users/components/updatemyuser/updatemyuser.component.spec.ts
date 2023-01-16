import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemyuserComponent } from './updatemyuser.component';

describe('UpdatemyuserComponent', () => {
  let component: UpdatemyuserComponent;
  let fixture: ComponentFixture<UpdatemyuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatemyuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatemyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
