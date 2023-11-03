import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivateChild, CanActivate {
  constructor(private authService: AuthService, public router: Router) {}

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /**
     * Only accept the request if user is not authenticated
     */
    if (!this.authService.isAuthenticated()) {
      return true;
    }

    /**
     * If already authenticated, redirect user to initial route
     */
    this.router.navigate(['home']);

    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /**
     * Only accept the request if user is not authenticated
     */
    if (!this.authService.isAuthenticated()) {
      return true;
    }

    /**
     * If already authenticated, redirect user to initial route
     */
    this.router.navigate(['home']);

    return false;
  }
}
