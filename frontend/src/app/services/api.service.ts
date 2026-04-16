import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(path: string, params?: any): Observable<T> {
    const url = `${API_CONFIG.baseUrl}${path}`;
    return this.http.get<T>(url, { params });
  }

  post<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    const url = `${API_CONFIG.baseUrl}${path}`;
    return this.http.post<T>(url, body, { headers });
  }

  put<T>(path: string, body: any): Observable<T> {
    const url = `${API_CONFIG.baseUrl}${path}`;
    return this.http.put<T>(url, body);
  }

  delete<T>(path: string): Observable<T> {
    const url = `${API_CONFIG.baseUrl}${path}`;
    return this.http.delete<T>(url);
  }
}
