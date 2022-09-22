import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FacturaComponent } from './factura/factura.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RecetaComponent } from './receta/receta.component';
import { MateriaPrimaComponent } from './materia-prima/materia-prima.component';
import { CabeceroComponent } from './cabecero/cabecero.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule, SETTINGS} from '@angular/fire/compat/firestore';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { FormsModule } from '@angular/forms';
import { LoginService } from './servicios/login.service';
import { UsuarioService } from './servicios/usuario.service';
import { EnvioEmailConfirmacionComponent } from './envio-email-confirmacion/envio-email-confirmacion.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { CajeroComponent } from './cajero/cajero.component';
import { CocineroComponent } from './cocinero/cocinero.component';
import { MisComprasComponent } from './mis-compras/mis-compras.component';
import { UsuarioVerificadoComponent } from './usuario-verificado/usuario-verificado.component';
import { LoginGuardian } from './servicios/login_guardian.service';
import { PedidoComponent } from './pedido/pedido.component';
import { IngredienteComponent } from './ingrediente/ingrediente.component';
import { ProductoComponent } from './producto/producto.component';
import { CrearIngredienteComponent } from './crear-ingrediente/crear-ingrediente.component';
import { IngredienteService } from './servicios/ingrediente.service';
import { AdminGuardian } from './servicios/admin.guardian';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { ProductoService } from './servicios/producto.service';
import { StockIngredienteComponent } from './stock-ingrediente/stock-ingrediente.component';
import { IngresoIngredienteComponent } from './ingreso-ingrediente/ingreso-ingrediente.component';
import { IngresoIngredienteService } from './servicios/ingresoIngrediente.service';
import { StockIngredienteService } from './servicios/stockIngrediente.service';






@NgModule({
  declarations: [
    AppComponent,
    FacturaComponent,
    LoginComponent,
    RegistroComponent,
    UsuarioComponent,
    RecetaComponent,
    MateriaPrimaComponent,
    CabeceroComponent,
    HomeComponent,
    FooterComponent,
    NoEncontradoComponent,
    EnvioEmailConfirmacionComponent,
    AdministradorComponent,
    CajeroComponent,
    CocineroComponent,
    MisComprasComponent,
    UsuarioVerificadoComponent,
    PedidoComponent,
    IngredienteComponent,
    ProductoComponent,
    CrearIngredienteComponent,
    CrearProductoComponent,
    StockIngredienteComponent,
    IngresoIngredienteComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    FormsModule,
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(environment.firestore,'ElBuenSabor'),
    AngularFirestoreModule,
    AngularFireAuthModule,

  ],
  providers: [LoginService,UsuarioService,LoginGuardian,IngredienteService,AdminGuardian,ProductoService,IngresoIngredienteService,StockIngredienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
