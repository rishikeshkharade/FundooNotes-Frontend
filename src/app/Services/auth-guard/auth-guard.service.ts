import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router ) { }
  canActivate():boolean {
    if(localStorage.getItem('authtoken')){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
 