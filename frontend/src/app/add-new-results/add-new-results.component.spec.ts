import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewResultsComponent } from './add-new-results.component';

describe('AddNewResultsComponent', () => {
  let component: AddNewResultsComponent;
  let fixture: ComponentFixture<AddNewResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
