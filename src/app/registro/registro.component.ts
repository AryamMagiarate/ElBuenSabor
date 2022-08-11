import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/servicios/login.service';
import { Usuario } from '../modelos/usuario.model';
import { UsuarioService } from '../servicios/usuario.service';
import { sendEmailVerification } from 'firebase/auth';
import { EnvioEmailConfirmacionComponent } from '../envio-email-confirmacion/envio-email-confirmacion.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  email: string="";
  password: string="";
  id!: string;
  usuario!: Usuario;
  usuarioVal!: Usuario;
  constructor(private flashMessages: FlashMessagesService, private router: Router, private loginService: LoginService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

  }
  registrar() {
    if (this.email.length == 0) {
      this.flashMessages.show("El campo Email debe estar completo!", { cssClass: 'alert-danger', timeout: 10000 });
    }
    if (this.password.length == 0 || this.password.length <= 6) {
      this.flashMessages.show("El campo contraseña debe estar completo, y tener 6 caracteres como minimo", { cssClass: 'alert-danger', timeout: 10000 });
    }
    if (this.usuarioService.getUsuario(this.email).subscribe(
      user => {
        this.usuarioVal = user;
        if (this.usuarioVal.email === this.email) {
          return true
        }else{return false}
      })){
      this.flashMessages.show("El email ingresado ya se encuentra registrado!", { cssClass: 'alert-danger', timeout: 10000 });
      }
    this.loginService.registrar(this.email, this.password).then(
      res => {

        this.router.navigate(['confirmacionRegistro']);
      }
    ).catch(error => {
      this.flashMessages.show("Error de Registro", { cssClass: 'alert-danger', timeout: 10000 });
    })

  }
  registrarConGoogle() {//El login con google asi como el registro con google ya autentica y verifica el email, por consiguiente creara al usuario
    //es lo mismo que login
    this.loginService.loginWithGoogle().then(res => {

      this.router.navigate(['confirmacionRegistro']);
    })
      .catch(error => {
        this.flashMessages.show(error.message, { cssClass: 'alert-danger', timeout: 4000 })
      })
  }

}
