import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseUpdateService {
  // @ts-ignore
  private courseAddedSubject = new BehaviorSubject<void>(null);

  constructor() { }

  courseAdded(): Observable<void> {
    return this.courseAddedSubject.asObservable();
  }

  notifyCourseAdded(): void {
    this.courseAddedSubject.next();
  }
}
