import { Ingrediente } from './ingrediente.model';
export class StockIngrediente{
idStockIngrediente:string;
ingrediente:Ingrediente;
cantidadDisponible:number;
precioUmedida:number;

constructor(ingrediente:Ingrediente,cantidadDisponible:number,precioUmedida:number){
    this.idStockIngrediente=ingrediente.idIngrediente;
    this.ingrediente=ingrediente;
    this.cantidadDisponible=cantidadDisponible;
    this.precioUmedida=precioUmedida;
}

get getIdStockIngrediente(){
    return this.idStockIngrediente;
}
get getIngrediente(){
return this.ingrediente;
}
set setIngrediente(ingrediente:Ingrediente){
    this.ingrediente=ingrediente;
}
get getCantidadIngredienteDisponible(){
    return this.cantidadDisponible;
}
set setCantidadIngredienteDisponible(cantidadDisponible:number){
this.cantidadDisponible=cantidadDisponible;
}
get getPrecioUmedida(){
    return this.precioUmedida;
}
set setPrecioUmedida(precioUmedida:number){
    this.precioUmedida=precioUmedida;
}
toString(){
    return "idStockIngrediente: "+this.idStockIngrediente+"\nIngrediente:\nidIngrediente: "+this.ingrediente.idIngrediente+"\nnombre: "+this.ingrediente.nombre+"\nunidad medida: "+this.ingrediente.umedida+"\nCantidad Disponible: "+this.cantidadDisponible;
}
}