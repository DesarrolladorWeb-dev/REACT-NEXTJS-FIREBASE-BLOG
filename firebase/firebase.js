import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from "./config";
import {v4} from 'uuid'




class Firebase {

    constructor() {
        
        
            const app = initializeApp(firebaseConfig);
            this.auth = getAuth(app);
            this.auth2 = null
            this.storage = getStorage(app);
            this.db = getFirestore(app);

    }

    // Registrar un usuario
    async registrar(nombre, email, password) {
        const nuevoUsuario = await createUserWithEmailAndPassword(this.auth, email, password);
        // Haz algo con el nuevo usuario registrado
        console.log(nuevoUsuario);
        
        return nuevoUsuario
        // return await nuevoUsuario.user.updateProfile({
        //     displayName : nombre
        // })
    }
    async uploadFile(file){
      const storageRef = ref(this.storage, v4())
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      return url

    }
    
    // IniciarSesion del usuario
    // async login(email, password){
    //     return this.auth.signInWithEmailAndPassword(email, password);
    // }
    async login(email, password) {
        try {
          const usuario = await signInWithEmailAndPassword(this.auth, email, password);
          console.log('Inicio de sesión exitoso:', usuario.user);
          this.auth2 = usuario.user
          console.log(this.auth2)
          return usuario.user;
        
        } catch (error) {
          console.log('Error al iniciar sesión:', error.message);
          throw error;
        }
      }
      // Cierra la session del usuario 
      async cerrarSesion(){
        await this.auth.signOut()
      }
}

const firebase = new Firebase();
export default firebase;