import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import{map} from "rxjs/operators";
import { Usuario } from "../modelos/usuario.model";

@Injectable()
export class UsuarioService{//clase que me permitira acceder a la coleccion Usuarios de Firestore DB
usuariosCollection!:AngularFirestoreCollection;
usuarioDoc!:AngularFirestoreDocument<Usuario>;
usuarios!: Observable<Usuario[]>;
usuario!:Observable<Usuario>;
constructor(private db:AngularFirestore){
    this.usuariosCollection=db.collection('usuarios',ref=>ref.orderBy('email','asc')); //con esto solo recuperamos la collection "usuarios"
}
getUsuarios():Observable<Usuario>{
    this.usuarios=this.usuariosCollection.snapshotChanges().pipe(
        map(cambios=>{
            return cambios.map(accion=>{
                const datos=accion.payload.doc.data() as Usuario;
                datos.id=accion.payload.doc.id;
                return datos;
            })
        })
    );
    return this.usuarios as any;
}
agregarUsuario(usuario:Usuario) {
    this.usuariosCollection?.add(usuario);
}

getUsuario(id:string) {
    this.usuarioDoc = this.usuariosCollection.doc<Usuario>(`${id}`);
   
return this.usuario = this.usuarioDoc?.snapshotChanges().pipe(
       
        map(accion => {
            
            if (accion.payload.exists === false) {
                console.log("el payload no existe")
                return null;
            } else {
                const datos = accion.payload.data() as Usuario;
                
                datos.id = accion.payload.id;               
                                   
                return datos as any;
            }
        })
        
    );
   
    
}
modificar(usuario:Usuario){
    this.usuarioDoc=this.db.doc(`usuarios/${usuario.id}`);
    this.usuarioDoc.update(usuario);
}
eliminarCliente(usuario:Usuario){
    this.usuarioDoc=this.db.doc(`clientes/${usuario.id}`); //recuperamos los datos del usuario segun su id
    this.usuarioDoc.delete();
}
}