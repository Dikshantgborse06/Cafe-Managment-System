//g - generate , s - service
//ng g s user
//ng g s snackabar   - used to display the messages

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';  //import the env file

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl; //for routing purpose by 'ctrl key'
  constructor(private httpClient:HttpClient) { }

  signup(data:any){  //'signup' is a method in which 'data' is a body which we has to pass and then it hits the URL mentioned inside the post() 
    return this.httpClient.post(this.url + "/user/signup", data,{
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  //writing method for forgettig password
  forgotPassword(data:any){
    return this.httpClient.post(this.url + "/user/forgotPassword", data,{  
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
  //Here "/user/forgotPassword" is the URL and data is the thing which we have to send in the body and st the header
//4:42:20 we are genrating an component for forgotting password || command: ng g c forgot-password

 // Login
  login(data:any){
    return this.httpClient.post(this.url + "/user/login/", data,{
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
  //after this generate new component for login || command: ng g c login


  checkToken(){
    return this.httpClient.get(this.url + "/user/checkToken");
  }

  //changePassword and Logout
  changePassword(data:any){  //data can of any type
      return this.httpClient.post(this.url + "/user/changePassword", data,{  
        headers: new HttpHeaders().set('Content-Type', "application/json")
      })
  }

  getUsers(){
    return this.httpClient.get(this.url + "/user/get/");

  }

  update(data:any){
    return this.httpClient.patch(this.url + "/user/update/", data,{
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }
}
