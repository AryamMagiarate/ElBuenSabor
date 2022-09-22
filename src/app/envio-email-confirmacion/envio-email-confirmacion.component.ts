import { Component, OnInit } from '@angular/core';

import { LoginService } from '../servicios/login.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuarioService } from '../servicios/usuario.service';
import { Usuario } from '../modelos/usuario.model';

@Component({
  selector: 'app-envio-email-confirmacion',
  templateUrl: './envio-email-confirmacion.component.html',
  styleUrls: ['./envio-email-confirmacion.component.css']
})
export class EnvioEmailConfirmacionComponent implements OnInit {
  email!:string;
  constructor(private loginService:LoginService,private userService:UsuarioService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
       
        this.email = auth.email!;
      }
      
    });
  }

}
