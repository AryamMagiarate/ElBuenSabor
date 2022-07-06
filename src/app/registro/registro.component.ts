import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/servicios/login.service';
import { Usuario } from '../modelos/usuario.model';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  email!:string;
  password!:string;
  id!:string;
  usuario!:Usuario;
  constructor(private flashMessages:FlashMessagesService,private router:Router,private loginService:LoginService,private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.id = auth.uid;
        this.email = auth.email!;
        
        this.usuarioService.getUsuario(this.email).subscribe(usuario=>{
          this.usuario=usuario;
          if(this.usuario===null){
            let user=new Usuario(auth.email!,auth.email!);
            this.usuarioService.agregarUsuario(user);
          }else{
            this.router.navigate(['/']);
            console.log("el usuario esta registrado y es: "+auth.email+" con rol: "+usuario.rol+" con id en payload: "+usuario.id);
          }
        });
        
        this.router.navigate(['/']);

      }
    })
  }
  registrar(){
  this.loginService.registrar(this.email,this.password).then(
    res=>{
      this.router.navigate(['/']);
    }
  ).catch(error=>{
    this.flashMessages.show("La direccion de Email ya se encuentra Registrada!",{cssClass:'alert-danger',timeout:10000});
  })
  }
  registrarConGoogle(){
    //es lo mismo que login
    this.loginService.loginWithGoogle().then(res => {
   
      this.router.navigate(['/']);
    })
      .catch(error => {
        this.flashMessages.show(error.message, { cssClass: 'alert-danger', timeout: 4000 })
      })
  }

}
