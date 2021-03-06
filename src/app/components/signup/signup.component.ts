import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $:any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  inValidStyle:object={'backgroundColor':'gray','border':'gray'};
  error:string ='';
  success:string = '';
  isclicked:boolean =false;
  constructor(private _AuthService:AuthService) { }
  ngOnInit(): void {
    $('#signUp').particleground();
  }

  formData:FormGroup = new FormGroup({
    first_name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    last_name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    age: new FormControl('',[Validators.required, Validators.min(10), Validators.max(99)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
   })

   registerForm() {
     this.isclicked = true;

    if(this.formData.valid) {

      this._AuthService.signUp(this.formData.value).subscribe(respons=>{
        if(respons.message === 'success'){
          this.success = respons.message;
          this.error = '';
          this.isclicked = false; 
          this.formData.reset()
        }else {
          this.error = respons.errors.email.message;
          this.success = '';
          this.isclicked = false; 
        }
      })
    }
  }
}
