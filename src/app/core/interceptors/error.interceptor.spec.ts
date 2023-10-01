import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from '../services';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let service: ErrorInterceptor;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    const authServiceStub = () => ({ logoutActions: () => ({}) });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ErrorInterceptor,
        { provide: AuthService, useFactory: authServiceStub },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(ErrorInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('should intercept 401 errors', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = TestBed.inject(AuthService);
      const mockErrorResponse = { status: 401, statusText: 'Unauthorized' };

      spyOn(authServiceStub, 'logoutActions').and.callThrough();
      httpClient.get('/error').subscribe();
      const req = httpMock.expectOne('/error');
      req.error(new ErrorEvent('Unauthenticated'), mockErrorResponse);

      expect(authServiceStub.logoutActions).toHaveBeenCalled();
    });
  });

  describe('should log unexpected intercepted errors', () => {
    it('handle unexpected errors', () => {
      const mock400ErrorResponse = { status: 400, statusText: 'Bad Request' };
      spyOn(service, 'intercept').and.callThrough();

      spyOn(console, 'log');
      httpClient.get('/badRequest').subscribe();
      const req = httpMock.expectOne('/badRequest');
      req.error(new ErrorEvent('Bad Request'), mock400ErrorResponse);

      expect(console.log).toHaveBeenCalledWith(400);
      expect(service.intercept).toThrowError();
    });
  });
});
