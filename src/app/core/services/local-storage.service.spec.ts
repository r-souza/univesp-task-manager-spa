import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should can read localstorage', () => {
    const key = 'testKey';
    const data = 'localstorage content';

    localStorage.setItem(key, data);

    expect(service.getItem(key)).toEqual(data);
  });

  it('should can write to localstorage', () => {
    const key = 'testKey';
    const data = 'localstorage content';

    service.setItem(key, data);

    expect(localStorage.getItem(key)).toEqual(data);
  });

  it('should can delete from localstorage', () => {
    const key = 'testKey';
    const data = 'localstorage content';

    localStorage.setItem(key, data);
    service.removeItem(key);

    expect(localStorage.getItem(key)).toBeNull();
  });

  it('should clear localstorage', () => {
    const key = 'testKey';
    const data = 'localstorage content';

    localStorage.setItem(key, data);
    service.clear();

    expect(localStorage.length).toEqual(0);
  });
});
