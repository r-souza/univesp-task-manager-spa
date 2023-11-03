import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService, TokenService } from '../services';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  /**
   * Remaining Token Life in minutes to Refresh Auth
   */
  refreshTrigger = 5;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    /**
     * We don't want to refresh token for some requests like logout or refresh token itself
     * So we verify url and we throw an error if it's the case
     */
    if (request.url.includes('refresh') || request.url.includes('logout')) {
      return next.handle(request);
    }

    if (
      !this.tokenService.isTokenExpired() &&
      this.tokenService.isTokenExpiring(this.refreshTrigger)
    ) {
      this.authService.refresh();
    }

    return next.handle(request);
  }
}
