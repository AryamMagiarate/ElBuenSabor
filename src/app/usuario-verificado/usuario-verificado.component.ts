import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario.model';
import { LoginService } from '../servicios/login.service';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-verificado',
  templateUrl: './usuario-verificado.component.html',
  styleUrls: ['./usuario-verificado.component.css']
})
export class UsuarioVerificadoComponent implements OnInit {

  constructor(private loginService:LoginService, private usuarioService:UsuarioService,private route:Router) { }

  ngOnInit(): void {
   
  }
  entrar(){
    this.loginService.getAuth().subscribe(auth => {
       if(auth){
        let usuario=new Usuario(auth!.email!,auth!.email!);
        usuario.setVerificado=true;
        this.usuarioService.agregarUsuario(usuario);
        
        console.log("Usuario verificado!");
        this.route.navigate(['login']);

       }else{
        console.log("usuario no verificado!");
       }
      });
  
  }

}
