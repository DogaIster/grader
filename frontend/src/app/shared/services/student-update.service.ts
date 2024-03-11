import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentUpdateService {
  // @ts-ignore
  private studentAddedSubject = new BehaviorSubject<void>(null);
  private deleteStudentSubject = new Subject<number>();


  constructor() { }

  studentAdded(): Observable<void> {
    return this.studentAddedSubject.asObservable();
  }

  notifyStudentAdded(): void {
    this.studentAddedSubject.next();
  }

// Method to emit event when student is deleted
  emitStudentDeleted(studentId: number) {
    this.deleteStudentSubject.next(studentId);
  }

  // Observable to subscribe to for student deletion event
  get onStudentDeleted() {
    return this.deleteStudentSubject.asObservable();
  }
}
