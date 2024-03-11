import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject, switchMap, tap} from 'rxjs';
import { Course } from '../models/course.model';
import {BASE_URL} from "../api-config";
import {ResultService} from "./result.service";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = `${BASE_URL}/courses`;
  private courseDeletedSubject = new Subject<void>();


  constructor(private http: HttpClient,
              private resultService: ResultService
  ) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  addCourse(course: Course): Observable<Course> {
    const payload = { name: course };
    return this.http.post<Course>(this.baseUrl, payload);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/${course.id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    console.log('Deleting course with ID:', id);
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.courseDeletedSubject.next(); // Notify subscribers about course deletion
      })
    );
  }

  courseDeleted(): Observable<void> {
    return this.courseDeletedSubject.asObservable(); // Expose the course deleted event
  }
}
