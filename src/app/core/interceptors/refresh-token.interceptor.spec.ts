import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService, TokenService } from '../services';
import { RefreshTokenInterceptor } from './refresh-token.interceptor';

describe('RefreshTokenInterceptor', () => {
  let service: RefreshTokenInterceptor;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  const refreshTrigger = 5;

  beforeEach(() => {
    const authServiceStub = () => ({ refresh: () => ({}) });
    const tokenServiceStub = () => ({
      isTokenExpired: () => ({}),
      isTokenExpiring: () => ({}),
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RefreshTokenInterceptor,
        { provide: AuthService, useFactory: authServiceStub },
        { provide: TokenService, useFactory: tokenServiceStub },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RefreshTokenInterceptor,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(RefreshTokenInterceptor);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`refreshTrigger has default value`, () => {
    expect(service.refreshTrigger).toEqual(refreshTrigger);
  });

  describe('intercept', () => {
    it('should refresh token', () => {
      const authServiceStub: AuthService = TestBed.inject(AuthService);
      const tokenServiceStub: TokenService = TestBed.inject(TokenService);
      spyOn(service, 'intercept').and.callThrough();

      spyOn(tokenServiceStub, 'isTokenExpired').and.returnValue(false);
      spyOn(tokenServiceStub, 'isTokenExpiring').and.returnValue(true);
      spyOn(authServiceStub, 'refresh');

      httpClient.get('/me').subscribe();

      expect(tokenServiceStub.isTokenExpiring).toHaveBeenCalledWith(
        refreshTrigger
      );
      expect(tokenServiceStub.isTokenExpired).toHaveBeenCalled();
      expect(authServiceStub.refresh).toHaveBeenCalled();
    });

    it('should not refresh token for auth routes', () => {
      const authServiceStub: AuthService = TestBed.inject(AuthService);
      const tokenServiceStub: TokenService = TestBed.inject(TokenService);
      spyOn(service, 'intercept').and.callThrough();

      spyOn(authServiceStub, 'refresh');
      httpClient.get('/auth/logout').subscribe();

      expect(authServiceStub.refresh).not.toHaveBeenCalled();
    });

    it('should not refresh token when token is not expiring', () => {
      const authServiceStub: AuthService = TestBed.inject(AuthService);
      const tokenServiceStub: TokenService = TestBed.inject(TokenService);

      spyOn(service, 'intercept').and.callThrough();
      spyOn(tokenServiceStub, 'isTokenExpired').and.returnValue(false);
      spyOn(tokenServiceStub, 'isTokenExpiring').and.returnValue(false);
      spyOn(authServiceStub, 'refresh');
      httpClient.get('/me').subscribe();

      expect(authServiceStub.refresh).not.toHaveBeenCalled();
    });

    it('should not refresh token when token is already expired', () => {
      const authServiceStub: AuthService = TestBed.inject(AuthService);
      const tokenServiceStub: TokenService = TestBed.inject(TokenService);

      spyOn(service, 'intercept').and.callThrough();
      spyOn(tokenServiceStub, 'isTokenExpired').and.returnValue(true);
      spyOn(tokenServiceStub, 'isTokenExpiring').and.returnValue(false);
      spyOn(authServiceStub, 'refresh');
      httpClient.get('/me').subscribe();

      expect(authServiceStub.refresh).not.toHaveBeenCalled();
    });
  });
});
