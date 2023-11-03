import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services';
import { TokenDto } from './../dtos/token.dto';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const userToken: TokenDto = this.authService.getUserToken();
    const authorizationToken = `Bearer ${userToken.access_token}`;

    const req = request.clone({
      setHeaders: {
        Authorization: authorizationToken,
      },
    });

    return next.handle(req);
  }
}
