import { TestBed } from '@angular/core/testing';

import { TokenDto } from './../dtos/token.dto';
import { LocalStorageService } from './local-storage.service';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  let localStorageService: LocalStorageService;

  /**
   * Mock data
   */
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  const tokenDataMock: TokenDto = {
    access_token: 'dfa04d982caab3cc55b3d683',
    token_type: 'bearer',
    expiration: expiration.toString()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorageService = TestBed.inject(LocalStorageService);
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should verify when token is not expired', () => {
    /**
     * Remove all data from localstorage before run the test
     */
    localStorage.clear();
    /**
     * Mock the saveToken method, since it isn't the test focus
     */
    spyOn(service, 'saveToken').and.callFake(() => {
      for (const [key, value] of Object.entries(tokenDataMock)) {
        localStorage.setItem(key, String(value));
      }
    });
    service.saveToken(tokenDataMock);

    expect(service.isTokenExpired()).toEqual(false);
  });

  it('should verify when token is expired when localstorage is null', () => {
    spyOn(localStorageService, 'getItem').and.returnValue(null);

    expect(service.isTokenExpired()).toEqual(true);
  });

  it('should verify when token is expired', () => {
    /**
     * Remove all data from localstorage before run the test
     */
    localStorage.clear();
    const mock = {... tokenDataMock};

    const exp = new Date();
    /**
     * We set the expiration to 3 hours ago,
     * so the token should be expired when expect run
     */
    exp.setHours(exp.getHours() - 3);
    mock.expiration = exp.toString();

    /**
     * Mock the saveToken method, since it isn't the test focus
     */
    spyOn(service, 'saveToken').and.callFake(() => {
      for (const [key, value] of Object.entries(mock)) {
        localStorage.setItem(key, String(value));
      }
    });
    service.saveToken(tokenDataMock);

    expect(service.isTokenExpired()).toEqual(true);
  });

  it('should save token', () => {
    /**
     * Remove all data from localstorage before run the test
     */
    localStorage.clear();

    service.saveToken(tokenDataMock);

    expect(localStorage.length).toEqual(3);
    expect(localStorage.getItem('access_token')).toEqual(tokenDataMock.access_token);
  });

  it('should remove token', () => {
    /**
     * Remove all data from localstorage before run the test
     */
    localStorage.clear();
    /**
     * Mock the saveToken method, since it isn't the test focus
     */
    spyOn(service, 'saveToken').and.callFake(() => {
      for (const [key, value] of Object.entries(tokenDataMock)) {
        localStorage.setItem(key, String(value));
      }
    });
    service.saveToken(tokenDataMock);

    service.removeToken();
    expect(localStorage.length).toEqual(0);
  });

  it('should get token info', () => {
    /**
     * Remove all data from localstorage before run the test
     */
    localStorage.clear();
    /**
     * Mock the saveToken method, since it isn't the test focus
     */
    spyOn(service, 'saveToken').and.callFake(() => {
      for (const [key, value] of Object.entries(tokenDataMock)) {
        localStorage.setItem(key, String(value));
      }
    });
    service.saveToken(tokenDataMock);

    expect(service.getTokenInfo()).toEqual(tokenDataMock);
  });

  it('should verify if token is expiring', () => {
    /**
     * Remove all data from localstorage before run the test
     */
    localStorage.clear();

    /**
     * Mock the saveToken method, since it isn't the test focus
     */
    spyOn(service, 'saveToken').and.callFake(() => {
      for (const [key, value] of Object.entries(tokenDataMock)) {
        localStorage.setItem(key, String(value));
      }
    });
    service.saveToken(tokenDataMock);

    expect(service.isTokenExpiring()).toBeFalse();
    expect(service.isTokenExpiring(15)).toBeFalse();
    expect(service.isTokenExpiring(120)).toBeTrue();
  });

});
