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
}
