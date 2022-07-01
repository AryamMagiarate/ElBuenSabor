import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  email!:string;
  password!:string;
  constructor(private flashMessages:FlashMessagesService,private router:Router,private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
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
    
  }

}
