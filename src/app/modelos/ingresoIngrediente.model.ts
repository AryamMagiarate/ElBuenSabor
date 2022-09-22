export class IngresoIngrediente{
    static nroIngreso=0;
    idIngresoIngrediente:string;
    idIngrediente:string;
    cantidadIngresada:number;
    costo:number;
    fechaIngreso:string;
    nroRecibo:string;
    constructor(idIngrediente:string,cantidadIngresada:number,costo:number,nroRecibo:string){
        this.idIngresoIngrediente="II"+IngresoIngrediente.nroIngreso++;
        this.idIngrediente=idIngrediente;
        this.cantidadIngresada=cantidadIngresada;
        this.costo=costo;
        this.nroRecibo=nroRecibo;
        this.fechaIngreso=new Date().toISOString();
    }

}
