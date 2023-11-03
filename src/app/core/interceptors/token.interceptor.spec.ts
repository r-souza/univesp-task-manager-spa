import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from '../services';
import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let service: TokenInterceptor;
  const userToken = {
    access_token: 'dfa04d982caab3cc55b3d683',
    token_type: 'bearer',
    expiration: '1970-01-01 00:00:00',
  };

  beforeEach(() => {
    const authServiceStub = () => ({
      getUserToken: () => userToken,
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenInterceptor,
        { provide: AuthService, useFactory: authServiceStub },
      ],
    });
    service = TestBed.inject(TokenInterceptor);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('intercept', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = TestBed.inject(AuthService);
      const testRequest = new HttpRequest('GET', '/me');
      const handler = { handle: jasmine.createSpy('handler#handle') };

      spyOn(authServiceStub, 'getUserToken').and.callThrough();
      spyOn(testRequest, 'clone').and.callThrough();
      service.intercept(testRequest, handler);

      expect(authServiceStub.getUserToken).toHaveBeenCalled();
      expect(testRequest.clone).toHaveBeenCalled();
      expect(handler.handle).toHaveBeenCalledWith(
        testRequest.clone({
          setHeaders: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        })
      );
    });
  });
});
