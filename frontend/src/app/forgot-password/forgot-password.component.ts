import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm:any = FormGroup;
  responseMessage : any;
  
  constructor (private formBuilder: FormBuilder, 
    private userService: UserService, 
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private ngxService: NgxUiLoaderService, 
    private snackbarService: SnackbarService) { 

  }

  ngOnInit(): void {
    //creating form
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]]  //[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$
    });
  }

  //for handle submit button click and hit the API
  handleSubmit(){
    this.ngxService.start(); //displays loader
    var formData = this.forgotPasswordForm.value; //getting the value from the form
    var data = {
      email: formData.email
    }
    //calling the API - userServices
    this.userService.forgotPassword(data).subscribe((response:any)=>{
      this.ngxService.stop(); //stops or hide loader
      this.responseMessage = response?.message; //getting the message from the API
      this.dialogRef.close(); //closes the dialog box
      this.snackbarService.openSnackBar(this.responseMessage,""); //displays the message

    },(error) => {
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
