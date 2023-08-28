import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //creating login form 
  loginForm:any = FormGroup;
  responseMessage : any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null,[Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],  //email validation
      password: [null,[Validators.required]]  
    })
  }

  handleSubmit(){
    this.ngxService.start();  //displays loader
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    this.userService.login(data).subscribe((response:any)=>{
      this.ngxService.stop(); //stops loader
      this.dialogRef.close(); //closes the dialog box

      //the token will be store in local storage (Inspect->Application->Local storage)
      localStorage.setItem('token',response.token);

      this.router.navigate(['/cafe/dashboard']); //route to the same page
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;

      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      
    })
  }
}
