import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from '../servicios/login.service';
import { UsuarioService } from '../servicios/usuario.service';
import { Usuario } from '../modelos/usuario.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private flashMessages: FlashMessagesService, private router: Router, private loginService: LoginService, private usuarioService: UsuarioService) { }
  password!: string;
  email!: string;
  usuario!: Usuario;
  id!: string;
  mail!: string;
  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.id = auth.uid;
        this.mail = auth.email!;
        this.router.navigate(['/']);
        this.usuarioService.getUsuario(this.mail).subscribe(usuario=>{
          this.usuario=usuario;
          if(this.usuario===null){
            let user=new Usuario(auth.email!,auth.email!);
            this.usuarioService.agregarUsuario(user);
          }else{
            console.log("el usuario esta registrado y es: "+auth.email+" con rol: "+usuario.rol+" con id en payload: "+usuario.id);
          }
        });
        
     
      }
    });

  }
  login() {
    this.loginService.login(this.email, this.password).then(res => {
      this.router.navigate(['/']);
    })
      .catch(error => {
        this.flashMessages.show("La direccion de Email no se encuentra registrada", { cssClass: 'alert-danger', timeout: 4000 });
        this.router.navigate(['registro']);
      })
  }
  loginWithGoogle() {
    this.loginService.loginWithGoogle().then(res => {
   
      this.router.navigate(['/']);
    })
      .catch(error => {
        this.flashMessages.show("La direccion de Email no se encuentra registrada", { cssClass: 'alert-danger', timeout: 4000 });
        this.router.navigate(['registro']);
      })

  }
  //YRvy0SkwXuWWaQeDM1cpfA24fUf2

}
