import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import { BASE_URL } from "../api-config";
import {Student} from "../models/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = `${BASE_URL}/students`;
  private studentDeletedSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }

  addStudent(firstName: string, lastName: string, dob: string, email: string): Observable<Student> {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      email: email
    };
    return this.http.post<Student>(this.baseUrl, payload);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${student.id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    console.log('Deleting student with ID:', id);
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.studentDeletedSubject.next();
      })
    );
  }

  studentDeleted(): Observable<void> {
    return this.studentDeletedSubject.asObservable();
  }
}
