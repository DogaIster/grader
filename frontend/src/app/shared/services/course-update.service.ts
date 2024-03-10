import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseUpdateService {
  // @ts-ignore
  private CourseAddedSubject = new BehaviorSubject<void>(null);

  constructor() { }

  courseAdded(): Observable<void> {
    return this.CourseAddedSubject.asObservable();
  }

  notifyCourseAdded(): void {
    this.CourseAddedSubject.next();
  }
}
