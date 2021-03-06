import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare var $:any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  
  inValidStyle={'backgroundColor':'gray','border':'gray'};
  error:string ='';
  success:string = '';
  isclicked:boolean =false;
  constructor(private _AuthService:AuthService, private _Router:Router) { }

  ngOnInit(): void {
    $('#signIn').particleground();
  }
  formData:FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
   })

   registerForm() {
    this.isclicked = true;

   if(this.formData.valid) {

     this._AuthService.signIn(this.formData.value).subscribe(respons=>{
       if(respons.message === 'success'){
         localStorage.setItem('TOKEN',respons.token);
         this.success = respons.message;
         this.error = '';
         this.isclicked = false; 
         this.formData.reset()
         this._Router.navigate(['/profile']);
       }else {
         this.error = respons.message;
         this.success = '';
         this.isclicked = false; 
         console.log(respons);
       }
     })
   }
 }
}
