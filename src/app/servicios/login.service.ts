import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "firebase/auth";

import {map} from 'rxjs/operators'
import { UsuarioService } from './usuario.service';
import { Usuario } from '../modelos/usuario.model';
@Injectable()
export class LoginService{
    googleProvider = new GoogleAuthProvider();
    constructor(private authService:AngularFireAuth,private usuarioService:UsuarioService){
    }
login(email:string, password:string){
return new Promise((resolve, reject)=>{
    this.authService.signInWithEmailAndPassword(email,password)
    .then(datos=>resolve(datos),
    error=> reject(error))
})
}
getAuth(){
    return this.authService.authState.pipe(
        map(auth=>auth)
    );
}
logout(){
    this.authService.signOut();
}
registrar(email:string,password:string){
   return new Promise( (resolve,reject)=>{this.authService.createUserWithEmailAndPassword(email,password).then(
        datos=>resolve(datos),
        error=>reject(error)
    )});

}
loginWithGoogle(){
    return new Promise((resolve, reject)=>{      
        this.authService.signInWithPopup(this.googleProvider)
        .then(datos=>
           
            resolve(datos),
        error=> reject(error))
    })
}

}