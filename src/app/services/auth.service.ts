import { Injectable } from '@angular/core';
import { Router } from '@angular/router';  
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  constructor(public router: Router){

  }
  login(username: string, password: any) {
    if (username == "test@test.com" && password == 8256455) {
      localStorage.setItem('currentUser', "loggedin");  
      return true;  
    } else {
      return false;
    }
  }

  logout() {  
    localStorage.removeItem('currentUser');  
    this.router.navigateByUrl("/login");
  }  
  public get loggedIn(): boolean {  
    return (localStorage.getItem('currentUser') !== null);  
  } 
}
