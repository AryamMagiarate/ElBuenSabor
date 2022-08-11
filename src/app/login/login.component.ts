import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from '../servicios/login.service';
import { UsuarioService } from '../servicios/usuario.service';
import { Usuario } from '../modelos/usuario.model';
import { ActionCodeURL } from 'firebase/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private flashMessages: FlashMessagesService, private router: Router, private loginService: LoginService, private usuarioService: UsuarioService) { }
  password: string="";
  email: string="";
  usuario!: Usuario;
  id!: string;
  mail!: string;
  bandera:boolean=false;
  usuarioVal!:Usuario;
  ngOnInit(): void {  
    
     
    
  }

  login() {
    if (this.email.length == 0) {
      this.flashMessages.show("El campo Email debe estar completo!", { cssClass: 'alert-danger', timeout: 6000 });
    }
    if (this.password.length == 0 || this.password.length <= 6) {
      this.flashMessages.show("El campo contraseña debe estar completo, y tener 6 caracteres como minimo", { cssClass: 'alert-danger', timeout: 6000 });
    }
    else{
    this.loginService.login(this.email, this.password).then(res => {
    
      this.loginService.authService.onAuthStateChanged(auth => {
        if (auth?.emailVerified) {
          this.router.navigate(['']);
        } else {
          auth?.sendEmailVerification();
          this.router.navigate(['confirmacionRegistro']);
        }
        });
     
    
    })
      .catch(error => {
        
      this.flashMessages.show("El usuario no se encuentra registrado o la contraseña es incorrecta<br>Si Usted no se registro, ingrese a ''Registrarse''", { cssClass: 'alert-danger', timeout: 7000 });

      })
    }
  }
loginWithGoogle() {
  this.loginService.loginWithGoogle().then(res => {
    if (this.loginService.emailVerificado()!) {//si el email esta verificado entonces ingresa al home
      this.router.navigate(['']);
    } else {//si el email no esta verificado entonces envia un email de verficacion
      this.loginService.enviarEmailDeVerificacion();
      this.router.navigate(['confirmacionRegistro']);
      //this.flashMessages.show("Debe verificar su direccion de Email, visitando el link que se le envio a la misma!", { cssClass: 'alert-danger', timeout: 8000 });

    }

  })
    .catch(error => {
      this.flashMessages.show("La direccion de Email no se encuentra registrada", { cssClass: 'alert-danger', timeout: 4000 });
   
    })

}
  //YRvy0SkwXuWWaQeDM1cpfA24fUf2

}
