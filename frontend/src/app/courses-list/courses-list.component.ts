import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';
import {CourseUpdateService} from "../shared/services/course-update.service";

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  // @ts-ignore
  courses: Course[];

  constructor(private courseService: CourseService, private courseUpdateService: CourseUpdateService) { }

  ngOnInit(): void {
    this.getCourses();
    this.courseUpdateService.courseAdded().subscribe(() => {
      this.getCourses();
    })
  }

  getCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => this.courses = courses);
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.courses = this.courses.filter(course => course.id !== id);
    });
  }
}
