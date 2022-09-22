import { Component, OnInit } from '@angular/core';
import { Ingrediente } from '../modelos/ingrediente.model';
import { IngredienteService } from '../servicios/ingrediente.service';

import { IngresoIngrediente } from '../modelos/ingresoIngrediente.model';

import { FlashMessagesService } from 'angular2-flash-messages';
import { StockIngredienteService } from '../servicios/stockIngrediente.service';
import { StockIngrediente } from '../modelos/stockIngrediente.model';

@Component({
  selector: 'app-ingreso-ingrediente',
  templateUrl: './ingreso-ingrediente.component.html',
  styleUrls: ['./ingreso-ingrediente.component.css']
})
export class IngresoIngredienteComponent implements OnInit {
  listaDeIngredientes!:Ingrediente[];
  listaDeStock!:StockIngrediente[];
  ingrediente!:Ingrediente;
  cantidadIngreso!:number;
  nroCompra!:string;
  costo!:number;

  constructor(private ingredienteService:IngredienteService, private mensaje:FlashMessagesService,private stockService:StockIngredienteService) { }

  ngOnInit(): void {
    console.log("Ingreso a Ingreso Ingredientes!");
   this.ingredienteService.getIngredientes().subscribe(ingredientes=>{ 
   let lista=[];
   for (const ingre of ingredientes) {
   lista.push(ingre)
   }
    this.listaDeIngredientes=lista;
   
    
  
   });
   this.stockService.getIngredientes().subscribe(ingredientesS=>{
    let listaS=[];
    for (const ingred of ingredientesS) {
      listaS.push(ingred);
    }
    this.listaDeStock=listaS
   })
  }

validarCampos(){

 let result=false;
  console.log("cantidad: "+this.cantidadIngreso+" costo: "+this.costo+" ingrediente: "+this.ingrediente+" nroCompra: "+this.nroCompra);
 
if((this.cantidadIngreso!==undefined)&&(this.costo!==undefined)&&(this.ingrediente!==undefined)&&(this.nroCompra!==undefined)){
 
  result=true;
  }else{
  this.mensaje.show("Todos los campos deben Estar completos!",{ cssClass: 'alert-danger', timeout: 6000 });
  result=false;
  }

return result;
}
crearIngreso(){
  console.log("apreto crear ingreso!");
  if(this.validarCampos()){
    let ingreso=new IngresoIngrediente(this.ingrediente.idIngrediente,this.cantidadIngreso,this.costo,this.nroCompra);
    console.log(ingreso);
    return ingreso;
  }else{
    return null;
  }

}

}
