import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStudentsComponent } from './add-new-students.component';

describe('AddNewStudentsComponent', () => {
  let component: AddNewStudentsComponent;
  let fixture: ComponentFixture<AddNewStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
