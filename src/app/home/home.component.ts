import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Usuario } from '../modelos/usuario.model';
import { UsuarioService } from '../servicios/usuario.service';
import { reload } from 'firebase/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  isLoggedIn!:boolean;
  loggedInUser!:string;
  usuario!:any;
  constructor(private loginService:LoginService, private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
   let cosa;
    this.loginService.getAuth().subscribe(userAuth=>{
 this.usuarioService.getUsuario(userAuth?.email!).subscribe(user=>{
  let usu:Usuario;
  usu=user;
  console.log(usu.rol); 
  if(usu.rol==="cliente"){
    this.isLoggedIn=true;
    this.loggedInUser=usu.email!;
  }else if(usu.rol==="cocinero"){
   this.router.navigate(['cocinero'])
  }else if(usu.rol==="cajero"){
    this.router.navigate(['cajero']) 
 
  }else if(usu.rol==="admin"){
    this.router.navigate(['administrador'])
  }else{
    this.router.navigate(['**'])
  }
 }
  );


   
    });
 
   
  }

  addProducto(idProducto:string){
    
  }

}
