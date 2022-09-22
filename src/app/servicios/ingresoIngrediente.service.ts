import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import{map} from "rxjs/operators";
import { Ingrediente } from '../modelos/ingrediente.model';
import { IngresoIngrediente } from "../modelos/ingresoIngrediente.model";

@Injectable()
export class IngresoIngredienteService{//clase que me permitira acceder a la coleccion "ingredientes" de Firestore DB
ingresoIngredientesCollection!:AngularFirestoreCollection;
ingresoIngredienteDoc!:AngularFirestoreDocument<IngresoIngrediente>;
ingresoIngredientes!: Observable<IngresoIngrediente[]>;
ingresoIngrediente!:Observable<IngresoIngrediente>;
constructor(private db:AngularFirestore){
    this.ingresoIngredientesCollection=db.collection('ingresoIngredientes',ref=>ref.orderBy('idIngresoIngrediente','asc')); //con esto solo recuperamos la collection "usuarios"
}
getIngredientes():Observable<IngresoIngrediente[]>{
    this.ingresoIngredientes=this.ingresoIngredientesCollection.snapshotChanges().pipe(
        map(cambios=>{
            return cambios.map(accion=>{
                const datos=accion.payload.doc.data() as IngresoIngrediente;
                datos.idIngresoIngrediente=accion.payload.doc.id;
                return datos;
            })
        })
    );
    return this.ingresoIngredientes as any;
}
agregarIngresoIngrediente(ingresoIngrediente:IngresoIngrediente) {    
    
    this.ingresoIngredientesCollection?.doc(ingresoIngrediente.idIngresoIngrediente).set({...ingresoIngrediente});   
    
    console.log("Ingreso Creado");
}

getIngresoIngrediente(id:string) {
    this.ingresoIngredienteDoc = this.ingresoIngredientesCollection.doc<IngresoIngrediente>(`${id}`);
   
return this.ingresoIngrediente = this.ingresoIngredienteDoc?.snapshotChanges().pipe(
       
        map(accion => {
            
            if (accion.payload.exists === false) {
              
                return null;
            } else {
               
                const datos = accion.payload.data() as IngresoIngrediente;                           
                datos.idIngrediente = accion.payload.id; 
                         
                return datos as any;
            }
        })
        
    );
   
    
}
}