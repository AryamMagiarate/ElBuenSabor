import { Component, OnInit } from '@angular/core';

import { LoginService } from '../servicios/login.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-envio-email-confirmacion',
  templateUrl: './envio-email-confirmacion.component.html',
  styleUrls: ['./envio-email-confirmacion.component.css']
})
export class EnvioEmailConfirmacionComponent implements OnInit {
  email!:string;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        console.log("La autenticacion de Email es: "+auth.emailVerified);
        this.email = auth.email!;
      }});
  }

}
