import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { TokenDto } from './../dtos/token.dto';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

describe('AuthService', () => {
  let service: AuthService;
  let tokenService: TokenService;
  let apiService: ApiService;

  const routeMock: any = { snapshot: {} };
  const routerMock = { navigate: jasmine.createSpy('navigate') };

  const providerTokenMock = 'dfa04d982c386d3b55cc3baac289d40afdaab3cc55b3d683';
  const tokenDataMock: TokenDto = {
    access_token: 'dfa04d982caab3cc55b3d683',
    token_type: 'bearer',
    expiration: '1970-01-01 00:00:00',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, { provide: Router, useValue: routerMock }],
      imports: [HttpClientModule],
    });

    tokenService = TestBed.inject(TokenService);
    apiService = TestBed.inject(ApiService);

    TestBed.inject(ApiService);

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should verify when user is Authenticated', () => {
    spyOn(tokenService, 'isTokenExpired').and.returnValue(false);
    expect(service.isAuthenticated()).toEqual(true);
  });

  it('should verify when user IS NOT authenticated', () => {
    spyOn(tokenService, 'isTokenExpired').and.returnValue(true);
    expect(service.isAuthenticated()).toEqual(false);
  });

  it('should get the current user', () => {
    const mockUserData = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
    /**
     * Mock apiService response
     */
    spyOn(apiService, 'getRequest').and.returnValue(of(mockUserData));

    expect(
      service.getCurrentUser().subscribe((data) => {
        expect(data).toEqual(mockUserData);
      })
    );
  });

  it('should login a user', () => {
    /**
     * Mock apiService response
     */
    spyOn(apiService, 'getRequest').and.returnValue(of(tokenDataMock));
    spyOn(tokenService, 'saveToken');

    service.login(providerTokenMock);

    expect(tokenService.saveToken).toHaveBeenCalledWith(tokenDataMock);
  });

  it('should handle request errors when logging in a user', () => {
    const requestError = { status: 500 };
    /**
     * Mock apiService response
     */
    spyOn(apiService, 'getRequest').and.returnValue(throwError(requestError));

    service.login(providerTokenMock);

    expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should handle token service errors when logging in a user', () => {
    /**
     * Mock apiService response
     */
    spyOn(apiService, 'getRequest').and.returnValue(of(tokenDataMock));
    spyOn(tokenService, 'saveToken').and.throwError('Cannot save token');

    service.login(providerTokenMock);

    expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should redirect after login', () => {
    /**
     * Mock apiService response
     */
    spyOn(apiService, 'getRequest').and.returnValue(of(tokenDataMock));
    spyOn(tokenService, 'isTokenExpired').and.returnValue(false);

    service.login(providerTokenMock);

    expect(routerMock.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should logout a user', () => {
    /**
     * Mock apiService response
     */
    spyOn(apiService, 'getRequest').and.returnValue(
      of({
        message: 'Successfully logged out',
      })
    );
    spyOn(tokenService, 'removeToken');

    service.logout();

    expect(tokenService.removeToken).toHaveBeenCalled();
  });

  it('should handle errors when logged out a user', () => {
    /**
     * Mock apiService response
     */
    spyOn(apiService, 'getRequest').and.returnValue(
      throwError({ status: 400 })
    );
    spyOn(tokenService, 'removeToken');

    service.logout();

    expect(tokenService.removeToken).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should redirect after logout', () => {
    /**
     * Mock apiService response
     */
    spyOn(apiService, 'getRequest').and.returnValue(
      of({
        message: 'Successfully logged out',
      })
    );
    spyOn(tokenService, 'isTokenExpired').and.returnValue(true);

    service.logout();

    expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should refresh auth', () => {
    /**
     * Mock apiService response
     */
    spyOn(apiService, 'getRequest').and.returnValue(of(tokenDataMock));
    spyOn(tokenService, 'removeToken');
    spyOn(tokenService, 'saveToken');

    service.refresh();

    expect(tokenService.removeToken).toHaveBeenCalled();
    expect(tokenService.saveToken).toHaveBeenCalledWith(tokenDataMock);
  });

  it('should handle token service errors when refreshing auth', () => {
    /**
     * Mock apiService response
     */
    spyOn(apiService, 'getRequest').and.returnValue(of(tokenDataMock));
    spyOn(tokenService, 'saveToken').and.throwError('Cannot save token');

    service.refresh();

    expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should get User Token', () => {
    spyOn(tokenService, 'getTokenInfo').and.returnValue(tokenDataMock);

    expect(service.getUserToken()).toEqual(tokenDataMock);
    expect(tokenService.getTokenInfo).toHaveBeenCalled();
  });
});
