import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { IngredienteService } from '../servicios/ingrediente.service';
import { Ingrediente } from '../modelos/ingrediente.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { compileClassMetadata } from '@angular/compiler';

@Component({
  selector: 'app-crear-ingrediente',
  templateUrl: './crear-ingrediente.component.html',
  styleUrls: ['./crear-ingrediente.component.css']
})
export class CrearIngredienteComponent implements OnInit {
  idIngrediente: string = "";
  nombre: string = "";
  umedida: string = "";

  constructor(private loginServive: LoginService, private ingredienteService: IngredienteService, private flashMsn: FlashMessagesService) { }

  ngOnInit(): void {
  }

cargarIngrediente() {

    let cond = (this.idIngrediente !== "" && this.nombre !== "" && this.umedida !== "");
 

    if (cond) {//me fijo qe los campos esten completos
   let subscription=this.ingredienteService.buscarIngrediente(this.idIngrediente).subscribe(ingrediente=>{
    
        if (ingrediente === null) {//me fijo que no exista el ingrediente con ese id

          let ingre = new Ingrediente(this.idIngrediente, this.nombre, this.umedida);
          this.ingredienteService.agregarIngrediente(ingre);
          this.idIngrediente = "";
          this.nombre = "";
          this.umedida = "";
          subscription.unsubscribe();
          this.flashMsn.show("INGREDIENTE CREADO! ", { cssClass: 'alert-success', timeout: 6000 });
        } else {
          this.flashMsn.show("El id " + this.idIngrediente + " ya existe para un  Ingrediente! ", { cssClass: 'alert-danger', timeout: 5000 });
          this.idIngrediente = "";
          this.nombre = "";
          this.umedida = "";
        }
      
   });

   

    } else {
      this.flashMsn.show("Algunos campos no estan completos, rellene todos los campos por favor!", { cssClass: 'alert-danger', timeout: 5000 });
    }

  

  }
}