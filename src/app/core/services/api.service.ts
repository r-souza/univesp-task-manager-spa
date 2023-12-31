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

  getById<T>(resourceUrl: string, id: number): Observable<T> {
    const url = `${resourceUrl}/${id}`;
    return this.getRequest<T>(url);
  }

  postRequest<T>(url: string, resource: any): Observable<T> {
    return this.http.post<T>(url, resource);
  }

  putRequest<T>(url: string, resource: any): Observable<T> {
    return this.http.put<T>(url, resource);
  }

  patchRequest<T>(url: string, resource: any): Observable<T> {
    return this.http.patch<T>(url, resource);
  }

  deleteRequest<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
