

export class Usuario{
    id?:string;
    email?:string;
    rol:string="cliente";
    verificado:boolean=false;
    constructor(id:string,email:string){
        this.id=id;
        this.email=email;
        this.rol="cliente";
        this.verificado=false;
    }
  set setVerificado(verificado:boolean){
        this.verificado=verificado;
    }
    

}