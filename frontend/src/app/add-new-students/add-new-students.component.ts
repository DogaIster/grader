import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { StudentService } from '../services/student.service';
import {NotificationService} from "../shared/services/notification.service";

@Component({
  selector: 'add-new-students',
  templateUrl: './add-new-students.component.html',
  styleUrls: ['./add-new-students.component.scss']
})
export class AddNewStudentsComponent {
  studentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private notificationService: NotificationService
  ) {
    this.studentForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dob: ['', [Validators.required, this.minAgeValidator(10)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
  }

  get formControls() { return this.studentForm.controls; }

  onSubmit() {
    if (this.studentForm.invalid) {
      return;
    }

    const firstName = this.studentForm.get('firstName')?.value;
    const lastName = this.studentForm.get('lastName')?.value;
    const dob = this.studentForm.get('dob')?.value;
    const email = this.studentForm.get('email')?.value;

    this.studentService.addStudent(firstName, lastName, dob, email).subscribe(
      (response) => {
        console.log('Student added successfully:', response);
        this.notificationService.add('New student added successfully!');
        this.studentForm.reset();
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }

  // Custom validator function
  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const today = new Date();
      const dob = new Date(control.value);
      let age = today.getFullYear() - dob.getFullYear();

      if (dob.getMonth() > today.getMonth() ||
        (dob.getMonth() === today.getMonth() && dob.getDate() > today.getDate())) {
        age--; // Subtract one year if the birthday hasn't occurred yet this year
      }

      return age >= minAge ? null : { minAge: { requiredAge: minAge, actualAge: age } };
    };
  }
}
