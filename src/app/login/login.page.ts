import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';  
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  Username: string = '';
  Password: string = '';
  public errorMessages = {
    username:[
      { type:'required',  message:'*Username is required' },
      { type:'maxlength', message:'*Username cannot be longer than 15 characters'  }
    ],
    password:[
      { type:'required',  message:'Password is required' },
      { type:'maxlength', message:'*Name cannot be longer than 10 characters'  }
    ],
  }
  loginuser = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(10)])
  })
  constructor(private formBuilder:FormBuilder, public auth:AuthService, public router:Router) { 
    if (this.auth.loggedIn) {  
      this.router.navigateByUrl("/dashboard");  
    } 
  }

  ngOnInit() {
  }
  getLogin(){
    let Username = this.loginuser.value.username ? this.loginuser.value.username : '';
    let Password = this.loginuser.value.password ? this.loginuser.value.password : '';  
    if(this.auth.login(Username, Password)) {
      this.router.navigateByUrl("/dashboard");  
    }
    else  
        alert("Wrong username or password");  
  }
}
