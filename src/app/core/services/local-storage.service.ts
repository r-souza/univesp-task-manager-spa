import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  /**
   * Get Item from LocalStorage
   *
   * @param key     LocalStorage Key
   */
  getItem(key: string): string {
    return localStorage.getItem(key) as string;
  }

  /**
   * Add Item to LocalStorage
   *
   * @param key     LocalStorage Key
   * @param value   LocalStorage Value
   */
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * Remote item from LocalStorage
   * @param key     LocalStorage Key
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Remove all items from LocalStorage
   */
  clear(): void {
    localStorage.clear();
  }
}
