import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultUpdateService {
  // @ts-ignore
  private ResultAddedSubject = new BehaviorSubject<void>(null);

  constructor() { }

  resultAdded(): Observable<void> {
    return this.ResultAddedSubject.asObservable();
  }

  notifyResultAdded(): void {
    this.ResultAddedSubject.next();
  }
}
