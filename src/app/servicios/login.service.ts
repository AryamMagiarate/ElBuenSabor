import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider, sendEmailVerification } from "firebase/auth";

import { map } from 'rxjs/operators'
import { UsuarioService } from './usuario.service';
import { Usuario } from '../modelos/usuario.model';
import { Router } from '@angular/router';
@Injectable()
export class LoginService {
    googleProvider = new GoogleAuthProvider();
    usuario!:Usuario;
    constructor(public authService: AngularFireAuth, private usuarioService: UsuarioService) {
    }
    login(email: string, password: string) {//login con cualquier email y contraseña
        return new Promise((resolve, reject) => {
            this.authService.signInWithEmailAndPassword(email, password)
                .then(datos =>{
                
                    resolve(datos);
                    
                   
                },
                    error => reject(error))
        })
    }
    emailVerificado() {//Este metodo nos dira si el usuario o email de usuario se encuentra en la base de datos
        this.authService.onAuthStateChanged(user => {       
            
            if (user?.emailVerified) { //si el usuario verifico su            
              //tendriamos que fijarnos si el usuario existe ya
              let usuario=new Usuario(user!.email!,user!.email!);
              usuario.setVerificado=true;
            this.usuarioService.agregarUsuario(usuario);
                         
                        
                          console.log("La verificacion del usuario en bd es: " + usuario.verificado);
                          // this.router.navigate(['/']);
                       
                console.log("El Email ha sido verificado");
            
                return true;

            } else {
                console.log("El Email No ha sido verificado");
                return false;

            }
        })
    }
    getAuth() {
        return this.authService.authState.pipe(//esto se fija en la tabla de autenticacion si un usuario existe en la tabla
            map(auth => auth)
        );
    }
    logout() {
        this.authService.signOut();
    }
    enviarEmailDeVerificacion() {
        /**Tenga en cuenta que:
    Solo puede enviar una verificación de correo electrónico a los objetos de usuarios que usted creó utilizando el método de correo electrónico 
    y contraseña createUserWithEmailAndPassword
    Solo después de que haya registrado a los usuarios en un estado autenticado, Firebase devolverá una promesa del objeto de autenticación.
    El antiguo método onAuth se ha cambiado a onAuthStateChanged . */
        return this.authService.onAuthStateChanged(user => {
            user?.sendEmailVerification();
        })
    }
    registrar(email: string, password: string) {//Esto registra solamente en la tabla autenticacion
       return new Promise((resolve, reject) => {
            this.authService.createUserWithEmailAndPassword(email, password).then( //esto crea un usuario en la tabla Autenticacion
                datos => {
                    datos.user?.sendEmailVerification();
                    resolve(datos)
                                       
                },
                error => reject(error)
            )
        });
                  
        

    }
    loginWithGoogle() {
        return new Promise((resolve, reject) => {
            this.authService.signInWithPopup(this.googleProvider)
                .then(//si la ejecucion ha sido exitosa entonces
                    datos =>{                   
               
                   resolve(datos);           
                    
                    console.log("Se envio el mail de verificacion");                          
            } ,  
                          
          error => reject(error))
        })
    }
  

}