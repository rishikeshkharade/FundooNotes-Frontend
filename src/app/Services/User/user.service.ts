import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpService: HttpService) { }

  registerUser(payload: any) {
    return this.httpService.postApi('/reg', payload);
  }

  loginUser(payload: any) {
    return this.httpService.postApi('/login', payload);
  }
}

