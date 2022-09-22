import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AppComponent } from './app.component';
import { EnvioEmailConfirmacionComponent } from './envio-email-confirmacion/envio-email-confirmacion.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { UsuarioVerificadoComponent } from './usuario-verificado/usuario-verificado.component';
import { CocineroComponent } from './cocinero/cocinero.component';
import { CajeroComponent } from './cajero/cajero.component';
import { LoginGuardian } from './servicios/login_guardian.service';
import { IngredienteComponent } from './ingrediente/ingrediente.component';
import { CrearIngredienteComponent } from './crear-ingrediente/crear-ingrediente.component';
import { AdminGuardian } from './servicios/admin.guardian';
import { ProductoComponent } from './producto/producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { IngresoIngredienteComponent } from './ingreso-ingrediente/ingreso-ingrediente.component';


const routes: Routes = [

  {path:'',component:HomeComponent,canActivate:[LoginGuardian]},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'ingresoIngredientes',component:IngresoIngredienteComponent},
  {path:'ingrediente',component:IngredienteComponent,canActivate:[AdminGuardian]},
  {path:'crearIngrediente',component:CrearIngredienteComponent,canActivate:[AdminGuardian]},
  {path:'productos',component:ProductoComponent},
  {path:'aministrarProductos',component:CrearProductoComponent},
  {path:'usuario',component:UsuarioComponent,canActivate:[LoginGuardian]},
  {path:'administrador',component:AdministradorComponent},
  {path:'cocinero',component:CocineroComponent,canActivate:[LoginGuardian]},
  {path:'cajero',component:CajeroComponent,canActivate:[LoginGuardian]},
  {path:'confirmacionRegistro',component:EnvioEmailConfirmacionComponent},
  {path:'usuarioVerificado',component:UsuarioVerificadoComponent},

  {path:'**',component:NoEncontradoComponent} //Este componente siempre sera el ultimo
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
