import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

export class DummyPerson {
  name!: string;
}

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

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('#getRequest', () => {
    it('should return an Observable<DummyPerson[]>', () => {
      const dummyPeople: DummyPerson[] = [
        { name: 'John Doe' },
        { name: 'Doe' },
      ];

      service.getRequest<DummyPerson[]>('/dummy/people').subscribe((data) => {
        expect(data.length).toBe(2);
        expect(data).toEqual(dummyPeople);
      });

      const req = httpMock.expectOne('/dummy/people');
      expect(req.request.method).toBe('GET');
      req.flush(dummyPeople);
    });
  });

  describe('#postRequest', () => {
    it('should return an Observable<DummyPerson[]>', () => {
      const dummyPeople: DummyPerson[] = [
        { name: 'John Doe' },
        { name: 'Doe' },
      ];

      service
        .postRequest<DummyPerson[]>('/dummy/people', dummyPeople)
        .subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data).toEqual(dummyPeople);
        });

      const req = httpMock.expectOne('/dummy/people');
      expect(req.request.method).toBe('POST');
      req.flush(dummyPeople);
    });
  });

  describe('#putRequest', () => {
    it('should return an Observable<DummyPerson>', () => {
      const dummyPerson: DummyPerson = {
        name: 'John Doe',
      };

      service
        .putRequest<DummyPerson>('/dummy/people/1', dummyPerson)
        .subscribe((data) => {
          expect(data).toEqual(dummyPerson);
        });

      const req = httpMock.expectOne('/dummy/people/1');
      expect(req.request.method).toBe('PUT');
      req.flush(dummyPerson);
    });
  });

  describe('#deleteRequest', () => {
    it('should return an Observable<DummyPerson>', () => {
      service.deleteRequest<any>('/dummy/people/1').subscribe((data) => {
        expect(data).toEqual('');
      });

      const req = httpMock.expectOne('/dummy/people/1');
      expect(req.request.method).toBe('DELETE');
      req.flush('', { status: 204, statusText: 'No Content' });
    });
  });
});
