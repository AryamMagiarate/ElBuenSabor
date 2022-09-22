import { Usuario } from './usuario.model';
export class pedido{
    idPedido:string;
    cliente:Usuario;
    fechaPedido:Date;
    productos:[];
    constructor(idPedido:string,cliente:Usuario,fechaPedido:Date,productos:[]){
    this.idPedido=idPedido;
    this.cliente=cliente;
    this.fechaPedido=fechaPedido;
    this.productos=productos;
    }
    get getProductos(){
        return this.productos;
    }
    set setProductos(productos:[]){
        this.productos=productos;
    }
    get getCliente(){
        return this.cliente;
    }
    set setCliente(cliente:Usuario){
        this.cliente=cliente;
    }
    get getIdPedido(){
        return this.idPedido;
    }
    

}