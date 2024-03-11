import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import { Result } from '../models/result.model';
import {BASE_URL} from "../api-config";

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private baseUrl = `${BASE_URL}/results`;
  private addResultSubject = new Subject<void>(); // Subject for result addition

  constructor(private http: HttpClient) { }

  getAllResults(): Observable<Result[]> {
    return this.http.get<Result[]>(this.baseUrl);
  }

  getResultById(id: number): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}/${id}`);
  }

  addResult(result: Result): Observable<Result> {
    return this.http.post<Result>(this.baseUrl, result).pipe(
      // Emit event when result is successfully added
      tap(() => this.addResultSubject.next())
    );
  }

  // Observable to subscribe to for result addition event
  get onResultAdded(): Observable<void> {
    return this.addResultSubject.asObservable();
  }

  updateResult(result: Result): Observable<Result> {
    return this.http.put<Result>(`${this.baseUrl}/${result.id}`, result);
  }

  deleteResult(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteResultsByStudent(studentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/student/${studentId}`);
  }

  deleteResultsByCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/course/${courseId}`);
  }
}
