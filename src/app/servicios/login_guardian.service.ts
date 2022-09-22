import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, Observable } from "rxjs";
import { LoginService } from './login.service';
@Injectable()
export class LoginGuardian implements CanActivate{
    constructor(private loginService:LoginService,private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       return this.loginService.getAuth().pipe(
        map(auth=>{
            if(auth){
                return true;
            }else{
                this.router.navigate(['login']);
                return false;
            }
        })
       )
        
    }

}