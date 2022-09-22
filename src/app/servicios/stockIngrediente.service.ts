import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import{map} from "rxjs/operators";
import { StockIngrediente } from "../modelos/stockIngrediente.model";


@Injectable()
export class StockIngredienteService{//clase que me permitira acceder a la coleccion "ingredientes" de Firestore DB
stockIngredientesCollection!:AngularFirestoreCollection;
stockIngredienteDoc!:AngularFirestoreDocument<StockIngrediente>;
stockIngredientes!: Observable<StockIngrediente[]>;
stockIngrediente!:Observable<StockIngrediente>;
constructor(private db:AngularFirestore){
    this.stockIngredientesCollection=db.collection('stockIngredientes',ref=>ref.orderBy('idIngrediente','asc')); //con esto solo recuperamos la collection "usuarios"
}
getIngredientes():Observable<StockIngrediente[]>{
    this.stockIngredientes=this.stockIngredientesCollection.snapshotChanges().pipe(
        map(cambios=>{
            return cambios.map(accion=>{
                const datos=accion.payload.doc.data() as StockIngrediente;
                datos.idStockIngrediente=accion.payload.doc.id;
                return datos;
            })
        })
    );
    return this.stockIngredientes as any;
}
/*agregarIngrediente(ingrediente:StockIngrediente) {    
    
    this.stockIngredientesCollection?.doc(ingrediente.idStockIngrediente).set({...ingrediente});   
    
    console.log("Ingrediente Creado");
}*/

getIngredienteEnStock(id:string) {
    this.stockIngredienteDoc = this.stockIngredientesCollection.doc<StockIngrediente>(`${id}`);
   
return this.stockIngrediente = this.stockIngredienteDoc?.snapshotChanges().pipe(
       
        map(accion => {
            
            if (accion.payload.exists === false) {
              
                return null;
            } else {
               
                const datos = accion.payload.data() as StockIngrediente;                           
                datos.idStockIngrediente = accion.payload.id; 
                         
                return datos as any;
            }
        })
        
    );
   
    
}


modificarStockIngrediente(ingrediente:StockIngrediente){
    this.stockIngredienteDoc=this.db.doc(`stockIngredientes/${ingrediente.idStockIngrediente}`);
    this.stockIngredienteDoc.update(ingrediente);
}
/*eliminarIngrediente(ingrediente:Ingrediente){
    this.ingredienteDoc=this.db.doc(`ingredientes/${ingrediente.idIngrediente}`); //recuperamos los datos del usuario segun su id
    this.ingredienteDoc.delete();
}*/
}