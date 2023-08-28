import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import jwt_decode from 'jwt-decode';  //npm i jwt-deocde 
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {
  constructor(public auth: AuthService,
    public router: Router,
    private snackbarService: SnackbarService,

  ) { }

  canActivate(route:ActivatedRouteSnapshot): boolean {
    let expectedRoleArray = route.data;  
    expectedRoleArray = expectedRoleArray.expectedRole;  //we will get the expected role/array from the expected role array
    
    const token:any = localStorage.getTem('token');
    //var tokenPayload = jwt_decode(token);  //decoding the token
    var tokenPayload:any
    try{
      tokenPayload = jwt_decode(token);
    }
    catch(err){
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let checkRole = false;

    for(let i=0;i<expectedRoleArray.length;i++){
      if(tokenPayload.role == expectedRoleArray[i]){
        checkRole = true;
      }
    }
    if(tokenPayload.role == 'admin' || tokenPayload.role == 'user'){
      //checkRole = true; we will allow
      if(this.auth.isAuthenticate() && checkRole){
        return true;
      }
      this.snackbarService.openSnackBar(GlobalConstants.unauthorized,GlobalConstants.error);
      this.router.navigate(['/cafe/dashboard']);
      return false;
    }
    else{
      this.router.navigate(['/']);
      localStorage.clear();
      return false;

    }
  }

}
