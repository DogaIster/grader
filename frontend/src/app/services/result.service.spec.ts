import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ResultService } from './result.service';
import { Result } from '../models/result.model';

describe('ResultService', () => {
  let service: ResultService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResultService]
    });
    service = TestBed.inject(ResultService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create a new result via the API', () => {
    const newResult: Result = { id: 3, courseId: 3, studentId: 3, score: 'C' };

    service.addResult(newResult).subscribe(result => {
      expect(result).toEqual(newResult);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/results');
    expect(req.request.method).toBe('POST');
    req.flush(newResult);
  });

  it('should retrieve all results from the API', () => {
    const mockResults: Result[] = [
      { id: 1, courseId: 1, studentId: 1, score: 'A' },
      { id: 2, courseId: 2, studentId: 2, score: 'B' }
    ];

    service.getAllResults().subscribe(results => {
      expect(results).toEqual(mockResults);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/results');
    expect(req.request.method).toBe('GET');
    req.flush(mockResults);
  });

  it('should delete a result via the API', () => {
    const resultIdToDelete = 1;

    service.deleteResult(resultIdToDelete).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/results/${resultIdToDelete}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
