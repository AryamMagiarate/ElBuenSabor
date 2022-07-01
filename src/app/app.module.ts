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
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
