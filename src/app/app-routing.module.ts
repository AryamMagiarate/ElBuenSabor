import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AppComponent } from './app.component';
import { EnvioEmailConfirmacionComponent } from './envio-email-confirmacion/envio-email-confirmacion.component';


const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'usuario',component:UsuarioComponent},
  {path:'confirmacionRegistro',component:EnvioEmailConfirmacionComponent},
  {path:'**',component:NoEncontradoComponent} //Este componente siempre sera el ultimo
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
