import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultService } from '../services/result.service';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { NotificationService } from '../shared/services/notification.service';
import {Course} from "../models/course.model";
import {Student} from "../models/student.model";
import {CourseUpdateService} from "../shared/services/course-update.service";
import {StudentUpdateService} from "../shared/services/student-update.service";
import {ResultUpdateService} from "../shared/services/result-update.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'add-new-results',
  templateUrl: './add-new-results.component.html',
  styleUrls: ['./add-new-results.component.scss']
})
export class AddNewResultsComponent implements OnInit {
  resultForm: FormGroup;
  courses: Course[] = [];
  students: Student[] = [];
  studentOptions: any[] = [];
  courseOptions: any[] = [];
  scoreOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'E', label: 'E' },
    { value: 'F', label: 'F' }
  ];
  // @ts-ignore
  private courseDeletedSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private resultService: ResultService,
    private courseService: CourseService,
    private studentService: StudentService,
    private notificationService: NotificationService,
    private courseUpdateService: CourseUpdateService,
    private studentUpdateService: StudentUpdateService,
    private resultUpdateService: ResultUpdateService
  ) {
    this.resultForm = this.formBuilder.group({
      studentName: ['', Validators.required],
      courseName: ['', Validators.required],
      score: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCourses();
    this.loadStudents();
    this.courseUpdateService.courseAdded().subscribe(() => {
      this.loadCourses();
    });
    this.studentUpdateService.studentAdded().subscribe(() => {
      this.loadStudents();
    });

    this.courseDeletedSub = this.courseService.courseDeleted().subscribe(() => {
      this.loadCourses();
      this.loadStudents();
    });
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courseOptions = courses;
    });
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe(students => {
      this.studentOptions = students.map(student => ({
        id: student.id,
        name: `${student.firstName} ${student.lastName}`
      }));
    });
  }

  get formControls() { return this.resultForm.controls; }

  onSubmit(): void {
    if (this.resultForm.invalid) {
      return;
    }

    const selectedStudentId = this.resultForm.value.studentName;
    const selectedCourseId = this.resultForm.value.courseName;
    const selectedScore = this.resultForm.value.score;

    const resultData = {
      studentId: selectedStudentId,
      courseId: selectedCourseId,
      score: selectedScore
    };

    this.resultService.addResult(resultData).subscribe(
      () => {
        this.notificationService.add('New result added successfully!');
        this.resultForm.reset();
        this.loadCourses();
        this.loadStudents();
        this.resultUpdateService.notifyResultAdded();
      },
      (error) => {
        console.error('Error adding result:', error);
      }
    );
  }
}
