import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getRequest<T>(
    url: string,
    params: HttpParams = new HttpParams()
  ): Observable<T> {
    return this.http.get<T>(url, { params });
  }

  postRequest<T>(url: string, resource: any): Observable<T> {
    return this.http.post<T>(
      url,
      resource
    );
  }

  putRequest<T>(url: string, resource: any): Observable<T> {
    return this.http.put<T>(
      url,
      resource
    );
  }

  deleteRequest<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
