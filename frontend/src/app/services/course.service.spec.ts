import {Course} from "../models/course.model";
import {CourseService} from "./course.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create a course', () => {
    const newcourse: Course = { id: 1, name: 'Course 1' }


    service.addCourse(newcourse).subscribe((course: any) => {
      expect(course).toEqual(newcourse);
    });

    const request = httpMock.expectOne('http://localhost:3000/api/courses');
    expect(request.request.method).toBe('POST');
    request.flush(newcourse);
  });

  it('should retrieve all courses', () => {
    const courses: Course[] = [
      { id: 1, name: 'Course 1' },
      { id: 2, name: 'Course 2' },
    ];

    service.getAllCourses().subscribe((courses: string | any[]) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(courses);
    });

    const request = httpMock.expectOne('http://localhost:3000/api/courses');
    expect(request.request.method).toBe('GET');
    request.flush(courses);
  });

  it('should retrieve a course by id', () => {
    const courseId = 1;
    const course: Course = { id: 1, name: 'Course 1' };

      service.getCourseById(courseId).subscribe((course: any) => {
      expect(course).toEqual(course);
    });

    const request = httpMock.expectOne(`http://localhost:3000/api/courses/${courseId}`);
    expect(request.request.method).toBe('GET');
    request.flush(course);
  });

  it('should delete a course', () => {
    const courseId = 1;

    service.deleteCourse(courseId).subscribe(() => {
      // Expectations for successful deletion
    });

    const request = httpMock.expectOne(`http://localhost:3000/api/courses/${courseId}`);
    expect(request.request.method).toBe('DELETE');
    request.flush({});
  });
});
