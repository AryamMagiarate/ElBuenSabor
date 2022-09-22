import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, Observable } from "rxjs";
import { Usuario } from '../modelos/usuario.model';
import { LoginService } from './login.service';
import { UsuarioService } from './usuario.service';
@Injectable()
export class AdminGuardian implements CanActivate {
    constructor(private loginService: LoginService, private router: Router, private userService: UsuarioService) { }

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