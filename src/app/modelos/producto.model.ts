import { Ingrediente } from "./ingrediente.model";

export class Producto{
    idProducto:string;
    nombre:string;
    ingredientes:{ingrediente:Ingrediente,cantidad:number}[];
    constructor(idProducto:string,nombre:string,ingredientes:[]){
    this.idProducto=idProducto;
    this.nombre=nombre;
    this.ingredientes=ingredientes;
    }
    get obtenerPrecio(){
        let precio:number=0;
      
        return precio;
    }
    
}

