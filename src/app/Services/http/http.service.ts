import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private Http : HttpClient) { }
  baseUrl: string = '';
  getHeaders() {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem('token') || ""
    });
    return headers;
  }
  getAPI(endpoint: string, headers: HttpHeaders = new HttpHeaders()){

    return this.Http.get(this.baseUrl + endpoint, { headers });
  }

  postAPI(endpoint: string, data: any, headers: HttpHeaders = new HttpHeaders()){

    return this.Http.post(this.baseUrl + endpoint, data, { headers });
  }
  // For example, if you want to use this method for updating user details
  // you can pass the endpoint as '/user/update' and the data as the user object
  putAPI(endpoint: string, data: any, headers: HttpHeaders = new HttpHeaders()){
    return this.Http.put(this.baseUrl + endpoint, data, { headers });
  }

  deleteAPI(endpoint: string, headers: HttpHeaders = new HttpHeaders()){
    return this.Http.delete(this.baseUrl + endpoint, { headers });
  }
}
