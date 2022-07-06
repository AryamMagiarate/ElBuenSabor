

export class Usuario{
    id?:string;
    email?:string;
    rol:string="cliente";
    constructor(id:string,email:string){
        this.id=id;
        this.email=email;
        this.rol="cliente";
    }
    

}