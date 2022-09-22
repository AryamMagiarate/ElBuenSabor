import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelos/usuario.model';
import { LoginService } from '../servicios/login.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn!:boolean;
  loggedInUser!:string;
  usuario!:Usuario;
 
  permitirRegistro!:boolean;
  constructor(private loginService:LoginService,private router:Router, private userService:UsuarioService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
  this.userService.getUsuario(auth?.email!).subscribe(user=>{this.usuario=user
    if(this.usuario!==null){
      this.isLoggedIn=true;
      this.loggedInUser=this.usuario.email!;
    }else{
      this.isLoggedIn=false;
      this.loggedInUser="";
    }}
    );
    
     
    });
   
  }
logout(){
  this.loginService.logout();
  this.isLoggedIn=false;
  location.reload();
  this.router.navigate(['/login']);
}

}
