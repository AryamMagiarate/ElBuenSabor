import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Usuario } from '../modelos/usuario.model';
import { UsuarioService } from '../servicios/usuario.service';
import { reload } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  isLoggedIn!:boolean;
  loggedInUser!:string;
  usuario!:Usuario;
  constructor(private loginService:LoginService, private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    
    this.loginService.getAuth().subscribe(user=>{
    this.usuarioService.getUsuario(user?.email!).subscribe(usuario=>this.usuario=usuario);
    console.log("El usuario de la bd es: "+this.usuario);
      if(user?.emailVerified){
        this.isLoggedIn=true;      
        this.loggedInUser=user.email!;
        console.log("HOme autenticado");
        if(this.usuario===undefined){
          let us=new Usuario(user.email!,user.email!);
          us.setVerificado=true;
          this.usuarioService.agregarUsuario(us);
         
        }
       
      }else{
        this.isLoggedIn=false;
        
        this.loggedInUser="";
        console.log("HOme sin autenticar")
       
      }
    });
   
  }

  
 
  

}
