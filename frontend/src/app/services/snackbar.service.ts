import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }  //importing MatSnackBar

  //creating method
  openSnackBar(message: string, action:string){  //paramter : its type & message is the message which we want to display
    if(action == 'error'){  //if erorr has occurred, then we will call this where panelClass is black-snackbar
      this.snackbar.open(message,'',{
        horizontalPosition:'center',   //these are parameters of postion for diplaying the message
        verticalPosition:'top',
        duration: 2000,  //2 sec
        panelClass: ['black-snackbar'] //for adding CSS
      });
    }
    else{  //if no error has occurred, then we will call this where panelClass is green-snackbar
      this.snackbar.open(message,'',{
        horizontalPosition:'center',   //these are parameters of postion for diplaying the message
        verticalPosition:'top',
        duration: 2000,  //2 sec
        panelClass: ['green-snackbar'] //for adding CSS
      });
    }
  
  }

}
