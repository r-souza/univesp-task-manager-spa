import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';

/**
 * Based on this article
 *
 *  https://keepgrowing.in/angular/how-to-test-angular-authguard-examples-for-the-canactivate-interface/
 */

describe('AuthGuard', () => {
  let injector: TestBed;
  let authService: AuthService;
  let guard: AuthGuard;
  const routeMock: any = { snapshot: {}};
  const routeStateMock: any = { snapshot: {}, url: '/home'};
  const routerMock = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [AuthGuard, { provide: Router, useValue: routerMock }, ],
    imports: [HttpClientTestingModule]
  });
  injector = getTestBed();
  authService = injector.inject(AuthService);
  guard = injector.inject(AuthGuard);
});

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('#CanActivate', () => {
    it('should redirect an unauthenticated user to the login route', () => {
      expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
    });

    it('should allow the authenticated user to access app', () => {
      spyOn(authService, 'isAuthenticated').and.returnValue(true);
      expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
    });
  });

  describe('#CanActivateChild', () => {
    it('should redirect an unauthenticated user to the login route', () => {
      expect(guard.canActivateChild(routeMock, routeStateMock)).toEqual(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
    });

    it('should allow the authenticated user to access app', () => {
      spyOn(authService, 'isAuthenticated').and.returnValue(true);
      expect(guard.canActivateChild(routeMock, routeStateMock)).toEqual(true);
    });
  });

});
