import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../shared/services/notification.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'add-new-courses',
  templateUrl: './add-new-courses.component.html',
  styleUrls: ['./add-new-courses.component.scss']
})
export class AddNewCoursesComponent {
  courseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private notificationService: NotificationService,
  ) {
    this.courseForm = this.formBuilder.group({
      courseName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get formControls() { return this.courseForm.controls; }

  onSubmit() {
    if (this.courseForm.invalid) {
      return;
    }

    const courseName = this.courseForm.get('courseName')?.value;

    this.courseService.addCourse(courseName).subscribe(
      () => {
        this.notificationService.add('New course added successfully!');
        this.courseForm.reset();
      },
      (error) => {
        console.error('Error adding course:', error);
      }
    );
  }
}
