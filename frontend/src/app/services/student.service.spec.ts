// student.service.spec.ts

import {Student} from "../models/student.model";
import {StudentService} from "./student.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";

describe('StudentService', () => {
  let service: StudentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentService]
    });
    service = TestBed.inject(StudentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create a student', () => {
    const newStudent: Student = { id: 1, firstName: 'John', lastName: 'Doe', dob: '1993-04-23', email: 'john.doe@gmail.com' }

    service.addStudent(newStudent).subscribe((student: any) => {
      expect(student).toEqual(newStudent);
    });

    const request = httpMock.expectOne('http://localhost:3000/api/students');
    expect(request.request.method).toBe('POST');
    request.flush(newStudent);
  });

  it('should retrieve all students', () => {
    const dummyStudents: Student[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', dob: '1993-04-23', email: 'john.doe@gmail.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', dob: '1995-02-18', email: 'jane.smith@gmail.com' }
    ];

    service.getAllStudents().subscribe((students: string | any[]) => {
      expect(students.length).toBe(2);
      expect(students).toEqual(dummyStudents);
    });

    const request = httpMock.expectOne('http://localhost:3000/api/students');
    expect(request.request.method).toBe('GET');
    request.flush(dummyStudents);
  });

  it('should retrieve a student by id', () => {
    const studentId = 1;
    const dummyStudent: Student = { id: studentId, firstName: 'John', lastName: 'Doe', dob: '1993-04-23', email: 'john.doe@gmail.com' };

    service.getStudentById(studentId).subscribe((student: any) => {
      expect(student).toEqual(dummyStudent);
    });

    const request = httpMock.expectOne(`http://localhost:3000/api/students/${studentId}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyStudent);
  });

  it('should delete a student', () => {
    const studentId = 1;

    service.deleteStudent(studentId).subscribe(() => {
      // Expectations for successful deletion
    });

    const request = httpMock.expectOne(`http://localhost:3000/api/students/${studentId}`);
    expect(request.request.method).toBe('DELETE');
    request.flush({});
  });
});
