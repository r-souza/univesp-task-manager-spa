import { Injectable } from '@angular/core';

import { TokenDto } from './../dtos/token.dto';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private localStorageService: LocalStorageService) {}
  private tokenName = 'access_token';

  /**
   * Verifies if token is already expired
   *
   * @returns boolean
   */
  public isTokenExpired(): boolean {
    if (this.getMinutesToExpire() < 1) {
      return true;
    }

    return false;
  }

  /**
   * Verifies if token will expire in next given minutes.
   *
   * @param  number = 10 minutesToExpire
   * @returns boolean
   */
  public isTokenExpiring(minutesToExpire: number = 10): boolean {
    if (this.getMinutesToExpire() < minutesToExpire) {
      return true;
    }

    return false;
  }

  /**
   * Save token data to localstorage
   *
   * @param  TokenDto data
   * @returns void
   */
  public saveToken(data: TokenDto): void {
    /**
     * Save response information to LocalStorage
     */
    for (const [key, value] of Object.entries(data)) {
      this.localStorageService.setItem(key, value);
    }
  }

  /**
   * Remove token data from localstorage
   *
   * @returns void
   */
  public removeToken(): void {
    this.localStorageService.removeItem(this.tokenName);
    this.localStorageService.removeItem('token_type');
    this.localStorageService.removeItem('expiration');
  }

  /**
   * Returns token info
   *
   * @returns TokenDto
   */
  public getTokenInfo(): TokenDto {
    return {
      access_token: this.localStorageService.getItem(this.tokenName),
      token_type: this.localStorageService.getItem('token_type'),
      expiration: this.localStorageService.getItem('expiration'),
    };
  }

  /**
   * Return minutes until current token expire
   *
   * @returns number
   */
  private getMinutesToExpire(): number {
    const { expiration } = this.getTokenInfo();
    const now = new Date().getTime();
    const expirationTime = new Date(expiration).getTime();

    /**
     * We don't want to return negative numbers ;)
     */
    if (expirationTime < now) {
      return 0;
    }

    /**
     * Get seconds to expire
     */
    const timeToExpire = (expirationTime - now) / 1000;

    /**
     * Return time to expire in minutes
     */
    return Math.round(timeToExpire / 60);
  }
}
