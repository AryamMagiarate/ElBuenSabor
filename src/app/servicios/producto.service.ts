import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import{map} from "rxjs/operators";
import { Ingrediente } from '../modelos/ingrediente.model';
import { Producto } from "../modelos/producto.model";

@Injectable()
export class ProductoService{//clase que me permitira acceder a la coleccion "productos" de Firestore DB
productosCollection!:AngularFirestoreCollection;
productoDoc!:AngularFirestoreDocument<Producto>;
productos!: Observable<Producto[]>;
producto!:Observable<Ingrediente>;
constructor(private db:AngularFirestore){
    this.productosCollection=db.collection('productos',ref=>ref.orderBy('idProducto','asc')); //con esto solo recuperamos la collection "productos"
}
getIngredientes():Observable<Producto>{
    this.productos=this.productosCollection.snapshotChanges().pipe(
        map(cambios=>{
            return cambios.map(accion=>{
                const datos=accion.payload.doc.data() as Producto;
                datos.idProducto=accion.payload.doc.id;
                return datos;
            })
        })
    );
    return this.productos as any;
}
agregarIngrediente(producto:Producto) {    
    
    this.productosCollection?.doc(producto.idProducto).set({...producto});   
    
    console.log("Producto Creado");
}

getIngrediente(id:string) {
    this.productoDoc = this.productosCollection.doc<Producto>(`${id}`);
   
return this.producto = this.productoDoc?.snapshotChanges().pipe(
       
        map(accion => {
            
            if (accion.payload.exists === false) {
              
                return null;
            } else {
               
                const datos = accion.payload.data() as Producto;                           
                datos.idProducto = accion.payload.id; 
                         
                return datos as any;
            }
        })
        
    );
   
    
}
 buscarIngrediente(idIngrediente:string){
return this.getIngrediente(idIngrediente);
      
   
}

modificar(producto:Producto){
    this.productoDoc=this.db.doc(`productos/${producto.idProducto}`);
    this.productoDoc.update(producto);
}
eliminarIngrediente(producto:Producto){
    this.productoDoc=this.db.doc(`productos/${producto.idProducto}`); //recuperamos los datos del producto segun su id
    this.productoDoc.delete();
}
}