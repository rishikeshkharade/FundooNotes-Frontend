import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  BASE_URL: string = 'https://localhost:44373'; 

  getHeader(): HttpHeaders {
    const token = localStorage.getItem('authtoken') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  
  

  getApi<T>(endpoint: string, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    return this.http.get<T>(this.BASE_URL + endpoint, { headers });
  }
  
  postApi<T>(endpoint: string, payload: any, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    return this.http.post<T>(this.BASE_URL + endpoint, payload, { headers });
  }

  putApi<T>(endpoint: string, payload: any, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    return this.http.put<T>(this.BASE_URL + endpoint, payload, { headers });
  }

  deleteApi<T>(endpoint: string, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    return this.http.delete<T>(this.BASE_URL + endpoint, { headers });
  }
}