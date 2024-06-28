// api.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve stories from the API', () => {
    const pageNumber = 1;
    const pageSize = 10;

    const mockStories = [
      { id: 1, title: 'Story 1', url: 'https://example.com/story1' },
      { id: 2, title: 'Story 2', url: 'https://example.com/story2' },
    ];

    service.getStories(pageNumber, pageSize).subscribe((stories) => {
      expect(stories).toEqual(mockStories);
    });

    const req = httpMock.expectOne(`${service.getApi()}/stories?page=${pageNumber}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStories);
  });
});
