import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
//import { AuthenticationService, UserService } from '../_services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if (userLoggedIn == "true") {
        // logged in so return true
        return true;
    }
    //not logged in so redirect to login page with the return url
    this.router.navigate(["/login"]);
}
}
