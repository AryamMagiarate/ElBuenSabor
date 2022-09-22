import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/servicios/login.service';
import { Usuario } from '../modelos/usuario.model';
import { UsuarioService } from '../servicios/usuario.service';
import { GoogleAuthProvider, sendEmailVerification, reload } from 'firebase/auth';
import { EnvioEmailConfirmacionComponent } from '../envio-email-confirmacion/envio-email-confirmacion.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  googleProvider = new GoogleAuthProvider();
  email: string = "";
  password: string = "";
  id!: string;
  usuario!: any;
  usuarioVal!: Usuario;
  constructor(private flashMessages: FlashMessagesService, private router: Router, private loginService: LoginService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {/**Lo que este aca dentro se inicializara de inmediato */
  }
 
 
 limpiarCampos(){
  this.email="";
  this.password="";
 }

 
 registrar(){//solo registra en tabla de autenticados
 if(this.email.length>10 && this.password.length>=8){
  this.loginService.registrarEnTablaAutenticados(this.email,this.password)
  
  
    this.router.navigate(['confirmacionRegistro']);    
 }else if(this.email.length<=10){
  this.flashMessages.show("El campo 'Email' debe estar completo", { cssClass: 'alert-danger', timeout: 5000 })
 }else if(this.password.length<8){
  this.flashMessages.show("El campo 'Password' debe estar completo y tener 8 o mas caracteres", { cssClass: 'alert-danger', timeout: 5000 })
 }



 
 
 
}
registrarConGoogle(){
this.loginService.registroConGoogle();
this.router.navigate(['confirmacionRegistro']);
}

}
