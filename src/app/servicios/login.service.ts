import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider, sendEmailVerification } from "firebase/auth";

import { map } from 'rxjs/operators'
import { UsuarioService } from './usuario.service';
import { Usuario } from '../modelos/usuario.model';
import { Router } from '@angular/router';

import { FirebaseApp } from "@angular/fire/app";
import { FlashMessagesService } from "angular2-flash-messages";

@Injectable()
export class LoginService {
    googleProvider = new GoogleAuthProvider();
    usuario!: Usuario;
    usuarioAuth!: any;
    usuarioBd!: Usuario;
    constructor(public authService: AngularFireAuth, private usuarioService: UsuarioService, private flashMessages: FlashMessagesService) {
    }


    login(email: string, password: string) {//login con cualquier email y contraseña
        return new Promise((resolve, reject) => {
            this.authService.signInWithEmailAndPassword(email, password)
                .then(datos => {
                    resolve(datos.user);


                },
                    error => reject(error))
        })
    }

    /**Metodo que retorna a un usuario que se encuentra registrado en la tabla de autenticados */
    getAuth() {
        return this.authService.authState.pipe(//esto se fija en la tabla de autenticacion si un usuario existe en la tabla
            map(auth => auth)//esto entrega el usuario de la tabla autenticados
        );
    }
    logout() {
        this.authService.signOut();
    }
    estaAutenticado() {
    return this.getAuth().subscribe(auth=>{
            if (auth !== null) { 
                            
                    return true;
                } else {
                   // console.log("El usuario es nulo, no se encuentra autenticado.");
            
                    return false;
                }

     })
           

    }



    registrarEnTablaAutenticados(email: string, password: string) {//Esto registra solamente en la tabla autenticacion
        return new Promise((resolve, reject) => {
            this.authService.createUserWithEmailAndPassword(email, password).then( //esto crea un usuario en la tabla Autenticacion
                datos => {
                    datos.user?.sendEmailVerification();


                    resolve(console.log("El usuario: " + email + " se registro en tabla autenticados")) //esto entrega la promesa cuando se resuelve

                },
                error => reject(error)
            )
        });



    }







    /*Este metodo debe traer las credenciales de autenticacion de google, el email, el cual debe ser buscado en la tabla usuarios */
    loginWithGoogle() {
        return new Promise((resolve, reject) => {
            this.authService.signInWithPopup(this.googleProvider)//signInWithPopup es una promesa tambien, que recibe una funcion
                .then(//si el usuario se ha logeado con google
                    datos => {
                        let email = datos.user?.email;
                        let usu!: Usuario;
                        //console.log("El usuario logeado segun datos.user.email es: " + email);
                        this.usuarioService.getUsuario(email!).subscribe(user => {
                            usu = user;
                            // console.log("usu es: "+usu);
                            if (usu !== null) {
                               // console.log("el mail de usuario es: " + usu.email);
                                resolve(true);//entrega los datos
                            } else {
                               // console.log("El usuario no se encontro desde login con google usu es: " + usu);

                                resolve(false)

                            }
                        }
                        );

                    },

                    error => reject(error))
        })
    }

    registroConGoogle() {
        return new Promise((resolve, reject) => {
            this.authService.signInWithPopup(this.googleProvider)//signInWithPopup es una promesa tambien, que recibe una funcion
                .then(//si el usuario se ha logeado con google
                    datos => {
                        let email = datos.user?.email;
                        let usu!: Usuario;
                       // console.log("El usuario logeado segun datos.user.email es: " + email);
                        this.usuarioService.getUsuario(email!).subscribe(user => usu = user
                        );
                        if (usu === undefined) {
                            datos.user?.sendEmailVerification();

                            resolve(datos);//entrega los datos
                        } else {
                            //console.log("El usuario no se encontro desde login con google")
                           // console.log("el usuario se encuentra en bd y es: " + usu)

                        }
                    },

                    error => reject(error))
        })
    }


}