import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
constructor(private authService:AuthService){
}

  registrationForm=new FormGroup({
    firstName:new FormControl("", [Validators.required,Validators.pattern("[A-Z].*")]),
    lastName:new FormControl("",[Validators.required, Validators.pattern("[A-Z].*")]),
    emailId:new FormControl("",[Validators.required,Validators.email]),
    username:new FormControl("",[Validators.required]),
    country: new FormControl("",[Validators.required,Validators.pattern("[A-Za-z]*")]),
    password:new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
    phone:new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(12),Validators.pattern("[0-9]*")])
  });

  //Userdefined valodator. It is an upperCase validation
  upperCaseValidator(control:AbstractControl):{[key:string]:boolean} | null {
     if(!/[A-Z]/.test(control.value)){
      return {uppercase:true};
     }
     return null;
  }

  validateFirstName() :String{
     let error="";
     if(this.registrationForm.get("firstName")?.touched && this.registrationForm.get("firstName")?.invalid){
      error="Fristname should be capital & can't null !";
     }
     return error;
  }

  validateLastName() :String{
    let error="";
    if(this.registrationForm.get("lastName")?.touched && this.registrationForm.get("lastName")?.invalid){
     error="Lastname should be capital & can't null !";
    }
    return error;
 }

 validateEmail() :string{
  let error="";
 if(this.registrationForm.get("emailId")?.touched && this.registrationForm.get("emailId")?.invalid ){
  if(this.registrationForm.get("emailId")?.hasError('required')){
   error="Email can't be null";
  }else if(this.registrationForm.get("emailId")?.hasError('email')){
     error="Should maintain proper email signature"
  }
 }
 return error;
 }

 validateUserName(){
  let error="";
  if(this.registrationForm.get("username")?.touched && this.registrationForm.get("username")?.invalid ){
     if(this.registrationForm.get("username")?.hasError('required'))
     error="UserName can't be null"
  }
  return error;
 }

 validateCountry(){
  let error="";
  if(this.registrationForm.get("country")?.touched && this.registrationForm.get("country")?.invalid){
    if(this.registrationForm.get("country")?.hasError('required')){
      error="Country can't be null";
    }else if(this.registrationForm.get("country")?.hasError('pattern')){
      error="Country should be combination of alphabet"
    }
  }
  return error;
 }

 validatePassword(){
  let error="";
  if(this.registrationForm.get("password")?.touched && this.registrationForm.get("password")?.invalid ){
     if(this.registrationForm.get("password")?.hasError('required')){
     error="Password can't be null";
     }else if(this.registrationForm.get("password")?.hasError('minlength')){
      error="Password can't be less than 6";
     }else if(this.registrationForm.get("password")?.hasError('maxlength')){
      error="Password can't be more than 10";
     }
  }
  return error;
 }

 validateMobile(){
  let error="";
  if(this.registrationForm.get("phone")?.touched && this.registrationForm.get("phone")?.invalid ){
     if(this.registrationForm.get("phone")?.hasError('required')){
     error="Mobile number can't be null";
     }else if(this.registrationForm.get("phone")?.hasError('minlength')){
      error="Mobile number can't be less than 10";
     }else if(this.registrationForm.get("phone")?.hasError('maxlength')){
      error="Mobile number can't be more than 12";
     }else if(this.registrationForm.get("phone")?.hasError('pattern')){
      error="Only 0-9 digits are allowed ";
     }

  }
  return error;
 }

register(){
  this.authService.registerUser(this.registrationForm.value).subscribe(
    (res)=>{
      console.log(res);
      alert("User register successfully")
    }
  )
}
//to show in console
  // signUp(){
  //   console.log(this.registrationForm.value);
  // }
}
