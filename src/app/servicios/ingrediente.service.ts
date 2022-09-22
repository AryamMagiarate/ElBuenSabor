import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import{map} from "rxjs/operators";
import { Ingrediente } from '../modelos/ingrediente.model';

@Injectable()
export class IngredienteService{//clase que me permitira acceder a la coleccion "ingredientes" de Firestore DB
ingredientesCollection!:AngularFirestoreCollection;
ingredienteDoc!:AngularFirestoreDocument<Ingrediente>;
ingredientes!: Observable<Ingrediente[]>;
ingrediente!:Observable<Ingrediente>;
constructor(private db:AngularFirestore){
    this.ingredientesCollection=db.collection('ingredientes',ref=>ref.orderBy('idIngrediente','asc')); //con esto solo recuperamos la collection "usuarios"
}
getIngredientes():Observable<Ingrediente[]>{
    this.ingredientes=this.ingredientesCollection.snapshotChanges().pipe(
        map(cambios=>{
            return cambios.map(accion=>{
                const datos=accion.payload.doc.data() as Ingrediente;
                datos.idIngrediente=accion.payload.doc.id;
                return datos;
            })
        })
    );
    return this.ingredientes as any;
}
agregarIngrediente(ingrediente:Ingrediente) {    
    
    this.ingredientesCollection?.doc(ingrediente.idIngrediente).set({...ingrediente});   
    
    console.log("Ingrediente Creado");
}

getIngrediente(id:string) {
    this.ingredienteDoc = this.ingredientesCollection.doc<Ingrediente>(`${id}`);
   
return this.ingrediente = this.ingredienteDoc?.snapshotChanges().pipe(
       
        map(accion => {
            
            if (accion.payload.exists === false) {
              
                return null;
            } else {
               
                const datos = accion.payload.data() as Ingrediente;                           
                datos.idIngrediente = accion.payload.id; 
                         
                return datos as any;
            }
        })
        
    );
   
    
}
 buscarIngrediente(idIngrediente:string){
return this.getIngrediente(idIngrediente);
      
   
}

modificar(ingrediente:Ingrediente){
    this.ingredienteDoc=this.db.doc(`ingredientes/${ingrediente.idIngrediente}`);
    this.ingredienteDoc.update(ingrediente);
}
eliminarIngrediente(ingrediente:Ingrediente){
    this.ingredienteDoc=this.db.doc(`ingredientes/${ingrediente.idIngrediente}`); //recuperamos los datos del usuario segun su id
    this.ingredienteDoc.delete();
}
}