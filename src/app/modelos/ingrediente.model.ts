export class Ingrediente{
    idIngrediente:string;
    nombre:string;
   umedida:string;
    constructor(idIngrediente:string,nombre:string, umedida:string){
        this.idIngrediente=idIngrediente;
        this.nombre=nombre;
       this.umedida=umedida;
    }
    get getIdIngrediente(){
        return this.idIngrediente;
    }
    set setIdIngrediente(idIngrediente:string){
        this.idIngrediente=idIngrediente;
    }
    get getNombreIngrediente(){
        return this.nombre;
    }
    set setNombreIngrediente(nombre:string){
        this.nombre=nombre;
    }
    get getUmedida(){
        return this.umedida;
    }
    set setUmedida(umedida:string){
        this.umedida=umedida;
    }
}