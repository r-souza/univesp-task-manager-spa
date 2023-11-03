import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from '../services';
import { GuestGuard } from './guest.guard';

/**
 * Based on this article
 *
 *  https://keepgrowing.in/angular/how-to-test-angular-Guestguard-examples-for-the-canactivate-interface/
 */

describe('GuestGuard', () => {
  let injector: TestBed;
  let authService: AuthService;
  let guard: GuestGuard;
  const routeMock: any = { snapshot: {} };
  const routeStateMock: any = { snapshot: {}, url: '/home' };
  const routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuestGuard, { provide: Router, useValue: routerMock }],
      imports: [HttpClientTestingModule],
    });
    injector = getTestBed();
    authService = injector.inject(AuthService);
    guard = injector.inject(GuestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('#CanActivate', () => {
    it('should redirect the authenticated user to the home route', () => {
      spyOn(authService, 'isAuthenticated').and.returnValue(true);
      expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['home']);
    });

    it('should allow an unauthenticated user to access the login route', () => {
      spyOn(authService, 'isAuthenticated').and.returnValue(false);
      expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
    });
  });

  describe('#CanActivateChild', () => {
    it('should redirect the authenticated user to the home route', () => {
      spyOn(authService, 'isAuthenticated').and.returnValue(true);
      expect(guard.canActivateChild(routeMock, routeStateMock)).toEqual(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['home']);
    });

    it('should allow an unauthenticated user to access the login route', () => {
      spyOn(authService, 'isAuthenticated').and.returnValue(false);
      expect(guard.canActivateChild(routeMock, routeStateMock)).toEqual(true);
    });
  });
});
