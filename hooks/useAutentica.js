import firebase from '@/firebase';
import { useEffect, useState } from 'react';

function useAutentica() {
  const [usuarioAutenticado, guardarUsuarioAutenticado ] = useState(null)
  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
      if(usuario){
          guardarUsuarioAutenticado(usuario);
      }else{
        guardarUsuarioAutenticado(null)

      }
    })
    return () => unsuscribe()
    
  },[])
  return usuarioAutenticado
}

export default useAutentica