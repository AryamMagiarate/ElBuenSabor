

export class Usuario{
    id?:string;
    email?:string;
    rol:string="cliente";
    horaIngreso:number;
    horaSalida:number;
    diasLaborales:Array<string>;    
    verificado:boolean=false;
    
    constructor(id:string,email:string){
        this.id=id;
        this.email=email;
        this.rol="cliente";
        this.verificado=false;
        this.horaIngreso=0;
        this.horaSalida=0;
        this.diasLaborales=[];

    };
  
  set setVerificado(verificado:boolean){
        this.verificado=verificado;
    }
  set setRol(rol:string){
    this.rol=rol;
  }
  get getRol(){
    return this.rol;
  }
    

}