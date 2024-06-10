import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

constructor(private loginService: AuthService, private router: Router){}

  loginForm=new FormGroup({
    username : new FormControl("",[Validators.required]),
    password : new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(10)])
});

validateUsername(){
  let error="";
  if(this.loginForm.get("username")?.touched && this.loginForm.get("username")?.invalid){
    if(this.loginForm.get("username")?.hasError('required')){
       error="Username Can't be null !"
    } 
  } 
  return error;
  }

validatePassword(){
  let error="";
  if(this.loginForm.get("password")?.touched && this.loginForm.get("password")?.invalid){
    if(this.loginForm.get("password")?.hasError('required')){
       error="Password can't be null"
    }else if(this.loginForm.get("password")?.hasError('minlength')){
      error="Password can't be less than 6"
   } else if(this.loginForm.get("password")?.hasError('maxlength')){
    error="Password can't be more than 10"
 }
  }
  return error;
}

isUserValid:boolean=false;


signIn(uname:string, pwd:string){
let data={
  'username':uname,
  'password':pwd
}

sessionStorage.setItem('username',uname);

  this.loginService.loginUser(data).subscribe(
    
    (res) =>{
      console.log(res.token);
      sessionStorage.setItem("myToken", res.token);
      this.router.navigateByUrl('dashboard')
      alert("Login success !")
    },
    (err)=>{
      console.log(err.error);
      alert("UserName and Password mismatch!")
    }
    
  )
  
}

//to show in console
// login(){
//   console.log(this.loginForm.value);
//   alert("Login success")
// }



}

