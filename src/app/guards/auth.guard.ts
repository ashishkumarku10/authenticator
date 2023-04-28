import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {  
    if (localStorage.getItem('currentUser')) {  
        return true;  
    }  
    this.router.navigate(['']);  
    return false;  
}  
}
