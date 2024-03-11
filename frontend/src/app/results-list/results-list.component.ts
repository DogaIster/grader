import {Component, OnInit} from '@angular/core';
import { ResultService } from '../services/result.service';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { Result } from '../models/result.model';
import {Student} from "../models/student.model";
import {Course} from "../models/course.model";
import {ResultUpdateService} from "../shared/services/result-update.service";
import {CourseUpdateService} from "../shared/services/course-update.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit {
  results: Result[] = [];
  courses: Course[] = [];
  students: Student[] = [];
  // @ts-ignore
  private courseDeletedSub: Subscription;
  // @ts-ignore
  private studentDeletedSub: Subscription;

  constructor(
    private resultService: ResultService,
    private courseService: CourseService,
    private studentService: StudentService,
    private resultUpdateService: ResultUpdateService
  ) {}

  ngOnInit(): void {
    this.loadResults();
    this.loadCourses();
    this.loadStudents();

    this.resultUpdateService.resultAdded().subscribe(() => {
      this.loadResults();
      this.loadCourses();
      this.loadStudents();
    });

    this.courseDeletedSub = this.courseService.courseDeleted().subscribe(() => {
      console.log('Course deletion event received');
      // this.loadResults(); // Reload results list when a course is deleted
      this.loadResults();
      this.loadCourses();
      this.loadStudents();
    });

    this.studentDeletedSub = this.studentService.studentDeleted().subscribe(() => {
      console.log('Student deletion event received');
      // this.loadResults(); // Reload results list when a course is deleted
      this.loadResults();
      this.loadCourses();
      this.loadStudents();
    });
  }


  ngOnDestroy(): void {
    this.studentDeletedSub.unsubscribe();
    this.courseDeletedSub.unsubscribe(); // Unsubscribe from course deletion event
  }

  loadResults(): void {
    this.resultService.getAllResults().subscribe(results => {
      this.results = results;
    });
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe(data => {
      this.students = data.map((student: any) => ({
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        dob: student.dob,
        email: student.email
      }));
    });
  }

  isCourseValid(courseId: number): boolean {
    return this.courses.some(course => course.id === courseId);
  }

  isStudentValid(studentId: number): boolean {
    return this.students.some(student => student.id === studentId);
  }

  getCourseName(courseId: number): string {
    const course = this.courses.find(course => course.id === courseId);
    return course ? course.name : 'Unknown Course';
  }

  getStudentName(studentId: number): string {
    const student = this.students.find(student => student.id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'Unknown Student';
  }
}
