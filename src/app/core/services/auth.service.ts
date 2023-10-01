import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../../shared/models/user.model';
import { TokenDto } from '../dtos/token.dto';
import { MessageResponseDto } from './../dtos/message-response.dto';
import { ApiService } from './api.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.apiBaseUrl}/auth/passport/callback`;
  private logoutUrl = `${environment.apiBaseUrl}/auth/logout`;
  private refreshUrl = `${environment.apiBaseUrl}/auth/refresh`;
  private currentUserUrl = `${environment.apiBaseUrl}/me`;

  constructor(
    private tokenService: TokenService,
    private apiService: ApiService,
    private router: Router
  ) {}

  public isAuthenticated(): boolean {
    if (!this.tokenService.isTokenExpired()) {
      return true;
    }

    return false;
  }

  public login(providerToken: string): void {
    const params = new HttpParams().set('code', providerToken);

    this.apiService.getRequest<TokenDto>(this.authUrl, params).subscribe(
      (data) => {
        try {
          this.tokenService.saveToken(data);
        } catch {
          this.tokenService.removeToken();
          console.error('Error on save token');
          this.router.navigate(['login']);
        }
        return this.redirectAfterLoggedIn();
      },
      (errorData) => {
        console.error(errorData);
        this.router.navigate(['login']);
      }
    );
  }

  public logout(): void {
    this.apiService.getRequest<MessageResponseDto>(this.logoutUrl).subscribe(
      (data: MessageResponseDto) => {
        this.logoutActions();
      },
      (errorData) => {
        console.error(errorData);
        this.logoutActions();
      }
    );
  }

  public logoutActions(): void {
    this.tokenService.removeToken();
    this.redirectAfterLoggedOut();
  }

  public refresh(): void {
    this.apiService.getRequest<TokenDto>(this.refreshUrl).subscribe((data) => {
      try {
        this.tokenService.removeToken();
        this.tokenService.saveToken(data);
      } catch {
        console.error('Error on refresh token');
        this.router.navigate(['login']);
      }
    });
  }

  public getCurrentUser(): Observable<User> {
    return this.apiService.getRequest<User>(this.currentUserUrl);
  }

  public getUserToken(): TokenDto {
    return this.tokenService.getTokenInfo();
  }

  private redirectAfterLoggedIn(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  /**
   * Redirect to login route
   * @returns void
   */
  private redirectAfterLoggedOut(): void {
    this.router.navigate(['login']);
  }
}
