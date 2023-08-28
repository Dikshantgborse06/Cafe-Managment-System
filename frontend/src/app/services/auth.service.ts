import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //if token exist will return true else navigate to home page and return false
  constructor(private router: Router) { }

  public isAuthenticate(): boolean{
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/']);
      return false;
    }
    else{
      return true;
    }
  }
}
